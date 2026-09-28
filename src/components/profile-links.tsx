import { For } from "solid-js";
import { profile } from "~/lib/profile";

export function ProfileLinks(props: { class: string }) {
  return (
    <For each={profile.links}>
      {(link) => (
        <a href={link.href} target="_blank" rel="noopener noreferrer" class={props.class}>
          {link.label}
        </a>
      )}
    </For>
  );
}
