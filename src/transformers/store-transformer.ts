import _ from "lodash";
import { Store } from "@prisma/client";
import dateTime from "../libs/date-time";
import storeAdditionalTransformer from "./store-additional-transformer";

const store = (store: Store) => {
  const picked = _.pick(store, [
    "id",
    "shortId",
    "name",
    "deck",
    "slug",
    "email",
    "phone",
    "address",
    "printHead",
    "printDeck",
    "printFooter",
    "images",
    "tables",
    "taxes",
    "fees",
    "extra",
  ]);
  const { fees, ...extra } =
    storeAdditionalTransformer.getStoreAdditional(store);
  return {
    ...picked,
    ...extra,
    fees: _.keyBy(store.fees, "key"),
    createdDate: dateTime.getDateFormat(store.createdAt),
    createdDateTime: dateTime.getDateTimeFormat(store.createdAt),
    updatedDate: dateTime.getDateFormat(store.updatedAt),
    updatedDateTime: dateTime.getDateTimeFormat(store.updatedAt),
  };
};

const stores = (stores: Store[]) => {
  return stores.map(store);
};

export default {
  store,
  stores,
};
