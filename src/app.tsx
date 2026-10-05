import { Link, MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { HttpStatusCode } from "@solidjs/start";
import { FileRoutes } from "@solidjs/start/router";
import { ErrorBoundary, Show, Suspense } from "solid-js";
import { StatusPage } from "~/components/status-page";
import { canonicalUrl } from "~/lib/seo";
import "./app.css";
import "virtual:uno.css";

export default function App() {
  return (
    <Router
      explicitLinks
      root={(props) => (
        <MetaProvider>
          <Show when={canonicalUrl(props.location.pathname)}>{(url) => <Link rel="canonical" href={url()} />}</Show>
          <ErrorBoundary
            fallback={
              <StatusPage title="페이지를 표시하지 못했어요." description="잠시 후 다시 시도해 주세요.">
                <HttpStatusCode code={500} />
                <a href={`${props.location.pathname}${props.location.search}`} class="tap-target mt-6 w-fit">
                  다시 시도
                </a>
              </StatusPage>
            }>
            <Suspense>{props.children}</Suspense>
          </ErrorBoundary>
        </MetaProvider>
      )}>
      <FileRoutes />
    </Router>
  );
}
