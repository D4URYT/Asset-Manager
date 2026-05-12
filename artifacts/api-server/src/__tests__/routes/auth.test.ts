import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import request from "supertest";
import { hashPassword } from "../../lib/auth.js";

// ---------------------------------------------------------------------------
// DB mock — must be declared before any module imports that use @workspace/db
// ---------------------------------------------------------------------------
const mockUser = {
  id: 1,
  name: "Test User",
  email: "test@example.com",
  passwordHash: hashPassword("password123"),
  role: "user",
  status: "active",
  avatar: null,
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

function makeChain(result: unknown) {
  const p = Promise.resolve(result);
  const proxy: unknown = new Proxy(
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
  return proxy;
}

const dbMock = {
  _selectResult: [] as unknown[],
  _insertResult: [] as unknown[],
  select: vi.fn(),
  insert: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

vi.mock("@workspace/db", () => ({
  db: dbMock,
  usersTable: {
    id: "id",
    email: "email",
    name: "name",
    role: "role",
    status: "status",
    passwordHash: "password_hash",
    avatar: "avatar",
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  activityTable: { type: "type", description: "description", entityName: "entity_name" },
  productsTable: {},
  customersTable: {},
  postsTable: {},
}));

// Import app AFTER mocks are set up
const { default: app } = await import("../../app.js");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function setupSelect(rows: unknown[]) {
  dbMock.select.mockImplementation(() => makeChain(rows));
}
function setupInsert(rows: unknown[]) {
  dbMock.insert.mockImplementation(() => makeChain(rows));
}

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// POST /api/auth/login
// ---------------------------------------------------------------------------
describe("POST /api/auth/login", () => {
  it("returns 200 with token on valid credentials", async () => {
    setupSelect([mockUser]);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password123" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(typeof res.body.token).toBe("string");
    expect(res.body.token).toHaveLength(64);
    expect(res.body.user.email).toBe("test@example.com");
    expect(res.body.user).not.toHaveProperty("passwordHash");
  });

  it("returns 401 when user is not found", async () => {
    setupSelect([]);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "nobody@example.com", password: "password123" });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Invalid email or password");
  });

  it("returns 401 when password is wrong", async () => {
    setupSelect([mockUser]);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "wrongpassword" });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Invalid email or password");
  });

  it("returns 400 when body is missing email", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ password: "password123" });

    expect(res.status).toBe(400);
  });

  it("returns 400 when body is missing password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com" });

    expect(res.status).toBe(400);
  });

  it("returns 401 when email format is invalid (no user found)", async () => {
    setupSelect([]);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "not-an-email", password: "password123" });

    // LoginBody uses z.string() not z.email() — any non-empty string is accepted
    // and gets a 401 because no user exists with that "email"
    expect(res.status).toBe(401);
  });
});

// ---------------------------------------------------------------------------
// POST /api/auth/register
// ---------------------------------------------------------------------------
describe("POST /api/auth/register", () => {
  it("returns 201 with token and user on successful registration", async () => {
    setupSelect([]);
    setupInsert([{ ...mockUser, email: "new@example.com", name: "New User" }]);

    const res = await request(app).post("/api/auth/register").send({
      name: "New User",
      email: "new@example.com",
      password: "securePass99",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe("new@example.com");
    expect(res.body.user).not.toHaveProperty("passwordHash");
  });

  it("returns 400 when email is already in use", async () => {
    setupSelect([mockUser]);

    const res = await request(app).post("/api/auth/register").send({
      name: "Dup User",
      email: "test@example.com",
      password: "securePass99",
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Email already in use");
  });

  it("returns 400 when required fields are missing", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@example.com" });

    expect(res.status).toBe(400);
  });

  it("returns 400 when password is too short (< 6 chars)", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "User",
      email: "user@example.com",
      password: "123",
    });

    expect(res.status).toBe(400);
  });
});

// ---------------------------------------------------------------------------
// POST /api/auth/logout
// ---------------------------------------------------------------------------
describe("POST /api/auth/logout", () => {
  it("returns 200 with success even without a token", async () => {
    const res = await request(app).post("/api/auth/logout");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("returns 200 and clears a valid bearer token", async () => {
    setupSelect([mockUser]);
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password123" });

    const { token } = loginRes.body as { token: string };

    const logoutRes = await request(app)
      .post("/api/auth/logout")
      .set("Authorization", `Bearer ${token}`);

    expect(logoutRes.status).toBe(200);
    expect(logoutRes.body.success).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// GET /api/auth/me
// ---------------------------------------------------------------------------
describe("GET /api/auth/me", () => {
  it("returns 401 when no authorization header is provided", async () => {
    const res = await request(app).get("/api/auth/me");
    expect(res.status).toBe(401);
  });

  it("returns 401 for an invalid token", async () => {
    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", "Bearer invalidtoken000");
    expect(res.status).toBe(401);
  });

  it("returns 200 with user data for a valid token", async () => {
    setupSelect([mockUser]);
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password123" });

    const { token } = loginRes.body as { token: string };

    setupSelect([mockUser]);
    const meRes = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(meRes.status).toBe(200);
    expect(meRes.body.email).toBe("test@example.com");
    expect(meRes.body).not.toHaveProperty("passwordHash");
  });
});
