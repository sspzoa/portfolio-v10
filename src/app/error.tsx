"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main
      className="mx-auto w-full max-w-reading px-6 pt-24 pb-10 max-[40rem]:px-5 max-[40rem]:pt-12 print:p-0 [&>*+*]:mt-4 [&>*+*]:block"
      id="main-content"
      tabIndex={-1}>
      <h1 className="font-bold text-section">페이지를 불러오지 못했습니다.</h1>
      <p className="text-caption text-muted">잠시 후 다시 시도해 주세요.</p>
      <button
        className="w-fit cursor-pointer rounded-ui border border-line bg-surface px-4 py-2"
        type="button"
        onClick={reset}>
        다시 시도
      </button>
    </main>
  );
}
