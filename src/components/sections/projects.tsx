import { For } from "solid-js";
import { ProjectEntry } from "~/components/entries/project-entry";
import type { Project } from "~/lib/portfolio/schemas";
export function ProjectsContent(props: { data: Project[] }) {
  const mainProjects = () => props.data.filter((project) => !project.isSideProject);
  const sideProjects = () => props.data.filter((project) => project.isSideProject);
  return (
    <>
      {mainProjects().length > 0 && (
        <ul class="flex flex-col gap-10">
          <For each={mainProjects()}>{(project) => <ProjectEntry project={project} />}</For>
        </ul>
      )}
      {sideProjects().length > 0 && (
        <details
          class="mt-8 border-line border-t pt-5 [&[open]>summary::before]:[transform:translateY(-2px)_rotate(45deg)] [&[open]>summary]:mb-6 [&[open]>summary]:text-ink"
          id="side-projects">
          <summary class="disclosure-summary min-h-10 py-2">
            <span>사이드 프로젝트</span>
            <span class="text-muted tabular-nums">{sideProjects().length}개</span>
          </summary>
          <ul class="flex flex-col gap-10">
            <For each={sideProjects()}>{(project) => <ProjectEntry project={project} />}</For>
          </ul>
        </details>
      )}
    </>
  );
}
