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
  muted: "#6b727c",
};

export function createPortfolioImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: 64,
        backgroundColor: colors.canvas,
        color: colors.ink,
        fontFamily: "Portfolio OG Sans",
        fontWeight: 400,
      }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 24,
        }}>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.2 }}>{profile.name}</div>
        <div style={{ display: "flex", marginTop: 20, fontSize: 28, lineHeight: 1.4, color: colors.muted }}>
          {profile.role}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: 20,
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
