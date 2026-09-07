import { expect, spyOn, test } from "bun:test";
import { createPortfolioImage } from "./og-image";

test("generates a complete 1200 × 630 PNG without Notion or remote fonts", async () => {
  const originalFetch = globalThis.fetch;
  const fetch = spyOn(globalThis, "fetch").mockImplementation(
    Object.assign(
      (input: Parameters<typeof originalFetch>[0], init?: Parameters<typeof originalFetch>[1]) => {
        if (typeof input === "string" && input.startsWith("data:")) {
          return originalFetch(input, init);
        }
        throw new Error("OG generation must not request external data or fonts");
      },
      { preconnect: originalFetch.preconnect },
    ),
  );

  try {
    const response = createPortfolioImage();
    const png = Buffer.from(await response.arrayBuffer());

    expect(response.headers.get("content-type")).toBe("image/png");
    expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);
    expect(fetch.mock.calls.every(([url]) => typeof url === "string" && url.startsWith("data:"))).toBe(true);
  } finally {
    fetch.mockRestore();
  }
});
