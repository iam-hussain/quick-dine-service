import { Elysia } from "elysia";
import db from "../providers/db";
import setup from "../setup";
import { shouldBeLoggedIn, shouldNotBeLoggedIn } from "../libs/auth-handler";

export default new Elysia({ prefix: "/auth" })
  .use(setup)
  .get(
    "/sign/:name",
    async ({ jwt, params }) => {
      return {
        access_token: await jwt.sign(params),
      };
    },
    {
      beforeHandle: shouldNotBeLoggedIn,
    }
  )
  .get(
    "/profile",
    async ({ requester }) => {
      //   const users = await db.account.findMany();
      return { requester };
    },
    {
      beforeHandle: shouldBeLoggedIn,
    }
  );
