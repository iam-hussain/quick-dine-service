import database from "../providers/database";

const findManyByStoreSlug = (slug: string) => {
  return database.category.findMany({
    where: {
      store: {
        slug,
      },
    },
  });
};

export default {
  findManyByStoreSlug,
};
