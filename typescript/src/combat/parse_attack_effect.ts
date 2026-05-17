import { ActiveAbility, SimulatorReadyAttack, ParsedDebuff } from '@src/abilities/active_abilities';
import { Creature } from '@src/character_sheet/creature';
import { RiseDefense } from '@src/core_mechanics/attributes';
import { calculateDamage, parseDamageRank } from '@src/core_mechanics/damage_calculation';
import { DicePool } from '@src/core_mechanics/dice_pool';
import { calculateStrikeDamage } from '@src/latex/monsters/player_abilities';
import { isWeapon } from '@src/monsters/equipment';

/**
 * Normalizes an ActiveAbility into a SimulatorReadyAttack by parsing its text.
 */
export function parseAttackEffect(
  ability: ActiveAbility,
  creature: Creature,
): SimulatorReadyAttack | null {
  const attack = ability.attack;
  const effect = (ability.effect || '').replace(/\s+/g, ' ').trim().toLowerCase();
  const hit = (attack?.hit || '').replace(/\s+/g, ' ').trim().toLowerCase();
  const targeting = (attack?.targeting || '').replace(/\s+/g, ' ').trim().toLowerCase();
  const injury = (attack?.injury || '').replace(/\s+/g, ' ').trim().toLowerCase();
  const text = `${targeting} ${hit} ${effect} ${injury}`;

  // 1. Identify targeted defenses
  const defenses = parseDefenses(text);
  if (defenses.length === 0) {
    if (text.includes('strike')) {
      defenses.push('armor_defense');
    } else if (text.includes('\\hprank')) {
      // Healing abilities don't have defenses, but we want to parse them.
    } else {
      // If no defenses are found and it's not a strike, it's likely not an attack we can parse.
      return null;
    }
  }

  // Add logic to include weapon if creature has exactly one and it's a strike
  if (text.includes('strike') && !ability.weapon) {
    const equipment = creature.getEquipment();
    const weapons = equipment.filter(isWeapon);
    if (weapons.length === 1) {
      ability.weapon = weapons[0];
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
    debuffsToApply: parseConditions(text),
  };
}

function parseCooldown(ability: ActiveAbility, text: string): number {
  const lowercaseText = (text + (ability.effect || '') + (ability.cost || '')).toLowerCase();

  // "Briefly" lasts until the end of the next turn. Since cooldowns are
  // decremented at the start of the turn, a value of 2 means the ability
  // skips exactly one turn (e.g., used on Turn 1, skipped on Turn 2,
  // ready on Turn 3).
  const isBrief =
    lowercaseText.includes('briefly cannot use this ability again') ||
    lowercaseText.includes("briefly can't use this ability again") ||
    lowercaseText.includes('briefly');
  const isDifficultCondition = lowercaseText.includes('dealt damage to you since your last turn');

  if (isBrief || isDifficultCondition) {
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
    const regex = new RegExp(`(vs\\.|against|and) (\\\\glossterm{)?${name}`, 'i');
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

function parseAreaRank(text: string): number | null {
  const lowercaseText = text.toLowerCase();

  // 1. Identify Range
  const getRange = () => {
    if (lowercaseText.includes('\\shortrange')) return 'short';
    if (lowercaseText.includes('\\medrange')) return 'medium';
    if (lowercaseText.includes('\\longrange')) return 'long';
    if (lowercaseText.includes('\\distrange')) return 'distant';
    if (
      lowercaseText.includes('from you') ||
      lowercaseText.includes('adjacent to you') ||
      lowercaseText.includes('from your location') ||
      lowercaseText.includes('around you') ||
      lowercaseText.includes('emanation')
    ) {
      return 'self';
    }
    return 'short'; // Default range
  };

  // 2. Identify Size
  const getSize = () => {
    if (lowercaseText.includes('\\tinyarea') || lowercaseText.includes('tiny')) return 0;
    if (lowercaseText.includes('\\smallarea') || lowercaseText.includes('small')) return 1;
    if (lowercaseText.includes('\\medarea') || lowercaseText.includes('medium')) return 2;
    if (lowercaseText.includes('\\largearea') || lowercaseText.includes('large')) return 3;
    if (lowercaseText.includes('\\hugearea') || lowercaseText.includes('huge')) return 4;
    if (lowercaseText.includes('\\gargarea') || lowercaseText.includes('gargantuan')) return 5;
    return 1; // Default size
  };

  const range = getRange();
  const size = getSize();
  const isEnemiesOnly = lowercaseText.includes('enemies');

  // 3. Targets (up to X creatures/targets)
  const targetMatch = lowercaseText.match(
    /up to (one|two|three|four|five|six|seven|eight|nine|ten|\d+) (creatures|targets|humanoid|object|creature)/,
  );
  if (targetMatch || lowercaseText.includes('against something within')) {
    const countText = targetMatch ? targetMatch[1] : 'one';
    const count =
      parseInt(countText) ||
      ({
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
      }[countText] ??
        1);

    if (range === 'distant') return 2;
    if (range === 'long') return 1;
    if (range === 'medium') {
      if (count <= 2) return 2;
      return 4;
    }
    // Short range / Self
    if (count <= 1) return 0;
    if (count === 2) return 1;
    if (count === 3) return 2;
    if (count === 4) return 3;
    return 4;
  }

  // 4. Area Counts (e.g., "two small radii")
  const countMatch = lowercaseText.match(
    /(two|three|four|five|six|seven|eight|nine|ten|2|3|4|5|6|7|8|9|10) (separate |separate areas of )?(tiny|small|med|large|huge|garg|\\tiny|\\small|\\med|\\large|\\huge|\\garg)/,
  );
  const areaCount = countMatch
    ? parseInt(countMatch[1]) ||
      ({
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
        ten: 10,
      }[countMatch[1]] ??
        1)
    : 1;

  // 5. Cones
  if (lowercaseText.includes('cone')) {
    // Small (size 1) -> Rank 0
    // Medium (size 2) -> Rank 2
    // Large (size 3) -> Rank 4
    let rank = (size - 1) * 2;
    if (areaCount > 1) rank += 1;
    if (isEnemiesOnly) rank += 1;
    return Math.max(0, rank);
  }

  // 6. Radius / Emanation / Zones
  if (
    lowercaseText.includes('radius') ||
    lowercaseText.includes('emanation') ||
    lowercaseText.includes('zone')
  ) {
    let rank = 4;
    if (range === 'self') {
      // Small (size 1) -> Rank 0
      // Medium (size 2) -> Rank 2
      // Large (size 3) -> Rank 4
      rank = (size - 1) * 2;
      if (areaCount > 1) rank += 2;
      if (isEnemiesOnly) rank += 2;
    } else {
      // Ranged radius
      if (range === 'short') {
        if (size === 0) rank = 1;
        else if (size === 1) rank = 3;
        else if (size === 2) rank = 4;
        else rank = 6;
      } else if (range === 'medium') {
        if (size === 0) rank = 2;
        else if (size === 1) rank = 4;
        else if (size === 2) rank = 5;
        else if (size === 3) rank = 7;
        else rank = 8;
      }
      if (areaCount > 1) rank += 2;
      if (isEnemiesOnly) rank += 1;
    }
    return Math.max(0, rank);
  }

  // 7. Lines / Walls
  if (lowercaseText.includes('line') || lowercaseText.includes('wall')) {
    let rank = 2;
    if (lowercaseText.includes('wall')) {
      rank = 1;
      if (size === 2) rank += 1;
      if (size === 3) rank += 3;
      if (range === 'medium') rank += 1;
      if (range === 'long') rank += 2;
    } else {
      // Line (from self)
      if (size === 1) rank = 0;
      else if (size === 2) rank = 1;
      else if (size === 3) rank = 3;
      else if (size === 4) rank = 4;
      if (areaCount > 1) rank += 1;
    }
    if (isEnemiesOnly) rank += 1;
    return rank;
  }

  // 7. Special Cases
  if (lowercaseText.includes('adjacent')) {
    return 0; // Doc says "Tiny radius from self" (adjacent) is Rank 0
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

function parseConditions(text: string): ParsedDebuff[] {
  const conditions: ParsedDebuff[] = [];
  const lowercaseText = text.toLowerCase();

  const checkCondition = (conditionName: string): ParsedDebuff | null => {
    if (!lowercaseText.includes(conditionName)) return null;

    // Check for "briefly [condition]"
    const briefRegex = new RegExp(`briefly\\s*\\\\*${conditionName}`);
    // Check for "[condition] as a condition"
    const conditionRegex = new RegExp(`${conditionName}\\s*as\\s*a\\s*(\\\\glossterm{)?condition`);

    if (briefRegex.test(lowercaseText)) {
      return { type: conditionName, duration: 'fixed', durationRemaining: 2 };
    } else if (conditionRegex.test(lowercaseText)) {
      return { type: conditionName, duration: 'condition' };
    } else {
      // Default
      if (conditionName === 'prone') {
        return { type: 'prone', duration: 'fixed', durationRemaining: 2 };
      }
      if (conditionName === 'grappled') {
        return { type: 'grappled', duration: 'circumstance' };
      }
      return { type: conditionName, duration: 'condition' };
    }
  };

  // Order matters for tests that use t.same
  const conditionNames = ['grappled', 'prone', 'stunned', 'confused', 'dazzled', 'goaded', 'unsteady'];

  for (const name of conditionNames) {
    const parsed = checkCondition(name);
    if (parsed) {
      conditions.push(parsed);
    }
  }

  return conditions;
}
