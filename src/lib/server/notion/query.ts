import type { z } from "zod";
import { notionRequest } from "~/lib/server/notion/client";
import { NotionPayloadError } from "~/lib/server/notion/errors";
import { queryResponseSchema } from "~/lib/server/notion/schemas";
import type { NotionRequest } from "~/lib/server/notion/transport";

export interface NotionSort {
  property: string;
  direction: "ascending" | "descending";
}

export async function queryDataSource<Schema extends z.ZodType>(
  sourceId: string,
  pageSchema: Schema,
  sorts: readonly NotionSort[],
  request: NotionRequest = notionRequest,
): Promise<z.output<Schema>[]> {
  const pages: z.output<Schema>[] = [];
  const cursors = new Set<string>();
  let cursor: string | undefined;

  while (true) {
    const raw = await request(`/data_sources/${sourceId}/query`, {
      page_size: 100,
      sorts,
      ...(cursor ? { start_cursor: cursor } : {}),
    });
    const response = queryResponseSchema.safeParse(raw);
    if (!response.success) throw new NotionPayloadError("Notion query response has an invalid shape");
    if (response.data.request_status?.type === "incomplete") {
      throw new NotionPayloadError("Notion query returned an incomplete result");
    }

    const parsedPages = pageSchema.array().safeParse(response.data.results);
    if (!parsedPages.success) {
      throw new NotionPayloadError(`Notion data source ${sourceId} has invalid page properties`);
    }
    pages.push(...parsedPages.data);

    if (!response.data.has_more) return pages;

    const nextCursor = response.data.next_cursor;
    if (!nextCursor || cursors.has(nextCursor)) {
      throw new NotionPayloadError("Notion pagination returned a missing or repeated cursor");
    }
    cursors.add(nextCursor);
    cursor = nextCursor;
  }
}
