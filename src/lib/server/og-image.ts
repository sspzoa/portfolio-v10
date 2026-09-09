import "server-only";
import { renderAsync } from "@resvg/resvg-js";
import satori from "satori";
import { profile } from "~/lib/profile";
import { socialImage } from "~/lib/seo";
import boldFont from "../../../assets/fonts/portfolio-og-bold.ttf?inline";
import regularFont from "../../../assets/fonts/portfolio-og-regular.ttf?inline";
import logo from "../../../assets/og-logo.svg?inline";

const fonts = [
  { name: "Portfolio OG Sans", data: Buffer.from(regularFont.split(",")[1]!, "base64"), weight: 400 as const },
  { name: "Portfolio OG Sans", data: Buffer.from(boldFont.split(",")[1]!, "base64"), weight: 700 as const },
];

export async function createPortfolioImage() {
  const svg = await satori(
    {
      key: null,
      type: "div",
      props: {
        style: {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          gap: 96,
          padding: 80,
          backgroundColor: "#ffe34d",
          color: "#202322",
          fontFamily: "Portfolio OG Sans",
        },
        children: [
          {
            type: "img",
            props: { src: logo, width: 224, height: 262, style: { objectFit: "contain", flexShrink: 0 } },
          },
          {
            type: "div",
            props: {
              style: { display: "flex", flexDirection: "column", justifyContent: "center" },
              children: [
                {
                  type: "div",
                  props: {
                    style: { fontSize: 76, fontWeight: 700, lineHeight: 1.15, whiteSpace: "nowrap" },
                    children: profile.englishName,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: { marginTop: 20, fontSize: 38, lineHeight: 1.4, color: "#53564e" },
                    children: profile.role,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    { width: socialImage.width, height: socialImage.height, fonts },
  );
  const image = await renderAsync(svg, { font: { loadSystemFonts: false } });
  return new Response(new Uint8Array(image.asPng()), { headers: { "Content-Type": "image/png" } });
}
