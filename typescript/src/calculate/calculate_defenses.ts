import { defenseBonusesByMonsterType } from "@src/calculate/defense_bonuses_by_monster_type";
import { DefenseType } from "@src/data";
import { MonsterBase } from "@src/monsters";
import { calculateChallengeRatingBonus, monsterDefenseBonusByLevel } from ".";

export function calculateDefenses({
  challengeRating,
  defenseBonuses,
  monsterType,
  level,
  startingAttributes,
}: Pick<
  MonsterBase,
  "challengeRating" | "defenseBonuses" | "level" | "monsterType" | "startingAttributes"
>): Record<DefenseType, number> {
  const crBonus = calculateChallengeRatingBonus(challengeRating);
  const typeBonuses = defenseBonusesByMonsterType(monsterType);
  const levelScaling = monsterDefenseBonusByLevel(level);
  return {
    armor:
      level +
      defenseBonuses.armor +
      typeBonuses.armor +
      (startingAttributes.dex ?? 0) +
      crBonus +
      levelScaling,
    fortitude:
      level +
      defenseBonuses.fortitude +
      typeBonuses.fortitude +
      (startingAttributes.con ?? 0) +
      crBonus +
      levelScaling,
    reflex:
      level +
      defenseBonuses.reflex +
      typeBonuses.reflex +
      (startingAttributes.dex ?? 0) +
      crBonus +
      levelScaling,
    mental:
      level +
      defenseBonuses.mental +
      typeBonuses.mental +
      (startingAttributes.wil ?? 0) +
      crBonus +
      levelScaling,
  };
}
