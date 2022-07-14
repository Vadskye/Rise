import * as format from '@src/latex/format';
import { assertEndsWithPeriod } from '@src/latex/format/spell_effect';
import { MysticSphere, SpellLike } from '@src/mystic_spheres';
import _ from 'lodash';

export function convertMysticSphereToLatex(sphere: MysticSphere): string {
  assertEndsWithPeriod(sphere.shortDescription);
  return format.latexify(`
    \\section{{${sphere.name}}}
      \\hypertargetraised{sphere:${sphere.name}}{}%
      \\hypertargetraised{sphere:${sphere.name.toLowerCase()}}{}%
      \\label{${sphere.name}}%
      \\textit{${sphere.shortDescription}}
      ${sphere.specialRules ? `\\parhead{Special Rules} ${sphere.specialRules}` : ''}

      ${
        sphere.cantrips
          ? `
            \\subsection{Cantrips}
            ${sortByRankAndLevel(sphere.cantrips)
              .map(convertSpellToLatex)
              .join('\n')}
          `
          : ''
      }

      \\subsection{Spells}
        ${sortByRankAndLevel(sphere.spells)
          .map(convertSpellToLatex)
          .join('\n')}

      ${
        sphere.rituals
          ? `
            \\subsection{Rituals}
            ${sortByRankAndLevel(sphere.rituals)
              .map(convertSpellToLatex)
              .join('\n')}
          `
          : ''
      }
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

export function determineAbilityTypeSuffix(spell: Pick<SpellLike, 'type'>): string {
  if (!spell.type) {
    return "";
  } else if (spell.type.includes('Attune') && spell.type.includes('(')) {
    // grab the bits inside the parentheses
    return '[' + spell.type.replace(/^.*\(/, '').replace(/\).*$/, '') + ']'
  } else if (spell.type.includes('Sustain')) {
    return '[' + spell.type + ']';
  } else {
    return "";
  }
}

function convertSpellToLatex(spell: SpellLike): string {
  const abilityType = determineAbilityType(spell);
  const internalComponents = [
    format.spellEffect(spell, 'spell'),
    format.spellScaling(spell),
    format.spellNarrative(spell),
  ].filter(Boolean);
  const tableText = spell.tableText || '';

  const typeText = determineAbilityTypeSuffix(spell);

  const latex = `
    \\begin{${abilityType}}{${spell.name}}${typeText}
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
