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
