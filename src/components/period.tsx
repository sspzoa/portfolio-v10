import { formatPeriod } from "~/lib/format-date";

type PeriodProps = {
  start: string | null;
  end: string | null;
  present?: boolean;
};
export function Period(props: PeriodProps) {
  const period = () =>
    formatPeriod(props.start, props.end, {
      present: props.present ?? false,
    });
  return period() ? <p class="whitespace-nowrap text-caption text-muted tabular-nums">{period()}</p> : null;
}
