import { QueryClient } from "@tanstack/solid-query";

export function createQueryClient() {
  return new QueryClient({ defaultOptions: { queries: { staleTime: 60_000 } } });
}
