import { Apparel } from '../../types';
import { attributeItem } from './utils';

export function torso(): Apparel[] {
  return [...belts(), ...cloaks()];
}

function belts(): Apparel[] {
  return [
    {
      kind: 'Belt',
      item: {
        name: 'Belt of Regeneration',
        rank: 3,
        short_description: 'Regain 1d6 hit points each turn',
        description: `
            At the end of your turn, you regain 1d6 \\glossterm{hit points}.
        `,
        magical: true,
        upgrades: [
          {
            rank: 5,
            short_description: 'Regain 3d6 hit points each turn',
            description: 'The healing increases to 3d6.',
          },
          {
            rank: 7,
            short_description: 'Regain 5d10 hit points each turn',
            description: 'The healing increases to 5d10.',
          },
        ],
        tags: ['Attune (deep)'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Belt',
      item: {
        name: 'Belt of Vital Regeneration',
        rank: 6,
        short_description: 'Automatically exert to remove vital wounds',
        description: `
            At the end of your turn, if your \\glossterm{fatigue level} does not exceed your \\glossterm{fatigue tolerance}, you automatically remove one of your \\glossterm{vital wounds}.
            You can choose to stop this regeneration if you are conscious, but it happens automatically if you are unconscious due to vital wounds.
            When you remove a vital wound in this way, you increase your \\glossterm{fatigue level} by three.
        `,
        magical: true,
        upgrades: [],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Belt',
      item: {
        name: 'Poisonbane Belt',
        rank: 2,
        short_description: 'Resistant to poisons',
        description: `
            You are \\resistant to \\glossterm{poisons} and poison damage.
        `,
        magical: true,
        upgrades: [
          {
            rank: 5,
            short_description: 'Immune to poisons',
            description: 'You become immune instead of resistant.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Belt',
      item: {
        name: 'Lifekeeping Belt',
        rank: 1,
        short_description: 'Grants +1 to vital rolls',
        description: `
            You gain a +1 \\glossterm{enhancement bonus} to your \\glossterm{vital rolls}.
        `,
        magical: true,
        upgrades: [
          {
            rank: 3,
            short_description: 'Grants +2 to vital rolls',
            description: 'The bonus increases to +2.',
          },
          {
            rank: 5,
            short_description: 'Grants +3 to vital rolls',
            description: 'The bonus increases to +3.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Belt',
      item: {
        name: 'Healing Belt',
        rank: 1,
        short_description: 'Exert to heal $dr3l hit points',
        description: `
            You can activate this belt as a standard action.
            When you do, you regain $dr3l hit points and increase your \\glossterm{fatigue level} by one.
        `,
        magical: true,
        upgrades: [
          {
            rank: 3,
            short_description: 'Exert to heal $dr5l hit points',
            description: 'The healing increases to $dr5l.',
          },
          {
            rank: 5,
            short_description: 'Exert to heal $dr7l hit points',
            description: 'The healing increases to $dr7l.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Belt',
      item: {
        name: 'Enlarging Belt',
        rank: 4,
        short_description: 'Increases your size',
        description: `
            You can activate this belt as a standard action.
            When you do, your size increases by one \\glossterm{size category}, to a maximum of Huge.
            This effect lasts until you \\glossterm{dismiss} it.

            Increasing your size gives you a +1 bonus to Strength for the purpose of determining your \\glossterm{weight limits}, a -1 penalty to your Reflex defense, and a -4 penalty to your Stealth skill.
            It also increases your \\glossterm{base speed} (see \\pcref{Size Categories}).
            This item makes you slightly clumsy in your new size.
            You take a -10 foot penalty to your speed with all of your \\glossterm{movement modes}.
        `,
        magical: true,
        upgrades: [],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Belt',
      item: {
        name: 'Shrinking Belt',
        rank: 3,
        short_description: 'Reduces your size',
        description: `
            You can activate this belt as a standard action.
            When you do, your size decreases by one \\glossterm{size category}, to a minimum of Small.
            This effect lasts until you \\glossterm{dismiss} it.

            Reducing your size gives you a -1 penalty to Strength for the purpose of determining your \\glossterm{weight limits}, a +1 bonus to your Reflex defense, and a +4 bonus to your Stealth skill.
            It also reduces your \\glossterm{base speed} (see \\pcref{Size Categories}).
        `,
        magical: true,
        upgrades: [],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Belt',
      item: {
        name: 'Utility Belt',
        rank: 2,
        short_description: 'Contains five large pockets',
        description: `
            This belt contains five pockets, each of which is larger on the inside than the outside.
            The inside of each pocket is a six inch cube.
            You can put anything you want in each pocket, but you still carry the weight of anything in the pockets.
            If you put reactive objects in a pocket, such as acid or burning alchemist's fire, it may destroy the pocket until the belt is repaired.

            As long as each pocket is no more than half full, or is full of completely interchangeable items, you can reach into any pocket just as easily as you can reach into a nonmagical pocket.
            Overstuffed pockets may take more time to sift through to find the specific item you want, just like rummaging through a backpack.

            If you take off this belt or stop attuning to it, the items in the belt become inaccessible.
            If this belt is destroyed, the items within it become lost in the Astral Expanse.
        `,
        magical: true,
        upgrades: [
          {
            rank: 5,
            short_description: 'Contains ten large pockets',
            description:
              'The belt has ten pockets instead of five, and each pocket is a one foot cube instead of a six inch cube.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    { kind: 'Belt', item: attributeItem('Belt of Constitution', 'constitution') },
  ];
}

function cloaks(): Apparel[] {
  return [
    {
      kind: 'Cloak',
      item: {
        name: 'Cloak of the Noble Rider',
        rank: 2,
        short_description: 'Can exert to save your mount from death',
        description: `
            Whenever a non-humanoid mount that you are riding would gain one or more \\glossterm{vital wounds}, this cloak automatically activates.
            When it does, you increase your \\glossterm{fatigue level} by one, and the mount does not make a \\glossterm{vital roll} for the vital wounds.
            Instead, each vital wound is treated as having a vital roll of 1, which prevents the mount from dying from its wounds.
        `,
        magical: true,
        upgrades: [
          {
            rank: 4,
            short_description: 'Can save your mount from death',
            description: 'This cloak does not increase your fatigue level when it activates.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Cloak',
      item: {
        name: 'Ghost Shroud',
        rank: 2,
        short_description: 'Grants limited ability to hit incorporeal creatures',
        description: `
            Creatures that are \\trait{incorporeal} are only \\resistant to your \\glossterm{mundane} abilities rather than immune to them.
        `,
        magical: true,
        upgrades: [
          {
            rank: 5,
            short_description: 'Grants ability to hit incorporeal creatures',
            description: 'Incorporeal creatures are not resistant to your mundane abilities.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Cloak',
      item: {
        name: 'Cloak of the Unseen Hunter',
        rank: 4,
        short_description: 'Grants +1 accuracy while concealed',
        description: `
            You gain a +1 \\glossterm{enhancement bonus} to \\glossterm{accuracy} against creatures and objects that you have \\glossterm{concealment} from.
        `,
        magical: true,
        upgrades: [],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Cloak',
      item: {
        name: 'Cloak of Elemental Endurance',
        rank: 2,
        short_description: 'Grants tolerance of temperature extremes',
        description: `
            You can exist comfortably in conditions between -50 and 140 degrees Fahrenheit without any ill effects.
            You suffer the normal penalties in temperatures outside of that range.
        `,
        magical: true,
        upgrades: [],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Cloak',
      item: {
        name: "Cloak of Death's Door",
        rank: 1,
        short_description: 'Braced while at zero HP',
        description: `
            While you have no remaining \\glossterm{hit points}, you are \\braced.
        `,
        magical: true,
        upgrades: [
          {
            rank: 4,
            short_description: 'Braced and take half damage while at zero HP',
            description:
              'While you have no remaining \\glossterm{hit points}, you also take half damage from all sources.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Cloak',
      item: {
        name: 'Cloak of Nondetection',
        rank: 2,
        short_description: 'Resistant to magical detection',
        description: `
            You are \\resistant to attacks with the \\abilitytag{Detection} or \\abilitytag{Scrying} tags.
        `,
        magical: true,
        upgrades: [
          {
            rank: 5,
            short_description: 'Immune to magical detection',
            description: `
                You are immune instead of resistant.
                This does not help against abilities that do not make attacks, so you can still be seen in scrying sensors that are not targeted on you personally.
            `,
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Cloak',
      item: {
        name: 'Quilled Cloak',
        rank: 2,
        short_description: 'Deals $dr4l damage when grappled',
        description: `
            Whenever a creature grapples you, you immediately deal it $dr4l piercing damage.
            This does not affect creatures that you initiate a grapple with.
        `,
        magical: true,
        upgrades: [
          {
            rank: 5,
            short_description: 'Deals $dr7l damage when grappled',
            description: 'The damage increases to $dr7l.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Cloak',
      item: {
        name: 'Avian Cloak',
        rank: 3,
        short_description: 'Grants a glide speed',
        description: `
            You gain an average \\glossterm{glide speed} (see \\pcref{Aerial Movement}).
        `,
        magical: true,
        upgrades: [
          {
            rank: 5,
            short_description: 'Grants a stable glide speed',
            description: `
                When you start gliding, it \\glossterm{briefly} does not make you \\unsteady (see \\pcref{Aerial Movement}).
                After that time, you can become unsteady as normal.
            `,
          },
          {
            rank: 7,
            short_description: 'Grants a very stable glide speed',
            description: 'Gliding does not make you unsteady.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Cloak',
      item: {
        name: 'Cloak of Wings',
        rank: 5,
        short_description: 'Grants flight up to 15 feet high',
        description: `
            You gain a slow \\glossterm{fly speed} with a maximum height of 15 feet (see \\pcref{Flight}).
        `,
        magical: true,
        upgrades: [
          {
            rank: 7,
            short_description: 'Grants flight up to 30 feet high',
            description: 'The height limit increases to 30 feet.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Cloak',
      item: {
        name: 'Phoenixflame Cloak',
        rank: 3,
        short_description: 'Deals $dr3l damage when you recover',
        description: `
            Whenever you use the \\ability{recover} ability, make an attack vs. Reflex against all \\glossterm{enemies} within a \\smallarea radius from you.
            \\hit \\damagerankthreelow.
            \\miss Half damage.
        `,
        magical: true,
        upgrades: [
          {
            rank: 6,
            short_description: 'Deals $dr6l damage when you recover',
            description:
              'The damage increases to $dr6l, and the area increases to a \\medarea radius.',
          },
        ],
        tags: ['Fire', 'Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Cloak',
      item: {
        name: "Assassin's Cloak",
        rank: 5,
        short_description: 'Grants brief invisibility',
        description: `
            You can activate this cloak as a standard action.
            When you do, you \\glossterm{briefly} become \\trait{invisible} (see \\pcref{Invisible}).
            After you activate this cloak, you \\glossterm{briefly} cannot do so again.
        `,
        magical: true,
        upgrades: [],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Cloak',
      item: {
        name: 'Vanishing Cloak',
        rank: 4,
        short_description: 'Can teleport silently',
        description: `
            You can activate this cloak as a standard action.
            When you do, you \\glossterm{teleport} to an unoccupied location within \\rngmed range of your original location, and you \\glossterm{briefly} cannot activate this cloak again.
            As normal for teleportation, you can immediately hide when you reach your destination (see \\pcref{Stealth}).
            Unlike most teleportation, this teleportation does not make any noise.
        `,
        magical: true,
        upgrades: [
          {
            rank: 6,
            short_description: 'Can teleport a great distance silently',
            description: 'The range of the teleportation increases to \\distrange.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Cloak',
      item: {
        name: 'Cloak of Mist',
        rank: 4,
        short_description: 'Fills nearby area with fog',
        description: `
            At the end of your turn, fog \\glossterm{briefly} fills a \\smallarea radius zone from you.
            This fog does not fully block sight, but it provides \\glossterm{concealment}.
            There is no time gap between the disappearance of the old fog and the appearance of the new fog, so you can keep continuous fog cover by staying in the same place or moving slowly.
        `,
        magical: true,
        upgrades: [
          {
            rank: 6,
            short_description: 'Fills a large area with fog',
            description: "The fog's area increases to a \\largearea radius.",
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
  ];
}
