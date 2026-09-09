import { expect, spyOn, test } from "bun:test";
import { loadPortfolio, loadSection } from "~/lib/server/portfolio/load-portfolio";

test("starts every section request before waiting for any response", async () => {
  const originalToken = process.env.NOTION_TOKEN;
  process.env.NOTION_TOKEN = "secret_test";
  const responses: Array<(value: Response) => void> = [];
  const request = spyOn(globalThis, "fetch").mockImplementation(
    Object.assign(() => new Promise<Response>((resolve) => responses.push(resolve)), { preconnect: fetch.preconnect }),
  );
  try {
    const pending = loadPortfolio();
    expect(request).toHaveBeenCalledTimes(9);
    for (const resolve of responses) resolve(Response.json({ results: [], has_more: false, next_cursor: null }));
    const data = await pending;
    expect(data.about).toEqual({ data: null, error: null });
    expect(data.projects).toEqual({ data: [], error: null });
    expect(Object.values(data).every((section) => section.error === null)).toBe(true);
  } finally {
    request.mockRestore();
    if (originalToken === undefined) delete process.env.NOTION_TOKEN;
    else process.env.NOTION_TOKEN = originalToken;
  }
});

test("does not serialize or log private failure details", async () => {
  const log = spyOn(console, "error").mockImplementation(() => {});
  try {
    const result = await loadSection("projects", async () => {
      throw new Error("private upstream response secret_test");
    });
    expect(result).toEqual({ data: null, error: "일시적으로 데이터를 불러올 수 없습니다." });
    expect(log).toHaveBeenCalledWith("[Portfolio:projects]", "Error");
    expect(JSON.stringify(result)).not.toContain("secret_test");
  } finally {
    log.mockRestore();
  }
});
