import { Creature } from '@src/character_sheet/creature';
import { Maneuver } from '@src/combat_styles';
import { convertManeuverToLatex } from '@src/latex/combat_styles';
import { convertSpellToLatex } from '@src/latex/mystic_spheres';
import { Spell } from '@src/mystic_spheres';

export function convertManeuverToMonsterAbility(monster: Creature, maneuver: Maneuver): string {
  return reformatAsMonsterAbility(monster, convertManeuverToLatex(maneuver, true));
}

export function convertSpellToMonsterAbility(monster: Creature, spell: Spell): string {
  return reformatAsMonsterAbility(monster, convertSpellToLatex(spell, true));
}

// Convert a standard spell or maneuver that appears in the player-facing section of the
// book so it is written as a monster ability.
function reformatAsMonsterAbility(monster: Creature, effect: string): string {
  // TODO: replace player-formatted wording
  return effect;
}
