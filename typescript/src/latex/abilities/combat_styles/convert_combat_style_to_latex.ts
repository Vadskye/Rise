import { CombatStyle, Maneuver } from '@src/abilities/combat_styles';
import { sortByRankAndLevel } from '@src/latex';
import { convertAbilityToLatex } from '@src/latex/convert_ability_to_latex';
import * as format from '@src/latex/format';
import { assertEndsWithPeriod } from '@src/latex/format/spell_effect';
import _ from 'lodash';

export function convertCombatStyleToLatex(style: CombatStyle): string {
  assertEndsWithPeriod(style.shortDescription, style.name);
  const ranks = [1, 3, 5, 7];
  const maneuversByRank = _.groupBy(sortByRankAndLevel(style.maneuvers), (s) => s.rank);

  return format.latexify(`
    \\section{{${style.name}}}
      \\hypertargetraised{style:${style.name.toLowerCase()}}{}%
      \\hypertargetraised{style:${style.name}}{}%
      \\label{${style.name}}%
      \\textit{${style.shortDescription}}
      ${style.specialRules ? `\\parhead{Special Rules} ${style.specialRules}` : ``}

      ${ranks
        .map((rank) =>
          maneuversByRank[rank]
            ? `\\subsection{Rank ${rank} Maneuvers}
          ${maneuversByRank[rank].map((maneuver) => convertAbilityToLatex(maneuver)).join('\n')}`
            : '',
        )
        .join('\n')}
  `);
}

// When formatted for monsters, we omit the rank of maneuvers.
export function convertManeuverToLatex(maneuver: Maneuver, omitRank?: boolean): string {
  return convertAbilityToLatex(maneuver, omitRank);
}
