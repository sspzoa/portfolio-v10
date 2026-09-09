import { query } from "@solidjs/router";

export const getPortfolio = query(async () => {
  "use server";
  const { loadPortfolio } = await import("~/lib/server/portfolio/load-portfolio");
  return loadPortfolio();
}, "portfolio");
