import { MysticSphere } from '.';

export const verdamancy: MysticSphere = {
  name: 'Verdamancy',
  shortDescription: 'Animate and manipulate plants.',
  sources: ['domain', 'nature'],
  // Adding brief light undergrowth adds +2 ranks to a reasonably sized area.
  // Target's space + adjacent spaces is only +1 rank.

  cantrips: [
    {
      name: 'Fertile Patch',

      effect: `
        Choose one \\glossterm{unattended}, nonmagical 1-ft.\\ square of earth.
        The soil in the target becomes suffused with plant-sustaining nutrients, making it fertile ground for plants.
        This effect lasts for one year.
      `,
      scaling: {
        2: 'You can choose to affect a 2-ft. square instead.',
        4: 'You can choose to affect a 5-ft. square instead.',
        6: 'You can choose to affect a 10-ft. square instead.',
      },
    },

    {
      name: 'Rapid Growth',

      effect: `
        Choose one Larger or smaller inanimate, \\glossterm{unattended} plant within \\shortrange.
        In addition, choose any number of days up to a week.
        The target grows as if much time had passed, assuming that it received adequate nutrition during that time.
        When this spell ends, the plant returns to its original state.
      `,
      scaling: {
        2: `You can choose up to a month of time to grow.`,
        4: `You can choose up to three months of time to grow.`,
        6: `You can choose up to a year of time to grow.`,
      },
      type: 'Sustain (minor)',
    },
  ],
  spells: [
    {
      name: 'Entangling Plants',

      attack: {
        crit: `The condition persists even if the target stops being in undergrowth.`,
        hit: `
          The target is \\slowed as a \\glossterm{condition}.
          The condition is removed if the target stops being in undergrowth. 
        `,
        targeting: `
          Make an attack vs. Reflex against one Large or smaller creature within \\medrange that is in \\glossterm{undergrowth}.
        `,
      },
      narrative: `
        Plants twist and writhe to trap your foe.
      `,
      rank: 1,
      scaling: 'accuracy',
      tags: [],
    },
    {
      name: 'Entangle',

      attack: {
        crit: `The target also cannot move farther than 10 feet from its original location until it ends the effect.`,
        hit: `The target is \\slowed as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Reflex against one Large or smaller creature within \\medrange that is on a stable surface.
          You gain a +2 accuracy bonus if the target is in \\glossterm{undergrowth}.
        `,
      },
      narrative: `
        Plants grow from nowhere to trap your foe.
      `,
      rank: 5,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Vine Whip',

      attack: {
        hit: `
          The target takes \\damagerankone{bludgeoning}.
          If the target takes damage and your attack result beats its Fortitude defense, you can \\glossterm{push} it up to 15 feet.
        `,
        targeting: `
          Make an attack vs. Armor against one creature within \\shortrange.
          You gain a +2 accuracy bonus if the target is in \\glossterm{undergrowth}.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Intense Vine Whip',

      // +2r for longer push, +2r for more damage
      attack: {
        hit: `
          The target takes \\damagerankfour{bludgeoning}.
          If the target takes damage, you can \\glossterm{push} it up to 30 feet.
        `,
        targeting: `
          Make an attack vs. Armor against one creature within \\medrange.
          You gain a +2 accuracy bonus if the target is in \\glossterm{undergrowth}.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Vinestorm',

      attack: {
        // d1l for undergrowth?
        hit: `
          Each target takes \\damagerankonelow{bludgeoning}.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor against all \\glossterm{enemies} within a \\smallarea radius from you.
          You gain a +2 accuracy bonus against each target in \\glossterm{undergrowth}.
          After you attack, \\glossterm{light undergrowth} \\glossterm{briefly} fills the area.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Mighty Vinestorm',

      attack: {
        hit: `
          Each target takes \\damagerankfive{bludgeoning}.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor against all \\glossterm{enemies} within a \\smallarea radius from you.
          You gain a +2 accuracy bonus against each target in \\glossterm{undergrowth}.
          After you attack, \\glossterm{light undergrowth} \\glossterm{briefly} fills the area.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Massive Vinestorm',

      attack: {
        hit: `Each target takes \\damagerankthreelow{bludgeoning}.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor against all \\glossterm{enemies} within a \\largearea radius from you.
          You gain a +2 accuracy bonus against each target in \\glossterm{undergrowth}.
          After you attack, \\glossterm{light undergrowth} \\glossterm{briefly} fills the area.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Vine Tentacle',

      effect: `
        You gain a slam \\glossterm{natural weapon} (see \\tref{Natural Weapons}).
        The natural weapon deals 1d10 damage, as normal for a slam natural weapon.
        In addition, it has the Long \\glossterm{weapon tag} (see \\pcref{Weapon Tags}).
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with strikes using the weapon (see \\pcref{Power}).
      `,
      rank: 2,
      narrative: `
        You grow a massive vine tentacle from your body.
      `,
      tags: ['Manifestation'],
      type: 'Attune',
    },

    {
      name: 'Forceful Vine Tentacle',

      functionsLike: {
        name: 'vine tentacle',
        exceptThat: 'the tentacle also has the Forceful weapon tag (see \\pcref{Weapon Tags}).',
      },
      rank: 5,
      narrative: `
        You grow a massive vine tentacle from your body.
      `,
      tags: ['Manifestation'],
      type: 'Attune',
    },

    {
      name: 'Poison -- Nitharit',

      effect: `
        Choose one living creature within \\medrange.
        It becomes \\glossterm{poisoned} by nitharit (see \\pcref{Poison}).
        The stage 1 effect makes the target \\dazed while the poison lasts.
        The stage 3 effect makes the target \\stunned while the poison lasts.
      `,
      rank: 1,
      scaling: 'poison',
      tags: ['Manifestation'],
    },

    {
      name: 'Poison -- Sassone Leaf',

      effect: `
        Choose one living creature within \\medrange.
        It becomes \\glossterm{poisoned} by sassone leaf (see \\pcref{Poison}).
        The poison inflicts 1d6 damage per \\glossterm{poison stage}.
        The stage 3 effect also ends the poison.
      `,
      rank: 1,
      scaling: 'poison',
      tags: ['Manifestation'],
    },

    {
      name: 'Poison -- Arsenic',

      effect: `
        Choose one living creature within \\medrange.
        It becomes \\glossterm{poisoned} by arsenic (see \\pcref{Poison}).
        The poison inflicts 2d6 damage per \\glossterm{poison stage}.
        The stage 3 effect also ends the poison.
      `,
      rank: 3,
      scaling: 'poison',
      tags: ['Manifestation'],
    },

    {
      name: 'Poison -- Black Lotus',

      effect: `
        Choose one living creature within \\medrange.
        It becomes \\glossterm{poisoned} by black lotus extract (see \\pcref{Poison}).
        The poison inflicts 4d8 damage per \\glossterm{poison stage}.
      `,
      rank: 6,
      scaling: 'poison',
      tags: ['Manifestation'],
    },

    {
      name: 'Herbal Antidote',

      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The target gains an additional success to resist a poison currently affecting it (see \\pcref{Poison}).
      `,
      rank: 1,
      scaling: {
        3: `The number of additional successes increases to two.
            The target can split these successes among any number of different poisons affecting it.`,
        5: `The number of additional successes increases to three.`,
        7: `The number of additional successes increases to four.`,
      },
    },

    {
      name: 'Barkskin',

      effect: `
        You gain a +4 \\glossterm{magic bonus} to \\glossterm{damage resistance}.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +8.`,
        5: `The bonus increases to +16.`,
        7: `The bonus increases to +32.`,
      },
      type: 'Attune',
    },

    {
      name: 'Mass Barkskin',

      functionsLike: {
        mass: true,
        name: 'Barkskin',
      },
      // narrative: '',
      rank: 3,
      scaling: {
        5: `The bonus increases to +8.`,
        7: `The bonus increases to +16.`,
      },
      type: 'Attune (target)',
    },

    {
      name: 'Embedded Growth',

      attack: {
        // Medicine removal is harder than fire, but light undergrowth is a buff - use d1?
        hit: `
          The target begins growing painful plants inside its body as a \\glossterm{condition}.
          It takes \\damagerankonelow{piercing} immediately and during each of your subsequent actions.
          Whenever it takes damage from the growth, \\glossterm{light undergrowth} \\glossterm{briefly} fills a \\smallarea radius around it.

          The condition can be removed with the \\textit{treat condition} ability from the Medicine skill (see \\pcref{Medicine}).
          The \\glossterm{difficulty value} of the check is equal to 5.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
        `,
      },
      narrative: `
        You throw a seed that embeds itself in a foe and grows painfully.
      `,
      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Intense Embedded Growth',

      functionsLike: {
        name: 'embedded growth',
        exceptThat: 'the DV of the Medicine check increases to 15, and the damage increases to \\damagerankfourlow{piercing}.',
      },
      narrative: `
        You throw a seed that embeds itself in a foe and grows painfully.
      `,
      rank: 6,
      scaling: 'accuracy',
    },

    {
      name: 'Fire Seeds',

      // d2l instead of d2 because this lets party members throw fireballs?
      attack: {
        hit: `Each target takes \\damageranktwolow{fire}.`,
        missGlance: true,
        targeting: `
          % Does "seed structure" make sense?
          You transform up to three \\glossterm{unattended} acorns or similar seed structures you touch into small bombs.
          As a standard action, you or another creature can throw the acorn up to 30 feet.
          % More accurate version: the acorn has a range increment of 10 feet to hit its target, but that accuracy roll is completely independent of the explosion.
          % Doesn't seem worth the complexity, and implicitly gives the fire seed surprisingly long range since objects are easy to hit.
          On impact, the acorn detonates, and you make an attack vs. Reflex against everything within a \\smallarea radius of the struck creature or object.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Mighty Fire Seeds',

      functionsLike: {
        name: 'fire seeds',
        exceptThat: 'the damage increases to \\damagerankfivelow{fire}.',
      },
      rank: 7,
      scaling: 'accuracy',
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Wall of Thorns',

      attack: {
        hit: `The target takes \\damagerankone{piercing}.`,
        targeting: `
          You create a \\medarealong \\glossterm{wall} of thorns within \\medrange.
          The base of at least half of the wall must be in arable earth.
          The wall is four inches thick, but permeable.
          It provides \\glossterm{cover} to attacks made through the wall, but does not fully block sight.
          A field of \\glossterm{light undergrowth} spreads on the ground in all squares adjacent to the wall.

          Creatures can pass through the wall, though it costs five extra feet of movement to move through the wall.
          Whenever anything passes through the wall, make a \\glossterm{reactive attack} vs. Armor against it.
          You can only make this attack against a given target once per \\glossterm{phase}.

          The wall has \\glossterm{hit points} equal to three times your \\glossterm{power}.
          After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
        `,
      },

      rank: 2,
      scaling: 'accuracy',
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Massive Wall of Thorns',

      functionsLike: {
        name: 'wall of thorns',
        exceptThat: `
          the damage increases to \\damagerankfour{piercing}.
          In addition, the area increases to a \\largearealong \\glossterm{wall}, and the range increases to \\longrange.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Plant Growth',

      effect: `
        Choose a \\smallarea radius \\glossterm{zone} within \\longrange.
        In addition, choose whether you want plants within the area to grow or diminish.

        If you choose for plants to grow, all earth and unworked stone within the area becomes overrun with \\glossterm{light undergrowth}.
        Light undergrowth within the area is increased in density to \\glossterm{heavy undergrowth}.
        If you choose for plants to diminish, all \\glossterm{heavy undergrowth} in the area is reduced to \\glossterm{light undergrowth}, and all \\glossterm{light undergrowth} is removed.

        When this spell's duration ends, the plants return to their original size.
      `,
      rank: 2,
      scaling: {
        4: 'You can choose to affect a \\medarea radius instead.',
        6: 'You can choose to affect a \\largearea radius instead.',
      },
      tags: ['Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Blight',

      // d2l instead of d2 for all the weird stuff
      attack: {
        hit: `
          The target takes \\damageranktwolow{physical} immediately, and again during your next action.
          Whenever it takes damage this way, its \\glossterm{space} and all squares adjacent to it \\glossterm{briefly} lose all \\glossterm{undergrowth}.
          This damage is doubled if the target is a plant, including plant creatures.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature or plant within \\shortrange.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Blight',

      functionsLike: {
        name: 'blight',
        exceptThat: 'the damage increases to \\damagerankfivelow{physical}.',
      },
      rank: 7,
      scaling: 'accuracy',
    },

    {
      name: 'Shillelagh',

      effect: `
        Choose one nonmagical, \\glossterm{unattended} stick of wood you touch.
        You transform the target into a club, quarterstaff, or sap, as you choose (see \\pcref{Weapons}).
        You cannot change the target's size by more than one size category.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the weapon (see \\pcref{Power}).
      `,
      rank: 1,
      type: 'Attune',
    },

    {
      name: 'Survivalist',

      effect: `
        If you have Survival as a \\glossterm{trained skill}, you gain a +3 \\glossterm{magic bonus} to it.
        Otherwise, you are treated as being trained in that skill.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +4.`,
        5: `The bonus increases to +5.`,
        7: `The bonus increases to +6.`,
      },
      type: 'Attune',
    },

    {
      name: 'Flourishing Grass',

      effect: `
        At the end of each round, you may choose to cause grass to extend out onto the ground in a \\smallarea radius around you.
        When you do, that area becomes covered in \\glossterm{light undergrowth}.
        Whenever your location changes by any means, the grass retreats back to your body.
      `,
      narrative: `
        Long, thin grass continuously grows and writhes on your body.
        You can extend the grass to surround you at a whim.
      `,
      rank: 1,
      scaling: {
        3: 'When you cast this spell, you can choose to affect a \\medarea radius instead.',
        5: 'When you cast this spell, you can choose to affect a \\largearea radius instead.',
        7: 'When you cast this spell, you can choose to affect a \\hugearea radius instead.',
      },
      tags: ['Manifestation'],
      type: 'Attune',
    },

    {
      name: 'Intense Flourishing Grass',

      functionsLike: {
        name: 'Flourishing Grass',
        exceptThat: `
          the area becomes \\glossterm{heavy undergrowth} instead of light undergrowth.
          Since the grass retreats whenever you move, it does not impede your movement, though it does impede the movement of any other creatures that move simultaneously.
        `,
      },
      narrative: `
        A great mass of long, thin grass continuously grows and writhes on your body.
        You can extend the grass to surround you at a whim.
      `,
      rank: 6,
      tags: ['Manifestation'],
      type: 'Attune',
    },

    {
      name: 'Verdant Armor',

      effect: `
        When you cast this spell, you choose a type of body armor you are proficient with that is not normally made from metal.
        Plants grow around your body, functioning like your chosen type of armor for you, except that the \\glossterm{encumbrance} of the armor is reduced by 2.
        These plants are considered to be normal plants for the purpose of abilities that require plants to be near targets, such as spells from this mystic sphere.
        This spell has no effect if you are wearing other body armor.
      `,
      rank: 1,
      scaling: {
        3: `You also gain a +4 \\glossterm{magic bonus} to \\glossterm{damage resistance}.`,
        5: `The damage resistance bonus increases to +8.`,
        7: `The damage resistance bonus increases to +16.`,
      },
      tags: ['Manifestation'],
      type: 'Attune',
    },
  ],
  rituals: [
    {
      name: 'Fertility',

      castingTime: '24 hours',
      effect: `
        This ritual creates an area of bountiful growth in a one mile radius \\glossterm{zone} from your location.
        Normal plants within the area become twice as productive as normal for the next year.
        This ritual does not stack with itself.
        If the \\ritual{infertility} ritual is also applied to the same area, the most recently performed ritual takes precedence.
        `,

      rank: 3,
    },

    {
      name: 'Infertility',

      castingTime: '24 hours',
      effect: `
        This ritual creates an area of death and decay in a one mile radius \\glossterm{zone} from your location.
        Normal plants within the area become half as productive as normal for the next year.
        This ritual does not stack with itself.
        If the \\ritual{fertility} ritual is also applied to the same area, the most recently performed ritual takes precedence.
      `,
      rank: 3,
    },

    {
      name: 'Lifeweb Transit',

      castingTime: '24 hours',
      effect: `
        Choose up to six Medium or smaller ritual participants.
        In addition, choose a living plant that all ritual participants touch during the ritual.
        The plant must be at least one size category larger than the largest chosen ritual participant.
        In addition, choose a destination up to 100 miles away from you on your current plane.
        By walking through the chosen plant, each target is teleported to the closest plant to the destination that is at least one size category larger than the largest chosen ritual participant.

        You can specify the destination by naming an \\glossterm{astral beacon}.
        Alternately, you must specify the destination with a precise mental image of its appearance.
        The image does not have to be perfect, but it must unambiguously identify the destination.
        If you specify its appearance incorrectly, or if the area has changed its appearance, the destination may be a different area than you intended.
        The new destination will be one that more closely resembles your mental image.
        If no such area exists, the ritual simply fails.
      `,
      rank: 4,
    },
  ],
};
