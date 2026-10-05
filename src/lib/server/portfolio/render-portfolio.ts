import "server-only";
import type { PortfolioData, RenderedPortfolioData, SectionResult } from "~/lib/portfolio/types";
import { renderMarkdown } from "~/lib/server/markdown";

function mapSection<T, U>(result: SectionResult<T>, render: (data: T) => U): SectionResult<U> {
  return result.error !== null ? result : { data: render(result.data), error: null };
}

function renderOptional(markdown: string | null) {
  return markdown === null ? null : renderMarkdown(markdown);
}

function renderDescriptions<T extends { description: string | null }>(result: SectionResult<T[]>) {
  return mapSection(result, (items) =>
    items.map((item) => ({ ...item, description: renderOptional(item.description) })),
  );
}

export function renderPortfolio(data: PortfolioData): RenderedPortfolioData {
  return {
    ...data,
    about: mapSection(data.about, (about) => about && { ...about, content: renderMarkdown(about.content) }),
    careers: renderDescriptions(data.careers),
    experiences: renderDescriptions(data.experiences),
    education: renderDescriptions(data.education),
    projects: mapSection(renderDescriptions(data.projects), (items) =>
      items.map((item) => ({ ...item, shortDescription: renderOptional(item.shortDescription) })),
    ),
  };
}
