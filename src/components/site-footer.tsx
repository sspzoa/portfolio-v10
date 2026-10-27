import { Show } from "solid-js";
import { profile } from "~/lib/profile";

export function SiteFooter(props: { class: string; backToTop?: boolean }) {
  return (
    <footer class={`flex items-center justify-between gap-4 ${props.class}`}>
      <span class="text-muted">
        © {new Date().getFullYear()} {profile.englishName}
      </span>
      <Show when={props.backToTop}>
        <a href="#top" class="tap-target text-secondary no-underline hover:text-ink print:hidden">
          맨 위로
        </a>
      </Show>
    </footer>
  );
}
