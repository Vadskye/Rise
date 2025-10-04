import { Maneuver, combatStyles } from '.';

let allManeuvers: Record<string, Maneuver> | null = null;

export function getManeuverByName(maneuverName: string) {
  if (!allManeuvers) {
    allManeuvers = {};
    for (const combatStyle of combatStyles) {
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
