import { Show } from "solid-js";
import { RichText } from "~/components/rich-text";
import { formatPeriod } from "~/lib/format-date";
import type { RenderedHtml } from "~/lib/portfolio/types";
import { safeExternalUrl } from "~/lib/safe-external-url";

export function Period(props: { start: string | null; end: string | null; ongoing?: boolean }) {
  const label = () => formatPeriod(props.start, props.end, { present: props.ongoing });
  return (
    <Show when={label()}>
      <p class="whitespace-nowrap text-caption text-muted tabular-nums">{label()}</p>
    </Show>
  );
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
              <a href={url()} target="_blank" rel="noopener noreferrer" class="text-ink hover:text-ink">
                {props.title} ↗
              </a>
            )}
          </Show>
        </h3>
        <Show when={props.subtitle}>
          <p class="text-caption text-secondary">{props.subtitle}</p>
        </Show>
      </div>
      <Show when={props.period}>
        <p class="whitespace-nowrap text-caption text-muted tabular-nums">{props.period}</p>
      </Show>
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
      <div class="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4">
        <div class="flex min-w-0 items-center gap-3 [&>div]:min-w-0">
          <Show when={props.logo}>
            {(logo) => (
              <div class="media-tile size-10 p-1">
                <img
                  src={logo()}
                  alt=""
                  width={30}
                  height={30}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  class="size-full rounded-ui object-contain"
                />
              </div>
            )}
          </Show>
          <div class="flex min-w-0 flex-col gap-1">
            <h3 class="entry-title">{props.title}</h3>
            <Show when={props.subtitle}>
              <p class="text-caption text-secondary">{props.subtitle}</p>
            </Show>
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
