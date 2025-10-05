import { Rank, Ritual, SpellLike } from '@src/mystic_spheres';
import { formatTagLatex } from '@src/latex/format/ability_tag';

export function ritualSpheres(ritual: Ritual): string {
  // TODO: sort by name
  return `Spheres: ${ritual.spheres.join(', ')}`;
}

export function spellTypePrefix(
  spell: Pick<SpellLike, 'castingTime' | 'cost' | 'name' | 'tags' | 'type' | 'rank'>,
  omitRank?: boolean,
): string {
  const tags = spell.tags || [];
  if (spell.type) {
    if (spell.type.includes('(')) {
      // grab the bits inside the parentheses
      const inParens = spell.type.replace(/^.*\(/, '').replace(/\).*$/, '');
      if (spell.type.includes('Attune')) {
        tags.push(`\\abilitytag{Attune} (${inParens})`);
      } else if (spell.type.includes('Sustain')) {
        tags.push(`\\abilitytag{Sustain} (${inParens})`);
      } else {
        throw new Error(`Unrecognized type with parens: ${spell.type}`);
      }
    } else {
      tags.push(spell.type);
    }
  }

  const tagsText = tags && tags.length > 0 ? `\\abilitytags ${tags.sort().map(formatTagLatex).join(', ')}` : '';

  const tagsAndRank = generateTagsAndRank(tagsText, spell.rank, omitRank);

  if (spell.cost) {
    if (spell.cost.slice(-1) !== '.') {
      console.error(`Ability '${spell.name}' cost should end in a period.`);
    }
    return tagsAndRank + '\n' + `\\abilitycost ${spell.cost}`;
  } else {
    return tagsAndRank;
  }
}

export function generateTagsAndRank(
  tagsText: string,
  rank?: Rank,
  omitRank?: boolean,
) {
  if (rank && !omitRank) {
    return `\\spelltwocol{${tagsText}}{Rank ${rank}}`
  } else {
    return `${tagsText}`;
  }
}
