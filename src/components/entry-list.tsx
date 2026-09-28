import { For, type JSX } from "solid-js";

export function EntryList<T>(props: { items: T[]; spacing: "compact" | "wide"; children: (item: T) => JSX.Element }) {
  return (
    <ul class={props.spacing === "wide" ? "flex flex-col gap-10" : "flex flex-col gap-5"}>
      <For each={props.items}>{(item) => props.children(item)}</For>
    </ul>
  );
}
