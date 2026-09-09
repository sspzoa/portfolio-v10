import UnoCSS from "@unocss/postcss";
import configDependencies from "./tools/postcss/config-dependencies.cjs";

export default {
  plugins: [configDependencies({ files: ["./uno.config.ts"] }), UnoCSS({ configOrPath: "./uno.config.ts" })],
};
