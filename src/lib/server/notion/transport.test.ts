import { describe, expect, test } from "bun:test";
import { NotionPayloadError, NotionRequestError } from "~/lib/server/notion/errors";
import { createNotionRequest } from "~/lib/server/notion/transport";

describe("Notion transport", () => {
  test("uses the pinned API version and uncached authorized requests", async () => {
    let captured: { url: string; options: RequestInit } | undefined;
    const request = createNotionRequest({
      token: "secret_test",
      fetch: async (url, options) => {
        captured = { url, options };
        return Response.json({ results: [] });
      },
    });

    await expect(request("/data_sources/example/query", { method: "POST", body: { page_size: 100 } })).resolves.toEqual(
      {
        results: [],
      },
    );
    expect(captured?.url).toBe("https://api.notion.com/v1/data_sources/example/query");
    expect(captured?.options).toMatchObject({
      method: "POST",
      cache: "no-store",
      body: '{"page_size":100}',
      headers: {
        Authorization: "Bearer secret_test",
        "Notion-Version": "2025-09-03",
      },
    });
    expect(captured?.options.signal).toBeInstanceOf(AbortSignal);
  });

  test("retries rate limits and server failures with bounded exponential backoff", async () => {
    const delays: number[] = [];
    const statuses = [429, 503, 200];
    let attempts = 0;
    const request = createNotionRequest({
      token: "secret_test",
      fetch: async () => Response.json({}, { status: statuses[attempts++] }),
      sleep: async (delay) => {
        delays.push(delay);
      },
    });

    await expect(request("/test")).resolves.toEqual({});
    expect(attempts).toBe(3);
    expect(delays).toEqual([1_000, 2_000]);
  });

  test("stops after three network failures", async () => {
    let attempts = 0;
    const request = createNotionRequest({
      token: "secret_test",
      fetch: async () => {
        attempts++;
        throw new TypeError("Network unavailable");
      },
      sleep: async () => {},
    });

    await expect(request("/test")).rejects.toBeInstanceOf(NotionRequestError);
    expect(attempts).toBe(3);
  });

  test("does not retry authentication or configuration errors", async () => {
    let attempts = 0;
    const request = createNotionRequest({
      token: "secret_test",
      fetch: async () => {
        attempts++;
        return new Response("Unauthorized", { status: 401 });
      },
    });

    await expect(request("/test")).rejects.toMatchObject({ status: 401, configurationError: true });
    expect(attempts).toBe(1);
  });

  test("invalid JSON is a payload error and is never retried", async () => {
    let attempts = 0;
    const request = createNotionRequest({
      token: "secret_test",
      fetch: async () => {
        attempts++;
        return new Response("<html>Not JSON</html>");
      },
    });

    await expect(request("/test")).rejects.toBeInstanceOf(NotionPayloadError);
    expect(attempts).toBe(1);
  });

  test("the timeout remains active until the response body finishes", async () => {
    let aborts = 0;
    const request = createNotionRequest({
      token: "secret_test",
      timeoutMs: 5,
      sleep: async () => {},
      fetch: async (_, options) => {
        const body = new ReadableStream({
          start(controller) {
            options.signal?.addEventListener("abort", () => {
              aborts++;
              controller.error(new DOMException("Aborted", "AbortError"));
            });
          },
        });
        return new Response(body);
      },
    });

    await expect(request("/test")).rejects.toBeInstanceOf(NotionRequestError);
    expect(aborts).toBe(3);
  });
});
