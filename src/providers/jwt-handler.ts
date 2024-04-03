import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { HandlerProps, JWT_OBJECT } from "../types";

const SECRET = process.env.SECRET || "";

const extractToken = ({ headers }: Pick<HandlerProps, "headers">) => {
  const authorization = headers["authorization"];
  const jwtToken = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;
  return jwtToken;
};

const decodeToken = async ({
  jwt,
  token,
}: Pick<HandlerProps, "jwt"> & { token: ReturnType<typeof extractToken> }) => {
  if (token) {
    const decoded = await jwt.verify(token);
    if (decoded) {
      return decoded as JWT_OBJECT;
    }
    return decoded;
  }
  return false;
};

export default new Elysia({ name: "jwt_handler" })
  .use(
    jwt({
      name: "jwt",
      secret: SECRET,
      exp: "7d",
    })
  )
  .derive(async ({ jwt, headers }) => {
    const value = extractToken({ headers });
    const decoded = await decodeToken({ jwt, token: value });
    const tokenType = decoded ? decoded.type : "";
    return {
      token: {
        value,
        decoded,
        hasToken: typeof value === "string",
        tokenType: decoded ? decoded.type : "",
        isBusinessUser:
          decoded && Boolean(decoded.username) && tokenType === "BUSINESS",
        hasStore: decoded && Boolean(decoded.store),
      },
    };
  });
