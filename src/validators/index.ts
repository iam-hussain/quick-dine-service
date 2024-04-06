import { t } from "elysia";

enum CALC_VALUE_TYPE {
  VALUE = "VALUE",
  PERCENTAGE = "PERCENTAGE",
  VALUE_COUNT = "VALUE_COUNT",
}

enum ORDER_TYPE {
  DINING = "DINING",
  TAKE_AWAY = "TAKE_AWAY",
  PICK_UP = "PICK_UP",
  DELIVERY = "DELIVERY",
  PLATFORM = "PLATFORM",
}

enum ORDER_STATUS {
  DRAFT = "DRAFT",
  PLACED = "PLACED",
  ACCEPTED = "ACCEPTED",
  PROGRESS = "PROGRESS",
  READY = "READY",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  COMPLETED = "COMPLETED",
}

enum PRODUCT_TYPE {
  VEG = "VEG",
  NON_VEG = "NON_VEG",
  VEGAN = "VEGAN",
}

const id = t.Object({
  id: t.String(),
});

const signIn = t.Object({
  email: t.String(),
  password: t.String(),
});

const storeSlug = t.Object({
  slug: t.String(),
});

const productCreate = t.Object({
  name: t.String(),
  deck: t.Optional(t.String()),
  type: t.Optional(t.Enum(PRODUCT_TYPE)),
  price: t.Number(),
  categoryId: t.String(),
});

const productUpdate = t.Object({
  name: t.Optional(t.String()),
  deck: t.Optional(t.String()),
  price: t.Optional(t.Number()),
  type: t.Optional(t.Enum(PRODUCT_TYPE)),
  categoryId: t.Optional(t.String()),
  outOfStock: t.Optional(t.Boolean()),
});

const categoryCreate = t.Object({
  name: t.String(),
  deck: t.Optional(t.String()),
  position: t.Optional(t.Integer()),
});

const categoryUpdate = t.Object({
  name: t.Optional(t.String()),
  deck: t.Optional(t.String()),
  position: t.Optional(t.Integer()),
});

const items = t.Object({
  id: t.Optional(t.String()),
  title: t.Optional(t.String()),
  note: t.Optional(t.String()),
  price: t.Optional(t.Number()),
  type: t.Optional(t.Enum(PRODUCT_TYPE)),
  quantity: t.Integer(),
  position: t.Optional(t.Integer()),
  productId: t.String(),
});

const fees = t.Optional(
  t.Array(
    t.Optional(
      t.Object({
        key: t.String(),
        name: t.String(),
        rate: t.Number(),
        printName: t.Optional(t.String()),
        position: t.Optional(t.Integer()),
        type: t.Optional(t.Enum(CALC_VALUE_TYPE)),
      })
    )
  )
);

const table = t.Object({
  key: t.String(),
  name: t.String(),
  printName: t.Optional(t.String()),
  position: t.Optional(t.Integer()),
});

const tables = t.Optional(t.Array(table));
const taxes = t.Optional(
  t.Array(
    t.Optional(
      t.Object({
        key: t.String(),
        name: t.String(),
        rate: t.Number(),
        printName: t.Optional(t.String()),
        position: t.Optional(t.Integer()),
        type: t.Optional(t.Enum(CALC_VALUE_TYPE)),
      })
    )
  )
);

const orderUpsert = t.Object({
  shortId: t.Optional(t.String()),
  type: t.Optional(t.Enum(ORDER_TYPE)),
  status: t.Optional(t.Enum(ORDER_STATUS)),
  note: t.Optional(t.String()),
  customerId: t.Optional(t.String()),
  // createdId: t.Optional(t.String()),
  items: t.Optional(t.Array(items)),
  completedAt: t.Optional(t.String()),
  deliveredAt: t.Optional(t.String()),
  fees,
  table: t.Object({
    key: t.Optional(t.String()),
    name: t.Optional(t.String()),
    printName: t.Optional(t.String()),
    position: t.Optional(t.Integer()),
  }),

  taxes,
});

const storeAdditionalUpdate = t.Object({
  fees,
  tables,
  taxes,
});

const orders = t.Object({
  date: t.Optional(t.String()),
  skip: t.Optional(t.Integer()),
  take: t.Optional(t.Integer()),
  cursor: t.Optional(t.String()),
  type: t.Optional(t.Enum(ORDER_TYPE)),
  status: t.Optional(t.Enum(ORDER_STATUS)),
  types: t.Optional(t.Array(t.Enum(ORDER_TYPE))),
  statuses: t.Optional(t.Array(t.Enum(ORDER_STATUS))),
});

export default {
  id,
  signIn,
  storeSlug,
  productCreate,
  productUpdate,
  categoryCreate,
  categoryUpdate,
  storeAdditionalUpdate,
  orderUpsert,
  orders,
  items,
};
