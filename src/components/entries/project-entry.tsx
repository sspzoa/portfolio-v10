import { For } from "solid-js";
import { Period } from "~/components/period";
import { RichText } from "~/components/rich-text";
import type { Project } from "~/lib/portfolio/schemas";
export function ProjectEntry(props: { project: Project }) {
  const metadata = () =>
    [
      props.project.isSideProject ? "사이드 프로젝트" : null,
      props.project.teamSize !== null ? `${props.project.teamSize}인 프로젝트` : null,
    ]
      .filter(Boolean)
      .join(" · ");
  return (
    <li class="wrap-anywhere min-w-0 print:break-inside-avoid">
      <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 max-[40rem]:flex-col">
        <div>
          <h3 class="wrap-anywhere break-keep font-bold text-copy text-ink tracking-[-0.01em]">{props.project.name}</h3>
          {metadata() && <p class="mt-1 text-caption text-secondary">{metadata()}</p>}
        </div>
        <Period start={props.project.startDate} end={props.project.endDate} />
      </div>
      {props.project.shortDescription && (
        <div class="mt-3">
          <RichText>{props.project.shortDescription}</RichText>
        </div>
      )}
      {props.project.tags.length > 0 && (
        <div class="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-caption text-muted">
          <For each={props.project.tags}>{(tag) => <span>{tag}</span>}</For>
        </div>
      )}
      {props.project.description && (
        <details class="mt-3 [&>div]:border-line [&>div]:border-l [&>div]:pl-4 [&[open]>summary::before]:[transform:translateY(-2px)_rotate(45deg)] [&[open]>summary]:mb-3 [&[open]>summary]:text-ink">
          <summary class="disclosure-summary min-h-9 py-1" aria-label={`${props.project.name} 자세히 보기`}>
            자세히 보기
          </summary>
          <RichText>{props.project.description}</RichText>
        </details>
      )}
    </li>
  );
}
