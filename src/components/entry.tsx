import { For, type JSX, Show } from "solid-js";
import { RichText } from "~/components/rich-text";
import { formatPeriod } from "~/lib/format-date";
import type { RenderedHtml } from "~/lib/portfolio/types";

const iconVariants = {
  entry: {
    tile: "size-10 shrink-0 rounded-ui border border-line bg-surface p-1",
    image: "size-full rounded-ui object-contain",
    size: 30,
  },
  skill: {
    tile: "size-6 shrink-0 rounded-ui border border-line bg-surface p-0.5",
    image: "size-full object-contain",
    size: 18,
  },
};

export function EntryList<T>(props: { items: T[]; spacing: "compact" | "wide"; children: (item: T) => JSX.Element }) {
  return (
    <ul role="list" class={props.spacing === "wide" ? "flex flex-col gap-10" : "flex flex-col gap-5"}>
      <For each={props.items}>{(item) => props.children(item)}</For>
    </ul>
  );
}

export function EntryIcon(props: { src: string; variant?: keyof typeof iconVariants }) {
  const variant = () => iconVariants[props.variant ?? "entry"];
  return (
    <div class={variant().tile}>
      <img
        src={props.src}
        alt=""
        width={variant().size}
        height={variant().size}
        loading="lazy"
        decoding="async"
        draggable={false}
        class={variant().image}
      />
    </div>
  );
}

export function EntrySubtitle(props: { value: string | null }) {
  return (
    <Show when={props.value}>
      <p class="text-caption text-secondary">{props.value}</p>
    </Show>
  );
}

export function EntryHeading(props: { icon: string | null; title: string; subtitle: string | null }) {
  return (
    <div class="flex min-w-0 items-center gap-3">
      <Show when={props.icon}>{(icon) => <EntryIcon src={icon()} />}</Show>
      <div class="flex min-w-0 flex-col gap-1">
        <h3 class="entry-title">{props.title}</h3>
        <EntrySubtitle value={props.subtitle} />
      </div>
    </div>
  );
}

export function EntryDescription(props: { html: RenderedHtml | null }) {
  return (
    <Show when={props.html}>
      {(html) => (
        <div class="mt-3">
          <RichText>{html()}</RichText>
        </div>
      )}
    </Show>
  );
}

export function DateLabel(props: { value: string | null }) {
  return (
    <Show when={props.value}>
      <p class="whitespace-nowrap text-caption text-muted tabular-nums">{props.value}</p>
    </Show>
  );
}

export function Period(props: { start: string | null; end: string | null; ongoing?: boolean }) {
  return <DateLabel value={formatPeriod(props.start, props.end, { ongoing: props.ongoing })} />;
}
