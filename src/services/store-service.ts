import db from "../providers/database";

const findByBusAccount = (accountId: number) => {
  return db.store.findMany({
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
  return db.store.findUnique({
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
  return db.store.findUnique({
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

export default {
  findByBusAccount,
  findBySlugAndBusAccount,
};
