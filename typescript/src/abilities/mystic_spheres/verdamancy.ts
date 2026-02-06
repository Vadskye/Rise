import { MysticSphere } from '.';
import { BARRIER_COOLDOWN, CONDITION_CRIT, MULTIHIT_CRIT, POISON_CRIT } from '../constants';

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
        Choose one \\glossterm{unattended}, nonmagical \\tinyarea radius \\glossterm{zone} of earth within \\medrange.
        Brambles and similar small plants grow in the area, making it \\glossterm{light undergrowth}.
        If it was already light undergrowth, it becomes \\glossterm{heavy undergrowth} instead.
      `,
      roles: ['hazard'],
      type: 'Sustain (attunable, minor)',
      tags: ['Manifestation'],
    },
  ],
  spells: [
    {
      name: 'Entangle',

      // Ranged slow is 2.1 EA, or r5, or r4 with limited scope.
      attack: {
        hit: `
          The target is \\glossterm{briefly} \\slowed.
        `,
        targeting: `
          Make an attack vs. Brawn against up to two \\glossterm{grounded} creatures within \\medrange.
          You gain a +2 accuracy bonus against each target that is in \\glossterm{undergrowth}.
        `,
      },
      narrative: `
        Plants grow from nowhere to trap your foe.
      `,
      rank: 4,
      roles: ['trip'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Entangling Field',

      // Ranged slow is 5.2 EA, or 2.6 EA with move action removal. That's r7, or r6 with
      // limited scope.
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\slowed as a \\glossterm{condition}.
          This condition can be removed if the target makes a \\glossterm{difficulty value} 8 Strength check as a \\glossterm{move action} to break the plants.
          If the target makes this check as a standard action, it gains a +5 bonus.
          In addition, this condition is removed if the target takes damage from a \\atFire ability.
        `,
        targeting: `
          Make an attack vs. Brawn against each \\glossterm{grounded} creature in a \\smallarea radius within \\shortrange.
          You gain a +2 accuracy bonus against each target that is in \\glossterm{undergrowth}.
        `,
      },
      roles: ['softener'],
      narrative: `
        Plants grow from nowhere to trap your foe.
      `,
      rank: 6,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Tripping Vine',

      // Brief ranged slow is 1.6 EA. Short range both drops the rank and makes it less
      // ranged, so call it 1.4 EA, which is r0 with short range. That allows the
      // undergrowth.
      attack: {
        hit: `
          The target falls \\prone.
        `,
        targeting: `
          Make an attack vs. Brawn against one \\glossterm{grounded} creature within \\shortrange.
          You gain a +2 accuracy bonus if the target is in \\glossterm{undergrowth}.
          After you attack, \\glossterm{light undergrowth} \\glossterm{briefly} fills the target's space and all adjacent spaces.
        `,
      },
      rank: 1,
      roles: ['trip'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Tripping Vine Slam',

      // 2.4 EA for damage, so r6.
      attack: {
        hit: `
          \\damageranksix, and the target falls \\prone.
        `,
        targeting: `
          Make an attack vs. Brawn against one \\glossterm{grounded} creature within \\shortrange.
          You gain a +2 accuracy bonus if the target is in \\glossterm{undergrowth}.
          After you attack, \\glossterm{light undergrowth} \\glossterm{briefly} fills the target's space and all adjacent spaces.
        `,
      },
      rank: 6,
      roles: ['trip'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },

    {
      name: 'Vinestorm',

      attack: {
        hit: `
          \\damagerankone.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor against all creatures within a \\smallarea radius from you.
          You gain a +2 accuracy bonus against each target that is in \\glossterm{undergrowth}.
        `,
      },
      rank: 1,
      roles: ['clear'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },

    {
      name: 'Mighty Vinestorm',

      attack: {
        hit: `
          \\damagerankfour.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor against all creatures within a \\smallarea radius from you.
          You gain a +2 accuracy bonus against each target that is in \\glossterm{undergrowth}.
        `,
      },
      roles: ['clear'],
      rank: 4,
      scaling: 'damage',
      tags: ['Manifestation'],
    },

    {
      name: 'Massive Vinestorm',

      attack: {
        hit: `
          \\damageranksix.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor against all \\glossterm{enemies} within a \\medarea radius from you.
          You gain a +2 accuracy bonus against each target that is in \\glossterm{undergrowth}.
        `,
      },
      roles: ['clear'],
      rank: 7,
      scaling: 'damage',
      tags: ['Manifestation'],
    },

    {
      name: 'Vine Tentacle',

      // +1 over normal weapon
      effect: `
        A long, slender vine grows around your body.
        You can use it as a \\glossterm{natural weapon}, though it does not require a \\glossterm{free hand} to use.
        The weapon deals 1d6 bludgeoning damage and has the \\weapontag{Light} and \\weapontag{Long} weapon tags (see \\pcref{Weapon Tags}).

        You can attune to this spell multiple times.
        Each time, you gain an additional vine tentacle, which can allow you to make \\glossterm{dual strikes} using your vine tentacles.
      `,
      rank: 1,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Attune',
    },

    {
      name: 'Mighty Vine Tentacle',

      functionsLike: {
        name: 'vine tentacle',
        exceptThat: 'the damage dealt by the weapon increases to 1d10.',
      },
      rank: 5,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Attune',
    },

    // Touch range is drX+2, then drX for damage over time.
    {
      name: 'Poison -- Snakeroot',

      attack: {
        crit: POISON_CRIT,
        hit: `
          The target becomes \\glossterm{poisoned} by snakeroot (see \\pcref{Poison}).
          The poison's accuracy is equal to your accuracy with this spell.
          It deals \\damagerankonelow immediately and with each escalation.
          The second escalation also ends the poison.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature you \\glossterm{touch}.
        `,
      },
      rank: 1,
      roles: ['burn'],
      scaling: 'damage',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Wolfsbane',

      attack: {
        crit: POISON_CRIT,
        hit: `
          The target becomes \\glossterm{poisoned} by wolfsbane (see \\pcref{Poison}).
          The poison's accuracy is equal to your accuracy with this spell.
          It deals \\damagerankonelow immediately and with each escalation.
          The second escalation also ends the poison.
        `,
        targeting: `
          Make an attack vs. Fortitude with a \\plus4 accuracy bonus against one living creature you \\glossterm{touch}.
        `,
      },
      rank: 2,
      roles: ['burn'],
      scaling: 'damage',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Nightshade',

      attack: {
        crit: POISON_CRIT,
        hit: `
          The target becomes \\glossterm{poisoned} by nightshade (see \\pcref{Poison}).
          The poison's accuracy is equal to your accuracy with this spell.
          It deals \\damagerankfourlow immediately and with each escalation.
          The second escalation also ends the poison.
        `,
        targeting: `
          Make an attack vs. Fortitude with a \\minus3 accuracy bonus against one living creature you \\glossterm{touch}.
        `,
      },
      rank: 3,
      roles: ['burn'],
      scaling: 'damage',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Bloodroot',

      attack: {
        crit: POISON_CRIT,
        hit: `
          The target becomes \\glossterm{poisoned} by bloodroot (see \\pcref{Poison}).
          The poison's accuracy is equal to your accuracy with this spell.
          It deals \\damagerankfourlow immediately and with each escalation.
          The second escalation also ends the poison.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature you \\glossterm{touch}.
        `,
      },
      rank: 4,
      roles: ['burn'],
      scaling: 'damage',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Black Lotus',

      attack: {
        crit: POISON_CRIT,
        hit: `
          The target becomes \\glossterm{poisoned} by black lotus (see \\pcref{Poison}).
          The poison's accuracy is equal to your accuracy with this spell.
          It deals \\damagerankfivelow immediately and with each escalation.
        `,
        targeting: `
          Make an attack vs. Fortitude with a \\plus1 accuracy bonus against one living creature you \\glossterm{touch}.
        `,
      },
      rank: 6,
      roles: ['burn'],
      scaling: 'damage',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Erupting Spikefruit',

      // Damage in area rank 3 would normally be dr1. +2dr from escapable delay, -1dr for
      // undergrowth.
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
      rank: 3,
      roles: ['clear', 'hazard'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },

    {
      name: 'Massive Erupting Spikefruit',

      functionsLike: {
        name: 'erupting spikefruit',
        exceptThat:
          'the damage increases to \\damagerankfour, and the area increases to a \\medarea radius within \\longrange.',
      },
      rank: 6,
      roles: ['clear', 'hazard'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },

    {
      name: 'Barkskin',

      effect: `
        You gain a +3 \\glossterm{enhancement bonus} to your \\glossterm{durability}.
        However, you are also \\vulnerable to \\atFire abilities.
      `,
      rank: 1,
      roles: ['attune'],
      scaling: {
        3: 'The bonus increases to +3.',
        5: 'The bonus increases to +4.',
        7: 'The bonus increases to +5.',
      },
      type: 'Attune',
    },

    // Normal short range damage would be dr3, or dr1 from damage over time, up to dr2
    // from double defense. No penalty for undergrowth.
    {
      name: 'Embedded Growth',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damageranktwo immediately, and again during your next action.
          Whenever it takes damage in this way, \\glossterm{light undergrowth} \\glossterm{briefly} fills its space and all adjacent spaces.
        `,
        targeting: `
          Make an attack vs. Reflex and Fortitude against one creature within \\shortrange.
        `,
      },
      narrative: `
        You throw a seed that embeds itself in a foe and grows painfully.
      `,
      rank: 2,
      roles: ['burn', 'hazard'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Embedded Growth',

      functionsLike: {
        name: 'embedded growth',
        exceptThat: 'the damage increases to \\damagerankfive.',
      },
      narrative: `
        You throw a seed that embeds itself in a foe and grows painfully.
      `,
      rank: 5,
      roles: ['burn', 'hazard'],
      scaling: 'damage',
    },

    {
      name: 'Fire Seeds',

      // This allows sharing, but also requires an extra standard action to cast, so no
      // penalty for the weird effect.
      attack: {
        hit: `\\damageranktwo.`,
        missGlance: true,
        targeting: `
          % Does "seed structure" make sense?
          You transform up to three \\glossterm{unattended} acorns or similar seed structures you \\glossterm{touch} into small bombs.
          As a standard action, you or another creature can throw the seed up to 30 feet.
          When thrown individually in this way, the seed detonates, and you make an attack vs. Reflex against everything within a \\tinyarea radius of the impact location.
          If the seed is destroyed in any other way, it has no effect.
        `,
      },
      rank: 3,
      roles: ['attune', 'clear'],
      scaling: 'damage',
      tags: ['Fire'],
      type: 'Sustain (attunable, minor)',
    },

    {
      name: 'Mighty Fire Seeds',

      functionsLike: {
        name: 'fire seeds',
        exceptThat: 'the damage increases to \\damagerankfive.',
      },
      rank: 6,
      roles: ['attune', 'clear'],
      scaling: 'damage',
      tags: ['Fire'],
      type: 'Sustain (attunable, minor)',
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
      roles: ['clear', 'hazard'],
      scaling: 'damage',
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attunable, minor)',
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
      roles: ['hazard'],
      scaling: 'damage',
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attunable, minor)',
    },

    // TODO: unclear EA
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
      rank: 4,
      roles: ['hazard'],
      tags: ['Manifestation'],
      type: 'Sustain (attunable, minor)',
    },

    {
      name: 'Blight',

      // Short range instead of med range for the two weird effects
      attack: {
        hit: `
          \\damageranktwo.
          If the target is a Large or smaller object, it immediately dies.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature or plant within \\shortrange.
          In addition, you create a \\medarea radius \\glossterm{zone} around the target that persists \\glossterm{briefly}.
          All \\glossterm{undergrowth} in that area shrivels away into the ground, reemerging when the effect ends.
          If the target is a plant, including plant creatures, you gain a \\plus10 accuracy bonus with the attack.
        `,
      },
      rank: 2,
      roles: ['burst'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Blight',

      functionsLike: {
        name: 'blight',
        exceptThat: 'the damage increases to \\damageranksix, and it can kill objects that are Gargantuan or smaller.',
      },
      roles: ['burst'],
      rank: 6,
      scaling: 'damage',
    },

    {
      name: 'Shillelagh',

      usageTime: 'minor',
      effect: `
        Choose one nonmagical, \\glossterm{unattended} stick of wood you \\glossterm{touch}.
        You transform the target into a club, quarterstaff, or sap, as you choose (see \\pcref{Weapons}).
        You cannot change the target's size by more than one size category.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the weapon (see \\pcref{Power}).
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Sustain (attunable, minor)',
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

    // AOE healing has a poorly defined healing value. For now, this seems fine??
    {
      name: 'Healing Bloom',
      cost: 'One \\glossterm{fatigue level}.',
      effect: `
        Choose a \\tinyarea \\glossterm{zone} within \\medrange.
        A flower begins to grow in the center of the area.
        At the end of the next round, each living \\glossterm{ally} within the area regains \\hpranktwo.
      `,
      rank: 1,
      scaling: 'healing',
      roles: ['healing', 'exertion'],
      tags: ['Manifestation'],
    },
    {
      name: 'Greater Healing Bloom',
      cost: 'One \\glossterm{fatigue level}.',
      functionsLike: {
        name: 'healing bloom',
        exceptThat: 'the healing increases to \\hprankfive.',
      },
      rank: 4,
      scaling: 'healing',
      roles: ['healing', 'exertion'],
      tags: ['Manifestation'],
    },
    // Brief banishment is 3.0. Limited scope drops to r8, then cheat to get it to r7.
    {
      name: 'Treeseal',

      attack: {
        hit: `
          A Huge grove of trees grows around the target, \\glossterm{briefly} trapping it inside the grove.
          While it is trapped, it does not have \\glossterm{line of sight} or \\glossterm{line of effect} to any creature other than itself.

          The grove has \\glossterm{hit points} equal to five times your \\glossterm{power}, all of its defenses are 5, and it is destroyed when its hit points become negative.
          If the grove is destroyed, this effect ends early.
          Special movement abilities such as teleportation can also remove the target from the trees, ending this effect.
          Once this effect ends, the target becomes \\glossterm{immune} to it until it takes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Brawn against up to two Large or smaller \\glossterm{grounded} creatures within \\medrange.
        `,
      },
      roles: ['trip'],
      rank: 7,
    },

    // Any two shielded is 0.7, any two 0.4 EA is 1 EA.
    {
      name: 'Vineward',

      effect: `
        Choose up to two creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Each target has \\glossterm{cover} from all attacks this round.
      `,
      rank: 1,
      roles: ['boon'],
      tags: ['Manifestation', 'Swift'],
    },

    {
      name: 'Mass Vineward',

      effect: `
        You and all \\glossterm{allies} within a \\largearea radius from you have \\glossterm{cover} from all attacks this round.
      `,
      rank: 4,
      roles: ['boon'],
      tags: ['Manifestation', 'Swift'],
    },

    // Shielded is 0.3 EA.
    // Reactive damage takes up half the EA budget, so ~0.4 EA here.
    {
      name: 'Thorns',

      attack: {
        hit: `\\damageranktwo.`,
        targeting: `
          You have \\glossterm{cover} from all attacks this round.
          In addition, whenever a creature makes a \\glossterm{melee} attack against you using a free hand or non-\\weapontag{Long} weapon this round, make a \\glossterm{reactive attack} vs. Armor against them.
        `,
      },
      rank: 2,
      roles: ['focus'],
      scaling: 'damage',
      tags: ['Manifestation', 'Swift'],
    },

    {
      name: 'Mighty Thorns',

      functionsLike: {
        name: 'thorns',
        exceptThat: 'the damage increases to \\damagerankfive.',
      },
      rank: 5,
      roles: ['focus'],
      scaling: 'damage',
      tags: ['Manifestation', 'Swift'],
    },

    {
      name: 'Shared Thorns',

      // Ally cover is 0.5 EA. Common damage trigger is 75% of EA, so we drop to drX-2 for 40% less damage, so 45% of EA.
      attack: {
        hit: `\\damagerankone.`,
        targeting: `
          Choose one creature from among yourself and your \\glossterm{allies} within \\medrange.
          The target has \\glossterm{cover} from all attacks this round.
          In addition, whenever a creature makes a \\glossterm{melee} attack against it using a free hand or non-\\weapontag{Long} weapon this round, make a \\glossterm{reactive attack} vs. Armor against the attacking creature.
        `,
      },
      rank: 3,
      roles: ['boon'],
      scaling: 'damage',
      tags: ['Manifestation', 'Swift'],
    },

    {
      name: 'Mighty Shared Thorns',

      functionsLike: {
        name: 'thorns',
        exceptThat: 'the damage increases to \\damagerankfour.',
      },
      rank: 6,
      roles: ['boon'],
      scaling: 'damage',
      tags: ['Manifestation', 'Swift'],
    },
    {
      name: 'Treeclub',

      // Melee range is +2dr, -4 accuracy is +2dr, -1dr for Impact tag.
      attack: {
        hit: `\\damagerankfive, and any \\glossterm{extra damage} is doubled.`,
        targeting: `
          Make an attack vs. Armor with a \\minus4 accuracy penalty against anything adjacent to you.
          You gain a +2 accuracy bonus if you or the target is adjacent to a Huge or larger tree.
        `,
      },
      rank: 2,
      roles: ['burst'],
      scaling: 'damage',
      tags: ['Impact', 'Manifestation'],
    },
    {
      name: 'Mighty Treeclub',

      // Melee range is +2dr, -4 accuracy is +2dr, -1dr for Impact tag.
      attack: {
        hit: `\\damagerankeight, and any \\glossterm{extra damage} is doubled.`,
        targeting: `
          Make an attack vs. Armor with a \\minus4 accuracy penalty against anything adjacent to you.
          You gain a +2 accuracy bonus if you or the target is adjacent to a Huge or larger tree.
        `,
      },
      rank: 5,
      roles: ['burst'],
      scaling: 'damage',
      tags: ['Impact', 'Manifestation'],
    },
  ],
};
