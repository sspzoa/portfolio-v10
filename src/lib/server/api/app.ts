import "server-only";
import { Elysia } from "elysia";
import { profile } from "~/lib/profile";
import { loadPortfolio } from "~/lib/server/portfolio/load-portfolio";

export const apiApp = new Elysia({ prefix: "/api" })
  .get("/", () => profile)
  .get("/health", () => ({ status: "ok" }))
  .get("/portfolio", () => loadPortfolio());

export type ApiApp = typeof apiApp;
