import { MysticSphere } from '.';
import { BARRIER_COOLDOWN, CONDITION_CRIT, MULTIHIT_CRIT } from './constants';

export const verdamancy: MysticSphere = {
  name: 'Verdamancy',
  shortDescription: 'Animate and manipulate plants.',
  sources: ['domain', 'nature'],
  specialRules: `
    Some spells from this mystic sphere can create undergrowth.
    The spellcaster can customize the appearance of the undergrowth in minor ways, but it is always composed of living plants.
    % Adding brief light undergrowth adds +2 area tiers to a reasonably sized area.
    % Target's space + adjacent spaces is only +1 rank.
  `,

  cantrips: [
    {
      name: 'Bramblepatch',

      effect: `
        Choose one \\glossterm{unattended}, nonmagical 5-ft.\\ square of earth within \\medrange.
        Brambles and similar small plants grow in the area, making it \\glossterm{light undergrowth}.
        If it was already light undergrowth, it becomes \\glossterm{heavy undergrowth} instead.
      `,
      scaling: {
        2: `The area increases to a \\tinyarea radius.`,
        4: `The area increases to a \\smallarea radius.`,
        6: `The area increases to a \\medarea radius.`,
      },
      type: 'Sustain (minor)',
      tags: ['Manifestation'],
    },
  ],
  spells: [
    {
      name: 'Entangle',

      // -2r for removal mechanic
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\slowed as a \\glossterm{condition}.
          This condition can be removed if the target makes a \\glossterm{difficulty value} 8 Strength check as a \\glossterm{move action} to break the plants.
          If the target makes this check as a standard action, it gains a +5 bonus.
          In addition, this condition is removed if the target takes damage from a \\atFire ability.
        `,
        targeting: `
          Make an attack vs. Brawn against one Large or smaller \\glossterm{grounded} creature within \\medrange.
          You gain a +2 accuracy bonus if the target is in \\glossterm{undergrowth}.
        `,
      },
      narrative: `
        Plants grow from nowhere to trap your foe.
      `,
      rank: 3,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Mass Entangle',

      functionsLike: {
        name: 'entangle',
        exceptThat: 'it affects all creatures in a \\medarea radius within \\medrange.',
      },
      narrative: `
        Plants grow from nowhere to trap your foe.
      `,
      rank: 5,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Tripping Vine',

      // Prone is a r1 debuff, like dazzled.
      // Short range allows brief undergrowth.
      attack: {
        hit: `
          The target falls \\glossterm{prone}.
        `,
        targeting: `
          Make an attack vs. Brawn against one creature within \\shortrange.
          You gain a +2 accuracy bonus if the target is in \\glossterm{undergrowth}.
          After you attack, \\glossterm{light undergrowth} \\glossterm{briefly} fills the target's space and all adjacent spaces.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Vinestorm',

      // +1 area tier for undergrowth
      attack: {
        hit: `
          \\damagerankone.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor against all creatures within a \\smallarea radius from you.
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

      // with +1t from undergrowth, t3 area
      attack: {
        hit: `
          \\damagerankfive.
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

      // with +2t from undergrowth, t5 area
      attack: {
        hit: `\\damagerankthree.`,
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

      // +1 over normal weapon
      effect: `
        A long, slender vine grows around your body.
        You can use it as a \\glossterm{natural weapon}, though it does not require a \\glossterm{free hand} to use.
        The weapon deals 1d6 bludgeoning damage and has the \\weapontag{Light} and \\weapontag{Long} weapon tags (see \\pcref{Weapon Tags}).
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine its damage with strikes using the weapon (see \\pcref{Power}).

        You can attune to this spell multiple times.
        Each time, you gain an additional vine tentacle, which can allow you to make \\glossterm{dual strikes} using your vine tentacles.
      `,
      rank: 1,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Attune',
    },

    {
      name: 'Mass Vine Tentacle',

      functionsLike: {
        name: 'vine tentacle',
        exceptThat: `
          it affects up to five creatures of your choice from among yourself and your allies within \\medrange.
          Each target uses the higher of your \\glossterm{magical power} and its own \\glossterm{mundane power} to determine its damage with strikes using the weapon.
        `,
      },
      rank: 4,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Attune (target)',
    },

    {
      name: 'Mighty Vine Tentacle',

      functionsLike: {
        name: 'vine tentacle',
        exceptThat: 'the damage dealt by the weapon increases to 1d10.',
      },
      rank: 6,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Attune',
    },

    {
      name: 'Braided Vine Tentacle',

      // +2 over normal
      effect: `
        You gain a vine \\glossterm{natural weapon} that replaces one of your \\glossterm{free hands}.
        The weapon deals 1d10 bludgeoning damage and has the \\weapontag{Maneuverable} and \\weapontag{Sweeping} (1) weapon tags (see \\pcref{Weapon Tags}).
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with strikes using the weapon (see \\pcref{Power}).
      `,
      rank: 2,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Attune',
    },

    {
      name: 'Mass Braided Vine Tentacle',

      functionsLike: {
        name: 'braided vine tentacle',
        exceptThat: `
          it affects up to five creatures of your choice from among yourself and your allies within \\medrange.
          Each target uses the higher of your \\glossterm{magical power} and its own \\glossterm{mundane power} to determine its damage with strikes using the weapon.
        `,
      },
      rank: 5,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Attune (target)',
    },

    {
      name: 'Poison -- Nitharit',

      effect: `
        Choose one living creature you \\glossterm{touch}.
        It becomes \\glossterm{poisoned} by nitharit (see \\pcref{Poison}).
        The poison's stage 1 effect makes the target \stunned while the poison lasts.
      `,
      rank: 4,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Erupting Spikefruit',

      // -1dr from undergrowth effect
      attack: {
        hit: `
          \\damageranktwo.
        `,
        missGlance: true,
        targeting: `
          You create a patch of growing fruit in a \\smallarea radius \\glossterm{zone} within \\shortrange.
          The patch becomes \\glossterm{light undergrowth} if there was no undergrowth there, and any existing light undergrowth becomes \\glossterm{heavy undergrowth}.
          During your next action, the fruits explode, and you make a \\glossterm{reactive attack} vs. Armor against all creatures in the area.
          When the fruits explode, the undergrowth disappears.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Massive Erupting Spikefruit',

      // -1dr from undergrowth effect
      functionsLike: {
        name: 'erupting spikefruit',
        exceptThat:
          'the damage increases to \\damagerankfive, and the area increases to a \\medarea radius within \\longrange.',
      },
      rank: 5,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Poison -- Nightshade',

      effect: `
        Choose one living creature you \\glossterm{touch}.
        It becomes \\glossterm{poisoned} by nightshade (see \\pcref{Poison}).
        The poison inflicts \\damageranktwolow per \\glossterm{poison stage}.
        The stage 3 effect also ends the poison.
      `,
      rank: 2,
      scaling: 'accuracy',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Sassone Leaf',

      effect: `
        Choose one living creature you \\glossterm{touch}.
        It becomes \\glossterm{poisoned} by sassone leaf (see \\pcref{Poison}).
        The poison inflicts \\damagerankthreelow per \\glossterm{poison stage}.
        The stage 3 effect also ends the poison.
      `,
      rank: 3,
      scaling: 'accuracy',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Arsenic',

      effect: `
        Choose one living creature you \\glossterm{touch}.
        It becomes \\glossterm{poisoned} by arsenic (see \\pcref{Poison}).
        The poison inflicts \\damagerankfourlow per \\glossterm{poison stage}.
        The stage 3 effect also ends the poison.
      `,
      rank: 4,
      scaling: 'accuracy',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Black Lotus',

      effect: `
        Choose one living creature you \\glossterm{touch}.
        It becomes \\glossterm{poisoned} by black lotus extract (see \\pcref{Poison}).
        The poison inflicts \\damagerankfivelow per \\glossterm{poison stage}.
      `,
      rank: 6,
      scaling: 'accuracy',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Bloodroot',

      effect: `
        Choose one living creature you \\glossterm{touch}.
        It becomes \\glossterm{poisoned} by sassone leaf (see \\pcref{Poison}).
        You gain a +1 accuracy bonus with the poison.
        The poison's stage 1 effect makes the target \slowed while the poison lasts.
      `,
      rank: 5,
      scaling: 'accuracy',
      tags: ['Manifestation', 'Poison'],
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
        You gain a +4 \\glossterm{enhancement bonus} to your maximum \\glossterm{hit points}.
      `,
      rank: 1,
      roles: ['attune'],
      scaling: {
        3: `The bonus increases to +8.`,
        5: `The bonus increases to +16.`,
        7: `The bonus increases to +32.`,
      },
      type: 'Attune',
    },

    {
      name: 'Embedded Growth',

      // +1r for light undergrowth
      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankone damage immediately, and again during your next action.
          Whenever it takes damage in this way, \\glossterm{light undergrowth} \\glossterm{briefly} fills its space and all adjacent spaces.
        `,
        targeting: `
          Make an attack vs. Reflex and Fortitude against one creature within \\shortrange.
        `,
      },
      narrative: `
        You throw a seed that embeds itself in a foe and grows painfully.
      `,
      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Embedded Growth',

      functionsLike: {
        name: 'embedded growth',
        exceptThat: 'the damage increases to \\damagerankfour.',
      },
      narrative: `
        You throw a seed that embeds itself in a foe and grows painfully.
      `,
      rank: 4,
      scaling: 'accuracy',
    },

    {
      name: 'Fire Seeds',

      // +1r for sharing
      attack: {
        hit: `\\damagerankone.`,
        missGlance: true,
        targeting: `
          % Does "seed structure" make sense?
          You transform up to three \\glossterm{unattended} acorns or similar seed structures you \\glossterm{touch} into small bombs.
          As a standard action, you or another creature can throw the acorn up to 30 feet.
          % More accurate version: the acorn has a range increment of 10 feet to hit its target, but that accuracy roll is completely independent of the explosion.
          % Doesn't seem worth the complexity, and implicitly gives the fire seed surprisingly long range since objects are easy to hit.
          When thrown individually in this way, the acorn detonates, and you make an attack vs. Reflex against everything within a \\smallarea radius of the struck creature or object.
          If the acorn is destroyed in any other way, it has no effect.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
      tags: ['Fire'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Fire Seed Swarm',

      functionsLike: {
        name: 'fire seeds',
        exceptThat:
          'the damage increases to \\damagerankthree. In addition, you can create up to six seeds at once instead of only three.',
      },
      rank: 5,
      scaling: 'accuracy',
      tags: ['Fire'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Mighty Fire Seeds',

      functionsLike: {
        name: 'fire seeds',
        exceptThat: 'the damage increases to \\damagerankfive.',
      },
      rank: 6,
      scaling: 'accuracy',
      tags: ['Fire'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Wall of Thorns',

      cost: BARRIER_COOLDOWN,
      attack: {
        hit: `\\damagerankone.`,
        targeting: `
          You create a \\medarealong \\glossterm{wall} of thorns within \\medrange.
          The base of at least half of the wall must be in arable earth.
          The wall is four inches thick, but permeable.
          It provides \\glossterm{cover} to attacks made through the wall, but does not fully block sight.
          It has \\glossterm{hit points} equal to three times your \\glossterm{power}, and is destroyed when its hit points become negative.
          A field of \\glossterm{light undergrowth} spreads on the ground in all squares adjacent to the wall.

          Creatures can pass through the wall, though it costs five extra feet of movement to move through the wall.
          Whenever anything passes through the wall, make a \\glossterm{reactive attack} vs. Armor against it.
          You can only make this attack against a given target once per \\glossterm{phase}.

        `,
        missGlance: true,
      },

      rank: 1,
      scaling: 'accuracy',
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Massive Wall of Thorns',

      cost: BARRIER_COOLDOWN,
      functionsLike: {
        name: 'wall of thorns',
        exceptThat: `
          the damage increases to \\damagerankfour.
          In addition, the area increases to a \\largearealong \\glossterm{wall}, and the range increases to \\longrange.
        `,
      },
      rank: 4,
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

      // Short range instead of med range for the two weird effects
      attack: {
        hit: '\\damagerankone.',
        targeting: `
          Make an attack vs. Fortitude against one living creature or plant within \\shortrange.
          If the target is a plant, including plant creatures, you gain a \\plus10 accuracy bonus with this attack.
          In addition, you create a \\medarea radius \\glossterm{zone} around the target that persists \\glossterm{briefly}.
          All \\glossterm{undergrowth} in that area shrivels away into the ground, reemerging when the effect ends.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Blight',

      functionsLike: {
        name: 'blight',
        exceptThat: 'the damage increases to \\damagerankfive.',
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Shillelagh',

      castingTime: 'minor action',
      effect: `
        Choose one nonmagical, \\glossterm{unattended} stick of wood you \\glossterm{touch}.
        You transform the target into a club, quarterstaff, or sap, as you choose (see \\pcref{Weapons}).
        You cannot change the target's size by more than one size category.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the weapon (see \\pcref{Power}).
      `,
      rank: 1,
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Survivalist',

      effect: `
        If you have Survival as a \\glossterm{trained skill}, you gain a +3 \\glossterm{enhancement bonus} to it.
        Otherwise, you are treated as being trained in that skill.
      `,
      rank: 1,
      roles: ['attune'],
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
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Attune',
    },

    {
      name: 'Massive Flourishing Grass',

      functionsLike: {
        name: 'flourishing grass',
        exceptThat: 'the area of undergrowth increases to a \\largearea radius.',
      },
      narrative: `
        Long, thin grass continuously grows and writhes on your body.
        You can extend the grass to surround you at a whim.
      `,
      rank: 5,
      roles: ['attune'],
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
      rank: 7,
      roles: ['attune'],
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
      roles: ['attune'],
      scaling: {
        2: `
          The armor can be created from any special material other than dragonhide (see \\pcref{Armor Special Materials}).
          Its rank cannot exceed your spellcasting rank with this spell.
        `,
      },
      tags: ['Manifestation'],
      type: 'Attune',
    },
    {
      name: 'Treeseal',

      // Basically "stop existing", so t2.5? Should probably be t3, add immunity
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          A Huge grove of trees grows around the target, trapping it inside the wood as a \\glossterm{condition}.
          While it is trapped in the trees, it is \\paralyzed and does not have \\glossterm{line of sight} or \\glossterm{line of effect} to any creature other than itself.

          The grove has \\glossterm{hit points} equal to five times your \\glossterm{power}, all of its defenses are 5, and it is destroyed when its hit points become negative.
          If the grove is destroyed, this condition ends.
          Special movement abilities such as teleportation can also remove the target from the trees, ending this effect.
          Once this condition ends, the target becomes \\glossterm{immune} to it until it takes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Fortitude against one Large or smaller \\glossterm{grounded} creature within \\medrange.
        `,
      },
      rank: 7,
    },
  ],
};
