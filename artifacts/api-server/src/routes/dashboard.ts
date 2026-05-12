import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";
import { mockActivity, mockCustomers, mockProducts, mockUsers, shouldFallbackToMockData } from "../lib/mock-store";
import { supabaseData } from "../lib/supabase-data";

const router: IRouter = Router();

router.get("/dashboard/stats", async (_req, res): Promise<void> => {
  const [usersRes, productsRes, customersRes] = await Promise.all([
    supabaseData.from("users").select("id, status"),
    supabaseData.from("products").select("id, status"),
    supabaseData.from("customers").select("id, total_purchases, created_at"),
  ]);

  if (usersRes.error || productsRes.error || customersRes.error) {
    const errors = [usersRes.error, productsRes.error, customersRes.error].filter(Boolean);
    if (!errors.every((error) => shouldFallbackToMockData(error))) {
      logger.error(
        {
          usersError: usersRes.error,
          productsError: productsRes.error,
          customersError: customersRes.error,
        },
        "Failed to load dashboard stats from Supabase",
      );
      res.status(500).json({ error: "Failed to load dashboard stats" });
      return;
    }

    logger.warn(
      {
        usersError: usersRes.error,
        productsError: productsRes.error,
        customersError: customersRes.error,
      },
      "Falling back to mock dashboard stats",
    );

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    res.json({
      totalUsers: mockUsers.length,
      totalProducts: mockProducts.length,
      totalCustomers: mockCustomers.length,
      totalRevenue: mockCustomers.reduce((sum, customer) => sum + Number(customer.totalPurchases ?? 0), 0),
      activeUsers: mockUsers.filter((user) => user.status === "active").length,
      lowStockProducts: mockProducts.filter((product) => product.status === "low_stock").length,
      newCustomersThisMonth: mockCustomers.filter((customer) => new Date(customer.createdAt) >= monthStart).length,
      revenueGrowth: 12.5,
    });
    return;
  }

  const users = usersRes.data ?? [];
  const products = productsRes.data ?? [];
  const customers = customersRes.data ?? [];
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  res.json({
    totalUsers: users.length,
    totalProducts: products.length,
    totalCustomers: customers.length,
    totalRevenue: customers.reduce((sum, customer) => sum + Number(customer.total_purchases ?? 0), 0),
    activeUsers: users.filter((user) => user.status === "active").length,
    lowStockProducts: products.filter((product) => product.status === "low_stock").length,
    newCustomersThisMonth: customers.filter((customer) => new Date(customer.created_at) >= monthStart).length,
    revenueGrowth: 12.5,
  });
});

router.get("/dashboard/sales", async (_req, res): Promise<void> => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const now = new Date();
  const data = months.slice(0, now.getMonth() + 1).map((month, i) => ({
    month,
    sales: Math.round(25000 + Math.random() * 40000 + i * 3000),
    orders: Math.round(80 + Math.random() * 120 + i * 5),
  }));
  res.json(data);
});

router.get("/dashboard/activity", async (_req, res): Promise<void> => {
  const { data, error } = await supabaseData
    .from("activity")
    .select("id, type, description, entity_name, created_at")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    if (!shouldFallbackToMockData(error)) {
      logger.error({ error }, "Failed to load dashboard activity from Supabase");
      res.status(500).json({ error: error.message || "Failed to load dashboard activity" });
      return;
    }

    logger.warn({ error }, "Falling back to mock dashboard activity");
    res.json(
      mockActivity.slice(0, 10).map((item) => ({
        id: item.id,
        type: item.type,
        description: item.description,
        entityName: item.entityName,
        createdAt: item.createdAt,
      })),
    );
    return;
  }

  res.json(
    (data ?? []).map((item) => ({
      id: item.id,
      type: item.type,
      description: item.description,
      entityName: item.entity_name,
      createdAt: item.created_at,
    })),
  );
});

router.get("/dashboard/user-growth", async (_req, res): Promise<void> => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const now = new Date();
  let cumulative = 10;
  const data = months.slice(0, now.getMonth() + 1).map((month) => {
    cumulative += Math.round(5 + Math.random() * 20);
    return { month, users: cumulative };
  });
  res.json(data);
});

router.get("/dashboard/product-distribution", async (_req, res): Promise<void> => {
  const { data, error } = await supabaseData.from("products").select("category");

  if (error) {
    if (!shouldFallbackToMockData(error)) {
      logger.error({ error }, "Failed to load product distribution from Supabase");
      res.status(500).json({ error: error.message || "Failed to load product distribution" });
      return;
    }

    logger.warn({ error }, "Falling back to mock product distribution");
    const grouped = new Map<string, number>();
    for (const product of mockProducts) {
      grouped.set(product.category, (grouped.get(product.category) ?? 0) + 1);
    }

    const rows = [...grouped.entries()].map(([category, count]) => ({ category, count }));
    const total = rows.reduce((sum, row) => sum + row.count, 0) || 1;

    res.json(rows.map((row) => ({ ...row, percentage: Math.round((row.count / total) * 100) })));
    return;
  }

  const grouped = new Map<string, number>();
  for (const product of data ?? []) {
    grouped.set(product.category, (grouped.get(product.category) ?? 0) + 1);
  }

  const rows = [...grouped.entries()].map(([category, count]) => ({ category, count }));
  const total = rows.reduce((sum, row) => sum + row.count, 0) || 1;

  res.json(rows.map((row) => ({ ...row, percentage: Math.round((row.count / total) * 100) })));
});

export default router;
