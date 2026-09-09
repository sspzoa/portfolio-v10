import MarkdownIt from "markdown-it";

export function safeHref(value: string): string | undefined {
  try {
    const url = new URL(value.trim());
    return ["https:", "http:", "mailto:"].includes(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
}

const markdown = new MarkdownIt("commonmark", { html: false });
markdown.validateLink = () => true;
markdown.renderer.rules.link_open = (tokens, index) => {
  const token = tokens[index];
  const href = safeHref(String(token.attrGet("href") ?? ""));
  let depth = 1;
  for (let end = index + 1; end < tokens.length; end++) {
    if (tokens[end].type === "link_open") depth++;
    if (tokens[end].type === "link_close" && --depth === 0) {
      tokens[end].meta = { allowed: Boolean(href) };
      break;
    }
  }
  return href ? `<a href="${markdown.utils.escapeHtml(href)}" target="_blank" rel="noopener noreferrer">` : "";
};
markdown.renderer.rules.link_close = (tokens, index) => (tokens[index].meta?.allowed ? "</a>" : "");
markdown.renderer.rules.image = (tokens, index, options, env, renderer) =>
  markdown.utils.escapeHtml(renderer.renderInlineAsText(tokens[index].children ?? [], options, env));
markdown.renderer.rules.heading_open = () => "<p>";
markdown.renderer.rules.heading_close = () => "</p>\n";

export function renderMarkdown(content: string): string {
  return markdown.render(content.replace(/\r\n?/g, "\n").replace(/^([\t ]*)•[\t ]+/gm, "$1- "));
}
