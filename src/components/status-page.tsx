import type { JSX } from "solid-js";

export function StatusPage(props: { title: string; description: string; children: JSX.Element }) {
  return (
    <main class="page-column flex min-h-svh flex-col justify-center py-24 lg:max-w-wide">
      <div class="rail-grid">
        <div class="min-w-0 lg:col-start-2">
          <h1 class="font-bold text-profile">{props.title}</h1>
          <p class="mt-3 text-secondary">{props.description}</p>
          {props.children}
        </div>
      </div>
    </main>
  );
}
