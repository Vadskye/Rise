import {
  generateMonsterBase,
  MonsterBase,
  MonsterChallengeRating,
} from "@src/monsters/reformat_monster_input";
import { MonsterType } from "@src/monsters/types";

export function generateStandardMonster(
  level: number,
  challengeRating: MonsterChallengeRating,
  options: { monsterType?: MonsterType; startingAttribute?: number } = {},
): MonsterBase {
  return generateMonsterBase({
    alignment: "Always true neutral",
    armorInputs: [{ name: "breastplate" }],
    challengeRating,
    level,
    monsterType: options.monsterType || "planeforged",
    name: `L${level} CR${challengeRating}`,
    startingAttributes: options.startingAttribute
      ? {
          str: options.startingAttribute,
          dex: options.startingAttribute,
          con: options.startingAttribute,
          int: options.startingAttribute,
          per: options.startingAttribute,
          wil: options.startingAttribute,
        }
      : {},
    weaponInput: [{ name: "slam" }],
  });
}
