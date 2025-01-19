import { Context } from "../ReactRouterApi/context";
import { ReactRouterApi } from "../ReactRouterApi";
import { loginService } from "~/services/admin-auth/login";
import { refreshTokenTool } from "~/services/admin-auth/refresh";
import { registerService } from "~/services/admin-auth/register";

export const authRouter = new ReactRouterApi();

authRouter.use(async (c: Context, next: Function) => {
  console.log("authRouter", c.req.url);
  await next();
});

authRouter.post("/login", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const data = await loginService.loginAction(args);
    return c.js(data);
  } catch (error) {
    return c.error(error as Error);
  }
});

authRouter.post("/register", async (c) => {
  try {
    const body = await c.req.json();
    const data = registerService.register(body);
    return c.json(data);
  } catch (error) {
    return c.error(error as Error);
  }
});

authRouter.post("/refresh_token", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const data = await refreshTokenTool.createTokens(args);
    return c.json(data);
  } catch (error) {
    return c.error(error as Error);
  }
});
