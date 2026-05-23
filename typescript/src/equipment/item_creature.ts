import { Creature } from '../character_sheet/creature';

export function calculateMinimumLevel(rank: number): number {
  switch (rank) {
    case -1:
      return 0;
    case 0:
      return 0;
    case 1:
      return 1;
    case 2:
      return 4;
    case 3:
      return 7;
    case 4:
      return 10;
    case 5:
      return 13;
    case 6:
      return 16;
    case 7:
      return 19;
    case 8:
      return 21;
    default:
      throw new Error(`Unsupported rank ${rank}`);
  }
}

export function getItemCreature(rank: number): Creature {
  const level = calculateMinimumLevel(rank);

  // Start with a 2 perception and increase it at each attribute scaling level.
  const perception = 2 + Math.floor((level + 3) / 6);

  let powerAttribute: number;
  switch (rank) {
    case -1:
    case 0:
      powerAttribute = 0;
      break;
    case 1:
    case 2:
      powerAttribute = 2;
      break;
    case 3:
    case 4:
      powerAttribute = 3;
      break;
    case 5:
    case 6:
      powerAttribute = 4;
      break;
    case 7:
      powerAttribute = 5;
      break;
    case 8:
      powerAttribute = 6;
      break;
    default:
      throw new Error(`Unsupported rank ${rank}`);
  }

  const creature = Creature.new();
  creature.setRequiredProperties({
    alignment: 'neutral',
    base_class: 'hybrid',
    elite: false,
    creature_origin: 'natural',
    creature_type: 'humanoid',
    size: 'medium',
    level: level,
  });
  creature.setProperties({ name: 'The Item' });

  creature.addSimpleModifier({
    name: 'Item Scaling Perception',
    statistic: 'perception',
    value: perception,
  });
  creature.addSimpleModifier({
    name: 'Item Scaling Strength',
    statistic: 'strength',
    value: powerAttribute,
  });
  creature.addSimpleModifier({
    name: 'Item Scaling Willpower',
    statistic: 'willpower',
    value: powerAttribute,
  });

  return creature;
}
