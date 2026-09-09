import "server-only";
import type { PortfolioData, SectionResult } from "~/lib/portfolio/types";
import { getSectionErrorMessage } from "~/lib/server/portfolio/errors";
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
} from "~/lib/server/portfolio/repository";

export async function loadSection<T>(name: string, load: () => Promise<T>): Promise<SectionResult<T>> {
  try {
    return { data: await load(), error: null };
  } catch (error) {
    console.error(`[Portfolio:${name}]`, error instanceof Error ? error.name : "UnknownError");
    return { data: null, error: getSectionErrorMessage(error) };
  }
}

export async function loadPortfolio(): Promise<PortfolioData> {
  const [about, careers, projects, experiences, education, skills, awards, certificates, activities] =
    await Promise.all([
      loadSection("about", fetchAboutMe),
      loadSection("careers", fetchCareers),
      loadSection("projects", fetchProjects),
      loadSection("experiences", fetchExperiences),
      loadSection("education", fetchEducation),
      loadSection("skills", fetchSkills),
      loadSection("awards", fetchAwards),
      loadSection("certificates", fetchCertificates),
      loadSection("activities", fetchActivities),
    ]);
  return { about, careers, projects, experiences, education, skills, awards, certificates, activities };
}
