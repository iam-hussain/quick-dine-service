import db from "../providers/db";

export const findManyStoreByOwnerId = (accountId: number) => {
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

export const findStoreBySlugOwnerId = (slug: string, accountId: number) => {
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
