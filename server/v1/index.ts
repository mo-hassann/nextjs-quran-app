import { Hono } from "hono";

import chapter from "./chapter";
import verse from "./verse";
import auth from "./auth";
import statistics from "./statistics";

const app = new Hono();

const routes = app /*  */
  .route("/auth", auth)
  .route("/chapter", chapter)
  .route("/verse", verse)
  .route("/statistics", statistics);

export default routes;
