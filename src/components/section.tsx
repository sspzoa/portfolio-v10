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
        id={props.id}
        aria-labelledby={`${props.id}-title`}
        class="scroll-mt-8 border-line border-t pt-10 pb-12 max-[40rem]:pt-8 max-[40rem]:pb-10">
        <h2 id={`${props.id}-title`} class="mb-6 font-bold text-section tracking-[-0.015em]">
          {props.title}
        </h2>
        <div class="min-w-0">
          <Show when={props.result.error} fallback={<Show when={data()}>{(value) => props.children(value())}</Show>}>
            <p class="text-caption text-muted">{props.result.error}</p>
          </Show>
        </div>
      </section>
    </Show>
  );
}
