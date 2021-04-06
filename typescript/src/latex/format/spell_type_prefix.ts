import { Spell } from "@src/mystic_spheres";
import { sentenceCase } from "change-case";

export function spellTypePrefix(
  spell: Pick<Spell, "castingTime" | "focus" | "tags" | "type">,
): string {
  const tags = spell.tags || [];
  if (spell.focus !== false) {
    tags.push("Focus");
  }
  const tagsText =
    tags && tags.length > 0
      ? `${tags
          .sort()
          .map((t) => `\\abilitytag{${t}}`)
          .join(", ")}`
      : "";
  const tagLine = tagsText ? `\\spelltwocol{${spell.type}}{${tagsText}}` : spell.type;

  if (spell.castingTime) {
    const castingTime =
      spell.castingTime === "minor action"
        ? `One \\glossterm{${spell.castingTime}}`
        : sentenceCase(spell.castingTime);
    return `${tagLine}\n\\noindent Casting time: ${castingTime}`;
  } else {
    return tagLine;
  }
}
