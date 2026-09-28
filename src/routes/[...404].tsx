import { Meta, Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";

export default function NotFound() {
  return (
    <main class="mx-auto max-w-reading px-6 py-24">
      <HttpStatusCode code={404} />
      <Title>페이지를 찾을 수 없습니다 · 서승표</Title>
      <Meta name="robots" content="noindex" />
      <h1 class="font-bold text-profile leading-[1.35] tracking-[-0.025em]">페이지를 찾을 수 없습니다.</h1>
      <p class="mt-3 text-secondary">주소가 변경되었거나 삭제된 페이지일 수 있습니다.</p>
      <a href="/" class="mt-6 inline-block min-h-9 py-1">
        ← 홈으로 돌아가기
      </a>
    </main>
  );
}
