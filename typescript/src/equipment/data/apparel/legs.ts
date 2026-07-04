import { RawApparel } from './index';

export function legs(): RawApparel[] {
  return [...boots()];
}

function boots(): RawApparel[] {
  return [
    {
      kind: 'Boots',
      item: {
        name: 'Phasestep Boots',
        rank: 2,
        short_description: 'Can move through creatures',
        description: `
            When you move using one of your movement speeds, you can move through creatures freely.
            This does not allow you to move through inanimate objects.
            You must still end your movement in an unoccupied space.
            If you are not able to move normally, such as if you are \\grappled, these boots do not help you.
        `,
        magical: true,
        upgrades: [
          {
            rank: 5,
            short_description: 'Can move through creatures and objects',
            description:
              'You can also move through \\glossterm{mundane}, \\glossterm{inanimate} objects that are no more than six inches thick.',
          },
        ],
        tags: [],
        rarity: 'Common',
      },
    },
    {
      kind: 'Boots',
      item: {
        name: 'Skydancing Boots',
        rank: 3,
        short_description: 'Can very briefly walk on air',
        description: `
            You can activate these boots as a \\glossterm{free action}.
            When you do, you may treat air as if it were solid ground to your feet during this turn.
            You may selectively choose when to treat the air as solid ground, allowing you to walk or jump on air freely.
            These boots cannot be activated again until you land on a solid surface capable of supporting your weight.
        `,
        magical: true,
        upgrades: [
          {
            rank: 6,
            short_description: 'Can briefly walk on air',
            description:
              'The effect lasts \\glossterm{briefly} instead of only during the current turn.',
          },
        ],
        tags: [],
        rarity: 'Common',
      },
    },
    {
      kind: 'Boots',
      item: {
        name: 'Boots of Freedom',
        rank: 7,
        short_description: 'Grants immunity to almost all mobility restrictions',
        description: `
            You are immune to being \\slowed and knocked \\prone, and you are unaffected by \\glossterm{difficult terrain}.
            Enemy attacks cannot cause you to be \\grappled, but you can still be grappled if you initiate the grapple.
        `,
        magical: true,
        tags: [],
        upgrades: [],
        rarity: 'Common',
      },
    },
    {
      kind: 'Boots',
      item: {
        name: 'Boots of Gravitation',
        rank: 3,
        short_description: 'Redirects personal gravity to adjacent objects',
        description: `
            Once per turn, while you are within 5 feet of an \\glossterm{unattended} object at least one size category larger than you, you can activate these boots as a \\glossterm{free action}.
            When you do, gravity pulls you towards that surface instead of in the normal direction.
            This allows you to walk normally on walls or even ceilings.

            Whenever you change the direction that gravity pulls you, you must make a \\glossterm{difficulty value} 10 Balance check to keep your feet.
            Failure means you fall \\prone and your movement ends.
        `,
        magical: true,
        upgrades: [
          {
            rank: 5,
            short_description: 'Redirects personal gravity to nearby objects',
            description: `
                The maximum distance increases to 15 feet.
                This can allow you to pull yourself towards distant objects, though you may take falling damage if you fall too far.
            `,
          },
        ],
        tags: [],
        rarity: 'Common',
      },
    },
    {
      kind: 'Boots',
      item: {
        name: 'Boots of Speed',
        rank: 5,
        short_description: 'Increases speed by 10 feet',
        description: `
            You gain a +10 foot \\glossterm{enhancement bonus} to your \\glossterm{speed}.
        `,
        magical: true,
        upgrades: [],
        tags: [],
        rarity: 'Common',
      },
    },
    {
      kind: 'Boots',
      item: {
        name: 'Astral Boots',
        rank: 6,
        short_description: 'Allows teleporting instead of moving',
        description: `
            When you move using one of your movement speeds, you can \\glossterm{teleport} the same distance instead.
            This does not change the total distance you can move, but you can teleport in any direction, even vertically.
        `,
        magical: true,
        upgrades: [],
        tags: [],
        rarity: 'Common',
      },
    },
    {
      kind: 'Boots',
      item: {
        name: 'Dry Boots',
        rank: 1,
        short_description: 'Keeps feet dry',
        description: `
            These boots remain dry and comfortable in all circumstances.
            Even when submerged in water, they prevent any water from touching your feet.
        `,
        magical: true,
        upgrades: [],
        tags: [],
        rarity: 'Relic',
      },
    },
    {
      kind: 'Boots',
      item: {
        name: 'Boots of the Winterlands',
        rank: 1,
        short_description: 'Eases travel in cold areas',
        description: `
            You can travel across snow and ice without slipping or suffering movement penalties for the terrain.
        `,
        magical: true,
        upgrades: [
          {
            rank: 3,
            short_description: 'Greatly eases travel in cold areas',
            description:
              'The boots also keep you warm, protecting you in environments as cold as -50 degrees Fahrenheit.',
          },
        ],
        tags: ['Cold'],
        rarity: 'Relic',
      },
    },
    {
      kind: 'Boots',
      item: {
        name: 'Boots of the Desertlands',
        rank: 1,
        short_description: 'Eases travel in deserts',
        description: `
            You can travel across sand, including quicksand, without slipping or suffering movement penalties for the terrain.
        `,
        magical: true,
        upgrades: [
          {
            rank: 3,
            short_description: 'Eases travel in warm deserts',
            description:
              'The boots also keep you cool, protecting you in environments as warm as 140 degrees Fahrenheit.',
          },
        ],
        tags: [],
        rarity: 'Relic',
      },
    },
    {
      kind: 'Boots',
      item: {
        name: 'Seven League Boots',
        rank: 4,
        short_description: 'Can exert to teleport seven leagues',
        description: `
          You can activate these boots as a standard action.
          When you do, you reduce your \\glossterm{stamina} by one and teleport horizontally exactly 25 miles in a direction you specify.
          After you activate these boots, you \\glossterm{briefly} cannot do so again.
          If this would place you within a solid object or otherwise impossible space, the boots will shunt you up to 1,000 feet in any direction to the closest available space.
          If there is no available space within 1,000 feet of your intended destination, the effect fails and you take 4d6 damage.
        `,
        magical: true,
        upgrades: [],
        tags: [],
        rarity: 'Relic',
      },
    },
    {
      kind: 'Boots',
      item: {
        name: 'Levitating Boots',
        rank: 2,
        short_description: 'Can exert to levitate after jumping',
        description: `
            Whenever you jump, you can activate these boots (see \\pcref{Jumping}).
            When you do, you reduce your \\glossterm{stamina} by one.
            In exchange, your maximum jump height is equal to your maximum horizontal jump distance, and you can land in midair at any point during your jump this turn.
            You can \\glossterm{briefly} levitate in that location as if you were standing on solid ground.

            These boots cannot be activated again until you spend your full turn on a solid surface capable of supporting your weight.
        `,
        magical: true,
        upgrades: [
          {
            rank: 5,
            short_description: 'Can levitate after jumping',
            description: 'Activating these boots does not reduce your stamina.',
          },
        ],
        tags: [],
        rarity: 'Common',
      },
    },
    {
      kind: 'Boots',
      item: {
        name: 'Sprinting Boots',
        rank: 4,
        short_description: 'Can sprint without exertion',
        description: `
          Whenever you use the \\ability{sprint} ability, you can activate these boots.
          When you do, that ability does not reduce your \\glossterm{stamina}.

          After you activate these boots, you cannot do so again until you spend your full turn without making a \\glossterm{movement}.
        `,
        magical: true,
        upgrades: [],
        tags: [],
        rarity: 'Common',
      },
    },
    {
      kind: 'Boots',
      item: {
        name: 'Boots of Desperate Retreat',
        rank: 1,
        short_description: 'Can move when you recover',
        description: `
            When you use the \\ability{recover} ability, you can also use a \\glossterm{move action} immediately afterward.
        `,
        magical: true,
        upgrades: [
          {
            rank: 4,
            short_description: 'Can sprint when you recover',
            description:
              'When you use the \\ability{recover} ability, you can also use the \\ability{sprint} ability immediately afterward.',
          },
        ],
        tags: [],
        rarity: 'Common',
      },
    },
  ];
}
