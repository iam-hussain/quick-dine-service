import { CustomError } from "../libs/custom-error";
import { HandlerProps } from "../types";
import validators from "../validators";
import storeService from "../services/store-service";
import storeTransformer from "../transformers/store-transformer";

const storeBySlug = async ({
  params: { slug },
  set,
}: HandlerProps & { params: typeof validators.storeSlug.static }) => {
  const store = await storeService.findBySlug(slug);
  if (!store) {
    set.status = "Precondition Failed";
    throw new CustomError("INVALID_STORE");
  }
  return storeTransformer.storePublic(store);
};

export default {
  storeBySlug,
};
