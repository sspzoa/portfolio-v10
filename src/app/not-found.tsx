import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell error-page" id="main-content" tabIndex={-1}>
      <h1>페이지를 찾을 수 없습니다.</h1>
      <Link href="/">포트폴리오로 돌아가기</Link>
    </main>
  );
}
