import { baseResistanceByLevel } from "@src/calculate/base_resistance_by_level";
import { DamageType, damageTypes } from "@src/data";
import { MonsterBase } from "@src/monsters";

export type Resistances = Record<DamageType, number>;

export function calculateResistances({
  attributes,
  challengeRating,
  hitPoints,
  level,
  resistanceBonuses,
}: Pick<
  MonsterBase,
  "attributes" | "challengeRating" | "hitPoints" | "level" | "resistanceBonuses"
>): Resistances {
  const dr = baseResistanceByLevel(level);
  const physicalDr = dr + resistanceBonuses.physical + (attributes.con || 0);
  const energyDr = dr + resistanceBonuses.energy + (attributes.wil || 0);
  const resistances: Resistances = {
    physical: physicalDr,
    bludgeoning: physicalDr + resistanceBonuses.bludgeoning,
    piercing: physicalDr + resistanceBonuses.piercing,
    slashing: physicalDr + resistanceBonuses.slashing,

    energy: energyDr,
    acid: energyDr + resistanceBonuses.acid,
    cold: energyDr + resistanceBonuses.cold,
    electricity: energyDr + resistanceBonuses.electricity,
    fire: energyDr + resistanceBonuses.fire,
    sonic: energyDr + resistanceBonuses.sonic,

    // Note that this is not multiplied by crMultiplier since 'universal' is not a standard damage
    // type
    universal: challengeRating === 4 ? Math.floor(hitPoints / 2) : 0,
  };

  const crMultiplier = {
    0.5: 0,
    1: 0,
    2: 1,
    3: 2,
    4: 2,
  }[challengeRating];
  for (const damageType of damageTypes) {
    resistances[damageType] *= crMultiplier;
  }

  return resistances;
}
