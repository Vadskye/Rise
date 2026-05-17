import { MysticSphere } from '.';
import { ActiveAbilityRank } from '..';

// This contains spells that are useful for the combat simulator or for writing monsters,
// but are outside of any defined mystic sphere and not written directly into the book.

const rankWords = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

function createSingleTargetSpell(rank: ActiveAbilityRank, defense: string) {
  return {
    name: `${defense} Bolt Rank ${rank}`,
    attack: {
      hit: `\\damagerank${rankWords[rank]}.`,
      targeting: `Make an attack vs. ${defense} against a creature within \\medrange.`,
    },
    rank: rank,
    roles: ['burst' as const],
    scaling: 'damage' as const,
  };
}

function createAreaSpell(rank: ActiveAbilityRank) {
  const damageRank = (rank - 1) as ActiveAbilityRank;
  return {
    name: `Reflex Cone Rank ${rank}`,
    attack: {
      hit: `\\damagerank${rankWords[damageRank]}.`,
      halfOnMiss: true,
      targeting: `Make an attack vs. Reflex against everything in a \\medarea cone from you.`,
    },
    rank: rank,
    roles: ['clear' as const],
    scaling: 'damage' as const,
  };
}

const generatedSpells = [];
for (let r = 1; r <= 7; r++) {
  const rank = r as ActiveAbilityRank;
  generatedSpells.push(createSingleTargetSpell(rank, 'Armor'));
  generatedSpells.push(createSingleTargetSpell(rank, 'Brawn'));
  generatedSpells.push(createSingleTargetSpell(rank, 'Fortitude'));
  generatedSpells.push(createSingleTargetSpell(rank, 'Mental'));
  generatedSpells.push(createAreaSpell(rank));
}

export const nonsphereSpells: MysticSphere = {
  name: 'Non-Sphere Spells',
  shortDescription:
    'Standard spells outside of defined mystic spheres. Should not appear in the book text directly.',
  sources: ['arcane', 'divine', 'nature', 'pact'],
  spells: generatedSpells,
};
