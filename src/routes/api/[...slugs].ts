import type { APIEvent } from "@solidjs/start/server";
import { apiApp } from "~/lib/server/api/app";

export function GET(event: Pick<APIEvent, "request">) {
  return apiApp.fetch(event.request);
}
