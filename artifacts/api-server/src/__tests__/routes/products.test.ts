import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import { hashPassword, storeToken } from "../../lib/auth.js";

// ---------------------------------------------------------------------------
// DB mock
// ---------------------------------------------------------------------------
const BASE_PRODUCT = {
  id: 1,
  name: "Test Product",
  description: "A great product",
  price: "99.99",
  category: "Electronics",
  stock: 50,
  status: "active",
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

const BASE_USER = {
  id: 10,
  name: "Admin",
  email: "admin@example.com",
  passwordHash: hashPassword("adminpass"),
  role: "admin",
  status: "active",
  avatar: null,
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

function makeChain(result: unknown) {
  const p = Promise.resolve(result);
  return new Proxy(
    {},
    {
      get(_, key) {
        if (key === "then") return (p as Promise<unknown>).then.bind(p);
        if (key === "catch") return (p as Promise<unknown>).catch.bind(p);
        if (key === "finally") return (p as Promise<unknown>).finally.bind(p);
        return (..._args: unknown[]) => makeChain(result);
      },
    },
  );
}

const dbMock = {
  select: vi.fn(),
  insert: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

vi.mock("@workspace/db", () => ({
  db: dbMock,
  usersTable: {
    id: "id", email: "email", name: "name", role: "role",
    status: "status", passwordHash: "password_hash",
    avatar: "avatar", createdAt: "created_at", updatedAt: "updated_at",
  },
  productsTable: {
    id: "id", name: "name", description: "description", price: "price",
    category: "category", stock: "stock", status: "status",
    createdAt: "created_at", updatedAt: "updated_at",
  },
  activityTable: { type: "type", description: "description", entityName: "entity_name" },
  customersTable: {},
  postsTable: {},
}));

const { default: app } = await import("../../app.js");

// Pre-register a token so these tests don't need to login
const PROD_TOKEN = "test-products-token-fixed-99999999";
storeToken(PROD_TOKEN, BASE_USER.id);
const authHeader = { Authorization: `Bearer ${PROD_TOKEN}` };

beforeEach(() => {
  vi.clearAllMocks();
  dbMock.select.mockImplementation(() => makeChain([BASE_USER]));
  dbMock.insert.mockImplementation(() => makeChain([BASE_PRODUCT]));
  dbMock.update.mockImplementation(() => makeChain([BASE_PRODUCT]));
  dbMock.delete.mockImplementation(() => makeChain([BASE_PRODUCT]));
});

// ---------------------------------------------------------------------------
// GET /api/products
// ---------------------------------------------------------------------------
describe("GET /api/products", () => {
  it("returns 200 with array of products", async () => {
    dbMock.select.mockImplementation(() => makeChain([BASE_PRODUCT]));
    const res = await request(app).get("/api/products").set(authHeader);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("price is serialized as a number (not a string)", async () => {
    dbMock.select.mockImplementation(() => makeChain([BASE_PRODUCT]));
    const res = await request(app).get("/api/products").set(authHeader);
    expect(res.status).toBe(200);
    if (res.body.length > 0) {
      expect(typeof res.body[0].price).toBe("number");
    }
  });

  it("returns empty array when no products", async () => {
    dbMock.select.mockImplementation(() => makeChain([]));
    const res = await request(app).get("/api/products").set(authHeader);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// POST /api/products
// ---------------------------------------------------------------------------
describe("POST /api/products", () => {
  it("returns 201 with the created product", async () => {
    const res = await request(app)
      .post("/api/products")
      .set(authHeader)
      .send({
        name: "New Widget",
        price: 49.99,
        category: "Gadgets",
        stock: 100,
        status: "active",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("price");
  });

  it("returns 400 when name is missing", async () => {
    const res = await request(app)
      .post("/api/products")
      .set(authHeader)
      .send({ price: 10, category: "X" });

    expect(res.status).toBe(400);
  });

  it("returns 400 when price is missing", async () => {
    const res = await request(app)
      .post("/api/products")
      .set(authHeader)
      .send({ name: "No Price", category: "X" });

    expect(res.status).toBe(400);
  });

  it("returns 400 when category is missing", async () => {
    const res = await request(app)
      .post("/api/products")
      .set(authHeader)
      .send({ name: "No Cat", price: 9.99 });

    expect(res.status).toBe(400);
  });
});

// ---------------------------------------------------------------------------
// GET /api/products/:id
// ---------------------------------------------------------------------------
describe("GET /api/products/:id", () => {
  it("returns 200 with product when found", async () => {
    dbMock.select.mockImplementation(() => makeChain([BASE_PRODUCT]));
    const res = await request(app).get("/api/products/1").set(authHeader);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(BASE_PRODUCT.id);
  });

  it("returns 404 when product does not exist", async () => {
    dbMock.select.mockImplementation(() => makeChain([]));
    const res = await request(app).get("/api/products/999").set(authHeader);
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Product not found");
  });

  it("returns 400 for non-numeric ID", async () => {
    const res = await request(app).get("/api/products/abc").set(authHeader);
    expect(res.status).toBe(400);
  });
});

// ---------------------------------------------------------------------------
// PATCH /api/products/:id
// ---------------------------------------------------------------------------
describe("PATCH /api/products/:id", () => {
  it("returns 200 with updated product", async () => {
    dbMock.update.mockImplementation(() =>
      makeChain([{ ...BASE_PRODUCT, name: "Updated Widget" }]),
    );
    const res = await request(app)
      .patch("/api/products/1")
      .set(authHeader)
      .send({ name: "Updated Widget" });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Updated Widget");
  });

  it("returns 404 when product does not exist", async () => {
    dbMock.update.mockImplementation(() => makeChain([]));
    const res = await request(app)
      .patch("/api/products/999")
      .set(authHeader)
      .send({ name: "Ghost" });

    expect(res.status).toBe(404);
  });
});

// ---------------------------------------------------------------------------
// DELETE /api/products/:id
// ---------------------------------------------------------------------------
describe("DELETE /api/products/:id", () => {
  it("returns 204 when product is deleted", async () => {
    dbMock.delete.mockImplementation(() => makeChain([BASE_PRODUCT]));
    const res = await request(app).delete("/api/products/1").set(authHeader);
    expect(res.status).toBe(204);
  });

  it("returns 404 when product does not exist", async () => {
    dbMock.delete.mockImplementation(() => makeChain([]));
    const res = await request(app).delete("/api/products/999").set(authHeader);
    expect(res.status).toBe(404);
  });
});
