import { type Treaty, treaty } from "@elysia/eden";
import type { ApiApp } from "~/lib/server/api/app";

export function createApiClient(origin: string, options?: Treaty.Config) {
  return treaty<ApiApp>(origin, { parseDate: false, ...options }).api;
}
