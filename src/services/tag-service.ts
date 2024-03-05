import database from "../providers/database";

const findManyCatsByStoreSlug = (slug: string) => {
  return database.tag.findMany({
    where: {
      store: {
        slug,
      },
      type: "CATEGORY",
    },
    include: {
      products: true,
    },
  });
};

const findManyTagsByStoreSlug = (slug: string) => {
  return database.tag.findMany({
    where: {
      store: {
        slug,
      },
      type: "CATEGORY",
    },
    include: {
      products: true,
    },
  });
};

const findManyByStoreSlug = (slug: string) => {
  return database.tag.findMany({
    where: {
      store: {
        slug,
      },
    },
    include: {
      products: true,
    },
  });
};

export default {
  findManyCatsByStoreSlug,
  findManyTagsByStoreSlug,
  findManyByStoreSlug,
};
