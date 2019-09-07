const standardSpeeds: Record<Creature.Size, number> = {
  fine: 10,
  diminuitive: 15,
  tiny: 20,
  small: 25,
  medium: 30,
  large: 40,
  huge: 50,
  gargantuan: 60,
  colossal: 70,
};

export function speedBySize(size: Creature.Size): number {
  return standardSpeeds[size];
}
