import { Show } from "solid-js";
import { DateLabel, EntryList, EntrySubtitle } from "~/components/entry";
import { safeUrl } from "~/lib/safe-url";

function RecordEntry(props: { title: string; subtitle: string | null; period: string | null; url?: string | null }) {
  return (
    <li class="break-anywhere flex items-baseline justify-between gap-x-4 gap-y-1 max-sm:flex-col print:break-inside-avoid">
      <div class="flex min-w-0 flex-col gap-1">
        <h3 class="entry-title">
          <Show when={safeUrl(props.url)} fallback={props.title}>
            {(url) => (
              <a href={url()} target="_blank" rel="noopener noreferrer" class="group text-ink hover:text-ink">
                {props.title}
                {"\u00a0"}
                <span
                  aria-hidden="true"
                  class="inline-block [transition:transform_var(--duration-fast)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5">
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
    <EntryList items={props.items} spacing="compact">
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
