import { z } from "zod";

export const richTextSegmentSchema = z.object({
  plain_text: z.string(),
  href: z.string().nullable().optional(),
  text: z
    .object({
      content: z.string(),
      link: z.object({ url: z.string() }).nullable().optional(),
    })
    .optional(),
  annotations: z.object({ bold: z.boolean() }).optional(),
});

export const titlePropertySchema = z.object({ title: z.array(richTextSegmentSchema) });
export const richTextPropertySchema = z.object({ rich_text: z.array(richTextSegmentSchema) });
export const selectPropertySchema = z.object({ select: z.object({ name: z.string() }).nullable() });
export const multiSelectPropertySchema = z.object({ multi_select: z.array(z.object({ name: z.string() })) });
export const checkboxPropertySchema = z.object({ checkbox: z.boolean() });
export const numberPropertySchema = z.object({ number: z.number().nullable() });
const notionDateSchema = z.union([z.iso.date(), z.iso.datetime({ offset: true })]);
export const datePropertySchema = z.object({
  date: z.object({ start: notionDateSchema, end: notionDateSchema.nullable() }).nullable(),
});
export const fileSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("external"), external: z.object({ url: z.url() }) }),
  z.object({ type: z.literal("file"), file: z.object({ url: z.url() }) }),
]);
export const filesPropertySchema = z.object({ files: z.array(fileSchema) });
export const iconSchema = z.union([fileSchema, z.object({ type: z.literal("emoji"), emoji: z.string() })]);

export const queryResponseSchema = z.object({
  results: z.array(z.unknown()),
  has_more: z.boolean(),
  next_cursor: z.string().min(1).nullable(),
});

export type RichTextSegment = z.infer<typeof richTextSegmentSchema>;
export type NotionFile = z.infer<typeof fileSchema>;
