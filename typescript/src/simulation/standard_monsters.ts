import {
  MonsterBase,
  MonsterChallengeRating,
  generateMonsterBase,
} from "@src/monsters/reformat_monster_input";
import { MonsterType } from "@src/monsters/types";

export function generateStandardMonster(
  level: number,
  challengeRating: MonsterChallengeRating,
  options: { monsterType?: MonsterType; startingAttributes?: Partial<Creature.Attributes> } = {},
): MonsterBase {
  return generateMonsterBase({
    alignment: "Always true neutral",
    challengeRating,
    level,
    monsterType: options.monsterType || "planeforged",
    name: `L${level} CR${challengeRating}`,
    startingAttributes: options.startingAttributes || {},
    weaponInput: [{name: "slam"}],
  });
}
