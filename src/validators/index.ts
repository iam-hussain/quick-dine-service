import { t } from "elysia";

const signIn = t.Object({
  email: t.String(),
  password: t.String(),
});

export default { signIn };
