import { Attack } from "@src/attacks";
import { DamageType } from "@src/data";
import { MonsterBase } from "@src/monsters";

export interface CalculatedAttack {
  accuracy: number;
  damageTypes: DamageType[];
  defense: string;
  monsterName: string;
  name: string;
  power: number;
  target: string;
}

export function calculateAttack(
  attack: Attack,
  monster: Pick<MonsterBase, "name" | "accuracy" | "magicalPower" | "mundanePower">,
): CalculatedAttack {
  const monsterPower = attack.source === "magical" ? monster.magicalPower : monster.mundanePower;
  return {
    accuracy: attack.accuracyBonus + monster.accuracy,
    damageTypes: attack.damageTypes,
    defense: attack.defense,
    monsterName: monster.name,
    name: attack.name,
    power: monsterPower + attack.powerBonus,
    target: attack.target,
  };
}
