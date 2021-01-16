import { assert } from "chai";
import { attributeAtLevel } from "./attributes_at_level";

describe("calculate/attributes_at_level tests:", function(): void {
  function calculateStandardAttributesAtLevel(level: number) {
    return {
      "-1": attributeAtLevel(-1, level),
      "0": attributeAtLevel(0, level),
      "1": attributeAtLevel(1, level),
      "2": attributeAtLevel(2, level),
      "3": attributeAtLevel(3, level),
      "4": attributeAtLevel(4, level),
      "5": attributeAtLevel(5, level),
      "6": attributeAtLevel(6, level),
    };
  }

  it("works at level 1", function(): void {
    assert.deepEqual(calculateStandardAttributesAtLevel(1), {
      "-1": -1,
      "0": 0,
      "1": 1,
      "2": 2,
      "3": 3,
      "4": 4,
      "5": 5,
      "6": 6,
    });
  });

  it("works at level 2", function(): void {
    assert.deepEqual(calculateStandardAttributesAtLevel(2), {
      "-1": -1,
      "0": 0,
      "1": 1,
      "2": 3,
      "3": 4,
      "4": 6,
      "5": 7,
      "6": 9,
    });
  });

  it("works at level 3", function(): void {
    assert.deepEqual(calculateStandardAttributesAtLevel(3), {
      "-1": -1,
      "0": 0,
      "1": 1,
      "2": 3,
      "3": 5,
      "4": 7,
      "5": 9,
      "6": 11,
    });
  });

  it("works at level 20", function(): void {
    assert.deepEqual(calculateStandardAttributesAtLevel(20), {
      "-1": -1,
      "0": 0,
      "1": 6,
      "2": 12,
      "3": 22,
      "4": 33,
      "5": 43,
      "6": 54,
    });
  });
});
