import { PortfolioContent } from "~/components/portfolio-content";
import { ProfileFooter, ProfileHeader } from "~/components/profile";
import type { PortfolioData } from "~/lib/server/portfolio/load-portfolio";

export function PortfolioPage(props: { data: PortfolioData }) {
  return (
    <div class="mx-auto w-full max-w-reading px-6 pt-24 pb-10 max-[40rem]:px-5 max-[40rem]:pt-12 print:p-0" id="top">
      <ProfileHeader />
      <main id="main-content" tabindex={-1}>
        <PortfolioContent data={props.data} />
      </main>
      <ProfileFooter />
    </div>
  );
}
