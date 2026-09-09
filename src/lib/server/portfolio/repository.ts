import "server-only";
import type { z } from "zod";
import {
  aboutMeSchema,
  activitySchema,
  awardSchema,
  careerSchema,
  certificateSchema,
  educationSchema,
  experienceSchema,
  projectSchema,
  skillSchema,
} from "~/lib/portfolio/schemas";
import { queryDataSource } from "~/lib/server/notion/query";
import { PortfolioValidationError } from "~/lib/server/portfolio/errors";
import {
  mapAboutMe,
  mapActivity,
  mapAward,
  mapCertificate,
  mapEducation,
  mapProject,
  mapRole,
  mapSkill,
} from "~/lib/server/portfolio/mappers";
import {
  aboutMePageSchema,
  activityPageSchema,
  awardPageSchema,
  certificatePageSchema,
  educationPageSchema,
  projectPageSchema,
  rolePageSchema,
  skillPageSchema,
} from "~/lib/server/portfolio/notion-pages";
import { type PortfolioSourceKey, portfolioSources } from "~/lib/server/portfolio/sources";

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

export async function fetchAboutMe(): Promise<z.infer<typeof aboutMeSchema> | null> {
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

export function fetchEducation() {
  return fetchCollection("educations", educationPageSchema, mapEducation, educationSchema);
}

export function fetchSkills() {
  return fetchCollection("skills", skillPageSchema, mapSkill, skillSchema);
}

export function fetchAwards() {
  return fetchCollection("awards", awardPageSchema, mapAward, awardSchema);
}

export function fetchCertificates() {
  return fetchCollection("certificates", certificatePageSchema, mapCertificate, certificateSchema);
}

export function fetchActivities() {
  return fetchCollection("activities", activityPageSchema, mapActivity, activitySchema);
}
