import { createSignal, For, Index, onCleanup, onMount, Show } from "solid-js";

type Point = readonly [number, number];
type Scene = { stages: (string | null)[]; anchors: Point[]; anchorOpacity: number };

const anchorCount = 9;
const stageOffsets = [0, 0.22, 0.44, 0.66, 0.88];
const stageStyles = [
  { class: "stroke-accent", opacity: "1", width: "2.5" },
  { class: "stroke-muted", opacity: "0.7", width: "1" },
  { class: "stroke-muted", opacity: "0.5", width: "1" },
  { class: "stroke-muted", opacity: "0.34", width: "1" },
  { class: "stroke-muted", opacity: "0.22", width: "1" },
];
const refineMilliseconds = 5200;
const draftMilliseconds = 700;

function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function draft(random: () => number) {
  return Array.from({ length: anchorCount }, (_, index) => (index % 2 === 0 ? 1 : -1) * (0.12 + random() * 0.26));
}

function controls(jag: number[], progress: number, time: number): Point[] {
  return jag.map((value, index) => {
    const angle = (index / jag.length) * Math.PI * 2 + time * 0.05;
    const organic = 0.1 * Math.sin(angle * 2 + time * 0.3) + 0.06 * Math.sin(angle * 3 - time * 0.21 + 1.3);
    const radius = 0.68 * (1 + value * (1 - progress) + organic);
    return [Math.cos(angle) * radius, Math.sin(angle) * radius];
  });
}

function outline(jag: number[], progress: number, time: number) {
  const cut = 0.25 * progress;
  let points = controls(jag, progress, time);
  for (let pass = 0; pass < 4; pass += 1) {
    points = points.flatMap((point, index) => {
      const next = points[(index + 1) % points.length] ?? point;
      return [
        [point[0] + (next[0] - point[0]) * cut, point[1] + (next[1] - point[1]) * cut] as const,
        [point[0] + (next[0] - point[0]) * (1 - cut), point[1] + (next[1] - point[1]) * (1 - cut)] as const,
      ];
    });
  }
  return `M${points.map(([x, y]) => `${x.toFixed(4)} ${y.toFixed(4)}`).join("L")}Z`;
}

function compose(jag: number[], progress: number, time: number): Scene {
  return {
    stages: stageOffsets.map((offset) => (progress - offset < 0 ? null : outline(jag, progress - offset, time))),
    anchors: controls(jag, progress, time),
    anchorOpacity: 1 - progress,
  };
}

const initialJag = draft(seeded(20261103));

export function RefineSketch(props: { class: string }) {
  const [scene, setScene] = createSignal(compose(initialJag, 1, 0));
  let svg!: SVGSVGElement;

  onMount(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const state = {
      time: 0,
      progress: 1,
      phase: "hold" as "draft" | "refine" | "hold",
      jag: [...initialJag],
      from: [...initialJag],
      to: draft(Math.random),
      pointer: undefined as Point | undefined,
    };
    const startDraft = () => {
      state.phase = "draft";
      state.from = [...state.jag];
      state.to = draft(Math.random);
    };
    const roughen = (event: PointerEvent) => {
      const point: Point = [event.clientX, event.clientY];
      if (state.pointer) {
        const moved = Math.hypot(point[0] - state.pointer[0], point[1] - state.pointer[1]);
        state.progress = Math.max(state.progress - moved * 0.0012, 0);
        if (state.phase !== "draft") state.phase = "refine";
      }
      state.pointer = point;
    };
    const forget = () => {
      state.pointer = undefined;
    };

    let frame = 0;
    let previous = 0;
    const tick = (now: number) => {
      const elapsed = Math.min(now - previous, 32);
      previous = now;
      state.time += elapsed / 1000;
      if (state.phase === "draft") {
        state.progress = Math.max(state.progress - elapsed / draftMilliseconds, 0);
        const blend = 1 - state.progress;
        state.jag = state.from.map((value, index) => value + ((state.to[index] ?? value) - value) * blend);
        if (state.progress === 0) state.phase = "refine";
      } else if (state.phase === "refine") {
        state.progress = Math.min(state.progress + elapsed / refineMilliseconds, 1);
        if (state.progress === 1) state.phase = "hold";
      }
      setScene(compose(state.jag, state.progress, state.time));
      frame = requestAnimationFrame(tick);
    };
    const visibility = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (entry?.isIntersecting) {
        previous = performance.now();
        frame = requestAnimationFrame(tick);
      }
    });
    visibility.observe(svg);
    svg.addEventListener("pointermove", roughen);
    svg.addEventListener("pointerleave", forget);
    svg.addEventListener("pointerdown", startDraft);
    onCleanup(() => {
      visibility.disconnect();
      cancelAnimationFrame(frame);
    });
  });

  return (
    <svg
      ref={svg}
      viewBox="-1 -1 2 2"
      aria-hidden="true"
      class={`cursor-crosshair touch-none select-none overflow-visible ${props.class}`}>
      <For each={[...stageStyles].reverse()}>
        {(style, index) => {
          const stage = () => scene().stages[stageStyles.length - 1 - index()];
          return (
            <Show when={stage()}>
              {(path) => (
                <path
                  d={path()}
                  stroke-width={style.width}
                  stroke-opacity={style.opacity}
                  vector-effect="non-scaling-stroke"
                  class={`fill-none [stroke-linejoin:round] ${style.class}`}
                />
              )}
            </Show>
          );
        }}
      </For>
      <Show when={scene().anchorOpacity > 0.01}>
        <g opacity={scene().anchorOpacity.toFixed(3)}>
          <Index each={scene().anchors}>
            {(anchor) => (
              <rect
                x={(anchor()[0] - 0.018).toFixed(4)}
                y={(anchor()[1] - 0.018).toFixed(4)}
                width="0.036"
                height="0.036"
                vector-effect="non-scaling-stroke"
                class="fill-canvas stroke-accent [stroke-width:1.5]"
              />
            )}
          </Index>
        </g>
      </Show>
    </svg>
  );
}
