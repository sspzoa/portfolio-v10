import type { Project } from "@/features/portfolio/model/schemas";
import { RichText } from "@/shared/ui/rich-text";
import { Period } from "../period";

export function ProjectEntry({ project }: { project: Project }) {
  const metadata = [
    project.isSideProject ? "사이드 프로젝트" : null,
    project.teamSize !== null ? `${project.teamSize}인 프로젝트` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <li className="entry">
      <div className="entry-heading">
        <div>
          <h3 className="entry-title">{project.name}</h3>
          {metadata && <p className="entry-meta">{metadata}</p>}
        </div>
        <Period start={project.startDate} end={project.endDate} />
      </div>
      {project.shortDescription && (
        <div className="entry-description">
          <RichText>{project.shortDescription}</RichText>
        </div>
      )}
      {project.tags.length > 0 && (
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      )}
      {project.description && (
        <details className="project-details">
          <summary className="project-summary" aria-label={`${project.name} 자세히 보기`}>
            자세히 보기
          </summary>
          <RichText>{project.description}</RichText>
        </details>
      )}
    </li>
  );
}
