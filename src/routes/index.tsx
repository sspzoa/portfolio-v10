import { createAsync, type RouteDefinition } from "@solidjs/router";
import { Show } from "solid-js";
import { PageMetadata } from "~/components/page-metadata";
import { PortfolioPage } from "~/components/portfolio";
import { getPortfolio } from "~/lib/portfolio/query";
import { profileStructuredDataJson } from "~/lib/seo";

export const route = { preload: () => getPortfolio() } satisfies RouteDefinition;

export default function Home() {
  const portfolio = createAsync(() => getPortfolio());
  return (
    <>
      <PageMetadata />
      <script type="application/ld+json" innerHTML={profileStructuredDataJson} />
      <Show when={portfolio()}>{(data) => <PortfolioPage data={data()} />}</Show>
    </>
  );
}
