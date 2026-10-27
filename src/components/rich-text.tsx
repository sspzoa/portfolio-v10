import type { RenderedHtml } from "~/lib/portfolio/types";

const richTextClass = [
  "break-anywhere break-keep text-secondary [&>*+*]:mt-3",
  "[&_p]:whitespace-pre-line [&_strong]:font-semibold [&_strong]:text-ink",
  "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li+li]:mt-1 [&_li::marker]:text-muted",
  "[&_blockquote]:border-line [&_blockquote]:border-l [&_blockquote]:pl-4",
  "[&_hr]:my-5 [&_hr]:border-line",
  "[&_code]:rounded-ui [&_code]:bg-surface [&_code]:px-1 [&_code]:font-mono [&_code]:text-caption",
  "[&_pre]:overflow-x-auto [&_pre]:rounded-ui [&_pre]:border [&_pre]:border-line [&_pre]:bg-surface [&_pre]:p-4",
  "[&_pre_code]:bg-transparent [&_pre_code]:px-0",
].join(" ");

const leadClass = [
  "[&>p:first-child]:mb-6 [&>p:first-child]:text-lead [&>p:first-child]:text-ink",
  "[&>p:first-child]:tracking-[-0.02em] [&>p:first-child]:[text-wrap:balance]",
].join(" ");

export function RichText(props: { children: RenderedHtml; lead?: boolean }) {
  return <div class={props.lead ? `${richTextClass} ${leadClass}` : richTextClass} innerHTML={props.children} />;
}
