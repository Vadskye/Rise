import {
  mysticSpheres,
  AbilityRole,
  ABILITY_ROLES,
  BaseSpellLike,
  MysticSphere,
} from '../mystic_spheres';
import { run, BreakdownConfig } from '../util/breakdown_cli';

const config: BreakdownConfig<MysticSphere, BaseSpellLike, AbilityRole> = {
  entities: mysticSpheres,
  entityTypePlural: 'spheres',
  entityTypeSingular: 'Sphere',
  getItemGroups: (ability) => ability.roles,
  getItems: (sphere) => [...(sphere.spells || []), ...(sphere.cantrips || [])],
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
