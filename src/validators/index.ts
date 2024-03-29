import { t } from "elysia";

enum FoodType {
  NON_VEG = "NON_VEG",
  VEG = "VEG",
  VEGAN = "VEGAN",
}

enum CalcValueType {
  VALUE = "VALUE",
  PERCENTAGE = "PERCENTAGE",
  VALUE_COUNT = "VALUE_COUNT",
}

enum ORDER_TYPE {
  PRE_DINING = "PRE_DINING",
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
  type: t.Optional(t.Enum(FoodType)),
  price: t.Number(),
  categoryId: t.String(),
});

const productUpdate = t.Object({
  name: t.Optional(t.String()),
  deck: t.Optional(t.String()),
  price: t.Optional(t.Number()),
  type: t.Optional(t.Enum(FoodType)),
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

const order = t.Object({
  shortId: t.Optional(t.String()),
  type: t.Optional(t.Enum(ORDER_TYPE)),
  status: t.Optional(t.Enum(ORDER_STATUS)),
  notes: t.Optional(t.String()),
  tableKey: t.Optional(t.String()),
  tableName: t.Optional(t.String()),
  customerId: t.Optional(t.String()),
  createdId: t.Optional(t.String()),
});

const storeAdditionalUpdate = t.Object({
  fees: t.Optional(
    t.Array(
      t.Optional(
        t.Object({
          key: t.String(),
          name: t.String(),
          rate: t.Number(),
          printName: t.Optional(t.String()),
          position: t.Optional(t.Integer()),
          type: t.Optional(t.Enum(CalcValueType)),
        })
      )
    )
  ),
  tables: t.Optional(
    t.Array(
      t.Optional(
        t.Object({
          key: t.String(),
          name: t.String(),
          printName: t.Optional(t.String()),
          position: t.Optional(t.Integer()),
        })
      )
    )
  ),
  taxes: t.Optional(
    t.Array(
      t.Optional(
        t.Object({
          key: t.String(),
          name: t.String(),
          rate: t.Number(),
          printName: t.Optional(t.String()),
          position: t.Optional(t.Integer()),
          type: t.Optional(t.Enum(CalcValueType)),
        })
      )
    )
  ),
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
};
