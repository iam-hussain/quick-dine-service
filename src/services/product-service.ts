import database from "../providers/database";

const findManyByStoreSlug = (slug: string) => {
  return database.product.findMany({
    where: {
      store: {
        slug,
      },
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });
};

const createOne = ({}) => {};

export default {
  findManyByStoreSlug,
};
