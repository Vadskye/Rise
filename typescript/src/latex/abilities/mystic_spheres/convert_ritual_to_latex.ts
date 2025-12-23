import * as format from '@src/latex/format';
import { determineAbilityType } from '@src/latex';
import { RitualDefinition, standardizeRitual } from '@src/abilities';

// TODO: make this repetitive with convertAbilityToLatex
export function convertRitualToLatex(ritualDefinition: RitualDefinition): string {
  const ritual = standardizeRitual(ritualDefinition);
  const abilityType = determineAbilityType(ritual);

  const internalComponents = [
    format.spellEffect(ritual),
    format.ritualSpheres(ritual),
    format.spellScaling(ritual),
    format.spellNarrative(ritual),
  ].filter(Boolean);

  const tableText = 'tableText' in ritual ? ritual.tableText || '' : '';

  const skipLabelsStar = ritual.forMonster ? '*' : '';

  const latex = `
    \\begin{${abilityType}}${skipLabelsStar}{${ritual.name}}{${format.abilityUsageTime(ritual.usageTime, ritual.name)}}
      ${format.spellTypePrefix(ritual) || ''}
      \\rankline
      \\hypertargetraised{${ritual.kind}:${ritual.name}}{}%
      \\hypertargetraised{${ritual.kind}:${ritual.name.toLowerCase()}}{}%
      \\noindent
      ${internalComponents.join('\n\\rankline\n\n\\noindent ').trim()}% 
      \\vspace{0.1em}%
    \\end{${abilityType}}
    ${tableText}
`;

  return latex.trim();
}
