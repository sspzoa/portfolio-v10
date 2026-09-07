import { expect, test } from "bun:test";

test("loads SEO and crawler routes without Notion credentials or network access", () => {
  const result = Bun.spawnSync(
    [
      process.execPath,
      "-e",
      `
        process.env.NOTION_TOKEN = "";
        globalThis.fetch = () => { throw new Error("SEO must not access the network"); };
        const [{ siteMetadata, homeMetadata, profileStructuredDataJson }, { default: robots }, { default: sitemap }] =
          await Promise.all([
            import("./src/features/portfolio/config/seo.ts"),
            import("./src/app/robots.ts"),
            import("./src/app/sitemap.ts"),
          ]);
        console.log(JSON.stringify({
          origin: siteMetadata.metadataBase.origin,
          canonical: homeMetadata.alternates.canonical,
          image: siteMetadata.openGraph.images[0].url,
          card: siteMetadata.twitter.card,
          structuredData: JSON.parse(profileStructuredDataJson),
          robots: robots(),
          sitemap: sitemap(),
        }));
      `,
    ],
    { cwd: process.cwd(), stdout: "pipe", stderr: "pipe" },
  );

  expect(result.stderr.toString()).toBe("");
  expect(result.exitCode).toBe(0);

  const output = JSON.parse(result.stdout.toString());

  expect(output.origin).toBe("https://sspzoa.io");
  expect(output.canonical).toBe(output.origin);
  expect(output.image).toBe(`${output.origin}/opengraph-image`);
  expect(output.card).toBe("summary_large_image");
  expect(output.structuredData["@type"]).toBe("ProfilePage");
  expect(output.structuredData.mainEntity["@type"]).toBe("Person");
  expect(output.structuredData.url).toBe(output.canonical);
  expect(output.robots.sitemap).toBe(`${output.origin}/sitemap.xml`);
  expect(output.sitemap).toEqual([{ url: output.canonical }]);
});
