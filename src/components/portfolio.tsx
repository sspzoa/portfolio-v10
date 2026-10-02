import { GraphMark } from "~/components/graph-mark";
import { PortfolioContent } from "~/components/portfolio-content";
import { ProfileHeading } from "~/components/profile-heading";
import { ProfileLinks } from "~/components/profile-links";
import { SiteFooter } from "~/components/site-footer";
import type { RenderedPortfolioData } from "~/lib/portfolio/types";
import { profile } from "~/lib/profile";

export function PortfolioPage(props: { data: RenderedPortfolioData }) {
  return (
    <div class="mx-auto w-full max-w-reading px-6 pt-24 pb-10 max-[40rem]:px-5 max-[40rem]:pt-12 print:p-0">
      <header class="pb-16 max-[40rem]:pb-12">
        <GraphMark draw class="mb-6 block size-7 print:hidden" />
        <ProfileHeading />
        <p
          class="wrap-anywhere mt-6 break-keep text-secondary motion-safe:animate-rise"
          style={{ "animation-delay": "60ms" }}>
          {profile.introduction}
        </p>
        <nav
          aria-label="연락처 및 소셜 링크"
          class="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-caption motion-safe:animate-rise"
          style={{ "animation-delay": "140ms" }}>
          <ProfileLinks class="inline-flex min-h-9 items-center py-1" />
        </nav>
      </header>
      <main>
        <PortfolioContent data={props.data} />
      </main>
      <SiteFooter class="mt-8 border-line border-t pt-6 text-caption print:hidden" />
    </div>
  );
}
