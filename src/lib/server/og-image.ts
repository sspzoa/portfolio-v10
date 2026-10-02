import "server-only";
import { renderAsync } from "@resvg/resvg-js";
import satori from "satori";
import { profile } from "~/lib/profile";
import { socialImage } from "~/lib/seo";
import boldFont from "../../../assets/fonts/portfolio-og-bold.ttf?inline";
import regularFont from "../../../assets/fonts/portfolio-og-regular.ttf?inline";

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
          backgroundColor: "#fbf9f5",
          color: "#2e2a24",
          fontFamily: "Portfolio OG Sans",
        },
        children: [
          {
            type: "svg",
            props: {
              width: 224,
              height: 224,
              viewBox: "8 8 48 48",
              style: { flexShrink: 0 },
              children: [
                {
                  type: "path",
                  props: {
                    d: "M20 20L46 26L29 46Z",
                    fill: "none",
                    stroke: "#75705f",
                    strokeWidth: 1.5,
                    strokeLinejoin: "round",
                  },
                },
                {
                  type: "circle",
                  props: { cx: 46, cy: 26, r: 6.5, fill: "#fbf9f5", stroke: "#55503f", strokeWidth: 1.75 },
                },
                {
                  type: "circle",
                  props: { cx: 29, cy: 46, r: 6.5, fill: "#fbf9f5", stroke: "#55503f", strokeWidth: 1.75 },
                },
                { type: "circle", props: { cx: 20, cy: 20, r: 9.5, fill: "#0e6e5c" } },
              ],
            },
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
                    style: { marginTop: 20, fontSize: 38, lineHeight: 1.4, color: "#55503f" },
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
