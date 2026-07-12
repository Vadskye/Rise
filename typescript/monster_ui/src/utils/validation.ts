import type { MonsterData, MonsterGroupData } from '../../server/codegen';
import { Creature } from '@src/character_sheet/creature';

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
export function formatMissingWeaponWarning(name: string): string {
  return `Maneuver "${name}" makes a strike and doesn't have a weapon.`;
}

/**
 * Checks if a given warning string matches the missing weapon warning for a specific maneuver name.
 * Handles display name overrides by matching the generated pattern.
 */
export function isMissingWeaponWarning(warning: string, name: string): boolean {
  return warning === formatMissingWeaponWarning(name);
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
  monster: MonsterData,
  parentGroup?: MonsterGroupData,
): string[] {
  const warnings: string[] = [];

  if (creature.name === creature.name.toLowerCase()) {
    warnings.push('Name must be title case');
  }
  if (!creature.alignment) {
    warnings.push('Must have alignment');
  }

  if (creature.intelligence >= -2 && creature.getTrainedSkillNames().length === 0) {
    warnings.push('Has no trained skills');
  }

  if (creature.intelligence > -8 && creature.creature_type === 'animal') {
    warnings.push('Animal should have an Intelligence of -8 or less');
  }
  if (creature.intelligence > -5 && creature.creature_type === 'beast') {
    warnings.push('Beast should have an Intelligence of -5 or less');
  }
  if (creature.creature_type === 'humanoid' && !creature.body_armor_name) {
    warnings.push('Humanoids should usually have body armor');
  }

  const standardAbilities = creature
    .getActiveAbilities()
    .filter((ability) => (ability.usageTime || 'standard') === 'standard');
  if (standardAbilities.length === 0) {
    warnings.push('Must have at least one standard action ability');
  }

  if (creature.elite) {
    const eliteAbilities = creature
      .getActiveAbilities()
      .filter((ability) => ability.usageTime === 'elite');
    if (eliteAbilities.length === 0) {
      warnings.push('Elite creatures must have at least one elite action ability');
    }
  }

  if (!creature.hasKnowledgeResults() && !parentGroup?.knowledge) {
    warnings.push(
      'Creature must either have personal knowledge results or be part of a group with knowledge results',
    );
  }

  return warnings;
}
