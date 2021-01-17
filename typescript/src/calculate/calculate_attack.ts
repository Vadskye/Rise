import { AbilityTag } from "@src/ability_tags";
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
  preface: string;
  power: number;
  tags: AbilityTag[];
  target: string;
  weaponName?: string;
}

export function calculateAttack(
  attack: Attack,
  monster: Pick<MonsterBase, "name" | "accuracy" | "magicalPower" | "mundanePower">,
): CalculatedAttack {
  const monsterPower = attack.source === "magical" ? monster.magicalPower : monster.mundanePower;
  if (attack.hit && attack.hit.trim()[attack.hit.trim().length - 1] !== ".") {
    throw new Error(
      `Attack ${attack.name} from monster ${
        monster.name
      } should end in a period: '${attack.hit.trim()}'`,
    );
  }

  return {
    accuracy: attack.accuracyBonus + monster.accuracy,
    crit: attack.crit,
    damageTypes: attack.damageTypes,
    defense: attack.defense,
    hit: attack.hit,
    monsterName: monster.name,
    name: attack.name,
    power: monsterPower,
    preface: attack.preface,
    tags: attack.tags || [],
    target: attack.target,
    weaponName: attack.weaponName,
  };
}
