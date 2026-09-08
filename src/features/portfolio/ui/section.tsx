import type { ReactNode } from "react";

export interface SectionIdentity {
  id: string;
  title: string;
}

export function Section({ id, title, children }: SectionIdentity & { children: ReactNode }) {
  return (
    <section id={id} className="portfolio-section" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="section-title">
        {title}
      </h2>
      <div className="section-body">{children}</div>
    </section>
  );
}
