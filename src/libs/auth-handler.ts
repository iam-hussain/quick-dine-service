import { CustomHandler } from "../types/handler";
import { CustomError } from "./custom-error";

export const shouldBeLoggedIn = ({ token, set }: CustomHandler) => {
  if (!token.value) {
    set.status = "Unauthorized";
    throw new CustomError("TOKEN_NOT_FOUND");
  }
  if (!token.decoded) {
    set.status = "Unauthorized";
    throw new CustomError("INVALID_TOKEN");
  }
};

export const shouldBeLoggedInWithStore = ({ token, set }: CustomHandler) => {
  if (!token.value) {
    set.status = "Unauthorized";
    throw new CustomError("TOKEN_NOT_FOUND");
  }
  if (!token.decoded || !token.decoded.username) {
    set.status = "Unauthorized";
    throw new CustomError("INVALID_TOKEN");
  }

  if (!token.decoded.store) {
    set.status = "Unauthorized";
    throw new CustomError("INVALID_STORE_TOKEN");
  }
};

export const shouldNotBeLoggedIn = ({ token, set }: CustomHandler) => {
  if (token.value) {
    set.status = "Unauthorized";
    throw new CustomError("TOKEN_FOUND");
  }
};
