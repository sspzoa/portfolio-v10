import { describe, expect, test } from "bun:test";
import { z } from "zod";
import { NotionPayloadError } from "./errors";
import { queryDataSource } from "./query";
import type { NotionRequestOptions } from "./transport";

const pageSchema = z.object({ id: z.string() });

describe("Notion data source queries", () => {
  test("collects every cursor page while preserving source order and sorts", async () => {
    const bodies: NotionRequestOptions["body"][] = [];
    const sorts = [{ property: "date", direction: "descending" }] as const;
    const pages = await queryDataSource("example", pageSchema, sorts, async (endpoint, options) => {
      expect(endpoint).toBe("/data_sources/example/query");
      expect(options?.method).toBe("POST");
      bodies.push(options?.body);
      return bodies.length === 1
        ? { results: [{ id: "first" }], has_more: true, next_cursor: "next" }
        : { results: [{ id: "second" }], has_more: false, next_cursor: null };
    });

    expect(pages).toEqual([{ id: "first" }, { id: "second" }]);
    expect(bodies).toEqual([
      { page_size: 100, sorts },
      { page_size: 100, sorts, start_cursor: "next" },
    ]);
  });

  test("rejects a repeated cursor instead of looping", async () => {
    let requests = 0;
    const result = queryDataSource("example", pageSchema, [], async () => {
      requests++;
      return { results: [], has_more: true, next_cursor: "repeated" };
    });

    await expect(result).rejects.toBeInstanceOf(NotionPayloadError);
    expect(requests).toBe(2);
  });

  test("rejects a missing cursor when more pages are announced", async () => {
    await expect(
      queryDataSource("example", pageSchema, [], async () => ({
        results: [],
        has_more: true,
        next_cursor: null,
      })),
    ).rejects.toBeInstanceOf(NotionPayloadError);
  });

  test("validates both the pagination envelope and each page", async () => {
    await expect(queryDataSource("example", pageSchema, [], async () => ({ results: [] }))).rejects.toBeInstanceOf(
      NotionPayloadError,
    );
    await expect(
      queryDataSource("example", pageSchema, [], async () => ({
        results: [{ id: 42 }],
        has_more: false,
        next_cursor: null,
      })),
    ).rejects.toBeInstanceOf(NotionPayloadError);
  });
});
