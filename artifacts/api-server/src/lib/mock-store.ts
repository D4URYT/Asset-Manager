type UserRecord = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
};

type ProductRecord = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  category: string;
  stock: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type CustomerRecord = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  status: string;
  totalPurchases: number;
  createdAt: string;
  updatedAt: string;
};

type PostRecord = {
  id: number;
  title: string;
  content: string;
  category: string;
  status: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
};

type ActivityRecord = {
  id: number;
  type: string;
  description: string;
  entityName: string;
  createdAt: string;
};

const nowIso = () => new Date().toISOString();

let userId = 4;
let productId = 6;
let customerId = 4;
let postId = 4;
let activityId = 6;

export const mockUsers: UserRecord[] = [
  { id: 1, name: "Admin User", email: "admin@empresa.com", role: "admin", status: "active", avatar: null, createdAt: nowIso(), updatedAt: nowIso() },
  { id: 2, name: "Maria Garcia", email: "maria@empresa.com", role: "manager", status: "active", avatar: null, createdAt: nowIso(), updatedAt: nowIso() },
  { id: 3, name: "Carlos Mendez", email: "carlos@empresa.com", role: "user", status: "active", avatar: null, createdAt: nowIso(), updatedAt: nowIso() },
];

export const mockProducts: ProductRecord[] = [
  { id: 1, name: "Enterprise Suite Pro", description: "Full enterprise management solution", price: 2499.99, category: "Software", stock: 50, status: "active", createdAt: nowIso(), updatedAt: nowIso() },
  { id: 2, name: "Analytics Dashboard", description: "Real-time business analytics", price: 899, category: "Software", stock: 120, status: "active", createdAt: nowIso(), updatedAt: nowIso() },
  { id: 3, name: "Office Chair Ergonomic", description: "Premium ergonomic office chair", price: 349.99, category: "Furniture", stock: 8, status: "low_stock", createdAt: nowIso(), updatedAt: nowIso() },
  { id: 4, name: "Standing Desk Pro", description: "Height-adjustable standing desk", price: 599, category: "Furniture", stock: 15, status: "active", createdAt: nowIso(), updatedAt: nowIso() },
  { id: 5, name: "Wireless Headset", description: "Noise-cancelling wireless headset", price: 199.99, category: "Electronics", stock: 45, status: "active", createdAt: nowIso(), updatedAt: nowIso() },
];

export const mockCustomers: CustomerRecord[] = [
  { id: 1, name: "Tech Solutions Inc.", email: "contact@techsolutions.com", phone: "+1-555-0101", company: "Tech Solutions Inc.", status: "active", totalPurchases: 15890, createdAt: nowIso(), updatedAt: nowIso() },
  { id: 2, name: "Global Retail Corp", email: "info@globalretail.com", phone: "+1-555-0202", company: "Global Retail Corp", status: "active", totalPurchases: 42300, createdAt: nowIso(), updatedAt: nowIso() },
  { id: 3, name: "StartupXYZ", email: "hello@startupxyz.io", phone: "+1-555-0303", company: "StartupXYZ", status: "active", totalPurchases: 3200, createdAt: nowIso(), updatedAt: nowIso() },
];

export const mockPosts: PostRecord[] = [
  { id: 1, title: "Q1 2026 Business Review", content: "This quarter we achieved significant milestones in product development and customer acquisition.", category: "Reports", status: "published", authorName: "Admin User", createdAt: nowIso(), updatedAt: nowIso() },
  { id: 2, title: "New Product Launch Strategy", content: "Our upcoming product launches will focus on enterprise clients in the LATAM region.", category: "Strategy", status: "draft", authorName: "Maria Garcia", createdAt: nowIso(), updatedAt: nowIso() },
  { id: 3, title: "Team Performance Update", content: "The operations team exceeded targets by 18% this month across all key metrics.", category: "Updates", status: "published", authorName: "Carlos Mendez", createdAt: nowIso(), updatedAt: nowIso() },
];

export const mockActivity: ActivityRecord[] = [
  { id: 1, type: "user_created", description: "New user registered", entityName: "Maria Garcia", createdAt: nowIso() },
  { id: 2, type: "product_created", description: "New product added", entityName: "Enterprise Suite Pro", createdAt: nowIso() },
  { id: 3, type: "customer_created", description: "New customer onboarded", entityName: "Tech Solutions Inc.", createdAt: nowIso() },
  { id: 4, type: "post_created", description: "New post published", entityName: "Q1 2026 Business Review", createdAt: nowIso() },
  { id: 5, type: "user_created", description: "New user registered", entityName: "Carlos Mendez", createdAt: nowIso() },
];

export function shouldFallbackToMockData(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const message = "message" in error && typeof error.message === "string" ? error.message : "";
  return (
    message.includes("row-level security") ||
    message.includes("permission denied") ||
    message.includes("JWT") ||
    message.includes("relation") ||
    message.includes("does not exist") ||
    message.includes("fetch failed") ||
    message.includes("ENOTFOUND") ||
    message.includes("ECONNREFUSED") ||
    message.includes("Failed query:") ||
    message.includes("connect")
  );
}

export const isDatabaseConnectionError = shouldFallbackToMockData;

export function addMockActivity(type: string, description: string, entityName: string) {
  mockActivity.unshift({
    id: activityId++,
    type,
    description,
    entityName,
    createdAt: nowIso(),
  });
}

export function createMockUser(data: Omit<UserRecord, "id" | "createdAt" | "updatedAt">) {
  const record = { ...data, id: userId++, createdAt: nowIso(), updatedAt: nowIso() };
  mockUsers.unshift(record);
  return record;
}

export function createMockProduct(data: Omit<ProductRecord, "id" | "createdAt" | "updatedAt">) {
  const record = { ...data, id: productId++, createdAt: nowIso(), updatedAt: nowIso() };
  mockProducts.unshift(record);
  return record;
}

export function createMockCustomer(data: Omit<CustomerRecord, "id" | "createdAt" | "updatedAt">) {
  const record = { ...data, id: customerId++, createdAt: nowIso(), updatedAt: nowIso() };
  mockCustomers.unshift(record);
  return record;
}

export function createMockPost(data: Omit<PostRecord, "id" | "createdAt" | "updatedAt">) {
  const record = { ...data, id: postId++, createdAt: nowIso(), updatedAt: nowIso() };
  mockPosts.unshift(record);
  return record;
}

export function updateMockUser(id: number, data: Partial<Omit<UserRecord, "id" | "createdAt">>) {
  const record = mockUsers.find((item) => item.id === id);
  if (!record) return null;
  Object.assign(record, data, { updatedAt: nowIso() });
  return record;
}

export function updateMockProduct(id: number, data: Partial<Omit<ProductRecord, "id" | "createdAt">>) {
  const record = mockProducts.find((item) => item.id === id);
  if (!record) return null;
  Object.assign(record, data, { updatedAt: nowIso() });
  return record;
}

export function updateMockCustomer(id: number, data: Partial<Omit<CustomerRecord, "id" | "createdAt">>) {
  const record = mockCustomers.find((item) => item.id === id);
  if (!record) return null;
  Object.assign(record, data, { updatedAt: nowIso() });
  return record;
}

export function updateMockPost(id: number, data: Partial<Omit<PostRecord, "id" | "createdAt">>) {
  const record = mockPosts.find((item) => item.id === id);
  if (!record) return null;
  Object.assign(record, data, { updatedAt: nowIso() });
  return record;
}

export function deleteMockUser(id: number) {
  const index = mockUsers.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const [record] = mockUsers.splice(index, 1);
  return record ?? null;
}

export function deleteMockProduct(id: number) {
  const index = mockProducts.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const [record] = mockProducts.splice(index, 1);
  return record ?? null;
}

export function deleteMockCustomer(id: number) {
  const index = mockCustomers.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const [record] = mockCustomers.splice(index, 1);
  return record ?? null;
}

export function deleteMockPost(id: number) {
  const index = mockPosts.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const [record] = mockPosts.splice(index, 1);
  return record ?? null;
}
