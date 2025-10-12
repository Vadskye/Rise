import { mysticSpheres, MysticSphere } from '@src/abilities/mystic_spheres';
import { SpellDefinition } from '@src/abilities';
import { AbilityRole, ABILITY_ROLES } from '@src/abilities/constants';
import { run, BreakdownConfig } from '../util/breakdown_cli';

const config: BreakdownConfig<MysticSphere, SpellDefinition, AbilityRole> = {
  entities: mysticSpheres,
  entityTypePlural: 'spheres',
  entityTypeSingular: 'Sphere',
  getItemGroups: (ability) => ability.roles,
  getItems: (sphere) => sphere.spells,
  groups: ABILITY_ROLES,
  groupType: 'Role',
  processOptions: (options: any, groups: readonly AbilityRole[]) => {
    if (options.attune === false) {
      return groups.filter((role) => role !== 'attune');
    }
    return groups;
  },
  tableOrientation: 'rowsAsGroups',
};

export function main(showChart: boolean, selectedSphereNames: string[]): void {
  process.argv = [
    ...process.argv.slice(0, 2),
    ...(showChart ? ['--chart'] : []),
    ...(selectedSphereNames.length > 0 ? ['--spheres', selectedSphereNames.join(',')] : []),
  ];
  run(config);
}

if (require.main === module) {
  run(config);
}
