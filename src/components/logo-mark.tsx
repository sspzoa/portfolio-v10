import { createUniqueId, Show } from "solid-js";
import { logoMark } from "~/lib/logo-mark";

export function LogoMark(props: { class: string; ghost?: boolean }) {
  const id = createUniqueId();
  const corner = logoMark.corner;
  return (
    <svg viewBox={logoMark.viewBox} aria-hidden="true" class={`group overflow-visible ${props.class}`}>
      <clipPath id={id}>
        <rect x={corner.x} y={corner.y} width={corner.size} height={corner.size} />
      </clipPath>
      <Show when={props.ghost}>
        <path
          d={`M${corner.x} ${corner.y}H${corner.x + corner.size}V${corner.y + corner.size}`}
          vector-effect="non-scaling-stroke"
          class="fill-none stroke-1 stroke-muted [stroke-dasharray:4_4]"
        />
      </Show>
      <path d={logoMark.ink} class="fill-current" />
      <g clip-path={`url(#${id})`}>
        <circle
          cx={corner.x}
          cy={corner.y + corner.size}
          r={corner.size}
          class="origin-center fill-accent [transform-box:fill-box] [transition:transform_0.9s_var(--ease-out)] motion-safe:animate-delay-200 motion-safe:animate-logo-refine motion-safe:group-hover:[transform:scale(1.4142)] motion-safe:group-hover:[transition-duration:0.3s]"
        />
      </g>
    </svg>
  );
}
