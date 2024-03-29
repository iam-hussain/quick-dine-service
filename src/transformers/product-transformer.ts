import _ from "lodash";
import { PRODUCT_TYPE, Product } from "@prisma/client";
import dateTime from "../libs/date-time";
import productService from "../services/product-service";
import imageTransformer from "./image-transformer";

const typeMap: { [key in PRODUCT_TYPE]: string } = {
  VEG: "Veg",
  NON_VEG: "Non-veg",
  VEGAN: "Vegan",
};

const productTable = (
  product: Product & {
    category: {
      shortId: string;
      name: string;
    } | null;
  }
) => {
  const picked = _.pick(product, [
    "id",
    "shortId",
    "name",
    "deck",
    "price",
    "outOfStock",
    "type",
  ]);

  return {
    ...picked,
    formattedPrice: product.price.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    }),
    image: imageTransformer.images(product.images),
    foodType: typeMap[product.type],
    categoryName: product?.category?.name,
    categoryId: product?.category?.shortId,
    createdAt: dateTime.getDate(product.createdAt),
    createdDate: dateTime.getDateFormat(product.createdAt),
    createdDateTime: dateTime.getDateTimeFormat(product.createdAt),
    updatedAt: dateTime.getDate(product.updatedAt),
    updatedDate: dateTime.getDateFormat(product.updatedAt),
    updatedDateTime: dateTime.getDateTimeFormat(product.updatedAt),
  };
};

const products = (
  products: Awaited<ReturnType<typeof productService.findManyByStoreSlug>>
) => {
  return products.map(productTable);
};

export default {
  productTable,
  products,
};
