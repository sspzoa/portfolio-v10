import { treaty } from "@elysia/eden";
import type { ApiApp } from "~/lib/server/api/app";

export function createApiClient(origin: string, options?: Parameters<typeof treaty<ApiApp>>[1]) {
  return treaty<ApiApp>(origin, options).api;
}
