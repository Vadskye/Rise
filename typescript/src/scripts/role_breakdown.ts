import { mysticSpheres, AbilityRole } from '../mystic_spheres';

function analyzeMysticSpheres() {
  const roleBreakdown: Record<string, Record<AbilityRole, number>> = {};

  for (const sphere of mysticSpheres) {
    const sphereRoles: Record<AbilityRole, number> = {} as Record<AbilityRole, number>;

    if (sphere.cantrips) {
      for (const cantrip of sphere.cantrips) {
        if (cantrip.roles) {
          for (const role of cantrip.roles) {
            sphereRoles[role] = (sphereRoles[role] || 0) + 1;
          }
        }
      }
    }

    for (const spell of sphere.spells) {
      if (spell.roles) {
        for (const role of spell.roles) {
          sphereRoles[role] = (sphereRoles[role] || 0) + 1;
        }
      }
    }
    roleBreakdown[sphere.name] = sphereRoles;
  }

  // TODO: improve formatting with sorting and such
  console.log(JSON.stringify(roleBreakdown, null, 2));
}

function main() {
  analyzeMysticSpheres();
}

if (require.main === module) {
  main();
}
