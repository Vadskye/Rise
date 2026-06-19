import { MagicArmor, StandardItem, AttunementRequirement } from '../../types';

function shield(
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
    kind: 'Shield',
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

function compositeShields(): MagicArmor[] {
  const items: MagicArmor[] = [
    shield({
      name: 'Composite Shield, 1st',
      rank: 3,
      short_description: 'Has two rank 1 properties',
      description: `
        This shield has two different rank 1 magic shield properties.
        Each property must not already require a \\glossterm{deep attunement}.
      `,
      attunement: 'Attune (deep)', tags: [],
    }),
    shield({
      name: 'Composite Shield, 2nd',
      rank: 4,
      short_description: 'Has two rank 2 or lower properties',
      description: `
        This shield has two different magic shield properties that are rank 2 or lower.
        Each property must not already require a \\glossterm{deep attunement}.
      `,
      attunement: 'Attune (deep)', tags: [],
    }),
    shield({
      name: 'Composite Shield, 3rd',
      rank: 5,
      short_description: 'Has two rank 3 or lower properties',
      description: `
        This shield has two different magic shield properties that are rank 3 or lower.
        Each property must not already require a \\glossterm{deep attunement}.
      `,
      attunement: 'Attune (deep)', tags: [],
    }),
  ];

  const nth = (n: number) => {
    items.push(
      shield({
        name: `Composite Shield, ${n}th`,
        rank: n + 2,
        short_description: `Has two rank ${n} or lower properties`,
        description: `
        This shield has two different magic shield properties that are rank ${n} or lower.
        Each property must not already require a \\glossterm{deep attunement}.
      `,
        attunement: 'Attune (deep)', tags: [],
      }),
    );
  };

  nth(4);
  nth(5);
  nth(6);

  return items;
}

export const shields = (): MagicArmor[] => [
  ...compositeShields(),
  shield({
    name: 'Shield of Arrow Catching',
    rank: 1,
    short_description: 'Redirects nearby projectiles to hit you',
    description: `
      Whenever an \\glossterm{ally} adjacent to you is targeted by a ranged \\glossterm{strike}, the attack is redirected to target you instead.
      Resolve the attack as if it had initially targeted you, except that the attack is not affected by cover or any \\glossterm{miss chance}.
    `,
    upgrades: [
      {
        rank: 3,
        short_description: 'Redirects projectiles to hit you',
        description:
          'The redirection extends to your allies within a \\smallarea radius \\glossterm{emanation} from you.',
      },
      {
        rank: 5,
        short_description: 'Redirects projectiles to hit you',
        description:
          'The redirection extends to your allies within a \\largearea radius \\glossterm{emanation} from you.',
      },
    ],
  }),
  shield({
    name: 'Shield of Arrow Deflection',
    rank: 1,
    short_description: 'Grants +2 defenses vs ranged strikes',
    description: 'You gain a +2 bonus to your defenses against ranged \\glossterm{strikes}.',
    upgrades: [
      {
        rank: 4,
        short_description: 'Grants +3 defenses vs ranged strikes',
        description: 'The bonus increases to +3.',
      },
      {
        rank: 7,
        short_description: 'Grants +4 defenses vs ranged strikes',
        description: 'The bonus increases to +4.',
      },
    ],
  }),
  shield({
    name: 'Shield of Arrow Reflection',
    rank: 2,
    short_description: 'Reflects missed ranged strikes',
    description:
      'Whenever a creature within \\longrange of you misses you with a ranged \\glossterm{strike}, it treats itself as a target of that attack in addition to any other targets.',
    upgrades: [
      {
        rank: 5,
        short_description: 'Precisely reflects missed ranged strikes',
        description:
          'The attacker takes a -4 penalty to all defenses against attacks reflected in this way.',
      },
    ],
  }),
  shield({
    name: 'Impact Shield',
    rank: 3,
    short_description: 'Is \\abilitytag{Impact}',
    description: 'This shield gains the \\abilitytag{Impact} tag when used as a weapon.',
  }),
  shield({
    name: "Defender's Shield",
    rank: 1,
    short_description: 'Grants +1 Armor defense',
    description: 'You gain a +1 \\glossterm{enhancement bonus} to your Armor defense.',
    upgrades: [
      {
        rank: 7,
        short_description: 'Grants +2 Armor defense',
        description: 'The bonus increases to +2.',
      },
    ],
  }),
  shield({
    name: 'Psychic Shield',
    rank: 1,
    short_description: 'Grants +2 Mental defense',
    description: 'You gain a +2 \\glossterm{enhancement bonus} to your Mental defense.',
    upgrades: [
      {
        rank: 4,
        short_description: 'Grants +3 Mental defense',
        description: 'The bonus increases to +3.',
      },
      {
        rank: 7,
        short_description: 'Grants +4 Mental defense',
        description: 'The bonus increases to +4.',
      },
    ],
  }),
  shield({
    name: 'Soulguard Shield',
    rank: 4,
    short_description: 'Grants 50% chance to avoid conditions',
    description: `
      Whenever you would be affected by a \\glossterm{condition}, you have a 50% chance to avoid gaining that condition.
      This does not prevent any other effects of the attack.
      You must be \\trait{ensouled} to attune to this item.
    `,
  }),
  shield({
    name: 'Shield of Mystic Reflection',
    rank: 4,
    short_description: 'Can reflect magical attacks',
    description: `
      You can activate this shield as a \\glossterm{standard action}.
      When you do, the shield \\glossterm{briefly} reflects magic, and you \\glossterm{briefly} cannot activate it again.
      Any \\glossterm{targeted} \\magical abilities that target you also target the creature using that ability in addition to you.
      It cannot choose to reduce its accuracy or damage against itself.
      Any other targets of the ability are affected normally.
    `,
  }),
  shield({
    name: 'Shield of Medusa',
    rank: 3,
    short_description: 'Can slow viewers',
    description: `
      This shield normally has a cloth covering its face.
      As a standard action, you can pull the cloth back and reveal the horrifying face emblazoned on the shield.
      If the cloth is prematurely pulled back, allowing creatures to see the shield without a dramatic reveal, the shield has no effect on them.

      When you activate the shield, make an attack vs. Fortitude against all creatures within a \\medarea cone.
      Your minimum accuracy is $accuracy.
      After using this ability, you \\briefly can't use it again.

      \\hit The target slowly turns to stone as a \\glossterm{condition}.
      While it is \\glossterm{injured}, it is \\slowed.
      During this condition, if it takes a \\glossterm{vital wound} that leaves it unconscious, it immediately dies.
      If the target dies in this way, its body is petrified in the form of a stone statue.
      \\critcondition
    `,
    upgrades: [
      {
        rank: 6,
        short_description: 'Can slow and daze viewers',
        description:
          'Your minimum accuracy increases to $accuracy, and the condition also causes each target to be \\dazed while it is injured.',
      },
    ],
    tags: ['Visual'],
  }),
  shield({
    name: 'Shield of Shielding',
    rank: 4,
    short_description: 'Shields you',
    description: 'You are \\shielded.',
    attunement: 'Attune (deep)', tags: [],
  }),
  shield({
    name: 'Covering Shield',
    rank: 7,
    short_description: 'Grants you cover',
    description: 'You have \\glossterm{cover} from all attacks.',
    attunement: 'Attune (deep)', tags: [],
  }),
];
