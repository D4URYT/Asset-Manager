import { Router, type IRouter } from "express";
import {
  CreateUserBody,
  UpdateUserBody,
  GetUserParams,
  UpdateUserParams,
  DeleteUserParams,
  ListUsersQueryParams,
} from "@workspace/api-zod";
import { hashPassword } from "../lib/auth";
import { logger } from "../lib/logger";
import {
  addMockActivity,
  createMockUser,
  deleteMockUser,
  mockUsers,
  shouldFallbackToMockData,
  updateMockUser,
} from "../lib/mock-store";
import { addActivity, nowIso, supabaseData } from "../lib/supabase-data";
import { signUpWithSupabase } from "../lib/supabase-auth";

const router: IRouter = Router();

function serializeUser(user: {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar: string | null;
  created_at?: string;
  updated_at?: string;
  createdAt?: string;
  updatedAt?: string;
}) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    avatar: user.avatar ?? null,
    createdAt: user.created_at ?? user.createdAt ?? nowIso(),
    updatedAt: user.updated_at ?? user.updatedAt ?? nowIso(),
  };
}

router.get("/users", async (req, res): Promise<void> => {
  const parsed = ListUsersQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { search, role, status } = parsed.data;

  let query = supabaseData
    .from("users")
    .select("id, name, email, role, status, avatar, created_at, updated_at")
    .order("created_at", { ascending: true });

  if (search) query = query.ilike("name", `%${search}%`);
  if (role) query = query.eq("role", role);
  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) {
    if (!shouldFallbackToMockData(error)) {
      logger.error({ error }, "Failed to list users from Supabase");
      res.status(500).json({ error: error.message || "Failed to load users" });
      return;
    }

    logger.warn({ error }, "Falling back to mock users data");
    const filtered = mockUsers.filter((user) => {
      if (search && !user.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (role && user.role !== role) return false;
      if (status && user.status !== status) return false;
      return true;
    });
    res.json(filtered.map(serializeUser));
    return;
  }

  res.json((data ?? []).map(serializeUser));
});

router.post("/users", async (req, res): Promise<void> => {
  const parsed = CreateUserBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { name, email, password, role, status, avatar } = parsed.data;
  const resolvedRole = role ?? "user";
  const resolvedStatus = status ?? "active";

  const { data: existingUser, error: existingError } = await supabaseData
    .from("users")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existingError) {
    if (!shouldFallbackToMockData(existingError)) {
      logger.error({ error: existingError, email }, "Failed to check existing user in Supabase");
      res.status(500).json({ error: existingError.message || "Failed to validate user email" });
      return;
    }

    const existingMockUser = mockUsers.find((user) => user.email.toLowerCase() === email.toLowerCase());
    if (existingMockUser) {
      res.status(400).json({ error: "Email already in use" });
      return;
    }

    const mockUser = createMockUser({
      name,
      email,
      role: resolvedRole,
      status: resolvedStatus,
      avatar: avatar ?? null,
    });
    addMockActivity("user_created", "New user registered", mockUser.name);
    res.status(201).json(serializeUser({
      ...mockUser,
      created_at: mockUser.createdAt,
      updated_at: mockUser.updatedAt,
    }));
    return;
  }

  if (existingUser) {
    res.status(400).json({ error: "Email already in use" });
    return;
  }

  const { error: signUpError } = await signUpWithSupabase({
    email,
    password,
    name,
    role: resolvedRole,
  });

  if (signUpError) {
    if (!shouldFallbackToMockData(signUpError)) {
      logger.error({ error: signUpError, email }, "Supabase Auth user creation failed");
      res.status(400).json({ error: signUpError.message || "Failed to create Supabase Auth user" });
      return;
    }

    logger.warn({ error: signUpError, email }, "Falling back to mock user creation after Supabase Auth failure");
    const mockUser = createMockUser({
      name,
      email,
      role: resolvedRole,
      status: resolvedStatus,
      avatar: avatar ?? null,
    });
    addMockActivity("user_created", "New user registered", mockUser.name);
    res.status(201).json(serializeUser({
      ...mockUser,
      created_at: mockUser.createdAt,
      updated_at: mockUser.updatedAt,
    }));
    return;
  }

  const { data, error } = await supabaseData
    .from("users")
    .insert({
      name,
      email,
      password_hash: hashPassword(password),
      role: resolvedRole,
      status: resolvedStatus,
      avatar: avatar ?? null,
    })
    .select("id, name, email, role, status, avatar, created_at, updated_at")
    .single();

  if (error) {
    if (!shouldFallbackToMockData(error)) {
      logger.error({ error, email }, "Failed to create user profile in Supabase");
      res.status(500).json({ error: error.message || "Failed to create user" });
      return;
    }

    logger.warn({ error, email }, "Falling back to mock user profile creation");
    const mockUser = createMockUser({
      name,
      email,
      role: resolvedRole,
      status: resolvedStatus,
      avatar: avatar ?? null,
    });
    addMockActivity("user_created", "New user registered", mockUser.name);
    res.status(201).json(serializeUser({
      ...mockUser,
      created_at: mockUser.createdAt,
      updated_at: mockUser.updatedAt,
    }));
    return;
  }

  await addActivity("user_created", "New user registered", data.name);
  res.status(201).json(serializeUser(data));
});

router.get("/users/:id", async (req, res): Promise<void> => {
  const params = GetUserParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const { data, error } = await supabaseData
    .from("users")
    .select("id, name, email, role, status, avatar, created_at, updated_at")
    .eq("id", params.data.id)
    .maybeSingle();

  if (error) {
    if (!shouldFallbackToMockData(error)) {
      logger.error({ error, userId: params.data.id }, "Failed to fetch user from Supabase");
      res.status(500).json({ error: error.message || "Failed to load user" });
      return;
    }

    const mockUser = mockUsers.find((user) => user.id === params.data.id);
    if (!mockUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(serializeUser({
      ...mockUser,
      created_at: mockUser.createdAt,
      updated_at: mockUser.updatedAt,
    }));
    return;
  }

  if (!data) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json(serializeUser(data));
});

router.patch("/users/:id", async (req, res): Promise<void> => {
  const params = UpdateUserParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateUserBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { name, email, role, status, avatar } = parsed.data;
  const payload: Record<string, unknown> = { updated_at: nowIso() };

  if (name !== undefined) payload.name = name;
  if (email !== undefined) payload.email = email;
  if (role !== undefined) payload.role = role;
  if (status !== undefined) payload.status = status;
  if (avatar !== undefined) payload.avatar = avatar;

  const { data, error } = await supabaseData
    .from("users")
    .update(payload)
    .eq("id", params.data.id)
    .select("id, name, email, role, status, avatar, created_at, updated_at")
    .maybeSingle();

  if (error) {
    if (!shouldFallbackToMockData(error)) {
      logger.error({ error, userId: params.data.id }, "Failed to update user in Supabase");
      res.status(500).json({ error: error.message || "Failed to update user" });
      return;
    }

    const mockUser = updateMockUser(params.data.id, {
      ...(name !== undefined ? { name } : {}),
      ...(email !== undefined ? { email } : {}),
      ...(role !== undefined ? { role } : {}),
      ...(status !== undefined ? { status } : {}),
      ...(avatar !== undefined ? { avatar } : {}),
    });

    if (!mockUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(serializeUser({
      ...mockUser,
      created_at: mockUser.createdAt,
      updated_at: mockUser.updatedAt,
    }));
    return;
  }

  if (!data) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json(serializeUser(data));
});

router.delete("/users/:id", async (req, res): Promise<void> => {
  const params = DeleteUserParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const { data, error } = await supabaseData
    .from("users")
    .delete()
    .eq("id", params.data.id)
    .select("id, name")
    .maybeSingle();

  if (error) {
    if (!shouldFallbackToMockData(error)) {
      logger.error({ error, userId: params.data.id }, "Failed to delete user from Supabase");
      res.status(500).json({ error: error.message || "Failed to delete user" });
      return;
    }

    const mockUser = deleteMockUser(params.data.id);
    if (!mockUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.sendStatus(204);
    return;
  }

  if (!data) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
