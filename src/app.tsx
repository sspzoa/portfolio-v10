import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { HttpStatusCode } from "@solidjs/start";
import { FileRoutes } from "@solidjs/start/router";
import { ErrorBoundary, Suspense } from "solid-js";
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
              <main id="main-content" tabindex={-1} class="mx-auto max-w-reading px-6 py-24">
                <HttpStatusCode code={500} />
                <h1 class="font-bold text-section">페이지를 표시하지 못했어요.</h1>
                <p class="mt-3 text-secondary">잠시 후 다시 시도해 주세요.</p>
                <button type="button" class="mt-6 cursor-pointer underline" onClick={reset}>
                  다시 시도
                </button>
              </main>
            )}>
            <Suspense>{props.children}</Suspense>
          </ErrorBoundary>
        </MetaProvider>
      )}>
      <FileRoutes />
    </Router>
  );
}
