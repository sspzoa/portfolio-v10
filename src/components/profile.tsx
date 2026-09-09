import { For } from "solid-js";
import { profile } from "~/lib/profile";
export function ProfileHeader() {
  return (
    <header class="pb-16 max-[40rem]:pb-12">
      <div class="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h1 class="font-bold text-profile leading-[1.35] tracking-[-0.025em]">{profile.name}</h1>
        <span class="text-caption text-muted">{profile.englishName}</span>
      </div>
      <p class="mt-2 text-secondary">{profile.role}</p>
      <p class="wrap-anywhere mt-6 break-keep text-secondary">{profile.introduction}</p>
      <nav class="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-caption" aria-label="연락처 및 소셜 링크">
        <For each={profile.links}>
          {({ href, label }) => (
            <a class="inline-flex min-h-9 items-center py-1" href={href} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          )}
        </For>
      </nav>
    </header>
  );
}
export function ProfileFooter() {
  return (
    <footer class="mt-8 flex flex-wrap justify-between gap-3 border-line border-t pt-6 text-caption text-muted print:hidden">
      <span>
        © {new Date().getFullYear()} {profile.englishName}
      </span>
      <a class="text-inherit" href="#top">
        맨 위로
      </a>
    </footer>
  );
}
