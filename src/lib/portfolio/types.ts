import type { AboutMe, Activity, Award, Career, Certificate, Education, Experience, Project, Skill } from "./schemas";

export type SectionResult<T> = { data: T; error: null } | { data: null; error: string };
export interface PortfolioData {
  about: SectionResult<AboutMe | null>;
  careers: SectionResult<Career[]>;
  projects: SectionResult<Project[]>;
  experiences: SectionResult<Experience[]>;
  education: SectionResult<Education[]>;
  skills: SectionResult<Skill[]>;
  awards: SectionResult<Award[]>;
  certificates: SectionResult<Certificate[]>;
  activities: SectionResult<Activity[]>;
}

export type RenderedHtml = string & { readonly __renderedHtml: unique symbol };
export type RenderedProject = Omit<Project, "description" | "shortDescription"> & {
  description: RenderedHtml | null;
  shortDescription: RenderedHtml | null;
};
type RenderedTimeline<T> = Omit<T, "description"> & { description: RenderedHtml | null };
export interface RenderedPortfolioData
  extends Omit<PortfolioData, "about" | "careers" | "projects" | "experiences" | "education"> {
  about: SectionResult<{ content: RenderedHtml } | null>;
  careers: SectionResult<RenderedTimeline<Career>[]>;
  projects: SectionResult<RenderedProject[]>;
  experiences: SectionResult<RenderedTimeline<Experience>[]>;
  education: SectionResult<RenderedTimeline<Education>[]>;
}
