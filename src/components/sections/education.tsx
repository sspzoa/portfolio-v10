import { For } from "solid-js";
import { TimelineEntry } from "~/components/entries/timeline-entry";
import type { Education } from "~/lib/portfolio/schemas";
export function EducationContent(props: { data: Education[] }) {
  return (
    <ul class="flex flex-col gap-10">
      <For each={props.data}>
        {(education) => (
          <TimelineEntry
            logo={education.logo}
            title={education.organization || education.department}
            subtitle={education.organization ? education.department : null}
            description={education.description}
            start={education.startDate}
            end={education.endDate}
          />
        )}
      </For>
    </ul>
  );
}
