import { Ritual, SpellLike } from '@src/mystic_spheres';
import { sentenceCase } from 'change-case';
import { formatTagLatex } from '@src/latex/format/ability_tag';

export function ritualSpheres(ritual: Ritual): string {
  // TODO: sort by name
  return `Spheres: ${ritual.spheres.join(', ')}`;
}

export function spellTypePrefix(
  spell: Pick<SpellLike, 'castingTime' | 'cost' | 'name' | 'tags' | 'type' | 'rank'>,
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

  const tagsText = tags && tags.length > 0 ? `${tags.sort().map(formatTagLatex).join(', ')}` : '';

  const usageAndTags = generateUsageAndTags(spell.castingTime, spell.name, tagsText);

  if (spell.cost) {
    if (spell.cost.slice(-1) !== '.') {
      console.error(`Ability '${spell.name}' cost should end in a period.`);
    }
    return usageAndTags + '\n' + `\\abilitycost ${spell.cost}`;
  } else {
    return usageAndTags;
  }
}

export function generateUsageAndTags(
  castingTime: string | undefined,
  name: string,
  tagsText: string,
) {
  if (castingTime) {
    if (castingTime.slice(-1) === '.') {
      console.error(`Spell '${name}' casting time should not end in a period.`);
    }
    const castingText =
      castingTime === 'minor action'
        ? `\\glossterm{Minor action}.`
        : sentenceCase(castingTime) + '.';
    if (tagsText) {
      return `\\spelltwocol{Casting time: ${castingText}}{${tagsText}}`;
    } else {
      return `Casting time: ${castingText}`;
    }
  } else if (tagsText) {
    return `\\spelltwocol{Usage time: Standard action.}{${tagsText}}`;
  } else {
    return '\\abilityusagetime Standard action.';
  }
}
