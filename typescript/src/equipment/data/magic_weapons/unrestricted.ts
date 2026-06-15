import { MagicWeapon, StandardItem } from '../../types';

function unrestricted(
  item: Omit<StandardItem, 'magical' | 'rarity' | 'tags' | 'upgrades'> &
    Partial<Pick<StandardItem, 'upgrades' | 'tags'>>,
): MagicWeapon {
  return {
    kind: 'Unrestricted',
    item: {
      magical: true,
      rarity: 'Common',
      tags: item.tags || ['Attune'],
      upgrades: item.upgrades || [],
      ...item,
    },
  };
}

function energyWeapons(): MagicWeapon[] {
  return [
    unrestricted({
      name: 'Prismatic',
      rank: 4,
      short_description: '+2 damage, is energetic',
      description: `
        This weapon is infused with prismatic energy.
        You can suppress or resume this infusion as a \\glossterm{free action}.
        While the weapon is infused:
        \\begin{raggeditemize}
            \\item All strikes with it have the \\atCold, \\atElectricity, and \\atFire tags.
            \\item It deals 2 \\glossterm{extra damage}.
            \\item It sheds light in a 15 foot radius of \\glossterm{bright illumination}.
        \\end{raggeditemize}
      `,
      tags: ['Cold', 'Electricity', 'Fire', 'Attune'],
      upgrades: [
        {
          rank: 6,
          short_description: '+1d6 damage, is energetic',
          description: 'The extra damage increases to 1d6.',
        },
      ],
    }),
    unrestricted({
      name: 'Vibrating',
      rank: 2,
      short_description: '+1 damage, -10 Stealth',
      description: `
        This weapon continuously emits a low-pitched rumbling noise and vibrates in the hand.
        Strikes with it deal 1 \\glossterm{extra damage}.
        However, you take a -10 penalty to Stealth checks.
      `,
      upgrades: [
        {
          rank: 4,
          short_description: '+2 damage, -10 Stealth',
          description: 'The damage bonus increases to 2.',
        },
        {
          rank: 6,
          short_description: '+1d6 damage, -10 Stealth',
          description: 'The damage bonus increases to 1d6.',
        },
      ],
    }),
    unrestricted({
      name: 'Flaming',
      rank: 3,
      short_description: 'Is burning and ignites',
      description: `
        This weapon constantly burns.
        You can suppress or resume this fire as a \\glossterm{free action}.
        While the weapon is burning:
        \\begin{raggeditemize}
            \\item All strikes with it have the \\atFire tag.
            \\item Whenever you hit a creature with a strike using it, the target \\briefly \\debuff{burns} for 1d4 damage.
            \\item It sheds red light in a 15 foot radius of \\glossterm{bright illumination}.
        \\end{raggeditemize}
      `,
      tags: ['Fire', 'Attune'],
      upgrades: [
        {
          rank: 5,
          short_description: 'Is burning and ignites',
          description: 'The damage increases to 1d8.',
        },
        {
          rank: 7,
          short_description: 'Is burning and ignites',
          description: 'The damage increases to 2d6.',
        },
      ],
    }),
    unrestricted({
      name: 'Arcing',
      rank: 4,
      short_description: 'Is charged and chains',
      description: `
        This weapon continuously crackles with electricity.
        You can suppress or resume this charge as a \\glossterm{free action}.
        While the weapon is charged:
        \\begin{raggeditemize}
            \\item All strikes with it have the \\atElectricity tag.
            \\item Your strikes using it \\glossterm{chain} once.
            \\item It sheds yellow light in a 5 foot radius of \\glossterm{bright illumination}.
        \\end{raggeditemize}
      `,
      tags: ['Electricity', 'Attune'],
      upgrades: [
        {
          rank: 7,
          short_description: '+1d4 damage, is charged and chains',
          description: 'While the weapon is charged, it also deals 1d4 \\glossterm{extra damage}.',
        },
      ],
    }),
    unrestricted({
      name: 'Freezing',
      rank: 2,
      short_description: '+1 damage, is chilled',
      description: `
        This weapon is bitterly cold to the touch.
        You can suppress or resume this chill as a \\glossterm{free action}.
        While the weapon is chilled:
        \\begin{raggeditemize}
            \\item All strikes with it have the \\atCold tag.
            \\item Your strikes using it deal 1 \\glossterm{extra damage}.
            \\item It sheds blue light in a 5 foot radius of \\glossterm{bright illumination}.
        \\end{raggeditemize}
      `,
      tags: ['Cold', 'Attune'],
      upgrades: [
        {
          rank: 4,
          short_description: '+1d4 damage, is chilled',
          description: 'The extra damage increases to 1d4.',
        },
        {
          rank: 6,
          short_description: '+1d8 damage, is chilled',
          description: 'The extra damage increases to 1d8.',
        },
      ],
    }),
  ];
}

function utilityWeapons(): MagicWeapon[] {
  return [
    unrestricted({
      name: 'Dimensional Trace',
      rank: 3,
      short_description: 'Can briefly teleport next to struck creature',
      description: `
        As a standard action, you can make a \\glossterm{strike} using this weapon, and you \\glossterm{briefly} cannot do so again.
        Each creature you hit with the strike \\glossterm{briefly} has a dimensional trace applied to it.
        While the dimensional trace lasts, you can activate this weapon as a \\glossterm{minor action}.
        When you do, you \\glossterm{teleport} into the closest unoccupied square adjacent to a traced creature, if such a space exists within \\medrange.
      `,
    }),
    unrestricted({
      name: 'Merciful',
      rank: 1,
      short_description: 'Deals subdual damage',
      description: 'This weapon deals \\glossterm{subdual damage}.',
    }),
    unrestricted({
      name: 'Morphing',
      rank: 1,
      short_description: 'Can change into similar weapons',
      description: `
         You can activate this weapon as a \\glossterm{minor action}.
         When you do, it changes shape into a new weapon of your choice from the weapon's original weapon group.
         If the weapon's original form belongs to multiple weapon groups, the weapon can only change into weapons from one of those weapon groups.
         The new shape lasts until you activate the weapon again.

         When this effect ends for any reason, the weapon returns to its original form.
      `,
    }),
    unrestricted({
      name: 'Anchoring Burst',
      rank: 2,
      short_description: 'Can prevent teleportation',
      description: `
        As a standard action, you can make a mundane \\glossterm{strike} using this weapon, and you \\glossterm{briefly} cannot do so again.
        On a hit, the target \\glossterm{briefly} cannot be \\glossterm{teleported}.
        An object subject to this effect is left behind if it is carried by a creature that teleports.
      `,
    }),
    unrestricted({
      name: 'Anchoring',
      rank: 5,
      short_description: 'Prevent teleportation',
      description: `
        Whenever you hit with this weapon, that target becomes dimensionally anchored.
        Creatures are anchored as a \\glossterm{condition}, and objects are anchored \\glossterm{briefly}.
        While dimensionally anchored, the target cannot be \\glossterm{teleported}.
        An object subject to this effect is left behind if it is carried by a creature that teleports.
      `,
    }),
    unrestricted({
      name: 'Cursebite',
      rank: 4,
      short_description: 'Can inflict a curse',
      description: `
        Whenever you would inflict a \\glossterm{condition} on a non-cursed creature with a strike using this weapon, that condition becomes a curse instead.
        The curse cannot be removed by effects that remove conditions, and lasts until the target takes a \\glossterm{short rest}.
        If the effect has a special method of being removed, such as the \\spell{entangle} spell, that removal method still functions normally.
      `,
      upgrades: [
        {
          rank: 7,
          short_description: 'Can inflict multiple curses',
          description:
            'The target does not have to be non-cursed, allowing you to apply multiple curses to the same creature.',
        },
      ],
    }),
    unrestricted({
      name: 'Seeking',
      rank: 2,
      short_description: 'Ignores cover and concealment',
      description: `
        This weapon automatically veers towards its intended target.
        Your \\glossterm{strikes} with the weapon are unaffected by \\glossterm{cover} and 20\\% \\glossterm{miss chances}, such as from \\glossterm{concealment}.
      `,
      upgrades: [
        {
          rank: 5,
          short_description: 'Ignores cover and miss chances',
          description: 'Your strikes with the weapon are also unaffected by 50\\% miss chances.',
        },
      ],
    }),
    unrestricted({
      name: 'Soulreaving',
      rank: 5,
      short_description: 'Deals delayed damage',
      description: `
        This weapon is transluscent and has no physical presence for anyone except you.

        Strikes with this weapon have the \\atSoul tag and do not have the \\atPhysical tag.
        They deal no damage immediately.
        This means that any effects which trigger when you deal damage with the attack, such as conditions, do not happen.
        Instead, the damage is delayed.
        Damage that would be dealt by the weapon can be delayed indefinitely.
        While the damage is delayed, it cannot be removed by any means short of the destruction of this weapon or the creature's death.

        As a \\glossterm{minor action}, you can hurt yourself with this weapon to activate it.
        This deals a single point of damage to you.
        When you do, each creature with delayed damage from this weapon takes damage equal to the total delayed damage built up by the weapon for that target.
        Creatures farther than one mile away from the weapon are unaffected by this damage.
        This ability expends all delayed damage built up by the weapon for all targets, including targets farther than one mile from the weapon.
      `,
    }),
  ];
}

function compositeWeapons(): MagicWeapon[] {
  const weapons: MagicWeapon[] = [
    unrestricted({
      name: 'Composite Weapon, 1st',
      rank: 3,
      short_description: 'Has two rank 1 properties',
      description: `
        This weapon has two different rank 1 magic weapon properties.
        Each property must not already require a \\glossterm{deep attunement}.
      `,
      tags: ['Attune (deep)'],
    }),
    unrestricted({
      name: 'Composite Weapon, 2nd',
      rank: 4,
      short_description: 'Has two rank 2 or lower properties',
      description: `
        This weapon has two different magic weapon properties that are rank 2 or lower.
        Each property must not already require a \\glossterm{deep attunement}.
      `,
      tags: ['Attune (deep)'],
    }),
    unrestricted({
      name: 'Composite Weapon, 3rd',
      rank: 5,
      short_description: 'Has two rank 3 or lower properties',
      description: `
        This weapon has two different magic weapon properties that are rank 3 or lower.
        Each property must not already require a \\glossterm{deep attunement}.
      `,
      tags: ['Attune (deep)'],
    }),
  ];

  const nth = (n: number) => {
    weapons.push(
      unrestricted({
        name: `Composite Weapon, ${n}th`,
        rank: n + 2,
        short_description: `Has two rank ${n} or lower properties`,
        description: `
        This weapon has two different magic weapon properties that are rank ${n} or lower.
        Each property must not already require a \\glossterm{deep attunement}.
      `,
        tags: ['Attune (deep)'],
      }),
    );
  };

  nth(4);
  nth(5);
  nth(6);

  return weapons;
}

export const magicUnrestrictedWeapons = (): MagicWeapon[] => [
  ...energyWeapons(),
  ...utilityWeapons(),
  ...compositeWeapons(),
  unrestricted({
    name: 'Bloodfrenzy',
    rank: 3,
    short_description: 'Grants +2 accuracy when you injure a foe',
    description: `
      Whenever you \\glossterm{injure} a \\trait{blooded} creature with a strike using this weapon, you \\glossterm{briefly} gain a +2 accuracy bonus with \\glossterm{strikes} against that creature.
      As normal, this bonus does not stack with itself, even if you injure the same creature multiple times.
    `,
    upgrades: [
      {
        rank: 5,
        short_description: 'Grants +3 accuracy when you injure a foe',
        description: 'The accuracy bonus increases to +3.',
      },
      {
        rank: 7,
        short_description: 'Grants +4 accuracy when you injure a foe',
        description: 'The accuracy bonus increases to +4.',
      },
    ],
  }),
  unrestricted({
    name: 'Lucky',
    rank: 2,
    short_description: 'Attack rolls explode on 8+',
    description: `
      When you roll an 8 or 9 on your first die for an attack roll, the attack roll \\glossterm{explodes} (see \\pcref{Exploding Attacks}).
      This does not affect bonus dice from explosions.
    `,
    upgrades: [
      {
        rank: 5,
        short_description: 'Attack rolls explode on 5+',
        description: 'The die also explodes if you roll an 5, 6, or 7.',
      },
    ],
  }),
  unrestricted({
    name: 'Mystic',
    rank: 1,
    short_description: 'Use \\magical power for damage',
    description:
      'You use your \\glossterm{magical power} to determine your damage with strikes using this weapon instead of your \\glossterm{mundane power}.',
    upgrades: [
      {
        rank: 4,
        short_description: 'Use \\magical power for damage, +2 damage',
        description: 'This weapon also deals 2 \\glossterm{extra damage}.',
      },
      {
        rank: 6,
        short_description: 'Use \\magical power for damage, +1d6 damage',
        description: 'This weapon also deals 1d6 \\glossterm{extra damage}.',
      },
    ],
  }),
  unrestricted({
    name: 'Brutish',
    rank: 3,
    short_description: 'Deals extra damage if you have 3 Str',
    description: `
      If your Strength is at least 3, this weapon deals \\glossterm{extra damage} equal to its weapon damage die \\sub 3.
      For example, a brutish battleaxe would deal 1d8\\minus3 extra damage.
    `,
    upgrades: [
      {
        rank: 5,
        short_description: 'Deals extra weapon damage if you have 4 Str',
        description:
          'If your Strength is at least 4, the extra damage increases to be equal to the weapon damage die \\sub 1.',
      },
      {
        rank: 7,
        short_description: 'Deals double extra weapon damage if you have 5 Str',
        description:
          'If your Strength is at least 5, the extra damage increases to be equal to twice the weapon damage die \\sub 4.',
      },
    ],
  }),
  unrestricted({
    name: 'Educated',
    rank: 3,
    short_description: 'Deals +2 damage if you have 3 Int',
    description: `
      If your Intelligence is at least 3, this weapon deals 2 \\glossterm{extra damage}.
    `,
    upgrades: [
      {
        rank: 5,
        short_description: 'Deals +1d6 damage if you have 4 Int',
        description: 'If your Intelligence is at least 4, the extra damage increases to 1d6.',
      },
      {
        rank: 7,
        short_description: 'Deals +1d10 damage if you have 5 Int',
        description: 'If your Intelligence is at least 5, the extra damage increases to 1d10.',
      },
    ],
  }),
  unrestricted({
    name: 'Finesse',
    rank: 3,
    short_description: 'Grants +1 accuracy if you have 3 Dex',
    description: `
      If your Dexterity is at least 3, you gain a +1 \\glossterm{enhancement bonus} to accuracy with \\glossterm{strikes} using this weapon.
    `,
    upgrades: [
      {
        rank: 7,
        short_description: 'Grants +2 accuracy if you have 5 Dex',
        description: 'The accuracy bonus increases to +2 if your Dexterity is at least 5.',
      },
    ],
  }),
  unrestricted({
    name: 'Perceptive',
    rank: 3,
    short_description: 'Grants +1 accuracy if you have 3 Per',
    description: `
      If your Perception is at least 3, you gain a +1 \\glossterm{enhancement bonus} to accuracy with \\glossterm{strikes} using this weapon.
    `,
    upgrades: [
      {
        rank: 7,
        short_description: 'Grants +2 accuracy if you have 5 Per',
        description: 'The accuracy bonus increases to +2 if your Perception is at least 5.',
      },
    ],
  }),
  unrestricted({
    name: 'Tireless',
    rank: 1,
    short_description: 'Ignore 2 fatigue with strikes',
    description:
      'You reduce your \\glossterm{fatigue penalty} by 2 when determining your \\glossterm{accuracy} with \\glossterm{strikes} using this weapon.',
    upgrades: [
      {
        rank: 4,
        short_description: 'Gain power while fatigued',
        description:
          'You ignore your \\glossterm{fatigue penalty} when determining your \\glossterm{accuracy} with \\glossterm{strikes} using this weapon.',
      },
    ],
  }),
  unrestricted({
    name: 'Unbalanced',
    rank: 2,
    short_description: '-1 accuracy, but +3 for criticals',
    description: `
      You take a -1 \\glossterm{accuracy} penalty to strikes using this weapon.
      However, you gain a \\plus3 bonus to your \\glossterm{accuracy} with \\glossterm{strikes} using this weapon for the purpose of determining whether you get a \\glossterm{critical hit}.
    `,
    upgrades: [
      {
        rank: 4,
        short_description: '-2 accuracy, but +5 for criticals',
        description:
          'The accuracy penalty increases to -2, but the critical hit accuracy bonus increases to +6.',
      },
      {
        rank: 7,
        short_description: '-3 accuracy, but +8 for criticals',
        description:
          'The accuracy penalty increases to -3, but the critical hit accuracy bonus increases to +8.',
      },
    ],
  }),
  unrestricted({
    name: 'Bloodfuel',
    rank: 3,
    short_description: 'Can spend 4 HP for +1d6 damage',
    description: `
      You can feed this weapon your blood as a \\glossterm{minor action}.
      When you do, you lose 4 \\glossterm{hit points}.
      In exchange, you deal 1d4 \\glossterm{extra damage} with strikes using this weapon this turn.
      You must be \\trait{blooded} to activate this weapon.
    `,
    upgrades: [
      {
        rank: 5,
        short_description: 'Can spend 8 HP for +1d10 damage',
        description: 'The HP loss increases to 8, and the extra damage increases to 1d8.',
      },
      {
        rank: 7,
        short_description: 'Can spend 16 HP for +2d8 damage',
        description: 'The HP loss increases to 16, and the extra damage increases to 2d6.',
      },
    ],
  }),
  unrestricted({
    name: 'Routing',
    rank: 2,
    short_description: 'Grants +1d4 damage vs scared foes',
    description:
      'You deal 1d4 \\glossterm{extra damage} with \\glossterm{strikes} using this weapon against creatures that are suffering penalties for being \\frightened or \\panicked.',
    upgrades: [
      {
        rank: 5,
        short_description: 'Grants +1d10 damage vs scared foes',
        description: 'The extra damage increases to 1d10.',
      },
    ],
  }),
  unrestricted({
    name: 'Fated',
    rank: 7,
    short_description: 'Rerolls missed attacks',
    description: `
      Whenever you miss with an attack using this weapon, you can reroll the attack and keep the higher result.
      After you reroll an attack in this way, you \\glossterm{briefly} cannot do so again.
    `,
  }),
  unrestricted({
    name: 'Vampiric',
    rank: 2,
    short_description: 'Steals HP',
    description:
      'The first time each turn that you \\glossterm{injure} a \\trait{blooded} creature other than yourself with a \\glossterm{strike} using this weapon, you regain 1d6 hit points.',
    tags: ['Attune (deep)'],
    upgrades: [
      {
        rank: 4,
        short_description: 'Deals +2 damage and steals HP',
        description:
          'The weapon also deals 2 \\glossterm{extra damage} to blooded creatures, and the healing increases to 2d10.',
      },
      {
        rank: 6,
        short_description: 'Deals +1d6 damage and steals HP',
        description:
          'The \\glossterm{extra damage} increases to 1d6, and the healing increases to 5d10.',
      },
    ],
  }),
  unrestricted({
    name: 'Grounded',
    rank: 2,
    short_description: 'Grants +1 accuracy while stationary',
    description: `
      Whenever you make a \\glossterm{strike}, if you have not changed location since the start of your turn, you can activate this weapon.
      If you do, you gain a \\plus1 \\glossterm{enhancement bonus} to \\glossterm{accuracy} with the strike, and your \\glossterm{available movement} is reduced to 0.
    `,
    upgrades: [
      {
        rank: 6,
        short_description: 'Grants +2 accuracy while stationary',
        description: 'The accuracy bonus increases to +2.',
      },
    ],
  }),
  unrestricted({
    name: 'Psionic Burst',
    rank: 1,
    short_description: 'Can attack Mental defense',
    description: `
      As a standard action, you can make a mundane \\glossterm{strike} using this weapon that is imbued with psychic power.
      The strike is made against the target's Mental defense instead of its Armor defense.
      It loses the \\atPhysical tag and gains the \\atCompulsion tag.
      After you use this ability, you \\glossterm{briefly} cannot do so again.
    `,
    tags: ['Compulsion'],
    upgrades: [
      {
        rank: 4,
        short_description: 'Can attack Mental defense',
        description: 'The strike deals double damage',
      },
      {
        rank: 6,
        short_description: 'Can attack Mental defense',
        description: 'The strike deals triple damage',
      },
    ],
  }),
  unrestricted({
    name: 'Psionic',
    rank: 3,
    short_description: 'Is psychic, +1 damage',
    description: `
      This weapon's striking surface is ephemeral, and it echoes the thoughts of anyone touching it back into their head.
      You can suppress or resume its psionic nature as a \\glossterm{free action}.
      While the weapon is psionic:
      \\begin{raggeditemize}
          \\item All strikes with it have the \\atCompulsion tag and lose the \\atPhysical tag. This means that it is unable to damage most objects.
          \\item All strikes with it target Mental defense instead of Armor defense.
          \\item It deals 1 \\glossterm{extra damage}.
      \\end{raggeditemize}
    `,
    tags: ['Compulsion', 'Attune (deep)'],
    upgrades: [
      {
        rank: 5,
        short_description: 'Is psychic, +1d4 damage',
        description: 'The extra damage increases to 1d4.',
      },
      {
        rank: 7,
        short_description: 'Is psychic, +1d8 damage',
        description: 'The extra damage increases to 1d8.',
      },
    ],
  }),
  unrestricted({
    name: 'Toxic Burst',
    rank: 1,
    short_description: 'Can attack Fortitude defense',
    description: `
      As a standard action, you can make a mundane \\glossterm{strike} using this weapon that transforms the striking surface to poison.
      The strike is made against the target's Fortitude defense instead of its Armor defense, and it gains the \\atPoison tag.
      After you use this ability, you \\glossterm{briefly} cannot do so again.
    `,
    tags: ['Poison', 'Attune'],
    upgrades: [
      {
        rank: 4,
        short_description: 'Can attack Fortitude defense',
        description: 'The strike deals double damage',
      },
      {
        rank: 6,
        short_description: 'Can attack Fortitude defense',
        description: 'The strike deals triple damage',
      },
    ],
  }),
  unrestricted({
    name: 'Toxic',
    rank: 4,
    short_description: 'Is poisonous, +2 damage',
    description: `
      This weapon's striking surface is liquified into a sinister poison.
      You can suppress or resume its poisonous nature as a \\glossterm{free action}.
      While the weapon is poisonous:
      \\begin{raggeditemize}
          \\item All strikes with it have the \\atPoison tag and lose the \\atPhysical tag. This means that it is usually unable to damage objects and nonliving creatures.
          \\item All strikes with it target Fortitude defense instead of Armor defense.
          \\item It deals 2 \\glossterm{extra damage}.
          \\item Poisons delivered with strikes using it gain a +2 accuracy bonus.
      \\end{raggeditemize}
    `,
    tags: ['Poison', 'Attune (deep)'],
    upgrades: [
      {
        rank: 6,
        short_description: 'Is poisonous, +1d6 damage',
        description: 'The extra damage increases to 1d6.',
      },
    ],
  }),
];
