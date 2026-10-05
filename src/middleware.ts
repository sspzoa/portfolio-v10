import { randomBytes } from "node:crypto";
import { createMiddleware } from "@solidjs/start/middleware";
import { getRequestEvent } from "solid-js/web";
import { contentSecurityPolicy, securityHeaders } from "~/lib/server/security-headers";

const cacheablePaths = new Set(["/opengraph-image", "/robots.txt", "/sitemap.xml"]);

export default createMiddleware([
  async (event, next) => {
    const nonce = randomBytes(16).toString("base64");
    const requestEvent = getRequestEvent();
    if (requestEvent) requestEvent.locals.nonce = nonce;

    const headers = {
      ...securityHeaders,
      "Content-Security-Policy": contentSecurityPolicy(nonce),
      "Cache-Control": "no-store",
    };
    for (const [name, value] of Object.entries(headers)) {
      event.res.headers.set(name, value);
      event.res.errHeaders.set(name, value);
    }

    const response = await next();
    if (import.meta.env.PROD && cacheablePaths.has(event.url.pathname) && response instanceof Response && response.ok) {
      event.res.headers.set("Cache-Control", "public, max-age=3600, s-maxage=86400");
    }
    return response;
  },
]);
