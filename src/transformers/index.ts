import { Product, ProductsOnTags, Store, Tag } from "@prisma/client";
import { dateTimeFormat } from "../libs/date";
import { findManyProductsByStore } from "../models/product";

export const transformProduct = (
  products: Awaited<ReturnType<typeof findManyProductsByStore>>
) => {
  return products;
};

export const transformStore = (store: Store) => {
  console.log({ store });
  return {
    ...store,
    createdAt$: dateTimeFormat(store.createdAt),
    updatedAt$: dateTimeFormat(store.updatedAt),
  };
};
