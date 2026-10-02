import { Meta, Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { StatusPage } from "~/components/status-page";

export default function NotFound() {
  return (
    <StatusPage title="페이지를 찾을 수 없습니다." description="주소가 변경되었거나 삭제된 페이지일 수 있습니다.">
      <HttpStatusCode code={404} />
      <Title>페이지를 찾을 수 없습니다 · 서승표</Title>
      <Meta name="robots" content="noindex" />
      <a href="/" class="mt-6 inline-flex min-h-9 w-fit items-center py-1">
        ← 홈으로 돌아가기
      </a>
    </StatusPage>
  );
}
