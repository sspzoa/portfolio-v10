import { type JSX, Show } from "solid-js";
import type { SectionResult } from "~/lib/portfolio/types";

export function Section<T>(props: {
  id: string;
  title: string;
  result: SectionResult<T>;
  children: (data: NonNullable<T>) => JSX.Element;
}) {
  const data = () => props.result.data;
  const visible = () => {
    const value = data();
    return props.result.error || (value != null && (!Array.isArray(value) || value.length > 0));
  };
  return (
    <Show when={visible()}>
      <section
        aria-labelledby={`${props.id}-title`}
        class="section-timeline relative pt-10 pb-12 after:absolute after:top-0 after:right-0 after:left-3 after:origin-left after:border-line after:border-t after:content-empty motion-safe:supports-timeline:after:animate-section-rule max-[40rem]:pt-8 max-[40rem]:pb-10">
        <span
          aria-hidden="true"
          class="node pointer-events-none absolute top-[-3px] left-0 before:absolute before:inset-[-1.5px] before:rounded-full before:border before:border-accent before:opacity-0 before:content-empty motion-safe:supports-timeline:before:animate-section-ripple"
        />
        <h2 id={`${props.id}-title`} class="mb-6 font-bold text-section tracking-[-0.015em]">
          {props.title}
        </h2>
        <div class="min-w-0">
          <Show when={props.result.error} fallback={<Show when={data()}>{(value) => props.children(value())}</Show>}>
            <p class="flex items-center gap-2 text-caption text-muted">
              <span aria-hidden="true" class="node border-muted border-dashed" />
              {props.result.error}
            </p>
          </Show>
        </div>
      </section>
    </Show>
  );
}
