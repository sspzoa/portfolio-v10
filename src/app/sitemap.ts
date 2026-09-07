import type { MetadataRoute } from "next";
import { siteUrl } from "@/features/portfolio/config/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl }];
}
