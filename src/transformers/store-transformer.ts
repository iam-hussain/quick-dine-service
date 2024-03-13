import _ from "lodash";
import { Store } from "@prisma/client";
import dateTime from "../libs/date-time";

const storePublic = (store: Store) => {
  const picked = _.pick(store, [
    "id",
    "shortId",
    "name",
    "deck",
    "slug",
    "email",
    "phone",
    "tables",
    "phoneVerified",
  ]);
  return {
    ...picked,
    createdDate: dateTime.getDateFormat(store.createdAt),
    createdDateTime: dateTime.getDateTimeFormat(store.createdAt),
    updatedDate: dateTime.getDateFormat(store.updatedAt),
    updatedDateTime: dateTime.getDateTimeFormat(store.updatedAt),
  };
};

const storesPublic = (stores: Store[]) => {
  return stores.map(storePublic);
};

export default {
  storePublic,
  storesPublic,
};
