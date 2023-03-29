import { SpellLike } from "@src/mystic_spheres";
import { sentenceCase } from "change-case";
import { formatTagLatex} from "@src/latex/format/ability_tag";

export function spellTypePrefix(
  spell: Pick<SpellLike, "castingTime" | "tags" | "type" | "rank">,
): string {
  const tags = spell.tags || [];
  if (spell.type) {
    if (spell.type.includes('(')) {
      // grab the bits inside the parentheses
      const inParens = spell.type.replace(/^.*\(/, '').replace(/\).*$/, '');
      if (spell.type.includes('Attune')) {
        tags.push(`\\abilitytag{Attune} (${inParens})`);
      } else if (spell.type.includes('Sustain')) {
        tags.push(`\\abilitytag{Sustain} (${inParens})`);
      } else {
        throw new Error(`Unrecognized type with parens: ${spell.type}`)
      }
    } else {
      tags.push(spell.type)
    }
  }
  const tagsText =
    tags && tags.length > 0
      ? `${tags
          .sort()
          .map(formatTagLatex)
          .join(", ")}`
      : "";

  if (spell.castingTime) {
    const castingText =
      spell.castingTime === "minor action"
        ? `One \\glossterm{${spell.castingTime}}`
        : sentenceCase(spell.castingTime);
    return `\\spelltwocol{Casting time: ${castingText}}{${tagsText}}`;
  } else if (tagsText) {
    return `\\spelltwocol{}{${tagsText}}`;
  } else {
    return '';
  }
}
