// types
import type * as rrn from "@remix-run/node";

// decorators
import * as ds from "~/server/decorators";

// services
import { getUserCount } from "~/server/services/system.user.service";

export class ApiHealthCheckController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.checkLogin()
  static async get({ request, params }: rrn.LoaderFunctionArgs) {
    const host =
      request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");

    try {
      const url = new URL("/", `http://${host}`);
      await Promise.all([
        getUserCount(),
        fetch(url.toString(), { method: "HEAD" }).then((r) => {
          if (!r.ok) return Promise.reject(r);
        }),
      ]);
      return new Response("OK");
    } catch (error: unknown) {
      console.log("healthcheck ❌", { error });
      return new Response("ERROR", { status: 500 });
    }
  }
}
