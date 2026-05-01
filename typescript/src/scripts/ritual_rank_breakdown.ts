import { mysticSpheres, rituals, MysticSphere } from '@src/abilities/mystic_spheres';
import { RitualDefinition } from '@src/abilities';
import { run, BreakdownConfig } from '@src/util/breakdown_cli';

type NonNullableRank = 1 | 2 | 3 | 4 | 5 | 6 | 7;
const RANKS: NonNullableRank[] = [1, 2, 3, 4, 5, 6, 7] as const;

const config: BreakdownConfig<MysticSphere, RitualDefinition, NonNullableRank> = {
  entities: mysticSpheres,
  entityTypePlural: 'spheres',
  entityTypeSingular: 'Sphere',
  getItemGroups: (ritual) => ritual.rank as NonNullableRank,
  getItems: (sphere) => rituals.filter((ritual) => ritual.spheres.includes(sphere.name)),
  groups: RANKS,
  groupType: 'Rank',
  tableOrientation: 'columnsAsGroups',
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
