import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { HttpStatusCode } from "@solidjs/start";
import { FileRoutes } from "@solidjs/start/router";
import { ErrorBoundary, Suspense } from "solid-js";
import "./app.css";

export default function App() {
  return (
    <Router
      explicitLinks
      root={(props) => (
        <MetaProvider>
          <a
            href="#main-content"
            class="fixed top-4 left-4 z-10 border border-line bg-canvas px-4 py-2 text-ink [transform:translateY(calc(-100%_-_var(--space-8)))] focus:translate-y-0 print:hidden">
            본문으로 바로가기
          </a>
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
