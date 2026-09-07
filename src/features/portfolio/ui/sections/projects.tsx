import type { Project } from "@/features/portfolio/model/schemas";
import { ProjectEntry } from "../entries/project-entry";

export function ProjectsContent({ data }: { data: Project[] }) {
  const mainProjects = data.filter((project) => !project.isSideProject);
  const sideProjects = data.filter((project) => project.isSideProject);

  return (
    <>
      {mainProjects.length > 0 && (
        <ul className="entry-list">
          {mainProjects.map((project) => (
            <ProjectEntry key={project.id} project={project} />
          ))}
        </ul>
      )}
      {sideProjects.length > 0 && (
        <details className="side-projects" id="side-projects">
          <summary className="side-projects-summary">
            <span>사이드 프로젝트</span>
            <span className="side-projects-count">{sideProjects.length}개</span>
          </summary>
          <ul className="entry-list">
            {sideProjects.map((project) => (
              <ProjectEntry key={project.id} project={project} />
            ))}
          </ul>
        </details>
      )}
    </>
  );
}
