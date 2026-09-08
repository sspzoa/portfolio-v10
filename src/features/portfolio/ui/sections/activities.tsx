import type { Activity } from "@/features/portfolio/model/schemas";
import { formatPeriod } from "@/shared/lib/format-date";
import { RecordEntry } from "../entries/record-entry";

export function ActivitiesContent({ data }: { data: Activity[] }) {
  return (
    <ul className="flex flex-col gap-5">
      {data.map((activity) => (
        <RecordEntry
          key={activity.id}
          title={activity.name}
          subtitle={[activity.role, ...activity.hosts].filter(Boolean).join(" · ")}
          period={formatPeriod(activity.startDate, activity.endDate)}
        />
      ))}
    </ul>
  );
}
