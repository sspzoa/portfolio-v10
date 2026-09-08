import { treaty } from "@elysia/eden";
import type { ApiApp } from "@/server/api/app";

export const createApiClient = (origin: string, options?: Parameters<typeof treaty<ApiApp>>[1]) =>
  treaty<ApiApp>(origin, options).api;
