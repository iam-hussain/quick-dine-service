import { Elysia } from "elysia";
import storeController from "../controllers/store-controller";
import validators from "../validators";
import categoryController from "../controllers/category-controller";
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
  .get("/categories", categoryController.findManyByTokenStoreSlug, {
    beforeHandle: shouldBeBusinessUserStore as never,
    transform: inputTransform,
  })
  .post("/category", categoryController.createOne, {
    body: validators.categoryCreate,
    beforeHandle: shouldBeBusinessUserStore as never,
    transform: inputTransform,
  })
  .patch("/category/:id", categoryController.updateOne, {
    body: validators.categoryUpdate,
    params: validators.id,
    beforeHandle: shouldBeBusinessUserStore as never,
    transform: inputTransform,
  })
  .delete("/category/:id", categoryController.deleteOne, {
    params: validators.id,
    beforeHandle: shouldBeBusinessUserStore as never,
    transform: inputTransform,
  })
  .get("/products", productController.findManyByTokenStoreSlug, {
    beforeHandle: shouldBeBusinessUserStore as never,
    transform: inputTransform,
  })
  .post("/product", productController.createOne, {
    body: validators.productCreate,
    beforeHandle: shouldBeBusinessUserStore as never,
    transform: inputTransform,
  })
  .patch("/product/:id", productController.updateOne, {
    body: validators.productUpdate,
    params: validators.id,
    beforeHandle: shouldBeBusinessUserStore as never,
    transform: inputTransform,
  })
  .delete("/product/:id", productController.deleteOne, {
    params: validators.id,
    beforeHandle: shouldBeBusinessUserStore as never,
    transform: inputTransform,
  });
// .group(
//   "/:slug",
//   {
//     params: validators.storeSlug,
//     transform: inputTransform,
//   },
//   (app) =>
//     app
//       .get("/", storeController.storeBySlug)
//       .get("/products", productController.findManyByStoreSlug)
//       .post("/product", productController.createOne, {
//         body: validators.productCreate,
//         beforeHandle: shouldBeBusinessUserStore as never,
//         transform: inputTransform,
//       })
//       .put("/product", productController.updateOne, {
//         body: validators.productUpdate,
//         params: validators.id,
//         beforeHandle: shouldBeBusinessUserStore as never,
//         transform: inputTransform,
//       })
//       .delete("/product", productController.deleteOne, {
//         params: validators.id,
//         beforeHandle: shouldBeBusinessUserStore as never,
//         transform: inputTransform,
//       })
//       .get("/categories", categoryController.findManyByStoreSlug)
//       .post("/category", categoryController.createOne, {
//         body: validators.categoryCreate,
//         beforeHandle: shouldBeBusinessUserStore as never,
//         transform: inputTransform,
//       })
//       .put("/category/:id", categoryController.updateOne, {
//         body: validators.categoryUpdate,
//         params: validators.id,
//         beforeHandle: shouldBeBusinessUserStore as never,
//         transform: inputTransform,
//       })
//       .delete("/category", categoryController.deleteOne, {
//         params: validators.id,
//         beforeHandle: shouldBeBusinessUserStore as never,
//         transform: inputTransform,
//       })
// );
