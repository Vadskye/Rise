import {
  CreatureAttack,
  DebuffAutoAttackResult,
  DamagingAutoAttackResult,
} from '@src/character_sheet/creature';
import { MonsterAttackUsageTime } from '@src/character_sheet/sheet_worker';
import * as format from '@src/latex/format';
import { caseInsensitiveSort } from '@src/util/sort';

export function convertAutoAttackToLatex(attack: CreatureAttack): string {
  if (isDamagingAttack(attack)) {
    return convertDamagingAttackToLatex(attack);
  } else if (isDebuff(attack)) {
    return convertDebuffToLatex(attack);
  } else {
    throw new Error(`Impossible attack: ${JSON.stringify(attack)}.`);
  }
}

function isDamagingAttack(attack: CreatureAttack): attack is DamagingAutoAttackResult {
  return (attack as DamagingAutoAttackResult).attack_damage_dice !== undefined;
}

function isDebuff(attack: CreatureAttack): attack is DebuffAutoAttackResult {
  return (attack as DamagingAutoAttackResult).attack_damage_dice === undefined;
}

export function convertDebuffToLatex(attack: DebuffAutoAttackResult): string {
  // TODO: Do we need to do more fancy processing on the effect here?
  const effect = attack.latex_effect.replaceAll('$defense', attack.defense);
  return wrapAttackWithEnvironment(attack, effect);
}

export function convertDamagingAttackToLatex(attack: DamagingAutoAttackResult): string {
  // TODO: Do we need to do more fancy processing on the effect here?
  const effect = attack.latex_effect.replaceAll('$defense', attack.defense);
  return wrapAttackWithEnvironment(attack, effect);
}

// Everything that surrounds the effect is the same between a debuff and a
// damaging attack.
function wrapAttackWithEnvironment(
  attack: Pick<DebuffAutoAttackResult, 'attack_name' | 'is_magical' | 'tags' | 'usage_time'>,
  effect: string,
) {
  return wrapEffectWithEnvironment({
    effect,
    name: attack.attack_name,
    isMagical: attack.is_magical,
    tags: (attack.tags || '').split(', '),
    usageTime: attack.usage_time,
  });
}

// TODO: This is suspiciously redundant with some of the logic from `convertSpellToLatex`.
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
    tagsText = `\\abilitytags ${formattedTags}`;
  }
  usageTime = usageTime || 'standard';
  const usageTimeText = usageTime === 'standard'
    ? 'Standard action'
    : `\\glossterm{${format.uppercaseFirst(usageTime)} action}`;
  return `
    \\begin{${environment}}*{${format.titleCase(name)}}{${usageTimeText}}
      ${tagsText}
      \\rankline
      ${effect}
    \\end{${environment}}
  `;
}

// TODO: add support for sustain/attune abilities
function determineEnvironment(isMagical: boolean): string {
  return isMagical ? 'magicalactiveability' : 'activeability';
}
