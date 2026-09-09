import { createMemo, For } from "solid-js";
import { BrandImage } from "~/components/brand-image";
import type { Skill } from "~/lib/portfolio/schemas";

export function SkillsContent(props: { data: Skill[] }) {
  const groups = createMemo(() => {
    const categories = new Map<string, Skill[]>();
    for (const skill of props.data) {
      const category = skill.category || "기타";
      const items = categories.get(category) ?? [];
      items.push(skill);
      categories.set(category, items);
    }
    return Array.from(
      categories,
      ([category, items]) => [category, items.sort((a, b) => Number(b.isMain) - Number(a.isMain))] as const,
    );
  });
  return (
    <For each={groups()}>
      {([category, items]) => (
        <div class="[&+div]:mt-5">
          <h3 class="mt-1 mb-1 font-medium text-caption text-muted">{category}</h3>
          <ul class="flex flex-wrap gap-x-4 gap-y-1">
            <For each={items}>
              {(skill) => (
                <li class="flex items-center gap-1 [&_img]:grayscale">
                  {skill.isMain ? (
                    <>
                      <BrandImage src={skill.icon} variant="icon" />
                      <strong>{skill.name}</strong>
                    </>
                  ) : (
                    skill.name
                  )}
                </li>
              )}
            </For>
          </ul>
        </div>
      )}
    </For>
  );
}
