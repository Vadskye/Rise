import { CombatStyle, combatStyles } from '@src/abilities/combat_styles';
import { ManeuverDefinition } from '@src/abilities';
import { sortByRankAndLevel } from '@src/latex';
import _ from 'lodash';

export function generateCombatStyleSummaries(): string {
  return combatStyles.map(generateCombatStyleSummary).join('\n');
}

function generateCombatStyleSummary(style: CombatStyle): string {
  const maneuvers = sortByRankAndLevel(style.maneuvers);
  const ranks = [1, 2, 3, 4, 5, 6, 7];
  const maneuverByRank = _.groupBy(maneuvers, (s) => s.rank);
  return `
    {
      \\RaggedRight
      \\subsection{${style.name}}

      ${ranks
        .map((rank) =>
          generateManeuversSummary(`Rank ${rank}`, sortByRankAndLevel(maneuverByRank[rank])),
        )
        .filter(Boolean)
        .join('\n')}
    }
  `;
}

function generateManeuversSummary(category: string, maneuvers: ManeuverDefinition[]): string | null {
  if (!(maneuvers?.length > 0)) {
    return null;
  }
  return `\\par\\noindent ${category}: ${maneuvers
    .map((m) => `\\maneuver{${m.name.toLowerCase()}}`)
    .join(', ')}`;
}
