import { LogoMark } from "~/components/logo-mark";
import { profile } from "~/lib/profile";

export function SiteFooter(props: { class: string }) {
  return (
    <footer class={props.class}>
      <span class="inline-flex items-center gap-2 text-muted">
        <LogoMark class="size-4 shrink-0" />© {new Date().getFullYear()} {profile.englishName}
      </span>
    </footer>
  );
}
