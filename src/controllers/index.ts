import { Elysia } from "elysia";
import responder from "../libs/responder";
import auth from "./auth";
import store from "./store";

export default new Elysia({ prefix: "/api" })
  .mapResponse(({ response, set }) => {
    const isJson = typeof response === "object";

    const text = isJson
      ? JSON.stringify(
          responder({
            data: response,
          })
        )
      : response?.toString() ?? "";

    set.headers["Content-Encoding"] = "gzip";

    return new Response(Bun.gzipSync(new TextEncoder().encode(text)), {
      headers: {
        "Content-Type": `${
          isJson ? "application/json" : "text/plain"
        }; charset=utf-8`,
      },
    });
  })
  .use(auth)
  .use(store);
