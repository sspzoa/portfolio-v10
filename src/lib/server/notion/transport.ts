import { NotionPayloadError, NotionRequestError } from "~/lib/server/notion/errors";

type Fetch = (input: string, init: RequestInit) => Promise<Response>;

export type NotionRequest = (endpoint: string, body: Record<string, unknown>) => Promise<unknown>;

interface NotionTransportOptions {
  token: string;
  fetch?: Fetch;
  sleep?: (milliseconds: number) => Promise<void>;
  timeoutMs?: number;
}

const maxAttempts = 3;
const maxRetryDelay = 5_000;

export function createNotionRequest({
  token,
  fetch: fetchRequest = globalThis.fetch,
  sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)),
  timeoutMs = 15_000,
}: NotionTransportOptions): NotionRequest {
  return async (endpoint, body) => {
    const payload = JSON.stringify(body);

    for (let attempt = 1; ; attempt++) {
      let retryDelay = 1_000 * 2 ** (attempt - 1);

      try {
        let response: Response;
        try {
          response = await fetchRequest(`https://api.notion.com/v1${endpoint}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Notion-Version": "2025-09-03",
              "Content-Type": "application/json",
            },
            body: payload,
            cache: "no-store",
            signal: AbortSignal.timeout(timeoutMs),
          });
        } catch (cause) {
          throw new NotionRequestError(null, { cause });
        }

        if (!response.ok) {
          const retryAfter = response.headers.get("Retry-After")?.trim();
          if (retryAfter && /^\d+$/.test(retryAfter)) retryDelay = Math.max(retryDelay, Number(retryAfter) * 1_000);
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
        const retry = error instanceof NotionRequestError && error.retryable && attempt < maxAttempts;
        if (!retry || retryDelay > maxRetryDelay) throw error;
      }

      await sleep(retryDelay);
    }
  };
}
