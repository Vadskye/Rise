import { CalculatedAttack, calculateStrike } from "@src/calculate";
import { DamageType, damageTypes } from "@src/data";
import * as format from "@src/latex/format";
import { MonsterBase } from "@src/monsters";
import { PassiveAbility } from "@src/monsters/reformat_monster_input";
import { Weapon } from "@src/weapons";
import { titleCase } from "change-case";
import { standardAttackEffect } from "./standard_attack_effect";

export function monsterToLatex(monster: MonsterBase): string {
  return `
  \\begin{monsection}${getMonsectionArgs(monster)}
    ${getTitleAndTypeHeader(monster).trim()}
    ${getMainContent(monster).trim()}
    ${getFooter(monster).trim()}
  \\end{monsection}
  ${getAbilities(monster).trim()}
  `;
}

function getMonsectionArgs(monster: MonsterBase) {
  return `${getMonsterName(monster)}{${monster.level}}[${monster.challengeRating}]`;
}

function getTitleAndTypeHeader(monster: MonsterBase) {
  return `\\vspace{-1em}\\spelltwocol{}{${titleCase(monster.size)} ${
    monster.monsterType
  }}\\vspace{-1em}`;
}

function getMonsterName({ name }: MonsterBase): string {
  const splitName = name.split(", ");
  if (splitName.length === 2) {
    return `{${titleCase(splitName[0])}}[${titleCase(splitName[1])}]`;
  } else if (splitName.length === 1) {
    return `{${titleCase(name)}}`;
  } else {
    throw new Error(`Name '${name}' has too many suffixes`);
  }
}

function getMainContent(monster: MonsterBase) {
  const extraDamageTypes = new Set<DamageType>();
  for (const damageType of damageTypes) {
    if (!["physical", "energy"].includes(damageType) && monster.resistanceBonuses[damageType]) {
      extraDamageTypes.add(damageType);
    }
  }
  if (monster.resistanceBonuses.physical !== monster.resistanceBonuses.energy) {
    extraDamageTypes.add("physical");
    extraDamageTypes.add("energy");
  }

  return `
    \\begin{spellcontent}
      \\begin{spelltargetinginfo}
        \\pari \\textbf{HP} ${monster.hitPoints};
          \\textbf{AD} ${monster.defenses.armor};
          \\textbf{Fort} ${monster.defenses.fortitude};
          \\textbf{Ref} ${monster.defenses.reflex};
          \\textbf{Ment} ${monster.defenses.mental}
        \\pari \\textbf{DR} ${
          extraDamageTypes.size > 0
            ? Array.from(extraDamageTypes)
                .map((t: DamageType) => `${titleCase(t)} ${monster.resistances.damage[t]}`)
                .join("; ")
            : monster.resistances.damage.physical
        }
        \\pari \\textbf{WR} ${
          extraDamageTypes.size > 0
            ? Array.from(extraDamageTypes)
                .map((t) => `${titleCase(t)} ${monster.resistances.wound[t]}`)
                .join("; ")
            : monster.resistances.wound.physical
        }
        ${getStrikes(monster)}
      \\end{spelltargetinginfo}
    \\end{spellcontent}
  `;
}

function getFooter(monster: MonsterBase) {
  return `
    \\begin{monsterfooter}
      \\pari \\textbf{Speed} ${format.feet(monster.speed)};
        \\textbf{Space} ${format.feet(monster.space)};
        \\textbf{Reach} ${format.feet(monster.reach)}
      \\pari \\textbf{Awareness} ${format.modifier(monster.skills.awareness)}
      \\pari \\textbf{Attributes}:
        Str ${monster.attributes.str}, Dex ${monster.attributes.dex}, Con ${monster.attributes.con},
        Int ${monster.attributes.int}, Per ${monster.attributes.per}, Wil ${monster.attributes.wil}
      \\pari \\textbf{Accuracy} ${monster.accuracy};
        ${getPower(monster).trim()}
    \\end{monsterfooter}
  `;
}

function getPower(monster: MonsterBase) {
  if (monster.mundanePower === monster.magicalPower) {
    return `\\textbf{Power} ${monster.mundanePower}`;
  } else {
    return `
      \\textbf{Mundane Power} ${monster.mundanePower};
      \\textbf{Magical Power} ${monster.magicalPower}
    `;
  }
}

function getAbilities(monster: MonsterBase) {
  if (monster.attacks.length > 0 || monster.passiveAbilities.length > 0) {
    return `
      ${getAttacks(monster)}
      ${getPassiveAbilities(monster)}
    `;
  } else {
    return "";
  }
}

function getAttacks(monster: MonsterBase) {
  // TODO: fix
  return monster.calculatedAttacks.map(formatAttack).join("\n");
}

function formatAttack(attack: CalculatedAttack) {
  // TODO: add attack tags
  const tagText = "";
  const targetTag = attack.target.toLowerCase().startsWith("one") ? "target" : "targets";
  return `
    \\begin{freeability}{${titleCase(attack.name)}}${tagText}
      \\${targetTag}{${attack.target}}
      ${standardAttackEffect(attack).trim()}
    \\end{freeability}
  `;
}

function getStrikes(monster: MonsterBase) {
  if (monster.weapons.length === 0) {
    return "";
  }
  return `\\pari \\textbf{${monster.weapons.length === 1 ? "Strike" : "Strikes"}:}
            ${monster.weapons.map((w) => formatStrike(monster, w)).join("; ")}`;
}

function formatStrike(monster: MonsterBase, weapon: Weapon) {
  const name = titleCase(weapon.name);
  const strike = calculateStrike(monster, weapon);
  return `${name} \\plus${strike.accuracy} (${format.damageDice(strike.power)})`;
}

function getPassiveAbilities(monster: MonsterBase) {
  return monster.passiveAbilities.map(formatPassiveAbility).join("\n    ");
}

function formatPassiveAbility(ability: PassiveAbility) {
  return `\\parhead{${ability.name}} ${ability.description}`;
}
