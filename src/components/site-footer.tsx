import { profile } from "~/lib/profile";

export function SiteFooter(props: { class: string }) {
  return (
    <footer class={props.class}>
      <span class="text-muted">
        © {new Date().getFullYear()} {profile.englishName}
      </span>
    </footer>
  );
}
