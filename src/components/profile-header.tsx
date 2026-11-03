import { For } from "solid-js";
import { profile } from "~/lib/profile";

export function ProfileHeader(props: { class: string }) {
  return (
    <header class={`text-center ${props.class}`}>
      <div>
        <h1 class="font-bold text-profile">{profile.name}</h1>
        <p class="mt-3 text-secondary">
          {profile.englishName}
          <span aria-hidden="true" class="mx-2 text-muted">
            ·
          </span>
          {profile.role}
        </p>
        <p class="break-anywhere mt-6 whitespace-pre-line break-keep text-secondary motion-safe:animate-delay-60 motion-safe:animate-rise">
          {profile.introduction}
        </p>
      </div>
      <nav
        aria-label="연락처 및 소셜 링크"
        class="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-caption motion-safe:animate-delay-140 motion-safe:animate-rise">
        <For each={profile.links}>
          {(link) => {
            const external = link.href.startsWith("https://");
            return (
              <a
                href={link.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                class="tap-target">
                {link.label}
              </a>
            );
          }}
        </For>
      </nav>
    </header>
  );
}
