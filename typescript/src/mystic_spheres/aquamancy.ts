import { MysticSphere } from ".";

export const aquamancy: MysticSphere = {
  name: "Aquamancy",
  shortDescription: "Command water to crush and drown foes.",
  sources: ["domain", "nature"],

  cantrips: [
    {
      name: "Create Water",

      effect: `
        You create up to two gallons of wholesome, drinkable water divided among any number of locations within \\shortrange, allowing you to fill multiple small water containers.
        You must create a minimum of one ounce of water in each location.
      `,
      narrative: `
        The desert air ripples with heat, scorching the group of adventurers.
        When they finally stop to rest, you conjure water from thin air, giving them all the strength to press on.
      `,
      scaling: {
        2: "The volume created increases to five gallons.",
        4: "The volume created increases to ten gallons.",
        6: "The volume created increases to twenty gallons.",
      },
      tags: ["Creation"],
    },
    {
      name: "Manipulate Water",

      effect: `
        You change the speed of water within a \\medarea radius \\glossterm{emanation} from you by up to 5 miles per hour.
        If you decrease the water's speed to 0, you can increase it again with the remainder of your speed change and choose any direction for it to travel.
        You choose the speed change and direction when you cast this spell, and that choice persists for the duration of this effect.

        In addition to allowing you to change the direction of currents within large bodies of water, you can also use this to propel water across surfaces.
        Generally, moving water uphill costs at least 5 miles per hour of speed for every foot of elevation that you are trying to climb, which can limit your ability to move water up large distances.
      `,
      scaling: {
        3: "You can choose to affect a \\largearea radius instead, and the maximum speed change increases to 10 miles per hour.",
        5: "You can choose to affect a \\hugearea radius instead, and the maximum speed change increases to 15 miles per hour.",
        7: "You can choose to affect a \\gargarea radius instead, and the maximum speed change increases to 20 miles per hour.",
      },
      type: "Sustain (minor)",
    },
    {
      name: "Purify Water",

      effect: `
        You can separate out dirt, sand, salt, and similar minor pollutants from up to five gallons of water within \\shortrange.
        The waste material moves to the edge of the water so it falls out or can be easily removed.
        This does not remove poisons, magical effects, or contaminants heavier than half a pound.
        Using this on a very large body of water is difficult, since the waste material can easily mix with the water unaffected by a single casting of this spell.
      `,
      // narrative: '',
      scaling: {
        2: "The volume affected increases to ten gallons.",
        4: "The volume affected increases to twenty gallons.",
        6: "The volume affected increases to fifty gallons.",
      },
    },
    {
      name: "Slippery Escape",

      effect: `
        You \\glossterm{briefly} gain a +3 \\glossterm{magic bonus} to the Flexibility skill.
      `,
      narrative: `
        A thin layer of water covers you, allowing you to slip through the grasp of your foes more easily.
      `,
      scaling: {
        2: "The bonus increases to +4.",
        4: "The bonus increases to +5.",
        6: "The bonus increases to +6.",
      },
      tags: ["Manifestation"],
    },
  ],
  spells: [
    {
      name: "Desiccating Curse",

      attack: {
        crit: "The effect lasts until this curse is removed.",
        hit: `
          The target is \\dazed.
          If it immerses itself in or drinks a body of water of minimum size equal to two size categories smaller than itself,
            the target stops being dazed for 10 minutes.
          This effect lasts until the target takes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\rngmed range.
        `,
      },
      rank: 3,
      scaling: "accuracy",
      tags: ["Curse"],
    },
    {
      name: "Greater Desiccating Curse",

      functionsLike: {
        name: "desiccating curse",
        exceptThat: "the target is \\stunned instead of dazed.",
      },
      rank: 7,
      scaling: "accuracy",
      tags: ["Curse"],
    },
    // swimming is +2 ranks better than a normal rank 2 condition
    {
      name: "Constraining Bubble",

      attack: {
        crit: `
          The water also the covers the target's face.
          This does not meaningfully impede its sight, but it cannot breathe anything other than the water.
        `,
        hit: `
          As a \\glossterm{condition}, the majority of the target's body is surrounded by a layer of water.
          This does not impede its ability to breathe, but it is treated as \\swimming, which causes it to suffer penalties if it does not have a \\glossterm{swim speed}. 
        `,
        targeting: `
          Make an attack vs. Reflex against a Huge or smaller creature within \\medrange.
        `,
      },
      rank: 6,
      scaling: "accuracy",
      tags: ["Manifestation"],
    },

    {
      name: "Crushing Wave",

      attack: {
        // crit: '',
        hit: `
          Each target takes 1d6 + half \\glossterm{power} bludgeoning damage.
        `,
        targeting: `
          Make an attack vs. Reflex against everything in a \\smallarealong, 10 ft. wide line from you.
        `,
      },
      rank: 1,
      scaling: "damage",
      tags: ["Manifestation"],
    },
    {
      name: "Greater Crushing Wave",

      attack: {
        // crit: '',
        hit: `
          Each target takes 1d10 + half \\glossterm{power} bludgeoning damage.
        `,
        targeting: `
          Make an attack vs. Reflex against everything in a \\largearealong, 10 ft. wide line from you.
        `,
      },
      rank: 3,
      scaling: "damage",
      tags: ["Manifestation"],
    },
    {
      name: "Aquajet Propulsion",

      attack: {
        // crit: '',
        hit: `
          The target takes 1d6 + \\glossterm{power} bludgeoning damage.
        `,
        targeting: `
          Make an attack vs. Armor against anything within \\medrange.
          Whether you hit or miss, you may \\glossterm{push} yourself up to 15 feet away from the target as the water propels you backwards.
          Moving yourself upwards costs twice the normal movement cost.
          This movement is doubled underwater.
        `,
      },
      rank: 1,
      scaling: "damage",
      tags: ["Manifestation"],
    },
    {
      name: "Greater Aquajet Propulsion",

      functionsLike: {
        name: 'aquajet propulsion',
        exceptThat: "the damage increases to 1d10 + \\glossterm{power}, and the push distance increases to 30 feet.",
      },
      rank: 3,
      scaling: "damage",
      tags: ["Manifestation"],
    },
    {
      name: "Supreme Aquajet Propulsion",

      functionsLike: {
        name: 'aquajet propulsion',
        exceptThat: "the damage increases to 2d8 + \\glossterm{power}, and the push distance increases to 60 feet.",
      },
      rank: 5,
      scaling: "damage",
      tags: ["Manifestation"],
    },
    {
      name: "Fountain",

      attack: {
        // crit: '',
        hit: `
          Each target takes 1d8 + half \\glossterm{power} bludgeoning damage.
        `,
        targeting: `
          Make an attack vs. Armor against all \\glossterm{enemies} within a \\smallarea radius from you.
        `,
      },
      rank: 2,
      scaling: "damage",
      tags: ["Manifestation"],
    },
    {
      name: "Greater Fountain",

      attack: {
        // crit: '',
        hit: `
          Each target takes 2d8 + half \\glossterm{power} bludgeoning damage.
        `,
        targeting: `
          Make an attack vs. Armor against all \\glossterm{enemies} within a \\largearea radius from you.
        `,
      },
      rank: 5,
      scaling: "damage",
      tags: ["Manifestation"],
    },
    {
      name: "Wall of Water",

      // targeting: None,
      effect: `
          You create a \\smallarealong \\glossterm{wall} of water within \\medrange.
          The wall is four inches thick.
          Sight through the wall is possible, though distorted.
          The wall provides both \\glossterm{cover} and \\glossterm{concealment} to targets on the opposite side of the wall (see \\pcref{Obstacles and Cover}).
          In addition, ranged \\glossterm{strikes} that pass through the wall take a -4 accuracy penalty.
          Creatures can pass through the wall unharmed, though it costs five extra feet of movement to move through the wall.

          The wall has \\glossterm{hit points} equal to three times your \\glossterm{power}.
          After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
      `,
      rank: 1,
      scaling: {
        3: `You can increase the area to a \\medarealong wall.`,
        5: `You can increase the area to a \\largearealong wall.`,
        7: `You can increase the area to a \\hugearealong wall.`,
      },
      tags: ["Manifestation"],
      type: "Sustain (attuneable, minor)",
    },
    {
      name: "Aquatic Freedom",

      effect: `
        You gain a \\glossterm{swim speed} 10 feet slower than the \\glossterm{base speed} for your size.
        If you already have a swim speed, you gain a +10 foot \\glossterm{magic bonus} to your swim speed.
      `,
      rank: 2,
      type: "Attune",
    },
    {
      name: "Mass Aquatic Freedom",

      functionsLike: {
        mass: true,
        name: "aquatic freedom",
      },
      rank: 4,
      type: "Attune (target)",
    },
    // +2 levels for push
    {
      name: "Raging River",

      attack: {
        // crit: '',
        hit: `
          Each target takes 1d8 + half \\glossterm{power} bludgeoning damage.
          In addition, each target damaged by the attack is \\glossterm{pushed} 15 feet in the direction the line points away from you.
          Once a target leaves the area, it stops being moved and blocks any other targets from being pushed.
        `,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\medarealong, 5 ft. wide line from you.
        `,
      },
      rank: 2,
      scaling: "damage",
      tags: ["Manifestation"],
    },
    // +1 level for farther push, +2 levels for area
    {
      name: "Greater Raging River",

      attack: {
        // crit: '',
        hit: `
          Each target takes 2d8 + half \\glossterm{power} bludgeoning damage.
          In addition, each target damaged by the attack is \\glossterm{pushed} 30 feet in the direction the line points away from you.
          Once a target leaves the area, it stops being moved and blocks any other targets from being pushed.
        `,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\largearealong, 10 ft. wide line from you.
        `,
      },
      rank: 5,
      scaling: "damage",
      tags: ["Manifestation"],
    },
    {
      name: "Geyser",

      attack: {
        // crit: '',
        // +1d from normal AOE due to weird area that probably just hits one person
        // This can't be full power due to restrictions on Reflex-based single target
        // attacks
        hit: `
          Each target takes 2d6 + half \\glossterm{power} bludgeoning damage.
        `,
        targeting: `
          Make an attack vs. Reflex against everything in a \\medarealong, 5 ft.\\ wide vertical line within \\longrange.
          If this spell has its area increased, only the length of the line increases.
        `,
      },
      rank: 3,
      scaling: "damage",
      tags: ["Manifestation"],
    },
    {
      name: "Greater Geyser",

      attack: {
        // crit: '',
        // +1d from normal AOE due to weird area that probably just hits one person
        // This can't be full power due to restrictions on Reflex-based single target
        // attacks
        hit: `
          Each target takes 4d8 + half \\glossterm{power} bludgeoning damage.
        `,
        targeting: `
          Make an attack vs. Reflex against everything in a \\largearealong, 5 ft.\\ wide vertical line within \\distrange.
          If this spell has its area increased, only the length of the line increases.
        `,
      },
      rank: 6,
      scaling: "damage",
      tags: ["Manifestation"],
    },
    {
      name: "Rainstorm",

      effect: `
        Torrential rain begins falling out of thin air within a \\medarea radius \\glossterm{zone} within \\longrange.
        The rain extinguishes minor fires such as campfires and torches on contact.
        Everything in the area is \\trait{impervious} to fire damage.
      `,
      rank: 1,
      tags: ["Manifestation"],
      type: "Sustain (minor)",
    },
    {
      name: "Obscuring Mist",

      effect: `
        Fog fills the air within a \\largearea radius \\glossterm{zone} from your location.
        The fog partially obstructs sight, granting \\glossterm{concealment} to anything seen through the fog (see \\pcref{Concealment}).
      `,
      rank: 1,
      scaling: {
        3: "You can choose to create a \\hugearea radius instead.",
        5: "You can choose to create a \\gargarea radius instead.",
        7: "You can choose to create a 240 foot radius instead.",
      },
      type: "Sustain (minor)",
    },
    {
      name: "Misty Halo",

      effect: `
        Fog fills the air within a \\largearea radius \\glossterm{zone} from your location.
        The fog partially obstructs sight, granting \\glossterm{concealment} to anything seen through the fog (see \\pcref{Concealment}).
        You can exclude an inner radius of any size from the area, allowing you to create fog that surrounds your location without blocking sight to things near to you.
      `,
      rank: 3,
      scaling: {
        5: "You can choose to create a \\hugearea radius instead.",
        7: "You can choose to create a \\gargarea radius instead.",
      },
      type: "Sustain (minor)",
    },
    {
      name: "Misty Shroud",

      effect: `
        At the end of each round, fog \\glossterm{briefly} fills a \\medarea radius zone from you.
        This fog does not fully block sight, but it provides \\glossterm{concealment}.
        There is no time gap between the disappearance of the old fog and the appearance of the new fog, so you can keep continuous fog cover by staying in the same place or moving slowly.
      `,
      rank: 3,
      scaling: {
        5: "When you cast this spell, you can choose to create a \\largearea radius instead.",
        7: "When you cast this spell, you can choose to create a \\hugearea radius instead.",
      },
      type: "Attune",
    },
    {
      name: "Octopus Tentacles",

      functionsLike: {
        exceptThat: `
          you create eight tentacles that extend from your body.
          Whenever you make a \\glossterm{strike} with the tentacles, you can attack with all of the tentacles at once, with each tentacle attacking a different target.
          This functions as if your attacks had the \\glossterm{Sweeping} (7) tag, with no limit on how far each secondary target must be from the primary target (see \\pcref{Sweeping}).
        `,
        name: "aqueous tentacle",
      },
      rank: 4,
      type: "Attune",
    },
    {
      name: "Aqueous Tentacle",

      effect: `
        You gain a slam \\glossterm{natural weapon} (see \\tref{Natural Weapons}).
        The natural weapon deals 1d10 damage, as normal for a slam natural weapon.
        In addition, it has the Sweeping (1) \\glossterm{weapon tag} (see \\pcref{Weapon Tags}).
        Strikes using it are considered \\glossterm{magical} abilities, which means you use your Willpower to determine your damage dice instead of your Strength (see \\pcref{Dice Bonuses From Attributes}).
      `,
      narrative: `
        You grow a massive watery tentacle that extends from your body.
      `,
      rank: 2,
      tags: ["Manifestation"],
      type: "Attune",
    },
    {
      name: "Aqueous Form",

      effect: `
        You transform your body and equipment into water, allowing you to compress your body or contort yourself into odd shapes.
        This has the following effects:

        \\begin{itemize}
          \\par
          \\item You gain a \\glossterm{swim speed} 10 feet slower than the \\glossterm{base speed} for your size.
            If you already have a swim speed, you gain a \\plus10 foot \\glossterm{magic bonus} to your swim speed.
          \\item You gain a +8 \\glossterm{magic bonus} to the Flexibility skill. In addition, the minimum size you can squeeze down to is reduced to one inch, which can dramatically improve your ability to squeeze through tight spaces.
          \\item You gain a +4 bonus to your defenses when determining whether a \\glossterm{strike} gets a \\glossterm{critical hit} against you instead of a normal hit.
          \\item You ignore \\glossterm{difficult terrain} from all sources except for creature abilities.
        \\end{itemize}

        % There must be text between an itemize block and the end of a mdframed env
        \\hypertarget{itemizespace}{}
      `,
      rank: 3,
      type: "Attune (deep)",
    },
    {
      name: "Fog Cloud",

      effect: `
        A cloud of fog appears in a \\medarea radius within \\longrange.
        The fog provides \\glossterm{concealment} for everything in the area.
      `,
      rank: 3,
      scaling: {
        5: "You can choose to create a \\largearea radius instead.",
        7: "You can choose to create a \\hugearea radius instead.",
      },
      tags: ["Manifestation"],
      type: "Sustain (minor)",
    },
    {
      name: "Fog Wall",

      effect: `
        You create a \\medarealong \\glossterm{wall} of fog within \\longrange.
        The fog makes it difficult to see through the wall, granting \\glossterm{concealment} to anything viewed through the wall (see \\pcref{Concealment}).

        After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
      `,
      rank: 1,
      scaling: {
        3: "You can choose to create a \\largearealong wall instead.",
        5: "You can choose to create a \\hugearealong wall instead.",
        7: "You can choose to create a \\gargarealong wall instead.",
      },
      tags: ["Barrier", "Manifestation"],
      type: "Sustain (attuneable, minor)",
    },
    {
      name: "Fluid Motion",

      effect: `
        When you move using one of your movement speeds, you can transform yourself into a rushing flow of water with a volume roughly equal to your normal volume until your movement is complete.
        You can only transform into water in this way once during your movement, and you regain your normal form at the end of the movement.
        In this form, you may move wherever water could go, you cannot take other actions, such as jumping, attacking, or casting spells.
        You may move through squares occupied by enemies without penalty.
        Being \\grappled or otherwise physically constrained does not prevent you from transforming into water in this way.

        Your speed is halved when moving uphill and doubled when moving downhill.
        Unusually steep inclines may cause greater movement differences while in this form.

        If the water is split, you may reform from anywhere the water has reached, to as little as a single ounce of water.
        If not even an ounce of water exists contiguously, your body reforms from all of the largest available sections of water, cut into pieces of appropriate size.
        This usually causes you to die.
      `,
      rank: 5,
      type: "Attune",
    },
    {
      name: "Forceful Aquajet",

      attack: {
        crit: "Double damage, and you can knockback the target 60 feet instead of 30 feet.",
        hit: `
          The target takes 1d4 bludgeoning damage.
          If it loses \\glossterm{hit points} from this damage, you \\glossterm{knockback} it up to 30 feet in any direction (see \\pcref{Knockback Effects}).
          Moving the target upwards costs twice the normal movement cost.
        `,
        targeting:
          "Make an attack vs. Armor against anything Large or smaller within \\medrange.",
      },
      // narrative: '',
      rank: 1,
      scaling: "accuracy",
    },
    {
      name: "Greater Forceful Aquajet",

      functionsLike: {
        name: 'forceful aquajet',
        // This deals an immediate 6d6 if you smash someone against a barrier, which is a lot of damage.
        exceptThat: "the damage increases to 1d10. In addition, the knockback distance increases to 60 feet, or 120 feet on a critical hit.",
      },
      // narrative: '',
      rank: 4,
      scaling: "damage",
    },
    {
      name: "Supreme Forceful Aquajet",

      functionsLike: {
        name: 'forceful aquajet',
        // This deals an immediate 12d6 if you smash someone against a barrier, which is a lot of damage.
        exceptThat: "the damage increases to 2d10. In addition, the knockback distance increases to 120 feet, or 240 feet on a critical hit.",
      },
      // narrative: '',
      rank: 7,
      scaling: "damage",
    },
    {
      name: "Personal Aquarium",

      effect: `
        You surround yourself in a bubble of water.
        This has the following effects:
        \\begin{itemize}
          \\item Your land speed is halved.
          \\item If you have a swim speed, you can use it to move around on land.
          \\item You are always considered to be \\swimming, so you take penalties if you do not have a swim speed.
          \\item The water blocks you from breathing air, but you can poke your head out of the bubble to take a breath as a \\glossterm{move action}.
          \\item You gain a +4 \\glossterm{magic bonus} to your \\glossterm{damage resistance}.
          \\item You gain a +2 bonus to your defenses against ranged \\glossterm{strikes}.
          \\item You gain a +2 bonus to your defenses against the \\ability{grapple} ability.
        \\end{itemize}
      `,
      // narrative: '',
      rank: 3,
      scaling: {
        5: 'The damage resistance bonus increases to +8.',
        7: 'The damage resistance bonus increases to +16.',
      },
      type: "Attune",
    },
    {
      name: 'Waterward',

      effect: `
        You gain a +4 \\glossterm{magic bonus} to your \\glossterm{damage resistance}.
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
      name: "Slippery Escapist",

      effect: `
        If you are \\glossterm{trained} with the Flexibility skill, you gain a +3 \\glossterm{magic bonus} to it.
        Otherwise, you are treated as being \\glossterm{trained} in that skill.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +4.`,
        5: `The bonus increases to +5.`,
        7: `The bonus increases to +6.`,
      },
      type: "Attune",
    },
  ],
  rituals: [
    {
      name: "Dampen",

      effect: `
          Up to five ritual participants each become \\trait{impervious} to fire damage.
      `,
      rank: 2,
      type: "Attune",
      castingTime: "one minute",
    },
    {
      name: "Water Breathing",

      effect: `
        One ritual participant gains the ability to breathe water as easily as a human breathes air, preventing it from drowning or suffocating underwater.
      `,
      rank: 3,
      type: "Attune",
      castingTime: "one minute",
    },
    {
      name: "Detect Water",

      effect: `
        You learn the approximate distance and direction to any bodies of water within \\rnglong \\glossterm{range} of you.
        Since this is a \\abilitytag{Detection} ability, its range can penetrate some solid objects (see \\pcref{Detection}).
        This spell can detect bodies of water with a minimum size of Fine.
      `,
      rank: 1,
      tags: ["Detection"],
      castingTime: "one minute",
    },
    {
      name: "Greater Detect Water",

      functionsLike: {
        exceptThat: "the range increases to \\extrange.",
        name: "detect water",
      },
      rank: 3,
      tags: ["Detection"],
      castingTime: "one minute",
    },
    {
      name: "Supreme Detect Water",

      functionsLike: {
        exceptThat: "the range increases to 2,000 foot range.",
        name: "detect air",
      },
      rank: 5,
      tags: ["Detection"],
      castingTime: "one minute",
    },
  ],
};
