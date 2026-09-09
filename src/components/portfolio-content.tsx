import { For } from "solid-js";
import { RecordEntry, TimelineEntry } from "~/components/entries";
import { RichText } from "~/components/rich-text";
import { Section } from "~/components/section";
import { ProjectsContent } from "~/components/sections/projects";
import { SkillsContent } from "~/components/sections/skills";
import { formatPeriod } from "~/lib/format-date";
import type { PortfolioData } from "~/lib/portfolio/types";

export function PortfolioContent(props: { data: PortfolioData }) {
  return (
    <>
      <Section id="about" title="소개" result={props.data.about}>
        {(about) => <RichText>{about.content}</RichText>}
      </Section>
      <Section id="careers" title="경력" result={props.data.careers}>
        {(items) => (
          <ul class="flex flex-col gap-10">
            <For each={items}>
              {(item) => (
                <TimelineEntry
                  title={item.organization || item.role}
                  subtitle={item.organization ? item.role : null}
                  description={item.description}
                  start={item.startDate}
                  end={item.endDate}
                  logo={item.logo}
                />
              )}
            </For>
          </ul>
        )}
      </Section>
      <Section id="projects" title="프로젝트" result={props.data.projects}>
        {(items) => <ProjectsContent data={items} />}
      </Section>
      <Section id="experiences" title="경험" result={props.data.experiences}>
        {(items) => (
          <ul class="flex flex-col gap-10">
            <For each={items}>
              {(item) => (
                <TimelineEntry
                  title={item.organization || item.role}
                  subtitle={item.organization ? item.role : null}
                  description={item.description}
                  start={item.startDate}
                  end={item.endDate}
                  logo={item.logo}
                />
              )}
            </For>
          </ul>
        )}
      </Section>
      <Section id="education" title="학력" result={props.data.education}>
        {(items) => (
          <ul class="flex flex-col gap-10">
            <For each={items}>
              {(item) => (
                <TimelineEntry
                  title={item.organization || item.department}
                  subtitle={item.organization ? item.department : null}
                  description={item.description}
                  start={item.startDate}
                  end={item.endDate}
                  logo={item.logo}
                />
              )}
            </For>
          </ul>
        )}
      </Section>
      <Section id="skills" title="기술" result={props.data.skills}>
        {(items) => <SkillsContent data={items} />}
      </Section>
      <Section id="awards" title="수상" result={props.data.awards}>
        {(items) => (
          <ul class="flex flex-col gap-5">
            <For each={items}>
              {(item) => <RecordEntry title={item.name} subtitle={item.tier} period={item.date} />}
            </For>
          </ul>
        )}
      </Section>
      <Section id="certificates" title="자격증" result={props.data.certificates}>
        {(items) => (
          <ul class="flex flex-col gap-5">
            <For each={items}>
              {(item) => (
                <RecordEntry
                  title={item.name}
                  subtitle={[item.kind, item.institution].filter(Boolean).join(" · ")}
                  period={item.date}
                />
              )}
            </For>
          </ul>
        )}
      </Section>
      <Section id="activities" title="활동" result={props.data.activities}>
        {(items) => (
          <ul class="flex flex-col gap-5">
            <For each={items}>
              {(item) => (
                <RecordEntry
                  title={item.name}
                  subtitle={[item.role, ...item.hosts].filter(Boolean).join(" · ")}
                  period={formatPeriod(item.startDate, item.endDate)}
                />
              )}
            </For>
          </ul>
        )}
      </Section>
    </>
  );
}
