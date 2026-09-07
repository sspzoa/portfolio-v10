import { socialImage } from "@/features/portfolio/config/seo";
import { createPortfolioImage } from "@/features/portfolio/og-image";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const alt = socialImage.alt;
export const size = { width: socialImage.width, height: socialImage.height };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createPortfolioImage();
}
