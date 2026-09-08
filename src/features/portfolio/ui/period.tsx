import { formatPeriod } from "@/shared/lib/format-date";

type PeriodProps = {
  start: string | null;
  end: string | null;
  present?: boolean;
};

export function Period({ start, end, present = false }: PeriodProps) {
  const period = formatPeriod(start, end, { present });
  return period ? <p className="whitespace-nowrap text-caption text-muted tabular-nums">{period}</p> : null;
}
