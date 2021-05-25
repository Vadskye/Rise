import { ChallengeRating } from "@src/data";
import { MonsterBase } from "@src/monsters/reformat_monster_input";
import { calculateDamagePerRound } from "@src/simulation/calculate_damage_per_round";
import { generateStandardMonster } from "@src/simulation/standard_monsters";

export function runCombatSimulation({
  challengeRatingPool,
  customizeMonsterA,
  customizeMonsterB,
  formatOutput,
  levelPool,
  roundPrecision,
  startingAttributePool,
}: {
  challengeRatingPool?: ChallengeRating[];
  levelPool?: number[];
  roundPrecision?: number;
  startingAttributePool?: number[];
  customizeMonsterA?(monster: MonsterBase): void;
  customizeMonsterB?(monster: MonsterBase): void;
  formatOutput?(roundsMonsterASurvives: string, roundsMonsterBSurvives: string): void;
}) {
  levelPool = levelPool || [2, 5, 8, 11, 14, 17, 20];
  challengeRatingPool = challengeRatingPool || [2];
  startingAttributePool = startingAttributePool || [0];
  roundPrecision = roundPrecision ?? 1;
  formatOutput =
    formatOutput ||
    ((roundsA: string, roundsB: string) => {
      let result: string;
      if (roundsA === roundsB) {
        result = "T";
      } else {
        result = Number(roundsA) > Number(roundsB) ? "A" : "B";
      }
      return `${result} - A${roundsA} B${roundsB}`;
    });

  for (const level of levelPool) {
    for (const challengeRating of challengeRatingPool) {
      for (const startingAttribute of startingAttributePool) {
        const monsterA = generateStandardMonster(level, challengeRating, { startingAttribute });
        if (customizeMonsterA) {
          customizeMonsterA(monsterA);
        }
        const monsterB = generateStandardMonster(level, challengeRating, { startingAttribute });
        if (customizeMonsterB) {
          customizeMonsterB(monsterB);
        }

        const crMultiplier =
          {
            0.5: 1,
            1: 1,
            2: 1,
            3: 1.5,
            4: 2,
          }[challengeRating] || 1;
        const damageToMonsterA = calculateDamagePerRound(monsterB, monsterA) * crMultiplier;
        const damageToMonsterB = calculateDamagePerRound(monsterA, monsterB) * crMultiplier;

        const damageAbsorptionMonsterA = monsterA.hitPoints + monsterA.damageResistance;
        const damageAbsorptionMonsterB = monsterB.hitPoints + monsterB.damageResistance;
        const roundsMonsterASurvives = (damageAbsorptionMonsterA / damageToMonsterA).toFixed(
          roundPrecision,
        );
        const roundsMonsterBSurvives = (damageAbsorptionMonsterB / damageToMonsterB).toFixed(
          roundPrecision,
        );
        console.log(
          `L${level
            .toString()
            .padStart(2, "0")} CR${challengeRating} A${startingAttribute}: ${formatOutput(
            roundsMonsterASurvives,
            roundsMonsterBSurvives,
          )}`,
        );
      }
    }
  }
}
