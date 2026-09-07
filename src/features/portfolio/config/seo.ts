import type { Metadata } from "next";
import { profile } from "./profile";

export const siteUrl = "https://sspzoa.io";
export const siteTitle = `${profile.name} · ${profile.role}`;

export const socialImage = {
  path: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteTitle} 포트폴리오`,
} as const;

export const siteMetadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: profile.description,
  authors: [{ name: profile.englishName, url: siteUrl }],
  creator: profile.englishName,
  openGraph: {
    type: "website",
    title: siteTitle,
    description: profile.description,
    url: siteUrl,
    siteName: `${profile.name} 포트폴리오`,
    locale: "ko_KR",
    images: [
      {
        url: `${siteUrl}${socialImage.path}`,
        width: socialImage.width,
        height: socialImage.height,
        alt: socialImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: profile.description,
    images: [{ url: `${siteUrl}${socialImage.path}`, alt: socialImage.alt }],
  },
} satisfies Metadata;

export const homeMetadata = {
  alternates: { canonical: siteUrl },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
} satisfies Metadata;

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
