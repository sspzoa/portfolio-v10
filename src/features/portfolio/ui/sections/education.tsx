import type { Education } from "@/features/portfolio/model/schemas";
import { TimelineEntry } from "../entries/timeline-entry";

export function EducationContent({ data }: { data: Education[] }) {
  return (
    <ul className="entry-list">
      {data.map((education) => (
        <TimelineEntry
          key={education.id}
          logo={education.logo}
          title={education.organization || education.department}
          subtitle={education.organization ? education.department : null}
          description={education.description}
          start={education.startDate}
          end={education.endDate}
        />
      ))}
    </ul>
  );
}
