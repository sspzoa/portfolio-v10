import { HttpStatusCode } from "@solidjs/start";
import { ErrorBoundary, type ParentProps } from "solid-js";

export function AppShell(props: ParentProps) {
  return (
    <>
      <a
        class="fixed top-4 left-4 z-10 border border-line bg-canvas px-4 py-2 text-ink [transform:translateY(calc(-100%_-_var(--space-8)))] focus:translate-y-0 print:hidden"
        href="#main-content">
        본문으로 바로가기
      </a>
      <ErrorBoundary
        fallback={(_error, reset) => (
          <main id="main-content" class="mx-auto max-w-reading px-6 py-24" tabindex={-1}>
            <HttpStatusCode code={500} />
            <h1 class="font-bold text-section">페이지를 표시하지 못했어요.</h1>
            <p class="mt-3 text-secondary">잠시 후 다시 시도해 주세요.</p>
            <button type="button" class="mt-6 cursor-pointer underline" onClick={reset}>
              다시 시도
            </button>
          </main>
        )}>
        {props.children}
      </ErrorBoundary>
    </>
  );
}
