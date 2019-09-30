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

function accuracyText(attack: CalculatedAttack): string {
  if (/strike/.test(attack.target)) {
    return `
      The ${attack.monsterName} makes a ${format.modifier(
      attack.accuracy,
    )} \\glossterm{strike} vs. ${titleCase(attack.defense)}.
    `;
  } else {
    const targetWord = attack.target.toLowerCase().startsWith("one") ? "the" : "each";
    return `
      The ${attack.monsterName} makes a ${format.modifier(attack.accuracy)} attack
        vs. ${titleCase(attack.defense)} against ${targetWord} target.
    `;
  }
}
