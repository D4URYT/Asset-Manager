import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import { hashPassword, storeToken } from "../../lib/auth.js";

// ---------------------------------------------------------------------------
// DB mock
// ---------------------------------------------------------------------------
const BASE_USER = {
  id: 1,
  name: "Alice Admin",
  email: "alice@example.com",
  passwordHash: hashPassword("pass1234"),
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
  activityTable: { type: "type", description: "description", entityName: "entity_name" },
  productsTable: {},
  customersTable: {},
  postsTable: {},
}));

const { default: app } = await import("../../app.js");

// ---------------------------------------------------------------------------
// Auth helper: give tests a valid in-memory token
// ---------------------------------------------------------------------------
const ADMIN_TOKEN = "test-users-admin-token-fixed-1234";
storeToken(ADMIN_TOKEN, BASE_USER.id);

const authHeader = { Authorization: `Bearer ${ADMIN_TOKEN}` };

beforeEach(() => {
  vi.clearAllMocks();
  dbMock.select.mockImplementation(() => makeChain([BASE_USER]));
  dbMock.insert.mockImplementation(() => makeChain([BASE_USER]));
  dbMock.update.mockImplementation(() => makeChain([BASE_USER]));
  dbMock.delete.mockImplementation(() => makeChain([BASE_USER]));
});

// ---------------------------------------------------------------------------
// GET /api/users
// ---------------------------------------------------------------------------
describe("GET /api/users", () => {
  it("returns 200 with an array of users", async () => {
    const res = await request(app).get("/api/users").set(authHeader);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("returns 200 with empty array when no users exist", async () => {
    dbMock.select.mockImplementation(() => makeChain([]));
    const res = await request(app).get("/api/users").set(authHeader);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("serialized user does not include passwordHash", async () => {
    const res = await request(app).get("/api/users").set(authHeader);
    expect(res.status).toBe(200);
    if (res.body.length > 0) {
      expect(res.body[0]).not.toHaveProperty("passwordHash");
      expect(res.body[0]).not.toHaveProperty("password_hash");
    }
  });
});

// ---------------------------------------------------------------------------
// POST /api/users
// ---------------------------------------------------------------------------
describe("POST /api/users", () => {
  it("returns 201 with created user", async () => {
    dbMock.insert.mockImplementation(() =>
      makeChain([{ ...BASE_USER, name: "Bob New", email: "bob@example.com" }]),
    );

    const res = await request(app)
      .post("/api/users")
      .set(authHeader)
      .send({
        name: "Bob New",
        email: "bob@example.com",
        password: "bobpass99",
        role: "user",
        status: "active",
      });

    expect(res.status).toBe(201);
    expect(res.body.email).toBe("bob@example.com");
    expect(res.body).not.toHaveProperty("passwordHash");
  });

  it("returns 400 when required fields are missing", async () => {
    const res = await request(app)
      .post("/api/users")
      .set(authHeader)
      .send({ name: "No Email" });

    expect(res.status).toBe(400);
  });
});

// ---------------------------------------------------------------------------
// GET /api/users/:id
// ---------------------------------------------------------------------------
describe("GET /api/users/:id", () => {
  it("returns 200 with user when found", async () => {
    const res = await request(app).get("/api/users/1").set(authHeader);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(BASE_USER.id);
  });

  it("returns 404 when user does not exist", async () => {
    dbMock.select.mockImplementationOnce(() => makeChain([]));
    const res = await request(app).get("/api/users/999").set(authHeader);
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("User not found");
  });

  it("returns 400 for a non-numeric ID", async () => {
    const res = await request(app).get("/api/users/abc").set(authHeader);
    expect(res.status).toBe(400);
  });
});

// ---------------------------------------------------------------------------
// PATCH /api/users/:id
// ---------------------------------------------------------------------------
describe("PATCH /api/users/:id", () => {
  it("returns 200 with updated user", async () => {
    dbMock.update.mockImplementation(() =>
      makeChain([{ ...BASE_USER, name: "Alice Updated" }]),
    );

    const res = await request(app)
      .patch("/api/users/1")
      .set(authHeader)
      .send({ name: "Alice Updated" });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Alice Updated");
  });

  it("returns 404 when user does not exist", async () => {
    dbMock.update.mockImplementation(() => makeChain([]));
    const res = await request(app)
      .patch("/api/users/999")
      .set(authHeader)
      .send({ name: "Ghost" });

    expect(res.status).toBe(404);
  });
});

// ---------------------------------------------------------------------------
// DELETE /api/users/:id
// ---------------------------------------------------------------------------
describe("DELETE /api/users/:id", () => {
  it("returns 204 when user is deleted", async () => {
    dbMock.delete.mockImplementation(() => makeChain([BASE_USER]));
    const res = await request(app).delete("/api/users/1").set(authHeader);
    expect(res.status).toBe(204);
  });

  it("returns 404 when user does not exist", async () => {
    dbMock.delete.mockImplementation(() => makeChain([]));
    const res = await request(app).delete("/api/users/999").set(authHeader);
    expect(res.status).toBe(404);
  });
});
