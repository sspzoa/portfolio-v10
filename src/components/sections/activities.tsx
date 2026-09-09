import { For } from "solid-js";
import { RecordEntry } from "~/components/entries/record-entry";
import { formatPeriod } from "~/lib/format-date";
import type { Activity } from "~/lib/portfolio/schemas";
export function ActivitiesContent(props: { data: Activity[] }) {
  return (
    <ul class="flex flex-col gap-5">
      <For each={props.data}>
        {(activity) => (
          <RecordEntry
            title={activity.name}
            subtitle={[activity.role, ...activity.hosts].filter(Boolean).join(" · ")}
            period={formatPeriod(activity.startDate, activity.endDate)}
          />
        )}
      </For>
    </ul>
  );
}
