import { Maneuver } from '@src/abilities/combat_styles';
import { determineAbilityType } from '@src/latex';
import * as format from '@src/latex/format';
import { SpellLike } from '@src/abilities/mystic_spheres';

export type Ability = SpellLike | Maneuver;

export function convertAbilityToLatex(ability: Ability, omitRank?: boolean): string {
  const abilityType = determineAbilityType(ability);
  const kind = 'castingTime' in ability ? 'spell' : 'maneuver';

  const internalComponents = [
    format.spellEffect(ability, kind),
    format.spellScaling(ability),
    format.spellNarrative(ability),
  ].filter(Boolean);

  const tableText = 'tableText' in ability ? ability.tableText || '' : '';
  const castingTime = 'castingTime' in ability ? ability.castingTime : undefined;

  const latex = `
    \\begin{${abilityType}}{${ability.name}}{${format.abilityUsageTime(castingTime, ability.name)}}
      ${format.spellTypePrefix(ability, omitRank) || ''}
      \\rankline
      \\hypertargetraised{${kind}:${ability.name}}{}%
      \\hypertargetraised{${kind}:${ability.name.toLowerCase()}}{}%
      \\noindent
      ${internalComponents.join('\n\\rankline\n\n\\noindent ').trim()}% 
      \\vspace{0.1em}%
    \\end{${abilityType}}
    ${tableText}
  `;

  return latex;
}
