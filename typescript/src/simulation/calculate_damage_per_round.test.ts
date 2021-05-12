import { assert } from "chai";
import { calculateHitProbability } from "./calculate_damage_per_round";

function calculateSimpleHitProbability(accuracy: number, defense: number, maxExplosionDepth: number) {
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

describe("simulation/calculate_damage_per_round tests", function() {
  describe("calculateHitProbability():", function() {
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
});
