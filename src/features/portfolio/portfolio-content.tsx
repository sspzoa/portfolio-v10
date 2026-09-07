import "server-only";
import { type ComponentType, Suspense } from "react";
import { getSectionErrorMessage } from "@/features/portfolio/server/errors";
import {
  fetchAboutMe,
  fetchActivities,
  fetchAwards,
  fetchCareers,
  fetchCertificates,
  fetchEducations,
  fetchExperiences,
  fetchProjects,
  fetchSkills,
} from "@/features/portfolio/server/repository";
import { Section, type SectionIdentity, SectionLoading } from "@/features/portfolio/ui/section";
import { AboutContent } from "@/features/portfolio/ui/sections/about";
import { ActivitiesContent } from "@/features/portfolio/ui/sections/activities";
import { AwardsContent } from "@/features/portfolio/ui/sections/awards";
import { CareersContent } from "@/features/portfolio/ui/sections/careers";
import { CertificatesContent } from "@/features/portfolio/ui/sections/certificates";
import { EducationContent } from "@/features/portfolio/ui/sections/education";
import { ExperiencesContent } from "@/features/portfolio/ui/sections/experiences";
import { ProjectsContent } from "@/features/portfolio/ui/sections/projects";
import { SkillsContent } from "@/features/portfolio/ui/sections/skills";

interface DataSectionProps<T> extends SectionIdentity {
  load: () => Promise<T | null>;
  Content: ComponentType<{ data: T }>;
}

async function DataSection<T>({ id, title, load, Content }: DataSectionProps<T>) {
  let data: T | null;

  try {
    data = await load();
  } catch (error) {
    console.error(`[Portfolio:${id}]`, error instanceof Error ? error.name : "UnknownError");
    return (
      <Section id={id} title={title}>
        <p className="section-error">{getSectionErrorMessage(error)}</p>
      </Section>
    );
  }

  if (data === null || (Array.isArray(data) && data.length === 0)) return null;

  return (
    <Section id={id} title={title}>
      <Content data={data} />
    </Section>
  );
}

function createSection<T>(definition: DataSectionProps<T>) {
  return (
    <Suspense key={definition.id} fallback={<SectionLoading title={definition.title} />}>
      <DataSection {...definition} />
    </Suspense>
  );
}

export function PortfolioContent() {
  return (
    <>
      {createSection({ id: "about", title: "소개", load: fetchAboutMe, Content: AboutContent })}
      {createSection({ id: "careers", title: "경력", load: fetchCareers, Content: CareersContent })}
      {createSection({ id: "projects", title: "프로젝트", load: fetchProjects, Content: ProjectsContent })}
      {createSection({ id: "experiences", title: "경험", load: fetchExperiences, Content: ExperiencesContent })}
      {createSection({ id: "education", title: "학력", load: fetchEducations, Content: EducationContent })}
      {createSection({ id: "skills", title: "기술", load: fetchSkills, Content: SkillsContent })}
      {createSection({ id: "awards", title: "수상", load: fetchAwards, Content: AwardsContent })}
      {createSection({ id: "certificates", title: "자격증", load: fetchCertificates, Content: CertificatesContent })}
      {createSection({ id: "activities", title: "활동", load: fetchActivities, Content: ActivitiesContent })}
    </>
  );
}
