import _ from "lodash";
import { Store } from "@prisma/client";
import dateTime from "../libs/date-time";
import { StoreAdditionalType } from "../types";
import { mergeArrays } from "../libs/array";
import { JsonValue } from "@prisma/client/runtime/library";

const getNumberType = (input?: any) => {
  if (input && ["VALUE", "PERCENTAGE", "VALUE_COUNT"].includes(input)) {
    return input;
  }
  return "VALUE";
};

const getTax = ({
  key,
  name,
  printName,
  rate = 0,
  type = "PERCENTAGE",
  position = 0,
}: {
  key?: string;
  name?: string;
  printName?: string;
  rate?: number;
  type?: string;
  position?: number;
}) => {
  if (!key || !rate || Number.isNaN(rate)) {
    return null;
  }
  const _type = getNumberType(type);
  return {
    key,
    name: key || name || "",
    printName: printName || name || "",
    type: _type,
    rate: Number(rate),
    position: Number(position),
  };
};

const getFee = (
  {
    key,
    name,
    printName,
    rate = 0,
    type = "PERCENTAGE",
    position = 0,
  }: {
    key: "DELIVERY" | "PACKING";
    name: string;
    printName?: string;
    rate: number;
    type: string;
    position: number;
  },
  returnDefault: boolean = false
) => {
  if (!returnDefault && (!name || !rate || Number.isNaN(rate))) {
    return null;
  }
  const _type = getNumberType(type);
  return {
    key: key || "DELIVERY",
    name: name || "Delivery",
    printName: printName || name || "Delivery",
    type: _type,
    rate: Number(rate) || 0,
    position: Number(position) || 0,
  };
};

const getTable = ({
  key,
  name,
  printName,
  position = 0,
}: {
  key?: string;
  name?: string;
  printName?: string;
  position?: number;
}) => {
  if (!key) {
    return null;
  }
  return {
    key,
    name: name || key,
    printName: printName || name || key,
    position,
  };
};

const validateStoreAdditional = (store: Partial<Store>) => {
  const { tables, taxes } = store;
  const fees: any = _.keyBy(store.fees, "key");

  let newFees: any = {};

  if (typeof fees === "object" && fees?.DELIVERY) {
    const DELIVERY = getFee({ ...fees.DELIVERY, key: "DELIVERY" }, false);
    if (DELIVERY) {
      newFees["DELIVERY"] = DELIVERY;
    }
  }
  if (typeof fees === "object" && fees.PACKING) {
    const PACKING = getFee({ ...fees.PACKING, key: "PACKING" }, false);
    if (PACKING) {
      newFees["PACKING"] = PACKING;
    }
  }
  return {
    ...store,
    tables: tables
      ? (tables?.map(getTable as any).filter(Boolean) as JsonValue[])
      : ([] as JsonValue[]),
    taxes: taxes
      ? (taxes?.map(getTax as any).filter(Boolean) as JsonValue[])
      : ([] as JsonValue[]),
    fees: Object.values(newFees) as JsonValue[],
  };
};

const mergeStoreAdditional = (
  a: Partial<Store>,
  b: Partial<Store>
): Partial<Store> => {
  const data = _.mergeWith(a, b, mergeArrays);
  return {
    ...data,
    tables: _.sortBy(
      _.unionBy((data.tables as any).reverse(), "key"),
      "position"
    ) as JsonValue[],
    taxes: _.sortBy(
      _.unionBy((data.taxes as any).reverse(), "key"),
      "position"
    ) as JsonValue[],
  };
};

const getStoreAdditional = (store: Partial<Store> = {}): Partial<Store> => {
  const { tables, taxes, fees } = validateStoreAdditional(store);
  return {
    tables,
    taxes,
    fees,
  };
};

export default {
  getTax,
  getFee,
  getTable,
  validateStoreAdditional,
  mergeStoreAdditional,
  getStoreAdditional,
};
