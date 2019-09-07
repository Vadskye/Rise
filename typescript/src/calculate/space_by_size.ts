const standardSpaces: Record<Creature.Size, number> = {
  fine: 0.5,
  diminuitive: 1,
  tiny: 2.5,
  small: 5,
  medium: 5,
  large: 10,
  huge: 15,
  gargantuan: 20,
  colossal: 30,
};

export function spaceBySize(size: Creature.Size): number {
  return standardSpaces[size];
}
