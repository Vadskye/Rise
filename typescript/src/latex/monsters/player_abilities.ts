import { Creature } from '@src/character_sheet/creature';
import { MonsterAttackUsageTime } from '@src/character_sheet/sheet_worker';
import * as format from '@src/latex/format';
import { caseInsensitiveSort } from '@src/util/sort';
import { Maneuver } from '@src/combat_styles';
import { BaseSpellLike, Spell } from '@src/mystic_spheres';

export function convertManeuverToLatex(monster: Creature, maneuver: Maneuver): string {
  return convertPlayerAbilityToLatex(monster, maneuver, false);
}

export function convertSpellToLatex(monster: Creature, spell: Spell): string {
  return convertPlayerAbilityToLatex(monster, spell, true);
}

// TODO: Fix the type confusion that makes this necessary
interface PlayerAbility extends BaseSpellLike {
  rank: number;
}

export function wrapEffectWithEnvironment({
  effect,
  name,
  isMagical,
  tags,
  usageTime,
}: {
  effect: string;
  name: string;
  isMagical: boolean;
  tags?: string[];
  usageTime?: MonsterAttackUsageTime;
}): string {
  const environment = determineEnvironment(isMagical);
  let tagsText = '';
  if (tags && tags.length > 0) {
    const formattedTags = tags
      .sort(caseInsensitiveSort)
      .map((tag) => `\\abilitytag{${format.titleCase(tag)}}`)
      .join(', ');
    tagsText = `[${formattedTags}]`;
  }
  const usageTimeText = `\\abilityusagetime ${format.uppercaseFirst(usageTime || 'standard')} action.`;
  return `
    \\begin{${environment}}*{${format.titleCase(name)}}${tagsText}
      ${usageTimeText}
      \\rankline
      ${effect}
    \\end{${environment}}
  `;
}

// TODO: add support for sustain/attune abilities
function determineEnvironment(isMagical: boolean): string {
  return isMagical ? 'magicalactiveability' : 'activeability';
}

// Convert a standard spell or maneuver that appears in the player-facing section of the
// book so it is written as a monster ability.
function convertPlayerAbilityToLatex(monster: Creature, ability: PlayerAbility, isMagical: boolean) {
  // TODO: correctly format effect
  const effect = ability.effect || ability.attack?.hit || 'blank effect';

  return wrapEffectWithEnvironment({
    effect,
    name: ability.name,
    isMagical,
    tags: ability.tags,
    // TODO: figure out how to mark non-standard action abilities on monsters
  });
}
