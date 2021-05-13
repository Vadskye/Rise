import { ChallengeRating } from "@src/data";
import { generateStandardMonster } from "@src/simulation/standard_monsters";
import { assert } from "chai";
import { calculateDamagePerRound, calculateHitProbability } from "./calculate_damage_per_round";

describe("simulation/calculate_damage_per_round tests", function() {
  describe("calculateHitProbability():", function() {
    function calculateSimpleHitProbability(
      accuracy: number,
      defense: number,
      maxExplosionDepth: number,
    ) {
      return (
        Math.round(
          calculateHitProbability(
            { accuracy, defense: "armor" },
            { defenses: { armor: defense, fortitude: 0, reflex: 0, mental: 0 } },
            maxExplosionDepth,
          ) * 1000,
        ) / 1000
      ).toFixed(3);
    }

    describe("maxExplosionDepth = 1:", function() {
      it("is correct for accuracy 4 vs defense 10", function() {
        assert.strictEqual(
          calculateSimpleHitProbability(4, 10, 1),
          // 50% chance of hit + 5% chance of crit
          "0.550",
        );
      });

      it("is correct for accuracy 6 vs defense 10", function() {
        assert.strictEqual(
          calculateSimpleHitProbability(6, 10, 1),
          // 70% chance of hit + 7% chance of crit
          "0.770",
        );
      });

      it("is correct for accuracy 6 vs defense 20", function() {
        assert.strictEqual(
          calculateSimpleHitProbability(6, 20, 1),
          // 7% chance of hit
          "0.070",
        );
      });

      it("is correct for accuracy 14 vs defense 10", function() {
        assert.strictEqual(
          calculateSimpleHitProbability(14, 10, 1),
          // 100% chance of hit + 50% chance of crit + 5% chance of double crit
          "1.550",
        );
      });

      it("is correct for accuracy 9 vs defense 10", function() {
        assert.strictEqual(
          calculateSimpleHitProbability(9, 10, 1),
          // 100% chance of hit + 10% chance of crit
          "1.100",
        );
      });
    });

    describe("maxExplosionDepth = 2:", function() {
      it("is correct for accuracy 4 vs defense 10", function() {
        assert.strictEqual(
          calculateSimpleHitProbability(4, 10, 2),
          // 50% chance of hit + 5% chance of crit + 0.5% chance of double crit
          "0.555",
        );
      });

      it("is correct for accuracy 6 vs defense 10", function() {
        assert.strictEqual(
          calculateSimpleHitProbability(6, 10, 2),
          // 70% chance of hit + 7% chance of crit + 0.7% chance of double crit
          "0.777",
        );
      });

      it("is correct for accuracy 6 vs defense 20", function() {
        assert.strictEqual(
          calculateSimpleHitProbability(6, 20, 2),
          // 7% chance of hit + 0.7% chance of crit
          "0.077",
        );
      });

      it("is correct for accuracy 14 vs defense 10", function() {
        assert.strictEqual(
          calculateSimpleHitProbability(14, 10, 2),
          // 100% chance of hit + 50% chance of crit + 5% chance of double crit + 0.5%
          // chance of triple crit
          "1.555",
        );
      });

      it("is correct for accuracy 9 vs defense 10", function() {
        assert.strictEqual(
          calculateSimpleHitProbability(9, 10, 2),
          // 100% chance of hit + 10% chance of crit + 1% chance of double crit
          "1.110",
        );
      });
    });
  });

  describe("calculateDamagePerRound():", function() {
    describe("minimal hardcoded monsters:", function() {
      function generateSimpleMonster(level: number, challengeRating: ChallengeRating) {
        return {
          accuracy: 4,
          challengeRating,
          defenses: { armor: 10, fortitude: 0, reflex: 0, mental: 0 },
          level,
          magicalPower: 0,
          mundanePower: 0,
          name: `L${level} CR${challengeRating}`,
          weapons: [
            {
              accuracyBonus: 0,
              baseDamageDie: "1d10",
              damageTypes: ["bludgeoning" as const],
              name: "slam",
              powerMultiplier: 0 as const,
              rangeIncrement: null,
              tags: [],
            },
          ],
        };
      }
      it("identifies damage per round for a simple CR 1 monster fighting itself", function(): void {
        const simpleMonster = generateSimpleMonster(1, 1);
        assert.strictEqual(
          calculateDamagePerRound(simpleMonster, simpleMonster).toFixed(4),
          // 55.5% accuracy * 5.5 damage per hit = 3.0525 damage per round
          "3.0525",
        );
      });

      it("identifies damage per round for a simple CR 4 monster fighting itself", function(): void {
        // CR 4 monsters gain +1d with strikes automatically
        const simpleMonster = generateSimpleMonster(1, 4);
        assert.strictEqual(
          calculateDamagePerRound(simpleMonster, simpleMonster).toFixed(3),
          // 55.5% accuracy * 7 damage per hit = 3.885 damage per round
          "3.885",
        );
      });
    });

    describe("standard monsters:", function() {
      it("identifies damage per round for a standard CR 1 monster fighting itself", function(): void {
        const standardMonster = generateStandardMonster(1, 1);
        assert.strictEqual(
          calculateDamagePerRound(standardMonster, standardMonster).toFixed(4),
          // 77.7% accuracy * 5.5 damage per hit = 4.2735 damage per round
          "4.2735",
        );
      });

      it("identifies damage per round for a standard CR 4 monster fighting itself", function(): void {
        const standardMonster = generateStandardMonster(1, 4);
        assert.strictEqual(
          calculateDamagePerRound(standardMonster, standardMonster).toFixed(3),
          // 77.7% accuracy * 7 damage per hit = 5.439 damage per round
          "5.439",
        );
      });
    });
  });
});
