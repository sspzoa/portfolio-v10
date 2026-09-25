import { For } from "solid-js";
import { PageMetadata } from "~/components/page-metadata";
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
            <div class="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <h1 class="font-bold text-profile leading-[1.35] tracking-[-0.025em]">{profile.name}</h1>
              <span class="text-caption text-muted">{profile.englishName}</span>
            </div>
            <p class="mt-2 text-secondary">{profile.role}</p>
            <p class="wrap-anywhere mt-6 whitespace-pre-line break-keep text-secondary">
              {profile.introduction.replace(", ", ",\n")}
            </p>
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
          <img
            src={character}
            alt=""
            class="pointer-events-none w-[35vw] max-w-[344px] shrink-0 select-none max-[40rem]:w-[40vw] max-[40rem]:self-end print:hidden"
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
