import { logoMark } from "~/lib/logo-mark";

export function LogoMark(props: { class: string; draw?: boolean }) {
  const animate = (classes: string) => (props.draw ? classes : undefined);
  return (
    <svg viewBox={logoMark.viewBox} fill="none" aria-hidden="true" class={props.class}>
      <g stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-dasharray="100">
        <path d={logoMark.strokes[0]} pathLength="100" class={animate("motion-safe:animate-graph-draw")} />
        <g class={animate("motion-safe:animate-delay-250 motion-safe:animate-graph-fade")}>
          <path
            d={logoMark.strokes[1]}
            pathLength="100"
            class={animate("motion-safe:animate-delay-250 motion-safe:animate-graph-draw")}
          />
        </g>
      </g>
      <g class={animate("motion-safe:animate-delay-700 motion-safe:animate-graph-fade")}>
        <circle cx={logoMark.node.cx} cy={logoMark.node.cy} r="3" class="fill-accent" />
      </g>
    </svg>
  );
}
