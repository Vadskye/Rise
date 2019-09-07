import { reachBySize } from "@src/calculate/reach_by_size";
import { spaceBySize } from "@src/calculate/space_by_size";
import { speedBySize } from "@src/calculate/speed_by_size";
import * as format from "@src/latex/format";
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
  return `
    \\begin{monsterfooter}
      \\pari \\textbf{Awareness} ${monster.skills.awareness}
      \\pari \\textbf{Speed} ${format.feet(speedBySize(monster.size))};
        \\textbf{Space} ${format.feet(spaceBySize(monster.size))};
        \\textbf{Reach} ${format.feet(reachBySize(monster.size))}
      \\pari \\textbf{Attributes}:
        Str ${monster.attributes.str}, Dex ${monster.attributes.dex}, Con ${monster.attributes.con},
        Int ${monster.attributes.int}, Per ${monster.attributes.per}, Wil ${monster.attributes.wil}
    \\end{monsterfooter}
  `;
}
