import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { CustomError } from "./libs/custom-error";
import { findBusinessAccountByUsername } from "./models/businessAccount";
import { l } from "elysia/dist/index-59i0HOI0";
import { findStoreBySlugOwnerId } from "./models/store";

const SECRET = process.env.SECRET || "";

export default new Elysia({ name: "setup" })
  .use(
    jwt({
      name: "jwt",
      secret: SECRET,
      exp: "1d",
    })
  )
  .derive(async ({ jwt, headers }) => {
    const authorization = headers["authorization"];
    const token = authorization?.startsWith("Bearer ")
      ? authorization.slice(7)
      : null;

    const decoded = token
      ? ((await jwt.verify(token)) as {
          username: string;
          store: string;
        })
      : null;
    console.log("token=========");
    return {
      token: {
        value: token,
        decoded,
      },
    };
  })
  .derive(({ token }) => {
    console.log("requester=========");
    return {
      requester: {
        token: token.value,
        name: token.decoded,
      },
    };
  })
  .derive(async ({ token }) => {
    console.log("user=========");
    const username = token?.decoded?.username || null;
    const user = username
      ? await findBusinessAccountByUsername(username)
      : null;

    return {
      user,
    };
  })
  .derive(async ({ token, user }) => {
    console.log("store=========");
    const storeSlug = token?.decoded?.store || null;
    const store =
      user?.id && storeSlug
        ? await findStoreBySlugOwnerId(storeSlug, user.id)
        : null;

    return {
      store,
    };
  });
