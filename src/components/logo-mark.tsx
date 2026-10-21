import { logoMark } from "~/lib/logo-mark";

export function LogoMark(props: { class: string }) {
  return (
    <svg viewBox={logoMark.viewBox} aria-hidden="true" class={props.class}>
      <path d={logoMark.body} class="fill-current" />
      <path
        d={logoMark.piece}
        class="fill-accent motion-safe:animate-delay-100 motion-safe:animate-logo-cut"
        style={{ "--logo-cut-x": `${-logoMark.pieceOffset.x}px`, "--logo-cut-y": `${-logoMark.pieceOffset.y}px` }}
      />
    </svg>
  );
}
