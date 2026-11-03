import { createMemo, For, Show } from "solid-js";
import { DetailDialog } from "~/components/detail-dialog";
import { EntryIcon } from "~/components/entry";
import { GroupDisclosure } from "~/components/group-disclosure";
import { RichText } from "~/components/rich-text";
import { formatPeriod } from "~/lib/format-date";
import type { RenderedProject } from "~/lib/portfolio/types";

function projectMetadata(project: RenderedProject) {
  return [
    formatPeriod(project.startDate, project.endDate),
    project.teamSize !== null ? `${project.teamSize}인 프로젝트` : null,
  ]
    .filter(Boolean)
    .join(" · ");
}

function ProjectTags(props: { tags: string[] }) {
  return (
    <Show when={props.tags.length}>
      <ul role="list" class="flex flex-wrap gap-1.5">
        <For each={props.tags}>
          {(tag) => (
            <li
              title={tag}
              class="max-w-full truncate rounded-ui border border-line px-2 text-caption text-secondary leading-6 tracking-normal">
              {tag}
            </li>
          )}
        </For>
      </ul>
    </Show>
  );
}

function ProjectDialog(props: {
  project: RenderedProject;
  id: string;
  ref: HTMLDialogElement | ((element: HTMLDialogElement) => void);
}) {
  return (
    <DetailDialog
      ref={props.ref}
      id={props.id}
      title={props.project.name}
      metadata={projectMetadata(props.project)}
      icon={props.project.iconImage}>
      <Show when={props.project.coverImage}>
        {(cover) => (
          <img
            src={cover()}
            alt={`${props.project.name} 커버 이미지`}
            loading="lazy"
            decoding="async"
            class="aspect-video w-full rounded-tile border border-line bg-surface object-cover"
          />
        )}
      </Show>
      <Show when={props.project.shortDescription || props.project.tags.length}>
        <div class="flex flex-col gap-3">
          <Show when={props.project.shortDescription}>{(html) => <RichText>{html()}</RichText>}</Show>
          <ProjectTags tags={props.project.tags} />
        </div>
      </Show>
      <Show when={props.project.description}>
        {(html) => (
          <div class="border-line border-t pt-6">
            <RichText>{html()}</RichText>
          </div>
        )}
      </Show>
    </DetailDialog>
  );
}

function ProjectCard(props: { project: RenderedProject }) {
  let dialog!: HTMLDialogElement;
  const id = () => `project-${props.project.id}`;
  return (
    <li class="group reveal relative print:break-inside-avoid [&:first-child:nth-last-child(odd)]:col-span-full">
      <div class="aspect-video overflow-hidden rounded-tile border border-line bg-surface">
        <Show
          when={props.project.coverImage}
          fallback={
            <div
              aria-hidden="true"
              class="grid size-full select-none place-items-center px-6 text-center font-semibold text-muted text-section">
              {props.project.name}
            </div>
          }>
          {(cover) => (
            <img
              src={cover()}
              alt=""
              loading="lazy"
              decoding="async"
              draggable={false}
              class="size-full object-cover motion-safe:group-hover:scale-[1.03] motion-safe:[transition:transform_var(--duration-slow)_var(--ease-out)]"
            />
          )}
        </Show>
      </div>
      <button
        type="button"
        commandfor={`${id()}-dialog`}
        command="show-modal"
        onClick={() => {
          if (!dialog.open) dialog.showModal();
        }}
        aria-label={props.project.name}
        aria-describedby={`${id()}-meta ${id()}-summary`}
        aria-haspopup="dialog"
        class="peer absolute inset-0 cursor-pointer rounded-tile focus-visible:rounded-tile print:hidden"
      />
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-px flex flex-col gap-3 rounded-[calc(var(--radius-tile)-1px)] bg-[color-mix(in_srgb,var(--canvas)_85%,transparent)] p-5 opacity-0 backdrop-blur-md [transition:opacity_var(--duration-base)_var(--ease-out)] group-hover:opacity-100 peer-focus-visible:opacity-100 max-sm:p-4 sm:group-[:first-child:nth-last-child(odd)]:justify-end print:static print:mt-3 print:rounded-none print:bg-transparent print:p-0 print:opacity-100 print:backdrop-blur-none">
        <div class="flex items-center gap-3">
          <EntryIcon src={props.project.iconImage} label={props.project.name} />
          <div class="flex min-w-0 flex-col gap-0.5">
            <p class="entry-title">{props.project.name}</p>
            <p id={`${id()}-meta`} class="text-caption text-secondary">
              {projectMetadata(props.project)}
            </p>
          </div>
        </div>
        <Show when={props.project.shortDescription}>
          {(html) => (
            <div id={`${id()}-summary`}>
              <RichText>{html()}</RichText>
            </div>
          )}
        </Show>
      </div>
      <ProjectDialog project={props.project} id={`${id()}-dialog`} ref={dialog} />
    </li>
  );
}

function ProjectGallery(props: { items: RenderedProject[] }) {
  return (
    <ul role="list" class="grid grid-cols-2 gap-6 max-sm:grid-cols-1 max-sm:gap-4">
      <For each={props.items}>{(project) => <ProjectCard project={project} />}</For>
    </ul>
  );
}

export function ProjectsContent(props: { items: RenderedProject[] }) {
  const main = createMemo(() => props.items.filter((item) => !item.isSideProject));
  const side = createMemo(() => props.items.filter((item) => item.isSideProject));
  return (
    <>
      <Show when={main().length}>
        <ProjectGallery items={main()} />
      </Show>
      <Show when={side().length}>
        <GroupDisclosure label="사이드 프로젝트" count={side().length} class="mt-12 max-sm:mt-10">
          <ProjectGallery items={side()} />
        </GroupDisclosure>
      </Show>
    </>
  );
}
