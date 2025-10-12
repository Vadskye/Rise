import { convertAbilityToLatex } from '@src/latex/convert_ability_to_latex';
import * as format from '@src/latex/format';
import { assertEndsWithPeriod } from '@src/latex/format/spell_effect';
import { sortByRankAndLevel } from '@src/latex';
import { MysticSphere } from '@src/abilities/mystic_spheres';
import { ActiveAbility, CantripDefinition, SpellDefinition, standardizeCantrip, standardizeSpell } from '@src/abilities';
import _ from 'lodash';

export function convertMysticSphereToLatex(sphere: MysticSphere): string {
  assertEndsWithPeriod(sphere.shortDescription, sphere.name);

  const imageText = sphere.hasImage
    ? `\\includegraphics[width=\\columnwidth]{mystic spheres/${sphere.name.toLowerCase()}}`
    : '';

  const ranks = [1, 2, 3, 4, 5, 6, 7];
  const spellsByRank = _.groupBy(sortByRankAndLevel(sphere.spells), (s) => s.rank);

  const cantrips: ActiveAbility[] = (sphere.cantrips || []).map(standardizeCantrip);
  return format.latexify(`
    \\section{{${sphere.name}}}
      \\hypertargetraised{sphere:${sphere.name}}{}%
      \\hypertargetraised{sphere:${sphere.name.toLowerCase()}}{}%
      \\label{${sphere.name}}%
      ${imageText}
      \\par \\textit{${sphere.shortDescription}}
      ${sphere.specialRules ? `\\parhead{Special Rules} ${sphere.specialRules}` : ''}

      ${
        cantrips.length > 0
          ? `
            \\subsection{Cantrips}
            ${sortByRankAndLevel(cantrips)
              .map((spell) => {
                checkValidSpell(spell);
                return convertSpellToLatex(spell);
              })
              .join('\n')}
          `
          : ''
      }

      ${ranks
        .map((rank) =>
          spellsByRank[rank]
            ? `\\subsection{Rank ${rank} Spells}
          ${spellsByRank[rank].map((spell) => convertSpellToLatex(spell)).join('\n')}`
            : '',
        )
        .join('\n')}
  `);
}

function getSpecialScaling(spell: Pick<SpellDefinition, 'scaling'>): string | null {
  if (spell.scaling && typeof spell.scaling === 'object' && (spell.scaling as any)['special']) {
    return (spell.scaling as any)['special'];
  } else {
    return null;
  }
}

export function checkValidSpell(spell: CantripDefinition | SpellDefinition) {
  const specialScaling = getSpecialScaling(spell);

  if (spell.attack && (spell.rank || 0) <= 6 && !spell.scaling) {
    console.error(`Spell ${spell.name} is probably missing scaling`);
  }
  if (spell.rank && specialScaling) {
    const forEachRankMatch = specialScaling.match(/for each rank [^b]/);
    if (forEachRankMatch) {
      console.error(`Spell ${spell.name} uses wrong wording for its special scaling`);
    }
    const rankMatch = specialScaling.match(/for each rank beyond (\d)/);
    if (rankMatch && rankMatch[1] && rankMatch[1] !== spell.rank.toString()) {
      console.error(`Spell ${spell.name} has scaling from wrong rank ${rankMatch[1]}`);
    }
  }
}

export function convertSpellToLatex(spell: SpellDefinition, omitRank?: boolean): string {
  return convertAbilityToLatex(standardizeSpell(spell), omitRank);
}
