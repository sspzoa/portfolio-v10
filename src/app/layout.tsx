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
    { media: "(prefers-color-scheme: light)", color: "#fffdf5" },
    { media: "(prefers-color-scheme: dark)", color: "#202322" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className="scroll-pt-8 motion-safe:scroll-smooth" lang="ko" data-scroll-behavior="smooth">
      <body className="m-0 bg-canvas font-sans text-copy text-ink leading-[1.75] antialiased">
        <a
          className="fixed top-4 left-4 z-10 border border-line bg-canvas px-4 py-2 text-ink [transform:translateY(calc(-100%_-_var(--space-8)))] focus:translate-y-0 print:hidden"
          href="#main-content">
          본문으로 바로가기
        </a>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
