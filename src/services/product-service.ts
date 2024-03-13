import database from "../providers/database";

const findManyByStoreSlug = (slug: string) => {
  return database.product.findMany({
    where: {
      store: {
        slug,
      },
    },
    include: {
      category: true,
    },
  });
};

export default {
  findManyByStoreSlug,
};
