import _ from "lodash";
import { BusinessAccount } from "@prisma/client";
import date from "../libs/date";

const accountPublic = (account: BusinessAccount) => {
  const picked = _.pick(account, [
    "id",
    "firstName",
    "lastName",
    "email",
    "username",
    "phone",
    "emailVerified",
    "phoneVerified",
  ]);
  return {
    ...picked,
    createdDate: date.dateFormat(account.createdAt),
    createdDateTime: date.dateTimeFormat(account.createdAt),
    updatedDate: date.dateFormat(account.updatedAt),
    updatedDateTime: date.dateTimeFormat(account.updatedAt),
  };
};

export default {
  accountPublic,
};
