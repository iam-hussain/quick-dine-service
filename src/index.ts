import { Elysia, NotFoundError } from "elysia";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import controllers from "./controllers";
import responder from "./libs/responder";
import { CustomError } from "./libs/custom-error";

const app = new Elysia()
  .use(cors())
  .use(staticPlugin())
  .use(controllers)
  .error({
    CustomError,
  })
  .onError(({ code, error, set }) => {
    if (code === "NOT_FOUND") {
      set.status = 404;
    }
    const errorMessage = error.message || "UNEXPECTED_ERROR";

    return responder({
      status: "error",
      massage: code || errorMessage,
      data: {
        error: error.toString(),
        code,
      },
    });
  })
  .onRequest((input) => {
    console.log({ input });
  })
  .get("/", () => responder({ massage: "QuickDine backend service" }))
  .get("/ping", () => responder({ massage: "pong" }))
  .all("*", () => {
    throw new NotFoundError();
  })
  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
