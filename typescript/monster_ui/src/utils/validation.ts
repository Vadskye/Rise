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
