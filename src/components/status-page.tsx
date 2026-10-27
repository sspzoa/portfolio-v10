import type { JSX } from "solid-js";
import { LogoMark } from "~/components/logo-mark";

export function StatusPage(props: { title: string; description: string; children: JSX.Element }) {
  return (
    <main class="page-column flex min-h-svh flex-col justify-center py-24">
      <LogoMark class="view-transition-logo-mark mb-10 size-[56px] text-ink" />
      <h1 class="font-bold text-profile">{props.title}</h1>
      <p class="mt-3 text-secondary">{props.description}</p>
      {props.children}
    </main>
  );
}
