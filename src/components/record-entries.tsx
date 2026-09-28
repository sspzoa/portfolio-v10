import { RecordEntry } from "~/components/entries";
import { EntryList } from "~/components/entry-list";

export function RecordEntries<T extends { name: string }>(props: {
  items: T[];
  subtitle: (item: T) => string | null;
  period: (item: T) => string | null;
  url?: (item: T) => string | null;
}) {
  return (
    <EntryList items={props.items} spacing="compact">
      {(item) => (
        <RecordEntry
          title={item.name}
          subtitle={props.subtitle(item)}
          period={props.period(item)}
          url={props.url?.(item)}
        />
      )}
    </EntryList>
  );
}
