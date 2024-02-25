import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { CustomError } from "./libs/custom-error";

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

    const decoded = token ? await jwt.verify(token) : null;

    return {
      token: {
        value: token,
        decoded,
      },
    };
  })
  .derive(({ token }) => {
    return {
      requester: {
        token: token.value,
        name: token.decoded,
      },
    };
  });
