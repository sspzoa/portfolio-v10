import { type JSX, Match, Show, Switch } from "solid-js";
import type { SectionResult } from "~/lib/portfolio/types";

export function Section<T>(props: {
  id: string;
  title: string;
  result: SectionResult<T>;
  children: (data: NonNullable<T>) => JSX.Element;
}) {
  const data = () => props.result.data;
  const hasContent = () => {
    const value = data();
    return props.result.error !== null || (value != null && (!Array.isArray(value) || value.length > 0));
  };
  return (
    <Show when={hasContent()}>
      <section
        aria-labelledby={`${props.id}-title`}
        class="section-timeline relative pt-10 pb-12 after:absolute after:top-0 after:right-0 after:left-3 after:origin-left after:border-line after:border-t after:content-empty motion-safe:supports-timeline:after:animate-section-rule max-sm:pt-8 max-sm:pb-10">
        <span
          aria-hidden="true"
          class="node pointer-events-none absolute top-[-3px] left-0 before:absolute before:inset-[-1.5px] before:rounded-full before:border before:border-accent before:opacity-0 before:content-empty motion-safe:supports-timeline:before:animate-section-ripple"
        />
        <h2 id={`${props.id}-title`} class="mb-6 font-bold text-section tracking-[-0.015em]">
          {props.title}
        </h2>
        <Switch>
          <Match when={props.result.error}>
            {(message) => (
              <p class="flex items-center gap-2 text-caption text-muted">
                <span aria-hidden="true" class="node border-muted border-dashed" />
                {message()}
              </p>
            )}
          </Match>
          <Match when={data()} keyed>
            {(value) => props.children(value)}
          </Match>
        </Switch>
      </section>
    </Show>
  );
}
