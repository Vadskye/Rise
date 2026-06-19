import { MagicArmor, StandardItem, AttunementRequirement } from '../../types';

function body(
  item: Omit<StandardItem, 'magical' | 'rarity' | 'tags' | 'upgrades' | 'attunement'> &
    Partial<Pick<StandardItem, 'upgrades' | 'tags' | 'attunement'>>,
): MagicArmor {
  const tags = item.tags || [];
  let attunement: AttunementRequirement = item.attunement || 'Attune';
  if (tags.includes('Attune (deep)')) {
    attunement = 'Attune (deep)';
  } else if (tags.includes('Attune')) {
    attunement = 'Attune';
  }
  const cleanedTags = tags.filter(t => t !== 'Attune' && t !== 'Attune (deep)');
  return {
    kind: 'Body',
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

function compositeArmor(): MagicArmor[] {
  const armor: MagicArmor[] = [
    body({
      name: 'Composite Armor, 1st',
      rank: 3,
      short_description: 'Has two rank 1 properties',
      description: `
        This armor has two different rank 1 magic armor properties.
        Each property must not already require a \\glossterm{deep attunement}.
      `,
      attunement: 'Attune (deep)', tags: [],
    }),
    body({
      name: 'Composite Armor, 2nd',
      rank: 4,
      short_description: 'Has two rank 2 or lower properties',
      description: `
        This armor has two different magic armor properties that are rank 2 or lower.
        Each property must not already require a \\glossterm{deep attunement}.
      `,
      attunement: 'Attune (deep)', tags: [],
    }),
    body({
      name: 'Composite Armor, 3rd',
      rank: 5,
      short_description: 'Has two rank 3 or lower properties',
      description: `
        This armor has two different magic armor properties that are rank 3 or lower.
        Each property must not already require a \\glossterm{deep attunement}.
      `,
      attunement: 'Attune (deep)', tags: [],
    }),
  ];

  const nth = (n: number) => {
    armor.push(
      body({
        name: `Composite Armor, ${n}th`,
        rank: n + 2,
        short_description: `Has two rank ${n} or lower properties`,
        description: `
        This armor has two different magic armor properties that are rank ${n} or lower.
        Each property must not already require a \\glossterm{deep attunement}.
      `,
        attunement: 'Attune (deep)', tags: [],
      }),
    );
  };

  nth(4);
  nth(5);
  nth(6);

  return armor;
}

export const bodyArmor = (): MagicArmor[] => [
  ...compositeArmor(),
  body({
    name: 'Armor of Scuttling',
    rank: 2,
    short_description: 'Act normally while prone',
    description: 'Being \\prone does not reduce your movement speed or defenses.',
  }),
  body({
    name: 'Armor of Life',
    rank: 1,
    short_description: 'Grants +2 durability',
    description: 'You gain a +2 \\glossterm{enhancement bonus} to your \\glossterm{durability}.',
    upgrades: [
      {
        rank: 3,
        short_description: 'Grants +3 durability',
        description: 'The bonus increases to +3.',
      },
      {
        rank: 5,
        short_description: 'Grants +4 durability',
        description: 'The bonus increases to +4.',
      },
      {
        rank: 7,
        short_description: 'Grants +5 durability',
        description: 'The bonus increases to +5.',
      },
    ],
  }),
  body({
    name: 'Hidden Armor',
    rank: 1,
    short_description: 'Can look like normal clothing',
    description: `
      You can activate this armor as a standard action.
      If you do, it appears to change shape and form to assume the shape of a normal set of clothing.
      You may choose the design of the clothing.
      The item retains all of its properties, including weight and sound, while disguised in this way.
      Only its visual appearance is altered.
      An observer can recognize the armor's true nature with a \\glossterm{difficulty value} 15 Awareness check.

      You can suppress or resume this effect as a \\glossterm{free action} once per turn.
    `,
    upgrades: [
      {
        rank: 3,
        short_description: 'Can look and sound like normal clothing',
        description:
          'The sound and texture of the armor are also appropriate to its disguised form while disguised, and the Awareness DV increases to 25.',
      },
    ],
  }),
  body({
    name: 'Stonebody Armor',
    rank: 2,
    short_description: 'Grants +2 Brawn and Fortitude, but slower and heavier',
    description: `
      You gain a +2 \\glossterm{enhancement bonus} to your Brawn and Fortitude defenses.
      However, you take a -10 foot penalty to your speed with all movement modes.
    `,
    upgrades: [
      {
        rank: 5,
        short_description: 'Grants +3 Brawn and Fortitude, but slower and heavier',
        description: 'The defense bonuses increase to +3.',
      },
    ],
  }),
  body({
    name: 'Lithe Armor',
    rank: 1,
    short_description: 'Grants +1 Armor if you have 3 Dex',
    description:
      'If your Dexterity is at least 3, you gain a +1 \\glossterm{enhancement bonus} to your Armor defense.',
    upgrades: [
      {
        rank: 6,
        short_description: 'Grants +2 Armor if you have 5 Dex',
        description: 'The bonus increases to +2 if your Dexterity is at least 5.',
      },
    ],
  }),
  body({
    name: 'Hefty Armor',
    rank: 1,
    short_description: 'Grants +2 Brawn',
    description: 'You gain a +2 \\glossterm{enhancement bonus} to your Brawn defense.',
    upgrades: [
      { rank: 4, short_description: 'Grants +3 Brawn', description: 'The bonus increases to +3.' },
      { rank: 7, short_description: 'Grants +4 Brawn', description: 'The bonus increases to +4.' },
    ],
  }),
  body({
    name: 'Evasive Armor',
    rank: 1,
    short_description: 'Grants +2 Reflex',
    description: 'You gain a +2 \\glossterm{enhancement bonus} to your Reflex defense.',
    upgrades: [
      { rank: 4, short_description: 'Grants +3 Reflex', description: 'The bonus increases to +3.' },
      { rank: 7, short_description: 'Grants +4 Reflex', description: 'The bonus increases to +4.' },
    ],
  }),
  body({
    name: 'Trimmed Armor',
    rank: 5,
    short_description: 'Reduces Dex penalty from non-light armor',
    description: `
      If your Dexterity bonus to your Armor is reduced by at least 2 due to your armor, you gain a \\plus2 \\glossterm{enhancement bonus} to your Armor defense.
      This typically requires a Dexterity of 4.
    `,
  }),
  body({
    name: 'Lifeweave Armor',
    rank: 3,
    short_description: 'Grants +5 durability, but -1 vital rolls',
    description: `
      You gain a +5 \\glossterm{enhancement bonus} to your \\glossterm{durability}.
      However, you also take a \\minus1 penalty to your \\glossterm{vital rolls}.
    `,
    upgrades: [
      {
        rank: 5,
        short_description: 'Grants +6 durability, but -1 vital rolls',
        description: 'The bonus increases to +6.',
      },
      {
        rank: 7,
        short_description: 'Grants +8 durability, but -1 vital rolls',
        description: 'The bonus increases to +8.',
      },
    ],
  }),
  body({
    name: 'Soulweave Armor',
    rank: 3,
    short_description: 'Grants +5 durability, but -2 power',
    description: `
      You gain a +5 \\glossterm{enhancement bonus} to your \\glossterm{durability}.
      However, you take a -2 penalty to your \\glossterm{power} with all abilities.
      You must be \\trait{ensouled} to attune to this item.
    `,
    upgrades: [
      {
        rank: 5,
        short_description: 'Grants +6 durability, but -3 power',
        description: 'The durability bonus increases to +6, but the power penalty increases to -3.',
      },
      {
        rank: 7,
        short_description: 'Grants +8 durability, but -4 power',
        description: 'The durability bonus increases to +8, but the power penalty increases to -4.',
      },
    ],
  }),
  body({
    name: 'Swiftstep Armor',
    rank: 5,
    short_description: 'Removes armor speed penalty',
    description: `
      This armor does not penalize your movement speed for being heavy (see \\pcref{Armor Usage Classes}).
      If the armor is not heavy armor, this has no effect.
    `,
  }),
  body({
    name: 'Voidsoul Armor',
    rank: 5,
    short_description: 'Immune to conditions, but hit points are halved',
    description: `
      Your maximum \\glossterm{hit points} are halved.
      However, you are immune to \\glossterm{conditions}.
      You must be \\trait{ensouled} to attune to this item.
    `,
  }),
  body({
    name: 'Grafted Armor',
    rank: 2,
    short_description: 'Grants Fortitude instead of Armor defense and +3 durability',
    description: `
      This armor does not increase your Armor defense.
      Instead, you gain an \\glossterm{enhancement bonus} to your Fortitude defense equal to the Armor defense bonus the armor would normally provide.
      In addition, the armor grants you a +3 \\glossterm{enhancement bonus} to your \\glossterm{durability}.
    `,
    upgrades: [
      {
        rank: 4,
        short_description: 'Grants Fortitude instead of Armor defense and +4 durability',
        description: 'The durability bonus increases to +4.',
      },
      {
        rank: 6,
        short_description: 'Grants Fortitude instead of Armor defense and +5 durability',
        description: 'The durability bonus increases to +5.',
      },
    ],
  }),
  body({
    name: 'Armor of Transfusion',
    rank: 3,
    short_description: 'Regain 2d8 HP per turn',
    description: 'At the end of your turn, you regain 2d8 \\glossterm{hit points}.',
    upgrades: [
      {
        rank: 5,
        short_description: 'Regain 4d10 HP per turn',
        description: 'The healing increases to 4d10.',
      },
      {
        rank: 7,
        short_description: 'Regain 8d10 HP per turn',
        description: 'The healing increases to 8d10.',
      },
    ],
    attunement: 'Attune (deep)', tags: [],
  }),
  body({
    name: 'Fortifying Armor',
    rank: 2,
    short_description: 'Fortifies you if you have 3 Con',
    description: 'If your Constitution is at least 3, you are \\fortified.',
    attunement: 'Attune (deep)', tags: [],
    upgrades: [
      {
        rank: 7,
        short_description: 'Fortifies you if you have 6 Con',
        description:
          'This item does not require \\glossterm{deep attunement}, but it requires 6 Constitution.',
      },
    ],
  }),
];
