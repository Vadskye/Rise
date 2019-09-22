import { CalculatedAttack, calculateStrike } from "@src/calculate";
import { resistanceTypes } from "@src/data";
import * as format from "@src/latex/format";
import { MonsterBase } from "@src/monsters";
import { Weapon } from "@src/weapons";
import { titleCase } from "change-case";
import { standardAttackEffect } from "./standard_attack_effect";

export function monsterToLatex(monster: MonsterBase): string {
  return `
  \\begin{monsection}${getMonsectionArgs(monster)}
    ${getTitleAndTypeHeader(monster)}
    ${getMainContent(monster)}
    ${getFooter(monster)}
  \\end{monsection}
  \\subsubsection{${monster.name} Abilities}
    ${getAttacks(monster)}
  `;
}

function getMonsectionArgs(monster: MonsterBase) {
  return `${getName(monster)}{${monster.level}}[${monster.challengeRating}]`;
}

function getTitleAndTypeHeader(monster: MonsterBase) {
  return `\\vspace{-1em}\\spelltwocol{${titleCase(monster.size)} ${
    monster.monsterType
  }}\\vspace{-1em}`;
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

function getMainContent(monster: MonsterBase) {
  const extraDamageResistances = [];
  const extraWoundResistances = [];
  for (const resistanceType of resistanceTypes) {
    if (monster.resistanceBonuses[resistanceType]) {
      const title = titleCase(resistanceType);
      extraDamageResistances.push(`${title} ${monster.resistances.damage[resistanceType]}`);
      extraWoundResistances.push(`${title} ${monster.resistances.wound[resistanceType]}`);
    }
  }
  return `
    \\begin{spellcontent}
      \\begin{spelltargetinginfo}
        \\pari \\textbf{HP} ${monster.hitPoints};
          \\textbf{AD} ${monster.defenses.armor};
          \\textbf{Fort} ${monster.defenses.fortitude};
          \\textbf{Ref} ${monster.defenses.reflex};
          \\textbf{Ment} ${monster.defenses.mental}
        \\pari \\textbf{DR} ${monster.resistances.damage.global}${
    extraDamageResistances.length > 0 ? "; " + extraDamageResistances.join("; ") : ""
  }
        \\pari \\textbf{WR} ${monster.resistances.wound.global}${
    extraWoundResistances.length > 0 ? "; " + extraWoundResistances.join("; ") : ""
  }
        \\pari \\textbf{Accuracy} ${monster.accuracy};
          \\textbf{Mundane} ${monster.mundanePower};
          \\textbf{Magical} ${monster.magicalPower}
        ${getStrikes(monster)}
      \\end{spelltargetinginfo}
    \\end{spellcontent}
  `;
}

function getFooter(monster: MonsterBase) {
  return `
    \\begin{monsterfooter}
      \\pari \\textbf{Awareness} ${monster.skills.awareness}
      \\pari \\textbf{Speed} ${format.feet(monster.speed)};
        \\textbf{Space} ${format.feet(monster.space)};
        \\textbf{Reach} ${format.feet(monster.reach)}
      \\pari \\textbf{Attributes}:
        Str ${monster.attributes.str}, Dex ${monster.attributes.dex}, Con ${monster.attributes.con},
        Int ${monster.attributes.int}, Per ${monster.attributes.per}, Wil ${monster.attributes.wil}
    \\end{monsterfooter}
  `;
}

function getAttacks(monster: MonsterBase) {
  // TODO: fix
  return monster.calculatedAttacks.map(formatAttack).join("\n");
}

function formatAttack(attack: CalculatedAttack) {
  // TODO: add attack tags
  const tagText = "";
  return `
    \\begin{freeability}{${titleCase(attack.name)}}${tagText}
      \\target{${attack.target}}
      ${standardAttackEffect(attack)}
    \end{freeability}
  `;
}

function getStrikes(monster: MonsterBase) {
  if (monster.weapons.length === 0) {
    return "";
  }
  return `
    \\pari \\textbf{${monster.weapons.length === 1 ? "Strike" : "Strikes"}:}
      ${monster.weapons.map((w) => formatStrike(monster, w)).join("; ")}
  `;
}

function formatStrike(monster: MonsterBase, weapon: Weapon) {
  const strike = calculateStrike(monster, weapon);
  return `
    ${weapon.name} \\plus${strike.accuracy} (${format.damageDice(strike.power)})
  `;
}
