import { RankAbility } from '../types';

export function addStandardSpellModifiers(rankAbilities: RankAbility[]) {
  rankAbilities.push(
    { complexity: 0, name: 'Spells', isMagical: true, rank: 1, description: '' },
    { complexity: 0, name: 'Spells', isMagical: true, rank: 2, description: '' },
    { complexity: 0, name: 'Spells', isMagical: true, rank: 3, description: '' },
    { complexity: 0, name: 'Spells', isMagical: true, rank: 4, description: '' },
    { complexity: 0, name: 'Spells', isMagical: true, rank: 5, description: '' },
    { complexity: 0, name: 'Spells', isMagical: true, rank: 6, description: '' },
    { complexity: 0, name: 'Spells', isMagical: true, rank: 7, description: '' },
  );
}

export function addStandardManeuverModifiers(rankAbilities: RankAbility[]) {
  rankAbilities.push(
    { complexity: 0, name: 'Maneuvers', isMagical: false, rank: 1, description: '' },
    { complexity: 0, name: 'Maneuvers', isMagical: false, rank: 3, description: '' },
    { complexity: 0, name: 'Maneuvers', isMagical: false, rank: 5, description: '' },
    { complexity: 0, name: 'Maneuvers', isMagical: false, rank: 7, description: '' },
  );
}
