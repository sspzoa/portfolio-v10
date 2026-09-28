import { TimelineEntry } from "~/components/entries";
import { EntryList } from "~/components/entry-list";
import type { RenderedHtml } from "~/lib/portfolio/types";

type TimelineItem = {
  description: RenderedHtml | null;
  startDate: string | null;
  endDate: string | null;
  logo: string | null;
};

export function TimelineEntries<T extends TimelineItem>(props: {
  items: T[];
  title: (item: T) => string;
  subtitle: (item: T) => string | null;
}) {
  return (
    <EntryList items={props.items} spacing="wide">
      {(item) => (
        <TimelineEntry
          title={props.title(item)}
          subtitle={props.subtitle(item)}
          description={item.description}
          start={item.startDate}
          end={item.endDate}
          logo={item.logo}
        />
      )}
    </EntryList>
  );
}
