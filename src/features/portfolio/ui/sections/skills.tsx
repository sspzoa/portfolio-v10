import type { Skill } from "@/features/portfolio/model/schemas";
import { BrandImage } from "../brand-image";

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
          <li key={skill.id} className="skill-item">
            <BrandImage src={skill.icon} variant="icon" />
            {skill.isMain ? <strong>{skill.name}</strong> : <span>{skill.name}</span>}
          </li>
        ))}
      </ul>
    </div>
  ));
}
