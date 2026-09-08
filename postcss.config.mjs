import { resolve } from "node:path";

const config = {
  plugins: {
    [resolve("tools/postcss/config-dependencies.cjs")]: {
      files: ["./uno.config.ts"],
    },
    "@unocss/postcss": {
      configOrPath: "./uno.config.ts",
    },
  },
};

export default config;
