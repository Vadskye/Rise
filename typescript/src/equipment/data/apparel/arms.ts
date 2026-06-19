import { Apparel } from '../../types';
import { attributeItem, skillItem, reliableSkillItem } from './utils';

export function arms(): Apparel[] {
  return [...bracers(), ...gauntlets(), ...gloves(), ...tattoos()];
}

function bracers(): Apparel[] {
  return [
    {
      kind: 'Bracers',
      item: {
        name: 'Bracers of Armor',
        rank: 1,
        short_description: 'Surrounds you in armor',
        description: `
            You have a translucent suit of magical armor on your body and over your hands.
            This functions like medium body armor that provides a +3 bonus to Armor defense, a +4 bonus to your \\glossterm{durability}, and a +1 bonus to your \\glossterm{vital rolls}.
            Unlike normal medium body armor, it does not reduce your Armor defense bonus from Dexterity.

            The armor provided by this effect is dismissed if you have other body armor of any kind.
        `,
        magical: true,
        upgrades: [
          {
            rank: 4,
            short_description: 'Surrounds you in armor',
            description: 'The durability bonus increases to +5.',
          },
          {
            rank: 7,
            short_description: 'Surrounds you in armor',
            description: 'The Armor defense bonus increases to +4.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Bracers',
      item: {
        name: 'Shieldburst Bracers',
        rank: 1,
        short_description: 'Can exert to gain instant +2 Armor defense',
        description: `
            You can activate these bracers as a \\glossterm{free action}.
            When you do, you reduce your \\glossterm{stamina} by one and \\glossterm{briefly} gain a +2 bonus to your Armor defense.
            After you activate this item, you \\glossterm{briefly} cannot do so again.
        `,
        magical: true,
        upgrades: [
          {
            rank: 4,
            short_description: 'Can exert to gain instant +4 Armor defense',
            description: 'The defense bonus increases to +4.',
          },
          {
            rank: 7,
            short_description: 'Can exert to gain instant +6 Armor defense',
            description: 'The defense bonus increases to +6.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Bracers',
      item: {
        name: 'Bracers of Repulsion',
        rank: 1,
        short_description: 'Can push nearby creatures back',
        description: `
            You can activate these bracers as a standard action.
            When you do, they emit a telekinetic burst of force, and you \\glossterm{briefly} cannot activate them again.
            Make an attack vs. Brawn against all \\glossterm{enemies} within a \\smallarea radius from you.
            Your minimum accuracy is $accuracy.
            \\hit You \\glossterm{push} the target 30 feet in a straight line directly away from you.
            If the target is \\glossterm{injured}, you \\glossterm{fling} it instead of pushing it.
        `,
        magical: true,
        upgrades: [
          {
            rank: 3,
            short_description: 'Can push nearby creatures back',
            description: `The minimum accuracy increases to $accuracy and the area increases to a \\largearea radius from you.`,
          },
          {
            rank: 6,
            short_description: 'Can push nearby creatures back',
            description: `The minimum accuracy increases to $accuracy and the push or fling distance increases to 60 feet.`,
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Bracers',
      item: {
        name: 'Greatreach Bracers',
        rank: 4,
        short_description: 'Allows striking non-adjacent foes',
        description: `
            Your melee \\glossterm{strikes} gain the \\weapontag{Long} weapon tag, allowing you to attack targets up to 10 feet away from you (see \\pcref{Weapon Tags}).
        `,
        magical: true,
        upgrades: [],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Bracers',
      item: {
        name: 'Bracers of Blessed Protection',
        rank: 1,
        short_description: 'Can protect against one critical hit',
        description: `
            Whenever you are hit by a \\glossterm{critical hit}, this item automatically activates.
            When it does, the attacker rerolls the attack against you, which may prevent the attack from getting a critical hit against you.
            This does not protect any other targets of the attack.
            You stop being attuned to this item when it activates in this way, and you must attune to it again to gain its effects.
        `,
        magical: true,
        upgrades: [
          {
            rank: 4,
            short_description: 'Can protect against two critical hits',
            description: `
                This item can activate twice before you stop being attuned to it.
                It can only reroll any individual attack once.
            `,
          },
          {
            rank: 7,
            short_description: 'Can protect against three critical hits',
            description: 'This item can activate three times before you stop being attuned to it.',
          },
        ],
        tags: ['Attune (deep)'],
        rarity: 'Common',
      },
    },
  ];
}

function gauntlets(): Apparel[] {
  return [
    {
      kind: 'Gauntlets',
      item: {
        name: 'Throwing Gauntlets',
        rank: 3,
        short_description: 'Allows throwing objects up to 60 feet',
        description: `
            You can throw creatures and objects as they had the \\weapontag{Thrown} (30/60) weapon tag (see \\pcref{Weapon Tags}).
            They must be at least one size category smaller than you, and you must be able to pick them up within your \\glossterm{weight limits}.
        `,
        magical: true,
        upgrades: [
          {
            rank: 6,
            short_description: 'Allows throwing objects up to 120 feet',
            description: 'The tag improves to Thrown (60/120).',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Gauntlets',
      item: {
        name: 'Gauntlets of Telekinetic Propulsion',
        rank: 2,
        short_description: 'Reduces thrown longshot penalty by 1',
        description: `
            When you make a thrown \\glossterm{strike}, you reduce your \\glossterm{longshot penalty} by 1 (see \\pcref{Weapon Range Limits}).
        `,
        magical: true,
        upgrades: [
          {
            rank: 4,
            short_description: 'Reduces thrown longshot penalty by 2',
            description: 'The penalty reduction increases to 2.',
          },
          {
            rank: 6,
            short_description: 'Reduces thrown longshot penalty by 3',
            description: 'The penalty reduction increases to 3.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    // Short range is dr3. At rank 2, dr3 would normally deal ~11 damage. Item attunement bonus should deal about 29% more.
    // dr4l is 3d10 = 16.5, which is too high. dr3l with 3 str would be 14, which is about right.
    {
      kind: 'Gauntlets',
      item: {
        name: 'Slinging Gauntlets',
        rank: 2,
        short_description: 'Can throw a rock to deal Strength-based damage',
        description: `
            You can activate these gauntlets as a standard action.
            When you do, a rock appears in one \\glossterm{free hand}, and you can immediately throw it at anything within \\shortrange.
            Make an attack against the target's Armor defense.
            After you activate this item, you \\glossterm{briefly} cannot do so again.
            \\hit \\damagerankthreelow plus your Strength.
        `,
        magical: true,
        upgrades: [
          // dr5 at rank 4 is ~23. dr5l is 22.5. With 4 str, 30.5 damage, so 32% more.
          {
            rank: 4,
            short_description: 'Can throw a rock to deal Strength-based damage',
            description: 'The damage increases to $dr5l plus twice Strength.',
          },
          // dr7 at rank 6 is ~47. dr7l is 44. With 5 str, 64 damage, so 36% more.
          {
            rank: 6,
            short_description: 'Can throw a rock to deal Strength-based damage',
            description: 'The damage increases to $dr7l plus four times Strength.',
          },
        ],
        tags: ['Attune', 'Manifestation', 'Physical'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Gauntlets',
      item: {
        name: 'Gauntlets of Might',
        rank: 2,
        short_description: 'Grants +1 Strength for weight limits',
        description: `
            You gain a +1 \\glossterm{enhancement bonus} to Strength that only applies for the purpose of determining your \\glossterm{weight limits} (see \\pcref{Weight Limits}).
        `,
        magical: true,
        upgrades: [
          {
            rank: 5,
            short_description: 'Grants +2 Strength for weight limits',
            description: 'The bonus increases to +2.',
          },
          {
            rank: 7,
            short_description: 'Grants +1 mundane power and +2 Strength for weight limits',
            description:
              'You also gain a +1 \\glossterm{enhancement bonus} to your \\glossterm{mundane power}.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    { kind: 'Gauntlets', item: attributeItem('Gauntlets of Strength', 'strength') },
  ];
}

function gloves(): Apparel[] {
  return [
    {
      kind: 'Gloves',
      item: {
        name: 'Gloves of Improvisation',
        rank: 1,
        short_description: 'Grants proficiency with improvised weapons',
        description: `
            You are \\glossterm{proficient} with \\glossterm{improvised weapons} (see \\pcref{Weapon Proficiency}).
        `,
        magical: true,
        upgrades: [],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Gloves',
      item: {
        name: 'Ambidextrous Gloves',
        rank: 1,
        short_description: 'Make dual strikes without Dexterity',
        description: `
            You can make \\glossterm{dual strikes} even if your Dexterity is less than 2 (see \\pcref{Dual Strikes}).
        `,
        magical: true,
        upgrades: [],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    { kind: 'Gloves', item: skillItem('Locksmith Gloves', 'Devices') },
    { kind: 'Gloves', item: skillItem('Pickpocket Gloves', 'Sleight of Hand') },
    {
      kind: 'Gloves',
      item: {
        name: 'Thieving Gloves',
        rank: 2,
        short_description: 'Can absorb a small item',
        description: `
            You can activate these gloves as a standard action.
            When you do, they absorbs one Small or smaller object you are touching with either glove.

            An absorbed object does not increase the weight of the gloves and is undetectable by any means.
            The gloves can hold no more than three objects at once.
            If you attempt to absorb an object while the gloves are full, the attempt fails.

            As a free action, you can retrieve the most recently absorbed item.
            The item appears in your hand, or falls to the ground if your hand is occupied.
            The item similarly reappears if you stop attuning to this gloves or take them off.
        `,
        magical: true,
        upgrades: [
          {
            rank: 4,
            short_description: 'Can absorb an item',
            description: 'The maximum size category increases to Medium.',
          },
          {
            rank: 6,
            short_description: 'Can absorb a large item',
            description: 'The maximum size category increases to Large.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Relic',
      },
    },
    {
      kind: 'Gloves',
      item: reliableSkillItem(
        'Gloves of Reliable Finesse',
        'Craft, Devices, or Sleight of Hand',
        'finesse-based',
      ),
    },
    {
      kind: 'Gloves',
      item: {
        name: 'Ghoultouch Gloves',
        rank: 1,
        short_description: 'Grants a slowing touch',
        description: `
            You can activate these gloves as a standard action using a \\glossterm{free hand}.
            When you do, make an attack vs. Fortitude against a creature you touch with either glove.
            After activating this item, you \\glossterm{briefly} cannot activate it again.
            \\hit The target is \\glossterm{briefly} \\slowed.
            If it is \\glossterm{injured}, it is also slowed as a \\glossterm{condition}.
        `,
        magical: true,
        upgrades: [
          {
            rank: 6,
            short_description: 'Grants a slowing touch',
            description: 'The target is slowed as a condition even if it is not injured.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    { kind: 'Gloves', item: attributeItem('Gloves of Dexterity', 'dexterity') },
    {
      kind: 'Gloves',
      item: {
        name: 'Bladespawn Gloves',
        rank: 1,
        short_description: 'Can create daggers',
        description: `
            Once per turn, you can activate these gloves as a \\glossterm{free action}.
            When you do, a dagger \\glossterm{briefly} appears in each of your free hands.
            The daggers disappear when this effect ends.
        `,
        magical: true,
        upgrades: [
          {
            rank: 4,
            short_description: 'Can create daggers with special materials',
            description: `
                The daggers be made from a special material of your choice.
                You can create an adamantine, pure diamondsteel, mithral, or silver dagger (see \\pcref{Weapon Special Materials}).
            `,
          },
          {
            rank: 7,
            short_description: 'Can create daggers with special materials',
            description:
              'The daggers can also be made of pure adamantine, pure mithral, or sanctified silver.',
          },
        ],
        tags: ['Manifestation', 'Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Gloves',
      item: {
        name: 'Static Gloves',
        rank: 1,
        short_description: 'Can be statically charged',
        description: `
            You can activate or deactivate these soft silk gloves as a \\glossterm{minor action}.
            While active, the gloves have a small static charge.
            This grants you a \\plus2 \\glossterm{enhancement bonus} to the Climb skill.
            In addition, Fine objects stick to your hands without needing to be held.
            While statically charged, the gloves tend to accumulate dirt and dust quickly.
        `,
        magical: true,
        upgrades: [],
        tags: ['Electricity'],
        rarity: 'Relic',
      },
    },
    {
      kind: 'Gloves',
      item: {
        name: 'Gloves of the Ice Sculptor',
        rank: 2,
        short_description: 'Sculpt ice with your hands',
        description: `
            While wearing these thick, woolen gloves, you can sculpt ice as if it was soft clay.
            You still must make a Craft check to create anything complex.
            This generally allows you to craft things with ice five times faster than normal.
        `,
        magical: true,
        upgrades: [],
        tags: ['Cold'],
        rarity: 'Relic',
      },
    },
    {
      kind: 'Gloves',
      item: {
        name: 'Twinsculpt Gloves',
        rank: 2,
        short_description: 'Can copy details between surfaces',
        description: `
            You can activate or deactivate these gloves as a \\glossterm{minor action}.
            While active, the right glove changes the surface texture of whatever it touches to match the surface texture of whatever your left hand is touching.
            This can copy writing, minor decorative flourishes, and similar small changes.
            It cannot cause significant structural changes.
            The right glove can change the surface texture of \\glossterm{mundane} objects that are softer than stone, such as wood or paper, but does not affect living things or harder obejcts.
        `,
        magical: true,
        upgrades: [],
        tags: [],
        rarity: 'Relic',
      },
    },
    {
      kind: 'Gloves',
      item: {
        name: 'Shadowplay Gloves',
        rank: 1,
        short_description: 'Create realistic shadow puppets',
        description: `
            When you make shadow puppets with your hands while wearing these black silk gloves, the shadows created are unnervingly realistic and detailed.
            They match your intended vision of what the shadows should look like, and are able to portray expressions and fine movements that would normally be impossible.
            Any observer can still recognize the shadows as shadows, as they are still flat and lack color.
        `,
        magical: true,
        upgrades: [],
        tags: ['Visual'],
        rarity: 'Relic',
      },
    },
  ];
}

function tattoos(): Apparel[] {
  const nthImbuement = (rank: number): Apparel => ({
    kind: 'Tattoo',
    item: {
      name: `Tattoo of Imbuement (${rank})`,
      rank,
      short_description: `Grants a rank ${rank} weapon property to a natural weapon`,
      description: `
          This item functions like a \\mitem{tattoo of imbuement}, except that the magic weapon property is rank ${rank}.
      `,
      magical: true,
      upgrades: [],
      tags: ['Attune'],
      rarity: 'Common',
    },
  });

  return [
    {
      kind: 'Tattoo',
      item: {
        name: 'Tattoo of Imbuement (1)',
        rank: 1,
        short_description: 'Grants a rank 1 weapon property to a natural weapon',
        description: `
            This tattoo must be applied to one of your \\glossterm{natural weapons} that do not require a free hand to use, such as a bite.
            It provides that natural weapon with a specific rank 1 magic weapon property which is not a \\glossterm{deep attunement}.

            If that natural weapon would already be affected by a magic weapon property, this tattoo has no effect on it.
            Different versions of this item exist for each rank 1 magic weapon property.
        `,
        magical: true,
        upgrades: [],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    nthImbuement(2),
    nthImbuement(3),
    nthImbuement(4),
    nthImbuement(5),
    nthImbuement(6),
    nthImbuement(7),
  ];
}
