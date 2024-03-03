import { AuthenticationError } from "../libs/custom-error";
import { HandlerProps } from "../types";

export const shouldNotHaveToken = ({ set, token }: HandlerProps) => {
  console.log({ token });
  if (token.hasToken) {
    set.status = "Unauthorized";
    throw new AuthenticationError("TOKEN_FOUND");
  }
};

export const shouldBeBusinessUser = async ({ set, token }: HandlerProps) => {
  if (!token.isBusinessUser) {
    set.status = "Unauthorized";
    throw new AuthenticationError("INVALID_TOKEN");
  }
};

export const shouldBeBusinessUserStore = async ({
  token,
  set,
}: HandlerProps) => {
  if (!token.isBusinessUser) {
    set.status = "Unauthorized";
    throw new AuthenticationError("INVALID_TOKEN");
  }

  if (!token.hasStore) {
    set.status = "Unauthorized";
    throw new AuthenticationError("INVALID_STORE_TOKEN");
  }
};

export default {
  shouldNotHaveToken,
  shouldBeBusinessUser,
  shouldBeBusinessUserStore,
};
