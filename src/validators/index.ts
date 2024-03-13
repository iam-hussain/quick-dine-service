import { t } from "elysia";

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
  price: t.Number(),
  categoryId: t.String(),
});

const productUpdate = t.Object({
  name: t.Optional(t.String()),
  deck: t.Optional(t.String()),
  price: t.Optional(t.Number()),
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

export default {
  id,
  signIn,
  storeSlug,
  productCreate,
  productUpdate,
  categoryCreate,
  categoryUpdate,
};
