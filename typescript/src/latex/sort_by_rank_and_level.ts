import _ from 'lodash';
import { SpellLike } from '@src/abilities/mystic_spheres';

export function sortByRankAndLevel<T extends Pick<SpellLike, 'name' | 'rank'>>(spells: T[]): T[] {
  // Sort by level as primary, name as secondary
  return _.sortBy(
    _.sortBy(spells, (s) => s.name),
    (s) => s.rank,
  );
}
