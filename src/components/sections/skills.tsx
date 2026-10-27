import { createMemo, For, Show } from "solid-js";
import { EntryIcon } from "~/components/entry";
import type { Skill } from "~/lib/portfolio/schemas";

export function SkillsContent(props: { items: Skill[] }) {
  const groups = createMemo(() => {
    const categories = new Map<string, Skill[]>();
    for (const skill of props.items) {
      const category = skill.category || "기타";
      categories.set(category, [...(categories.get(category) ?? []), skill]);
    }
    return Array.from(categories, ([name, skills]) => ({
      name,
      skills: skills.sort((a, b) => Number(b.isMain) - Number(a.isMain)),
    }));
  });
  return (
    <For each={groups()}>
      {(group) => (
        <div class="reveal grid grid-cols-[7rem_minmax(0,1fr)] items-start gap-x-6 border-line border-t py-4 first:border-t-0 first:pt-0 last:pb-0 max-sm:grid-cols-1 max-sm:gap-y-2">
          <h3 class="text-caption text-muted leading-[calc(var(--text-body)*var(--leading-body))]">{group.name}</h3>
          <ul role="list" class="flex flex-wrap items-center gap-x-4 gap-y-1">
            <For each={group.skills}>
              {(skill) => (
                <li class="flex items-center gap-1.5">
                  <Show when={skill.isMain} fallback={<span class="text-secondary">{skill.name}</span>}>
                    <Show when={skill.icon}>
                      {(icon) => <EntryIcon src={icon()} label={skill.name} variant="skill" />}
                    </Show>
                    <strong class="font-semibold">{skill.name}</strong>
                  </Show>
                </li>
              )}
            </For>
          </ul>
        </div>
      )}
    </For>
  );
}
