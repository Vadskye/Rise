const baseValues: Record<number, number> = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 12,
  12: 14,
  13: 16,
  14: 18,
  15: 20,
  16: 22,
  17: 25,
  18: 28,
  19: 31,
  20: 34,
  21: 37,
  22: 40,
  23: 44,
  24: 48,
  25: 52,
};

export function damageResistanceByLevel(level: number, constitution: number | null) {
  return baseValues[Math.max(level, constitution || 0)];
}
