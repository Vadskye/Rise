const baseValues: Record<number, number> = {
  1: 13,
  2: 14,
  3: 16,
  4: 18,
  5: 21,
  6: 24,
  7: 27,
  8: 30,
  9: 34,
  10: 38,
  11: 43,
  12: 48,
  13: 54,
  14: 61,
  15: 69,
  16: 77,
  17: 86,
  18: 96,
  19: 108,
  20: 122,
};

export function woundResistanceByLevel(level: number) {
  return baseValues[level];
}
