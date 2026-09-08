import type { ReactNode } from "react";

export interface SectionIdentity {
  id: string;
  title: string;
}

export function Section({ id, title, children }: SectionIdentity & { children: ReactNode }) {
  return (
    <section
      id={id}
      className="scroll-mt-8 border-line border-t pt-10 pb-12 max-[40rem]:pt-8 max-[40rem]:pb-10"
      aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="mb-6 font-bold text-section tracking-[-0.015em]">
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
