import { z } from "zod";
import {
  checkboxPropertySchema,
  datePropertySchema,
  fileSchema,
  filesPropertySchema,
  iconSchema,
  multiSelectPropertySchema,
  numberPropertySchema,
  richTextPropertySchema,
  selectPropertySchema,
  titlePropertySchema,
} from "@/server/notion/schemas";

const pageSchema = z.object({ id: z.string().min(1) });
const timelineProperties = {
  organization: richTextPropertySchema,
  description: richTextPropertySchema,
  date: datePropertySchema,
  logo: filesPropertySchema,
  url: richTextPropertySchema,
};

export const aboutMePageSchema = pageSchema.extend({
  properties: z.object({ content: richTextPropertySchema }),
});

export const rolePageSchema = pageSchema.extend({
  properties: z.object({ ...timelineProperties, role: titlePropertySchema }),
});

export const educationPageSchema = pageSchema.extend({
  properties: z.object({ ...timelineProperties, department: titlePropertySchema }),
});

export const projectPageSchema = pageSchema.extend({
  cover: fileSchema.nullable(),
  icon: iconSchema.nullable(),
  properties: z.object({
    name: titlePropertySchema,
    shortDescription: richTextPropertySchema,
    description: richTextPropertySchema,
    workPeriod: datePropertySchema,
    teamSize: numberPropertySchema,
    isSideProject: checkboxPropertySchema,
    tags: multiSelectPropertySchema,
  }),
});

export const skillPageSchema = pageSchema.extend({
  public_url: z.url().nullable(),
  properties: z.object({
    name: titlePropertySchema,
    category: selectPropertySchema,
    isMain: checkboxPropertySchema,
    icon: filesPropertySchema,
  }),
});

export const awardPageSchema = pageSchema.extend({
  properties: z.object({ name: titlePropertySchema, tier: richTextPropertySchema, date: datePropertySchema }),
});

export const certificatePageSchema = pageSchema.extend({
  properties: z.object({
    name: titlePropertySchema,
    kind: richTextPropertySchema,
    institution: richTextPropertySchema,
    date: datePropertySchema,
  }),
});

export const activityPageSchema = pageSchema.extend({
  properties: z.object({
    name: titlePropertySchema,
    role: selectPropertySchema,
    host: multiSelectPropertySchema,
    date: datePropertySchema,
  }),
});
