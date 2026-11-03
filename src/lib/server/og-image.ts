import "server-only";
import { renderAsync } from "@resvg/resvg-js";
import satori, { type Font } from "satori";
import { profile } from "~/lib/profile";
import { socialImage } from "~/lib/seo";
import boldFont from "../../../assets/fonts/portfolio-og-bold.otf?inline";
import regularFont from "../../../assets/fonts/portfolio-og-regular.otf?inline";

const palette = { canvas: "#ffffff", ink: "#000000", secondary: "#555555", muted: "#707070" };

function decodeFont(dataUrl: string) {
  return Buffer.from(dataUrl.slice(dataUrl.indexOf(",") + 1), "base64");
}

const fonts: Font[] = [
  { name: "Wanted Sans", data: decodeFont(regularFont), weight: 400 },
  { name: "Wanted Sans", data: decodeFont(boldFont), weight: 700 },
];

function element(type: string, props: Record<string, unknown>, children?: unknown) {
  return { type, props: children === undefined ? props : { ...props, children } };
}

const heading = element("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" } }, [
  element(
    "div",
    { style: { fontSize: 136, fontWeight: 700, lineHeight: 1.15, letterSpacing: -6, whiteSpace: "nowrap" } },
    profile.name,
  ),
  element(
    "div",
    { style: { display: "flex", marginTop: 28, fontSize: 38, lineHeight: 1.4, color: palette.secondary } },
    [
      element("span", {}, profile.englishName),
      element("span", { style: { margin: "0 18px", color: palette.muted } }, "·"),
      element("span", {}, profile.role),
    ],
  ),
]);

const card = element(
  "div",
  {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      padding: 80,
      backgroundColor: palette.canvas,
      color: palette.ink,
      fontFamily: "Wanted Sans",
    },
  },
  [heading],
);

export async function createPortfolioImage() {
  const svg = await satori(card, { width: socialImage.width, height: socialImage.height, fonts });
  const image = await renderAsync(svg, { font: { loadSystemFonts: false } });
  return new Response(new Uint8Array(image.asPng()), { headers: { "Content-Type": "image/png" } });
}
