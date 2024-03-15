import { CustomError } from "../libs/custom-error";
import { HandlerProps } from "../types";
import validators from "../validators";
import productService from "../services/product-service";
import _ from "lodash";
import idGenerator from "../libs/id-generator";
import categoryTransformer from "../transformers/category-transformer";

const findManyByStoreSlug = async ({
  params: { slug },
}: HandlerProps & { params: typeof validators.storeSlug.static }) => {
  const products = await productService.findManyByStoreSlug(slug);
  return products;
};

const findManyByTokenStoreSlug = async ({ token }: HandlerProps) => {
  if (typeof token.decoded === "boolean") {
    return [];
  }

  const categories = await productService.findManyByStoreSlug(
    (token.decoded?.store as string) || ""
  );
  return categories;
};

const createOne = async ({
  params: { slug },
  body,
}: HandlerProps & {
  params: typeof validators.storeSlug.static;
  body: typeof validators.productCreate.static;
}) => {
  const product = await database.product.create({
    data: {
      name: body.name,
      deck: body.deck,
      shortId: idGenerator.generateShortID(),
      store: {
        connect: {
          slug,
        },
      },
      category: {
        connect: {
          id: body.categoryId,
        },
      },
    },
  });

  return product;
};

const updateOne = async ({
  params: { slug, id },
  body,
  set,
}: HandlerProps & {
  params: typeof validators.storeSlug.static & typeof validators.id.static;
  body: typeof validators.productUpdate.static;
}) => {
  const products = await database.product.update({
    where: {
      id,
      store: { slug },
    },
    data: {
      ...body,
    },
  });

  return products;
};

const deleteOne = async ({
  params: { slug, id },
  set,
}: HandlerProps & {
  params: typeof validators.storeSlug.static & typeof validators.id.static;
}) => {
  const history = await database.item.count({
    where: {
      productId: id,
      store: {
        slug,
      },
    },
  });
  if (history === 0) {
    const product = await database.product.delete({
      where: {
        id,
        store: {
          slug,
        },
      },
    });
    return product;
  }
  const product = await database.product.update({
    where: {
      id,
      store: {
        slug,
      },
    },
    data: {
      deleted: true,
      deletedAt: new Date(),
    },
  });
  return product;
};

export default {
  createOne,
  updateOne,
  deleteOne,
  findManyByStoreSlug,
  findManyByTokenStoreSlug,
};
