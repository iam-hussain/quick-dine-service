import { CustomError } from "../libs/custom-error";
import { HandlerProps } from "../types";

export const shouldNotHaveToken = ({ set, token }: HandlerProps) => {
  if (token.hasToken) {
    set.status = "Unauthorized";
    throw new CustomError("TOKEN_FOUND");
  }
};

export const shouldBeBusinessUser = ({ set, token }: HandlerProps) => {
  if (!token.isBusinessUser) {
    set.status = "Unauthorized";
    throw new CustomError("INVALID_TOKEN");
  }
};

export const shouldBeBusinessUserStore = ({ token, set }: HandlerProps) => {
  if (!token.isBusinessUser) {
    set.status = "Unauthorized";
    throw new CustomError("INVALID_TOKEN");
  }

  if (!token.hasStore) {
    set.status = "Unauthorized";
    throw new CustomError("INVALID_STORE_TOKEN");
  }
};

// type BusinessAccountRoles =
//   | "store"
//   | "tag"
//   | "product"
//   | "order"
//   | "bill"
//   | "kot"
//   | "ods"
//   | "captain";

// export const shouldBeBusinessUserStoreWithAccess = (
//   role: BusinessAccountRoles
// ) => {
//   console.log({ role });
//   return shouldBeBusinessUserStore;
// };

export default {
  shouldNotHaveToken,
  shouldBeBusinessUser,
  shouldBeBusinessUserStore,
};
