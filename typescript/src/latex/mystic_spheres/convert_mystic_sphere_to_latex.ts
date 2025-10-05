import * as format from '@src/latex/format';
import { assertEndsWithPeriod } from '@src/latex/format/spell_effect';
import { MysticSphere, SpellLike } from '@src/mystic_spheres';
import _ from 'lodash';

export function convertMysticSphereToLatex(sphere: MysticSphere): string {
  assertEndsWithPeriod(sphere.shortDescription, sphere.name);

  const imageText = sphere.hasImage
    ? `\\includegraphics[width=\\columnwidth]{mystic spheres/${sphere.name.toLowerCase()}}`
    : '';

  const ranks = [1, 2, 3, 4, 5, 6, 7];
  const spellsByRank = _.groupBy(sortByRankAndLevel(sphere.spells), (s) => s.rank);
  return format.latexify(`
    \\section{{${sphere.name}}}
      \\hypertargetraised{sphere:${sphere.name}}{}%
      \\hypertargetraised{sphere:${sphere.name.toLowerCase()}}{}%
      \\label{${sphere.name}}%
      ${imageText}
      \\par \\textit{${sphere.shortDescription}}
      ${sphere.specialRules ? `\\parhead{Special Rules} ${sphere.specialRules}` : ''}

      ${
        sphere.cantrips
          ? `
            \\subsection{Cantrips}
            ${sortByRankAndLevel(sphere.cantrips).map(convertSpellToLatex).join('\n')}
          `
          : ''
      }

      ${ranks
        .map((rank) =>
          spellsByRank[rank]
            ? `\\subsection{Rank ${rank} Spells}
          ${spellsByRank[rank].map(convertSpellToLatex).join('\n')}`
            : '',
        )
        .join('\n')}
  `);
}

export function determineAbilityType(spell: Pick<SpellLike, 'type'>): string {
  if (!spell.type) {
    return 'activeability';
  } else if (spell.type.includes('Attune')) {
    return 'attuneability';
  } else if (spell.type.includes('Sustain')) {
    return 'sustainability';
  } else {
    return 'activeability';
  }
}

// The types make this kind of annoying
function getSpecialScaling(spell: SpellLike): string | null {
  if (spell.scaling && typeof spell.scaling === 'object' && (spell.scaling as any)['special']) {
    return (spell.scaling as any)['special'];
  } else {
    return null;
  }
}

function convertSpellToLatex(spell: SpellLike): string {
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

  const abilityType = determineAbilityType(spell);
  const internalComponents = [
    format.spellEffect(spell, 'spell'),
    format.spellScaling(spell),
    format.spellNarrative(spell),
  ].filter(Boolean);
  const tableText = spell.tableText || '';

  const rankText = spell.rank ? `Rank ${spell.rank}` : '';
  const wrappedRankText = abilityType === 'activeability' ? `[${rankText}]` : `{${rankText}}`;

  const latex = `
    \\begin{${abilityType}}{${spell.name}}${wrappedRankText}
      ${format.spellTypePrefix(spell) || ''}
      \\rankline
      \\hypertargetraised{spell:${spell.name}}{}%
      \\hypertargetraised{spell:${spell.name.toLowerCase()}}{}%
      \\noindent
      ${internalComponents.join('\n\\rankline\n\n\\noindent ').trim()}%
      \\vspace{0.1em}%
    \\end{${abilityType}}
    ${tableText}
  `;

  // if (spell.type === "Attune (target)" && (latex.includes("you ") || latex.includes("your "))) {
  //   console.log(`Spell ${spell.name} has inconsistent you/target`);
  // }

  return latex;
}

export function sortByRankAndLevel<T extends Pick<SpellLike, 'name' | 'rank'>>(spells: T[]): T[] {
  // Sort by level as primary, name as secondary
  return _.sortBy(
    _.sortBy(spells, (s) => s.name),
    (s) => s.rank,
  );
}
