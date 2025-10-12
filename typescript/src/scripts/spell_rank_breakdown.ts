import { mysticSpheres, MysticSphere } from '@src/abilities/mystic_spheres';
import { SpellDefinition } from '@src/abilities';
import { run, BreakdownConfig } from '@src/util/breakdown_cli';

type NonNullableRank = 1 | 2 | 3 | 4 | 5 | 6 | 7;
const RANKS: NonNullableRank[] = [1, 2, 3, 4, 5, 6, 7] as const;

const config: BreakdownConfig<MysticSphere, SpellDefinition, NonNullableRank> = {
  entities: mysticSpheres,
  entityTypePlural: 'spheres',
  entityTypeSingular: 'Sphere',
  getItemGroups: (spell) => spell.rank as NonNullableRank,
  getItems: (sphere) => (sphere.spells || []).filter((spell) => spell.rank !== null),
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
