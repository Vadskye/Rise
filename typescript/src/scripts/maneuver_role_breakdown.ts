import { combatStyles } from '@src/abilities/combat_styles';
import { AbilityRole, ABILITY_ROLES } from '@src/abilities/constants';
import { ActiveAbility } from '@src/abilities';
import { run, BreakdownConfig } from '../util/breakdown_cli';

const config: BreakdownConfig<any, ActiveAbility, AbilityRole> = {
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
