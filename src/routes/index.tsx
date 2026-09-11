import { For } from "solid-js";
import { PageMetadata } from "~/components/page-metadata";
import { profile } from "~/lib/profile";
import { profileStructuredDataJson } from "~/lib/seo";
import character from "../../assets/background-character.svg";

export default function Home() {
  return (
    <>
      <PageMetadata />
      <script type="application/ld+json" innerHTML={profileStructuredDataJson} />
      <div class="relative isolate mx-auto flex min-h-[100svh] w-full max-w-reading flex-col px-6 max-[40rem]:px-5">
        <div
          aria-hidden="true"
          class="pointer-events-none fixed inset-0 -z-1 flex items-center justify-center overflow-hidden print:hidden">
          <img src={character} alt="" class="w-[344px] max-w-none select-none opacity-[0.035] max-[40rem]:w-[50vw]" />
        </div>
        <main class="flex flex-1 flex-col justify-center py-24">
          <header>
            <div class="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <h1 class="font-bold text-profile leading-[1.35] tracking-[-0.025em]">{profile.name}</h1>
              <span class="text-caption text-muted">{profile.englishName}</span>
            </div>
            <p class="mt-2 text-secondary">{profile.role}</p>
            <p class="wrap-anywhere mt-6 break-keep text-secondary">{profile.introduction}</p>
            <nav aria-label="연락처 및 소셜 링크" class="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-caption">
              <a href="/portfolio" class="inline-flex min-h-9 items-center py-1">
                포트폴리오
              </a>
              <For each={profile.links}>
                {(link) => (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex min-h-9 items-center py-1">
                    {link.label}
                  </a>
                )}
              </For>
            </nav>
          </header>
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
