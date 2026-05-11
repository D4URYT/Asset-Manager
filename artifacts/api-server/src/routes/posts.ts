import { Router, type IRouter } from "express";
import {
  CreatePostBody,
  UpdatePostBody,
  GetPostParams,
  UpdatePostParams,
  DeletePostParams,
  ListPostsQueryParams,
} from "@workspace/api-zod";
import { logger } from "../lib/logger";
import {
  addMockActivity,
  createMockPost,
  deleteMockPost,
  mockPosts,
  shouldFallbackToMockData,
  updateMockPost,
} from "../lib/mock-store";
import { addActivity, nowIso, supabaseData } from "../lib/supabase-data";

const router: IRouter = Router();

function serializePost(post: {
  id: number;
  title: string;
  content: string;
  category: string;
  status: string;
  author_name?: string;
  authorName?: string;
  created_at?: string;
  updated_at?: string;
  createdAt?: string;
  updatedAt?: string;
}) {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    category: post.category,
    status: post.status,
    authorName: post.author_name ?? post.authorName ?? "Admin",
    createdAt: post.created_at ?? post.createdAt ?? nowIso(),
    updatedAt: post.updated_at ?? post.updatedAt ?? nowIso(),
  };
}

router.get("/posts", async (req, res): Promise<void> => {
  const parsed = ListPostsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { search, category, status } = parsed.data;

  let query = supabaseData
    .from("posts")
    .select("id, title, content, category, status, author_name, created_at, updated_at")
    .order("created_at", { ascending: true });

  if (search) query = query.ilike("title", `%${search}%`);
  if (category) query = query.eq("category", category);
  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) {
    if (!shouldFallbackToMockData(error)) {
      logger.error({ error }, "Failed to list posts from Supabase");
      res.status(500).json({ error: error.message || "Failed to load posts" });
      return;
    }

    logger.warn({ error }, "Falling back to mock posts data");
    const filtered = mockPosts.filter((post) => {
      if (search && !post.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (category && post.category !== category) return false;
      if (status && post.status !== status) return false;
      return true;
    });
    res.json(filtered.map(serializePost));
    return;
  }

  res.json((data ?? []).map(serializePost));
});

router.post("/posts", async (req, res): Promise<void> => {
  const parsed = CreatePostBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { title, content, category, status, authorName } = parsed.data;
  const { data, error } = await supabaseData
    .from("posts")
    .insert({
      title,
      content,
      category: category ?? "general",
      status: status ?? "draft",
      author_name: authorName ?? "Admin",
    })
    .select("id, title, content, category, status, author_name, created_at, updated_at")
    .single();

  if (error) {
    if (!shouldFallbackToMockData(error)) {
      logger.error({ error, title }, "Failed to create post in Supabase");
      res.status(500).json({ error: error.message || "Failed to create post" });
      return;
    }

    logger.warn({ error, title }, "Falling back to mock post creation");
    const mockPost = createMockPost({
      title,
      content,
      category: category ?? "general",
      status: status ?? "draft",
      authorName: authorName ?? "Admin",
    });
    addMockActivity("post_created", "New post published", mockPost.title);
    res.status(201).json(serializePost({
      ...mockPost,
      author_name: mockPost.authorName,
      created_at: mockPost.createdAt,
      updated_at: mockPost.updatedAt,
    }));
    return;
  }

  await addActivity("post_created", "New post published", data.title);
  res.status(201).json(serializePost(data));
});

router.get("/posts/:id", async (req, res): Promise<void> => {
  const params = GetPostParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const { data, error } = await supabaseData
    .from("posts")
    .select("id, title, content, category, status, author_name, created_at, updated_at")
    .eq("id", params.data.id)
    .maybeSingle();

  if (error) {
    if (!shouldFallbackToMockData(error)) {
      logger.error({ error, postId: params.data.id }, "Failed to fetch post from Supabase");
      res.status(500).json({ error: error.message || "Failed to load post" });
      return;
    }

    const mockPost = mockPosts.find((post) => post.id === params.data.id);
    if (!mockPost) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.json(serializePost({
      ...mockPost,
      author_name: mockPost.authorName,
      created_at: mockPost.createdAt,
      updated_at: mockPost.updatedAt,
    }));
    return;
  }

  if (!data) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  res.json(serializePost(data));
});

router.patch("/posts/:id", async (req, res): Promise<void> => {
  const params = UpdatePostParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdatePostBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { title, content, category, status, authorName } = parsed.data;
  const payload: Record<string, unknown> = { updated_at: nowIso() };

  if (title !== undefined) payload.title = title;
  if (content !== undefined) payload.content = content;
  if (category !== undefined) payload.category = category;
  if (status !== undefined) payload.status = status;
  if (authorName !== undefined) payload.author_name = authorName;

  const { data, error } = await supabaseData
    .from("posts")
    .update(payload)
    .eq("id", params.data.id)
    .select("id, title, content, category, status, author_name, created_at, updated_at")
    .maybeSingle();

  if (error) {
    if (!shouldFallbackToMockData(error)) {
      logger.error({ error, postId: params.data.id }, "Failed to update post in Supabase");
      res.status(500).json({ error: error.message || "Failed to update post" });
      return;
    }

    const mockPost = updateMockPost(params.data.id, {
      ...(title !== undefined ? { title } : {}),
      ...(content !== undefined ? { content } : {}),
      ...(category !== undefined ? { category } : {}),
      ...(status !== undefined ? { status } : {}),
      ...(authorName !== undefined ? { authorName } : {}),
    });

    if (!mockPost) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.json(serializePost({
      ...mockPost,
      author_name: mockPost.authorName,
      created_at: mockPost.createdAt,
      updated_at: mockPost.updatedAt,
    }));
    return;
  }

  if (!data) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  res.json(serializePost(data));
});

router.delete("/posts/:id", async (req, res): Promise<void> => {
  const params = DeletePostParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const { data, error } = await supabaseData
    .from("posts")
    .delete()
    .eq("id", params.data.id)
    .select("id, title")
    .maybeSingle();

  if (error) {
    if (!shouldFallbackToMockData(error)) {
      logger.error({ error, postId: params.data.id }, "Failed to delete post from Supabase");
      res.status(500).json({ error: error.message || "Failed to delete post" });
      return;
    }

    const mockPost = deleteMockPost(params.data.id);
    if (!mockPost) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.sendStatus(204);
    return;
  }

  if (!data) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
