import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { verifyAuth } from "@hono/auth-js";
import db from "@/db";
import { favoriteChapterTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { getTranslations } from "next-intl/server";

const app = new Hono()
  .get("/favorites", verifyAuth(), async (c) => {
    const auth = c.get("authUser");
    const curUserId = auth.session.user?.id as string;
    const t = await getTranslations("General");

    try {
      const favoriteChapterIds = await db.select({ chapterId: favoriteChapterTable.chapterId }).from(favoriteChapterTable).where(eq(favoriteChapterTable.userId, curUserId));
      return c.json({ message: t("success"), data: favoriteChapterIds });
    } catch (error: any) {
      return c.json({ message: t("fail"), cause: error?.message }, 400);
    }
  })
  .post("/favorites", verifyAuth(), zValidator("json", z.object({ chapterId: z.coerce.number() })), async (c) => {
    const auth = c.get("authUser");
    const curUserId = auth.session.user?.id as string;
    const t = await getTranslations("General");

    const { chapterId } = c.req.valid("json");

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

      return c.json({ message: t("success") });
    } catch (error: any) {
      return c.json({ message: t("fail"), cause: error?.message }, 400);
    }
  });

export default app;
