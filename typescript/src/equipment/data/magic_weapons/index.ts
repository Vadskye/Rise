import { MagicWeapon } from '../../types';
import { magicMeleeWeapons } from './melee';
import { magicRangedWeapons } from './ranged';
import { magicUnrestrictedWeapons } from './unrestricted';

export const allMagicWeapons = (): MagicWeapon[] => [
  ...magicMeleeWeapons(),
  ...magicRangedWeapons(),
  ...magicUnrestrictedWeapons(),
];
