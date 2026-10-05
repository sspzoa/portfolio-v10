import { createMemo, For, Show } from "solid-js";
import { EntryDescription, EntryHeading, EntryList, Period } from "~/components/entry";
import { GroupDisclosure } from "~/components/group-disclosure";
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
    <li class="break-anywhere print:break-inside-avoid">
      <div class="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 max-sm:flex-col">
        <EntryHeading icon={props.project.iconImage} title={props.project.name} subtitle={metadata()} />
        <Period start={props.project.startDate} end={props.project.endDate} />
      </div>
      <EntryDescription html={props.project.shortDescription} />
      <Show when={props.project.tags.length}>
        <ul role="list" class="mt-3 flex flex-wrap gap-2">
          <For each={props.project.tags}>
            {(tag) => <li class="rounded-ui border border-line px-2 py-0.5 text-caption text-muted">{tag}</li>}
          </For>
        </ul>
      </Show>
      <Show when={props.project.description || props.project.coverImage}>
        <details class="disclosure mt-3 [&[open]>summary]:mb-3">
          <summary class="disclosure-summary min-h-9 py-1" aria-label={`${props.project.name} 자세히 보기`}>
            자세히 보기
          </summary>
          <div class="before:node relative border-line border-l pl-4 before:absolute before:top-0 before:left-[-4px] before:content-empty">
            <Show when={props.project.description}>{(text) => <RichText>{text()}</RichText>}</Show>
            <Show when={props.project.coverImage}>
              {(cover) => (
                <img
                  src={cover()}
                  alt={`${props.project.name} 커버 이미지`}
                  loading="lazy"
                  decoding="async"
                  class="mt-4 rounded-ui border border-line"
                />
              )}
            </Show>
          </div>
        </details>
      </Show>
    </li>
  );
}

function ProjectList(props: { items: RenderedProject[] }) {
  return (
    <EntryList items={props.items} spacing="wide">
      {(project) => <ProjectEntry project={project} />}
    </EntryList>
  );
}

export function ProjectsContent(props: { items: RenderedProject[] }) {
  const main = createMemo(() => props.items.filter((item) => !item.isSideProject));
  const side = createMemo(() => props.items.filter((item) => item.isSideProject));
  return (
    <>
      <Show when={main().length}>
        <ProjectList items={main()} />
      </Show>
      <Show when={side().length}>
        <GroupDisclosure label="사이드 프로젝트" count={side().length}>
          <ProjectList items={side()} />
        </GroupDisclosure>
      </Show>
    </>
  );
}
