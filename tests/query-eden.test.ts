import { expect, test } from "bun:test";
import { createApiClient } from "~/lib/api-client";
import { createQueryClient } from "~/lib/query-client";
import { GET } from "~/routes/api/index";

test("caches successful Eden data and rejects HTTP errors in Solid Query", async () => {
  const client = createQueryClient();
  const api = createApiClient("https://portfolio.example", {
    fetcher: Object.assign(
      async (input: Parameters<typeof fetch>[0], init?: Parameters<typeof fetch>[1]) =>
        GET({ request: new Request(input, init) }),
      { preconnect: fetch.preconnect },
    ),
  });
  try {
    const result = await client.fetchQuery({
      queryKey: ["health"],
      queryFn: async () => {
        const { data, error } = await api.health.get();
        if (error) throw new Error(`HTTP ${error.status}`);
        return data;
      },
    });
    expect(result).toEqual({ status: "ok" });
    const failing = createApiClient("https://portfolio.example", {
      fetcher: Object.assign(async () => new Response(null, { status: 503 }), { preconnect: fetch.preconnect }),
    });
    await expect(
      client.fetchQuery({
        queryKey: ["unavailable"],
        retry: false,
        queryFn: async () => {
          const { data, error } = await failing.health.get();
          if (error) throw new Error(`HTTP ${error.status}`);
          return data;
        },
      }),
    ).rejects.toThrow("HTTP 503");
    expect(client.getQueryState(["unavailable"])?.status).toBe("error");
    expect(client.getQueryData(["unavailable"])).toBeUndefined();
  } finally {
    client.clear();
  }
});
