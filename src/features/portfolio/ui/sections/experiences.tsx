import type { Experience } from "@/features/portfolio/model/schemas";
import { TimelineEntry } from "../entries/timeline-entry";

export function ExperiencesContent({ data }: { data: Experience[] }) {
  return (
    <ul className="flex flex-col gap-10">
      {data.map((experience) => (
        <TimelineEntry
          key={experience.id}
          logo={null}
          title={experience.organization || experience.role}
          subtitle={experience.organization ? experience.role : null}
          description={experience.description}
          start={experience.startDate}
          end={experience.endDate}
        />
      ))}
    </ul>
  );
}
