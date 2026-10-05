import { z } from "zod";

const dateSchema = z
  .string()
  .regex(/^\d{4}\.\d{2}$/, "Date must be in YYYY.MM format")
  .nullable();

const imageSchema = z.url().nullable();

const timelineFields = {
  organization: z.string().nullable(),
  description: z.string().nullable(),
  startDate: dateSchema,
  endDate: dateSchema,
  logo: imageSchema,
};

export const aboutMeSchema = z.object({
  name: z.string(),
  content: z.string().min(1, "AboutMe content cannot be empty"),
});

export const roleSchema = z.object({ id: z.string(), role: z.string(), ...timelineFields });

export const educationSchema = z.object({ id: z.string(), department: z.string(), ...timelineFields });

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortDescription: z.string().nullable(),
  description: z.string().nullable(),
  startDate: dateSchema,
  endDate: dateSchema,
  teamSize: z.int().nonnegative().nullable(),
  isSideProject: z.boolean(),
  tags: z.array(z.string()),
  coverImage: imageSchema,
  iconImage: imageSchema,
});

export const skillSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  isMain: z.boolean(),
  icon: imageSchema,
});

export const awardSchema = z.object({
  id: z.string(),
  name: z.string(),
  tier: z.string().nullable(),
  date: dateSchema,
  url: z.url().nullable(),
});

export const certificateSchema = z.object({
  id: z.string(),
  isMain: z.boolean(),
  name: z.string(),
  kind: z.string().nullable(),
  institution: z.string().nullable(),
  date: dateSchema,
});

export const activitySchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  hosts: z.array(z.string()),
  startDate: dateSchema,
  endDate: dateSchema,
});

export type AboutMe = z.infer<typeof aboutMeSchema>;
export type Role = z.infer<typeof roleSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type Award = z.infer<typeof awardSchema>;
export type Certificate = z.infer<typeof certificateSchema>;
export type Activity = z.infer<typeof activitySchema>;
