import { OntologyGraph } from "~/components/ontology-graph";
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
      <div class="page-column flex min-h-svh flex-col">
        <main class="flex flex-1 items-center justify-between gap-8 py-24 max-sm:flex-col max-sm:items-stretch max-sm:justify-center">
          <header class="min-w-0 flex-1 max-sm:flex-none">
            <ProfileHeader introduction={profile.introduction.replace(", ", ",\n")}>
              <a href="/portfolio" class="tap-target font-bold transition-none">
                포트폴리오
              </a>
              <ProfileLinks class="tap-target transition-none" />
            </ProfileHeader>
          </header>
          <OntologyGraph class="pointer-events-none w-[clamp(280px,35vw,344px)] shrink-0 select-none max-sm:w-full max-sm:max-w-[344px] max-sm:self-center print:hidden" />
        </main>
        <SiteFooter class="border-line border-t py-6 text-caption" />
      </div>
    </>
  );
}
