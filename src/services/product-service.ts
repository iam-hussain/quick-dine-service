import db from "../providers/database";

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
