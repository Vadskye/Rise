import { Creature } from '@src/character_sheet/creature';
import { RankAbility } from '../types';
import { parseArchetypeActiveAbility } from '@src/combat/parse_archetype_active_ability';

/**
 * Calculates the ranks for a character's 3 archetypes based on their level.
 * Following the rule that you increase all ranks evenly, ranking up in the same order.
 */
export function getArchetypeRanks(level: number): [number, number, number] {
  return [
    Math.ceil(level / 3),
    Math.ceil((level - 1) / 3),
    Math.ceil((level - 2) / 3),
  ];
}

/**
 * Parses and applies active abilities from a list of RankAbility objects to a creature.
 */
export function applyArchetypeActiveAbilities(creature: Creature, abilities: RankAbility[], rank: number) {
  for (const ability of abilities) {
    if (ability.rank <= rank) {
      const parsed = parseArchetypeActiveAbility(ability, rank);
      if (parsed) {
        creature.addActiveAbility(parsed);
      }
    }
  }
}
