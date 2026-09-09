import type { JSX } from "solid-js";
export interface SectionIdentity {
  id: string;
  title: string;
}
export function Section(
  props: SectionIdentity & {
    children: JSX.Element;
  },
) {
  return (
    <section
      id={props.id}
      class="scroll-mt-8 border-line border-t pt-10 pb-12 max-[40rem]:pt-8 max-[40rem]:pb-10"
      aria-labelledby={`${props.id}-title`}>
      <h2 id={`${props.id}-title`} class="mb-6 font-bold text-section tracking-[-0.015em]">
        {props.title}
      </h2>
      <div class="min-w-0">{props.children}</div>
    </section>
  );
}
