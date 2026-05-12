import { Router, type IRouter } from "express";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { LoginBody, RegisterBody } from "@workspace/api-zod";
import { hashPassword, verifyPassword, generateToken, storeToken, getUserIdFromToken, removeToken } from "../lib/auth";
import { logger } from "../lib/logger";
import { signUpWithSupabase } from "../lib/supabase-auth";

const router: IRouter = Router();

function isDatabaseConnectionError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const message = "message" in error && typeof error.message === "string" ? error.message : "";
  return (
    message.includes("ENOTFOUND") ||
    message.includes("ECONNREFUSED") ||
    message.includes("failed to connect") ||
    message.includes("Failed query:")
  );
}

router.post("/auth/login", async (req, res): Promise<void> => {
  try {
    const parsed = LoginBody.safeParse(req.body);
    if (!parsed.success) {
      logger.warn({ issues: parsed.error.issues }, "Login validation failed");
      res.status(400).json({ error: parsed.error.message });
      return;
    }
    const { email, password } = parsed.data;
    logger.info({ email }, "Login attempt received");
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
    if (!user || !verifyPassword(password, user.passwordHash)) {
      logger.warn({ email }, "Login failed due to invalid credentials");
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }
    const token = generateToken();
    storeToken(token, user.id);
    logger.info({ email, userId: user.id }, "Login succeeded");
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        avatar: user.avatar ?? null,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    logger.error({ error }, "Unexpected login error");
    if (isDatabaseConnectionError(error)) {
      res.status(503).json({ error: "Database connection failed. Update DATABASE_URL with your Supabase session pooler string and try again." });
      return;
    }
    res.status(500).json({ error: "Unexpected error while logging in" });
  }
});

router.post("/auth/register", async (req, res): Promise<void> => {
  const parsed = RegisterBody.safeParse(req.body);
  if (!parsed.success) {
    logger.warn({ issues: parsed.error.issues }, "Register validation failed");
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { name, email, password, role } = parsed.data;
  const resolvedRole = role ?? "user";
  logger.info({ email, name, role: resolvedRole }, "Register attempt received");
  const [existing] = await db.select().from(usersTable).where(eq(usersTable.email, email));
  if (existing) {
    logger.warn({ email, existingUserId: existing.id }, "Register failed because email is already in use locally");
    res.status(400).json({ error: "Email already in use" });
    return;
  }

  try {
    const { data: supabaseData, error: supabaseError } = await signUpWithSupabase({
      email,
      password,
      name,
      role: resolvedRole,
    });

    if (supabaseError) {
      logger.error({ email, error: supabaseError }, "Supabase signup failed");
      res.status(400).json({ error: supabaseError.message || "Failed to create account in Supabase Auth" });
      return;
    }

    logger.info(
      {
        email,
        supabaseUserId: supabaseData.user?.id ?? null,
        hasSupabaseSession: Boolean(supabaseData.session),
      },
      "Supabase signup succeeded",
    );

    const passwordHash = hashPassword(password);
    const [user] = await db
      .insert(usersTable)
      .values({ name, email, passwordHash, role: resolvedRole })
      .returning();
    if (!user) {
      logger.error({ email }, "Local user creation failed after Supabase signup");
      res.status(500).json({ error: "Failed to create local user profile" });
      return;
    }

    const token = generateToken();
    storeToken(token, user.id);
    logger.info({ email, userId: user.id }, "Register succeeded and local session was issued");

    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        avatar: user.avatar ?? null,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    logger.error({ email, error }, "Unexpected register error");
    if (isDatabaseConnectionError(error)) {
      res.status(503).json({ error: "Database connection failed. Update DATABASE_URL with your Supabase session pooler string and try again." });
      return;
    }
    res.status(500).json({ error: "Unexpected error while creating the account" });
  }
});

router.post("/auth/logout", async (req, res): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    removeToken(token);
    logger.info("Logout succeeded");
  }
  res.json({ success: true });
});

router.get("/auth/me", async (req, res): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const token = authHeader.slice(7);
  const userId = getUserIdFromToken(token);
  if (!userId) {
    logger.warn("Auth/me failed because token was not found in memory");
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId));
  if (!user) {
    logger.warn({ userId }, "Auth/me failed because local user was not found");
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    avatar: user.avatar ?? null,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  });
});

export default router;
