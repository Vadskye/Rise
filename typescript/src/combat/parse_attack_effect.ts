import { ActiveAbility, SimulatorReadyAttack } from '@src/abilities/active_abilities';
import { Creature } from '@src/character_sheet/creature';
import { RiseDefense } from '@src/core_mechanics/attributes';
import { DicePool } from '@src/core_mechanics/dice_pool';
import { calculateDamage, calculateStrikeDamage } from '@src/latex/monsters/player_abilities';

/**
 * Normalizes an ActiveAbility into a SimulatorReadyAttack by parsing its text.
 */
export function parseAttackEffect(
  ability: ActiveAbility,
  creature: Creature,
): SimulatorReadyAttack | null {
  const attack = ability.attack;
  const effect = (ability.effect || '').replace(/\s+/g, ' ').trim().toLowerCase();
  const targeting = (attack?.targeting || '').replace(/\s+/g, ' ').trim().toLowerCase();
  const text = `${targeting} ${effect}`;

  // 1. Identify targeted defenses
  const defenses = parseDefenses(text);
  if (defenses.length === 0) {
    if (text.includes('strike')) {
      defenses.push('armor_defense');
    } else {
      // If no defenses are found and it's not a strike, it's likely not an attack we can parse.
      return null;
    }
  }

  // 2. Parse Damage
  const damage = parseDamage(ability, creature);

  // 3. Parse Area Rank
  const areaRank = parseAreaRank(text);

  // 4. Parse Accuracy Modifier
  const accuracyModifier = parseAccuracyModifier(text);

  // 5. Parse Cooldown
  const cooldown = parseCooldown(ability, text);

  return {
    areaRank,
    accuracyModifier,
    cooldown,
    damage,
    defenses,
    halfOnMiss: attack?.halfOnMiss || false,
    name: ability.name,
    usageTime: ability.usageTime || 'standard',
  };
}

function parseCooldown(ability: ActiveAbility, text: string): number {
  const lowercaseText = (text + (ability.effect || '') + (ability.cost || '')).toLowerCase();

  // "Briefly" lasts until the end of the next turn. Since cooldowns are
  // decremented at the start of the turn, a value of 2 means the ability
  // skips exactly one turn (e.g., used on Turn 1, skipped on Turn 2, 
  // ready on Turn 3).
  if (
    lowercaseText.includes('briefly cannot use this ability again') ||
    lowercaseText.includes("briefly can't use this ability again") ||
    lowercaseText.includes('briefly')
  ) {
    return 2;
  }

  // Look for "cooldown X" or "X round cooldown"
  const cooldownMatch = lowercaseText.match(/cooldown (\d+)|(\d+)[ -]round cooldown/);
  if (cooldownMatch) {
    return Number(cooldownMatch[1] || cooldownMatch[2]);
  }

  return 0;
}

function parseDefenses(text: string): RiseDefense[] {
  const defenses: RiseDefense[] = [];
  const lowercaseText = text.toLowerCase();

  const defenseMap: Record<string, RiseDefense> = {
    armor: 'armor_defense',
    brawn: 'brawn',
    fortitude: 'fortitude',
    reflex: 'reflex',
    mental: 'mental',
  };

  for (const [name, value] of Object.entries(defenseMap)) {
    // Look for "vs. Defense" or "against Defense"
    const regex = new RegExp(`(vs\\.|against|and) (\\glossterm{)?${name}`, 'i');
    if (regex.test(lowercaseText)) {
      defenses.push(value);
    }
  }

  return defenses;
}

function parseDamage(ability: ActiveAbility, creature: Creature): DicePool {
  // Try to find \damagerank expressions
  const text = ability.attack?.hit || ability.effect || '';
  const damageRankMatch = text.match(/\\(damage|hp)rank(\w+)/);

  if (damageRankMatch) {
    const rankAndMaybeLow = damageRankMatch[2];
    const damageRankText = rankAndMaybeLow.replace('low', '');
    const lowPowerScaling = /low/.test(rankAndMaybeLow);

    const rank = parseDamageRank(damageRankText);
    return calculateDamage(creature, ability, rank, lowPowerScaling);
  }

  // If it's a strike-based ability, use calculateStrikeDamage
  if (text.toLowerCase().includes('strike') || (ability.weapon && !ability.attack)) {
    try {
      return calculateStrikeDamage(creature, ability, ability.isMagical);
    } catch (e) {
      // If strike parsing fails, return empty pool
      return DicePool.empty();
    }
  }

  // Look for flat damage: "X damage" or "X hit points"
  const flatDamageMatch = text.match(/(\d+) (damage|hit points)/);
  if (flatDamageMatch) {
    return DicePool.flat(Number(flatDamageMatch[1]));
  }

  return DicePool.empty();
}

type DamageRank = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

function parseDamageRank(rankText: string): DamageRank {
  const rankMap: Record<string, number> = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
  };
  return (rankMap[rankText.toLowerCase()] ?? 0) as DamageRank;
}

function parseAreaRank(text: string): number | null {
  const lowercaseText = text.toLowerCase();

  // Standard radius/cone/line mappings based on standard_area_ranks.md
  if (lowercaseText.includes('\\largearea')) return 4;
  if (lowercaseText.includes('\\medarea')) {
    if (lowercaseText.includes('radius')) return 2;
    if (lowercaseText.includes('cone')) return 2;
    if (lowercaseText.includes('line')) return 3; // Large line is R3
    return 2;
  }
  if (lowercaseText.includes('\\smallarea')) {
    if (lowercaseText.includes('radius')) return 3; // Small radius in Short range is R3
    if (lowercaseText.includes('cone')) return 0; // Small cone is R0
    return 1;
  }
  if (lowercaseText.includes('\\tinyarea') || lowercaseText.includes('adjacent')) {
    return 0;
  }

  return null;
}

function parseAccuracyModifier(text: string): number {
  const match = text.match(/(\\plus|\\minus|\+|-)(\d+) (\\glossterm{)?accuracy/);
  if (match) {
    const sign = match[1] === '\\minus' || match[1] === '-' ? -1 : 1;
    return sign * Number(match[2]);
  }
  return 0;
}
