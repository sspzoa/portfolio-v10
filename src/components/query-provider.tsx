import { QueryClientProvider } from "@tanstack/solid-query";
import type { ParentProps } from "solid-js";
import { createQueryClient } from "~/lib/query-client";

export function QueryProvider(props: ParentProps) {
  const client = createQueryClient();
  return <QueryClientProvider client={client}>{props.children}</QueryClientProvider>;
}
