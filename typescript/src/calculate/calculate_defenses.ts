import { defenseBonusesByMonsterType } from "@src/calculate/defense_bonuses_by_monster_type";
import { DefenseType } from "@src/data";
import { MonsterBase } from "@src/monsters";
import { calculateChallengeRatingBonus } from "./calculate_challenge_rating_bonus";
import { monsterBonusByLevel } from "./monster_bonus_by_level";

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
  const monsterBonus = monsterBonusByLevel(level);
  return {
    armor:
      level +
      defenseBonuses.armor +
      typeBonuses.armor +
      startingAttributes.dex +
      monsterBonus +
      crBonus,
    fortitude:
      level +
      defenseBonuses.fortitude +
      typeBonuses.fortitude +
      startingAttributes.con +
      monsterBonus +
      crBonus,
    reflex:
      level +
      defenseBonuses.reflex +
      typeBonuses.reflex +
      startingAttributes.dex +
      monsterBonus +
      crBonus,
    mental:
      level +
      defenseBonuses.mental +
      typeBonuses.mental +
      startingAttributes.wil +
      monsterBonus +
      crBonus,
  };
}
