import { Elysia, NotFoundError } from "elysia";
import authentication from "./authentication";
import store from "./store";

export default new Elysia({ name: "main_router" })
  .group("/api", (app) => app.use(authentication).use(store))
  .get("/", () => ({ massage: "Welcome quick dine service" }))
  .get("/ping", () => ({ massage: "pong" }))
  .all("*", () => {
    throw new NotFoundError();
  });
