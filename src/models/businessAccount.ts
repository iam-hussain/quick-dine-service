import db from "../providers/db";

export const findBusinessAccountByEmail = (email: string) => {
  return db.businessAccount.findUnique({
    where: {
      email,
    },
  });
};

export const findBusinessAccountByUsername = (username: string) => {
  return db.businessAccount.findUnique({
    where: {
      username,
    },
  });
};
