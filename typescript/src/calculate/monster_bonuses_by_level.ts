export function monsterPowerBonusByLevel(level: number): number {
  const scaling: Record<number, number> = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 6,
    6: 8,
    7: 12,
    8: 16,
  };
  return scaling[Math.floor(level / 3)];
}

export function monsterAccuracyBonusByLevel(level: number): number {
  return Math.max(0, Math.floor((level + 1) / 6));
}

export function monsterDefenseBonusByLevel(level: number): number {
  return Math.max(0, Math.floor((level + 3) / 6));
}
