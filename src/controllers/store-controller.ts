// import { Elysia } from "elysia";
// import setup from "../setup";
// import { shouldBeLoggedInWithStore } from "../libs/auth-handler";
// import { findManyProductsByStore } from "../models/product";
// import { transformStore, transformProduct } from "../transformers";

// export default new Elysia({ prefix: "/store" }).use(setup).get(
//   "/",
//   async ({ store }) => {
//     const products = await findManyProductsByStore(store.id);
//     return {
//       ...transformStore({
//         ...store,
//       }),
//       products: transformProduct(products),
//     };
//   },
//   {
//     beforeHandle: shouldBeLoggedInWithStore,
//   }
// );
