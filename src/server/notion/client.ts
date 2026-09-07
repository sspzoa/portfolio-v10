import "server-only";
import { getServerEnv } from "@/server/env";
import { createNotionRequest, type NotionRequest } from "./transport";

export const notionRequest: NotionRequest = (endpoint, options) => {
  const { NOTION_TOKEN } = getServerEnv();
  return createNotionRequest({ token: NOTION_TOKEN })(endpoint, options);
};
