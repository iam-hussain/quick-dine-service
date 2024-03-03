import { CustomError } from "../libs/custom-error";
import { verifyPasswordHash } from "../libs/hash";
import businessAccountService from "../services/business-account-service";
import storeService from "../services/store-service";
import businessAccountTransformer from "../transformers/business-account-transformer";
import storeTransformer from "../transformers/store-transformer";
import { HandlerProps, JWT_OBJECT } from "../types";
import validators from "../validators";

const signIn = async ({
  body,
  set,
  jwt,
}: HandlerProps & { body: typeof validators.signIn.static }) => {
  const user = await businessAccountService.findByEmail(body.email);
  if (!user) {
    set.status = "Precondition Failed";
    throw new CustomError("USER_NOT_FOUND");
  }

  if (!user.password || !user.salt) {
    set.status = "Precondition Failed";
    throw new CustomError("NO_PASSWORD_FOUND");
  }

  const isPasswordMatch = verifyPasswordHash(
    body.password,
    user.password,
    user.salt
  );

  if (!isPasswordMatch) {
    set.status = "Precondition Failed";
    throw new CustomError("INVALID_PASSWORD");
  }

  const stores = await storeService.findByBusAccount(user.id);

  const tokenData: JWT_OBJECT = {
    type: "BUSINESS",
    username: user.username,
  };

  if (stores.length === 1) {
    tokenData.store = stores[0].slug;
  }

  return {
    access_token: await jwt.sign(tokenData),
    includes_store: stores.length === 1,
    user: businessAccountTransformer.accountPublic(user),
    stores: storeTransformer.storesPublic(stores),
  };
};

export default {
  signIn,
};
