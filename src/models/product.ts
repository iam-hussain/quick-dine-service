import db from "../providers/db";

export const findManyProductsByStore = (storeId: number) => {
  return db.product.findMany({
    where: {
      storeId,
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
