import type { NotionFile, RichTextSegment } from "~/lib/server/notion/schemas";

export function readPlainText(segments: RichTextSegment[]): string {
  return segments.map((segment) => segment.plain_text).join("");
}

export function readOptionalText(segments: RichTextSegment[]): string | null {
  const text = readPlainText(segments);
  return text.trim() ? text : null;
}

function emphasize(text: string): string {
  return text
    .split("\n")
    .map((line) => (line.trim() ? line.replace(/^(\s*)(.*?)(\s*)$/s, "$1**$2**$3") : line))
    .join("\n");
}

export function readMarkdown(segments: RichTextSegment[]): string | null {
  const text = segments
    .map((segment) => {
      const content = segment.plain_text;
      if (!content.trim()) return content;

      const formatted = segment.annotations?.bold ? emphasize(content) : content;
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
