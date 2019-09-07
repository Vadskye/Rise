import { attributesAtLevel } from "@src/calculate/attributes_at_level";
import { skillModifierByName } from "@src/calculate/skill_modifier_by_name";
import { MonsterBase } from "@src/monsters";
import { titleCase } from "change-case";

export function monsterToLatex(monster: MonsterBase): string {
  return `
    \\begin{monsection}${getMonsectionArgs(monster)}
      ${getTitleAndSpeciesHeader(monster)}
      ${getFooter(monster)}
    \\end{monsection}
  `;
}

function getMonsectionArgs(monster: MonsterBase) {
  return `${getName(monster)}{${monster.level}}[${monster.challengeRating}]`;
}

function getTitleAndSpeciesHeader(monster: MonsterBase) {
  return `\\vspace{-1em}\\spelltwocol{${titleCase(monster.size)} ${monster.type}}\\vspace{-1em}`;
}

function getName({ name }: MonsterBase): string {
  const splitName = name.split(", ");
  if (splitName.length === 2) {
    return `{${splitName[0]}}[${splitName[1]}]`;
  } else if (splitName.length === 1) {
    return `{${name}}`;
  } else {
    throw new Error(`Name '${name}' has too many suffixes`);
  }
}

function getFooter(monster: MonsterBase) {
  const attributes = attributesAtLevel(monster);
  const awareness = skillModifierByName({
    attributes,
    level: monster.level,
    name: "awareness",
    skillPoints: monster.skills.awareness,
  });
  return `
    \\begin{monsterfooter}
      \\pari \\textbf<Awareness>
    \\end{monsterfooter}
  `;
}
