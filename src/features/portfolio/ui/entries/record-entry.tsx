type RecordEntryProps = {
  title: string;
  subtitle: string | null;
  period: string | null;
};

export function RecordEntry({ title, subtitle, period }: RecordEntryProps) {
  return (
    <li className="record">
      <div>
        <h3 className="entry-title">{title}</h3>
        {subtitle && <p className="entry-meta">{subtitle}</p>}
      </div>
      {period && <p className="entry-period">{period}</p>}
    </li>
  );
}
