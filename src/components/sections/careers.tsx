import { For } from "solid-js";
import { TimelineEntry } from "~/components/entries/timeline-entry";
import type { Career } from "~/lib/portfolio/schemas";
export function CareersContent(props: { data: Career[] }) {
  return (
    <ul class="flex flex-col gap-10">
      <For each={props.data}>
        {(career) => (
          <TimelineEntry
            logo={career.logo}
            title={career.organization || career.role}
            subtitle={career.organization ? career.role : null}
            description={career.description}
            start={career.startDate}
            end={career.endDate}
          />
        )}
      </For>
    </ul>
  );
}
