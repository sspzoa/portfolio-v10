import { LogoMark } from "~/components/logo-mark";
import { PageMetadata } from "~/components/page-metadata";
import { ProfileHeader, ProfileLinks } from "~/components/profile-header";
import { SiteFooter } from "~/components/site-footer";
import { profile } from "~/lib/profile";
import { profileStructuredDataJson } from "~/lib/seo";

export default function Home() {
  return (
    <>
      <PageMetadata />
      <script type="application/ld+json" innerHTML={profileStructuredDataJson} />
      <div class="page-column flex min-h-svh flex-col lg:max-w-wide">
        <main class="flex flex-1 items-center justify-between gap-12 py-24 max-sm:flex-col max-sm:items-stretch max-sm:justify-center max-sm:gap-10 max-sm:py-16">
          <header class="min-w-0 flex-1 max-sm:flex-none">
            <ProfileHeader size="display" introduction={profile.introduction.replace(", ", ",\n")}>
              <a href="/portfolio" class="button-primary max-sm:w-full max-sm:justify-between">
                포트폴리오 보기
                <span
                  aria-hidden="true"
                  class="[transition:transform_var(--duration-fast)] group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5">
                  →
                </span>
              </a>
              <ProfileLinks class="tap-target" />
            </ProfileHeader>
          </header>
          <LogoMark
            ghost
            class="view-transition-logo-mark size-[224px] shrink-0 text-ink max-sm:order-first max-sm:size-[112px] print:hidden"
          />
        </main>
        <SiteFooter class="border-line border-t py-6 text-caption" />
      </div>
    </>
  );
}
