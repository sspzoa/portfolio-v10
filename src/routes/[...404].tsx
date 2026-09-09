import { Meta, Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";

export default function NotFound() {
  return (
    <main class="mx-auto max-w-reading px-6 py-24">
      <HttpStatusCode code={404} />
      <Title>페이지를 찾을 수 없습니다 · 서승표</Title>
      <Meta name="robots" content="noindex" />
      <h1 class="font-bold text-section">페이지를 찾을 수 없습니다.</h1>
      <a href="/" class="mt-6 inline-block">
        홈으로 돌아가기
      </a>
    </main>
  );
}
