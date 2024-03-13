import { CustomError } from "../libs/custom-error";
import { HandlerProps } from "../types";
import validators from "../validators";
import categoryService from "../services/category-service";
import idGenerator from "../libs/id-generator";

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
    (token.decoded?.store as string) || ""
  );
  return categories;
};

const createOne = async ({
  params: { slug },
  body,
}: HandlerProps & {
  params: typeof validators.storeSlug.static;
  body: typeof validators.categoryCreate.static;
}) => {
  const category = await database.category.create({
    data: {
      ...body,
      shortId: idGenerator.generateShortID(),
      store: {
        connect: {
          slug,
        },
      },
    },
  });
  return category;
};

const updateOne = async ({
  params: { slug, id },
  body,
}: HandlerProps & {
  params: typeof validators.storeSlug.static & typeof validators.id.static;
  body: typeof validators.categoryUpdate.static;
}) => {
  const category = await database.category.update({
    where: {
      id,
      store: {
        slug,
      },
    },
    data: {
      ...body,
    },
  });
  return category;
};

const deleteOne = async ({
  params: { slug, id },
  set,
}: HandlerProps & {
  params: typeof validators.storeSlug.static & typeof validators.id.static;
}) => {
  const history = await database.product.count({
    where: {
      store: {
        slug,
      },
      category: {
        id,
      },
    },
  });
  if (history > 0) {
    set.status = "Precondition Failed";
    throw new CustomError("CANNOT_DELETE");
  }
  const category = await database.category.delete({
    where: { id, store: { slug } },
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
