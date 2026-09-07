import { RichText } from "@/shared/ui/rich-text";
import { Period } from "../period";

type TimelineEntryProps = {
  title: string;
  subtitle: string | null;
  description: string | null;
  start: string | null;
  end: string | null;
};

export function TimelineEntry({ title, subtitle, description, start, end }: TimelineEntryProps) {
  return (
    <li className="entry">
      <div className="entry-heading">
        <div>
          <h3 className="entry-title">{title}</h3>
          {subtitle && <p className="entry-meta">{subtitle}</p>}
        </div>
        <Period start={start} end={end} present />
      </div>
      {description && (
        <div className="entry-description">
          <RichText>{description}</RichText>
        </div>
      )}
    </li>
  );
}
