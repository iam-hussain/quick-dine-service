import { AuthenticationError, CustomError } from "../libs/custom-error";
import { HandlerProps } from "../types";
import validators from "../validators";
import categoryService from "../services/category-service";
import idGenerator from "../libs/id-generator";
import categoryTransformer from "../transformers/category-transformer";

const findManyByStoreSlug = async ({
  params: { slug },
}: HandlerProps & { params: typeof validators.storeSlug.static }) => {
  const categories = await categoryService.findManyByStoreSlug(slug);
  return categories;
};

const findManyByTokenStoreSlug = async ({ token }: HandlerProps) => {
  if (typeof token.decoded === "boolean") {
    return [];
  }

  const categories = await categoryService.findManyByStoreSlug(
    token.decoded?.store
  );
  return categoryTransformer.categoriesPublic(categories);
};

const createOne = async ({
  token,
  body,
}: HandlerProps & {
  body: typeof validators.categoryCreate.static;
}) => {
  if (typeof token.decoded === "boolean") {
    throw new AuthenticationError("INVALID_TOKEN");
  }

  const category = await database.category.create({
    data: {
      ...body,
      shortId: idGenerator.generateShortID(),
      store: {
        connect: {
          slug: token.decoded.store,
        },
      },
    },
  });
  return category;
};

const updateOne = async ({
  token,
  params: { id },
  body,
}: HandlerProps & {
  params: typeof validators.id.static;
  body: typeof validators.categoryUpdate.static;
}) => {
  if (typeof token.decoded === "boolean") {
    throw new AuthenticationError("INVALID_TOKEN");
  }

  const category = await database.category.update({
    where: {
      shortId: id,
      store: {
        slug: token.decoded.store,
      },
    },
    data: {
      ...body,
    },
  });
  return category;
};

const deleteOne = async ({
  token,
  params: { id },
  set,
}: HandlerProps & {
  params: typeof validators.storeSlug.static & typeof validators.id.static;
}) => {
  if (typeof token.decoded === "boolean") {
    throw new AuthenticationError("INVALID_TOKEN");
  }
  const history = await database.product.count({
    where: {
      store: {
        slug: token.decoded.store,
      },
      categoryId: id,
    },
  });
  if (history > 0) {
    set.status = "Precondition Failed";
    throw new CustomError("CANNOT_DELETE");
  }
  const category = await database.category.delete({
    where: {
      shortId: id,
      store: { slug: token.decoded.store },
    },
  });
  return category;
};

export default {
  createOne,
  updateOne,
  deleteOne,
  findManyByStoreSlug,
  findManyByTokenStoreSlug,
};
