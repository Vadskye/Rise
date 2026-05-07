import { Implement, StandardItem } from '../../types';

function staff(
  item: Omit<StandardItem, 'magical' | 'rarity' | 'tags' | 'upgrades'> &
    Partial<Pick<StandardItem, 'upgrades' | 'tags'>>,
): Implement {
  return {
    kind: 'Staff',
    item: {
      magical: true,
      rarity: 'Common',
      tags: item.tags || ['Attune'],
      upgrades: item.upgrades || [],
      ...item,
    },
  };
}

function compositeStaffs(): Implement[] {
  const items: Implement[] = [
    staff({
      name: 'Composite Staff, 1st',
      rank: 3,
      short_description: 'Has two rank 1 properties',
      description: `
        This staff has two different rank 1 magic implement properties.
        Each property must not already require a \\glossterm{deep attunement}.
      `,
      tags: ['Attune (deep)'],
    }),
    staff({
      name: 'Composite Staff, 2nd',
      rank: 4,
      short_description: 'Has two rank 2 or lower properties',
      description: `
        This staff has two different magic implement properties that are rank 2 or lower.
        Each property must not already require a \\glossterm{deep attunement}.
      `,
      tags: ['Attune (deep)'],
    }),
    staff({
      name: 'Composite Staff, 3rd',
      rank: 5,
      short_description: 'Has two rank 3 or lower properties',
      description: `
        This staff has two different magic implement properties that are rank 3 or lower.
        Each property must not already require a \\glossterm{deep attunement}.
      `,
      tags: ['Attune (deep)'],
    }),
  ];

  const nth = (n: number) => {
    items.push(
      staff({
        name: `Composite Staff, ${n}th`,
        rank: n + 2,
        short_description: `Has two rank ${n} or lower properties`,
        description: `
        This staff has two different magic implement properties that are rank ${n} or lower.
        Each property must not already require a \\glossterm{deep attunement}.
      `,
        tags: ['Attune (deep)'],
      }),
    );
  };

  nth(4);
  nth(5);
  nth(6);

  return items;
}

export const staffs = (): Implement[] => [
  ...compositeStaffs(),
  staff({
    name: 'Staff of Shared Healing',
    rank: 2,
    short_description: 'Heals you when you heal allies',
    description: `
      Once per turn, when you cause a creature other yourself to regain \\glossterm{hit points} using a \\magical ability, you can activate this item.
      When you do, you also regain that many hit points.
      In addition, you increase your \\glossterm{fatigue level} by one.
    `,
  }),
  staff({
    name: 'Staff of Agonizing Fear',
    rank: 1,
    short_description: 'Fear effects also penalize Fortitude',
    description: `
      Creatures that are \\frightened or \\panicked by you suffer a penalty to their Fortitude defense equal to the penalty they suffer to their Mental defense.
    `,
    tags: ['Emotion', 'Attune'],
    upgrades: [
      {
        rank: 5,
        short_description: 'Fear effects penalize all defenses',
        description: 'The defense penalty applies to all non-Mental defenses, not just Fortitude.',
      },
    ],
  }),
  staff({
    name: 'Staff of Discordance',
    rank: 6,
    short_description: 'Makes stunned creatures briefly confused',
    description: `
      Whenever you cause an enemy to be \\stunned as a \\glossterm{condition}, it is also \\glossterm{briefly} \\confused.
    `,
    tags: ['Compulsion', 'Attune'],
  }),
  staff({
    name: 'Extending Staff',
    rank: 2,
    short_description: 'Grants +15 foot range',
    description: `
      You gain a +15 foot bonus to the \\glossterm{range} of all of your ranged \\magical abilities.
      This does not affect abilities that do not have a range listed in feet.
    `,
    upgrades: [
      {
        rank: 6,
        short_description: 'Grants +30 foot range',
        description: 'The bonus increases to +30 feet.',
      },
    ],
  }),
  staff({
    name: 'Staff of Giants',
    rank: 2,
    short_description: 'Increases maximum size or weight with abilities',
    description: `
      Whenever you use a \\magical ability that has a maximum size category or weight category for its targets or any objects it creates, you increase that maximum by one size category or weight category.
      This cannot increase the maximum size category or weight category above Gargantuan.
      This does not affect abilities that create creatures of a particular size.

      If you use two Staffs of Giants, their effects stack.
    `,
    upgrades: [
      {
        rank: 6,
        short_description: 'Greatly increases maximum size or weight with abilities',
        description:
          'The bonus increases to two size or weight categories, and this effect can increase the maximum size or weight category to Colossal.',
      },
    ],
  }),
  staff({
    name: 'Merciful Staff',
    rank: 1,
    short_description: 'Converts damage to subdual damage',
    description: `
      Whenever you use a \\magical ability that deals damage, you may activate this staff.
      If you do, that ability deals \\glossterm{subdual damage}.
    `,
  }),
  staff({
    name: 'Bloodfrenzy Staff',
    rank: 3,
    short_description: 'Grants +2 accuracy when you injure a foe',
    description: `
      Whenever you \\glossterm{injure} a \\trait{blooded} creature with a \\magical ability, you \\glossterm{briefly} gain a +2 accuracy bonus against that creature.
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
  staff({
    name: 'Pinhole Staff',
    rank: 1,
    short_description: 'Allows excluding a single square from an area',
    description: `
      Whenever you use a non-attunable \\magical ability that affects an area, you can freely exclude a single 5-ft. square from the ability's effect.
      All squares in the final area of the ability must be contiguous.
      You cannot create split an ability's area into multiple completely separate areas.
    `,
  }),
  staff({
    name: 'Staff of Elision',
    rank: 3,
    short_description: 'Allows excluding something from an area',
    description: `
      Whenever you use a non-attunable \\magical ability that affects an area, you can activate this staff.
      When you do, you choose to have the ability exclude up to two creatures or objects of your choice.
      The excluded creature or object is not a target of the ability.
    `,
  }),
  staff({
    name: 'Selective Staff',
    rank: 5,
    short_description: 'Allows excluding creatures from an area',
    description: `
      Whenever you use a non-attunable \\magical ability that affects an area, you can activate this staff.
      When you do, you choose to have the ability exclude your \\glossterm{allies}, your \\glossterm{enemies}, or everything that is neither an ally nor an enemy.
      Excluded creatures and objects are not targets of the ability.
    `,
  }),
  staff({
    name: 'Contracting Staff',
    rank: 1,
    short_description: 'Allows reshaping areas to become smaller',
    description: `
      Whenever you use a non-attunable \\magical ability that affects an area, you can reshape its area.
      The new area must be a radius, line, or 90 degree cone, and it must be able to fit entirely within the ability's original area.
      For example, you could convert a radius into a cone, or a cone into a 5 foot wide line.
      However, you could not convert a line into a cone or radius.
      This cannot change the ability's \\glossterm{point of origin}.
    `,
    upgrades: [
      {
        rank: 4,
        short_description: 'Allows reshaping areas to become multiple smaller areas',
        description:
          'You can create any number of new areas instead of only one. For example, you could convert a cone into a number of lines, or a radius into multiple cones.',
      },
    ],
  }),
  staff({
    name: 'Staff of Silence',
    rank: 1,
    short_description: 'Can exert to cast spells without verbal components',
    description: `
      You can activate this staff as a \\glossterm{free action}.
      When you do, you \\glossterm{briefly} gain the ability to cast spells without using \\glossterm{verbal components}.
      In addition, you increase your \\glossterm{fatigue level} by one.
    `,
    upgrades: [
      {
        rank: 3,
        short_description: 'Can cast spells without verbal components',
        description:
          'The staff no longer needs to be activated. You can passively cast spells without using \\glossterm{verbal components}.',
      },
    ],
  }),
  staff({
    name: 'Staff of Stillness',
    rank: 1,
    short_description: 'Can exert to cast spells without somatic components',
    description: `
      You can activate this staff as a \\glossterm{free action}.
      When you do, you \\glossterm{briefly} gain the ability to cast spells without using \\glossterm{somatic components}.
      In addition, you increase your \\glossterm{fatigue level} by one.
    `,
    upgrades: [
      {
        rank: 3,
        short_description: 'Can cast spells without somatic components',
        description:
          'The staff no longer needs to be activated. You can passively cast spells without using \\glossterm{somatic components}.',
      },
    ],
  }),
  staff({
    name: 'Staff of Tranquility',
    rank: 5,
    short_description: 'Can cast spells without components',
    description:
      'You can cast spells without using \\glossterm{verbal components} or \\glossterm{somatic components}.',
  }),
  staff({
    name: 'Reaching Staff',
    rank: 1,
    short_description: 'Can exert to use abilities from a short distance away',
    description: `
      Whenever you use a non-attunable \\magical ability, you may activate this staff.
      When you do, choose a location within \\shortrange to act as a \\glossterm{targeting proxy}.
      This means the ability determines its targets as if you were in that location, which can allow you to affect targets outside your normal range.
      In addition, you increase your \\glossterm{fatigue level} by one, and you \\glossterm{briefly} cannot activate this staff again.
    `,
    upgrades: [
      {
        rank: 4,
        short_description: 'Can sometimes use abilities from a short distance away',
        description: 'Activating the staff does not increase your fatigue level.',
      },
      {
        rank: 7,
        short_description: 'Can use abilities from a short distance away',
        description: 'The staff no longer has a brief cooldown after being activated.',
      },
    ],
  }),
  staff({
    name: 'Distant Staff',
    rank: 2,
    short_description: 'Can exert to double range',
    description: `
      Whenever you use a \\magical ability with a \\glossterm{range} listed in feet, you may activate this staff.
      When you do, you double the ability's range.
      In addition, you increase your \\glossterm{fatigue level} by one, and you \\glossterm{briefly} cannot activate this effect again.
    `,
    upgrades: [
      {
        rank: 6,
        short_description: 'Can sometimes double range',
        description: 'Activating the staff does not increase your fatigue level.',
      },
    ],
  }),
  staff({
    name: 'Widening Staff',
    rank: 2,
    short_description: 'Can exert to double area',
    description: `
      Whenever you use a \\magical ability that affects an area and does not have the \\abilitytag{Attune} or \\abilitytag{Sustain} tags, you may activate this staff.
      When you do, you double the ability's area.
      In addition, you increase your \\glossterm{fatigue level} by one, and you \\glossterm{briefly} cannot activate this effect again.
    `,
    upgrades: [
      {
        rank: 6,
        short_description: 'Can sometimes double area',
        description: 'Activating the staff does not increase your fatigue level.',
      },
    ],
  }),
  staff({
    name: 'Splitting Staff',
    rank: 2,
    short_description: 'Can exert to add an extra target',
    description: `
      Whenever you use a \\glossterm{targeted} \\magical ability with a \\glossterm{range} listed in feet, you may activate this staff.
      When you do, increase the number of targets that the ability affects by one.
      In addition, you increase your \\glossterm{fatigue level} by one, and you \\glossterm{briefly} cannot activate this effect again.
    `,
    upgrades: [
      {
        rank: 6,
        short_description: 'Can sometimes add an extra target',
        description: 'Activating the staff does not increase your fatigue level.',
      },
    ],
  }),
  staff({
    name: 'Echoing Staff',
    rank: 7,
    short_description: 'Can exert to repeat effect',
    description: `
      Whenever you use a non-attunable \\magical ability, you may activate this staff.
      When you do, the ability \\glossterm{repeats} at the start of your next turn.
      In addition, you increase your \\glossterm{fatigue level} by one, and you \\glossterm{briefly} cannot activate this effect again.
    `,
  }),
  staff({
    name: 'Staff of Radiance',
    rank: 1,
    short_description: 'Increases light radius',
    description: 'You double the radius of all light you create using \\magical effects.',
    upgrades: [
      {
        rank: 5,
        short_description: 'Grants +1 accuracy, increases light radius',
        description:
          'You also gain a \\plus1 \\glossterm{enhancement bonus} to \\glossterm{accuracy}.',
      },
    ],
  }),
  staff({
    name: 'Perceptive Staff',
    rank: 3,
    short_description: 'Grants +1 accuracy if you have 3 Per',
    description:
      'If your Perception is at least 3, you gain a +1 \\glossterm{enhancement bonus} to \\glossterm{accuracy}.',
    upgrades: [
      {
        rank: 7,
        short_description: 'Grants +2 accuracy if you have 5 Per',
        description: 'The accuracy bonus increases to +2 if your Perception is at least 5.',
      },
    ],
  }),
  staff({
    name: 'Staff of Energy Conversion',
    rank: 4,
    short_description: '+2 damage, changes energy type',
    description: `
      Whenever you use a \\magical ability that has a \\abilitytag{Cold}, \\abilitytag{Electricity}, or \\abilitytag{Fire} tag, you can remove that tag.
      If you do, you must add a different one of those tags to the ability, and the ability deals 2 \\glossterm{extra damage} if it deals damage.
      All of the attack's effects are unchanged.
    `,
    tags: ['Cold', 'Electricity', 'Fire', 'Attune'],
    upgrades: [
      {
        rank: 6,
        short_description: '+1d6 damage, changes energy type',
        description: 'The extra damage increases to 1d6.',
      },
    ],
  }),
  staff({
    name: 'Brutish Staff',
    rank: 3,
    short_description: 'Grants +2 damage if you have 3 Str',
    description:
      'If your Strength is at least 3, you deal 2 \\glossterm{extra damage} with damaging \\magical abilities.',
    upgrades: [
      {
        rank: 5,
        short_description: 'Grants +1d6 damage if you have 4 Str',
        description: 'The extra damage increases to 1d6 if your Strength is at least 4.',
      },
      {
        rank: 7,
        short_description: 'Grants +1d10 damage if you have 5 Str',
        description: 'The extra damage increases to 1d10 if your Strength is at least 5.',
      },
    ],
  }),
  staff({
    name: 'Educated Staff',
    rank: 3,
    short_description: 'Grants +2 damage if you have 3 Int',
    description:
      'If your Intelligence is at least 3, you deal 2 \\glossterm{extra damage} with damaging \\magical abilities.',
    upgrades: [
      {
        rank: 5,
        short_description: 'Grants +1d6 damage if you have 4 Int',
        description: 'The extra damage increases to 1d6 if your Intelligence is at least 4.',
      },
      {
        rank: 7,
        short_description: 'Grants +1d10 damage if you have 5 Int',
        description: 'The extra damage increases to 1d10 if your Intelligence is at least 5.',
      },
    ],
  }),
  staff({
    name: 'Staff of Power',
    rank: 4,
    short_description: 'Empowers you',
    description: 'You are \\empowered.',
    tags: ['Attune (deep)'],
  }),
  staff({
    name: 'Staff of Overwhelming Power',
    rank: 7,
    short_description: 'Empowers you, but with \\minus1 accuracy',
    description: `
      You are \\empowered.
      However, you take a \\minus1 accuracy penalty.
    `,
  }),
  staff({
    name: 'Flaming Staff',
    rank: 3,
    short_description: 'Is burning and ignites',
    description: `
      This staff constantly burns.
      You can suppress or resume this fire as a \\glossterm{free action}.
      While the staff is burning:
      \\begin{raggeditemize}
          \\item All \\magical abilities you use have the \\atFire tag.
          \\item Whenever you hit a creature with \\magical ability, the creature burns.
              It takes 1d6 damage at the end of its next turn.
              This damage is doubled by critical hits and attacks that deal double damage.
          \\item It sheds light in a 15 foot radius of \\glossterm{bright illumination}.
      \\end{raggeditemize}
    `,
    tags: ['Fire', 'Attune'],
    upgrades: [
      {
        rank: 5,
        short_description: 'Is burning and ignites',
        description: 'The damage increases to 1d10.',
      },
      {
        rank: 7,
        short_description: 'Is burning and ignites',
        description: 'The damage increases to 2d8.',
      },
    ],
  }),
  staff({
    name: 'Arcing Staff',
    rank: 4,
    short_description: 'Is charged and chains',
    description: `
      This staff constantly crackles with electricity.
      You can suppress or resume this charge as a \\glossterm{free action}.
      While the staff is charged:
      \\begin{raggeditemize}
          \\item All \\magical abilities you use have the \\atElectricity tag.
          \\item All \\glossterm{targeted} damaging \\magical abilities you use \\glossterm{chain} once.
              % TODO: wording?
              This does not affect magical abilities that do not deal damage, even if they increase the damage dealt by the target.
          \\item It sheds light in a 5 foot radius of \\glossterm{bright illumination}.
      \\end{raggeditemize}
    `,
    tags: ['Fire', 'Attune'],
    upgrades: [
      {
        rank: 7,
        short_description: '+1d4 damage, is charged and chains',
        description:
          'While the staff is charged, your damaging \\magical abilities also deal 1d4 \\glossterm{extra damage}.',
      },
    ],
  }),
  staff({
    name: 'Freezing Staff',
    rank: 2,
    short_description: '+1 damage, is chilled',
    description: `
      This staff is bitterly cold to the touch.
      You can suppress or resume this chill as a \\glossterm{free action}.
      While the staff is chilled:
      \\begin{raggeditemize}
          \\item All \\magical abilities you use have the \\atCold tag.
          \\item All damaging \\magical abilities you use deal 1 \\glossterm{extra damage}.
          \\item It sheds light in a 5 foot radius of \\glossterm{bright illumination}.
      \\end{raggeditemize}
    `,
    tags: ['Fire', 'Attune'],
    upgrades: [
      {
        rank: 4,
        short_description: '+2 damage, is chilled',
        description: 'The extra damage increases to 2.',
      },
      {
        rank: 6,
        short_description: '+1d6 damage, is chilled',
        description: 'The extra damage increases to 1d6.',
      },
    ],
  }),
  staff({
    name: 'Shattered Staff',
    rank: 3,
    short_description: 'Grants +1d6 damage and -2 accuracy',
    description:
      'All damaging \\magical abilities you use deal 1d6 \\glossterm{extra damage}, but have a \\minus2 \\glossterm{accuracy} penalty.',
    upgrades: [
      {
        rank: 5,
        short_description: 'Grants +1d8 damage and -2 accuracy',
        description: 'The extra damage increases to 1d8.',
      },
      {
        rank: 7,
        short_description: 'Grants +2d6 damage and -2 accuracy',
        description: 'The extra damage increases to 2d6.',
      },
    ],
  }),
];
