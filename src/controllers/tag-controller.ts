import { CustomError } from "../libs/custom-error";
import { HandlerProps } from "../types";
import validators from "../validators";
import tagService from "../services/tag-service";

const findManyCategoriesByStoreSlug = async ({
  params: { slug },
}: HandlerProps & { params: typeof validators.storeSlug.static }) => {
  const categories = await tagService.findManyCatsByStoreSlug(slug);
  return categories;
};

const findManyDefaultTagsByStoreSlug = async ({
  params: { slug },
}: HandlerProps & { params: typeof validators.storeSlug.static }) => {
  const tags = await tagService.findManyTagsByStoreSlug(slug);
  return tags;
};

const findManyByStoreSlug = async ({
  params: { slug },
}: HandlerProps & { params: typeof validators.storeSlug.static }) => {
  const tags = await tagService.findManyByStoreSlug(slug);
  return tags;
};

const findManyByTokenStoreSlug = async ({ token }: HandlerProps) => {
  if (typeof token.decoded === "boolean") {
    return [];
  }

  const tags = await tagService.findManyByStoreSlug(
    (token.decoded?.store as string) || ""
  );
  return tags;
};

const createOne = async ({
  params: { slug },
  body,
}: HandlerProps & {
  params: typeof validators.storeSlug.static;
  body: typeof validators.tagCreate.static;
}) => {
  const tag = await database.tag.create({
    data: {
      ...body,
      store: {
        connect: {
          slug,
        },
      },
    },
  });
  return tag;
};

const updateOne = async ({
  params: { slug, id },
  body,
}: HandlerProps & {
  params: typeof validators.storeSlug.static & typeof validators.id.static;
  body: typeof validators.tagUpdate.static;
}) => {
  const tag = await database.tag.update({
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
  return tag;
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
      tags: {
        some: {
          id,
        },
      },
    },
  });
  if (history > 0) {
    set.status = "Precondition Failed";
    throw new CustomError("CANNOT_DELETE");
  }
  const tag = await database.tag.delete({
    where: { id, store: { slug } },
  });
  return tag;
};

export default {
  createOne,
  updateOne,
  deleteOne,
  findManyByStoreSlug,
  findManyByTokenStoreSlug,
  findManyCategoriesByStoreSlug,
  findManyDefaultTagsByStoreSlug,
};
