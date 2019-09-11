export function monsterBonusByLevel(level: number): number {
  return Math.floor((level + 1) / 6);
}
