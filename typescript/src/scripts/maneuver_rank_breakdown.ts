import { combatStyles, Maneuver } from '../combat_styles';
import { run, BreakdownConfig } from '../util/breakdown_cli';

type ManeuverRank = 1 | 3 | 5 | 7;
const RANKS: ManeuverRank[] = [1, 3, 5, 7] as const;

const config: BreakdownConfig<any, Maneuver, ManeuverRank> = {
  entities: combatStyles,
  entityTypePlural: 'styles',
  entityTypeSingular: 'Style',
  // TODO: deal with this weird type hack
  getItemGroups: (maneuver) => maneuver.rank as ManeuverRank,
  getItems: (style) => style.maneuvers || [],
  groups: RANKS,
  groupType: 'Rank',
  tableOrientation: 'columnsAsGroups',
};

if (require.main === module) {
  run(config);
}
