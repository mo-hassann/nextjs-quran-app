import { Hono } from "hono";

import chapter from "./chapter";
import verse from "./verse";
import auth from "./auth";

const app = new Hono();

const routes = app /*  */
  .route("/auth", auth)
  .route("/chapter", chapter)
  .route("/verse", verse);

export default routes;
