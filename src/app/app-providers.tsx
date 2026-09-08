"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import type { ReactNode } from "react";
import { getQueryClient } from "@/shared/lib/query-client";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <JotaiProvider>
      <QueryClientProvider client={getQueryClient()}>{children}</QueryClientProvider>
    </JotaiProvider>
  );
}
