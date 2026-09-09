import { BrandImage } from "~/components/brand-image";
import { Period } from "~/components/period";
import { RichText } from "~/components/rich-text";

type TimelineEntryProps = {
  title: string;
  subtitle: string | null;
  description: string | null;
  start: string | null;
  end: string | null;
  logo: string | null;
};
export function TimelineEntry(props: TimelineEntryProps) {
  return (
    <li class="wrap-anywhere min-w-0 print:break-inside-avoid">
      <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 max-[40rem]:flex-col max-[40rem]:items-start">
        <div class="flex min-w-0 items-center gap-3 [&>div]:min-w-0">
          <BrandImage src={props.logo} variant="logo" />
          <div>
            <h3 class="wrap-anywhere break-keep font-bold text-copy text-ink tracking-[-0.01em]">{props.title}</h3>
            {props.subtitle && <p class="mt-1 text-caption text-secondary">{props.subtitle}</p>}
          </div>
        </div>
        <Period start={props.start} end={props.end} present />
      </div>
      {props.description && (
        <div class="mt-3">
          <RichText>{props.description}</RichText>
        </div>
      )}
    </li>
  );
}
