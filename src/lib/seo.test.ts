import { expect, test } from "bun:test";

test("loads metadata and crawler routes without credentials or network access", () => {
  const result = Bun.spawnSync(
    [
      process.execPath,
      "-e",
      `
    process.env.NOTION_TOKEN = "";
    globalThis.fetch = () => { throw new Error("SEO must not access the network"); };
    const { siteUrl, socialImage, profileStructuredDataJson } = await import("./src/lib/seo.ts");
    const { GET: robots } = await import("./src/routes/robots.txt.ts");
    const { GET: sitemap } = await import("./src/routes/sitemap.xml.ts");
    console.log(JSON.stringify({ siteUrl, socialImage, data: JSON.parse(profileStructuredDataJson), robots: await robots().text(), sitemap: await sitemap().text() }));
  `,
    ],
    { stdout: "pipe", stderr: "pipe" },
  );
  expect(result.stderr.toString()).toBe("");
  expect(result.exitCode).toBe(0);
  const output = JSON.parse(result.stdout.toString());
  expect(output.siteUrl).toBe("https://sspzoa.io");
  expect(output.socialImage.path).toBe("/opengraph-image");
  expect(output.data["@type"]).toBe("ProfilePage");
  expect(output.data.mainEntity["@type"]).toBe("Person");
  expect(output.data.url).toBe(output.siteUrl);
  expect(output.robots).toContain("Sitemap: https://sspzoa.io/sitemap.xml");
  expect(output.sitemap).toContain("<loc>https://sspzoa.io</loc>");
});
