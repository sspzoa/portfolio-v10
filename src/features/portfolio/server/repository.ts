import "server-only";
import type { z } from "zod";
import {
  aboutMeSchema,
  activitySchema,
  awardSchema,
  careerSchema,
  certificationSchema,
  educationSchema,
  experienceSchema,
  projectSchema,
  skillSchema,
} from "@/features/portfolio/model/schemas";
import { queryDataSource } from "@/server/notion/query";
import { PortfolioValidationError } from "./errors";
import {
  mapAboutMe,
  mapActivity,
  mapAward,
  mapCertificate,
  mapEducation,
  mapProject,
  mapRole,
  mapSkill,
} from "./mappers";
import {
  aboutMePageSchema,
  activityPageSchema,
  awardPageSchema,
  certificatePageSchema,
  educationPageSchema,
  projectPageSchema,
  rolePageSchema,
  skillPageSchema,
} from "./notion-pages";
import { type PortfolioSourceKey, portfolioSources } from "./sources";

async function fetchCollection<Raw, Entity>(
  key: PortfolioSourceKey,
  pageSchema: z.ZodType<Raw>,
  mapPage: (page: Raw) => unknown,
  entitySchema: z.ZodType<Entity>,
): Promise<Entity[]> {
  const source = portfolioSources[key];
  const pages = await queryDataSource(source.id, pageSchema, source.sorts);

  try {
    return entitySchema.array().parse(pages.map(mapPage));
  } catch (cause) {
    throw new PortfolioValidationError(key, { cause });
  }
}

export async function fetchAboutMe() {
  const entries = await fetchCollection("aboutMe", aboutMePageSchema, mapAboutMe, aboutMeSchema);
  return entries[0] ?? null;
}

export function fetchCareers() {
  return fetchCollection("careers", rolePageSchema, mapRole, careerSchema);
}

export function fetchProjects() {
  return fetchCollection("projects", projectPageSchema, mapProject, projectSchema);
}

export function fetchExperiences() {
  return fetchCollection("experiences", rolePageSchema, mapRole, experienceSchema);
}

export function fetchEducations() {
  return fetchCollection("educations", educationPageSchema, mapEducation, educationSchema);
}

export function fetchSkills() {
  return fetchCollection("skills", skillPageSchema, mapSkill, skillSchema);
}

export function fetchAwards() {
  return fetchCollection("awards", awardPageSchema, mapAward, awardSchema);
}

export function fetchCertificates() {
  return fetchCollection("certificates", certificatePageSchema, mapCertificate, certificationSchema);
}

export function fetchActivities() {
  return fetchCollection("activities", activityPageSchema, mapActivity, activitySchema);
}
