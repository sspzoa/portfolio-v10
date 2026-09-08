import type { Project } from "@/features/portfolio/model/schemas";
import { ProjectEntry } from "../entries/project-entry";

export function ProjectsContent({ data }: { data: Project[] }) {
  const mainProjects = data.filter((project) => !project.isSideProject);
  const sideProjects = data.filter((project) => project.isSideProject);

  return (
    <>
      {mainProjects.length > 0 && (
        <ul className="flex flex-col gap-10">
          {mainProjects.map((project) => (
            <ProjectEntry key={project.id} project={project} />
          ))}
        </ul>
      )}
      {sideProjects.length > 0 && (
        <details
          className="mt-8 border-line border-t pt-5 [&[open]>summary::before]:[transform:translateY(-2px)_rotate(45deg)] [&[open]>summary]:mb-6 [&[open]>summary]:text-ink"
          id="side-projects">
          <summary className="disclosure-summary min-h-10 py-2">
            <span>사이드 프로젝트</span>
            <span className="text-muted tabular-nums">{sideProjects.length}개</span>
          </summary>
          <ul className="flex flex-col gap-10">
            {sideProjects.map((project) => (
              <ProjectEntry key={project.id} project={project} />
            ))}
          </ul>
        </details>
      )}
    </>
  );
}
