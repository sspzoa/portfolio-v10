import { createAsync, type RouteDefinition } from "@solidjs/router";
import { Show } from "solid-js";
import { PageMetadata } from "~/components/page-metadata";
import { PortfolioPage } from "~/components/portfolio-page";
import { getPortfolio } from "~/lib/portfolio/query";
import { portfolioStructuredDataJson, portfolioTitle } from "~/lib/seo";

export const route = { preload: () => getPortfolio() } satisfies RouteDefinition;

export default function Portfolio() {
  const portfolio = createAsync(() => getPortfolio());
  return (
    <>
      <PageMetadata title={portfolioTitle} />
      <script type="application/ld+json" innerHTML={portfolioStructuredDataJson} />
      <Show when={portfolio()}>{(data) => <PortfolioPage data={data()} />}</Show>
    </>
  );
}
