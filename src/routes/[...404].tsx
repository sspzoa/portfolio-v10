import { Meta, Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";

export default function NotFound() {
  return (
    <main id="main-content" class="mx-auto max-w-reading px-6 py-24" tabindex={-1}>
      <HttpStatusCode code={404} />
      <Title>페이지를 찾을 수 없습니다 · 서승표</Title>
      <Meta name="robots" content="noindex" />
      <h1 class="font-bold text-section">페이지를 찾을 수 없습니다.</h1>
      <a class="mt-6 inline-block" href="/">
        포트폴리오로 돌아가기
      </a>
    </main>
  );
}
