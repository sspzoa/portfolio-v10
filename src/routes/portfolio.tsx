import { createAsync, type RouteDefinition } from "@solidjs/router";
import { Show } from "solid-js";
import { PageMetadata } from "~/components/page-metadata";
import { PortfolioPage } from "~/components/portfolio";
import { getPortfolio } from "~/lib/portfolio/query";
import { portfolioStructuredDataJson } from "~/lib/seo";

export const route = { preload: () => getPortfolio() } satisfies RouteDefinition;

export default function Portfolio() {
  const portfolio = createAsync(() => getPortfolio());
  return (
    <>
      <PageMetadata path="/portfolio" title="서승표 · 포트폴리오" />
      <script type="application/ld+json" innerHTML={portfolioStructuredDataJson} />
      <Show when={portfolio()}>{(data) => <PortfolioPage data={data()} />}</Show>
    </>
  );
}
