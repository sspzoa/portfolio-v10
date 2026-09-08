type RecordEntryProps = {
  title: string;
  subtitle: string | null;
  period: string | null;
};

export function RecordEntry({ title, subtitle, period }: RecordEntryProps) {
  return (
    <li className="wrap-anywhere flex min-w-0 items-baseline justify-between gap-x-4 gap-y-1 max-[40rem]:flex-col print:break-inside-avoid [&>p]:shrink-0">
      <div>
        <h3 className="wrap-anywhere break-keep font-bold text-copy text-ink tracking-[-0.01em]">{title}</h3>
        {subtitle && <p className="mt-1 text-caption text-secondary">{subtitle}</p>}
      </div>
      {period && <p className="whitespace-nowrap text-caption text-muted tabular-nums">{period}</p>}
    </li>
  );
}
