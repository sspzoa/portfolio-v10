import { createMiddleware } from "@solidjs/start/middleware";
import { securityHeaders } from "~/lib/server/security-headers";

export default createMiddleware([
  async (event, next) => {
    for (const [name, value] of Object.entries(securityHeaders)) event.res.headers.set(name, value);
    event.res.headers.set("Cache-Control", "no-store");
    return next();
  },
]);
