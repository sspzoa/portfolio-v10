import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { siteMetadata } from "@/features/portfolio/config/seo";
import { AppProviders } from "./app-providers";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111214" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">
          본문으로 바로가기
        </a>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
