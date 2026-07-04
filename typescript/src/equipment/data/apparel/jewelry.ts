import { RawApparel } from './index';

export function jewelry(): RawApparel[] {
  return [...amulets(), ...rings()];
}

function amulets(): RawApparel[] {
  return [
    {
      kind: 'Amulet',
      item: {
        name: 'Baneswallow Amulet',
        rank: 2,
        short_description: 'Can exert and remove a condition to gain power',
        description: `
            You can activate this ring as a standard action.
            When you do, you may remove a \\glossterm{condition} affecting you.
            If you remove a condition in this way, you are \\glossterm{briefly} \\empowered.

            After you activate this item, you reduce your \\glossterm{stamina} by one.
        `,
        magical: true,
        upgrades: [
          {
            rank: 4,
            short_description: 'Can remove a condition to gain power',
            description: 'Activating this ring does not reduce your stamina.',
          },
        ],
        tags: [],
        rarity: 'Common',
      },
    },
    {
      kind: 'Amulet',
      item: {
        name: 'Hexward Amulet',
        rank: 5,
        short_description: 'Grants +1 defenses against targeted magic',
        description: `
            You gain a +1 bonus to your defenses against \\glossterm{targeted} \\magical abilities.
            This does not protect you from abilities that affect an area.
        `,
        magical: true,
        upgrades: [],
        tags: [],
        rarity: 'Common',
      },
    },
    {
      kind: 'Amulet',
      item: {
        name: 'Cleansing Amulet',
        rank: 1,
        short_description: 'Can exert to remove a condition',
        description: `
          You can activate this amulet as a standard action.
          When you do, you remove one \\glossterm{condition} affecting you.

          After you activate this item, you reduce your \\glossterm{stamina} by one.
        `,
        magical: true,
        upgrades: [
          {
            rank: 3,
            short_description: 'Can remove a condition',
            description: 'Activating this item does not reduce your stamina.',
          },
        ],
        tags: [],
        rarity: 'Common',
      },
    },
    {
      kind: 'Amulet',
      item: {
        name: 'Quickcleanse Amulet',
        rank: 5,
        short_description: 'Can exert to quickly remove a condition',
        description: `
            You can activate this amulet as a \\glossterm{minor action}.
            When you do, you remove one \\glossterm{condition} affecting you.

            After you activate this item, you reduce your \\glossterm{stamina} by one.
        `,
        magical: true,
        upgrades: [],
        tags: [],
        rarity: 'Common',
      },
    },
    {
      kind: 'Amulet',
      item: {
        name: 'Anchoring Amulet',
        rank: 3,
        short_description: 'Immune to most forced movement attacks',
        description: `
            You are immune to \\glossterm{teleport}, \\glossterm{push}, and \\glossterm{fling} effects from attacks, unless the effects come from an attack that scores a \\glossterm{critical hit}.
            This does not affect movement effects used by your \\glossterm{allies}.
        `,
        magical: true,
        upgrades: [
          {
            rank: 6,
            short_description: 'Immune to most forced relocation attacks',
            description:
              'You are also immune to push, fling, and teleportation effects from attacks that are critical hits.',
          },
        ],
        tags: [],
        rarity: 'Common',
      },
    },
  ];
}

function rings(): RawApparel[] {
  return [
    {
      kind: 'Ring',
      item: {
        name: 'Ring of Nourishment',
        rank: 2,
        short_description: 'Provides food and water',
        description: `
            You continuously gain nourishment, and no longer need to eat or drink.
            This ring must be worn for 24 hours before it begins to work.
        `,
        magical: true,
        upgrades: [
          {
            rank: 4,
            short_description: 'Provides food, water, and sleep',
            description:
              'You also need only a quarter of your normal amount of sleep (or similar activity, such as elven trance) each day.',
          },
        ],
        tags: ['Creation'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Ring',
      item: {
        name: 'Ring of Spell Investment',
        rank: 3,
        short_description: 'Can invest a spell to gain its effect later',
        description: `
            When you or an adjacent \\glossterm{ally} casts a spell that does not have the \\abilitytag{Attune} or \\abilitytag{Sustain} tags,
                you can invest the magic of the spell in the ring.
            If you do, the spell does not have its normal effect.
            All decisions about the spell's effect, except for targeting, must be made at the time that the spell is invested in this way.
            The \\textit{desperate exertion} ability cannot be used to affect the spell, either at the time it is invested or when it is activated.
            Only one spell can be stored this way.

            You can activate this ring as a standard action.
            When you do, you cause the effect of the last spell invested in the ring.
            You choose the area and targets affected by the spell at this time.
            This does not require \\glossterm{verbal components} or \\glossterm{somatic components}, even if they would normally be required to cast the spell.
            The spell's effect is determined based on the \\glossterm{power} and other abilities of the original caster who invested the spell into the ring, not yours.
            You do not have to have the ability to cast the spell to activate a spell in this way.

            After you use a spell in this way, the energy in the ring is spent, and you must invest a new spell to activate the ring again.
            Any lingering effects of spells activated through this ring automatically end after ten minutes, and whenever you invest a new spell into the ring.
        `,
        magical: true,
        upgrades: [
          {
            rank: 6,
            short_description: 'Can invest spells to gain their effects later',
            description:
              'You can invest up to two spells in the ring. When you activate the ring, you choose which spell to use.',
          },
        ],
        tags: [],
        rarity: 'Common',
      },
    },
    {
      kind: 'Ring',
      item: {
        name: 'Bonded Ring',
        rank: 2,
        short_description: 'Can teleport next to nearby bonded ally',
        description: `
            You can bond this ring to an \\glossterm{ally} you \\glossterm{touch} as a standard action.
            While the bond lasts, you can activate the ring as a standard action.
            When you do, you \\glossterm{teleport} into the closest unoccupied square adjacent to that ally, if such a space exists within \\medrange.

            All bonds are removed if you remove or deattune from the ring and when you bond the ring to a new ally.
        `,
        magical: true,
        upgrades: [
          {
            rank: 4,
            short_description: 'Can teleport next to distant bonded ally',
            description: 'The teleportation range increases to \\longrange.',
          },
          {
            rank: 6,
            short_description: 'Can teleport next to distant bonded ally',
            description:
              'The teleportation does not require \\glossterm{line of sight} or \\glossterm{line of effect}.',
          },
        ],
        tags: [],
        rarity: 'Common',
      },
    },
  ];
}
