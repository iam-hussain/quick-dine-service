import { AuthenticationError, CustomError } from "../libs/custom-error";
import { HandlerProps } from "../types";
import validators from "../validators";
import productService from "../services/product-service";
import _ from "lodash";
import idGenerator from "../libs/id-generator";
import categoryTransformer from "../transformers/category-transformer";
import productTransformer from "../transformers/product-transformer";

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

  const products = await productService.findManyByStoreSlug(
    token.decoded.store
  );
  return productTransformer.products(products);
};

const createOne = async ({
  token,
  body,
}: HandlerProps & {
  body: typeof validators.productCreate.static;
}) => {
  if (typeof token.decoded === "boolean") {
    throw new AuthenticationError("INVALID_TOKEN");
  }
  const { categoryId, ...props } = body;

  const product = await database.product.create({
    data: {
      ...props,
      shortId: idGenerator.generateShortID(),
      store: {
        connect: {
          slug: token.decoded.store,
        },
      },
      category: {
        connect: {
          shortId: categoryId,
        },
      },
    },
  });

  return product;
};

const updateOne = async ({
  token,
  params: { id },
  body,
}: HandlerProps & {
  params: typeof validators.id.static;
  body: typeof validators.productUpdate.static;
}) => {
  if (typeof token.decoded === "boolean") {
    throw new AuthenticationError("INVALID_TOKEN");
  }
  const { categoryId, ...props } = body;
  const products = await database.product.update({
    where: {
      shortId: id,
      store: {
        slug: token.decoded.store,
      },
    },
    data: {
      ...props,
      category: {
        connect: {
          shortId: body.categoryId,
        },
      },
    },
  });

  return products;
};

const deleteOne = async ({
  token,
  params: { id },
  set,
}: HandlerProps & {
  params: typeof validators.id.static;
}) => {
  if (typeof token.decoded === "boolean") {
    throw new AuthenticationError("INVALID_TOKEN");
  }

  const history = await database.item.count({
    where: {
      productId: id,
      store: {
        slug: token.decoded.store,
      },
    },
  });
  if (history > 0) {
    set.status = "Precondition Failed";
    throw new CustomError("CANNOT_DELETE");
  }
  // const product = await database.product.update({
  //   where: {
  //     id,
  //     store: {
  //       slug: token.decoded.store,
  //     },
  //   },
  //   data: {
  //     deleted: true,
  //     deletedAt: new Date(),
  //   },
  // });
  const product = await database.product.delete({
    where: {
      shortId: id,
      store: {
        slug: token.decoded.store,
      },
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
