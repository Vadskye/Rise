import { combatStyles } from '../combat_styles';
import { AbilityRole, ABILITY_ROLES, BaseSpellLike } from '../mystic_spheres';
import { run, BreakdownConfig } from '../util/breakdown_cli';

const config: BreakdownConfig<any, BaseSpellLike, AbilityRole> = {
  entities: combatStyles,
  entityTypePlural: 'styles',
  entityTypeSingular: 'Style',
  getItemGroups: (ability) => ability.roles,
  getItems: (style) => [...(style.maneuvers || []), ...(style.stances || [])],
  groups: ABILITY_ROLES,
  groupType: 'Role',
  tableOrientation: 'rowsAsGroups',
};

if (require.main === module) {
  run(config);
}
