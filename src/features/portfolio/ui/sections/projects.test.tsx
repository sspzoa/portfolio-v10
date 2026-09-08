import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import type { Project } from "@/features/portfolio/model/schemas";
import { ProjectsContent } from "./projects";

function project(overrides: Partial<Project>): Project {
  return {
    id: "main-project",
    name: "주요 프로젝트",
    shortDescription: "서비스 개선",
    description: null,
    startDate: "2026.01",
    endDate: null,
    teamSize: 3,
    isSideProject: false,
    tags: ["React"],
    coverImage: null,
    iconImage: null,
    ...overrides,
  };
}

describe("ProjectsContent", () => {
  test("includes complete side-project content in the initial HTML under a closed disclosure", () => {
    const data = [
      project({}),
      project({
        id: "side-project",
        name: "작은 도구",
        isSideProject: true,
        shortDescription: "개인 생산성 도구",
        description: "**구현 내용**\n\n- [소스 코드](https://example.com/source)",
        tags: ["TypeScript"],
      }),
    ];
    const html = renderToStaticMarkup(<ProjectsContent data={data} />);
    const disclosureStart = html.search(/<details[^>]*id="side-projects"/);
    const mainContent = html.slice(0, disclosureStart);
    const sideContent = html.slice(disclosureStart);

    expect(disclosureStart).toBeGreaterThan(0);
    expect(mainContent).toContain("주요 프로젝트");
    expect(mainContent).not.toContain("작은 도구");
    expect(sideContent).not.toContain("주요 프로젝트");
    expect(sideContent).toContain("작은 도구");
    expect(sideContent).toContain("개인 생산성 도구");
    expect(sideContent).toContain("TypeScript");
    expect(sideContent).toContain("<strong>구현 내용</strong>");
    expect(sideContent).toContain('href="https://example.com/source"');
    expect(sideContent).toContain('aria-label="작은 도구 자세히 보기"');
    expect(sideContent).toMatch(/<span[^>]*>1개<\/span>/);
    expect(sideContent).not.toMatch(/\s(?:open|hidden|aria-hidden)(?:\s|=|>)/);
  });

  test("does not render a disclosure when there are no side projects", () => {
    const html = renderToStaticMarkup(<ProjectsContent data={[project({})]} />);

    expect(html).toContain("주요 프로젝트");
    expect(html).not.toContain("side-projects");
    expect(html).not.toContain("현재");
  });

  test("renders a side-only list without an empty main-project list", () => {
    const html = renderToStaticMarkup(<ProjectsContent data={[project({ isSideProject: true })]} />);

    expect(html).toMatch(/^<details[^>]*id="side-projects"[^>]*>/);
    expect(html.match(/<ul(?:\s[^>]*)?>/g)).toHaveLength(1);
    expect(html).toContain("주요 프로젝트");
  });

  test("omits all markup for an empty project list", () => {
    expect(renderToStaticMarkup(<ProjectsContent data={[]} />)).toBe("");
  });
});
