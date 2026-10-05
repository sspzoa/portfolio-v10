import { For } from "solid-js";
import { profile } from "~/lib/profile";

type NodeId = "person" | "role" | "company" | "university" | "school";

interface GraphNode {
  x: number;
  y: number;
  radius: number;
  label: string;
  labelX: number;
  labelY: number;
  anchor: "start" | "middle" | "end";
  primary?: boolean;
}

const nodes: Record<NodeId, GraphNode> = {
  person: { x: 66, y: 58, radius: 7, label: profile.name, labelX: 0, labelY: -21, anchor: "middle", primary: true },
  role: { x: 240, y: 50, radius: 5, label: profile.role, labelX: 0, labelY: -19, anchor: "middle" },
  company: { x: 254, y: 142, radius: 5, label: "호랑에듀", labelX: 0, labelY: 20, anchor: "middle" },
  university: { x: 180, y: 218, radius: 5, label: "동국대 경영대학", labelX: 0, labelY: 20, anchor: "middle" },
  school: { x: 66, y: 198, radius: 5, label: "디미고 해킹방어과", labelX: 0, labelY: 20, anchor: "middle" },
};

const triples: [NodeId, string, NodeId][] = [
  ["person", "is a", "role"],
  ["person", "일한다", "company"],
  ["person", "다닌다", "university"],
  ["person", "졸업했다", "school"],
];

const nodeGap = 5;
const introDuration = 1.6;
const pulseLoop = 7;
const pulseStagger = pulseLoop / triples.length;
const pulseTravel = 1.4;

const round = (value: number) => Math.round(value * 100) / 100;
const seconds = (value: number) => `${round(value)}s`;

const edges = triples.map(([from, label, to], index) => {
  const source = nodes[from];
  const target = nodes[to];
  const deltaX = target.x - source.x;
  const deltaY = target.y - source.y;
  const length = Math.hypot(deltaX, deltaY);
  const unitX = deltaX / length;
  const unitY = deltaY / length;
  const startX = round(source.x + unitX * (source.radius + nodeGap));
  const startY = round(source.y + unitY * (source.radius + nodeGap));
  const endX = round(target.x - unitX * (target.radius + nodeGap));
  const endY = round(target.y - unitY * (target.radius + nodeGap));
  const pulseStart = introDuration + index * pulseStagger;

  return {
    label,
    target,
    path: `M${startX} ${startY}L${endX} ${endY}`,
    arrow: `translate(${endX} ${endY}) rotate(${round((Math.atan2(deltaY, deltaX) * 180) / Math.PI)})`,
    labelX: round((startX + endX) / 2),
    labelY: round((startY + endY) / 2),
    drawDelay: seconds(index * 0.12),
    labelDelay: seconds(index * 0.12 + 0.5),
    pulseDelay: seconds(pulseStart),
    rippleDelay: seconds(pulseStart + pulseTravel),
  };
});

const nodeList = Object.values(nodes).map((node, index) => ({ ...node, delay: seconds(index * 0.1) }));

export function OntologyGraph(props: { class: string }) {
  return (
    <svg viewBox="0 0 312 260" fill="none" aria-hidden="true" class={props.class}>
      <For each={edges}>
        {(edge) => (
          <>
            <path
              d={edge.path}
              pathLength="100"
              class="stroke-muted motion-safe:animate-graph-draw"
              stroke-opacity="0.5"
              stroke-dasharray="100"
              style={{ "animation-delay": edge.drawDelay }}
            />
            <path
              d={edge.path}
              pathLength="100"
              class="stroke-accent opacity-0 motion-safe:animate-graph-pulse"
              stroke-width="2"
              stroke-linecap="round"
              stroke-dasharray="10 110"
              style={{ "animation-delay": edge.pulseDelay }}
            />
          </>
        )}
      </For>
      <For each={edges}>
        {(edge) => (
          <g class="motion-safe:animate-graph-fade" style={{ "animation-delay": edge.labelDelay }}>
            <path
              d="M-5 -3L0 0L-5 3"
              transform={edge.arrow}
              class="stroke-muted"
              stroke-opacity="0.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <text
              x={edge.labelX}
              y={edge.labelY}
              text-anchor="middle"
              dominant-baseline="central"
              font-size="10.5"
              paint-order="stroke"
              stroke-width="6"
              stroke-linejoin="round"
              class="fill-muted stroke-canvas">
              {edge.label}
            </text>
          </g>
        )}
      </For>
      <For each={edges}>
        {(edge) => (
          <circle
            cx={edge.target.x}
            cy={edge.target.y}
            r={edge.target.radius}
            vector-effect="non-scaling-stroke"
            class="origin-center stroke-accent opacity-0 [transform-box:fill-box] motion-safe:animate-graph-ripple"
            style={{ "animation-delay": edge.rippleDelay }}
          />
        )}
      </For>
      <For each={nodeList}>
        {(node) => (
          <g class="motion-safe:animate-graph-fade" style={{ "animation-delay": node.delay }}>
            <circle
              cx={node.x}
              cy={node.y}
              r={node.radius}
              stroke-width="1.5"
              class={node.primary ? "fill-accent stroke-accent" : "fill-canvas stroke-secondary"}
            />
            <text
              x={node.x + node.labelX}
              y={node.y + node.labelY}
              text-anchor={node.anchor}
              dominant-baseline="central"
              font-size="13"
              paint-order="stroke"
              stroke-width="6"
              stroke-linejoin="round"
              class={node.primary ? "fill-ink stroke-canvas font-bold" : "fill-ink stroke-canvas"}>
              {node.label}
            </text>
          </g>
        )}
      </For>
    </svg>
  );
}
