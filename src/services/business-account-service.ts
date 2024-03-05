import database from "../providers/database";

const findByEmail = (email: string) => {
  return database.businessAccount.findUnique({
    where: {
      email,
    },
  });
};

export default {
  findByEmail,
};
