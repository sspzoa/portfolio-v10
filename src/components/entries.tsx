import { Show } from "solid-js";
import { RichText } from "~/components/rich-text";
import { formatPeriod } from "~/lib/format-date";

export function Period(props: { start: string | null; end: string | null; ongoing?: boolean }) {
  const label = () => formatPeriod(props.start, props.end, { present: props.ongoing });
  return (
    <Show when={label()}>
      <p class="whitespace-nowrap text-caption text-muted tabular-nums">{label()}</p>
    </Show>
  );
}

export function RecordEntry(props: { title: string; subtitle: string | null; period: string | null }) {
  return (
    <li class="wrap-anywhere flex min-w-0 items-baseline justify-between gap-x-4 gap-y-1 max-[40rem]:flex-col print:break-inside-avoid [&>p]:shrink-0">
      <div>
        <h3 class="wrap-anywhere break-keep font-bold text-copy text-ink tracking-[-0.01em]">{props.title}</h3>
        <Show when={props.subtitle}>
          <p class="mt-1 text-caption text-secondary">{props.subtitle}</p>
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
  description: string | null;
  start: string | null;
  end: string | null;
  logo: string | null;
}) {
  return (
    <li class="wrap-anywhere min-w-0 print:break-inside-avoid">
      <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 max-[40rem]:flex-col max-[40rem]:items-start">
        <div class="flex min-w-0 items-center gap-3 [&>div]:min-w-0">
          <Show when={props.logo}>
            {(logo) => (
              <img
                src={logo()}
                alt=""
                width={40}
                height={40}
                loading="lazy"
                decoding="async"
                draggable={false}
                class="block size-10 shrink-0 rounded-ui object-contain p-1"
              />
            )}
          </Show>
          <div>
            <h3 class="wrap-anywhere break-keep font-bold text-copy text-ink tracking-[-0.01em]">{props.title}</h3>
            <Show when={props.subtitle}>
              <p class="mt-1 text-caption text-secondary">{props.subtitle}</p>
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
