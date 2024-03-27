import { t } from "elysia";

enum FoodType {
  NON_VEG = "NON_VEG",
  VEG = "VEG",
  VEGAN = "VEGAN",
}

enum NumberType {
  VALUE = "VALUE",
  PERCENTAGE = "PERCENTAGE",
  VALUE_COUNT = "VALUE_COUNT",
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

const storeAdditionalUpdate = t.Object({
  packing: t.Optional(
    t.Object({
      type: t.Optional(t.Enum(NumberType)),
      value: t.Number(),
    })
  ),
  delivery: t.Optional(
    t.Object({
      type: t.Optional(t.Enum(NumberType)),
      value: t.Number(),
    })
  ),
  table: t.Optional(
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
  tax: t.Optional(
    t.Array(
      t.Optional(
        t.Object({
          key: t.String(),
          name: t.String(),
          value: t.Number(),
          printName: t.Optional(t.String()),
          position: t.Optional(t.Integer()),
          type: t.Optional(t.Enum(NumberType)),
        })
      )
    )
  ),
  discounts: t.Optional(
    t.Array(
      t.Optional(
        t.Object({
          key: t.String(),
          name: t.String(),
          value: t.Number(),
          printName: t.Optional(t.String()),
          type: t.Optional(t.String()),
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
