import { assert } from "chai";
import { calculateDamageDice } from "./calculate_damage_dice";

describe("calculate/calculate_damage_dice tests:", function(): void {
  describe("calculateDamageDice():", function(): void {
    it("calculates for even powers", function(): void {
      assert.deepEqual(calculateDamageDice(0), {
        count: 1,
        flatBonus: 0,
        size: 6,
      });
      assert.deepEqual(calculateDamageDice(2), {
        count: 1,
        flatBonus: 0,
        size: 8,
      });
      assert.deepEqual(calculateDamageDice(4), {
        count: 1,
        flatBonus: 0,
        size: 10,
      });
    });

    it("calculates for odd powers", function(): void {
      assert.deepEqual(calculateDamageDice(1), {
        count: 1,
        flatBonus: 0,
        size: 6,
      });
      assert.deepEqual(calculateDamageDice(3), {
        count: 1,
        flatBonus: 0,
        size: 8,
      });
      assert.deepEqual(calculateDamageDice(5), {
        count: 1,
        flatBonus: 0,
        size: 10,
      });
    });

    it("can upgrade to a higher dice count", function(): void {
      assert.deepEqual(calculateDamageDice(6), {
        count: 2,
        flatBonus: 0,
        size: 6,
      });
      assert.deepEqual(calculateDamageDice(12), {
        count: 4,
        flatBonus: 0,
        size: 6,
      });
      assert.deepEqual(calculateDamageDice(12), {
        count: 4,
        flatBonus: 0,
        size: 6,
      });
    });

    it("can add flat bonuses", function(): void {
      assert.deepEqual(calculateDamageDice(24), {
        count: 8,
        flatBonus: 0,
        size: 10,
      });
      assert.deepEqual(calculateDamageDice(26), {
        count: 8,
        flatBonus: 10,
        size: 10,
      });
      assert.deepEqual(calculateDamageDice(28), {
        count: 8,
        flatBonus: 20,
        size: 10,
      });
    });
  });
});
