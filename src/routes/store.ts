import { Elysia } from "elysia";

export default new Elysia({ name: "store_router", prefix: "/store" })
  .get("/", () => "Stores", {})
  .group("/:slug", (app) =>
    app
      .get("/", () => "Store")
      .get("/products", () => "products")
      .get("/categories", () => "categories")
      .get("/tags", () => "tags")
  );
