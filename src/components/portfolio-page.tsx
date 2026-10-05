import { LogoMark } from "~/components/logo-mark";
import { ProfileHeader, ProfileLinks } from "~/components/profile-header";
import { RecordEntries } from "~/components/record-entries";
import { RichText } from "~/components/rich-text";
import { Section } from "~/components/section";
import { CertificatesContent } from "~/components/sections/certificates";
import { ProjectsContent } from "~/components/sections/projects";
import { SkillsContent } from "~/components/sections/skills";
import { SiteFooter } from "~/components/site-footer";
import { TimelineEntries } from "~/components/timeline-entries";
import { formatPeriod } from "~/lib/format-date";
import type { RenderedPortfolioData } from "~/lib/portfolio/types";
import { profile } from "~/lib/profile";

export function PortfolioPage(props: { data: RenderedPortfolioData }) {
  return (
    <div class="page-column pt-24 pb-10 max-sm:pt-12 print:p-0!">
      <header class="pb-16 max-sm:pb-12">
        <LogoMark draw class="mb-6 size-7 text-ink print:hidden" />
        <ProfileHeader introduction={profile.introduction}>
          <ProfileLinks class="tap-target" />
        </ProfileHeader>
      </header>
      <main>
        <Section id="about" title="소개" result={props.data.about}>
          {(about) => <RichText>{about.content}</RichText>}
        </Section>
        <Section id="education" title="학력" result={props.data.education}>
          {(items) => <TimelineEntries items={items} label={(item) => item.department} />}
        </Section>
        <Section id="careers" title="경력" result={props.data.careers}>
          {(items) => <TimelineEntries items={items} label={(item) => item.role} />}
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
          {(items) => <CertificatesContent items={items} />}
        </Section>
        <Section id="skills" title="기술" result={props.data.skills}>
          {(items) => <SkillsContent items={items} />}
        </Section>
        <Section id="experiences" title="경험" result={props.data.experiences}>
          {(items) => <TimelineEntries items={items} label={(item) => item.role} />}
        </Section>
        <Section id="projects" title="프로젝트" result={props.data.projects}>
          {(items) => <ProjectsContent items={items} />}
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
      </main>
      <SiteFooter class="mt-8 border-line border-t pt-6 text-caption print:hidden" />
    </div>
  );
}
