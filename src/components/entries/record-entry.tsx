type RecordEntryProps = {
  title: string;
  subtitle: string | null;
  period: string | null;
};
export function RecordEntry(props: RecordEntryProps) {
  return (
    <li class="wrap-anywhere flex min-w-0 items-baseline justify-between gap-x-4 gap-y-1 max-[40rem]:flex-col print:break-inside-avoid [&>p]:shrink-0">
      <div>
        <h3 class="wrap-anywhere break-keep font-bold text-copy text-ink tracking-[-0.01em]">{props.title}</h3>
        {props.subtitle && <p class="mt-1 text-caption text-secondary">{props.subtitle}</p>}
      </div>
      {props.period && <p class="whitespace-nowrap text-caption text-muted tabular-nums">{props.period}</p>}
    </li>
  );
}
