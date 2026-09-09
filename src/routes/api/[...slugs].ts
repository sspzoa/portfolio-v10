import type { APIEvent } from "@solidjs/start/server";
import { apiApp } from "~/lib/server/api/app";

export const GET = (event: APIEvent) => apiApp.fetch(event.request);
