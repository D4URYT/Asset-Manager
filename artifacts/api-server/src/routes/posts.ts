import { Router, type IRouter } from "express";
import { db, postsTable, activityTable } from "@workspace/db";
import { eq, ilike, and, type SQL } from "drizzle-orm";
import {
  CreatePostBody,
  UpdatePostBody,
  GetPostParams,
  UpdatePostParams,
  DeletePostParams,
  ListPostsQueryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

function serializePost(p: typeof postsTable.$inferSelect) {
  return {
    id: p.id,
    title: p.title,
    content: p.content,
    category: p.category,
    status: p.status,
    authorName: p.authorName,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

router.get("/posts", async (req, res): Promise<void> => {
  const parsed = ListPostsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { search, category, status } = parsed.data;
  const conditions: SQL[] = [];
  if (search) conditions.push(ilike(postsTable.title, `%${search}%`));
  if (category) conditions.push(eq(postsTable.category, category));
  if (status) conditions.push(eq(postsTable.status, status));

  const posts = await db
    .select()
    .from(postsTable)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(postsTable.createdAt);

  res.json(posts.map(serializePost));
});

router.post("/posts", async (req, res): Promise<void> => {
  const parsed = CreatePostBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { title, content, category, status, authorName } = parsed.data;
  const [post] = await db
    .insert(postsTable)
    .values({
      title,
      content,
      category: category ?? "general",
      status: status ?? "draft",
      authorName: authorName ?? "Admin",
    })
    .returning();
  if (!post) {
    res.status(500).json({ error: "Failed to create post" });
    return;
  }
  await db.insert(activityTable).values({
    type: "post_created",
    description: `New post published`,
    entityName: post.title,
  });
  res.status(201).json(serializePost(post));
});

router.get("/posts/:id", async (req, res): Promise<void> => {
  const params = GetPostParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [post] = await db.select().from(postsTable).where(eq(postsTable.id, params.data.id));
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  res.json(serializePost(post));
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
  const [post] = await db
    .update(postsTable)
    .set({
      ...(title && { title }),
      ...(content !== undefined && { content }),
      ...(category && { category }),
      ...(status && { status }),
      ...(authorName && { authorName }),
    })
    .where(eq(postsTable.id, params.data.id))
    .returning();
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  res.json(serializePost(post));
});

router.delete("/posts/:id", async (req, res): Promise<void> => {
  const params = DeletePostParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [post] = await db.delete(postsTable).where(eq(postsTable.id, params.data.id)).returning();
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
