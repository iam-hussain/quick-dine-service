import { Product, ProductsOnTags, Store, Tag } from "@prisma/client";
import { dateTimeFormat } from "../libs/date";
import { findManyProductsByStore } from "../models/product";

export const transformProduct = (
  products: Awaited<ReturnType<typeof findManyProductsByStore>>
) => {
  return products.map(({ tags, ...each }) => {
    const formedTags = tags.map(({ tag, ...e }) => ({ ...tag, ...e }));
    const category = formedTags.find((e) => e.type === "CATEGORY");
    const tag = formedTags.filter((e) => e.type !== "CATEGORY");
    return {
      ...each,
      category,
      tags: tag,
    };
  });
};

export const transformStore = (store: Store) => {
  return {
    ...store,
    createdAt$: dateTimeFormat(store.createdAt),
    updatedAt$: dateTimeFormat(store.updatedAt),
  };
};
