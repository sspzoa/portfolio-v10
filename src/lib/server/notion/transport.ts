import { NotionPayloadError, NotionRequestError } from "~/lib/server/notion/errors";

type Fetch = (input: string, init: RequestInit) => Promise<Response>;

export interface NotionRequestOptions {
  method?: "GET" | "POST";
  body?: Record<string, unknown>;
}

export type NotionRequest = (endpoint: string, options?: NotionRequestOptions) => Promise<unknown>;

interface NotionTransportOptions {
  token: string;
  fetch?: Fetch;
  sleep?: (milliseconds: number) => Promise<void>;
  timeoutMs?: number;
}

export function createNotionRequest({
  token,
  fetch: fetchRequest = globalThis.fetch,
  sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)),
  timeoutMs = 15_000,
}: NotionTransportOptions): NotionRequest {
  return async (endpoint, options = {}) => {
    const body = options.body === undefined ? undefined : JSON.stringify(options.body);

    for (let attempt = 0; attempt < 3; attempt++) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);

      try {
        let response: Response;
        try {
          response = await fetchRequest(`https://api.notion.com/v1${endpoint}`, {
            method: options.method ?? "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Notion-Version": "2025-09-03",
              "Content-Type": "application/json",
            },
            body,
            cache: "no-store",
            signal: controller.signal,
          });
        } catch (cause) {
          throw new NotionRequestError(null, { cause });
        }

        if (!response.ok) {
          await response.body?.cancel().catch(() => undefined);
          throw new NotionRequestError(response.status);
        }

        let raw: string;
        try {
          raw = await response.text();
        } catch (cause) {
          throw new NotionRequestError(null, { cause });
        }

        try {
          return JSON.parse(raw) as unknown;
        } catch {
          throw new NotionPayloadError("Notion returned invalid JSON");
        }
      } catch (error) {
        if (!(error instanceof NotionRequestError) || !error.retryable || attempt === 2) throw error;
      } finally {
        clearTimeout(timeout);
      }

      await sleep(1_000 * 2 ** attempt);
    }

    throw new NotionRequestError(null);
  };
}
