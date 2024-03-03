import _ from "lodash";
import { Store } from "@prisma/client";
import date from "../libs/date";

const storePublic = (store: Store) => {
  const picked = _.pick(store, [
    "id",
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
    createdDate: date.dateFormat(store.createdAt),
    createdDateTime: date.dateTimeFormat(store.createdAt),
    updatedDate: date.dateFormat(store.updatedAt),
    updatedDateTime: date.dateTimeFormat(store.updatedAt),
  };
};

const storesPublic = (stores: Store[]) => {
  return stores.map(storePublic);
};

export default {
  storePublic,
  storesPublic,
};
