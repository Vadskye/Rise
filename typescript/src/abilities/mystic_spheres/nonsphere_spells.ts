import { MysticSphere } from '.';

// This contains spells that are useful for the combat simulator or for writing monsters,
// but are outside of any defined mystic sphere and not written directly into the book.
export const nonsphereSpells: MysticSphere = {
  name: 'Non-Sphere Spells',
  shortDescription:
    'Standard spells outside of defined mystic spheres. Should not appear in the book text directly.',
  sources: ['arcane', 'divine', 'nature', 'pact'],
  spells: [
    {
      name: 'Armor Bolt',
      attack: {
        hit: `\\damagerankone.`,
        targeting: `
          Make an attack vs. Armor against a creature within \\medrange.
        `,
      },
      rank: 1,
      roles: ['burst'],
      scaling: 'damage',
    },
  ],
};
