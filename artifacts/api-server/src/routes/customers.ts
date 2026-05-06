import { Router, type IRouter } from "express";
import { db, customersTable, activityTable } from "@workspace/db";
import { eq, ilike, and, type SQL } from "drizzle-orm";
import {
  CreateCustomerBody,
  UpdateCustomerBody,
  GetCustomerParams,
  UpdateCustomerParams,
  DeleteCustomerParams,
  ListCustomersQueryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

function serializeCustomer(c: typeof customersTable.$inferSelect) {
  return {
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.phone ?? null,
    company: c.company ?? null,
    status: c.status,
    totalPurchases: parseFloat(c.totalPurchases),
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  };
}

router.get("/customers", async (req, res): Promise<void> => {
  const parsed = ListCustomersQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { search, status } = parsed.data;
  const conditions: SQL[] = [];
  if (search) conditions.push(ilike(customersTable.name, `%${search}%`));
  if (status) conditions.push(eq(customersTable.status, status));

  const customers = await db
    .select()
    .from(customersTable)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(customersTable.createdAt);

  res.json(customers.map(serializeCustomer));
});

router.post("/customers", async (req, res): Promise<void> => {
  const parsed = CreateCustomerBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { name, email, phone, company, status, totalPurchases } = parsed.data;
  const [customer] = await db
    .insert(customersTable)
    .values({
      name,
      email,
      phone: phone ?? null,
      company: company ?? null,
      status: status ?? "active",
      totalPurchases: String(totalPurchases ?? 0),
    })
    .returning();
  if (!customer) {
    res.status(500).json({ error: "Failed to create customer" });
    return;
  }
  await db.insert(activityTable).values({
    type: "customer_created",
    description: `New customer onboarded`,
    entityName: customer.name,
  });
  res.status(201).json(serializeCustomer(customer));
});

router.get("/customers/:id", async (req, res): Promise<void> => {
  const params = GetCustomerParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [customer] = await db.select().from(customersTable).where(eq(customersTable.id, params.data.id));
  if (!customer) {
    res.status(404).json({ error: "Customer not found" });
    return;
  }
  res.json(serializeCustomer(customer));
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
  const [customer] = await db
    .update(customersTable)
    .set({
      ...(name && { name }),
      ...(email && { email }),
      ...(phone !== undefined && { phone }),
      ...(company !== undefined && { company }),
      ...(status && { status }),
      ...(totalPurchases !== undefined && { totalPurchases: String(totalPurchases) }),
    })
    .where(eq(customersTable.id, params.data.id))
    .returning();
  if (!customer) {
    res.status(404).json({ error: "Customer not found" });
    return;
  }
  res.json(serializeCustomer(customer));
});

router.delete("/customers/:id", async (req, res): Promise<void> => {
  const params = DeleteCustomerParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [customer] = await db.delete(customersTable).where(eq(customersTable.id, params.data.id)).returning();
  if (!customer) {
    res.status(404).json({ error: "Customer not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
