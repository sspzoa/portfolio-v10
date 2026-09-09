import { query } from "@solidjs/router";

export const getPortfolio = query(async () => {
  "use server";
  const { serverApi } = await import("~/lib/server/api/client");
  const { data, error } = await serverApi.portfolio.get();
  if (error) throw new Error("포트폴리오를 불러올 수 없습니다.");
  return data;
}, "portfolio");
