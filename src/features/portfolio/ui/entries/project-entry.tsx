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
    <li className="wrap-anywhere min-w-0 print:break-inside-avoid">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 max-[40rem]:flex-col">
        <div>
          <h3 className="wrap-anywhere break-keep font-bold text-copy text-ink tracking-[-0.01em]">{project.name}</h3>
          {metadata && <p className="mt-1 text-caption text-secondary">{metadata}</p>}
        </div>
        <Period start={project.startDate} end={project.endDate} />
      </div>
      {project.shortDescription && (
        <div className="mt-3">
          <RichText>{project.shortDescription}</RichText>
        </div>
      )}
      {project.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-caption text-muted">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      )}
      {project.description && (
        <details className="mt-3 [&>div]:border-line [&>div]:border-l [&>div]:pl-4 [&[open]>summary::before]:[transform:translateY(-2px)_rotate(45deg)] [&[open]>summary]:mb-3 [&[open]>summary]:text-ink">
          <summary className="disclosure-summary min-h-9 py-1" aria-label={`${project.name} 자세히 보기`}>
            자세히 보기
          </summary>
          <RichText>{project.description}</RichText>
        </details>
      )}
    </li>
  );
}
