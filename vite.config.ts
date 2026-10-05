import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import { securityHeaders } from "./src/lib/server/security-headers.ts";

export default defineConfig({
  plugins: [UnoCSS(), solidStart({ middleware: "./src/middleware.ts", devOverlay: false }), nitro()],
  nitro: {
    compatibilityDate: "2026-10-05",
    traceDeps: ["satori", "harfbuzzjs*"],
    routeRules: {
      "/**": { headers: securityHeaders },
      "/_build/assets/**": { headers: securityHeaders },
    },
  },
  server: { port: 3000, strictPort: true },
});
