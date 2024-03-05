import database from "../providers/database";

const findByBusAccount = (accountId: number) => {
  return database.store.findMany({
    where: {
      consumers: {
        some: {
          accountId,
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
      addresses: true,
      tags: true,
      images: true,
    },
  });
};

export const findBySlugAndBusAccount = (slug: string, accountId: number) => {
  return database.store.findUnique({
    where: {
      slug,
      consumers: {
        some: {
          accountId,
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
  findByBusAccount,
  findBySlugAndBusAccount,
};
