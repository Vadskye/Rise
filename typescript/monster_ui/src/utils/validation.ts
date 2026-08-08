import type { MonsterData, MonsterGroupData } from '../../server/codegen';
import { Creature } from '@src/character_sheet/creature';
import { RISE_ATTRIBUTES } from '@src/core_mechanics/attributes';

/**
 * Shared validation logic and warning message generation for the Monster Creator.
 * Centralizing this logic avoids duplication and prevents silent mismatches
 * between server-side generation and client-side warning display.
 */

/**
 * Checks if a maneuver's effect description indicates that it makes a strike.
 * Standardizes the RegExp check used in both server validation and UI reference checks.
 */
export function maneuverMakesStrike(effectText: string): boolean {
  return /make.*strike/i.test(effectText);
}

/**
 * Formats the warning message for a maneuver making a strike without an equipped weapon.
 */
export function formatMissingWeaponWarning(name: string, isThrowItem?: boolean): string {
  if (isThrowItem) {
    return `Maneuver "${name}" requires an alchemical item.`;
  }
  return `Maneuver "${name}" makes a strike and doesn't have a weapon.`;
}

/**
 * Checks if a given warning string matches the missing weapon warning for a specific maneuver name.
 * Handles display name overrides by matching the generated pattern.
 */
export function isMissingWeaponWarning(
  warning: string,
  name: string,
  isThrowItem?: boolean,
): boolean {
  return warning === formatMissingWeaponWarning(name, isThrowItem);
}

/**
 * Formats the warning message for a monster having freeform initialization code.
 */
export function formatFreeformCodeWarning(name: string): string {
  return `Monster "${name}" has freeform initialization code.`;
}

/**
 * Checks if a given warning string matches the freeform code warning for a specific monster name.
 */
export function isFreeformCodeWarning(warning: string, name: string): boolean {
  return warning === formatFreeformCodeWarning(name);
}

/**
 * Formats the warning message for a monster having shared freeform initialization code.
 */
export function formatSharedFreeformCodeWarning(name: string): string {
  return `Monster "${name}" has shared freeform initialization code.`;
}

/**
 * Formats the warning message for a monster having no standard action abilities.
 */
export function formatNoStandardActionWarning(name: string): string {
  return `Monster "${name}" must have at least one standard action ability.`;
}

export function checkValidMonster(
  creature: Creature,
  _monster: MonsterData,
  parentGroup?: MonsterGroupData,
): string[] {
  const warnings: string[] = [];

  if (creature.name === creature.name.toLowerCase()) {
    warnings.push('Name must be title case');
  }
  if (!creature.alignment) {
    warnings.push('Must have alignment');
  }
  if (!creature.base_class) {
    warnings.push('Must have base class');
  }
  if (!creature.level || creature.level < 1) {
    warnings.push('Must have level');
  }
  if (!creature.creature_origin) {
    warnings.push('Must have origin');
  }
  if (!creature.creature_types || creature.creature_types.length === 0) {
    warnings.push('Must have at least one creature type');
  }
  if (!creature.size) {
    warnings.push('Must have size');
  }

  if (creature.intelligence >= -2 && creature.getTrainedSkillNames().length === 0) {
    warnings.push('Has no trained skills');
  }

  if (creature.intelligence > -8 && creature.creature_types.includes('animal')) {
    warnings.push('Animals should have an Intelligence of -8 or less');
  }
  if (creature.intelligence > -5 && creature.isExactlyCreatureType('beast')) {
    warnings.push('Pure beasts should have an Intelligence of -5 or less');
  }
  if (creature.isExactlyCreatureType('humanoid') && !creature.body_armor_name) {
    warnings.push('Humanoids should usually have body armor');
  }

  const standardAbilities = creature
    .getActiveAbilities()
    .filter((ability) => (ability.usageTime || 'standard') === 'standard');
  if (standardAbilities.length === 0) {
    warnings.push(formatNoStandardActionWarning(creature.name));
  }

  if (creature.elite) {
    const eliteAbilities = creature
      .getActiveAbilities()
      .filter((ability) => ability.usageTime === 'elite');
    if (eliteAbilities.length === 0) {
      warnings.push('Elite creatures must have at least one elite action ability');
    }
  }

  let hasNonzeroAttribute = false;
  for (const attribute of RISE_ATTRIBUTES) {
    if ((creature[attribute] ?? 0) !== 0) {
      hasNonzeroAttribute = true;
      break;
    }
  }
  if (!hasNonzeroAttribute) {
    warnings.push('Must have at least one nonzero attribute');
  }

  const parentKnowledge = parentGroup?.knowledge || {};
  const hasParentKnowledge =
    parentKnowledge.easy ||
    parentKnowledge.normal ||
    parentKnowledge.hard ||
    parentKnowledge.legendary;
  if (!(creature.hasKnowledgeResults() || hasParentKnowledge)) {
    warnings.push(
      'Creature must either have personal knowledge results or be part of a group with knowledge results',
    );
  }

  checkValidAttributes(creature, warnings);

  return warnings;
}

function checkValidAttributes(creature: Creature, warnings: string[]) {
    // Make sure the monster has a reasonable attribute sum
    // PCs start with 8, and they have to share that with Intelligence.
    // Elites can have +1 to all attributes.
    const level0MaxAttributes = creature.elite ? 15 : 9;
    const maxAttributes = level0MaxAttributes + creature.level;
    const minAttributes = Math.floor(maxAttributes / 2);
    // Values of -10 generally mean the monster doesn't *have* the relevant attribute,
    // which is different than a crippling penalty.
    const pointsFromAttribute = (val: number) => val === -10 ? 0 : val;
    const attributeSum = pointsFromAttribute(creature.strength) + pointsFromAttribute(creature.constitution) + pointsFromAttribute(creature.dexterity) + pointsFromAttribute(creature.perception) + pointsFromAttribute(creature.willpower);
    if (attributeSum > maxAttributes) {
      warnings.push(`Has ${attributeSum} attributes, expected max ${maxAttributes}`);
    } else if (attributeSum < minAttributes) {
      warnings.push(`Has ${attributeSum} attributes, expected min ${minAttributes}`);
    }

    // Also check individual attribute max
    const maxAttribute = creature.character_rank + (creature.elite ? 6 : 5);
    for (const attribute of RISE_ATTRIBUTES) {
      if (creature[attribute] > maxAttribute) {
        warnings.push(`Has ${attribute} of ${creature[attribute]}, expected max ${maxAttribute}`);
      }
    }
}
