import "server-only";
import type { PortfolioData, RenderedPortfolioData, SectionResult } from "~/lib/portfolio/types";
import { renderMarkdown } from "~/lib/server/markdown";

function mapSection<T, U>(result: SectionResult<T>, render: (data: T) => U): SectionResult<U> {
  return result.error !== null ? result : { data: render(result.data), error: null };
}

function renderDescription<T extends { description: string | null }>(item: T) {
  return { ...item, description: item.description === null ? null : renderMarkdown(item.description) };
}

export function renderPortfolio(data: PortfolioData): RenderedPortfolioData {
  return {
    ...data,
    about: mapSection(data.about, (about) => (about === null ? null : { content: renderMarkdown(about.content) })),
    careers: mapSection(data.careers, (items) => items.map(renderDescription)),
    experiences: mapSection(data.experiences, (items) => items.map(renderDescription)),
    education: mapSection(data.education, (items) => items.map(renderDescription)),
    projects: mapSection(data.projects, (items) =>
      items.map((item) => ({
        ...renderDescription(item),
        shortDescription: item.shortDescription === null ? null : renderMarkdown(item.shortDescription),
      })),
    ),
  };
}
