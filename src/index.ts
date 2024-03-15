import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { helmet } from "elysia-helmet";
import { swagger } from "@elysiajs/swagger";
import { staticPlugin } from "@elysiajs/static";
import { AuthenticationError, CustomError } from "./libs/custom-error";
import logger from "./providers/logger";
import jwtHandler from "./providers/jwt-handler";
import routes from "./routes";

const app = new Elysia()
  .use(helmet())
  .use(
    cors({
      origin: true,
      methods: true,
      allowedHeaders: "*",
      exposedHeaders: "*",
      credentials: false,
      maxAge: 5,
      preflight: true,
    })
  )
  .use(staticPlugin())
  .use(swagger())
  .use(jwtHandler)
  .error({
    CustomError,
    AuthenticationError,
  })
  .onRequest(({ request }) => {
    logger.info(
      `${request.method} || ${request.url} || ${JSON.stringify(
        request.body
      )} || ${request.mode}`
    );
  })
  .use(routes)
  .mapResponse(({ response, set }) => {
    const isJson = typeof response === "object";

    const text = isJson ? JSON.stringify(response) : response?.toString() ?? "";

    set.headers["Content-Encoding"] = "gzip";

    return new Response(Bun.gzipSync(new TextEncoder().encode(text)), {
      headers: {
        "Content-Type": `${
          isJson ? "application/json" : "text/plain"
        }; charset=utf-8`,
      },
    });
  })
  .onError(({ code, error, set }) => {
    logger.error(error);
    if (code === "NOT_FOUND") {
      set.status = 404;
    }

    return {
      ...error,
    };
  })
  .listen(process.env.PORT || 4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
