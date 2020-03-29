import { vitalResistanceByLevel } from "@src/calculate/vital_resistance_by_level";
import { damageResistanceByLevel } from "@src/calculate/wound_resistance_by_level";
import { DamageType, damageTypes } from "@src/data";
import { MonsterBase } from "@src/monsters";

export interface Resistances {
  damage: Record<DamageType, number>;
  vital: Record<DamageType, number>;
}

export function calculateResistances(
  {
    challengeRating,
    level,
    resistanceBonuses,
  }: Pick<MonsterBase, "challengeRating" | "level" | "resistanceBonuses">,
  attributes: Creature.Attributes,
): Resistances {
  const dr = damageResistanceByLevel(level, attributes.con);
  const wr = vitalResistanceByLevel(level, attributes.con);
  const resistances: Resistances = {
    damage: {
      physical: dr + resistanceBonuses.physical,
      acid: dr + resistanceBonuses.physical + resistanceBonuses.acid,
      bludgeoning: dr + resistanceBonuses.physical + resistanceBonuses.bludgeoning,
      piercing: dr + resistanceBonuses.physical + resistanceBonuses.piercing,
      slashing: dr + resistanceBonuses.physical + resistanceBonuses.slashing,

      energy: dr + resistanceBonuses.energy,
      cold: dr + resistanceBonuses.energy + resistanceBonuses.cold,
      electricity: dr + resistanceBonuses.energy + resistanceBonuses.electricity,
      fire: dr + resistanceBonuses.energy + resistanceBonuses.fire,
    },
    vital: {
      physical: wr + resistanceBonuses.physical,
      acid: wr + resistanceBonuses.physical + resistanceBonuses.acid,
      bludgeoning: wr + resistanceBonuses.physical + resistanceBonuses.bludgeoning,
      piercing: wr + resistanceBonuses.physical + resistanceBonuses.piercing,
      slashing: wr + resistanceBonuses.physical + resistanceBonuses.slashing,

      energy: wr + resistanceBonuses.energy,
      cold: wr + resistanceBonuses.energy + resistanceBonuses.cold,
      electricity: wr + resistanceBonuses.energy + resistanceBonuses.electricity,
      fire: wr + resistanceBonuses.energy + resistanceBonuses.fire,
    },
  };

  if (challengeRating === 0.5) {
    for (const category of ["damage" as const, "vital" as const]) {
      for (const damageType of damageTypes) {
        resistances[category][damageType] *= 0.5;
      }
    }
  }

  return resistances;
}
