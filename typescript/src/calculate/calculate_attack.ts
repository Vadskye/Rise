import { AbilityTag } from "@src/ability_tags";
import { Attack, DamagingAttack } from "@src/attacks";
import { calculateDamageDice, DamageDice } from "@src/calculate";
import { DamageType } from "@src/data";
import { MonsterBase } from "@src/monsters";

export interface CalculatedAttack {
  accuracy: number;
  damageDice: DamageDice | null;
  crit: string | null;
  damageTypes: DamageType[];
  defense: string;
  hit: string | null;
  monsterName: string;
  name: string;
  preface: string;
  tags: AbilityTag[];
  target: string;
  weaponName?: string;
}

export type CalculatedDamagingAttack = Omit<CalculatedAttack, "damageDice"> & {
  damageDice: DamageDice;
};

export function calculateAttack(
  attack: DamagingAttack,
  monster: Pick<MonsterBase, "challengeRating" | "level" | "name" | "accuracy" | "magicalPower" | "mundanePower">,
): CalculatedDamagingAttack;
export function calculateAttack(
  attack: Attack,
  monster: Pick<MonsterBase, "challengeRating" | "level" | "name" | "accuracy" | "magicalPower" | "mundanePower">,
): CalculatedAttack;
export function calculateAttack(
  attack: Attack | DamagingAttack,
  monster: Pick<MonsterBase, "challengeRating" | "level" | "name" | "accuracy" | "magicalPower" | "mundanePower">,
): CalculatedAttack | CalculatedDamagingAttack {
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
    damageDice: attack.baseDamageDie
      ? calculateDamageDice(
          attack.baseDamageDie,
          monster.level,
          Math.floor(monsterPower * attack.powerMultiplier),
          monster.challengeRating,
        )
      : null,
    crit: attack.crit,
    damageTypes: attack.damageTypes,
    defense: attack.defense,
    hit: attack.hit,
    monsterName: monster.name,
    name: attack.name,
    preface: attack.preface,
    tags: attack.tags || [],
    target: attack.target,
    weaponName: attack.weaponName,
  };
}
