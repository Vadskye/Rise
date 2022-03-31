import { MysticSphere } from ".";

export const telekinesis: MysticSphere = {
  name: "Telekinesis",
  shortDescription: "Manipulate kinetic energy at a distance.",
  sources: ["arcane", "pact"],

  cantrips: [
    {
      name: "Distant Hand",

      effect: `
        Choose one Medium or smaller \\glossterm{unattended} object within \\shortrange.
        You can telekinetically control the target object as if you were holding it in an extra hand.
        Any attacks you make with the object or checks you make to manipulate the object have a maximum bonus equal to your \\glossterm{power}.
        At the end of each round, if the target is outside of this ability's range, this ability ends.

        During the movement phase, you can move the target up to five feet in any direction.
        You use your Willpower instead of your Strength to determine your \\glossterm{weight limits} when moving objects in this way (see \\pcref{Weight Limits}).
      `,
      scaling: {
        2: `You can move the target up to ten feet in any direction.`,
        4: `The range increases to \\medrange.`,
        6: `You can move the target up to thirty feet in any direction.`,
      },
      type: "Sustain (minor)",
    },

    {
      name: "Gentle Force",

      effect: `
        You can exert minor force on objects and creatures around you.
        As part of the action you take to sustain this spell, you may choose any object or creature within \\shortrange of you.
        That object or creature feels a push in a direction of your choice.
        The force is sufficient to lift an object with a Diminuitive \\glossterm{weight category}, or to push an object with a Tiny weight category across the ground.
        Generally, the force exerted by this ability is insufficient to physically move or even meaningfully impede any creature, but it can be perceived.
      `,
      scaling: {
        2: `The force increases to lift a Tiny weight object, or to push a Small weight object.`,
        4: `The range increases to \\longrange`,
        6: `The force increases to lift a Small weight object, or to push a Medium weight object.`,
      },
      type: "Sustain (minor)",
    },

    {
      name: "Personal Ward",

      effect: `
        You are \\trait{impervious} to \\glossterm{physical damage} this round.
        Because this is a \\abilitytag{Swift} ability, it affects damage you take during the current phase.
      `,
      // narrative: '',
      scaling: {
        2: "You also gain a +1 bonus to your Armor and Reflex defenses.",
        4: "The defense bonuses increase to +2.",
        6: "The defense bonuses increase to +3.",
      },
      tags: ["Swift"],
      type: "Duration",
    },
  ],
  spells: [
    {
      name: "Interposing Force",

      attack: {
        crit: `The difficulty value of the Strength check increases by 10.`,
        hit: `As a \\glossterm{condition}, the target is unable to move closer to you without effort.
        This does not impede its movement unless its movement would decrease the distance between it and you.
        As part of movement, it can make a Strength check with a \\glossterm{difficulty value} of 5.
        If it succeeds, it can move towards you at half speed.`,
        targeting: `
        Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },

      rank: 2,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Greater Interposing Force",

      functionsLike: {
        name: "interposing force",
        exceptThat: "the \\glossterm{difficulty value} of the Strength check increases to 15.",
      },
      rank: 7,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Force Lance",

      attack: {
        hit: `Each target takes 1d6 + half \\glossterm{power} piercing damage.`,
        targeting: `
        Make an attack vs. Armor against everything in a \\medarealong, 5 ft. wide line from you.
        `,
      },

      rank: 1,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Force Lance",

      attack: {
        hit: `Each target takes 2d8 + half \\glossterm{power} piercing damage.`,
        targeting: `
          Make an attack vs. Armor against everything in a \\largearealong, 5 ft. wide line from you.
        `,
      },

      rank: 4,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Supreme Force Lance",

      attack: {
        hit: `Each target takes 4d10 + half \\glossterm{power} piercing damage.`,
        targeting: `
          Make an attack vs. Armor against everything in a \\largearealong, 10 ft. wide line from you.
        `,
      },
      rank: 7,
      type: "Instant",
    },

    {
      name: "Force Extension",

      effect: `
        You gain a +5 foot \\glossterm{magic bonus} to your \\glossterm{reach} with melee \\glossterm{strikes}.
        This has no effect on ranged attacks you make.
      `,

      rank: 3,
      scaling: {
        5: `The bonus increases to +10 feet.`,
        7: `The bonus increases to +15 feet.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Force Extension",

      functionsLike: {
        mass: true,
        name: "Force Extension",
      },
      // narrative: '',
      rank: 5,
      scaling: {
        7: `The bonus increases to +10 feet.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Kinetic Impedance",

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        hit: `The target is \\slowed as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against one Large or smaller target within \\medrange.
        `,
      },

      rank: 1,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Rapid Reload",

      effect: `
        You can reload weapons from the crossbow weapon group as a \\glossterm{minor action} instead of as a standard action, and without requiring any \\glossterm{free hands}.
        Each time you reload a crossbow in this way, you \\glossterm{briefly} cannot do so again.
      `,
      rank: 3,
      scaling: {
        5: `Reloading a crossbow in this way does not prevent you from reloading it again.`,
        7: `You can reload as a \\glossterm{free action} instead of as a minor action. However, you can only reload with this spell once per round.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Kinetic Impedance",

      attack: {
        crit: "The effect becomes a \\glossterm{condition} on each target.",
        // No relevant glance effect
        hit: `Each target is \\glossterm{briefly} \\slowed.`,
        targeting: `
          Make an attack vs. Mental with a +1 \\glossterm{accuracy} bonus against all Large or smaller creatures in a \\areasmall radius within \\medrange.
        `,
      },
      rank: 1,
      scaling: "accuracy",
      tags: ["Compulsion"],
      type: "Duration",
    },

    {
      name: "Blastwave",

      attack: {
        hit: `You \\glossterm{knockback} each target up to 15 feet in a straight line away from you.
        Moving a target upwards costs twice the normal movement cost.
        If the target impacts a solid object before the maximum distance, it stops moving and both it and the object take bludgoning damage equal to 1d10 + half \\glossterm{power} instead of the normal knockback damage.
        Any individual object or creature can only take damage once in this way, even if it is hit by multiple targets that are knocked flying.`,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\areasmall radius from you.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Blastwave",

      functionsLike: {
        name: 'blastwave',
        exceptThat: `
          the damage increases to 2d10 + half \\glossterm{power}, and the area increases to a \\largearea radius.
          In addition, the knockback distance increases to 30 feet.
        `,
      },
      rank: 6,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Distant Shove",
      attack: {
        hit: `
          You \\glossterm{push} the target up to 30 feet in a straight line.
          If the target impacts a solid object before it moves the maximum distance, it stops moving and both it and the object take bludgoning damage equal to 2d6 + \\glossterm{power}.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything Large or smaller within \\shortrange of you.
        `,
      },
      rank: 3,
      type: "Instant",
    },

    {
      name: "Greater Distant Shove",
      functionsLike: {
        name: 'distant shove',
        exceptThat: "the damage increases to 4d8 + \\glossterm{power}, and the maximum size increases to Huge.",
      },
      rank: 6,
      type: "Instant",
    },

    {
      name: "Toss Foe",

      attack: {
        hit: `The target takes 1d4 bludgeoning damage.
        If it loses \\glossterm{hit points} from this damage, you \\glossterm{knockback} it up to 30 feet in any direction (see \\pcref{Knockback Effects}).
        Moving the target upwards costs twice the normal movement cost.`,
        targeting: `
          Make an attack vs. Fortitude against anything Large or smaller within \\medrange.
        `,
      },

      rank: 1,
      scaling: "accuracy",
      type: "Instant",
    },
    {
      name: "Greater Toss Foe",

      functionsLike: {
        name: 'toss foe',
        // This deals an immediate 6d6 if you smash someone against a barrier, which is a lot of damage.
        exceptThat: "the damage increases to 1d10. In addition, the knockback distance increases to 60 feet, or 120 feet on a critical hit.",
      },
      // narrative: '',
      rank: 4,
      scaling: "accuracy",
      type: "Instant",
    },
    {
      name: "Supreme Toss Foe",

      functionsLike: {
        name: 'toss foe',
        // This deals an immediate 12d6 if you smash someone against a barrier, which is a lot of damage.
        exceptThat: "the damage increases to 2d10. In addition, the knockback distance increases to 120 feet, or 240 feet on a critical hit.",
      },
      // narrative: '',
      rank: 7,
      // scaling: "accuracy",
      type: "Instant",
    },

    {
      name: "Telekinetic Lift",

      effect: `
        Choose yourself or one Medium or smaller \\glossterm{unattended} object within \\medrange.
        The target is reduced to half of its normal weight.
        This gives it a +4 \\glossterm{magic bonus} to the Jump skill, if applicable, and makes it easier to lift and move.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +6.`,
        5: `The target is reduced to a quarter of its normal weight. In addition, the bonus increases to +8.`,
        7: `The bonus increases to +10.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Redirect Attacks",

      effect: `
        You immediately take the \\textit{total defense} action.
        In addition, whenever a creature within \\longrange of you misses you with a \\glossterm{strike} this round, that creature treats itself as a target of that strike in addition to any other targets.
        It cannot choose to reduce its accuracy or damage against itself.
      `,
      rank: 3,
      scaling: {
        5: `You gain an additional +1 bonus to all defenses.`,
        7: `The defense bonus increases to +2.`,
      },
      tags: ['Swift'],
      type: "Duration",
    },

    {
      name: "Levitate",

      effect: `
        % TODO: Wording
        As long as you remain within 50 feet above a surface that could support your weight, you float in midair, unaffected by gravity.
        During the movement phase, you can move yourself up to ten feet in any direction as a \\glossterm{move action}.
      `,
      rank: 4,
      scaling: { 6: `The maximum height above the surface increases to 100 feet.` },
      type: "Attune (self)",
    },

    {
      name: "Wall of Force",

      effect: `
        You create a \\smallarealong \\glossterm{wall} of magical energy within \\medrange.
        The wall is visible as a shimmering magical field that does not block sight.
        Nothing can pass through the wall until it is destroyed.

        The wall has \\glossterm{hit points} equal to three times your \\glossterm{power}.
        After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
      `,
      rank: 1,
      scaling: {
        3: `The area increases to a \\medarealong line.`,
        5: `The area increases to a \\largearealong line.`,
        7: `The area increases to a \\hugearealong line.`,
      },
      tags: ["Barrier", "Manifestation"],
      type: "Sustain (attuneable, minor)",
    },

    {
      name: "Forcecage",

      effect: `
        You slowly create a 10 ft.\\ cube of telekinetic force within \\medrange.
        The cage appears at the end of the next round after you cast this spell.
        Before that time, there is no visible indication of where the cage will appear.
        Any physical obstacles in the way of the cage at the time that it forms prevent it from appearing.
        You can create the cube around a sufficiently small creature to trap it inside.
        Each wall is transparent, but it blocks physical passage and \\glossterm{line of effect}.

        The wall has \\glossterm{hit points} equal to three times your \\glossterm{power}.
        After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
      `,
      rank: 7,
      tags: ['Barrier'],
      type: "Sustain (minor)",
    },

    {
      name: "Steal Item",

      attack: {
        hit: `
          You \\glossterm{knockback} the object up to 60 feet towards you.
          You can use a \\glossterm{free hand} to catch the object if it reaches you.
        `,
        // No relevant glance effect
        targeting: `
          Make an attack vs. Reflex against one Small or smaller object within \\medrange.
          If the object is attended by a creature, the attack must also beat the attending creature's Reflex defense.
          If it is held in two hands or well secured, this attack automatically fails.

          After you successfully steal an item from a creature with this spell, it gains a +5 bonus to its defenses against this spell until it takes a \\glossterm{short rest}.
        `,
      },
      rank: 2,
      scaling: "accuracy",
      type: "Instant",
    },

    {
      name: "Greater Steal Item",

      functionsLike: {
        name: 'steal item',
        exceptThat: `
          the attack does not automatically fail if the item is held in two hands, and the maximum size increases to Medium.
        `,
      },
      rank: 5,
      scaling: "accuracy",
      type: "Instant",
    },

    {
      name: "Animated Weapon",

      effect: `
        As a \\glossterm{minor action}, you can make a \\glossterm{strike} with a -3 penalty to \\glossterm{accuracy}.
        This strike is considered a \\glossterm{magical} ability.
        You do not add your \\glossterm{power} to damage with the strike.
      `,
      rank: 4,
      scaling: { 6: `The accuracy penalty is reduced to -2.` },
      type: "Attune (deep, self)",
    },

    {
      name: "Mind Arrow",

      effect: `
        Choose one Tiny or smaller \\glossterm{unattended} projectile within \\longrange.
        You make a \\glossterm{strike} using the projectile against anything within \\longrange.
        This strike is considered a \\glossterm{magical} ability, so you use your Willpower to determine your damage instead of your Strength (see \\pcref{Dice Bonuses From Attributes}).
        The projectile flies directly toward the target instead of originating from your position, which may allow you to avoid \\glossterm{cover} and similar obstacles.
      `,
      rank: 2,
      scaling: {
        4: `The range increases to \\distrange.`,
        6: `The range increases to \\extrange.`,
      },
      type: "Instant",
    },

    {
      name: "Mighty Mind Arrow",

      functionsLike: {
        name: 'mind arrow',
        exceptThat: 'you gain a +1d bonus to damage with the strike.',
      },
      rank: 4,
      scaling: {
        6: `The damage bonus increases to +2d.`,
      },
      type: "Instant",
    },

    {
      name: "Reactive Deflection",

      effect: `
        You gain a +2 bonus to your defenses against ranged \\glossterm{strikes}.
      `,
      rank: 2,
      scaling: {
        4: `The bonus increases to +3.`,
        6: `The bonus increases to +4.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Floating Shield",

      effect: `
        You can hold a buckler or standard shield without using a free hand.
        You still suffer the normal penalties if you are not proficient with it.
      `,
      rank: 4,
      scaling: {
        6: "You are considered to be proficient with the shield.",
      },
      tags: [],
      type: "Attune (deep, self)",
    },

    {
      name: "Distant Grasp",
      attack: {
        hit: `
          The target is \\grappled by telekinetic force.
          You must use the \\textit{maintain grapple} ability each round to maintain the grapple, as normal for grappling.
          You may not use your Strength to maintain the grapple.
        `,
        targeting: `
          Make an attack vs. Fortitude and Reflex against one Large or smaller creature within \\shortrange of you.
        `,
      },
      rank: 6,
      scaling: {
        special: "Your \\glossterm{accuracy} with the attack and with maintaining the grapple increases by +1 for each rank beyond 6.",
      },
      type: "Sustain (minor)",
    },

    {
      name: "Kinetic Shield",

      effect: `
        You gain a +4 \\glossterm{magic bonus} to your \\glossterm{damage resistance}.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +8.`,
        5: `The bonus increases to +16.`,
        7: `The bonus increases to +32.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Kinetic Shield",

      functionsLike: {
        mass: true,
        name: "kinetic shield",
      },
      rank: 3,
      scaling: {
        5: `The bonus increases to +8.`,
        7: `The bonus increases to +16.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Retributive Kinetic Shield",

      effect: `
        You gain a +16 \\glossterm{magic bonus} to \\glossterm{damage resistance}.
        In addition, whenever you resist damage, the attacker takes energy damage equal to half the damage resisted this way.
        If the attacker is beyond \\shortrange of you, this reflection fails.
        Any effect which increases this spell's range increases the range of this effect by the same amount.
      `,
      rank: 5,
      scaling: { 7: `The bonus increases to +32.` },
      type: "Attune (deep, self)",
    },

    {
      name: "Kinetic Shell",

      effect: `
        You surround yourself with two layers of shielding that reduce the power of physical attacks against you.
        Whenever you would take physical damage, you reduce that damage by 5, and one layer of shielding is destroyed.
        When the last layer is destroyed, this ability provides no further benefit.

        If you take simultaneous damage from more sources than you have remaining layers, the remaining layers apply to the largest damage sources, and you take full damage from any lower damage values.
      `,
      rank: 1,
      scaling: {
        3: `The damage reduction increases to 10.`,
        5: `The damage reduction increases to 20.`,
        7: `The damage reduction increases to 40.`,
      },
      tags: ["Manifestation"],
      type: "Attune (deep, self)",
    },

    {
      name: "Repulsion Field",

      attack: {
        crit:
          "You also \\glossterm{knockback} each target 20 feet in the direction that it tried to enter the area from.",
        glance:
          "The effect on the creature lasts \\glossterm{briefly}, allowing the creature to freely enter the zone after that time.",
        hit: `
          Each target is unable to enter the spell's area with any part of its body for the duration of the spell.
          The rest of its movement in the current phase is cancelled.
        `,
        targeting: `
          When you cast this spell, you create a repulsive field in a \\smallarea radius \\glossterm{zone} from your location.
          Whenever an enemy makes physical contact with the spell's area, you make an attack vs. Mental against it.
          Creatures in the area at the time that the spell is cast are unaffected by the spell.
        `,
      },
      rank: 4,
      scaling: "accuracy",
      type: "Sustain (minor)",
    },
  ],
  rituals: [
  ],
};
