import * as format from '@src/latex/format';
import { determineAbilityType } from '@src/latex';
import { RitualDefinition, standardizeRitual } from '@src/abilities';

export function convertRitualToLatex(ritualDefinition: RitualDefinition): string {
  const ritual = standardizeRitual(ritualDefinition);
  const abilityType = determineAbilityType(ritual);
  const internalComponents = [
    format.spellEffect(ritual),
    format.ritualSphereEffects(ritual),
    format.spellScaling(ritual),
    format.spellNarrative(ritual),
  ].filter(Boolean);
  const tableText = ritual.tableText || '';

  const rankText = ritual.rank ? `Rank ${ritual.rank}` : '';
  const wrappedRankText = abilityType === 'activeability' ? `[${rankText}]` : `{${rankText}}`;

  const latex = `
    \\begin{${abilityType}}{${ritual.name}}${wrappedRankText}
      ${format.spellTypePrefix(ritual) || ''}
      \\rankline
      ${format.ritualSpheres(ritual)}
      \\rankline
      \\hypertargetraised{spell:${ritual.name}}{}%
      \\hypertargetraised{spell:${ritual.name.toLowerCase()}}{}%
      \\noindent
      ${internalComponents.join('\n\\rankline\n\n\\noindent ').trim()}%
      \\vspace{0.1em}%
    \\end{${abilityType}}
    ${tableText}
  `;

  return latex;
}
