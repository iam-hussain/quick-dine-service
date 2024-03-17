import database from "../providers/database";

const findManyByStoreSlug = (slug: string) => {
  return database.product.findMany({
    where: {
      store: {
        slug,
      },
    },
    include: {
      category: {
        select: {
          name: true,
          shortId: true,
        },
      },
      images: true,
    },
  });
};

export default {
  findManyByStoreSlug,
};
