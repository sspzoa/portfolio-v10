import type { JSX } from "solid-js";
import { BrokenEdge } from "~/components/broken-edge";

export function StatusPage(props: { title: string; description: string; children: JSX.Element }) {
  return (
    <main class="mx-auto flex min-h-[100svh] w-full max-w-reading flex-col justify-center px-6 py-24 max-[40rem]:px-5">
      <BrokenEdge />
      <h1 class="font-bold text-profile leading-[1.35] tracking-[-0.025em]">{props.title}</h1>
      <p class="mt-3 text-secondary">{props.description}</p>
      {props.children}
    </main>
  );
}
