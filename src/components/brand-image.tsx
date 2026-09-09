import { Show } from "solid-js";

export function BrandImage(props: { src: string | null; variant: "logo" | "icon" }) {
  const size = () => (props.variant === "logo" ? 40 : 24);
  return (
    <Show when={props.src}>
      {(src) => (
        <img
          src={src()}
          alt=""
          width={size()}
          height={size()}
          draggable={false}
          loading="lazy"
          decoding="async"
          class={`block shrink-0 rounded-ui object-contain ${props.variant === "logo" ? "size-10 p-1" : "size-6 p-0.5"}`}
        />
      )}
    </Show>
  );
}
