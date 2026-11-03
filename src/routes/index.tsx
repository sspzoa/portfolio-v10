import { PageMetadata } from "~/components/page-metadata";
import { ProfileHeader, ProfileLinks } from "~/components/profile-header";
import { RefineSketch } from "~/components/refine-sketch";
import { SiteFooter } from "~/components/site-footer";
import { profile } from "~/lib/profile";
import { profileStructuredDataJson } from "~/lib/seo";

export default function Home() {
  return (
    <>
      <PageMetadata />
      <script type="application/ld+json" innerHTML={profileStructuredDataJson} />
      <div class="page-column flex min-h-svh flex-col lg:max-w-wide">
        <main class="flex flex-1 items-center justify-between gap-12 py-24 max-sm:flex-col max-sm:items-start max-sm:justify-center max-sm:py-16">
          <ProfileHeader
            size="display"
            introduction={profile.introduction.replace(", ", ",\n")}
            class="min-w-0 flex-1 max-sm:flex-none">
            <a href="/portfolio" class="button-primary">
              포트폴리오 보기
              <span
                aria-hidden="true"
                class="[transition:transform_var(--duration-fast)] group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5">
                →
              </span>
            </a>
            <div class="flex flex-wrap gap-x-6">
              <ProfileLinks class="tap-target" />
            </div>
          </ProfileHeader>
          <RefineSketch class="size-[440px] shrink-0 max-sm:hidden max-lg:size-[320px] print:hidden" />
        </main>
        <SiteFooter class="border-line border-t py-6 text-caption" />
      </div>
    </>
  );
}
