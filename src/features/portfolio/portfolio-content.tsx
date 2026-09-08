import "server-only";
import type { ComponentType } from "react";
import { getSectionErrorMessage } from "@/features/portfolio/server/errors";
import {
  fetchAboutMe,
  fetchActivities,
  fetchAwards,
  fetchCareers,
  fetchCertificates,
  fetchEducation,
  fetchExperiences,
  fetchProjects,
  fetchSkills,
} from "@/features/portfolio/server/repository";
import { Section, type SectionIdentity } from "@/features/portfolio/ui/section";
import { AboutContent } from "@/features/portfolio/ui/sections/about";
import { ActivitiesContent } from "@/features/portfolio/ui/sections/activities";
import { AwardsContent } from "@/features/portfolio/ui/sections/awards";
import { CareersContent } from "@/features/portfolio/ui/sections/careers";
import { CertificatesContent } from "@/features/portfolio/ui/sections/certificates";
import { EducationContent } from "@/features/portfolio/ui/sections/education";
import { ExperiencesContent } from "@/features/portfolio/ui/sections/experiences";
import { ProjectsContent } from "@/features/portfolio/ui/sections/projects";
import { SkillsContent } from "@/features/portfolio/ui/sections/skills";

interface PortfolioSectionDefinition<T> extends SectionIdentity {
  load: () => Promise<T | null>;
  Content: ComponentType<{ data: T }>;
}

async function renderSection<T>({ id, title, load, Content }: PortfolioSectionDefinition<T>) {
  let data: T | null;

  try {
    data = await load();
  } catch (error) {
    console.error(`[Portfolio:${id}]`, error instanceof Error ? error.name : "UnknownError");
    return (
      <Section key={id} id={id} title={title}>
        <p className="text-caption text-muted">{getSectionErrorMessage(error)}</p>
      </Section>
    );
  }

  if (data === null || (Array.isArray(data) && data.length === 0)) return null;

  return (
    <Section key={id} id={id} title={title}>
      <Content data={data} />
    </Section>
  );
}

export async function PortfolioContent() {
  const sections = await Promise.all([
    renderSection({ id: "about", title: "소개", load: fetchAboutMe, Content: AboutContent }),
    renderSection({ id: "careers", title: "경력", load: fetchCareers, Content: CareersContent }),
    renderSection({ id: "projects", title: "프로젝트", load: fetchProjects, Content: ProjectsContent }),
    renderSection({ id: "experiences", title: "경험", load: fetchExperiences, Content: ExperiencesContent }),
    renderSection({ id: "education", title: "학력", load: fetchEducation, Content: EducationContent }),
    renderSection({ id: "skills", title: "기술", load: fetchSkills, Content: SkillsContent }),
    renderSection({ id: "awards", title: "수상", load: fetchAwards, Content: AwardsContent }),
    renderSection({ id: "certificates", title: "자격증", load: fetchCertificates, Content: CertificatesContent }),
    renderSection({ id: "activities", title: "활동", load: fetchActivities, Content: ActivitiesContent }),
  ]);

  return <>{sections}</>;
}
