import { EntryDescription, EntryHeading, EntryList, Period } from "~/components/entry";
import type { RenderedHtml } from "~/lib/portfolio/types";

interface TimelineItem {
  organization: string | null;
  description: RenderedHtml | null;
  startDate: string | null;
  endDate: string | null;
  logo: string | null;
}

export function TimelineEntries<T extends TimelineItem>(props: { items: T[]; label: (item: T) => string }) {
  return (
    <EntryList items={props.items} spacing="wide">
      {(item) => (
        <li class="break-anywhere print:break-inside-avoid">
          <div class="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 max-sm:grid-cols-1 max-sm:gap-y-1">
            <EntryHeading
              icon={item.logo}
              title={item.organization || props.label(item)}
              subtitle={item.organization ? props.label(item) : null}
            />
            <Period start={item.startDate} end={item.endDate} ongoing />
          </div>
          <EntryDescription html={item.description} />
        </li>
      )}
    </EntryList>
  );
}
