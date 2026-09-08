import Markdown, { type Components } from "react-markdown";

function safeHref(value: string): string | undefined {
  try {
    const url = new URL(value.trim());
    return ["https:", "http:", "mailto:"].includes(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
}

const markdownComponents: Components = {
  a: ({ children, href }) =>
    href ? (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      children
    ),
  img: ({ alt }) => alt ?? null,
  h1: "p",
  h2: "p",
  h3: "p",
  h4: "p",
  h5: "p",
  h6: "p",
};

export function RichText({ children }: { children: string }) {
  const markdown = children.replace(/\r\n?/g, "\n").replace(/^([\t ]*)•[\t ]+/gm, "$1- ");

  return (
    <div className="wrap-anywhere break-keep text-secondary [&>*+*]:mt-3 [&_a]:decoration-current [&_blockquote]:border-line [&_blockquote]:border-l [&_blockquote]:pl-4 [&_code]:font-mono [&_code]:text-caption [&_hr]:my-5 [&_hr]:border-0 [&_hr]:border-line [&_hr]:border-t [&_li+li]:mt-1 [&_li::marker]:text-muted [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:whitespace-pre-line [&_pre]:overflow-x-auto [&_pre]:whitespace-pre [&_pre]:bg-surface [&_pre]:p-4 [&_strong]:font-bold [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pl-5">
      <Markdown components={markdownComponents} urlTransform={safeHref}>
        {markdown}
      </Markdown>
    </div>
  );
}
