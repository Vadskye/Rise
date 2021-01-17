import { assert } from "chai";
import { calculateDamageDice } from "./calculate_damage_dice";

describe("calculate/calculate_damage_dice tests:", function(): void {
  describe("calculateDamageDice():", function(): void {
    it("calculates for level 1", function(): void {
      const level = 1;
      assert.deepEqual(calculateDamageDice("1d6", level, 0), {
        count: 1,
        flatBonus: 0,
        size: 6,
      });
      assert.deepEqual(calculateDamageDice("1d10", level, 0), {
        count: 1,
        flatBonus: 0,
        size: 10,
      });
      assert.deepEqual(calculateDamageDice("2d6", level, 3), {
        count: 2,
        flatBonus: 3,
        size: 6,
      });
    });

    it("calculates for level 7", function(): void {
      const level = 7;
      assert.deepEqual(calculateDamageDice("1d6", level, 0), {
        count: 1,
        flatBonus: 0,
        size: 10,
      });
      assert.deepEqual(calculateDamageDice("1d10", level, 0), {
        count: 2,
        flatBonus: 0,
        size: 8,
      });
      assert.deepEqual(calculateDamageDice("2d6", level, 3), {
        count: 2,
        flatBonus: 3,
        size: 10,
      });
    });

    it("calculates for level 20", function(): void {
      const level = 20;
      assert.deepEqual(calculateDamageDice("1d6", level, 0), {
        count: 4,
        flatBonus: 0,
        size: 6,
      });
      assert.deepEqual(calculateDamageDice("1d10", level, 0), {
        count: 4,
        flatBonus: 0,
        size: 10,
      });
      assert.deepEqual(calculateDamageDice("2d6", level, 3), {
        count: 5,
        flatBonus: 3,
        size: 10,
      });
    });
  });
});
