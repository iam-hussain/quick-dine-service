import { CustomError } from "../libs/custom-error";
import { verifyPasswordHash } from "../libs/hash";
import userService from "../services/user-service";
import storeService from "../services/store-service";
import userTransformer from "../transformers/user-transformer";
import storeTransformer from "../transformers/store-transformer";
import { HandlerProps, JWT_OBJECT } from "../types";
import validators from "../validators";

const signIn = async ({
  body,
  set,
  jwt,
}: HandlerProps & { body: typeof validators.signIn.static }) => {
  const user = await userService.findByEmail(body.email);
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

  const stores = await storeService.findByBusAccount(user.shortId);

  const tokenData: JWT_OBJECT = {
    type: "BUSINESS",
    username: user.username,
    id: user.id,
    store: "",
  };

  console.log({ stores });

  if (stores.length === 1) {
    tokenData.store = stores[0].slug;
  }

  return {
    access_token: await jwt.sign(tokenData),
    includes_store: stores.length === 1,
    current_store:
      stores.length === 1 ? storeTransformer.store(stores[0]) : null,
    user: userTransformer.userPublic(user),
    stores: storeTransformer.stores(stores),
  };
};

export default {
  signIn,
};
