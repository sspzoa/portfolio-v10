import type { JSX } from "solid-js";

export function GroupDisclosure(props: { label: string; count: number; class: string; children: JSX.Element }) {
  return (
    <details
      class={`disclosure border-line border-t pt-2 first:mt-0 first:border-t-0 first:pt-0 [&[open]>summary]:mb-8 ${props.class}`}>
      <summary class="disclosure-summary min-h-12 py-2">
        <span>{props.label}</span>
        <span class="text-muted tabular-nums">{props.count}개</span>
      </summary>
      {props.children}
    </details>
  );
}
