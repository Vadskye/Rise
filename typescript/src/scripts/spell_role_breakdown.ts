import { mysticSpheres, AbilityRole, ABILITY_ROLES, BaseSpellLike, MysticSphere } from '../mystic_spheres';
import { run, BreakdownConfig } from '../util/breakdown_cli';
import cli from 'commander';

const config: BreakdownConfig<MysticSphere, BaseSpellLike, AbilityRole> = {
  additionalOptions: (command: cli.Command) => {
    command.option('--no-attune', 'Filter out "attune" role from the breakdown');
  },
  entities: mysticSpheres,
  entityTypePlural: 'spheres',
  entityTypeSingular: 'Sphere',
  getItemGroups: ability => ability.roles,
  getItems: sphere => [...(sphere.spells || []), ...(sphere.cantrips || [])],
  groups: ABILITY_ROLES,
  groupType: 'Role',
  processOptions: (options: any, groups: readonly AbilityRole[]) => {
    if (options.attune === false) {
      return groups.filter(role => role !== 'attune');
    }
    return groups;
  },
  tableOrientation: 'rowsAsGroups',
};

export function main(filterAttune: boolean, showChart: boolean, selectedSphereNames: string[]): void {
  process.argv = [
    ...process.argv.slice(0, 2),
    ...(filterAttune ? ['--no-attune'] : []),
    ...(showChart ? ['--chart'] : []),
    ...(selectedSphereNames.length > 0 ? ['--spheres', selectedSphereNames.join(',')] : []),
  ];
  run(config);
}

if (require.main === module) {
  run(config);
}
