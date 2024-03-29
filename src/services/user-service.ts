import database from "../providers/database";

const findByEmail = (email: string) => {
  return database.user.findFirst({
    where: {
      email,
    },
  });
};

export default {
  findByEmail,
};
