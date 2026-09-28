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
          <h3 class="mt-1 mb-1 font-medium text-caption text-muted tracking-[0.01em]">{group.name}</h3>
          <ul class="flex flex-wrap gap-x-4 gap-y-2">
            <For each={group.skills}>
              {(skill) => (
                <li class="flex items-center gap-1">
                  <Show when={skill.isMain}>
                    <Show when={skill.icon}>
                      {(icon) => (
                        <div class="media-tile size-6 p-0.5">
                          <img
                            src={icon()}
                            alt=""
                            width={18}
                            height={18}
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            class="size-full object-contain"
                          />
                        </div>
                      )}
                    </Show>
                  </Show>
                  {skill.isMain ? <strong>{skill.name}</strong> : skill.name}
                </li>
              )}
            </For>
          </ul>
        </div>
      )}
    </For>
  );
}
