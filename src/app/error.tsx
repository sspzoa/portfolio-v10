"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="page-shell error-page" id="main-content" tabIndex={-1}>
      <h1>페이지를 불러오지 못했습니다.</h1>
      <p className="muted">잠시 후 다시 시도해 주세요.</p>
      <button className="retry-button" type="button" onClick={reset}>
        다시 시도
      </button>
    </main>
  );
}
