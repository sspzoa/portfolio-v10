import { expect, spyOn, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { PortfolioContent } from "./portfolio-content";
import { portfolioSources } from "./server/sources";

test("returns complete readable HTML, including collapsed projects, despite one failed source", async () => {
  const originalToken = process.env.NOTION_TOKEN;
  process.env.NOTION_TOKEN = "secret_test";
  const log = spyOn(console, "error").mockImplementation(() => {});
  const request = spyOn(globalThis, "fetch").mockImplementation(
    Object.assign(
      async (input: Parameters<typeof fetch>[0]) => {
        const url = String(input);
        if (url.includes(portfolioSources.careers.id)) return new Response(null, { status: 401 });

        const results = url.includes(portfolioSources.aboutMe.id)
          ? [{ id: "about", properties: { content: { rich_text: [{ plain_text: "서버에서 완성한 소개" }] } } }]
          : url.includes(portfolioSources.projects.id)
            ? [false, true].map((side) => ({
                id: side ? "side" : "main",
                cover: null,
                icon: null,
                properties: {
                  name: { title: [{ plain_text: side ? "접힌 프로젝트" : "주요 프로젝트" }] },
                  shortDescription: { rich_text: [{ plain_text: "프로젝트 소개" }] },
                  description: { rich_text: [{ plain_text: "**전체 상세 설명**" }] },
                  workPeriod: { date: null },
                  teamSize: { number: 1 },
                  isSideProject: { checkbox: side },
                  tags: { multi_select: [] },
                },
              }))
            : [];

        return Response.json({ results, has_more: false, next_cursor: null });
      },
      { preconnect: globalThis.fetch.preconnect },
    ),
  );

  try {
    const html = renderToStaticMarkup(await PortfolioContent());

    expect(request).toHaveBeenCalledTimes(9);
    expect(html).toContain("서버에서 완성한 소개");
    expect(html).toContain("주요 프로젝트");
    expect(html).toContain("접힌 프로젝트");
    expect(html.match(/<strong>전체 상세 설명<\/strong>/g)).toHaveLength(2);
    expect(html).toContain('<details class="side-projects" id="side-projects">');
    expect(html).toContain("설정을 확인해 주세요.");
    expect(html).not.toContain('id="skills"');
    expect(html).not.toContain("불러오는 중");
    expect(html).not.toContain("<template");
    expect(html).not.toContain("<script");
    expect(html).not.toMatch(/\s(?:hidden|open|aria-busy)(?:=|\s|>)/);
    expect(html.indexOf('id="about"')).toBeLessThan(html.indexOf('id="careers"'));
    expect(html.indexOf('id="careers"')).toBeLessThan(html.indexOf('id="projects"'));
  } finally {
    request.mockRestore();
    log.mockRestore();
    if (originalToken === undefined) delete process.env.NOTION_TOKEN;
    else process.env.NOTION_TOKEN = originalToken;
  }
});
