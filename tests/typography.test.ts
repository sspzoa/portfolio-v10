import { expect, test } from "bun:test";
import { createGenerator } from "unocss";
import config from "../uno.config";

test("custom text sizes preserve inherited line spacing", async () => {
  const uno = await createGenerator(config);

  for (const size of ["profile", "section", "copy", "caption"]) {
    const { css } = await uno.generate(`text-${size}`, { preflights: false });
    expect(css).toContain("line-height:inherit");
    expect(css).not.toContain("line-height:1;");
  }
});
