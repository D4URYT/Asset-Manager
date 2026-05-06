import { Router, type IRouter } from "express";
import { db, usersTable, productsTable, customersTable, activityTable } from "@workspace/db";
import { eq, sql, gte, lte } from "drizzle-orm";

const router: IRouter = Router();

router.get("/dashboard/stats", async (_req, res): Promise<void> => {
  const [totalUsersRow] = await db.select({ count: sql<number>`count(*)::int` }).from(usersTable);
  const [totalProductsRow] = await db.select({ count: sql<number>`count(*)::int` }).from(productsTable);
  const [totalCustomersRow] = await db.select({ count: sql<number>`count(*)::int` }).from(customersTable);
  const [revenueRow] = await db.select({ total: sql<number>`coalesce(sum(total_purchases::numeric), 0)::float` }).from(customersTable);
  const [activeUsersRow] = await db.select({ count: sql<number>`count(*)::int` }).from(usersTable).where(eq(usersTable.status, "active"));
  const [lowStockRow] = await db.select({ count: sql<number>`count(*)::int` }).from(productsTable).where(eq(productsTable.status, "low_stock"));

  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);
  const [newCustomersRow] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(customersTable)
    .where(gte(customersTable.createdAt, monthStart));

  res.json({
    totalUsers: totalUsersRow?.count ?? 0,
    totalProducts: totalProductsRow?.count ?? 0,
    totalCustomers: totalCustomersRow?.count ?? 0,
    totalRevenue: revenueRow?.total ?? 0,
    activeUsers: activeUsersRow?.count ?? 0,
    lowStockProducts: lowStockRow?.count ?? 0,
    newCustomersThisMonth: newCustomersRow?.count ?? 0,
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
  const items = await db
    .select()
    .from(activityTable)
    .orderBy(sql`${activityTable.createdAt} desc`)
    .limit(10);
  res.json(
    items.map((item) => ({
      id: item.id,
      type: item.type,
      description: item.description,
      entityName: item.entityName,
      createdAt: item.createdAt.toISOString(),
    }))
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
  const rows = await db
    .select({
      category: productsTable.category,
      count: sql<number>`count(*)::int`,
    })
    .from(productsTable)
    .groupBy(productsTable.category);

  const total = rows.reduce((sum, r) => sum + r.count, 0) || 1;
  res.json(
    rows.map((r) => ({
      category: r.category,
      count: r.count,
      percentage: Math.round((r.count / total) * 100),
    }))
  );
});

export default router;
