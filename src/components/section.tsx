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
        class="section-timeline relative pt-10 pb-12 after:absolute after:inset-x-0 after:top-0 after:origin-left after:border-line after:border-t after:content-empty motion-safe:supports-timeline:after:animate-section-rule max-sm:pt-8 max-sm:pb-10">
        <h2 id={`${props.id}-title`} class="mb-6 font-semibold text-section tracking-[-0.02em]">
          {props.title}
        </h2>
        <Switch>
          <Match when={props.result.error}>{(message) => <p class="text-caption text-muted">{message()}</p>}</Match>
          <Match when={data()} keyed>
            {(value) => props.children(value)}
          </Match>
        </Switch>
      </section>
    </Show>
  );
}
