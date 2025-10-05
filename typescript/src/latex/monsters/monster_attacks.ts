import {
  CreatureAttack,
  DebuffAutoAttackResult,
  DamagingAutoAttackResult,
} from '@src/character_sheet/creature';
import { wrapEffectWithEnvironment } from './player_abilities';

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
