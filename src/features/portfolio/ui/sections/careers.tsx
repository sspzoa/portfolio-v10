import type { Career } from "@/features/portfolio/model/schemas";
import { TimelineEntry } from "../entries/timeline-entry";

export function CareersContent({ data }: { data: Career[] }) {
  return (
    <ul className="flex flex-col gap-10">
      {data.map((career) => (
        <TimelineEntry
          key={career.id}
          logo={career.logo}
          title={career.organization || career.role}
          subtitle={career.organization ? career.role : null}
          description={career.description}
          start={career.startDate}
          end={career.endDate}
        />
      ))}
    </ul>
  );
}
