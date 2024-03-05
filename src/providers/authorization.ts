import { AuthenticationError } from "../libs/custom-error";
import { HandlerProps } from "../types";

export function shouldNotHaveToken({ set, token }: HandlerProps) {
  if (token.hasToken) {
    set.status = "Unauthorized";
    throw new AuthenticationError("TOKEN_FOUND");
  }
}

export async function shouldBeBusinessUser({ set, token }: HandlerProps) {
  if (!token.isBusinessUser) {
    set.status = "Unauthorized";
    throw new AuthenticationError("INVALID_TOKEN");
  }
}

type ThisBusinessAccountAuth = {
  access:
    | "store"
    | "tag"
    | "product"
    | "order"
    | "bill"
    | "kot"
    | "ods"
    | "captain";
};

export async function shouldBeBusinessUserStore(
  this: ThisBusinessAccountAuth,
  { token, set }: HandlerProps
) {
  console.log({ this: this });

  if (!token.isBusinessUser) {
    set.status = "Unauthorized";
    throw new AuthenticationError("INVALID_TOKEN");
  }

  if (!token.hasStore) {
    set.status = "Unauthorized";
    throw new AuthenticationError("INVALID_STORE_TOKEN");
  }
}

export default {
  shouldNotHaveToken,
  shouldBeBusinessUser,
  shouldBeBusinessUserStore,
};
