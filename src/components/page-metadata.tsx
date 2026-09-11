import { Link, Meta, Title } from "@solidjs/meta";
import { profile } from "~/lib/profile";
import { siteTitle, siteUrl, socialImage } from "~/lib/seo";
export function PageMetadata(props: { path?: string; title?: string }) {
  return (
    <>
      <Title>{props.title ?? siteTitle}</Title>
      <Meta name="description" content={profile.description} />
      <Meta name="author" content={profile.englishName} />
      <Meta name="creator" content={profile.englishName} />
      <Meta name="robots" content="index, follow" />
      <Meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <Link rel="canonical" href={`${siteUrl}${props.path ?? ""}`} />
      <Meta property="og:type" content="website" />
      <Meta property="og:title" content={props.title ?? siteTitle} />
      <Meta property="og:description" content={profile.description} />
      <Meta property="og:url" content={`${siteUrl}${props.path ?? ""}`} />
      <Meta property="og:site_name" content={`${profile.name} 포트폴리오`} />
      <Meta property="og:locale" content="ko_KR" />
      <Meta property="og:image" content={`${siteUrl}${socialImage.path}`} />
      <Meta property="og:image:width" content={String(socialImage.width)} />
      <Meta property="og:image:height" content={String(socialImage.height)} />
      <Meta property="og:image:alt" content={socialImage.alt} />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={props.title ?? siteTitle} />
      <Meta name="twitter:description" content={profile.description} />
      <Meta name="twitter:image" content={`${siteUrl}${socialImage.path}`} />
      <Meta name="twitter:image:alt" content={socialImage.alt} />
    </>
  );
}
