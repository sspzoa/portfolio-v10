import { Show } from "solid-js";
import { EntryIcon } from "~/components/entry-icon";
import { RichText } from "~/components/rich-text";
import { formatPeriod } from "~/lib/format-date";
import type { RenderedHtml } from "~/lib/portfolio/types";
import { safeExternalUrl } from "~/lib/safe-external-url";

function EntrySubtitle(props: { value: string | null }) {
  return (
    <Show when={props.value}>
      <p class="text-caption text-secondary">{props.value}</p>
    </Show>
  );
}

function DateLabel(props: { value: string | null }) {
  return (
    <Show when={props.value}>
      <p class="whitespace-nowrap text-caption text-muted tabular-nums">{props.value}</p>
    </Show>
  );
}

export function Period(props: { start: string | null; end: string | null; ongoing?: boolean }) {
  return <DateLabel value={formatPeriod(props.start, props.end, { present: props.ongoing })} />;
}

export function RecordEntry(props: {
  title: string;
  subtitle: string | null;
  period: string | null;
  url?: string | null;
}) {
  return (
    <li class="wrap-anywhere flex min-w-0 items-baseline justify-between gap-x-4 gap-y-1 max-[40rem]:flex-col print:break-inside-avoid [&>p]:shrink-0">
      <div class="flex min-w-0 flex-col gap-1">
        <h3 class="entry-title">
          <Show when={safeExternalUrl(props.url ?? null)} fallback={props.title}>
            {(url) => (
              <a href={url()} target="_blank" rel="noopener noreferrer" class="group text-ink hover:text-ink">
                {props.title}
                {"\u00a0"}
                <span class="inline-block [transition:transform_var(--duration-fast)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5">
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

export function TimelineEntry(props: {
  title: string;
  subtitle: string | null;
  description: RenderedHtml | null;
  start: string | null;
  end: string | null;
  logo: string | null;
}) {
  return (
    <li class="wrap-anywhere min-w-0 print:break-inside-avoid">
      <div class="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 max-[40rem]:grid-cols-1 max-[40rem]:gap-y-1">
        <div class="flex min-w-0 items-center gap-3 [&>div]:min-w-0">
          <Show when={props.logo}>{(logo) => <EntryIcon src={logo()} />}</Show>
          <div class="flex min-w-0 flex-col gap-1">
            <h3 class="entry-title">{props.title}</h3>
            <EntrySubtitle value={props.subtitle} />
          </div>
        </div>
        <Period start={props.start} end={props.end} ongoing />
      </div>
      <Show when={props.description}>
        {(description) => (
          <div class="mt-3">
            <RichText>{description()}</RichText>
          </div>
        )}
      </Show>
    </li>
  );
}
