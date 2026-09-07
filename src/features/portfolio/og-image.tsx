import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "./config/profile";
import { siteUrl, socialImage } from "./config/seo";

const [regular, bold] = await Promise.all([
  readFile(join(process.cwd(), "assets/fonts/portfolio-og-regular.ttf")),
  readFile(join(process.cwd(), "assets/fonts/portfolio-og-bold.ttf")),
]);

const colors = {
  canvas: "#ffffff",
  ink: "#22252a",
  secondary: "#535a63",
  muted: "#6b727c",
  line: "#e8eaed",
};

export function createPortfolioImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "60px 72px",
        backgroundColor: colors.canvas,
        color: colors.ink,
        fontFamily: "Portfolio OG Sans",
        fontWeight: 400,
      }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          color: colors.secondary,
        }}>
        <span>{profile.englishName}</span>
        <span>Portfolio</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
        <div style={{ display: "flex", fontSize: 104, fontWeight: 700, lineHeight: 1.15 }}>{profile.name}</div>
        <div style={{ display: "flex", marginTop: 12, fontSize: 40 }}>{profile.role}</div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 29, lineHeight: 1.5, color: colors.secondary }}>
          {profile.introduction}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          borderTop: `1px solid ${colors.line}`,
          paddingTop: 24,
          fontSize: 22,
          color: colors.muted,
        }}>
        {new URL(siteUrl).hostname}
      </div>
    </div>,
    {
      width: socialImage.width,
      height: socialImage.height,
      fonts: [
        { name: "Portfolio OG Sans", data: regular, weight: 400, style: "normal" },
        { name: "Portfolio OG Sans", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
