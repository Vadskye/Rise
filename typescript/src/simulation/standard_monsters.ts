import { ChallengeRating, MonsterType } from "@src/data";
import { generateMonsterBase, MonsterBase } from "@src/monsters/reformat_monster_input";

export function generateStandardMonster(
  level: number,
  challengeRating: ChallengeRating,
  options: { monsterType?: MonsterType; startingAttribute?: number } = {},
): MonsterBase {
  return generateMonsterBase({
    alignment: "Always true neutral",
    armorInputs: [{ name: "breastplate" }],
    challengeRating,
    level,
    monsterType: options.monsterType || "undead",
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
