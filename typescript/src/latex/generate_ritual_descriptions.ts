import { rituals } from '@src/mystic_spheres';
import {
  convertRitualToLatex,
  sortByRankAndLevel,
} from '@src/latex';
import _ from 'lodash';

export function generateRitualDescriptions(): string {
  const ranks = [1, 2, 3, 4, 5, 6, 7];
  const ritualsByRank = _.groupBy(sortByRankAndLevel(rituals), (s) => s.rank);


  return ranks.map((rank) => ritualsByRank[rank] ? `\\section{Rank ${rank} Rituals}
          ${ritualsByRank[rank].map(convertRitualToLatex).join('\n')}` : '').join("\n");
}
