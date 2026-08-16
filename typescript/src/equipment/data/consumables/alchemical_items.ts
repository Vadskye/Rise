import { Tool, RawConsumable } from '../../types';

function createAlchemicalItem(data: RawConsumable): Tool {
  return {
    category: 'Alchemical',
    item: {
      magical: false,
      rarity: 'Common',
      tags: data.tags || [],
      upgrades: data.upgrades || [],
      ...data,
    },
  };
}

export function alchemicalItems(): Tool[] {
  return [
    ...thrownAttacks(),
    createAlchemicalItem({
      name: 'Smokestick',
      rank: 0,
      attunement: 'Unrestricted',
      short_description: 'Creates a cloud of smoke',
      description: `
        You can activate this item as a standard action.
        As part of that action, you can optionally throw it anywhere within \\shortrange.
        When you activate this item, it immediately creates a cloud of smoke in a \\medarea radius from its location.
        The smoke provides \\glossterm{concealment} for everything in the area.

        This item continues emitting smoke for one minute.
        After that time, the smoke dissipates normally, which generally takes about a minute.
      `,
      upgrades: [
        {
          rank: 3,
          short_description: 'Creates a massive cloud of smoke',
          description: `
            The area increases to a \\hugearea radius.
          `,
        },
      ],
    }),
    createAlchemicalItem({
      name: 'Tindertwig',
      rank: 0,
      attunement: 'Unrestricted',
      short_description: 'Quickly activated flame',
      description: `
        You can activate this small, wooden stick by striking it against any hard surface as a \\glossterm{minor action}.
        When you do, it bursts into flame, allowing you to light other fires with it.
        A tindertwig burns for one minute.
      `,
      tags: ['Fire'],
    }),
    createAlchemicalItem({
      name: 'Flash Powder',
      rank: 0,
      attunement: 'Unrestricted',
      short_description: 'Emits burst of bright light',
      description: `
        You can throw this powder in the air in your location as a standard action.
        When you do, it \\glossterm{briefly} emits \\glossterm{bright illumination} in a \\largearea radius.
      `,
      tags: ['Visual'],
      upgrades: [
        {
          rank: 2,
          short_description: 'Emits burst of brilliant light',
          description: `
            The light is \\glossterm{brilliant illumination}, which banishes shadows completely, instead of bright illumination.
          `,
        },
      ],
    }),
    createAlchemicalItem({
      name: 'Moonrod',
      rank: 0,
      attunement: 'Unrestricted',
      short_description: 'Emits bright illumination',
      description: `
        You can activate this item as a standard action.
        When you do, it creates \\glossterm{bright illumination} in a 60 foot radius for 10 minutes.
      `,
      tags: ['Visual'],
      upgrades: [
        {
          rank: 2,
          short_description: 'Emits bright illumination for 8 hours',
          description: `
            The effect lasts for 8 hours.
          `,
        },
      ],
    }),
    createAlchemicalItem({
      name: 'Sunrod',
      rank: 2,
      attunement: 'Unrestricted',
      short_description: 'Emits brilliant illumination',
      description: `
        You can activate this item as a standard action.
        When you do, it creates \\glossterm{brilliant illumination} in a 60 foot radius for 10 minutes.
      `,
      tags: ['Visual'],
      upgrades: [
        {
          rank: 5,
          short_description: 'Emits brilliant illumination for 8 hours',
          description: `
            The effect lasts for 8 hours.
          `,
        },
      ],
    }),
  ];
}

function thrownAttacks(): Tool[] {
  return [
    createAlchemicalItem({
      name: 'Holy Water',
      rank: 0,
      attunement: 'Unrestricted',
      short_description: 'Throw to deal $dr3l damage to evil',
      description: `
        You can throw this item as a standard action.
        When you do, make an attack vs. Reflex against something within \\shortrange.
        \\hit If the target is \\creaturetype{undead} or an evil \\creaturetype{soulforged}, it takes $dr3l damage.
        Some creatures have specific effects when they are hit by holy water.
      `,
      upgrades: [
        {
          rank: 2,
          short_description: 'Throw to deal $dr6l damage to evil',
          description: `
            The damage increases to $dr6l.
          `,
        },
      ],
    }),
    createAlchemicalItem({
      name: 'Sanctified Divine Ichor',
      rank: 4,
      attunement: 'Unrestricted',
      short_description: 'Throw to heal or deal $dr7l damage to evil',
      description: `
        You can throw this item as a standard action.
        When you do, make an attack vs. Reflex against something within \\shortrange.
        \\hit If the target is \\creaturetype{undead} or an evil \\creaturetype{soulforged}, it takes $dr7l damage.
        Otherwise, it regains $dr7l \\glossterm{hit points} and reduces its \\glossterm{stamina} by one.
      `,
      upgrades: [
        {
          rank: 6,
          short_description: 'Throw to heal or deal $dr9l damage to evil',
          description: `
            The damage and healing increases to $dr9l.
          `,
        },
      ],
    }),
    createAlchemicalItem({
      name: 'Corrupted Divine Ichor',
      rank: 4,
      attunement: 'Unrestricted',
      short_description: 'Throw to heal evil or deal $dr7l damage',
      description: `
        You can throw this item as a standard action.
        When you do, make an attack vs. Reflex against something within \\shortrange.
        \\hit If the target is \\creaturetype{undead} or an evil \\creaturetype{soulforged}, it regains $dr7l \\glossterm{hit points} and reduces its \\glossterm{stamina} by one.
        Otherwise, it takes $dr7l damage.
      `,
      upgrades: [
        {
          rank: 6,
          short_description: 'Throw to heal evil or deal $dr9l damage',
          description: `
            The damage and healing increases to $dr9l.
          `,
        },
      ],
    }),
    createAlchemicalItem({
      name: 'Unholy Water',
      rank: 0,
      attunement: 'Unrestricted',
      short_description: 'Throw to deal $dr3l damage',
      description: `
        You can throw this item as a standard action.
        When you do, make an attack vs. Reflex against something within \\shortrange.
        \\hit If the target is a good \\creaturetype{soulforged}, it takes $dr3l damage.
        Some creatures have specific effects when they are hit by unholy water.
      `,
      upgrades: [
        {
          rank: 2,
          short_description: 'Throw to deal $dr5l damage',
          description: `The damage increases to $dr5l.`,
        },
      ],
    }),
    // A rank 2 short range double defense spell would deal dr4 damage.
    // That becomes dr3l with low damage.
    // dr4 at rank 2: 11 damage
    // dr3l: 13.5 damage
    createAlchemicalItem({
      name: "Alchemist's Fire",
      rank: 0,
      attunement: 'Unrestricted',
      short_description: 'Throw to deal $dr3l damage',
      description: `
        You can throw this item as a standard action.
        When you do, make an attack vs. Armor and Reflex against something within \\shortrange.
        \\hit $dr3l damage.
      `,
      tags: ['Fire'],
      upgrades: [
        // A rank 4 short range double defense spell would deal dr6 damage.
        // That becomes dr5l with low damage scaling?
        // dr6 at rank 4: 29.75 damage
        // dr5l: 24.5 damage.
        // dr6l: 33 damage.
        {
          rank: 2,
          short_description: 'Throw to deal $dr5l damage',
          description: `The damage increases to $dr5l.`,
        },
      ],
    }),
    createAlchemicalItem({
      name: 'Bottled Hellfire',
      rank: 4,
      attunement: 'Unrestricted',
      short_description: 'Throw to deal $dr5l damage over time',
      // A rank 6 short range double defense spell would deal dr8 damage, or double dr6 as
      // a burn. That stays as double dr6l.
      // dr8 at rank 6: 56 damage
      // Double dr6: 76 damage (+35%)
      // Double dr6l: 66 damage
      description: `
        You can throw this item as a standard action.
        When you do, make an attack vs. Armor and Reflex against something within \\shortrange.
        \\hit $dr6l damage.
        The target also \\briefly \\debuff{burns} for $dr6l damage.
      `,
      tags: ['Fire'],
      upgrades: [
        {
          rank: 6,
          short_description: 'Throw to deal $dr8l damage over time',
          description: `The damage of both the initial hit and the burn increases to $dr8l.`,
        },
      ],
    }),
    createAlchemicalItem({
      name: 'Acid Flask',
      rank: 1,
      attunement: 'Unrestricted',
      short_description: 'Throw to deal $dr3l damage over time',
      // A rank 3 short range double defense spell would deal dr5.
      // dr5 at rank 3: 18
      // Double dr3l: 27 (+50%)
      description: `
        You can throw this item as a standard action.
        When you do, make an attack vs. Reflex and Fortitude against something within \\shortrange.
        \\hit $dr3l damage.
        The target also \\briefly \\debuff{corrodes} for $dr3l damage.
      `,
      tags: ['Acid'],
      upgrades: [
        {
          rank: 3,
          short_description: 'Throw to deal $dr6l damage over time',
          description: `
            The damage of both the initial hit and the corrosion increases to $dr6l.
          `,
        },
      ],
    }),
    createAlchemicalItem({
      name: 'Precursor Bile',
      rank: 5,
      attunement: 'Unrestricted',
      short_description: 'Throw to deal $dr7l damage over time',
      description: `
        You can throw this item as a standard action.
        When you do, make an attack vs. Reflex and Fortitude against everything in a \\tinyarea radius within \\shortrange.
        Your minimum accuracy is $consumableaccuracy.
        \\hit $dr7l damage.
        The target also \\briefly \\debuff{corrodes} for $dr7l damage.
        \\miss Half damage, and the target does not corrode.
      `,
      tags: ['Acid'],
      upgrades: [
        {
          rank: 7,
          short_description: 'Throw to deal $dr9l damage over time',
          description: `
            The minimum accuracy increases to $consumableaccuracy, and the damage of both the initial hit and the corrosion increases to $dr9l.
          `,
        },
      ],
    }),
    // rank 3 spell would be dr3. That's about the same in low power scaling.
    createAlchemicalItem({
      name: 'Firebomb',
      rank: 1,
      attunement: 'Unrestricted',
      short_description: 'Throw to deal $dr3l damage in an area',
      description: `
        You can throw this item as a standard action.
        When you do, make an attack vs. Armor and Reflex against everything in a \\smallarea radius within \\shortrange.
        Your minimum accuracy is $consumableaccuracy.
        \\hit $dr3l damage.
        \\miss Half damage.
      `,
      tags: ['Fire'],
      upgrades: [
        {
          rank: 3,
          short_description: 'Throw to deal $dr5l damage in an area',
          description: `
            The minimum accuracy increases to $consumableaccuracy, and the damage increases to $dr5l.
          `,
        },
      ],
    }),
    // Rank 7 spell would be dr7 = 51 damage.
    // Double dr6l is 66 damage (+29%)
    createAlchemicalItem({
      name: 'Lavabomb',
      rank: 5,
      attunement: 'Unrestricted',
      short_description: 'Throw to deal $dr6l damage in an area',
      description: `
        You can throw this item as a standard action.
        When you do, make an attack vs. Armor and Reflex against everything in a \\smallarea radius within \\shortrange.
        Your minimum accuracy is $consumableaccuracy.
        \\hit $dr6l damage.
        The target also \\briefly \\debuff{burns} for $dr6l damage.
        \\miss Half damage, and the target does not burn.
      `,
      tags: ['Fire'],
      upgrades: [
        {
          rank: 7,
          short_description: 'Throw to deal $dr8l damage in an area',
          description: `
            The minimum accuracy increases to $consumableaccuracy, and the damage of both the initial hit and the burn increases to $dr8l.
          `,
        },
      ],
    }),
    // Rank 4 spell would be dr3, ignoring the debuff.
    createAlchemicalItem({
      name: 'Mindbomb',
      rank: 2,
      attunement: 'Unrestricted',
      short_description: 'Throw to deal $dr3l damage in an area',
      description: `
        You can throw this item as a standard action.
        When you do, make an attack vs. Mental against all creatures in a \\smallarea radius within \\shortrange.
        Your minimum accuracy is $consumableaccuracy.
        \\hit $dr3l \\glossterm{subdual damage}.
        \\injury The target is \\briefly \\dazed.
        \\miss Half damage.
      `,
      tags: ['Compulsion'],
      upgrades: [
        {
          rank: 4,
          short_description: 'Throw to deal $dr5l damage in an area',
          description: `
            The minimum accuracy increases to $consumableaccuracy, and the damage increases to $dr5l.
          `,
        },
      ],
    }),
    createAlchemicalItem({
      name: 'Brainfry',
      rank: 6,
      attunement: 'Unrestricted',
      short_description: 'Throw to deal $dr7l damage to enemies in an area',
      description: `
        You can throw this item as a standard action.
        When you do, make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius within \\shortrange.
        Your minimum accuracy is $consumableaccuracy.
        \\hit $dr7l \\glossterm{subdual damage}.
        \\injury The target is \\briefly \\confused.
        \\miss Half damage.
      `,
      tags: ['Compulsion'],
    }),
    // rank 4 spell would deal dr4.
    createAlchemicalItem({
      name: 'Shockstone',
      rank: 2,
      attunement: 'Unrestricted',
      short_description: 'Throw to deal $dr4l damage and daze',
      description: `
        You can throw this item as a standard action.
        When you do, make an attack vs. Fortitude against something within \\shortrange.
        \\hit $dr4l damage.
        \\injury The target is \\dazed as a \\glossterm{condition}.
      `,
      tags: ['Electricity'],
      upgrades: [
        {
          rank: 4,
          short_description: 'Throw to deal $dr6l damage and daze',
          description: `
            The damage increases $dr6l.
          `,
        },
      ],
    }),
    createAlchemicalItem({
      name: 'Bottled Lightning',
      rank: 6,
      attunement: 'Unrestricted',
      short_description: 'Throw to deal $dr7l damage and daze',
      description: `
        You can throw this item as a standard action.
        When you do, make an attack vs. Fortitude against something within \\shortrange.
        \\hit $dr7l damage.
        \\injury The target is \\dazed as a \\glossterm{condition} and \\briefly \\blinded.
      `,
      tags: ['Electricity'],
    }),
    createAlchemicalItem({
      name: 'Dazing Sphere',
      rank: 0,
      attunement: 'Unrestricted',
      short_description: 'Throw to daze injured creatures',
      description: `
        You can throw this item as a action.
        When you do, make an attack vs. Fortitude against all creatures in a \\smallarea radius within \\shortrange.
        Your minimum accuracy is $consumableaccuracy+2.
        \\hit Each \\glossterm{injured} creature is \\dazed as a \\glossterm{condition}.
      `,
      tags: ['Electricity'],
      upgrades: [
        {
          rank: 5,
          short_description: 'Throw to daze creatures',
          description: `
            The minimum accuracy increases to $consumableaccuracy, and each target does not have to be injured to be dazed.
          `,
        },
      ],
    }),
    createAlchemicalItem({
      name: 'Thunderstone',
      rank: 1,
      attunement: 'Unrestricted',
      short_description: 'Throw to deal $dr2l damage and deafen',
      description: `
        You can throw this item as a standard action.
        When you do, make an attack vs. Fortitude against something within \\shortrange.
        \\hit $dr2l damage.
        \\injury The target is \\deafened as a \\glossterm{condition}.
      `,
      tags: ['Auditory'],
      upgrades: [
        {
          rank: 3,
          short_description: 'Throw to deal $dr5l damage and deafen',
          description: `
            The damage increases to $dr5l, and each target does not have to be injured to be deafened.
          `,
        },
      ],
    }),
    createAlchemicalItem({
      name: 'Avalanchestone',
      rank: 5,
      attunement: 'Unrestricted',
      short_description: 'Throw to deal $dr6l damage and deafen in an area',
      description: `
        You can throw this item as a standard action.
        When you do, make an attack vs. Fortitude against everything in a \\smallarea radius within \\shortrange.
        Your minimum accuracy is $consumableaccuracy.
        \\hit $dr6l damage, and the target is \\deafened as a \\glossterm{condition}.
        \\miss Half damage, and creatures are not deafened.
      `,
      tags: ['Auditory', 'Earth'],
      upgrades: [
        {
          rank: 7,
          short_description: 'Throw to deal $dr8l damage and deafen in an area',
          description: `
            The minimum accuracy increases to $consumableaccuracy, and the damage increases to $dr8l.
          `,
        },
      ],
    }),
    createAlchemicalItem({
      name: 'Snowball',
      rank: 1,
      attunement: 'Unrestricted',
      short_description: 'Throw to slow an injured creature',
      description: `
        You can throw this item as a standard action.
        When you do, make an attack vs. Fortitude against something within \\shortrange.
        \\hit If the target is \\glossterm{injured}, it becomes \\slowed as a \\glossterm{condition}.
      `,
      tags: ['Cold'],
      upgrades: [
        {
          rank: 3,
          short_description: 'Throw to slow an injured creature',
          description: `
            The range increases to \\longrange.
          `,
        },
      ],
    }),
    createAlchemicalItem({
      name: 'Iceball',
      rank: 5,
      attunement: 'Unrestricted',
      short_description: 'Throw to deal $dr8l damage and slow',
      description: `
        You can throw this item as a standard action.
        When you do, make an attack vs. Fortitude against something within \\shortrange.
        \\hit $dr8l damage.
        \\injury The target is \\slowed as a \\glossterm{condition}.
      `,
      tags: ['Cold'],
      upgrades: [
        {
          rank: 7,
          short_description: 'Throw to deal $dr9l damage and slow',
          description: `
            The range increases to \\medrange, and the damage increases to $dr9l.
          `,
        },
      ],
    }),
    createAlchemicalItem({
      name: 'Tanglefoot Bag',
      rank: 0,
      attunement: 'Unrestricted',
      short_description: 'Briefly slows a foe',
      description: `
        You can throw this item as a standard action.
        When you do, make an attack vs. Reflex against one Large or smaller creature within \\shortrange.
        \\hit The target is \\glossterm{briefly} \\slowed.
        This effect is immediately removed if the target takes damage from a \\atAcid or \\atFire ability.
      `,
      upgrades: [
        {
          rank: 2,
          short_description: 'Briefly slows in an area',
          description: `
            The attack affects each Large or smaller creature in a \\smallarea radius within \\shortrange.
          `,
        },
      ],
    }),
  ];
}
