import database from "../providers/database";

const findByBusAccount = (accountId: string) => {
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
      images: true,
    },
  });
};

export const findBySlugAndBusAccount = (slug: string, accountId: string) => {
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
