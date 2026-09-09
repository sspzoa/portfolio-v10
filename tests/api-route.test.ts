import { expect, test } from "bun:test";
import { profile } from "~/lib/profile";
import { GET } from "~/routes/api/[...slugs]";

test("serves the public profile through the SolidStart handler", async () => {
  const response = await GET({ request: new Request("http://localhost/api") });

  expect(response.status).toBe(200);
  expect(response.headers.get("content-type")).toContain("application/json");
  expect(await response.json()).toEqual(profile);
});

test("serves a health check at the prefixed route", async () => {
  const response = await GET({ request: new Request("http://localhost/api/health") });

  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ status: "ok" });
});

test("returns 404 for unknown API routes", async () => {
  const response = await GET({ request: new Request("http://localhost/api/missing") });

  expect(response.status).toBe(404);
});
