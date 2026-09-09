import { createMemo, For, Show } from "solid-js";
import { Period } from "~/components/entries";
import { RichText } from "~/components/rich-text";
import type { Project } from "~/lib/portfolio/schemas";

function ProjectEntry(props: { project: Project }) {
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
          <Show when={metadata()}>
            <p class="mt-1 text-caption text-secondary">{metadata()}</p>
          </Show>
        </div>
        <Period start={props.project.startDate} end={props.project.endDate} />
      </div>
      <Show when={props.project.shortDescription}>
        {(text) => (
          <div class="mt-3">
            <RichText>{text()}</RichText>
          </div>
        )}
      </Show>
      <Show when={props.project.tags.length}>
        <div class="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-caption text-muted">
          <For each={props.project.tags}>{(tag) => <span>{tag}</span>}</For>
        </div>
      </Show>
      <Show when={props.project.description}>
        {(text) => (
          <details class="mt-3 [&>div]:border-line [&>div]:border-l [&>div]:pl-4 [&[open]>summary::before]:[transform:translateY(-2px)_rotate(45deg)] [&[open]>summary]:mb-3 [&[open]>summary]:text-ink">
            <summary class="disclosure-summary min-h-9 py-1" aria-label={`${props.project.name} 자세히 보기`}>
              자세히 보기
            </summary>
            <RichText>{text()}</RichText>
          </details>
        )}
      </Show>
    </li>
  );
}

export function ProjectsContent(props: { data: Project[] }) {
  const main = createMemo(() => props.data.filter((item) => !item.isSideProject));
  const side = createMemo(() => props.data.filter((item) => item.isSideProject));
  return (
    <>
      <Show when={main().length}>
        <ul class="flex flex-col gap-10">
          <For each={main()}>{(project) => <ProjectEntry project={project} />}</For>
        </ul>
      </Show>
      <Show when={side().length}>
        <details class="mt-8 border-line border-t pt-5 [&[open]>summary::before]:[transform:translateY(-2px)_rotate(45deg)] [&[open]>summary]:mb-6 [&[open]>summary]:text-ink">
          <summary class="disclosure-summary min-h-10 py-2">
            <span>사이드 프로젝트</span>
            <span class="text-muted tabular-nums">{side().length}개</span>
          </summary>
          <ul class="flex flex-col gap-10">
            <For each={side()}>{(project) => <ProjectEntry project={project} />}</For>
          </ul>
        </details>
      </Show>
    </>
  );
}
