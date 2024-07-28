import { getAuthUser, verifyAuth } from "@hono/auth-js";
import { Hono } from "hono";
import verses from "@/data/chapters-list.json";

const app = new Hono()
  .get("/auth-needed", verifyAuth(), async (c) => {
    const auth = c.get("authUser");
    return c.json({ auth, data: "some other data" });
  })
  .get("/", async (c) => {
    const data = verses
      .filter((verse) => verse.totalVerses <= 10)
      .map((verse) => verse.totalVerses)
      .sort();

    return c.json({ data: data });
  });

export default app;
