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
        You can telekinetically control the subject object as if you were holding it in an extra hand.
        Any attacks you make with the object or checks you make to manipulate the object have a maximum bonus equal to your \\glossterm{power}.
        At the end of each round, if the subject is outside of this ability's range, this ability ends.

        During the movement phase, you can move the subject up to five feet in any direction.
        You use your \\glossterm{power} instead of your Strength to determine your \\glossterm{carrying capacity} when moving objects in this way (see \\pcref{Weight Limits}).
      `,
      focus: false,
      scaling: {
        2: `You can move the subject up to ten feet in any direction.`,
        4: `The range increases to \\medrange.`,
        6: `You can move the subject up to thirty feet in any direction.`,
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
      focus: false,
      scaling: {
        2: `The force increases to lift a Tiny weight object, or to push a Small weight object.`,
        4: `The range increases to \\longrange`,
        6: `The force increases to lift a Small weight object, or to push a Medium weight object.`,
      },
      type: "Sustain (minor)",
    },
  ],
  spells: [
    {
      name: "Interposing Force",

      attack: {
        crit: `the difficulty rating of the Strength check increases by 10.`,
        hit: `As a \\glossterm{condition}, the subject is unable to move closer to you without effort.
        This does not impede its movement unless its movement would decrease the distance between it and you.
        As part of movement, it can make a Strength check with a \\glossterm{difficulty rating} of 5.
        If it succeeds, it can move towards you at half speed.`,
        targeting: `
        Make an attack vs. Mental against one creature within \\longrange.
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
        exceptThat: "the \\glossterm{difficulty rating} of the Strength check increases to 20.",
      },
      rank: 6,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Force Slam",

      attack: {
        hit: `The subject takes 1d10 + \\glossterm{power} bludgeoning damage.`,
        targeting: `
          Make an attack vs. Armor against anything within \\medrange.
        `,
      },
      rank: 1,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Force Slam",

      attack: {
        hit: `The subject takes 4d6 + \\glossterm{power} bludgeoning damage.`,
        targeting: `
          Make an attack vs. Armor against anything within \\longrange.
        `,
      },
      rank: 4,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Supreme Force Slam",

      attack: {
        hit: `The subject takes 6d10 + \\glossterm{power} bludgeoning damage.`,
        targeting: `
          Make an attack vs. Armor against anything within \\distrange.
        `,
      },
      rank: 7,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Force Lance",

      attack: {
        hit: `Each subject takes 1d8 + half \\glossterm{power} piercing damage.`,
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
        hit: `Each subject takes 2d10 + half \\glossterm{power} piercing damage.`,
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
        hit: `Each subject takes 5d10 + half \\glossterm{power} piercing damage.`,
        targeting: `
          Make an attack vs. Armor against everything in a \\largearealong, 10 ft. wide line from you.
        `,
      },
      rank: 7,
      type: "Instant",
    },

    {
      name: "Force Extension",

      castingTime: "minor action",
      effect: `
        Melee weapons you wield gain a +5 foot \\glossterm{magic bonus} to \\glossterm{reach}.
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

      castingTime: "minor action",
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
        crit: `The subject is \\decelerated instead of slowed.`,
        hit: `The subject is \\slowed as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against one Large or smaller target within \\medrange.
        `,
      },

      rank: 1,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Reload",

      castingTime: "minor action",
      effect: `
        This spell does not have \\glossterm{somatic components}.
        You reload any projectile weapon you wield with ammunition easily accessible on your body.
      `,
      rank: 2,
      scaling: {
        4: `This spell no longer has the \\abilitytag{Focus} tag.`,
        6: `You can cast this spell as a \\glossterm{free action}.
            However, you can only cast it once per round.`,
      },
      type: "Instant",
    },

    {
      name: "Mass Kinetic Impedance",

      attack: {
        crit: "The effect becomes a \\glossterm{condition} on each subject.",
        hit: `Each subject is \\glossterm{briefly} \\slowed.`,
        targeting: `
          Make an attack vs. Mental against all Large or smaller creatures in a \\areasmall radius within \\medrange.
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
        glance: `Half damage, and each subject moves half as far.`,
        hit: `You \\glossterm{knockback} each subject up to 15 feet in a straight line away from you.
        Moving a target upwards costs twice the normal movement cost.
        If the subject impacts a solid object before the maximum distance, it stops moving and both it and the object take bludgoning damage equal to 2d6 + half \\glossterm{power} instead of the normal knockback damage.
        Any individual object or creature can only take damage once in this way, even if it is hit by multiple targets that are knocked flying.`,
        targeting: `
          Make an attack vs. Mental against everything in a \\areasmall radius from you.
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
          the damage increases to 4d6 + half \\glossterm{power}, and the area increases to a \\largearea radius.
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
          You \\glossterm{push} the subject up to 30 feet in a straight line away from you.
          If the subject impacts a solid object before the maximum distance, it stops moving and both it and the object take bludgoning damage equal to 2d8 + \\glossterm{power}.
          Any individual object or creature can only take damage once in this way, even if it is hit by multiple targets that are knocked flying.
        `,
        targeting: `
          Make an attack vs. Mental against one Large or smaller object within \\medrange of you.
        `,
      },
      rank: 3,
      type: "Instant",
    },

    {
      name: "Greater Distant Shove",
      functionsLike: {
        name: 'distant shove',
        exceptThat: "the damage increases to 4d10, and the maximum size increases to Huge.",
      },
      rank: 6,
      type: "Instant",
    },

    {
      name: "Toss Foe",

      attack: {
        hit: `The subject takes 1d6 bludgeoning damage.
        If it loses \\glossterm{hit points} from this damage, you \\glossterm{knockback} it up to 30 feet in any direction (see \\pcref{Knockback Effects}).
        Moving the subject upwards costs twice the normal movement cost.`,
        targeting: `
          Make an attack vs. Mental against anything Large or smaller within \\medrange.
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
        exceptThat: "the damage increases to 2d6. In addition, the knockback distance increases to 60 feet, or 120 feet on a critical hit.",
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
        exceptThat: "the damage increases to 4d6. In addition, the knockback distance increases to 120 feet, or 240 feet on a critical hit.",
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
        The subject is reduced to half of its normal weight.
        This gives it a +4 \\glossterm{magic bonus} to the Jump skill, if applicable, and makes it easier to lift and move.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +6.`,
        5: `The subject is reduced to a quarter of its normal weight. In addition, the bonus increases to +8.`,
        7: `The bonus increases to +10.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Redirect Attacks",

      focus: false,
      effect: `
        This spell does not have the \\glossterm{Focus} tag.
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
        You create a wall of magical energy within \\medrange.
        You can choose the dimensions of the wall, up to a maximum of a 15 ft.\\ high, \\smallarea length line.
        If you create the wall within a space too small to hold it, it fills as much of the space as possible, starting from the middle of the chosen space.
        This can allow you to completely block off small tunnels.
        The wall is visible as a shimmering magical field that does not block sight.
        Nothing can pass through the wall until it is destroyed.
        Each 5-ft.\\ square of wall has \\glossterm{hit points} equal to twice your \\glossterm{power}.
      `,
      rank: 1,
      scaling: {
        3: `The \\glossterm{hit points} of each 5-ft.\\ square increases to be equal to three times your \\glossterm{power}.`,
        5: `The area increases to a \\medarealong line.`,
        7: `The \\glossterm{hit points} of each 5-ft.\\ square increases to be equal to four times your \\glossterm{power}.`,
      },
      tags: ["Manifestation"],
      type: "Sustain (minor)",
    },

    {
      name: "Forcecage",

      effect: `
        You slowly create a 10 ft.\\ cube of telekinetic force within \\medrange.
        The cage appears at the end of the next round after you cast this spell.
        Before that time, there is no visible indication of where the cage will appear, but its location can be observed with a \\glossterm{difficulty rating} 25 Spellsense check (see \\pcref{Spellsense}).
        Any physical obstacles in the way of the cage at the time that it forms prevent it from appearing.
        You can create the cube around a sufficiently small creature to trap it inside.
        Each wall is transparent, but blocks physical passage and \\glossterm{line of effect}.
        Each five-foot square of wall has hit points equal to twice your \\glossterm{power}, and all of its defenses are 0.
      `,
      rank: 7,
      type: "Sustain (minor)",
    },

    {
      name: "Steal Item",

      attack: {
        hit: `
          You \\glossterm{knockback} the object up to 60 feet towards you.
          You can use a \\glossterm{free hand} to catch the object if it reaches you.
        `,
        targeting: `
          Make an attack vs. Reflex against one Small or smaller object within \\medrange.
          If the object is attended by a creature, the attack must also beat the attending creature's Reflex defense.
          If it is held in two hands or well secured, this attack automatically fails.

          After you successfully steal an item from a creature with this spell, it gains a +5 bonus to defenses against this spell until it takes a \\glossterm{short rest}.
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
        You take a -2d damage penalty with the strike, and you do not add your \\glossterm{power} to damage with the strike.
      `,
      rank: 4,
      scaling: { 6: `The accuracy penalty is reduced to -2.` },
      type: "Attune (self)",
    },

    {
      name: "Mind Arrow",

      effect: `
        Choose one Tiny or smaller \\glossterm{unattended} projectile within \\longrange.
        You make a \\glossterm{strike} using the projectile against anything within \\longrange.
        This strike is considered a \\glossterm{magical} ability, so you add your magical \\glossterm{power} to damage with the strike instead of your \\glossterm{mundane} power.
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

      castingTime: "minor action",
      effect: `
        You gain a +1 \\glossterm{magic bonus} to Armor defense.
        In addition, you gain a +2 bonus to all defenses against \\glossterm{mundane} ranged attacks from weapons or projectiles that are Small or smaller.
      `,
      rank: 1,
      scaling: {
        3: `The bonus to Armor defense increases to +2.`,
        5: `The bonus to Armor defense increases to +3.`,
        7: `The bonus to Armor defense increases to +4.`,
      },
      type: "Attune (self)",
    },
  ],
  rituals: [],
};
