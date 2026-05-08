import { Router, type IRouter } from "express";
import {
  CreateProductBody,
  UpdateProductBody,
  GetProductParams,
  UpdateProductParams,
  DeleteProductParams,
  ListProductsQueryParams,
} from "@workspace/api-zod";
import { logger } from "../lib/logger";
import {
  addMockActivity,
  createMockProduct,
  deleteMockProduct,
  mockProducts,
  shouldFallbackToMockData,
  updateMockProduct,
} from "../lib/mock-store";
import { addActivity, nowIso, supabaseData } from "../lib/supabase-data";

const router: IRouter = Router();

function serializeProduct(product: {
  id: number;
  name: string;
  description: string | null;
  price: string | number;
  category: string;
  stock: number;
  status: string;
  created_at?: string;
  updated_at?: string;
  createdAt?: string;
  updatedAt?: string;
}) {
  return {
    id: product.id,
    name: product.name,
    description: product.description ?? null,
    price: Number(product.price),
    category: product.category,
    stock: product.stock,
    status: product.status,
    createdAt: product.created_at ?? product.createdAt ?? nowIso(),
    updatedAt: product.updated_at ?? product.updatedAt ?? nowIso(),
  };
}

router.get("/products", async (req, res): Promise<void> => {
  const parsed = ListProductsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { search, category, status } = parsed.data;

  let query = supabaseData
    .from("products")
    .select("id, name, description, price, category, stock, status, created_at, updated_at")
    .order("created_at", { ascending: true });

  if (search) query = query.ilike("name", `%${search}%`);
  if (category) query = query.eq("category", category);
  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) {
    if (!shouldFallbackToMockData(error)) {
      logger.error({ error }, "Failed to list products from Supabase");
      res.status(500).json({ error: error.message || "Failed to load products" });
      return;
    }

    logger.warn({ error }, "Falling back to mock products data");
    const filtered = mockProducts.filter((product) => {
      if (search && !product.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (category && product.category !== category) return false;
      if (status && product.status !== status) return false;
      return true;
    });
    res.json(filtered.map(serializeProduct));
    return;
  }

  res.json((data ?? []).map(serializeProduct));
});

router.post("/products", async (req, res): Promise<void> => {
  const parsed = CreateProductBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { name, description, price, category, stock, status } = parsed.data;
  const { data, error } = await supabaseData
    .from("products")
    .insert({
      name,
      description: description ?? null,
      price: String(price),
      category,
      stock: stock ?? 0,
      status: status ?? "active",
    })
    .select("id, name, description, price, category, stock, status, created_at, updated_at")
    .single();

  if (error) {
    if (!shouldFallbackToMockData(error)) {
      logger.error({ error, name }, "Failed to create product in Supabase");
      res.status(500).json({ error: error.message || "Failed to create product" });
      return;
    }

    logger.warn({ error, name }, "Falling back to mock product creation");
    const mockProduct = createMockProduct({
      name,
      description: description ?? null,
      price,
      category,
      stock: stock ?? 0,
      status: status ?? "active",
    });
    addMockActivity("product_created", "New product added", mockProduct.name);
    res.status(201).json(serializeProduct({
      ...mockProduct,
      created_at: mockProduct.createdAt,
      updated_at: mockProduct.updatedAt,
    }));
    return;
  }

  await addActivity("product_created", "New product added", data.name);
  res.status(201).json(serializeProduct(data));
});

router.get("/products/:id", async (req, res): Promise<void> => {
  const params = GetProductParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const { data, error } = await supabaseData
    .from("products")
    .select("id, name, description, price, category, stock, status, created_at, updated_at")
    .eq("id", params.data.id)
    .maybeSingle();

  if (error) {
    if (!shouldFallbackToMockData(error)) {
      logger.error({ error, productId: params.data.id }, "Failed to fetch product from Supabase");
      res.status(500).json({ error: error.message || "Failed to load product" });
      return;
    }

    const mockProduct = mockProducts.find((product) => product.id === params.data.id);
    if (!mockProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json(serializeProduct({
      ...mockProduct,
      created_at: mockProduct.createdAt,
      updated_at: mockProduct.updatedAt,
    }));
    return;
  }

  if (!data) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.json(serializeProduct(data));
});

router.patch("/products/:id", async (req, res): Promise<void> => {
  const params = UpdateProductParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateProductBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { name, description, price, category, stock, status } = parsed.data;
  const payload: Record<string, unknown> = { updated_at: nowIso() };

  if (name !== undefined) payload.name = name;
  if (description !== undefined) payload.description = description;
  if (price !== undefined) payload.price = String(price);
  if (category !== undefined) payload.category = category;
  if (stock !== undefined) payload.stock = stock;
  if (status !== undefined) payload.status = status;

  const { data, error } = await supabaseData
    .from("products")
    .update(payload)
    .eq("id", params.data.id)
    .select("id, name, description, price, category, stock, status, created_at, updated_at")
    .maybeSingle();

  if (error) {
    if (!shouldFallbackToMockData(error)) {
      logger.error({ error, productId: params.data.id }, "Failed to update product in Supabase");
      res.status(500).json({ error: error.message || "Failed to update product" });
      return;
    }

    const mockProduct = updateMockProduct(params.data.id, {
      ...(name !== undefined ? { name } : {}),
      ...(description !== undefined ? { description } : {}),
      ...(price !== undefined ? { price } : {}),
      ...(category !== undefined ? { category } : {}),
      ...(stock !== undefined ? { stock } : {}),
      ...(status !== undefined ? { status } : {}),
    });

    if (!mockProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json(serializeProduct({
      ...mockProduct,
      created_at: mockProduct.createdAt,
      updated_at: mockProduct.updatedAt,
    }));
    return;
  }

  if (!data) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.json(serializeProduct(data));
});

router.delete("/products/:id", async (req, res): Promise<void> => {
  const params = DeleteProductParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const { data, error } = await supabaseData
    .from("products")
    .delete()
    .eq("id", params.data.id)
    .select("id, name")
    .maybeSingle();

  if (error) {
    if (!shouldFallbackToMockData(error)) {
      logger.error({ error, productId: params.data.id }, "Failed to delete product from Supabase");
      res.status(500).json({ error: error.message || "Failed to delete product" });
      return;
    }

    const mockProduct = deleteMockProduct(params.data.id);
    if (!mockProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.sendStatus(204);
    return;
  }

  if (!data) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
