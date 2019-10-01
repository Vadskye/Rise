import { CalculatedAttack } from "@src/calculate";
import * as format from "@src/latex/format";
import { titleCase } from "change-case";

export function standardAttackEffect(attack: CalculatedAttack) {
  return `
    ${accuracyText(attack)}
    ${attack.hit ? `\\hit ${attack.hit}` : ""}
    ${attack.crit ? `\\crit ${attack.crit}` : ""}
  `.replace(
    "<damage>",
    `${format.damageDice(attack.power)} ${format.damageTypes(attack.damageTypes)} damage`,
  );
}

function primaryMonsterName(name: string) {
  const splitName = name.split(", ");
  if (splitName.length === 2) {
    return splitName[0];
  } else {
    return name;
  }
}

function accuracyText(attack: CalculatedAttack): string {
  const monsterName = primaryMonsterName(attack.monsterName).toLowerCase();
  const targetWord = attack.target.toLowerCase().startsWith("one") ? "the" : "each";
  if (attack.weaponName) {
    return `
      The ${monsterName} makes a ${format.modifier(attack.accuracy)}
        \\glossterm{strike} vs. ${titleCase(attack.defense)}
        with its ${attack.weaponName} against ${targetWord} target.
    `;
  } else {
    return `
      The ${monsterName} makes a ${format.modifier(attack.accuracy)} attack
        vs. ${titleCase(attack.defense)} against ${targetWord} target.
    `;
  }
}
