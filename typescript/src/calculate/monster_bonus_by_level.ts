// Monsters get a +1 bonus to many statistics at 5/11/17th level.
// That corresponds to the levels that PCs get access to powerful new rank abilities.

export function monsterBonusByLevel(level: number): number {
  return Math.floor((level + 1) / 6);
}
