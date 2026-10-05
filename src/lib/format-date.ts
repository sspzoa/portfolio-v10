export function formatDate(value: string | null | undefined): string | null {
  if (!value) return null;
  const match = value.match(/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])(?:T.*)?$/);
  return match ? `${match[1]}.${match[2]}` : null;
}

export function formatPeriod(
  start: string | null,
  end: string | null,
  { ongoing = false }: { ongoing?: boolean } = {},
): string | null {
  if (!start) return end;
  if (start === end) return start;
  if (end) return `${start} – ${end}`;
  return ongoing ? `${start} – 현재` : start;
}
