import { createMemo, For, Show } from "solid-js";
import { EntryDescription, EntryList, IconEntry, Period } from "~/components/entry";
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
    <IconEntry
      icon={props.project.iconImage}
      title={props.project.name}
      subtitle={metadata()}
      period={<Period start={props.project.startDate} end={props.project.endDate} />}>
      <EntryDescription html={props.project.shortDescription} />
      <Show when={props.project.tags.length}>
        <ul role="list" class="mt-3 flex flex-wrap gap-1.5">
          <For each={props.project.tags}>
            {(tag) => (
              <li class="rounded-ui border border-line px-2 text-caption text-secondary leading-6 tracking-normal">
                {tag}
              </li>
            )}
          </For>
        </ul>
      </Show>
      <Show when={props.project.description || props.project.coverImage}>
        <details class="disclosure mt-3 [&[open]>summary]:mb-4">
          <summary
            class="disclosure-summary min-h-9 w-fit py-1 text-caption"
            aria-label={`${props.project.name} 자세히 보기`}>
            자세히 보기
          </summary>
          <div class="flex flex-col gap-5 border-line border-l pl-5">
            <Show when={props.project.description}>{(text) => <RichText>{text()}</RichText>}</Show>
            <Show when={props.project.coverImage}>
              {(cover) => (
                <img
                  src={cover()}
                  alt={`${props.project.name} 커버 이미지`}
                  loading="lazy"
                  decoding="async"
                  class="rounded-tile border border-line"
                />
              )}
            </Show>
          </div>
        </details>
      </Show>
    </IconEntry>
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
        <GroupDisclosure label="사이드 프로젝트" count={side().length} class="mt-12 max-sm:mt-10">
          <ProjectList items={side()} />
        </GroupDisclosure>
      </Show>
    </>
  );
}
