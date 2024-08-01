import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { verifyAuth } from "@hono/auth-js";
import db from "@/db";
import { bookmarkVerseTable, favoriteVerseTable } from "@/db/schemas/user";
import { and, eq } from "drizzle-orm";

const app = new Hono()
  .get("/bookmarks", verifyAuth(), async (c) => {
    const auth = c.get("authUser");
    const curUserId = auth.session.user?.id as string;

    try {
      const bookmarksVerseIds = await db.select({ verseId: bookmarkVerseTable.verseId, chapterId: bookmarkVerseTable.chapterId }).from(bookmarkVerseTable).where(eq(bookmarkVerseTable.userId, curUserId));
      return c.json({ message: "success", data: bookmarksVerseIds });
    } catch (error: any) {
      return c.json({ message: "something went wrong", cause: error?.message }, 400);
    }
  })
  .post("/bookmark", verifyAuth(), zValidator("json", z.object({ chapterId: z.coerce.number(), verseId: z.coerce.number() })), async (c) => {
    const auth = c.get("authUser");
    const curUserId = auth.session.user?.id as string;

    const { chapterId, verseId } = c.req.valid("json");

    try {
      const [curUserBookmarked] = await db
        .select({ id: bookmarkVerseTable.id })
        .from(bookmarkVerseTable)
        .where(and(eq(bookmarkVerseTable.userId, curUserId), eq(bookmarkVerseTable.chapterId, chapterId), eq(bookmarkVerseTable.verseId, verseId)));

      if (curUserBookmarked) {
        await db.delete(bookmarkVerseTable).where(eq(bookmarkVerseTable.id, curUserBookmarked.id));
      } else {
        await db.insert(bookmarkVerseTable).values({ userId: curUserId, chapterId, verseId });
      }

      return c.json({ message: "success" });
    } catch (error: any) {
      return c.json({ message: "something went wrong", cause: error?.message }, 400);
    }
  });

export default app;
