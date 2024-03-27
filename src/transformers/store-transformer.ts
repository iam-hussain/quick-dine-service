import _ from "lodash";
import { Store } from "@prisma/client";
import dateTime from "../libs/date-time";
import { StoreAdditionalType } from "../types";
import { mergeArrays } from "../libs/array";

const getNumberType = (input?: any) => {
  if (input && ["VALUE", "PERCENTAGE"].includes(input)) {
    return input;
  }
  return "VALUE";
};

const validateStoreAdditional = ({
  table = [],
  tax = [],
  discounts = [],
  packing = {},
  delivery = {},
}: Partial<StoreAdditionalType | any>) => {
  const returnData: Partial<StoreAdditionalType> = {};
  if (table && table.length) {
    returnData.table = table
      .filter(
        (e: { key: any; name: any; position: number }) =>
          e.key && e.name && e.position >= 0
      )
      .map((e: { printName: any; name: any; position: any }) => ({
        ...e,
        printName: e.printName || e.name,
        position: Number(e.position) || 0,
      }));
  }

  if (tax && tax.length) {
    returnData.tax = tax
      .filter(
        (e: { key: any; name: any; position: number; value: number }) =>
          e.key && e.name && e.value
      )
      .map((e: { type: string; printName: any; name: any; position: any }) => ({
        ...e,
        printName: e.printName || e.name,
        position: Number(e.position) || 0,
        type: getNumberType(e.type),
      }));
  }

  if (discounts && discounts.length) {
    returnData.discounts = discounts
      .filter(
        (e: { key: any; name: any; value: number }) =>
          e.key && e.name && e.value
      )
      .map((e: { type: string; printName: any; name: any }) => ({
        ...e,
        printName: e.printName || e.name,
        type: getNumberType(e.type),
      }));
  }

  if (packing && packing.value) {
    returnData.packing = {
      value: Number(packing.value),
      type: getNumberType(packing.type),
    };
  }

  if (delivery && delivery.value) {
    returnData.delivery = {
      value: Number(delivery.value),
      type: getNumberType(delivery.type),
    };
  }

  return returnData;
};

const mergeStoreAdditional = (
  a: StoreAdditionalType,
  b: Partial<StoreAdditionalType>
): StoreAdditionalType => {
  const data = _.mergeWith(a, b, mergeArrays);
  return {
    ...data,
    table: _.sortBy(_.unionBy(data.table.reverse(), "key"), "position"),
    tax: _.sortBy(_.unionBy(data.tax.reverse(), "key"), "position"),
    discounts: _.sortBy(_.unionBy(data.discounts.reverse(), "key"), "position"),
  };
};

const getStoreAdditional = (
  additional: Partial<StoreAdditionalType> = {}
): StoreAdditionalType => {
  const {
    table = [],
    tax = [],
    discounts = [],
    packing = null,
    delivery = null,
  } = validateStoreAdditional(additional);
  return {
    table,
    tax,
    discounts,
    packing: packing ? packing : { value: 0, type: "VALUE" },
    delivery: delivery ? delivery : { value: 0, type: "VALUE" },
  };
};

const store = (store: Store) => {
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
    additional: getStoreAdditional(store.additional as any),
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
  getStoreAdditional,
  validateStoreAdditional,
  mergeStoreAdditional,
};
