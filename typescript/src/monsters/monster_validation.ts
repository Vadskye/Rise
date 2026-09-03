import { Creature } from '@src/character_sheet/creature';
import { RISE_ATTRIBUTES } from '@src/core_mechanics/attributes';
import { MonsterGroup } from '@src/monsters/grimoire';

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
 * Formats the warning message for a maneuver requiring a poison without a poison assigned.
 */
export function formatMissingPoisonWarning(name: string): string {
  return `Maneuver "${name}" requires a poison.`;
}

/**
 * Checks if a given warning string matches the missing poison warning for a specific maneuver name.
 */
export function isMissingPoisonWarning(warning: string, name: string): boolean {
  return warning === formatMissingPoisonWarning(name);
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
  parentGroup?: MonsterGroup,
): { requirements: string[]; guidelines: string[] } {
  const requirements: string[] = [];
  const guidelines: string[] = [];

  if (creature.name === creature.name.toLowerCase()) {
    requirements.push('Name must be title case');
  }
  if (!creature.alignment) {
    requirements.push('Must have alignment');
  }
  if (!creature.base_class) {
    requirements.push('Must have base class');
  }
  if (!creature.level || creature.level < 1) {
    requirements.push('Must have level');
  }
  if (!creature.creature_origin) {
    requirements.push('Must have origin');
  }
  if (!creature.creature_types || creature.creature_types.length === 0) {
    requirements.push('Must have at least one creature type');
  }
  if (!creature.size) {
    requirements.push('Must have size');
  }

  if (creature.intelligence >= -2 && creature.getTrainedSkillNames().length === 0) {
    guidelines.push('Has no trained skills');
  }

  if (creature.intelligence > -8 && creature.creature_types.includes('animal')) {
    requirements.push('Animals must have an Intelligence of -8 or less');
  }
  if (creature.intelligence > -5 && creature.isExactlyCreatureType('beast')) {
    requirements.push('Pure beasts must have an Intelligence of -5 or less');
  }
  if (creature.isExactlyCreatureType('humanoid') && creature.body_armor_name) {
    guidelines.push('Humanoids should usually have body armor');
  }
  if (
    creature.isExactlyCreatureType('beast') &&
    !creature.hasTrait('multipedal') &&
    !creature.hasTrait('legless')
  ) {
    guidelines.push('Beasts should usually be multipedal.');
  }

  const standardAbilities = creature
    .getActiveAbilities()
    .filter((ability) => (ability.usageTime || 'standard') === 'standard');
  if (standardAbilities.length === 0) {
    requirements.push(formatNoStandardActionWarning(creature.name));
  }

  if (creature.elite) {
    const eliteAbilities = creature
      .getActiveAbilities()
      .filter((ability) => ability.usageTime === 'elite');
    if (eliteAbilities.length === 0) {
      requirements.push('Elite creatures must have at least one elite action ability');
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
    requirements.push('Must have at least one nonzero attribute');
  }

  const parentKnowledge = parentGroup?.knowledge || {};
  const hasParentKnowledge =
    parentKnowledge.easy ||
    parentKnowledge.normal ||
    parentKnowledge.hard ||
    parentKnowledge.legendary;
  if (!(creature.hasKnowledgeResults() || hasParentKnowledge)) {
    guidelines.push(
      'Creature must either have personal knowledge results or be part of a group with knowledge results',
    );
  }

  checkValidAttributes(creature, guidelines);

  return { requirements, guidelines };
}

function checkValidAttributes(creature: Creature, guidelines: string[]) {
  // Make sure the monster has a reasonable attribute sum
  // PCs start with 8, and they have to share that with Intelligence.
  // Elites can have +1 to all attributes.
  const level0MaxAttributes = creature.elite ? 15 : 9;
  const maxAttributes = level0MaxAttributes + creature.level;
  const minAttributes = Math.floor(maxAttributes / 2);
  // Values of -10 generally mean the monster doesn't *have* the relevant attribute,
  // which is different than a crippling penalty.
  const pointsFromAttribute = (val: number) => (val === -10 ? 0 : val);
  const attributeSum =
    pointsFromAttribute(creature.strength) +
    pointsFromAttribute(creature.constitution) +
    pointsFromAttribute(creature.dexterity) +
    pointsFromAttribute(creature.perception) +
    pointsFromAttribute(creature.willpower);
  if (attributeSum > maxAttributes) {
    guidelines.push(`Has ${attributeSum} attributes, expected max ${maxAttributes}`);
  } else if (attributeSum < minAttributes) {
    guidelines.push(`Has ${attributeSum} attributes, expected min ${minAttributes}`);
  }

  // Also check individual attribute max
  const maxAttribute = creature.character_rank + (creature.elite ? 6 : 5);
  for (const attribute of RISE_ATTRIBUTES) {
    if (creature[attribute] > maxAttribute) {
      guidelines.push(`Has ${attribute} of ${creature[attribute]}, expected max ${maxAttribute}`);
    }
  }
}
