import { z } from "zod";

const dateStringSchema = z
  .string()
  .regex(/^\d{4}\.\d{2}$/, "Date must be in YYYY.MM format")
  .nullable();

export const skillSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  isMain: z.boolean(),
  icon: z.string().url().nullable(),
  url: z.string().url().nullable(),
});

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortDescription: z.string().nullable(),
  description: z.string().nullable(),
  startDate: dateStringSchema,
  endDate: dateStringSchema,
  teamSize: z.number().int().nonnegative().nullable(),
  isSideProject: z.boolean(),
  tags: z.array(z.string()),
  coverImage: z.string().url().nullable(),
  iconImage: z.string().url().nullable(),
});

export const experienceSchema = z.object({
  id: z.string(),
  role: z.string(),
  organization: z.string().nullable(),
  description: z.string().nullable(),
  startDate: dateStringSchema,
  endDate: dateStringSchema,
  logo: z.string().url().nullable(),
});

export const educationSchema = z.object({
  id: z.string(),
  department: z.string(),
  organization: z.string().nullable(),
  description: z.string().nullable(),
  startDate: dateStringSchema,
  endDate: dateStringSchema,
  logo: z.string().url().nullable(),
});

export const certificationSchema = z.object({
  id: z.string(),
  name: z.string(),
  kind: z.string().nullable(),
  institution: z.string().nullable(),
  date: dateStringSchema,
});

export const careerSchema = z.object({
  id: z.string(),
  role: z.string(),
  organization: z.string().nullable(),
  description: z.string().nullable(),
  startDate: dateStringSchema,
  endDate: dateStringSchema,
  logo: z.string().url().nullable(),
});

export const awardSchema = z.object({
  id: z.string(),
  name: z.string(),
  tier: z.string().nullable(),
  date: dateStringSchema,
});

export const activitySchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  hosts: z.array(z.string()),
  startDate: dateStringSchema,
  endDate: dateStringSchema,
});

export const aboutMeSchema = z.object({
  content: z.string().min(1, "AboutMe content cannot be empty"),
});

export type Skill = z.infer<typeof skillSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Career = z.infer<typeof careerSchema>;
export type Award = z.infer<typeof awardSchema>;
export type Activity = z.infer<typeof activitySchema>;
export type AboutMe = z.infer<typeof aboutMeSchema>;
