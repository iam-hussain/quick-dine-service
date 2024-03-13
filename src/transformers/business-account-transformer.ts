import _ from "lodash";
import { BusinessAccount } from "@prisma/client";
import dateTime from "../libs/date-time";

const accountPublic = (account: BusinessAccount) => {
  const picked = _.pick(account, [
    "id",
    "shortId",
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
    createdDate: dateTime.getDateFormat(account.createdAt),
    createdDateTime: dateTime.getDateTimeFormat(account.createdAt),
    updatedDate: dateTime.getDateFormat(account.updatedAt),
    updatedDateTime: dateTime.getDateTimeFormat(account.updatedAt),
  };
};

export default {
  accountPublic,
};
