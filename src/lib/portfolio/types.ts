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
