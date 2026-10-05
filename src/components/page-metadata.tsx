import { Meta, Title } from "@solidjs/meta";
import { useLocation } from "@solidjs/router";
import { profile } from "~/lib/profile";
import { canonicalUrl, siteTitle, socialImage } from "~/lib/seo";

export function PageMetadata(props: { title?: string }) {
  const location = useLocation();
  const title = () => props.title ?? siteTitle;
  return (
    <>
      <Title>{title()}</Title>
      <Meta name="description" content={profile.description} />
      <Meta name="author" content={profile.englishName} />
      <Meta name="creator" content={profile.englishName} />
      <Meta name="robots" content="max-image-preview:large" />
      <Meta property="og:type" content="website" />
      <Meta property="og:title" content={title()} />
      <Meta property="og:description" content={profile.description} />
      <Meta property="og:url" content={canonicalUrl(location.pathname)} />
      <Meta property="og:site_name" content={`${profile.name} 포트폴리오`} />
      <Meta property="og:locale" content="ko_KR" />
      <Meta property="og:image" content={socialImage.url} />
      <Meta property="og:image:width" content={String(socialImage.width)} />
      <Meta property="og:image:height" content={String(socialImage.height)} />
      <Meta property="og:image:alt" content={socialImage.alt} />
      <Meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
