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
  url: string | null;
};

export function TimelineEntry({ title, subtitle, description, start, end, logo, url }: TimelineEntryProps) {
  return (
    <li className="entry">
      <div className="entry-heading timeline-heading">
        <div className="entry-identity">
          <BrandImage src={logo} variant="logo" />
          <div>
            <h3 className="entry-title">
              {url ? (
                <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${title} 웹사이트 (새 탭)`}>
                  {title}
                </a>
              ) : (
                title
              )}
            </h3>
            {subtitle && <p className="entry-meta">{subtitle}</p>}
          </div>
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
