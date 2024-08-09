import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { verifyAuth } from "@hono/auth-js";
import db from "@/db";
import { dailyReadingTimeTable, userTable } from "@/db/schema";
import { and, desc, eq, sql } from "drizzle-orm";
import { getTranslations } from "next-intl/server";

const app = new Hono()
  .get("/reading-time", verifyAuth(), async (c) => {
    const auth = c.get("authUser");
    const curUserId = auth.session.user?.id as string;
    const t = await getTranslations("General");

    try {
      const dailyReadingTime = await db.select({ date: dailyReadingTimeTable.date, readingTime: dailyReadingTimeTable.readingTime }).from(dailyReadingTimeTable).where(eq(dailyReadingTimeTable.userId, curUserId)).orderBy(desc(dailyReadingTimeTable.date)).limit(30);
      return c.json({ message: t("success"), data: dailyReadingTime });
    } catch (error: any) {
      return c.json({ message: t("fail"), cause: error?.message }, 400);
    }
  })
  .get("/reading-goal", verifyAuth(), async (c) => {
    const auth = c.get("authUser");
    const curUserId = auth.session.user?.id as string;
    const t = await getTranslations("General");

    try {
      const [todayReadingTime] = await db.select({ dailyReadingGoal: userTable.dailyReadingGoal }).from(userTable).where(eq(userTable.id, curUserId));

      return c.json({ message: t("success"), data: todayReadingTime });
    } catch (error: any) {
      return c.json({ message: t("fail"), cause: error?.message }, 400);
    }
  })
  .post("/reading-time", verifyAuth(), zValidator("json", z.object({ time: z.coerce.number() })), async (c) => {
    const auth = c.get("authUser");
    const curUserId = auth.session.user?.id as string;
    const t = await getTranslations("General");

    const { time } = c.req.valid("json");

    try {
      await db
        .insert(dailyReadingTimeTable)
        .values({ userId: curUserId, readingTime: time, date: new Date() })
        .onConflictDoUpdate({ target: [dailyReadingTimeTable.userId, dailyReadingTimeTable.date], set: { readingTime: sql`${dailyReadingTimeTable.readingTime} + ${time}` } });

      return c.json({ message: t("success") });
    } catch (error: any) {
      return c.json({ message: t("fail"), cause: error?.message }, 400);
    }
  })
  .post("/reading-goal", verifyAuth(), zValidator("json", z.object({ readingGoal: z.coerce.number() })), async (c) => {
    const auth = c.get("authUser");
    const curUserId = auth.session.user?.id as string;
    const t = await getTranslations("General");

    const { readingGoal } = c.req.valid("json");

    try {
      await db.update(userTable).set({ dailyReadingGoal: readingGoal }).where(eq(userTable.id, curUserId));
      return c.json({ message: t("success") });
    } catch (error: any) {
      return c.json({ message: t("fail"), cause: error?.message }, 400);
    }
  });

export default app;
