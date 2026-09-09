import { For } from "solid-js";
import { TimelineEntry } from "~/components/entries/timeline-entry";
import type { Experience } from "~/lib/portfolio/schemas";
export function ExperiencesContent(props: { data: Experience[] }) {
  return (
    <ul class="flex flex-col gap-10">
      <For each={props.data}>
        {(experience) => (
          <TimelineEntry
            logo={null}
            title={experience.organization || experience.role}
            subtitle={experience.organization ? experience.role : null}
            description={experience.description}
            start={experience.startDate}
            end={experience.endDate}
          />
        )}
      </For>
    </ul>
  );
}
