import { monsterCombatStyles } from '.';
import { ManeuverDefinition } from '@src/abilities';

let allManeuvers: Record<string, ManeuverDefinition> | null = null;

export function getManeuverByName(maneuverName: string): ManeuverDefinition {
  if (!allManeuvers) {
    allManeuvers = {};
    for (const combatStyle of monsterCombatStyles) {
      for (const maneuver of combatStyle.maneuvers) {
        allManeuvers[maneuver.name] = maneuver;
      }
    }
  }

  const maneuver = allManeuvers[maneuverName];
  if (maneuver) {
    // Callers could modify the spell, so we need to give them a copy
    return structuredClone(maneuver);
  } else {
    throw new Error(`Unable to find maneuver '${maneuverName}'`);
  }
}
