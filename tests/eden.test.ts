import { expect, expectTypeOf, test } from "bun:test";
import { createApiClient } from "~/lib/api-client";
import { profile } from "~/lib/profile";
import { serverApi } from "~/lib/server/api/client";
import { GET } from "~/routes/api/[...slugs]";

test("Eden HTTP client calls the prefixed SolidStart route with inferred response types", async () => {
  const requests: string[] = [];
  const api = createApiClient("https://portfolio.example", {
    fetcher: Object.assign(
      async (input: Parameters<typeof fetch>[0], init?: Parameters<typeof fetch>[1]) => {
        const request = new Request(input, init);
        requests.push(request.url);
        return GET({ request });
      },
      { preconnect: fetch.preconnect },
    ),
  });

  const result = await api.get();
  expect(result.error).toBeNull();
  expect(result.data).toEqual(profile);
  expectTypeOf(result.data).toEqualTypeOf<typeof profile | null>();

  const health = await api.health.get();
  expect(health.data).toEqual({ status: "ok" });
  expect(requests).toEqual(["https://portfolio.example/api", "https://portfolio.example/api/health"]);
});

test("Eden exposes HTTP failures instead of returning successful data", async () => {
  const api = createApiClient("https://portfolio.example", {
    fetcher: Object.assign(async () => Response.json({ message: "Unavailable" }, { status: 503 }), {
      preconnect: fetch.preconnect,
    }),
  });

  const result = await api.health.get();
  expect(result.data).toBeNull();
  expect(result.error?.status).toBe(503);
});

test("server Eden client calls the Elysia application directly", async () => {
  const result = await serverApi.get();
  expect(result.error).toBeNull();
  expect(result.data).toEqual(profile);
  expect((await serverApi.health.get()).data).toEqual({ status: "ok" });
});
