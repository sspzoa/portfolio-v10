import "server-only";
import type { ComponentType } from "react";
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

interface DataSectionProps<T> extends SectionIdentity {
  load: () => Promise<T | null>;
  Content: ComponentType<{ data: T }>;
}

async function loadSection<T>({ id, title, load, Content }: DataSectionProps<T>) {
  let data: T | null;

  try {
    data = await load();
  } catch (error) {
    console.error(`[Portfolio:${id}]`, error instanceof Error ? error.name : "UnknownError");
    return (
      <Section key={id} id={id} title={title}>
        <p className="section-error">{getSectionErrorMessage(error)}</p>
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
    loadSection({ id: "about", title: "소개", load: fetchAboutMe, Content: AboutContent }),
    loadSection({ id: "careers", title: "경력", load: fetchCareers, Content: CareersContent }),
    loadSection({ id: "projects", title: "프로젝트", load: fetchProjects, Content: ProjectsContent }),
    loadSection({ id: "experiences", title: "경험", load: fetchExperiences, Content: ExperiencesContent }),
    loadSection({ id: "education", title: "학력", load: fetchEducations, Content: EducationContent }),
    loadSection({ id: "skills", title: "기술", load: fetchSkills, Content: SkillsContent }),
    loadSection({ id: "awards", title: "수상", load: fetchAwards, Content: AwardsContent }),
    loadSection({ id: "certificates", title: "자격증", load: fetchCertificates, Content: CertificatesContent }),
    loadSection({ id: "activities", title: "활동", load: fetchActivities, Content: ActivitiesContent }),
  ]);

  return <>{sections}</>;
}
