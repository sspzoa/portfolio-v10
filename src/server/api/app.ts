import "server-only";
import { Elysia } from "elysia";
import { profile } from "@/features/portfolio/config/profile";

export const apiApp = new Elysia({ prefix: "/api" }).get("/", () => profile).get("/health", () => ({ status: "ok" }));

export type ApiApp = typeof apiApp;
