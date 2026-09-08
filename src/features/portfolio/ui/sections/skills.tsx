import type { Skill } from "@/features/portfolio/model/schemas";

export function SkillsContent({ data }: { data: Skill[] }) {
  const groups = new Map<string, Skill[]>();
  for (const skill of data) {
    const category = skill.category || "기타";
    const items = groups.get(category) ?? [];
    items.push(skill);
    groups.set(category, items);
  }

  return Array.from(groups, ([category, items]) => (
    <div key={category} className="[&+div]:mt-5">
      <h3 className="mt-1 mb-1 font-medium text-caption text-muted">{category}</h3>
      <ul className="flex flex-wrap gap-x-4 gap-y-1">
        {items.map((skill) => (
          <li key={skill.id}>{skill.isMain ? <strong>{skill.name}</strong> : skill.name}</li>
        ))}
      </ul>
    </div>
  ));
}
