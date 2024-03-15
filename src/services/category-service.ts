import database from "../providers/database";

const findManyByStoreSlug = (slug: string) => {
  return database.category.findMany({
    where: {
      store: {
        slug,
      },
    },
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export default {
  findManyByStoreSlug,
};
