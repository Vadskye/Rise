const baseValues: Record<number, number> = {
  1: 0,
  2: 0,
  3: 1,
  4: 2,
  5: 3,
  6: 4,
  7: 5,
  8: 6,
  9: 8,
  10: 10,
  11: 12,
  12: 14,
  13: 16,
  14: 17,
  15: 21,
  16: 24,
  17: 27,
  18: 30,
  19: 33,
  20: 36,
};

export function damageResistanceByLevel(level: number) {
  return baseValues[level];
}
