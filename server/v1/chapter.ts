import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { verifyAuth } from "@hono/auth-js";
import db from "@/db";
import { favoriteChapterTable } from "@/db/schemas/user";
import { and, eq } from "drizzle-orm";

const app = new Hono()
  .get("/", verifyAuth(), async (c) => {
    const auth = c.get("authUser");
    const curUserId = auth.session.user?.id as string;

    try {
      const favoriteChapterIds = await db.select({ chapterId: favoriteChapterTable.chapterId }).from(favoriteChapterTable).where(eq(favoriteChapterTable.userId, curUserId));
      return c.json({ message: "success", data: favoriteChapterIds });
    } catch (error: any) {
      return c.json({ message: "something went wrong", cause: error?.message }, 400);
    }
  })
  .post("/", verifyAuth(), zValidator("json", z.object({ chapterId: z.coerce.number() })), async (c) => {
    const auth = c.get("authUser");
    const curUserId = auth.session.user?.id as string;

    const { chapterId } = c.req.valid("json");

    console.log(chapterId, "chapterid from server===========");

    try {
      const [curUserFavorite] = await db
        .select({ id: favoriteChapterTable.id })
        .from(favoriteChapterTable)
        .where(and(eq(favoriteChapterTable.userId, curUserId), eq(favoriteChapterTable.chapterId, chapterId)));

      if (curUserFavorite) {
        await db.delete(favoriteChapterTable).where(eq(favoriteChapterTable.id, curUserFavorite.id));
      } else {
        await db.insert(favoriteChapterTable).values({ userId: curUserId, chapterId });
      }

      return c.json({ message: "success" });
    } catch (error: any) {
      return c.json({ message: "something went wrong", cause: error?.message }, 400);
    }
  })
  .get("/:id", zValidator("param", z.object({ id: z.string() })), (c) => c.json(`get ${c.req.param("id")}`));

export default app;
