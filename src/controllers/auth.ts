import { Elysia, t } from "elysia";
import setup from "../setup";
import { shouldNotBeLoggedIn } from "../libs/auth-handler";
import { CustomError } from "../libs/custom-error";
import { verifyPasswordHash } from "../libs/hash";
import { findBusinessAccountByEmail } from "../models/businessAccount";
import { findManyStoreByOwnerId } from "../models/store";

export default new Elysia({ prefix: "/auth" }).use(setup).post(
  "login",
  async ({ jwt, body, set }) => {
    const user = await findBusinessAccountByEmail(body.email);
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

    const stores = await findManyStoreByOwnerId(user.id);

    const tokenData: any = {
      username: user.username,
    };

    if (stores.length === 1) {
      tokenData.store = stores[0].slug;
    }

    return {
      access_token: await jwt.sign(tokenData),
      includesStore: stores.length === 1,
    };
  },
  {
    beforeHandle: shouldNotBeLoggedIn,
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
  }
);
