import { t } from "elysia";

const id = t.Object({
  id: t.Numeric(),
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
  tags: t.Optional(t.Array(t.Integer())),
});

const productUpdate = t.Object({
  name: t.Optional(t.String()),
  deck: t.Optional(t.String()),
  price: t.Optional(t.Number()),
  tags: t.Optional(t.Array(t.Integer())),
  outOfStock: t.Optional(t.Boolean()),
});

const tagCreate = t.Object({
  name: t.String(),
  deck: t.Optional(t.String()),
  position: t.Optional(t.Integer()),
});

const tagUpdate = t.Object({
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
  tagCreate,
  tagUpdate,
};
