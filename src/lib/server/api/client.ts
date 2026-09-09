import "server-only";
import { treaty } from "@elysia/eden";
import { apiApp } from "~/lib/server/api/app";

export const serverApi = treaty(apiApp).api;
