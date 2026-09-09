import { createMemo, For, Show } from "solid-js";
import type { Skill } from "~/lib/portfolio/schemas";

export function SkillsContent(props: { data: Skill[] }) {
  const groups = createMemo(() => {
    const categories = new Map<string, Skill[]>();
    for (const skill of props.data) {
      const category = skill.category || "기타";
      if (!categories.has(category)) categories.set(category, []);
      categories.get(category)!.push(skill);
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
          <h3 class="mt-1 mb-1 font-medium text-caption text-muted">{group.name}</h3>
          <ul class="flex flex-wrap gap-x-4 gap-y-1">
            <For each={group.skills}>
              {(skill) => (
                <li class="flex items-center gap-1">
                  <Show when={skill.isMain} fallback={skill.name}>
                    <Show when={skill.icon}>
                      {(icon) => (
                        <img
                          src={icon()}
                          alt=""
                          width={24}
                          height={24}
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                          class="block size-6 shrink-0 rounded-ui object-contain p-0.5"
                        />
                      )}
                    </Show>
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
