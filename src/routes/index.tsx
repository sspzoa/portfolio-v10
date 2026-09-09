import { createAsync } from "@solidjs/router";
import { Show } from "solid-js";
import { PageMetadata } from "~/components/page-metadata";
import { PortfolioPage } from "~/components/portfolio";
import { getPortfolio } from "~/lib/portfolio-query";
import { profileStructuredDataJson } from "~/lib/seo";

export const route = { preload: () => getPortfolio() };

export default function Home() {
  const data = createAsync(() => getPortfolio());
  return (
    <>
      <PageMetadata />
      <script type="application/ld+json" innerHTML={profileStructuredDataJson} />
      <Show when={data()} keyed>
        {(portfolio) => <PortfolioPage data={portfolio} />}
      </Show>
    </>
  );
}
