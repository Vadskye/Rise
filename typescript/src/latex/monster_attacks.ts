import {
  CreatureAttack,
  DebuffAutoAttackResult,
  DamagingAutoAttackResult,
} from '@src/character_sheet/creature';
import * as format from '@src/latex/format';
import { caseInsensitiveSort } from '@src/util/sort';

export function convertAttackToLatex(attack: CreatureAttack): string {
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
  return calcWrappedEffect(attack, attack.monster_effect);
}

export function convertDamagingAttackToLatex(attack: DamagingAutoAttackResult): string {
  // TODO: Do we need to do more fancy processing on the effect here?
  return calcWrappedEffect(attack, attack.monster_effect);
}

// Everything that surrounds the effect is the same between a debuff and a
// damaging attack.
function calcWrappedEffect(
  attack: Pick<DebuffAutoAttackResult, 'attack_name' | 'is_magical' | 'tags' | 'usage_time'>,
  effect: string,
) {
  const environment = calcEnvironment(attack.is_magical);
  const tagsText = attack.tags
    .split(', ')
    .sort(caseInsensitiveSort)
    .map((tag) => `\\abilitytag{${format.titleCase(tag)}}`)
    .join(', ');
  const usageTimeText = `\\abilityusagetime ${format.uppercaseFirst(attack.usage_time)} action.`;
  return `
    \\begin{${environment}}*{${format.uppercaseFirst(attack.attack_name)}}[${tagsText}]
      ${usageTimeText}
      \\rankline
      ${effect}
    \\end{${environment}}
  `;
}

// TODO: add support for sustain/attune abilities
function calcEnvironment(isMagical: boolean): string {
  return isMagical ? 'magicalactiveability' : 'activeability';
}
