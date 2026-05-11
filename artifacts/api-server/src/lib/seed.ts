import { hashPassword } from "./auth";
import { logger } from "./logger";
import { supabaseData } from "./supabase-data";

export async function seedIfEmpty() {
  const { count, error: countError } = await supabaseData
    .from("users")
    .select("id", { count: "exact", head: true });

  if (countError) {
    throw countError;
  }

  if ((count ?? 0) > 0) return;

  logger.info("Seeding initial Supabase data...");

  const { error: usersError } = await supabaseData.from("users").insert([
    { name: "Admin User", email: "admin@empresa.com", password_hash: hashPassword("admin123"), role: "admin", status: "active" },
    { name: "Maria Garcia", email: "maria@empresa.com", password_hash: hashPassword("pass123"), role: "manager", status: "active" },
    { name: "Carlos Mendez", email: "carlos@empresa.com", password_hash: hashPassword("pass123"), role: "user", status: "active" },
  ]);
  if (usersError) throw usersError;

  const { error: productsError } = await supabaseData.from("products").insert([
    { name: "Enterprise Suite Pro", description: "Full enterprise management solution", price: "2499.99", category: "Software", stock: 50, status: "active" },
    { name: "Analytics Dashboard", description: "Real-time business analytics", price: "899.00", category: "Software", stock: 120, status: "active" },
    { name: "Office Chair Ergonomic", description: "Premium ergonomic office chair", price: "349.99", category: "Furniture", stock: 8, status: "low_stock" },
    { name: "Standing Desk Pro", description: "Height-adjustable standing desk", price: "599.00", category: "Furniture", stock: 15, status: "active" },
    { name: "Wireless Headset", description: "Noise-cancelling wireless headset", price: "199.99", category: "Electronics", stock: 45, status: "active" },
  ]);
  if (productsError) throw productsError;

  const { error: customersError } = await supabaseData.from("customers").insert([
    { name: "Tech Solutions Inc.", email: "contact@techsolutions.com", phone: "+1-555-0101", company: "Tech Solutions Inc.", status: "active", total_purchases: "15890.00" },
    { name: "Global Retail Corp", email: "info@globalretail.com", phone: "+1-555-0202", company: "Global Retail Corp", status: "active", total_purchases: "42300.00" },
    { name: "StartupXYZ", email: "hello@startupxyz.io", phone: "+1-555-0303", company: "StartupXYZ", status: "active", total_purchases: "3200.00" },
  ]);
  if (customersError) throw customersError;

  const { error: postsError } = await supabaseData.from("posts").insert([
    { title: "Q1 2026 Business Review", content: "This quarter we achieved significant milestones in product development and customer acquisition.", category: "Reports", status: "published", author_name: "Admin User" },
    { title: "New Product Launch Strategy", content: "Our upcoming product launches will focus on enterprise clients in the LATAM region.", category: "Strategy", status: "draft", author_name: "Maria Garcia" },
    { title: "Team Performance Update", content: "The operations team exceeded targets by 18% this month across all key metrics.", category: "Updates", status: "published", author_name: "Carlos Mendez" },
  ]);
  if (postsError) throw postsError;

  const { error: activityError } = await supabaseData.from("activity").insert([
    { type: "user_created", description: "New user registered", entity_name: "Maria Garcia" },
    { type: "product_created", description: "New product added", entity_name: "Enterprise Suite Pro" },
    { type: "customer_created", description: "New customer onboarded", entity_name: "Tech Solutions Inc." },
    { type: "post_created", description: "New post published", entity_name: "Q1 2026 Business Review" },
    { type: "user_created", description: "New user registered", entity_name: "Carlos Mendez" },
  ]);
  if (activityError) throw activityError;

  logger.info("Supabase seeding complete.");
}
