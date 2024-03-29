import database from "../providers/database";

const findByBusAccount = (userId: string) => {
  return database.store.findMany({
    where: {
      connections: {
        some: {
          user: {
            shortId: userId,
            type: "SELLER",
          },
        },
      },
    },
  });
};

export const findStoreDeep = (slug: string) => {
  return database.store.findUnique({
    where: {
      slug,
    },
    include: {
      products: true,
    },
  });
};

export const findBySlugAndBusAccount = (slug: string, userId: string) => {
  return database.store.findUnique({
    where: {
      slug,
      connections: {
        some: {
          userId,
        },
      },
    },
  });
};

export const findBySlug = (slug: string) => {
  return database.store.findUnique({
    where: {
      slug,
    },
  });
};

export default {
  findBySlug,
  findStoreDeep,
  findByBusAccount,
  findBySlugAndBusAccount,
};
