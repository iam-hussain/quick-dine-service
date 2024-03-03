import db from "../providers/database";

const findByEmail = (email: string) => {
  return db.businessAccount.findUnique({
    where: {
      email,
    },
  });
};

export default {
  findByEmail,
};
