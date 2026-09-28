import { PageMetadata } from "~/components/page-metadata";
import { ProfileHeading } from "~/components/profile-heading";
import { ProfileLinks } from "~/components/profile-links";
import { profile } from "~/lib/profile";
import { profileStructuredDataJson } from "~/lib/seo";
import character from "../../assets/character-square.png";

export default function Home() {
  return (
    <>
      <PageMetadata />
      <script type="application/ld+json" innerHTML={profileStructuredDataJson} />
      <div class="relative isolate mx-auto flex min-h-[100svh] w-full max-w-reading flex-col px-6 max-[40rem]:px-5">
        <main class="flex flex-1 items-center justify-between gap-8 py-24 max-[40rem]:flex-col max-[40rem]:items-stretch max-[40rem]:justify-center">
          <header class="min-w-0 flex-1 max-[40rem]:w-full max-[40rem]:flex-none">
            <ProfileHeading />
            <p class="wrap-anywhere mt-6 whitespace-pre-line break-keep text-secondary">
              {profile.introduction.replace(", ", ",\n")}
            </p>
            <nav aria-label="연락처 및 소셜 링크" class="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-caption">
              <a href="/portfolio" class="inline-flex min-h-9 items-center py-1 transition-none">
                포트폴리오
              </a>
              <ProfileLinks class="inline-flex min-h-9 items-center py-1 transition-none" />
            </nav>
          </header>
          <img
            src={character}
            alt=""
            class="pointer-events-none w-[35vw] max-w-[344px] shrink-0 select-none rounded-ui border border-line max-[40rem]:w-[40vw] max-[40rem]:self-end print:hidden"
          />
        </main>
        <footer class="border-line border-t py-6 text-caption">
          <span class="text-muted">
            © {new Date().getFullYear()} {profile.englishName}
          </span>
        </footer>
      </div>
    </>
  );
}
