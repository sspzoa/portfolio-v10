import { For, type JSX } from "solid-js";
import { profile } from "~/lib/profile";

export function ProfileLinks(props: { class: string }) {
  return (
    <For each={profile.links}>
      {(link) => {
        const external = link.href.startsWith("https://");
        return (
          <a
            href={link.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            class={props.class}>
            {link.label}
          </a>
        );
      }}
    </For>
  );
}

export function ProfileHeader(props: { introduction: string; children: JSX.Element }) {
  return (
    <>
      <div class="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h1 class="view-transition-profile-name font-bold text-profile">{profile.name}</h1>
        <span class="text-caption text-muted">{profile.englishName}</span>
      </div>
      <p class="mt-2 text-secondary">{profile.role}</p>
      <p class="break-anywhere mt-6 whitespace-pre-line break-keep text-secondary motion-safe:animate-delay-60 motion-safe:animate-rise">
        {props.introduction}
      </p>
      <nav
        aria-label="연락처 및 소셜 링크"
        class="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-caption motion-safe:animate-delay-140 motion-safe:animate-rise">
        {props.children}
      </nav>
    </>
  );
}
