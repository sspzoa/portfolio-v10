import type { Award } from "@/features/portfolio/model/schemas";
import { RecordEntry } from "../entries/record-entry";

export function AwardsContent({ data }: { data: Award[] }) {
  return (
    <ul className="flex flex-col gap-5">
      {data.map((award) => (
        <RecordEntry key={award.id} title={award.name} subtitle={award.tier} period={award.date} />
      ))}
    </ul>
  );
}
