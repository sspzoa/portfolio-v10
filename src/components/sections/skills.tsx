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
        <div class="[&+div]:mt-5">
          <h3 class="my-1 text-caption text-muted tracking-[0.01em]">{group.name}</h3>
          <ul role="list" class="flex flex-wrap gap-x-4 gap-y-2">
            <For each={group.skills}>
              {(skill) => (
                <li class="flex items-center gap-1">
                  <Show when={skill.isMain} fallback={skill.name}>
                    <Show when={skill.icon}>{(icon) => <EntryIcon src={icon()} variant="skill" />}</Show>
                    <strong>{skill.name}</strong>
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
