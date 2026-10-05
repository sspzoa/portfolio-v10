import { Meta, Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { StatusPage } from "~/components/status-page";
import { profile } from "~/lib/profile";

export default function NotFound() {
  return (
    <StatusPage title="페이지를 찾을 수 없습니다." description="주소가 변경되었거나 삭제된 페이지일 수 있습니다.">
      <HttpStatusCode code={404} />
      <Title>{`페이지를 찾을 수 없습니다 · ${profile.name}`}</Title>
      <Meta name="robots" content="noindex" />
      <a href="/" class="tap-target mt-6 w-fit">
        ← 홈으로 돌아가기
      </a>
    </StatusPage>
  );
}
