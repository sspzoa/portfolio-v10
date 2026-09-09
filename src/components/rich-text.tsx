import { renderMarkdown } from "~/lib/markdown";

export function RichText(props: { children: string }) {
  return (
    <div
      class="wrap-anywhere break-keep text-secondary [&>*+*]:mt-3 [&_blockquote]:border-line [&_blockquote]:border-l [&_blockquote]:pl-4 [&_code]:font-mono [&_code]:text-caption [&_hr]:my-5 [&_hr]:border-0 [&_hr]:border-line [&_hr]:border-t [&_li+li]:mt-1 [&_li::marker]:text-muted [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:whitespace-pre-line [&_pre]:overflow-x-auto [&_pre]:whitespace-pre [&_pre]:bg-surface [&_pre]:p-4 [&_strong]:font-bold [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pl-5"
      innerHTML={renderMarkdown(props.children)}
    />
  );
}
