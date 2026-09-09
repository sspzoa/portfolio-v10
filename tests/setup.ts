import { mock } from "bun:test";
import { transformAsync } from "@babel/core";
import { plugin } from "bun";

mock.module("server-only", () => ({}));

plugin({
  name: "solid-ssr-tests",
  setup(build) {
    build.onLoad({ filter: /\.(png|ttf)\?inline$/ }, async ({ path }) => {
      const file = path.replace(/\?inline$/, "");
      const mime = file.endsWith(".png") ? "image/png" : "font/ttf";
      const data = Buffer.from(await Bun.file(file).arrayBuffer()).toString("base64");
      return { contents: `export default ${JSON.stringify(`data:${mime};base64,${data}`)}`, loader: "js" };
    });
    build.onLoad({ filter: /\.tsx$/ }, async ({ path }) => {
      const result = await transformAsync(await Bun.file(path).text(), {
        filename: path,
        babelrc: false,
        configFile: false,
        parserOpts: { plugins: ["typescript", "jsx"] },
        presets: [["babel-preset-solid", { generate: "ssr", hydratable: false }]],
      });
      return { contents: result?.code ?? "", loader: "ts" };
    });
  },
});
