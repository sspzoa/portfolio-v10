export function GraphMark(props: { class: string; draw?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" class={props.class}>
      <path
        d="M6 6L19 9L10.5 19Z"
        pathLength="100"
        stroke-dasharray="100"
        stroke-linejoin="round"
        class={props.draw ? "stroke-muted motion-safe:animate-graph-draw" : "stroke-muted"}
      />
      <circle cx="19" cy="9" r="2.25" stroke-width="1.25" class="fill-canvas stroke-secondary" />
      <circle cx="10.5" cy="19" r="2.25" stroke-width="1.25" class="fill-canvas stroke-secondary" />
      <circle cx="6" cy="6" r="3" class="fill-accent" />
    </svg>
  );
}
