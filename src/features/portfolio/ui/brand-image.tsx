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
      className={`block shrink-0 rounded-ui bg-brand-image object-contain ${variant === "logo" ? "size-10 p-1" : "size-6 p-0.5"}`}
    />
  );
}
