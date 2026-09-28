import { RecordEntries } from "~/components/record-entries";
import { RichText } from "~/components/rich-text";
import { Section } from "~/components/section";
import { CertificatesContent } from "~/components/sections/certificates";
import { ProjectsContent } from "~/components/sections/projects";
import { SkillsContent } from "~/components/sections/skills";
import { TimelineEntries } from "~/components/timeline-entries";
import { formatPeriod } from "~/lib/format-date";
import type { RenderedPortfolioData } from "~/lib/portfolio/types";

export function PortfolioContent(props: { data: RenderedPortfolioData }) {
  return (
    <>
      <Section id="about" title="소개" result={props.data.about}>
        {(about) => <RichText>{about.content}</RichText>}
      </Section>
      <Section id="education" title="학력" result={props.data.education}>
        {(items) => (
          <TimelineEntries
            items={items}
            title={(item) => item.organization || item.department}
            subtitle={(item) => (item.organization ? item.department : null)}
          />
        )}
      </Section>
      <Section id="careers" title="경력" result={props.data.careers}>
        {(items) => (
          <TimelineEntries
            items={items}
            title={(item) => item.organization || item.role}
            subtitle={(item) => (item.organization ? item.role : null)}
          />
        )}
      </Section>
      <Section id="awards" title="수상" result={props.data.awards}>
        {(items) => (
          <RecordEntries
            items={items}
            subtitle={(item) => item.tier}
            period={(item) => item.date}
            url={(item) => item.url}
          />
        )}
      </Section>
      <Section id="certificates" title="자격증" result={props.data.certificates}>
        {(items) => <CertificatesContent data={items} />}
      </Section>
      <Section id="skills" title="기술" result={props.data.skills}>
        {(items) => <SkillsContent data={items} />}
      </Section>
      <Section id="experiences" title="경험" result={props.data.experiences}>
        {(items) => (
          <TimelineEntries
            items={items}
            title={(item) => item.organization || item.role}
            subtitle={(item) => (item.organization ? item.role : null)}
          />
        )}
      </Section>
      <Section id="projects" title="프로젝트" result={props.data.projects}>
        {(items) => <ProjectsContent data={items} />}
      </Section>
      <Section id="activities" title="활동" result={props.data.activities}>
        {(items) => (
          <RecordEntries
            items={items}
            subtitle={(item) => [item.role, ...item.hosts].filter(Boolean).join(" · ")}
            period={(item) => formatPeriod(item.startDate, item.endDate)}
          />
        )}
      </Section>
    </>
  );
}
