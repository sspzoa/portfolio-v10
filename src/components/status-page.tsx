import type { JSX } from "solid-js";

function BrokenEdge() {
  return (
    <svg viewBox="0 0 120 24" fill="none" aria-hidden="true" class="mb-6 h-6 w-[120px]">
      <path
        d="M19 12H76"
        pathLength="100"
        stroke-dasharray="100"
        stroke-opacity="0.5"
        class="stroke-muted motion-safe:animate-graph-draw"
      />
      <circle
        cx="108"
        cy="12"
        r="5"
        stroke-width="1.5"
        stroke-dasharray="3 2.5"
        class="stroke-muted motion-safe:animate-delay-900 motion-safe:animate-graph-fade"
      />
      <circle cx="8" cy="12" r="6" class="fill-accent" />
    </svg>
  );
}

export function StatusPage(props: { title: string; description: string; children: JSX.Element }) {
  return (
    <main class="page-column flex min-h-svh flex-col justify-center py-24">
      <BrokenEdge />
      <h1 class="font-bold text-profile">{props.title}</h1>
      <p class="mt-3 text-secondary">{props.description}</p>
      {props.children}
    </main>
  );
}
