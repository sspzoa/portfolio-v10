import "server-only";
import { Elysia } from "elysia";
import { profile } from "~/lib/profile";

export const apiApp = new Elysia({ prefix: "/api" }).get("/", () => profile).get("/health", () => ({ status: "ok" }));

export type ApiApp = typeof apiApp;
