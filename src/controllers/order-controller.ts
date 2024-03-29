import { AuthenticationError, CustomError } from "../libs/custom-error";
import { HandlerProps } from "../types";
import validators from "../validators";
import categoryService from "../services/category-service";
import idGenerator from "../libs/id-generator";
import categoryTransformer from "../transformers/category-transformer";

const create = async ({ token, set }: HandlerProps) => {
  if (typeof token.decoded === "boolean") {
    throw new AuthenticationError("INVALID_TOKEN");
  }

  return {};
};

export default {};
