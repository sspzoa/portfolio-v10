import { EntryDescription, EntryList, IconEntry, Period } from "~/components/entry";
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
        <IconEntry
          icon={item.logo}
          title={item.organization || props.label(item)}
          subtitle={item.organization ? props.label(item) : null}
          period={<Period start={item.startDate} end={item.endDate} ongoing />}>
          <EntryDescription html={item.description} />
        </IconEntry>
      )}
    </EntryList>
  );
}
