import type { z } from "zod";
import { readFileUrl, readMarkdown, readOptionalText, readPlainText } from "@/server/notion/properties";
import { formatDate } from "@/shared/lib/format-date";
import type {
  aboutMePageSchema,
  activityPageSchema,
  awardPageSchema,
  certificatePageSchema,
  educationPageSchema,
  projectPageSchema,
  rolePageSchema,
  skillPageSchema,
} from "./notion-pages";

type TimelinePage = z.infer<typeof rolePageSchema> | z.infer<typeof educationPageSchema>;

function mapTimeline(page: TimelinePage) {
  const { properties } = page;
  return {
    id: page.id,
    organization: readOptionalText(properties.organization.rich_text),
    description: readMarkdown(properties.description.rich_text),
    startDate: formatDate(properties.date.date?.start),
    endDate: formatDate(properties.date.date?.end),
    logo: readFileUrl(properties.logo.files[0]),
  };
}

export function mapAboutMe(page: z.infer<typeof aboutMePageSchema>) {
  return { content: readMarkdown(page.properties.content.rich_text) ?? "" };
}

export function mapRole(page: z.infer<typeof rolePageSchema>) {
  return { ...mapTimeline(page), role: readPlainText(page.properties.role.title) };
}

export function mapEducation(page: z.infer<typeof educationPageSchema>) {
  return { ...mapTimeline(page), department: readPlainText(page.properties.department.title) };
}

export function mapProject(page: z.infer<typeof projectPageSchema>) {
  const { properties } = page;
  return {
    id: page.id,
    name: readPlainText(properties.name.title),
    shortDescription: readMarkdown(properties.shortDescription.rich_text),
    description: readMarkdown(properties.description.rich_text),
    startDate: formatDate(properties.workPeriod.date?.start),
    endDate: formatDate(properties.workPeriod.date?.end),
    teamSize: properties.teamSize.number,
    isSideProject: properties.isSideProject.checkbox,
    tags: properties.tags.multi_select.map((tag) => tag.name),
    coverImage: readFileUrl(page.cover),
    iconImage: page.icon?.type === "emoji" ? null : readFileUrl(page.icon),
  };
}

export function mapSkill(page: z.infer<typeof skillPageSchema>) {
  const { properties } = page;
  return {
    id: page.id,
    name: readPlainText(properties.name.title),
    category: properties.category.select?.name ?? "",
    isMain: properties.isMain.checkbox,
    icon: readFileUrl(properties.icon.files[0]),
    url: page.public_url,
  };
}

export function mapAward(page: z.infer<typeof awardPageSchema>) {
  const { properties } = page;
  return {
    id: page.id,
    name: readPlainText(properties.name.title),
    tier: readOptionalText(properties.tier.rich_text),
    date: formatDate(properties.date.date?.start),
  };
}

export function mapCertificate(page: z.infer<typeof certificatePageSchema>) {
  const { properties } = page;
  return {
    id: page.id,
    name: readPlainText(properties.name.title),
    kind: readOptionalText(properties.kind.rich_text),
    institution: readOptionalText(properties.institution.rich_text),
    date: formatDate(properties.date.date?.start),
  };
}

export function mapActivity(page: z.infer<typeof activityPageSchema>) {
  const { properties } = page;
  return {
    id: page.id,
    name: readPlainText(properties.name.title),
    role: properties.role.select?.name ?? "",
    hosts: properties.host.multi_select.map((host) => host.name),
    startDate: formatDate(properties.date.date?.start),
    endDate: formatDate(properties.date.date?.end),
  };
}
