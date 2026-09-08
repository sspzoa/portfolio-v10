import Image from "next/image";

export function BrandImage({ src, variant }: { src: string | null; variant: "logo" | "icon" }) {
  if (!src) return null;

  const size = variant === "logo" ? 40 : 24;

  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      sizes={`${size}px`}
      draggable={false}
      className={`brand-image brand-image--${variant}`}
    />
  );
}
