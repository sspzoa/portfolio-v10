import type { Experience } from "@/features/portfolio/model/schemas";
import { TimelineEntry } from "../entries/timeline-entry";

export function ExperiencesContent({ data }: { data: Experience[] }) {
  return (
    <ul className="entry-list">
      {data.map((experience) => (
        <TimelineEntry
          key={experience.id}
          title={experience.role}
          subtitle={experience.organization}
          description={experience.description}
          start={experience.startDate}
          end={experience.endDate}
        />
      ))}
    </ul>
  );
}
