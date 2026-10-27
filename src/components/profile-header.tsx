import { For, type JSX } from "solid-js";
import { profile } from "~/lib/profile";

const headerSizes = {
  display: {
    name: "text-display",
    englishName: "text-copy",
    role: "mt-3",
    introduction: "mt-10 text-lead text-ink",
    links: "mt-10 gap-x-6 gap-y-3",
  },
  title: {
    name: "text-profile",
    englishName: "text-caption",
    role: "mt-2",
    introduction: "mt-6 text-secondary",
    links: "mt-5 gap-x-5 gap-y-2 text-caption",
  },
};

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

export function ProfileHeader(props: { size: keyof typeof headerSizes; introduction: string; children: JSX.Element }) {
  const size = () => headerSizes[props.size];
  return (
    <>
      <div class="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h1 class={`view-transition-profile-name font-bold ${size().name}`}>{profile.name}</h1>
        <span class={`text-muted ${size().englishName}`}>{profile.englishName}</span>
      </div>
      <p class={`text-secondary ${size().role}`}>{profile.role}</p>
      <p
        class={`break-anywhere whitespace-pre-line break-keep motion-safe:animate-delay-60 motion-safe:animate-rise ${size().introduction}`}>
        {props.introduction}
      </p>
      <nav
        aria-label="연락처 및 소셜 링크"
        class={`flex flex-wrap items-center motion-safe:animate-delay-140 motion-safe:animate-rise ${size().links}`}>
        {props.children}
      </nav>
    </>
  );
}
