import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="mx-auto w-full max-w-reading px-6 pt-24 pb-10 max-[40rem]:px-5 max-[40rem]:pt-12 print:p-0 [&>*+*]:mt-4 [&>*+*]:block"
      id="main-content"
      tabIndex={-1}>
      <h1 className="font-bold text-section">페이지를 찾을 수 없습니다.</h1>
      <Link href="/">포트폴리오로 돌아가기</Link>
    </main>
  );
}
