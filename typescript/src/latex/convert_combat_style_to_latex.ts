import { CombatStyle, Maneuver } from '@src/combat_styles';
import {
  determineAbilityType,
  sortByRankAndLevel,
} from '@src/latex/mystic_spheres/convert_mystic_sphere_to_latex';
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
          ${maneuversByRank[rank].map(convertManeuverToLatex).join('\n')}`
            : '',
        )
        .join('\n')}
  `);
}

function convertManeuverToLatex(maneuver: Maneuver): string {
  const abilityType = determineAbilityType(maneuver);
  const internalComponents = [
    format.spellEffect(maneuver, 'maneuver'),
    format.spellScaling(maneuver),
    format.spellNarrative(maneuver),
  ].filter(Boolean);

  const rankText = maneuver.rank ? `Rank ${maneuver.rank}` : '';
  const wrappedRankText = abilityType === 'activeability' ? `[${rankText}]` : `{${rankText}}`;

  const latex = `
    \\begin{${abilityType}}{${maneuver.name}}${wrappedRankText}
      ${format.spellTypePrefix(maneuver) || ''}
      \\rankline
      \\hypertargetraised{maneuver:${maneuver.name}}{}%
      \\hypertargetraised{maneuver:${maneuver.name.toLowerCase()}}{}%
      \\noindent
      ${internalComponents.join('\n\\rankline\n\n\\noindent ').trim()}%
      \\vspace{0.1em}%
    \\end{${abilityType}}
  `;

  return latex;
}
