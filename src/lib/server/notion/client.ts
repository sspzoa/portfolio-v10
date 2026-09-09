import "server-only";
import { getServerEnv } from "~/lib/server/env";
import { createNotionRequest, type NotionRequest } from "~/lib/server/notion/transport";

export const notionRequest: NotionRequest = (endpoint, options) => {
  const { NOTION_TOKEN } = getServerEnv();
  return createNotionRequest({ token: NOTION_TOKEN })(endpoint, options);
};
