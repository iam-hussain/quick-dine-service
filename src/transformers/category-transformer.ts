import _ from "lodash";
import { Category, Store } from "@prisma/client";
import dateTime from "../libs/date-time";
import categoryService from "../services/category-service";

const categoryPublic = (
  category: Category & {
    _count?: {
      products?: Number;
    };
  }
) => {
  const picked = _.pick(category, [
    "id",
    "shortId",
    "name",
    "deck",
    "position",
  ]);
  return {
    ...picked,
    productsConnected: category?._count?.products || 0,
    createdAt: dateTime.getDate(category.createdAt),
    createdDate: dateTime.getDateFormat(category.createdAt),
    createdDateTime: dateTime.getDateTimeFormat(category.createdAt),
    updatedAt: dateTime.getDate(category.updatedAt),
    updatedDate: dateTime.getDateFormat(category.updatedAt),
    updatedDateTime: dateTime.getDateTimeFormat(category.updatedAt),
  };
};

const categoriesPublic = (
  categories: Awaited<ReturnType<typeof categoryService.findManyByStoreSlug>>
) => {
  return _.sortBy(categories.map(categoryPublic), "position");
};

export default {
  categoryPublic,
  categoriesPublic,
};
