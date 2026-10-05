import type { AboutMe, Activity, Award, Certificate, Education, Project, Role, Skill } from "~/lib/portfolio/schemas";

export type SectionResult<T> = { data: T; error: null } | { data: null; error: string };

export interface PortfolioData {
  about: SectionResult<AboutMe | null>;
  careers: SectionResult<Role[]>;
  projects: SectionResult<Project[]>;
  experiences: SectionResult<Role[]>;
  education: SectionResult<Education[]>;
  skills: SectionResult<Skill[]>;
  awards: SectionResult<Award[]>;
  certificates: SectionResult<Certificate[]>;
  activities: SectionResult<Activity[]>;
}

export type RenderedHtml = string & { readonly __renderedHtml: unique symbol };

type Rendered<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: null extends T[P] ? RenderedHtml | null : RenderedHtml;
};

export type RenderedProject = Rendered<Project, "description" | "shortDescription">;

interface RenderedSections {
  about: SectionResult<Rendered<AboutMe, "content"> | null>;
  careers: SectionResult<Rendered<Role, "description">[]>;
  projects: SectionResult<RenderedProject[]>;
  experiences: SectionResult<Rendered<Role, "description">[]>;
  education: SectionResult<Rendered<Education, "description">[]>;
}

export type RenderedPortfolioData = Omit<PortfolioData, keyof RenderedSections> & RenderedSections;
