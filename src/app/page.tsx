import type { Metadata } from "next";
import { homeMetadata, profileStructuredDataJson } from "@/features/portfolio/config/seo";
import { PortfolioPage } from "@/features/portfolio/portfolio-page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = homeMetadata;

export default function Home() {
  return (
    <>
      <script type="application/ld+json">{profileStructuredDataJson}</script>
      <PortfolioPage />
    </>
  );
}
