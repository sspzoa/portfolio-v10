import { profile } from "~/lib/profile";

export const siteUrl = "https://sspzoa.io";
export const siteTitle = `${profile.name} · ${profile.role}`;

export const socialImage = {
  path: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteTitle} 포트폴리오`,
} as const;

export const profileStructuredData = {
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
} as const;

export const profileStructuredDataJson = JSON.stringify(profileStructuredData).replace(/</g, "\\u003c");

export const portfolioStructuredDataJson = JSON.stringify({
  ...profileStructuredData,
  "@id": `${siteUrl}/portfolio#profile`,
  url: `${siteUrl}/portfolio`,
  name: `${profile.name} · 포트폴리오`,
}).replace(/</g, "\\u003c");
