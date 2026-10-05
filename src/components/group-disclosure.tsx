import type { JSX } from "solid-js";

export function GroupDisclosure(props: { label: string; count: number; children: JSX.Element }) {
  return (
    <details class="disclosure mt-8 border-line border-t pt-5 [&[open]>summary]:mb-6">
      <summary class="disclosure-summary min-h-10 py-2">
        <span>{props.label}</span>
        <span class="text-muted tabular-nums">{props.count}개</span>
      </summary>
      {props.children}
    </details>
  );
}
