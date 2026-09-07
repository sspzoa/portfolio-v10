import "server-only";
import { z } from "zod";

const serverEnvSchema = z.object({
  NOTION_TOKEN: z.string().regex(/^(secret|ntn)_[A-Za-z0-9_-]+$/),
});

export class EnvironmentError extends Error {
  constructor() {
    super("NOTION_TOKEN must contain a valid Notion integration token");
    this.name = "EnvironmentError";
  }
}

export function getServerEnv() {
  const result = serverEnvSchema.safeParse({ NOTION_TOKEN: process.env.NOTION_TOKEN });
  if (!result.success) throw new EnvironmentError();
  return result.data;
}
