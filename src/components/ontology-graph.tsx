import { For } from "solid-js";
import { profile } from "~/lib/profile";

type NodeId = "person" | "role" | "problem" | "product" | "user" | "feedback";

type GraphNode = {
  x: number;
  y: number;
  radius: number;
  label: string;
  labelX: number;
  labelY: number;
  anchor: "start" | "middle" | "end";
};

const nodes: Record<NodeId, GraphNode> = {
  person: { x: 70, y: 64, radius: 7, label: profile.name, labelX: 0, labelY: -20, anchor: "middle" },
  role: { x: 250, y: 40, radius: 5, label: profile.role, labelX: 0, labelY: -17, anchor: "middle" },
  problem: { x: 48, y: 210, radius: 5, label: "문제", labelX: 0, labelY: 20, anchor: "middle" },
  product: { x: 214, y: 154, radius: 6, label: "제품", labelX: 12, labelY: -12, anchor: "start" },
  user: { x: 304, y: 220, radius: 5, label: "사용자", labelX: 0, labelY: 20, anchor: "middle" },
  feedback: { x: 176, y: 244, radius: 5, label: "피드백", labelX: -13, labelY: 1, anchor: "end" },
};

const triples: [NodeId, string, NodeId][] = [
  ["person", "is a", "role"],
  ["person", "고민한다", "problem"],
  ["person", "만든다", "product"],
  ["product", "해결한다", "problem"],
  ["user", "사용한다", "product"],
  ["user", "남긴다", "feedback"],
  ["feedback", "다듬는다", "product"],
];

const nodeGap = 5;
const introDuration = 1.6;
const pulseStagger = 1;
const pulseTravel = 1.4;

const round = (value: number) => Math.round(value * 100) / 100;

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

  return {
    label,
    path: `M${startX} ${startY}L${endX} ${endY}`,
    arrow: `translate(${endX} ${endY}) rotate(${round((Math.atan2(deltaY, deltaX) * 180) / Math.PI)})`,
    labelX: round((startX + endX) / 2),
    labelY: round((startY + endY) / 2),
    targetX: target.x,
    targetY: target.y,
    targetRadius: target.radius,
    drawDelay: `${round(index * 0.12)}s`,
    labelDelay: `${round(index * 0.12 + 0.5)}s`,
    pulseDelay: `${round(introDuration + index * pulseStagger)}s`,
    rippleDelay: `${round(introDuration + index * pulseStagger + pulseTravel)}s`,
  };
});

const nodeList = Object.values(nodes).map((node, index) => ({ ...node, delay: `${round(index * 0.1)}s` }));

export function OntologyGraph(props: { class: string }) {
  return (
    <svg viewBox="24 8 312 250" fill="none" aria-hidden="true" class={props.class}>
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
            cx={edge.targetX}
            cy={edge.targetY}
            r={edge.targetRadius}
            vector-effect="non-scaling-stroke"
            class="origin-center stroke-accent opacity-0 [transform-box:fill-box] motion-safe:animate-graph-ripple"
            style={{ "animation-delay": edge.rippleDelay }}
          />
        )}
      </For>
      <For each={nodeList}>
        {(node, index) => (
          <g class="motion-safe:animate-graph-fade" style={{ "animation-delay": node.delay }}>
            <circle
              cx={node.x}
              cy={node.y}
              r={node.radius}
              stroke-width="1.5"
              class={index() === 0 ? "fill-accent stroke-accent" : "fill-canvas stroke-secondary"}
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
              class={index() === 0 ? "fill-ink stroke-canvas font-bold" : "fill-ink stroke-canvas"}>
              {node.label}
            </text>
          </g>
        )}
      </For>
    </svg>
  );
}
