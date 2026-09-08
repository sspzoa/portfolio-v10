import { RichText } from "@/shared/ui/rich-text";
import { BrandImage } from "../brand-image";
import { Period } from "../period";

type TimelineEntryProps = {
  title: string;
  subtitle: string | null;
  description: string | null;
  start: string | null;
  end: string | null;
  logo: string | null;
};

export function TimelineEntry({ title, subtitle, description, start, end, logo }: TimelineEntryProps) {
  return (
    <li className="wrap-anywhere min-w-0 print:break-inside-avoid">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 max-[40rem]:flex-col max-[40rem]:items-start">
        <div className="flex min-w-0 items-center gap-3 [&>div]:min-w-0">
          <BrandImage src={logo} variant="logo" />
          <div>
            <h3 className="wrap-anywhere break-keep font-bold text-copy text-ink tracking-[-0.01em]">{title}</h3>
            {subtitle && <p className="mt-1 text-caption text-secondary">{subtitle}</p>}
          </div>
        </div>
        <Period start={start} end={end} present />
      </div>
      {description && (
        <div className="mt-3">
          <RichText>{description}</RichText>
        </div>
      )}
    </li>
  );
}
