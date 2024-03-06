import { Elysia } from "elysia";
import storeController from "../controllers/store-controller";
import validators from "../validators";
import tagController from "../controllers/tag-controller";
import productController from "../controllers/product-controller";
import { shouldBeBusinessUserStore } from "../providers/authorization";
import inputTransform from "../transformers/input-transformer";

export default new Elysia({
  name: "store_router",
  prefix: "/store",
})
  .get("/", storeController.storeByToken, {
    beforeHandle: shouldBeBusinessUserStore as never,
    transform: inputTransform,
  })
  .get("/tags", tagController.findManyByTokenStoreSlug, {
    beforeHandle: shouldBeBusinessUserStore as never,
    transform: inputTransform,
  })
  .group(
    "/:slug",
    {
      params: validators.storeSlug,
      transform: inputTransform,
    },
    (app) =>
      app
        .get("/", storeController.storeBySlug)
        .get("/products", productController.findManyByStoreSlug)
        .post("/product", productController.createOne, {
          body: validators.productCreate,
          beforeHandle: shouldBeBusinessUserStore as never,
          transform: inputTransform,
        })
        .put("/product", productController.updateOne, {
          body: validators.productUpdate,
          params: validators.id,
          beforeHandle: shouldBeBusinessUserStore as never,
          transform: inputTransform,
        })
        .delete("/product", productController.deleteOne, {
          params: validators.id,
          beforeHandle: shouldBeBusinessUserStore as never,
          transform: inputTransform,
        })
        .get("/tags/category", tagController.findManyCategoriesByStoreSlug)
        .get("/tags/tag", tagController.findManyDefaultTagsByStoreSlug)
        .get("/tags", tagController.findManyByStoreSlug)
        .post("/tag", tagController.createOne, {
          body: validators.tagCreate,
          beforeHandle: shouldBeBusinessUserStore as never,
          transform: inputTransform,
        })
        .put("/tag", tagController.updateOne, {
          body: validators.tagUpdate,
          params: validators.id,
          beforeHandle: shouldBeBusinessUserStore as never,
          transform: inputTransform,
        })
        .delete("/tag", tagController.deleteOne, {
          params: validators.id,
          beforeHandle: shouldBeBusinessUserStore as never,
          transform: inputTransform,
        })
  );
