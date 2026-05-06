import { db, usersTable, productsTable, customersTable, postsTable, activityTable } from "@workspace/db";
import { hashPassword } from "./auth";
import { logger } from "./logger";
import { sql } from "drizzle-orm";

export async function seedIfEmpty() {
  const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(usersTable);
  if (count > 0) return;

  logger.info("Seeding initial data...");

  // Seed admin user
  await db.insert(usersTable).values([
    { name: "Admin User", email: "admin@empresa.com", passwordHash: hashPassword("admin123"), role: "admin", status: "active" },
    { name: "Maria Garcia", email: "maria@empresa.com", passwordHash: hashPassword("pass123"), role: "manager", status: "active" },
    { name: "Carlos Mendez", email: "carlos@empresa.com", passwordHash: hashPassword("pass123"), role: "user", status: "active" },
  ]);

  // Seed products
  await db.insert(productsTable).values([
    { name: "Enterprise Suite Pro", description: "Full enterprise management solution", price: "2499.99", category: "Software", stock: 50, status: "active" },
    { name: "Analytics Dashboard", description: "Real-time business analytics", price: "899.00", category: "Software", stock: 120, status: "active" },
    { name: "Office Chair Ergonomic", description: "Premium ergonomic office chair", price: "349.99", category: "Furniture", stock: 8, status: "low_stock" },
    { name: "Standing Desk Pro", description: "Height-adjustable standing desk", price: "599.00", category: "Furniture", stock: 15, status: "active" },
    { name: "Wireless Headset", description: "Noise-cancelling wireless headset", price: "199.99", category: "Electronics", stock: 45, status: "active" },
  ]);

  // Seed customers
  await db.insert(customersTable).values([
    { name: "Tech Solutions Inc.", email: "contact@techsolutions.com", phone: "+1-555-0101", company: "Tech Solutions Inc.", status: "active", totalPurchases: "15890.00" },
    { name: "Global Retail Corp", email: "info@globalretail.com", phone: "+1-555-0202", company: "Global Retail Corp", status: "active", totalPurchases: "42300.00" },
    { name: "StartupXYZ", email: "hello@startupxyz.io", phone: "+1-555-0303", company: "StartupXYZ", status: "active", totalPurchases: "3200.00" },
  ]);

  // Seed posts
  await db.insert(postsTable).values([
    { title: "Q1 2026 Business Review", content: "This quarter we achieved significant milestones in product development and customer acquisition.", category: "Reports", status: "published", authorName: "Admin User" },
    { title: "New Product Launch Strategy", content: "Our upcoming product launches will focus on enterprise clients in the LATAM region.", category: "Strategy", status: "draft", authorName: "Maria Garcia" },
    { title: "Team Performance Update", content: "The operations team exceeded targets by 18% this month across all key metrics.", category: "Updates", status: "published", authorName: "Carlos Mendez" },
  ]);

  // Seed activity
  await db.insert(activityTable).values([
    { type: "user_created", description: "New user registered", entityName: "Maria Garcia" },
    { type: "product_created", description: "New product added", entityName: "Enterprise Suite Pro" },
    { type: "customer_created", description: "New customer onboarded", entityName: "Tech Solutions Inc." },
    { type: "post_created", description: "New post published", entityName: "Q1 2026 Business Review" },
    { type: "user_created", description: "New user registered", entityName: "Carlos Mendez" },
  ]);

  logger.info("Seeding complete.");
}
