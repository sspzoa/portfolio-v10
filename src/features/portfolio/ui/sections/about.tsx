import type { AboutMe } from "@/features/portfolio/model/schemas";
import { RichText } from "@/shared/ui/rich-text";

export function AboutContent({ data }: { data: AboutMe }) {
  return <RichText>{data.content}</RichText>;
}
