import { For, type JSX, Show } from "solid-js";
import { RichText } from "~/components/rich-text";
import { formatPeriod } from "~/lib/format-date";
import type { RenderedHtml } from "~/lib/portfolio/types";

const iconVariants = {
  entry: {
    tile: "size-10 shrink-0 self-center rounded-tile p-1",
    image: "size-full rounded-[calc(var(--radius-tile)-0.25rem)] object-contain",
    size: 30,
  },
  skill: {
    tile: "size-6 shrink-0 rounded-[0.375rem] p-0.5",
    image: "size-full object-contain",
    size: 18,
  },
};

export function EntryList<T>(props: { items: T[]; spacing: "ruled" | "wide"; children: (item: T) => JSX.Element }) {
  return (
    <ul role="list" class={props.spacing === "wide" ? "flex flex-col gap-12 max-sm:gap-10" : "flex flex-col"}>
      <For each={props.items}>{(item) => props.children(item)}</For>
    </ul>
  );
}

export function EntryIcon(props: { src: string | null; label: string; variant?: keyof typeof iconVariants }) {
  const variant = () => iconVariants[props.variant ?? "entry"];
  return (
    <Show
      when={props.src}
      fallback={
        <div
          aria-hidden="true"
          class={`grid select-none place-items-center bg-surface font-semibold text-caption text-muted ${variant().tile}`}>
          {Array.from(props.label)[0]}
        </div>
      }>
      {(src) => (
        <div class={`border border-tile-line bg-tile ${variant().tile}`}>
          <img
            src={src()}
            alt=""
            width={variant().size}
            height={variant().size}
            loading="lazy"
            decoding="async"
            draggable={false}
            class={variant().image}
          />
        </div>
      )}
    </Show>
  );
}

export function EntrySubtitle(props: { value: string | null }) {
  return (
    <Show when={props.value}>
      <p class="text-caption text-secondary">{props.value}</p>
    </Show>
  );
}

export function EntryHeading(props: { title: string; subtitle: string | null }) {
  return (
    <div class="flex min-w-0 flex-col gap-0.5">
      <h3 class="entry-title">{props.title}</h3>
      <EntrySubtitle value={props.subtitle} />
    </div>
  );
}

export function IconEntry(props: {
  icon: string | null;
  title: string;
  subtitle: string | null;
  period: JSX.Element;
  children: JSX.Element;
}) {
  return (
    <li class="break-anywhere reveal grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-baseline gap-x-4 max-sm:grid-cols-[2.5rem_minmax(0,1fr)] max-sm:gap-x-3 print:break-inside-avoid">
      <EntryIcon src={props.icon} label={props.title} />
      <EntryHeading title={props.title} subtitle={props.subtitle} />
      <div class="max-sm:col-start-2">{props.period}</div>
      <div class="col-[2/-1] max-sm:col-span-full">{props.children}</div>
    </li>
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

export function DateLabel(props: { value: string | null; current?: boolean }) {
  return (
    <Show when={props.value}>
      <p class="flex items-baseline gap-2 whitespace-nowrap text-caption text-muted tabular-nums leading-[calc(var(--text-body)*var(--leading-body))]">
        <Show when={props.current}>
          <span aria-hidden="true" class="size-1.5 shrink-0 self-center rounded-full bg-accent" />
        </Show>
        {props.value}
      </p>
    </Show>
  );
}

export function Period(props: { start: string | null; end: string | null; ongoing?: boolean }) {
  return (
    <DateLabel
      value={formatPeriod(props.start, props.end, { ongoing: props.ongoing })}
      current={Boolean(props.ongoing && props.start && !props.end)}
    />
  );
}
