import { Router, type IRouter } from "express";
import {
  CreateCustomerBody,
  UpdateCustomerBody,
  GetCustomerParams,
  UpdateCustomerParams,
  DeleteCustomerParams,
  ListCustomersQueryParams,
} from "@workspace/api-zod";
import { logger } from "../lib/logger";
import {
  addMockActivity,
  createMockCustomer,
  deleteMockCustomer,
  mockCustomers,
  shouldFallbackToMockData,
  updateMockCustomer,
} from "../lib/mock-store";
import { addActivity, nowIso, supabaseData } from "../lib/supabase-data";

const router: IRouter = Router();

function serializeCustomer(customer: {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  status: string;
  total_purchases?: string | number;
  totalPurchases?: string | number;
  created_at?: string;
  updated_at?: string;
  createdAt?: string;
  updatedAt?: string;
}) {
  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone ?? null,
    company: customer.company ?? null,
    status: customer.status,
    totalPurchases: Number(customer.total_purchases ?? customer.totalPurchases ?? 0),
    createdAt: customer.created_at ?? customer.createdAt ?? nowIso(),
    updatedAt: customer.updated_at ?? customer.updatedAt ?? nowIso(),
  };
}

router.get("/customers", async (req, res): Promise<void> => {
  const parsed = ListCustomersQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { search, status } = parsed.data;

  let query = supabaseData
    .from("customers")
    .select("id, name, email, phone, company, status, total_purchases, created_at, updated_at")
    .order("created_at", { ascending: true });

  if (search) query = query.ilike("name", `%${search}%`);
  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) {
    if (!shouldFallbackToMockData(error)) {
      logger.error({ error }, "Failed to list customers from Supabase");
      res.status(500).json({ error: error.message || "Failed to load customers" });
      return;
    }

    logger.warn({ error }, "Falling back to mock customers data");
    const filtered = mockCustomers.filter((customer) => {
      if (search && !customer.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (status && customer.status !== status) return false;
      return true;
    });
    res.json(filtered.map(serializeCustomer));
    return;
  }

  res.json((data ?? []).map(serializeCustomer));
});

router.post("/customers", async (req, res): Promise<void> => {
  const parsed = CreateCustomerBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { name, email, phone, company, status, totalPurchases } = parsed.data;
  const { data, error } = await supabaseData
    .from("customers")
    .insert({
      name,
      email,
      phone: phone ?? null,
      company: company ?? null,
      status: status ?? "active",
      total_purchases: String(totalPurchases ?? 0),
    })
    .select("id, name, email, phone, company, status, total_purchases, created_at, updated_at")
    .single();

  if (error) {
    if (!shouldFallbackToMockData(error)) {
      logger.error({ error, email }, "Failed to create customer in Supabase");
      res.status(500).json({ error: error.message || "Failed to create customer" });
      return;
    }

    logger.warn({ error, email }, "Falling back to mock customer creation");
    const mockCustomer = createMockCustomer({
      name,
      email,
      phone: phone ?? null,
      company: company ?? null,
      status: status ?? "active",
      totalPurchases: totalPurchases ?? 0,
    });
    addMockActivity("customer_created", "New customer onboarded", mockCustomer.name);
    res.status(201).json(serializeCustomer({
      ...mockCustomer,
      total_purchases: mockCustomer.totalPurchases,
      created_at: mockCustomer.createdAt,
      updated_at: mockCustomer.updatedAt,
    }));
    return;
  }

  await addActivity("customer_created", "New customer onboarded", data.name);
  res.status(201).json(serializeCustomer(data));
});

router.get("/customers/:id", async (req, res): Promise<void> => {
  const params = GetCustomerParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const { data, error } = await supabaseData
    .from("customers")
    .select("id, name, email, phone, company, status, total_purchases, created_at, updated_at")
    .eq("id", params.data.id)
    .maybeSingle();

  if (error) {
    if (!shouldFallbackToMockData(error)) {
      logger.error({ error, customerId: params.data.id }, "Failed to fetch customer from Supabase");
      res.status(500).json({ error: error.message || "Failed to load customer" });
      return;
    }

    const mockCustomer = mockCustomers.find((customer) => customer.id === params.data.id);
    if (!mockCustomer) {
      res.status(404).json({ error: "Customer not found" });
      return;
    }

    res.json(serializeCustomer({
      ...mockCustomer,
      total_purchases: mockCustomer.totalPurchases,
      created_at: mockCustomer.createdAt,
      updated_at: mockCustomer.updatedAt,
    }));
    return;
  }

  if (!data) {
    res.status(404).json({ error: "Customer not found" });
    return;
  }

  res.json(serializeCustomer(data));
});

router.patch("/customers/:id", async (req, res): Promise<void> => {
  const params = UpdateCustomerParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateCustomerBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { name, email, phone, company, status, totalPurchases } = parsed.data;
  const payload: Record<string, unknown> = { updated_at: nowIso() };

  if (name !== undefined) payload.name = name;
  if (email !== undefined) payload.email = email;
  if (phone !== undefined) payload.phone = phone;
  if (company !== undefined) payload.company = company;
  if (status !== undefined) payload.status = status;
  if (totalPurchases !== undefined) payload.total_purchases = String(totalPurchases);

  const { data, error } = await supabaseData
    .from("customers")
    .update(payload)
    .eq("id", params.data.id)
    .select("id, name, email, phone, company, status, total_purchases, created_at, updated_at")
    .maybeSingle();

  if (error) {
    if (!shouldFallbackToMockData(error)) {
      logger.error({ error, customerId: params.data.id }, "Failed to update customer in Supabase");
      res.status(500).json({ error: error.message || "Failed to update customer" });
      return;
    }

    const mockCustomer = updateMockCustomer(params.data.id, {
      ...(name !== undefined ? { name } : {}),
      ...(email !== undefined ? { email } : {}),
      ...(phone !== undefined ? { phone } : {}),
      ...(company !== undefined ? { company } : {}),
      ...(status !== undefined ? { status } : {}),
      ...(totalPurchases !== undefined ? { totalPurchases } : {}),
    });

    if (!mockCustomer) {
      res.status(404).json({ error: "Customer not found" });
      return;
    }

    res.json(serializeCustomer({
      ...mockCustomer,
      total_purchases: mockCustomer.totalPurchases,
      created_at: mockCustomer.createdAt,
      updated_at: mockCustomer.updatedAt,
    }));
    return;
  }

  if (!data) {
    res.status(404).json({ error: "Customer not found" });
    return;
  }

  res.json(serializeCustomer(data));
});

router.delete("/customers/:id", async (req, res): Promise<void> => {
  const params = DeleteCustomerParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const { data, error } = await supabaseData
    .from("customers")
    .delete()
    .eq("id", params.data.id)
    .select("id, name")
    .maybeSingle();

  if (error) {
    if (!shouldFallbackToMockData(error)) {
      logger.error({ error, customerId: params.data.id }, "Failed to delete customer from Supabase");
      res.status(500).json({ error: error.message || "Failed to delete customer" });
      return;
    }

    const mockCustomer = deleteMockCustomer(params.data.id);
    if (!mockCustomer) {
      res.status(404).json({ error: "Customer not found" });
      return;
    }

    res.sendStatus(204);
    return;
  }

  if (!data) {
    res.status(404).json({ error: "Customer not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
