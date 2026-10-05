import "server-only";
import type { z } from "zod";
import {
  type AboutMe,
  aboutMeSchema,
  activitySchema,
  awardSchema,
  certificateSchema,
  educationSchema,
  projectSchema,
  roleSchema,
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

async function fetchCollection<PageSchema extends z.ZodType, EntitySchema extends z.ZodType>(
  key: PortfolioSourceKey,
  pageSchema: PageSchema,
  mapPage: (page: z.output<PageSchema>) => z.input<EntitySchema>,
  entitySchema: EntitySchema,
): Promise<z.output<EntitySchema>[]> {
  const source = portfolioSources[key];
  const pages = await queryDataSource(source.id, pageSchema, source.sorts);
  const entities = entitySchema.array().safeParse(pages.map(mapPage));
  if (!entities.success) throw new PortfolioValidationError(key, { cause: entities.error });
  return entities.data;
}

export async function fetchAboutMe(): Promise<AboutMe | null> {
  const entries = await fetchCollection("aboutMe", aboutMePageSchema, mapAboutMe, aboutMeSchema);
  return entries[0] ?? null;
}

export function fetchCareers() {
  return fetchCollection("careers", rolePageSchema, mapRole, roleSchema);
}

export function fetchProjects() {
  return fetchCollection("projects", projectPageSchema, mapProject, projectSchema);
}

export function fetchExperiences() {
  return fetchCollection("experiences", rolePageSchema, mapRole, roleSchema);
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
