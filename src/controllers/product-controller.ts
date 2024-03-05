import { CustomError } from "../libs/custom-error";
import { HandlerProps } from "../types";
import validators from "../validators";
import productService from "../services/product-service";
import _ from "lodash";

const findManyByStoreSlug = async ({
  params: { slug },
}: HandlerProps & { params: typeof validators.storeSlug.static }) => {
  const products = await productService.findManyByStoreSlug(slug);
  return products;
};

const createOne = async ({
  params: { slug },
  body,
}: HandlerProps & {
  params: typeof validators.storeSlug.static;
  body: typeof validators.productCreate.static;
}) => {
  const tags = body.tags || [];
  const product = await database.product.create({
    data: {
      name: body.name,
      deck: body.deck,
      store: {
        connect: {
          slug,
        },
      },
      tags: {
        connect: tags.map((id) => ({
          id,
        })),
      },
    },
  });

  return product;
};

const updateOne = async ({
  params: { slug, id },
  body,
  set,
}: HandlerProps & {
  params: typeof validators.storeSlug.static & typeof validators.id.static;
  body: typeof validators.productUpdate.static;
}) => {
  const { tags, ...inputs } = body;
  const product = await database.product.findUnique({
    where: {
      id: Number(id),
      store: {
        slug,
      },
    },
    select: {
      id: true,
      tags: {
        select: {
          id: true,
          type: true,
        },
      },
    },
  });

  if (!product?.id) {
    set.status = "Precondition Failed";
    throw new CustomError("INVALID_ID");
  }

  const newTags = body.tags || [];
  const oldTags = product.tags.map(({ id }) => id);

  const intersection = _.intersection(newTags, oldTags);
  const connect = _.without(newTags, ...intersection);
  const disconnect = _.without(oldTags, ...intersection);

  const products = await database.product.update({
    where: {
      id: Number(id),
    },
    data: {
      ...inputs,
      tags: {
        connect: connect.map((id) => ({ id })),
        disconnect: disconnect.map((id) => ({ id })),
      },
    },
  });

  return products;
};

const deleteOne = async ({
  params: { slug, id },
  set,
}: HandlerProps & {
  params: typeof validators.storeSlug.static & typeof validators.id.static;
}) => {
  const history = await database.item.count({
    where: {
      productId: Number(id),
      store: {
        slug,
      },
    },
  });
  if (history === 0) {
    const product = await database.product.delete({
      where: {
        id,
        store: {
          slug,
        },
      },
    });
    return product;
  }
  const product = await database.product.update({
    where: {
      id,
      store: {
        slug,
      },
    },
    data: {
      deleted: true,
      deletedAt: new Date(),
    },
  });
  return product;
};

export default {
  createOne,
  updateOne,
  deleteOne,
  findManyByStoreSlug,
};
