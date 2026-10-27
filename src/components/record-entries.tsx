import { Show } from "solid-js";
import { DateLabel, EntryList, EntrySubtitle } from "~/components/entry";
import { safeUrl } from "~/lib/safe-url";

function RecordEntry(props: { title: string; subtitle: string | null; period: string | null; url?: string | null }) {
  return (
    <li class="break-anywhere reveal flex items-baseline justify-between gap-x-6 gap-y-1 border-line border-t py-4 first:border-t-0 first:pt-0 last:pb-0 max-sm:flex-col print:break-inside-avoid">
      <div class="flex min-w-0 flex-col gap-0.5">
        <h3 class="entry-title">
          <Show when={safeUrl(props.url)} fallback={props.title}>
            {(url) => (
              <a
                href={url()}
                target="_blank"
                rel="noopener noreferrer"
                class="group decoration-transparent hover:decoration-accent">
                {props.title}
                {"\u00a0"}
                <span
                  aria-hidden="true"
                  class="inline-block text-muted [transition:transform_var(--duration-fast),color_var(--duration-fast)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5">
                  ↗
                </span>
              </a>
            )}
          </Show>
        </h3>
        <EntrySubtitle value={props.subtitle} />
      </div>
      <DateLabel value={props.period} />
    </li>
  );
}

export function RecordEntries<T extends { name: string }>(props: {
  items: T[];
  subtitle: (item: T) => string | null;
  period: (item: T) => string | null;
  url?: (item: T) => string | null;
}) {
  return (
    <EntryList items={props.items} spacing="ruled">
      {(item) => (
        <RecordEntry
          title={item.name}
          subtitle={props.subtitle(item)}
          period={props.period(item)}
          url={props.url?.(item)}
        />
      )}
    </EntryList>
  );
}
