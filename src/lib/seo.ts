import { profile } from "~/lib/profile";

export const siteUrl = "https://sspzoa.io";
export const siteTitle = `${profile.name} · ${profile.role}`;
export const portfolioTitle = `${profile.name} · 포트폴리오`;

const sitePaths = ["", "/portfolio"];

export const sitemapUrls = sitePaths.map((path) => `${siteUrl}${path}`);

export function canonicalUrl(pathname: string): string | undefined {
  const path = pathname.replace(/\/+$/, "").toLowerCase();
  return sitePaths.includes(path) ? `${siteUrl}${path}` : undefined;
}

export const socialImage = {
  url: `${siteUrl}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: `${siteTitle} 포트폴리오`,
} as const;

const profileStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteUrl}/#profile`,
  url: siteUrl,
  name: siteTitle,
  description: profile.description,
  inLanguage: "ko-KR",
  mainEntity: {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: profile.name,
    alternateName: profile.englishName,
    jobTitle: profile.role,
    description: profile.introduction,
    url: siteUrl,
    sameAs: profile.links.filter(({ href }) => href.startsWith("https://")).map(({ href }) => href),
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const profileStructuredDataJson = serializeJsonLd(profileStructuredData);

export const portfolioStructuredDataJson = serializeJsonLd({
  ...profileStructuredData,
  "@id": `${siteUrl}/portfolio#profile`,
  url: `${siteUrl}/portfolio`,
  name: portfolioTitle,
});
