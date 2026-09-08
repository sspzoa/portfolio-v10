import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "./config/profile";
import { socialImage } from "./config/seo";

const [regular, bold, logo] = await Promise.all([
  readFile(join(process.cwd(), "assets/fonts/portfolio-og-regular.ttf")),
  readFile(join(process.cwd(), "assets/fonts/portfolio-og-bold.ttf")),
  readFile(join(process.cwd(), "assets/seungpyo-logo.png")),
]);

const colors = {
  canvas: "#ffe34d",
  ink: "#202322",
  muted: "#53564e",
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
        <img
          src={`data:image/png;base64,${logo.toString("base64")}`}
          alt=""
          width={224}
          height={224}
          style={{ marginBottom: 8 }}
        />
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700, lineHeight: 1.2 }}>{profile.englishName}</div>
        <div style={{ display: "flex", marginTop: 20, fontSize: 32, lineHeight: 1.4, color: colors.muted }}>
          {profile.role}
        </div>
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
