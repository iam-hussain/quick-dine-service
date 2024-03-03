import { Elysia } from "elysia";
import validators from "../validators";
import { shouldNotHaveToken } from "../providers/authorization";
import authenticationController from "../controllers/authentication-controller";

export default new Elysia({
  name: "authentication_router",
  prefix: "/authentication",
})
  .post("/sign-in", authenticationController.signIn, {
    body: validators.signIn,
    beforeHandle: shouldNotHaveToken as never,
  })
  .post("/sign-up", () => "Sign up")
  .post("/profile", () => "Profile");
