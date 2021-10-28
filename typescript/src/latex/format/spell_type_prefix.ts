import { SpellLike } from "@src/mystic_spheres";
import { sentenceCase } from "change-case";

export function spellTypePrefix(
  spell: Pick<SpellLike, "castingTime" | "tags" | "type" | "rank">,
): string {
  const tags = spell.tags || [];
  const tagsText =
    tags && tags.length > 0
      ? `${tags
          .sort()
          .map((t) => (t.includes("abilitytag") ? t : `\\abilitytag{${t}}`))
          .join(", ")}`
      : "";
  const rankText = spell.rank ? `Rank ${spell.rank}` : "";
  const tagLine: string = tagsText || rankText ? `\\spelltwocol{${tagsText}}{${rankText}}` : "";

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
