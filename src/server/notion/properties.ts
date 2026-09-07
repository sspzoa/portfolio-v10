import type { NotionFile, RichTextSegment } from "./schemas";

export function readPlainText(segments: RichTextSegment[]): string {
  return segments.map((segment) => segment.plain_text).join("");
}

export function readOptionalText(segments: RichTextSegment[]): string | null {
  const text = readPlainText(segments);
  return text.trim() ? text : null;
}

export function readMarkdown(segments: RichTextSegment[]): string | null {
  const text = segments
    .map((segment) => {
      const content = segment.plain_text;
      if (!content.trim()) return content;

      const formatted = segment.annotations?.bold
        ? content
            .split("\n")
            .map((line) => (line.trim() ? `**${line}**` : line))
            .join("\n")
        : content;
      const href = segment.href ?? segment.text?.link?.url;
      return href ? `[${formatted}](${href})` : formatted;
    })
    .join("");

  return text.trim() ? text : null;
}

export function readFileUrl(file: NotionFile | null | undefined): string | null {
  if (!file) return null;
  return file.type === "external" ? file.external.url : file.file.url;
}
