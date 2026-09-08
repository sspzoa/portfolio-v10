import "server-only";
import { treaty } from "@elysia/eden";
import { apiApp } from "./app";

export const serverApi = treaty(apiApp).api;
