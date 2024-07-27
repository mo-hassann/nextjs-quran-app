import { Hono } from "hono";

import test from "./test";
import chapter from "./chapter";
import auth from "./auth";

const app = new Hono();

const routes = app /*  */
  .route("/auth", auth)
  .route("/test", test)
  .route("/chapter", chapter);

export default routes;
