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
  a: ({ children, href }) => (href ? <a href={href}>{children}</a> : children),
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
    <div className="rich-text">
      <Markdown components={markdownComponents} urlTransform={safeHref}>
        {markdown}
      </Markdown>
    </div>
  );
}
