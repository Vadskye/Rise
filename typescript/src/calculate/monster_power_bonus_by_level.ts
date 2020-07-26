// Monsters get a +2 bonus to power at 5/11/14th level.
// That corresponds to powerful new rank abilities for PCs.
// This could be a +1 bonus per 3 levels instead of a +2 bonus per 6, but keeping it simpler
// is beneficial for making monster statistics easier to calculate.

export function monsterPowerBonusByLevel(level: number): number {
  return Math.floor((level + 1) / 6) * 2;
}
