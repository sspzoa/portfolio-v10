import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig, loadEnv } from "vite";
import { securityHeaders } from "./src/lib/server/security-headers.ts";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "NOTION_");
  process.env.NOTION_TOKEN ??= env.NOTION_TOKEN;

  return {
    ssr: { noExternal: ["server-only"] },
    plugins: [solidStart({ middleware: "./src/middleware.ts", devOverlay: false }), nitro()],
    nitro: { routeRules: { "/**": { headers: securityHeaders } } },
    server: { port: 3000, strictPort: true },
  };
});
