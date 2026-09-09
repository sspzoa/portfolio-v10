import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { AppShell } from "~/components/app-shell";
import { QueryProvider } from "~/components/query-provider";
import "./app.css";

export default function App() {
  return (
    <Router
      explicitLinks
      root={(props) => (
        <MetaProvider>
          <QueryProvider>
            <AppShell>
              <Suspense>{props.children}</Suspense>
            </AppShell>
          </QueryProvider>
        </MetaProvider>
      )}>
      <FileRoutes />
    </Router>
  );
}
