import { MagicWeapon, StandardItem, AttunementRequirement } from '../../types';

function melee(
  item: Omit<StandardItem, 'magical' | 'rarity' | 'tags' | 'upgrades' | 'attunement'> &
    Partial<Pick<StandardItem, 'upgrades' | 'tags' | 'attunement'>>,
): MagicWeapon {
  const tags = item.tags || [];
  let attunement: AttunementRequirement = item.attunement || 'Attune';
  if (tags.includes('Attune (deep)')) {
    attunement = 'Attune (deep)';
  } else if (tags.includes('Attune')) {
    attunement = 'Attune';
  }
  const cleanedTags = tags.filter(t => t !== 'Attune' && t !== 'Attune (deep)');
  return {
    kind: 'Melee',
    item: {
      magical: true,
      rarity: 'Common',
      upgrades: item.upgrades || [],
      ...item,
      tags: cleanedTags,
      attunement,
    },
  };
}

export const magicMeleeWeapons = (): MagicWeapon[] => [
  melee({
    name: 'Steady',
    rank: 2,
    short_description: 'No accuracy penalty while unsteady',
    description:
      'You do not take an accuracy penalty with attacks using this weapon while \\unsteady.',
    tags: ['Water'],
  }),
  melee({
    name: 'Eager',
    rank: 3,
    short_description: 'Can be drawn quickly, +1 accuracy when drawn',
    description: `
      You can draw this weapon as a \\glossterm{free action} that does not count as an object manipulation (see \\pcref{Manipulating Objects}).
      When you draw this weapon, if you did not also sheathe it this turn, you gain a \\plus1 \\glossterm{enhancement bonus} to \\glossterm{accuracy} with strikes using it this turn.
    `,
    upgrades: [
      {
        rank: 7,
        short_description: 'Can be drawn quickly, +2 accuracy when drawn',
        description: 'The accuracy bonus increases to +2.',
      },
    ],
  }),
  melee({
    name: 'Reckless',
    rank: 2,
    short_description: 'Grants +1 accuracy and -1 defenses in melee',
    description: `
      You gain a +1 \\glossterm{enhancement bonus} to \\glossterm{accuracy} with \\glossterm{melee} strikes using this weapon.
      However, you also take a -1 penalty to all defenses against creatures adjacent to you.
    `,
    upgrades: [
      {
        rank: 6,
        short_description: 'Grants +2 accuracy and -1 defenses in melee',
        description: 'The bonus increases to +2.',
      },
    ],
  }),
  melee({
    name: 'Vorpal',
    rank: 7,
    short_description: '+1d8 damage, can decapitate foes',
    description: `
      Strikes with this weapon deal 1d8 \\glossterm{extra damage}.

      As a standard action, you can make a mundane melee \\glossterm{strike}, and you \\glossterm{briefly} cannot do so again.
      The strike deals quadruple damage.
      If your attack result also hits the target's Reflex and Fortitude defenses and the target has 50 or fewer hit points after the strike, you may cut off the target's head.
      This typically causes it to immediately die.
      Creatures that do not have a head are immune to this effect.
    `,
  }),
];
