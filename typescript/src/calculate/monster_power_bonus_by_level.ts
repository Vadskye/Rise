// Monsters get a +2 bonus to power at 8/14/20th level.
// That corresponds to new rank abilities for PCs, and is offset from the more general bonus to make
// the monster leveling curve smoother.
// This could be a +1 bonus per 3 levels instead of a +2 bonus per 6, but keeping it simpler
// is beneficial for making monster statistics easier to calculate. It also provides a sharper bonus
// at the 8/14/20 levels and makes the 5/11/17 levels less of a massive bonus.

export function monsterPowerBonusByLevel(level: number): number {
  return Math.floor((level - 2) / 6) * 2;
}
