import { CalculatedAttack } from "@src/calculate";
import * as format from "@src/latex/format";
import { titleCase } from "change-case";

export function standardAttackEffect(attack: CalculatedAttack) {
  if (/strike/.test(attack.target)) {
    return `
      The ${attack.monsterName} makes a ${format.modifier(
      attack.accuracy,
    )} \\glossterm{strike} vs. ${titleCase(attack.defense)}.
      \\hit ${hitEffect(attack, "the")}
    `;
  } else {
    const targetWord = attack.target.toLowerCase().startsWith("one") ? "the" : "each";
    return `
      The ${attack.monsterName} makes a ${format.modifier(attack.accuracy)} attack
        vs. ${titleCase(attack.defense)} against ${targetWord} target.
      \\hit ${hitEffect(attack, targetWord)}
    `;
  }
}

function hitEffect(attack: CalculatedAttack, targetWord: string) {
  return `
    ${titleCase(targetWord)} target takes ${format.damageDice(attack.power)} ${format.damageTypes(
    attack.damageTypes,
  )} damage.
  `;
}
