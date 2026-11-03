import { For, type JSX } from "solid-js";
import { profile } from "~/lib/profile";

const headerSizes = {
  display: {
    header: "",
    name: "text-display",
    byline: "mt-5",
    introduction: "mt-10 text-lead text-ink",
    links: "mt-10 flex-col items-start gap-4",
  },
  title: {
    header: "text-center",
    name: "mx-auto text-profile",
    byline: "mt-3",
    introduction: "mt-6 text-secondary",
    links: "mt-5 flex-wrap items-center justify-center gap-x-5 gap-y-2 text-caption",
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

export function ProfileHeader(props: {
  size: keyof typeof headerSizes;
  introduction: string;
  class?: string;
  children: JSX.Element;
}) {
  const size = () => headerSizes[props.size];
  return (
    <header class={`${size().header} ${props.class ?? ""}`}>
      <div>
        <h1 class={`view-transition-profile-name w-fit font-bold ${size().name}`}>{profile.name}</h1>
        <p class={`text-secondary ${size().byline}`}>
          {profile.englishName}
          <span aria-hidden="true" class="mx-2 text-muted">
            ·
          </span>
          {profile.role}
        </p>
        <p
          class={`break-anywhere whitespace-pre-line break-keep motion-safe:animate-delay-60 motion-safe:animate-rise ${size().introduction}`}>
          {props.introduction}
        </p>
      </div>
      <nav
        aria-label="연락처 및 소셜 링크"
        class={`flex motion-safe:animate-delay-140 motion-safe:animate-rise ${size().links}`}>
        {props.children}
      </nav>
    </header>
  );
}
