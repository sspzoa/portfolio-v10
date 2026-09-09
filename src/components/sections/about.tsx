import { RichText } from "~/components/rich-text";
import type { AboutMe } from "~/lib/portfolio/schemas";
export function AboutContent(props: { data: AboutMe }) {
  return <RichText>{props.data.content}</RichText>;
}
