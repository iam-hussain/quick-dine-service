import { AuthenticationError, CustomError } from "../libs/custom-error";
import { HandlerProps } from "../types";
import validators from "../validators";
import storeService from "../services/store-service";
import storeTransformer from "../transformers/store-transformer";
import storeAdditionalTransformer from "../transformers/store-additional-transformer";

const storeBySlug = async ({
  params: { slug },
  set,
}: HandlerProps & { params: typeof validators.storeSlug.static }) => {
  const store = await storeService.findBySlug(slug);
  if (!store) {
    set.status = "Precondition Failed";
    throw new CustomError("INVALID_STORE");
  }
  return storeTransformer.store(store);
};

const storeByToken = async ({ token, set }: HandlerProps) => {
  if (typeof token.decoded === "boolean") {
    throw new AuthenticationError("INVALID_TOKEN");
  }
  const store = await storeService.findBySlug(token.decoded?.store as string);
  if (!store) {
    set.status = "Precondition Failed";
    throw new CustomError("INVALID_STORE");
  }
  return storeTransformer.store(store);
};

const updateAdditional = async ({
  token,
  set,
  body,
}: HandlerProps & {
  body: typeof validators.storeAdditionalUpdate.static;
}) => {
  if (typeof token.decoded === "boolean") {
    throw new AuthenticationError("INVALID_TOKEN");
  }
  const store = await storeService.findBySlug(token.decoded?.store as string);

  if (!store) {
    set.status = "Precondition Failed";
    throw new CustomError("INVALID_STORE");
  }

  const reqBody = storeAdditionalTransformer.validateStoreAdditional(
    body as any
  );
  const storeData = storeAdditionalTransformer.getStoreAdditional(store);
  const data = storeAdditionalTransformer.mergeStoreAdditional(
    storeData,
    reqBody
  );

  const updated = await database.store.update({
    where: {
      shortId: store.shortId,
    },
    data: {
      tables: {
        set: data.tables as any,
      },
      fees: {
        set: data.fees as any,
      },
      taxes: {
        set: data.taxes as any,
      },
    },
  });
  return updated;
};

export default {
  storeBySlug,
  storeByToken,
  updateAdditional,
};
