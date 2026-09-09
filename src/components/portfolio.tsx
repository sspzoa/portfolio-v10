import { For } from "solid-js";
import { PortfolioContent } from "~/components/portfolio-content";
import type { PortfolioData } from "~/lib/portfolio/types";
import { profile } from "~/lib/profile";
import character from "../../assets/og-logo.svg";

export function PortfolioPage(props: { data: PortfolioData }) {
  return (
    <div class="relative isolate mx-auto w-full max-w-reading px-6 pt-24 pb-10 max-[40rem]:px-5 max-[40rem]:pt-12 print:p-0">
      <div
        aria-hidden="true"
        class="pointer-events-none fixed inset-0 -z-1 flex items-center justify-center overflow-hidden print:hidden">
        <img src={character} alt="" class="w-[344px] max-w-none select-none opacity-[0.035] max-[40rem]:w-[50vw]" />
      </div>
      <header class="pb-16 max-[40rem]:pb-12">
        <div class="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h1 class="font-bold text-profile leading-[1.35] tracking-[-0.025em]">{profile.name}</h1>
          <span class="text-caption text-muted">{profile.englishName}</span>
        </div>
        <p class="mt-2 text-secondary">{profile.role}</p>
        <p class="wrap-anywhere mt-6 break-keep text-secondary">{profile.introduction}</p>
        <nav aria-label="연락처 및 소셜 링크" class="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-caption">
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
      <main>
        <PortfolioContent data={props.data} />
      </main>
      <footer class="mt-8 flex flex-wrap items-center justify-between gap-3 border-line border-t pt-6 text-caption text-muted print:hidden">
        <span class="inline-flex items-center gap-2">
          © {new Date().getFullYear()} {profile.englishName}
        </span>
      </footer>
    </div>
  );
}
