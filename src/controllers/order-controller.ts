import { AuthenticationError, CustomError } from "../libs/custom-error";
import { HandlerProps } from "../types";
import validators from "../validators";
import database from "../providers/database";
import dateTime from "../libs/date-time";
import { $Enums, Item, Order, Prisma, PRODUCT_TYPE } from "@prisma/client";
import storeAdditionalTransformer from "../transformers/store-additional-transformer";
import idGenerator from "../libs/id-generator";
import idSeries from "../libs/id-series";

const getItems = (
  e: (typeof validators.orderUpsert.static.items)[0],
  orderId: string,
  userId: string
) => {
  return {
    productId: e.productId,
    title: e.title || "",
    note: e.note || "",
    type: (e.type as any) || PRODUCT_TYPE.NON_VEG,
    quantity: Number(e.quantity) || 1,
    position: Number(e.position) || 0,
    price: Number(e.price) || 0,
    total: Number(e.price) * (Number(e.quantity) || 1),
    placeAt: dateTime.getDate(),
    placedAt: dateTime.getDate(),
    orderId: orderId,
    createdId: userId,
  };
};

const getOrderData = (
  data: typeof validators.orderUpsert.static,
  returnDefault: boolean = false
) => {
  const order: any = {};

  if (data?.type) {
    order.type = data.type;
  }

  if (data?.status) {
    order.status = data.status;
  }

  if (data?.table) {
    order.table = data.table;
  } else if (!data.table && returnDefault) {
    order.table = "";
  }

  if (data?.notes) {
    order.notes = data.notes;
  } else if (!data.notes && returnDefault) {
    order.notes = "";
  }

  if (data?.completedAt) {
    order.completedAt = dateTime.getDate(data.completedAt);
  }

  if (data?.deliveredAt) {
    order.deliveredAt = dateTime.getDate(data.deliveredAt);
  }

  if (data?.taxes && data.taxes.length) {
    order.taxes = data.taxes
      .map((e) => storeAdditionalTransformer.getTax(e))
      .filter(Boolean);
  }

  if (data?.fees && data.fees.length) {
    order.fees = data.fees
      .map((e) => storeAdditionalTransformer.getFee(e as any))
      .filter(Boolean);
  }

  if (data?.table) {
    const tableData = storeAdditionalTransformer.getTable(data.table);
    if (tableData) {
      order.table = tableData;
    }
  }

  return order;
};

type ItemId = {
  id: string;
};

type FetchedOrder =
  | ({
      items: ItemId[];
    } & Order)
  | null;

const upsert = async ({
  token,
  set,
  body,
}: HandlerProps & { body: typeof validators.orderUpsert.static }) => {
  if (typeof token.decoded === "boolean") {
    throw new AuthenticationError("INVALID_TOKEN");
  }
  const { shortId, items } = body;
  let order: FetchedOrder = null;
  const disconnect: ItemId[] = [];
  const createItems: typeof validators.orderUpsert.static.items = [];

  if (shortId) {
    const fetchedOrder = await database.order.findUnique({
      where: {
        shortId,
        store: {
          slug: token.decoded.store,
        },
      },
      include: {
        items: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!fetchedOrder || !fetchedOrder.id) {
      set.status = "Precondition Failed";
      throw new CustomError("INVALID_INPUT");
    }
    order = fetchedOrder;
    fetchedOrder.items
      .filter((e) => Boolean(e.id))
      .filter((e) => !items.includes(e.id as any))
      .forEach((e) => {
        disconnect.push({
          id: e.id,
        });
      });
    await database.order.update({
      where: { shortId },
      data: {
        ...getOrderData(body),
        updatedId: token.decoded.id,
      },
    });
  } else {
    const shortId = await idSeries.generateOrderId(token.decoded.store);
    await database.order.create({
      data: {
        ...getOrderData(body),
        createdAt: token.decoded.id,
        shortId,
      },
    });
  }

  if (!order) {
    set.status = "Precondition Failed";
    throw new CustomError("INVALID_INPUT");
  }

  items
    .filter((e) => !Boolean(e.id))
    .forEach((e) => {
      createItems.push(getItems(e, order.id, token.decoded.id));
    });

  if (createItems.length) {
    await database.item.createMany({
      data: createItems,
      skipDuplicates: true,
    });
  }
  if (disconnect.length) {
    await database.item.deleteMany({
      where: {
        id: {
          in: disconnect.map((e) => e.id),
        },
      },
    });

    await database.item.deleteMany({
      where: {
        id: {
          in: disconnect.map((e) => e.id),
        },
      },
    });
  }
};

const getMany = async ({
  token,
  query,
}: HandlerProps & { query: typeof validators.orders.static }) => {
  if (typeof token.decoded === "boolean") {
    throw new AuthenticationError("INVALID_TOKEN");
  }
  const { today, skip = 0, take = 10, cursor = "" } = query;
  const props: any = {
    where: {
      store: {
        slug: token.decoded.store,
      },
    },
    take,
  };
  if (today) {
    props.where.createdAt = {
      gte: dateTime.getTodayStart(),
      lte: dateTime.getTodayEnd(),
    };
  }
  if (cursor) {
    props.cursor = {
      id: cursor,
    };
    props.skip = 1;
  } else {
    props.skip = skip;
  }
  const order = await database.order.findMany(props);

  return order || [];
};

const getOne = async ({
  token,
  set,
  params,
}: HandlerProps & {
  params: typeof validators.id.static;
}) => {
  if (typeof token.decoded === "boolean") {
    throw new AuthenticationError("INVALID_TOKEN");
  }
  const { id } = params;

  const order = await database.order.findUnique({
    where: {
      shortId: id,
      store: {
        slug: token.decoded.store,
      },
    },
  });

  if (!order) {
    set.status = "Precondition Failed";
    throw new CustomError("INVALID_INPUT");
  }
  return order;
};

export default {
  upsert,
  getMany,
  getOne,
};
