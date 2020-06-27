import { CalculatedAttack, calculateStrike } from "@src/calculate";
import { DamageType, damageTypes } from "@src/data";
import * as format from "@src/latex/format";
import { MonsterBase } from "@src/monsters";
import { MovementMode, movementModes } from "@src/movement_modes";
import { PassiveAbility } from "@src/passive_abilities";
import { Weapon } from "@src/weapons";
import { sentenceCase, titleCase } from "change-case";
import _ from "lodash";
import { standardAttackEffect } from "./standard_attack_effect";

export function monsterToLatex(monster: MonsterBase): string {
  return `
  \\begin{monsection}${getMonsectionArgs(monster)}
    ${getTitleAndTypeHeader(monster).trim()}
    \\vspace{0em}

    ${monster.description}

    ${getMainContent(monster).trim()}
    ${getFooter(monster).trim()}
  \\end{monsection}
  ${getAbilities(monster).trim()}
  `
    .replace(/\$name/g, getMonsterName(monster).toLowerCase())
    .replace(/\$Name/g, sentenceCase(getMonsterName(monster)));
}

function getMonsectionArgs(monster: MonsterBase) {
  return `${getMonsterNameHeader(monster)}{${monster.level}}[${monster.challengeRating}]`;
}

function getTitleAndTypeHeader(monster: MonsterBase) {
  return `\\vspace{-1em}\\spelltwocol{}{${titleCase(monster.size)} ${
    monster.monsterType
  }}\\vspace{-1em}`;
}

function getMonsterName({ name }: MonsterBase): string {
  const splitName = name.split(", ");
  if (splitName.length === 2) {
    return `${splitName[1]} ${splitName[0]}`;
  } else if (splitName.length === 1) {
    return name;
  } else {
    throw new Error(`Name '${name}' has too many suffixes`);
  }
}

function getMonsterNameHeader({ name }: MonsterBase): string {
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
        \\pari \\textbf{VR} ${
          extraDamageTypes.size > 0
            ? Array.from(extraDamageTypes)
                .map((t) => `${titleCase(t)} ${monster.resistances.vital[t]}`)
                .join("; ")
            : monster.resistances.vital.physical
        }
        ${getStrikes(monster)}
      \\end{spelltargetinginfo}
    \\end{spellcontent}
  `;
}

function getFooter(monster: MonsterBase) {
  return `
    \\begin{monsterfooter}
      \\pari ${formatSpeeds(monster)};
        \\textbf{Space} ${format.feet(monster.space)};
        \\textbf{Reach} ${format.feet(monster.reach)}
      \\pari \\textbf{Awareness} ${format.modifier(monster.skills.awareness)}
      \\pari \\textbf{Attributes}:
        Str ${format.attribute(monster.attributes.str)}, Dex ${format.attribute(
    monster.attributes.dex,
  )},
        Con ${format.attribute(monster.attributes.con)}, Int ${format.attribute(
    monster.attributes.int,
  )},
        Per ${format.attribute(monster.attributes.per)}, Wil ${format.attribute(
    monster.attributes.wil,
  )}
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
      ${attack.preface.trim()} ${standardAttackEffect(attack).trim()}
    \\end{freeability}
  `;
}

function getStrikes(monster: MonsterBase) {
  if (monster.weapons.length === 0) {
    return "";
  }
  return `\\pari \\textbf{${monster.weapons.length === 1 ? "Strike" : "Strikes"}:}
            ${monster.weapons.map((w) => formatStrike(monster, w)).join(";\n\\par ")}`;
}

function formatStrike(monster: MonsterBase, weapon: Weapon) {
  const name = titleCase(weapon.name);
  const strike = calculateStrike(monster, weapon);
  const formattedTags = weapon.tags ? weapon.tags.sort().map((t) => sentenceCase(t)) : [];
  const effectText = [format.damageDice(strike.power), ...formattedTags].join(", ");
  const damageTypeText = {
    1: weapon.damageTypes[0],
    2: `${weapon.damageTypes[0]} and ${weapon.damageTypes[1]}`,
    3: `${weapon.damageTypes[0]}, ${weapon.damageTypes[1]}, and ${weapon.damageTypes[2]}`,
  }[weapon.damageTypes.length as 1 | 2 | 3];
  return `${name} \\plus${strike.accuracy} (${effectText} ${damageTypeText})`;
}

function getPassiveAbilities(monster: MonsterBase) {
  return _.sortBy(monster.passiveAbilities, "name")
    .map(formatPassiveAbility)
    .join("\n    ");
}

function formatPassiveAbility(ability: PassiveAbility) {
  return `\\parhead{${titleCase(ability.name)}} ${ability.description || ""}`;
}

function formatSpeeds(monster: MonsterBase) {
  const activeModes = movementModes.filter((mode) => monster.speeds[mode]);
  if (activeModes.length > 1) {
    const speedTexts = activeModes.map((mode) => `${mode} ${format.feet(monster.speeds[mode])}`);
    return `\\textbf{Speeds} ${speedTexts.join(", ")}`;
  } else {
    const mode = activeModes[0];
    if (mode && mode !== "land") {
      return `\\textbf{${titleCase(mode)} Speed} ${format.feet(monster.speeds[mode])}`;
    } else {
      return `\\textbf{Speed} ${format.feet(monster.speeds.land)}`;
    }
  }
}
