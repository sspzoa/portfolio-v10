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
    <div key={category} className="skill-group">
      <h3 className="entry-meta">{category}</h3>
      <ul className="skill-list">
        {items.map((skill) => (
          <li key={skill.id}>{skill.isMain ? <strong>{skill.name}</strong> : skill.name}</li>
        ))}
      </ul>
    </div>
  ));
}
