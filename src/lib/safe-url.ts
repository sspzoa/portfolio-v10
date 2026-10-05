export function safeUrl(value: string | null | undefined, protocols = ["https:", "http:"]): string | null {
  if (!value) return null;

  try {
    const url = new URL(value.trim());
    return protocols.includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}
