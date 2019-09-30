import { Attack } from "@src/attacks";
import { DamageType } from "@src/data";
import { MonsterBase } from "@src/monsters";

export interface CalculatedAttack {
  accuracy: number;
  crit: string | null;
  damageTypes: DamageType[];
  defense: string;
  hit: string | null;
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
    crit: attack.crit,
    damageTypes: attack.damageTypes,
    defense: attack.defense,
    hit: attack.hit,
    monsterName: monster.name,
    name: attack.name,
    power: monsterPower + attack.powerBonus,
    target: attack.target,
  };
}
