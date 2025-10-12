import _ from 'lodash';
import { ActiveAbility } from '@src/abilities';

export function sortByRankAndLevel<T extends Pick<ActiveAbility, 'name' | 'rank'>>(
  spells: T[],
): T[] {
  // Sort by level as primary, name as secondary
  return _.sortBy(
    _.sortBy(spells, (s) => s.name),
    (s) => s.rank,
  );
}
