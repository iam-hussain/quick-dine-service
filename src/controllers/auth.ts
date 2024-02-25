import { Elysia, t } from "elysia";
import db from "../providers/db";
import setup from "../setup";
import { shouldBeLoggedIn, shouldNotBeLoggedIn } from "../libs/auth-handler";
import { CustomError } from "../libs/custom-error";
import { verifyPasswordHash } from "../libs/hash";
import responder from "../libs/responder";

export default new Elysia({ prefix: "/auth" })
  .use(setup)
  .post(
    "login",
    async ({ jwt, body, set }) => {
      const user = await db.businessAccount.findUnique({
        where: {
          email: body.email,
        },
      });
      if (!user) {
        set.status = "Precondition Failed";
        throw new CustomError("USER_NOT_FOUND");
      }

      if (!user.password || !user.salt) {
        set.status = "Precondition Failed";
        throw new CustomError("NO_PASSWORD_FOUND");
      }
      const isMatch = verifyPasswordHash(
        body.password,
        user.password,
        user.salt
      );
      if (!isMatch) {
        set.status = "Precondition Failed";
        throw new CustomError("INVALID_PASSWORD");
      }

      return responder({
        massage: "SUCCESSFUL",
        data: {
          access_token: await jwt.sign({
            username: user.username,
          }),
        },
      });
    },
    {
      beforeHandle: shouldNotBeLoggedIn,
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    }
  )
  .get(
    "/profile",
    async ({ requester }) => {
      const products = await db.product.findMany({
        include: {
          tags: {
            include: {
              product: true,
            },
          },
        },
      });
      return { requester, products };
    }
    // {
    //   beforeHandle: shouldBeLoggedIn,
    // }
  );
