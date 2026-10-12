import { createUniqueId, For } from "solid-js";
import { logoMark } from "~/lib/logo-mark";

const tones = {
  ink: { fill: "fill-current", reveal: "motion-safe:animate-graph-draw" },
  accent: { fill: "fill-accent", reveal: "motion-safe:animate-delay-350 motion-safe:animate-graph-draw" },
};

export function LogoMark(props: { class: string }) {
  const id = createUniqueId();
  return (
    <svg viewBox={logoMark.viewBox} aria-hidden="true" class={props.class}>
      <For each={logoMark.strokes}>
        {(stroke) => (
          <>
            <mask id={`${id}-${stroke.tone}`}>
              <path
                d={stroke.guide}
                fill="none"
                stroke="#fff"
                stroke-width={logoMark.guideWidth}
                pathLength="100"
                stroke-dasharray="100 200"
                class={tones[stroke.tone].reveal}
              />
            </mask>
            <path d={stroke.d} mask={`url(#${id}-${stroke.tone})`} class={tones[stroke.tone].fill} />
          </>
        )}
      </For>
    </svg>
  );
}
