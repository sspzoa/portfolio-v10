import { type Component, Show } from "solid-js";
import { Section, type SectionIdentity } from "~/components/section";
import { AboutContent } from "~/components/sections/about";
import { ActivitiesContent } from "~/components/sections/activities";
import { AwardsContent } from "~/components/sections/awards";
import { CareersContent } from "~/components/sections/careers";
import { CertificatesContent } from "~/components/sections/certificates";
import { EducationContent } from "~/components/sections/education";
import { ExperiencesContent } from "~/components/sections/experiences";
import { ProjectsContent } from "~/components/sections/projects";
import { SkillsContent } from "~/components/sections/skills";
import type { PortfolioData, SectionResult } from "~/lib/server/portfolio/load-portfolio";

function PortfolioSection<T>(
  props: SectionIdentity & { result: SectionResult<T | null>; content: Component<{ data: T }> },
) {
  const data = () => props.result.data;
  const visible = () => {
    const value = data();
    return props.result.error || (value !== null && (!Array.isArray(value) || value.length > 0));
  };
  return (
    <Show when={visible()}>
      <Section id={props.id} title={props.title}>
        <Show
          when={props.result.error}
          fallback={
            <Show when={data()} keyed>
              {(value) => <props.content data={value} />}
            </Show>
          }>
          <p class="text-caption text-muted">{props.result.error}</p>
        </Show>
      </Section>
    </Show>
  );
}

export function PortfolioContent(props: { data: PortfolioData }) {
  return (
    <>
      <PortfolioSection id="about" title="소개" result={props.data.about} content={AboutContent} />
      <PortfolioSection id="careers" title="경력" result={props.data.careers} content={CareersContent} />
      <PortfolioSection id="projects" title="프로젝트" result={props.data.projects} content={ProjectsContent} />
      <PortfolioSection id="experiences" title="경험" result={props.data.experiences} content={ExperiencesContent} />
      <PortfolioSection id="education" title="학력" result={props.data.education} content={EducationContent} />
      <PortfolioSection id="skills" title="기술" result={props.data.skills} content={SkillsContent} />
      <PortfolioSection id="awards" title="수상" result={props.data.awards} content={AwardsContent} />
      <PortfolioSection
        id="certificates"
        title="자격증"
        result={props.data.certificates}
        content={CertificatesContent}
      />
      <PortfolioSection id="activities" title="활동" result={props.data.activities} content={ActivitiesContent} />
    </>
  );
}
