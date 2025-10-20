import { determineAbilityType } from '@src/latex';
import * as format from '@src/latex/format';
import { ActiveAbility } from '@src/abilities';

export function convertAbilityToLatex(ability: ActiveAbility, omitRank?: boolean): string {
  const abilityType = determineAbilityType(ability);

  const internalComponents = [
    format.spellEffect(ability),
    format.spellScaling(ability),
    format.spellNarrative(ability),
  ].filter(Boolean);

  const tableText = 'tableText' in ability ? ability.tableText || '' : '';

  const skipLabelsStar = ability.forMonster ? '*' : '';

  const latex = `
    \\begin{${abilityType}}${skipLabelsStar}{${ability.name}}{${format.abilityUsageTime(ability.usageTime, ability.name)}}
      ${format.spellTypePrefix(ability, omitRank) || ''}
      \\rankline
      \\hypertargetraised{${ability.kind}:${ability.name}}{}%
      \\hypertargetraised{${ability.kind}:${ability.name.toLowerCase()}}{}%
      \\noindent
      ${internalComponents.join('\n\\rankline\n\n\\noindent ').trim()}% 
      \\vspace{0.1em}%
    \\end{${abilityType}}
    ${tableText}
`;

  return latex.trim();
}
