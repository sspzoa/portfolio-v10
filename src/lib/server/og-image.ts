import "server-only";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import { profile } from "~/lib/profile";
import { socialImage } from "~/lib/seo";
import boldFont from "../../../assets/fonts/portfolio-og-bold.ttf?inline";
import regularFont from "../../../assets/fonts/portfolio-og-regular.ttf?inline";
import logo from "../../../assets/seungpyo-logo.png?inline";

function escapeXml(text: string) {
  return text.replace(
    /[&<>"']/g,
    (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[character]!,
  );
}

export async function createPortfolioImage() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${socialImage.width}" height="${socialImage.height}" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#ffe34d"/>
    <image x="488" y="107" width="224" height="224" xlink:href="${logo}"/>
    <text x="600" y="411" text-anchor="middle" font-family="Portfolio OG Sans" font-size="84" font-weight="700" fill="#202322">${escapeXml(profile.englishName)}</text>
    <text x="600" y="475" text-anchor="middle" font-family="Portfolio OG Sans" font-size="32" fill="#53564e">${escapeXml(profile.role)}</text>
  </svg>`;
  const directory = await mkdtemp(join(tmpdir(), "portfolio-og-"));
  try {
    const fontFiles = await Promise.all(
      [regularFont, boldFont].map(async (font, index) => {
        const path = join(directory, `${index}.ttf`);
        await writeFile(path, Buffer.from(font.split(",")[1]!, "base64"));
        return path;
      }),
    );
    const png = new Resvg(svg, {
      font: {
        loadSystemFonts: false,
        defaultFontFamily: "Portfolio OG Sans",
        fontFiles,
      },
    })
      .render()
      .asPng();
    return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}
