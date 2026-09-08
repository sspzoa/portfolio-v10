import { afterEach, describe, expect, mock, spyOn, test } from "bun:test";
import { EnvironmentError, getServerEnv } from "@/server/env";
import { NotionPayloadError, NotionRequestError } from "@/server/notion/errors";
import { getSectionErrorMessage, PortfolioValidationError } from "./errors";
import { fetchAboutMe, fetchCareers, fetchEducation, fetchExperiences, fetchProjects } from "./repository";

const originalToken = process.env.NOTION_TOKEN;

afterEach(() => {
  mock.restore();
  if (originalToken === undefined) delete process.env.NOTION_TOKEN;
  else process.env.NOTION_TOKEN = originalToken;
});

function projectPage(id: string, sideProject: boolean) {
  return {
    id,
    cover: null,
    icon: { type: "emoji", emoji: "🐯" },
    properties: {
      name: { title: [{ plain_text: "Project " }, { plain_text: id }] },
      shortDescription: { rich_text: [{ plain_text: "A " }, { plain_text: "description" }] },
      description: {
        rich_text: [
          { plain_text: "First line\nSecond line", annotations: { bold: true } },
          { plain_text: "\n" },
          { plain_text: "Website", href: "https://example.com" },
        ],
      },
      workPeriod: { date: { start: "2024-01-15T08:00:00.000+09:00", end: null } },
      teamSize: { number: 2 },
      isSideProject: { checkbox: sideProject },
      tags: { multi_select: [{ name: "React" }] },
    },
  };
}

function mockResponse(payload: unknown) {
  process.env.NOTION_TOKEN = "secret_test";
  spyOn(globalThis, "fetch").mockResolvedValue(Response.json(payload));
}

function timelinePage(url: string[]) {
  return {
    id: "organization",
    properties: {
      role: { title: [{ plain_text: "Engineer" }] },
      department: { title: [{ plain_text: "Engineering" }] },
      organization: { rich_text: [{ plain_text: "Organization" }] },
      description: { rich_text: [] },
      date: { date: null },
      logo: { files: [] },
      url: { rich_text: url.map((plain_text) => ({ plain_text })) },
    },
  };
}

describe("Portfolio repository", () => {
  test.each([
    ["careers", fetchCareers],
    ["educations", fetchEducation],
    ["experiences", fetchExperiences],
  ] as const)("preserves the %s website URL across rich-text segments", async (_, fetchItems) => {
    mockResponse({
      results: [timelinePage([" https://", "example.com/team "])],
      has_more: false,
      next_cursor: null,
    });

    const [item] = await fetchItems();
    expect(item.url).toBe("https://example.com/team");
  });

  test("keeps an organization without a website", async () => {
    mockResponse({ results: [timelinePage(["  "])], has_more: false, next_cursor: null });
    const [item] = await fetchCareers();
    expect(item.organization).toBe("Organization");
    expect(item.url).toBeNull();
  });

  test("rejects non-HTTP website protocols before rendering links", async () => {
    mockResponse({ results: [timelinePage(["javascript:alert(1)"])], has_more: false, next_cursor: null });
    await expect(fetchCareers()).rejects.toBeInstanceOf(PortfolioValidationError);
  });

  test("retains side projects and concatenates rich text and titles across pages", async () => {
    process.env.NOTION_TOKEN = "secret_test";
    const request = spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(
        Response.json({ results: [projectPage("main", false)], has_more: true, next_cursor: "side-cursor" }),
      )
      .mockResolvedValueOnce(
        Response.json({ results: [projectPage("side", true)], has_more: false, next_cursor: null }),
      );

    const projects = await fetchProjects();
    expect(JSON.parse(String(request.mock.calls[1][1]?.body))).toMatchObject({ start_cursor: "side-cursor" });
    expect(projects.map((project) => [project.name, project.isSideProject])).toEqual([
      ["Project main", false],
      ["Project side", true],
    ]);
    expect(projects[1]).toMatchObject({
      shortDescription: "A description",
      description: "**First line**\n**Second line**\n[Website](https://example.com)",
      startDate: "2024.01",
      endDate: null,
      iconImage: null,
      teamSize: 2,
      tags: ["React"],
    });
  });

  test("an empty about source is an empty section", async () => {
    mockResponse({ results: [], has_more: false, next_cursor: null });
    await expect(fetchAboutMe()).resolves.toBeNull();
  });

  test("rejects malformed properties before the mapper reads them", async () => {
    mockResponse({ results: [{ id: "bad", properties: {} }], has_more: false, next_cursor: null });
    await expect(fetchProjects()).rejects.toBeInstanceOf(NotionPayloadError);
  });

  test("rejects invalid dates instead of silently dropping them", async () => {
    const page = projectPage("bad-date", false);
    page.properties.workPeriod.date.start = "2024-13-40";
    mockResponse({ results: [page], has_more: false, next_cursor: null });
    await expect(fetchProjects()).rejects.toBeInstanceOf(NotionPayloadError);
  });

  test("validates mapped domain constraints independently of transport", async () => {
    const page = projectPage("negative-team-size", false);
    page.properties.teamSize.number = -1;
    mockResponse({ results: [page], has_more: false, next_cursor: null });
    await expect(fetchProjects()).rejects.toBeInstanceOf(PortfolioValidationError);
  });

  test("separates configuration and validation errors from transient rate limits", () => {
    expect(getSectionErrorMessage(new NotionRequestError(401))).toBe("설정을 확인해 주세요.");
    expect(getSectionErrorMessage(new NotionRequestError(404))).toBe("설정을 확인해 주세요.");
    expect(getSectionErrorMessage(new PortfolioValidationError("projects", { cause: new TypeError() }))).toBe(
      "설정을 확인해 주세요.",
    );
    expect(getSectionErrorMessage(new NotionPayloadError("Invalid properties"))).toBe("설정을 확인해 주세요.");
    expect(getSectionErrorMessage(new NotionRequestError(429))).toBe("일시적으로 데이터를 불러올 수 없습니다.");
    expect(getSectionErrorMessage(new NotionRequestError(503))).toBe("일시적으로 데이터를 불러올 수 없습니다.");
    expect(getSectionErrorMessage(new NotionRequestError(null))).toBe("일시적으로 데이터를 불러올 수 없습니다.");
  });

  test("validates credentials on demand without including invalid secrets in errors", () => {
    process.env.NOTION_TOKEN = "private-invalid-test-token";
    expect(getServerEnv).toThrow(EnvironmentError);
    try {
      getServerEnv();
    } catch (error) {
      expect(String(error)).not.toContain("private-invalid-test-token");
      expect(getSectionErrorMessage(error)).toBe("설정을 확인해 주세요.");
    }
  });
});
