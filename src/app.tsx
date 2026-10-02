import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { HttpStatusCode } from "@solidjs/start";
import { FileRoutes } from "@solidjs/start/router";
import { ErrorBoundary, Suspense } from "solid-js";
import { StatusPage } from "~/components/status-page";
import "./app.css";
import "virtual:uno.css";

export default function App() {
  return (
    <Router
      explicitLinks
      root={(props) => (
        <MetaProvider>
          <ErrorBoundary
            fallback={(_error, reset) => (
              <StatusPage title="페이지를 표시하지 못했어요." description="잠시 후 다시 시도해 주세요.">
                <HttpStatusCode code={500} />
                <button
                  type="button"
                  class="mt-6 inline-flex min-h-9 w-fit cursor-pointer items-center py-1 text-accent underline decoration-transparent underline-offset-4 hover:decoration-current"
                  onClick={reset}>
                  다시 시도
                </button>
              </StatusPage>
            )}>
            <Suspense>{props.children}</Suspense>
          </ErrorBoundary>
        </MetaProvider>
      )}>
      <FileRoutes />
    </Router>
  );
}
