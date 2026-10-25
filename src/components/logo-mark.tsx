import { createUniqueId } from "solid-js";
import { logoMark } from "~/lib/logo-mark";

export function LogoMark(props: { class: string }) {
  const id = createUniqueId();
  const corner = logoMark.corner;
  return (
    <svg viewBox={logoMark.viewBox} aria-hidden="true" class={props.class}>
      <clipPath id={id}>
        <rect x={corner.x} y={corner.y} width={corner.size} height={corner.size} />
      </clipPath>
      <path d={logoMark.ink} class="fill-current" />
      <g clip-path={`url(#${id})`}>
        <circle
          cx={corner.x}
          cy={corner.y + corner.size}
          r={corner.size}
          class="origin-center fill-accent [transform-box:fill-box] motion-safe:animate-delay-200 motion-safe:animate-logo-refine"
        />
      </g>
    </svg>
  );
}
