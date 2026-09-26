import { createMemo, For, Show } from "solid-js";
import { Period } from "~/components/entries";
import { RichText } from "~/components/rich-text";
import type { RenderedProject } from "~/lib/portfolio/types";

function ProjectEntry(props: { project: RenderedProject }) {
  const metadata = () =>
    [
      props.project.isSideProject ? "사이드 프로젝트" : null,
      props.project.teamSize !== null ? `${props.project.teamSize}인 프로젝트` : null,
    ]
      .filter(Boolean)
      .join(" · ");
  return (
    <li class="wrap-anywhere min-w-0 print:break-inside-avoid">
      <div class="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 max-[40rem]:flex-col">
        <div class="flex min-w-0 items-center gap-3">
          <Show when={props.project.iconImage}>
            {(icon) => (
              <img
                src={icon()}
                alt=""
                width={40}
                height={40}
                loading="lazy"
                decoding="async"
                draggable={false}
                class="block size-10 shrink-0 rounded-ui object-contain p-1"
              />
            )}
          </Show>
          <div class="min-w-0">
            <h3 class="wrap-anywhere break-keep font-bold text-copy text-ink tracking-[-0.01em]">
              {props.project.name}
            </h3>
            <Show when={metadata()}>
              <p class="mt-1 text-caption text-secondary">{metadata()}</p>
            </Show>
          </div>
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
      <Show when={props.project.description || props.project.coverImage}>
        <details class="mt-3 [&[open]>summary::before]:[transform:translateY(-2px)_rotate(45deg)] [&[open]>summary]:mb-3 [&[open]>summary]:text-ink">
          <summary class="disclosure-summary min-h-9 py-1" aria-label={`${props.project.name} 자세히 보기`}>
            자세히 보기
          </summary>
          <div class="border-line border-l pl-4">
            <Show when={props.project.description}>{(text) => <RichText>{text()}</RichText>}</Show>
            <Show when={props.project.coverImage}>
              {(cover) => (
                <img
                  src={cover()}
                  alt={`${props.project.name} 커버 이미지`}
                  loading="lazy"
                  decoding="async"
                  class="mt-4 block h-auto max-w-full rounded-ui"
                />
              )}
            </Show>
          </div>
        </details>
      </Show>
    </li>
  );
}

export function ProjectsContent(props: { data: RenderedProject[] }) {
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
