import { ActiveAbility, ActiveAbilityRank } from '@src/abilities';
import { formatTagLatex } from '@src/latex/format/ability_tag';

export function spellTypePrefix(
  spell: Pick<
    ActiveAbility,
    | 'usageTime'
    | 'cost'
    | 'name'
    | 'tags'
    | 'type'
    | 'rank'
    | 'kind'
    | 'staminaCost'
    | 'materialCost'
  >,
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

  const tagsText =
    tags && tags.length > 0 ? `\\abilitytags ${tags.sort().map(formatTagLatex).join(', ')}` : '';

  const tagsAndRank = generateTagsAndRank(tagsText, spell.rank, omitRank);

  let cost = spell.cost;
  if (!cost && spell.kind === 'ritual' && spell.staminaCost !== false) {
    const staminaLevel =
      spell.usageTime === '24 hours' || spell.usageTime === 'one week'
        ? `${Math.pow(spell.rank || 0, 2) * 2} \\glossterm{stamina}`
        : 'one \\glossterm{stamina}';
    const materialCostText = spell.materialCost
      ? ` and the consumption of diamond dust with the equivalent value of a rank ${spell.rank} item (${calculateGp(spell.rank)})`
      : '';
    cost = `${staminaLevel} from the ritual's participants${materialCostText}.`;
  }

  if (cost) {
    if (cost.trim().slice(-1) !== '.') {
      console.error(`Ability '${spell.name}' cost should end in a period.`);
    }
    return tagsAndRank + '\n' + `\\abilitycost ${cost}`;
  } else {
    return tagsAndRank;
  }
}

function calculateGp(itemRank?: ActiveAbilityRank): string {
  if (itemRank === null || itemRank === undefined) {
    throw new Error('Cannot calculate gp for missing rank');
  }
  return (
    {
      0: '10 gp or less',
      1: '40 gp',
      2: '200 gp',
      3: '1,000 gp',
      4: '5,000 gp',
      5: '25,000 gp',
      6: '125,000 gp',
      7: '625,000 gp',
    }[itemRank] || ''
  );
}

export function generateTagsAndRank(
  tagsText: string,
  rank?: ActiveAbilityRank,
  omitRank?: boolean,
) {
  if (rank && !omitRank) {
    return `\\spelltwocol{${tagsText}}{Rank ${rank}}`;
  } else {
    return `${tagsText}`;
  }
}
