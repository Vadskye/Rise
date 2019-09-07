const standardReach: Record<Creature.Size, number> = {
  fine: 0,
  diminuitive: 0,
  tiny: 0,
  small: 5,
  medium: 5,
  large: 10,
  huge: 15,
  gargantuan: 20,
  colossal: 30,
};

export function reachBySize(size: Creature.Size): number {
  return standardReach[size];
}
