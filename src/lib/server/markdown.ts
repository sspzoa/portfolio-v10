import "server-only";
import MarkdownIt from "markdown-it";
import type { RenderedHtml } from "~/lib/portfolio/types";
import { safeUrl } from "~/lib/safe-url";

const linkProtocols = ["https:", "http:", "mailto:"];

const markdown = new MarkdownIt("commonmark", { html: false });
markdown.validateLink = () => true;
markdown.renderer.rules.link_open = (tokens, index) => {
  const href = safeUrl(String(tokens[index].attrGet("href") ?? ""), linkProtocols);
  let depth = 1;
  for (let end = index + 1; end < tokens.length; end++) {
    if (tokens[end].type === "link_open") depth++;
    if (tokens[end].type === "link_close" && --depth === 0) {
      tokens[end].meta = { allowed: href !== null };
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

export function renderMarkdown(content: string): RenderedHtml {
  return markdown.render(content.replace(/^([\t ]*)•[\t ]+/gm, "$1- ")) as RenderedHtml;
}
