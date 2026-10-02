export function BrokenEdge() {
  return (
    <svg viewBox="0 0 120 24" fill="none" aria-hidden="true" class="mb-6 block h-6 w-[120px]">
      <path
        d="M19 12H76"
        pathLength="100"
        stroke-dasharray="100"
        stroke-opacity="0.5"
        class="stroke-muted motion-safe:animate-graph-draw"
      />
      <circle
        cx="108"
        cy="12"
        r="5"
        stroke-width="1.5"
        stroke-dasharray="3 2.5"
        class="stroke-muted motion-safe:animate-graph-fade"
        style={{ "animation-delay": "0.9s" }}
      />
      <circle cx="8" cy="12" r="6" class="fill-accent" />
    </svg>
  );
}
