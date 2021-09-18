import { MysticSphere } from ".";

export const thaumaturgy: MysticSphere = {
  name: "Thaumaturgy",
  shortDescription: "Suppress and manipulate magical effects.",
  sources: ["arcane", "domain"],

  cantrips: [
    {
      name: "Sense Magic",

      effect: `
        You \\glossterm{briefly} gain a +3 \\glossterm{magic bonus} to the Spellsense skill.
      `,
      focus: false,
      scaling: {
        2: `The bonus increases to +4.`,
        4: `The bonus increases to +5.`,
        6: `The bonus increases to +6.`,
      },
      type: "Duration",
    },

    {
      name: "Sense Magical Potential",

      effect: `
        You discern whether one creature within \\shortrange has any \\glossterm{magical} abilities.
        This does not give you any information about the nature of those magical abilities.
      `,
      focus: false,
      scaling: {
        2: `You can also discern whether the subject has the ability to cast spells of any kind.`,
        4: `You can also discern which \\glossterm{magic sources} the subject has access to, if they have access to any.`,
        6: `You can also discern which \\glossterm{mystic spheres} the subject has access to, if they have access to any.`,
      },
      type: "Instant",
    },
  ],
  spells: [
    {
      name: "Magic Missile",

      // -2d, -1 range level in exchange for the strong miss effect
      attack: {
        hit: `
          The subject takes 1d6 + \\glossterm{power} energy damage.
          \\miss The subject takes 1d6 energy damage.
        `,
        targeting: `
          Make an attack vs. Armor against anything within \\shortrange.
        `,
      },
      narrative: `
        An unerring projectile made of pure magical energy streaks towards your foe, inflicting damage unavoidably.
      `,
      rank: 1,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Magic Missile",

      // -2d, -1 range level in exchange for the strong miss effect
      attack: {
        hit: `
          The subject takes 2d8 + \\glossterm{power} energy damage.
          \\miss The subject takes 2d8 energy damage.
        `,
        targeting: `
          Make an attack vs. Armor against anything within \\medrange.
        `,
      },
      narrative: `
        An unerring projectile made of pure magical energy streaks towards your foe, inflicting severe damage unavoidably.
      `,
      rank: 4,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Supreme Magic Missile",

      // -2d, -1 range level in exchange for the strong miss effect
      attack: {
        hit: `
          The subject takes 4d10 + \\glossterm{power} energy damage.
          \\miss The subject takes 4d10 energy damage.
        `,
        targeting: `
          Make an attack vs. Armor against anything within \\longrange.
        `,
      },
      narrative: `
        An unerring projectile made of pure magical energy streaks towards your foe, inflicting massive damage unavoidably.
      `,
      rank: 7,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Magic Missile Storm",

      // -2d, -1 range level in exchange for the strong miss effect
      attack: {
        hit: `
          Each subject takes 1d8 + half \\glossterm{power} energy damage.
          \\miss Each subject takes 1d8 energy damage.
        `,
        targeting: `
          Make an attack vs. Armor against all \\glossterm{enemies} in a \\smallarea radius within \\shortrange.
        `,
      },
      narrative: `
        A barrage of unerring projectiles made of pure magical energy streak towards an area, inflicting damage unavoidably.
      `,
      rank: 3,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Magic Missile Storm",

      // -2d, -1 range level in exchange for the strong miss effect
      attack: {
        hit: `
          The subject takes 2d8 + half \\glossterm{power} energy damage.
          \\miss Each subject takes 2d8 energy damage.
        `,
        targeting: `
          Make an attack vs. Armor against all \\glossterm{enemies} in a \\medarea radius within \\longrange.
        `,
      },
      narrative: `
        A massive barrage of unerring projectiles made of pure magical energy streak towards your foes, inflicting damage unavoidably.
      `,
      rank: 6,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Alter Magic Aura",

      attack: {
        // No crit effect
        hit: `One of the subject's magic auras is altered (see \\pcref{Spellsense}).
        You can change the \\glossterm{ability tags} the aura has.
        In addition, you can decrease the \\glossterm{power} of the aura by up to half your power, or increase the power of the aura up to a maximum of your power.`,
        targeting: `
          Make an attack vs. Mental against one Large or smaller \\glossterm{magical} object within \\medrange.
        `,
      },
      rank: 1,
      scaling: "accuracy",
      type: "Attune (self)",
    },

    {
      name: "Suppress Item",

      attack: {
        crit: "You can sustain this spell as a \\glossterm{free action}.",
        hit: `All magical properties the subject has are \\glossterm{suppressed}.`,
        targeting: `
          Make an attack vs. Mental with a +2 \\glossterm{accuracy} bonus against one Large or smaller \\glossterm{magical} object within \\longrange.
          If the object is attended by a creature, the attack must also beat the attending creature's Mental defense.
        `,
      },
      rank: 1,
      scaling: "accuracy",
      type: "Sustain (minor)",
    },

    {
      name: "Dismissal",

      attack: {
        // no relevant crit effect
        hit: `The subject is treated as if the ability that created it was \\glossterm{dismissed}.
        This usually causes the subject to disappear.`,
        targeting: `
        Make an attack against anything within \\medrange.
        If the target is an effect of an ongoing \\glossterm{magical} ability, such as a summoned monster or created object, its defense against this attack is equal to the \\glossterm{power} of the ability.
        Otherwise, this spell has no effect.
        `,
      },

      rank: 2,
      scaling: "accuracy",
      type: "Instant",
    },

    {
      name: "Suppress Magic",

      attack: {
        hit: `The effect is \\glossterm{suppressed} as long as you \\glossterm{sustain} this ability.`,
        targeting: `
          Make an attack against one \\glossterm{magical} effect that is dismissable or has a duration within \\medrange.
          This includes attuned spells and magic items, magical conditions, and sustained magical effects.
          However, it does not include passive magical abilities on creatures, such as the ability to cast spells.
          It also does not include \\abilitytag{Curse} effects, which are more difficult to remove.
          The target's defense against this attack is equal to 5 \\add its \\glossterm{rank}.
          For effects that have no specific rank, such as magic items, treat their rank as being equal to one third of their level.

          This spell cannot be used to interrupt or negate immediate effects, such as spells being cast simultaneously.
          Identifying non-visual magical effects to target with this spell may require the use of the Spellsense skill (see \\pcref{Spellsense}).
        `,
      },

      rank: 2,
      scaling: "accuracy",
      type: "Sustain (minor)",
    },

    {
      name: "Greater Suppress Magic",

      functionsLike: {
        name: 'suppress magic',
        exceptThat: `
          it can also affect \\glossterm{Curse} effects, and the range increases to \\distrange.
        `,
      },
      rank: 5,
      scaling: "accuracy",
      type: "Sustain (minor)",
    },

    {
      name: "Dispel Magic",

      functionsLike: {
        exceptThat: `
          on a hit, the effect ends completely instead of being suppressed.
          This has no effect on abilities that require \\glossterm{attunement}.
        `,
        name: "suppress magic",
      },
      rank: 4,
      scaling: "accuracy",
      type: "Instant",
    },

    {
      name: "Malign Transferance",

      // original targets: ['Yourself or an \\glossterm{ally} within \\medrange', 'One other creature within that range']
      attack: {
        crit: `The effect becomes a \\glossterm{condition} on the struck creature.`,
        // No glance effect; weird shenanigans if you autoremove the conditions
        hit: `
          One magical condition of your choice is removed from yourself or your chosen ally.
          In addition, the struck creature \\glossterm{briefly} suffers the effect of the removed condition.
        `,
        targeting: `
          Choose yourself or one \\glossterm{ally} within \\medrange that is currently affected by a \\glossterm{magical} \\glossterm{condition}.
          In addition, make an attack vs. Mental against one other creature within \\medrange.
        `,
      },
      rank: 4,
      scaling: "accuracy",
      type: "Instant",
    },

    {
      name: "Malign Confluence",

      attack: {
        crit: `Each transferred effect becomes a separate \\glossterm{condition} on the struck creature.`,
        // No glance effect; weird shenanigans if you autoremove the conditions
        hit: `
          One magical condition of your choice is removed from each of the five chosen creatures.
          In addition, the struck creature \\glossterm{briefly} suffers the effects of each removed condition. 
        `,
        targeting: `
          Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
          Each chosen creature must be currently affected by a \\glossterm{magical} condition.
          In addition, make an attack vs. Mental against one other creature within \\medrange.
        `,
      },

      rank: 7,
      type: "Instant",
    },

    {
      name: "Spell Absorption",

      effect: `
        Whenever you are targeted by a spell cast by another creature, before determining if it hits you, you absorb the spell.
        It has no effect on you.
        You cannot voluntarily allow spells cast by other creatures to affect you while this effect lasts.
        After you absorb three spells in this way, this effect ends.
      `,
      rank: 7,
      type: "Attune (self)",
    },

    {
      name: "Enhance Magic",

      castingTime: "minor action",
      effect: `
        You gain a +2 \\glossterm{magic bonus} to your \\glossterm{magical} \\glossterm{power}.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +4.`,
        5: `The bonus increases to +8.`,
        7: `The bonus increases to +16.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Enhance Magic",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        name: "Enhance Magic",
      },
      // narrative: '',
      rank: 3,
      scaling: {
        5: `The bonus increases to +4.`,
        7: `The bonus increases to +8.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Antimagic Field",

      effect: `
        You radiate an antimagic field within a \\smallarea radius \\glossterm{emanation} from you.
        All \\glossterm{magical} effects within the area that are dismissable or have a duration are \\glossterm{suppressed}.
        This includes attuned spells and magic items, magical conditions, and sustained magical effects.
        However, it does not include passive magical abilities on creatures, such as the ability to cast spells.
        It also does not include \\abilitytag{Curse} effects, which are more difficult to remove.

        Unlike most emanation spells, you cannot exclude yourself from this \\glossterm{emanation}.
        However, this spell does not supress itself.
      `,
      rank: 7,
      type: "Sustain (standard)",
    },

    {
      name: "Dimensional Anchor",

      attack: {
        glance: "The effect lasts \\glossterm{briefly}.",
        hit: `The subject is unable to travel extradimensionally.
        This prevents all \\abilitytag{Manifestation} effects and effects that teleport the subject or move it between planes.`,
        targeting: `
          Make an attack vs. Mental with a +2 bonus to \\glossterm{accuracy} against anything within \\longrange.
        `,
      },

      rank: 3,
      scaling: "accuracy",
      type: "Sustain (minor)",
    },

    {
      name: "Dimensional Lock",

      effect: `
        This spell creates a dimensional lock in a \\largearea radius \\glossterm{zone} from your location.
        Extraplanar travel into or out of the area is impossible.
        This prevents all \\abilitytag{Manifestation} effects and effects teleport targets or move them between planes.
      `,
      rank: 5,
      scaling: { 7: `The area increases to a \\hugearea radius \\glossterm{zone}.` },
      type: "Attune (self)",
    },

    {
      name: "Teleportation Ward",

      effect: `
        Teleportation into and out of a \\medarea radius \\glossterm{emanation} from you is impossible.
        Any abilities which would cause creatures to teleport within the area have no effect.
      `,
      rank: 3,
      scaling: {
        5: `The area increases to a \\largearea radius \\glossterm{emanation}.`,
        7: `The area increases to a \\hugearea radius \\glossterm{emanation}.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Absorb Magic",

      effect: `
        You gain a +2 bonus to your defenses against \\glossterm{magical} effects.
        In addition, the next time a \\glossterm{magical} attack beats your defenses, it has no effect on you.
        After you negate two attacks in this way, this spell's effect ends.
      `,
      rank: 6,
      type: "Attune (self)",
    },

    {
      name: "Second Mind",

      effect: `
        Choose a \\glossterm{magical} ability you are currently sustaining that requires either a \\glossterm{free action} or a \\glossterm{minor action} to sustain.
        That ability is automatically sustained as long as this effect lasts.
        This can allow you to sustain that ability for longer than 5 minutes.
        This does not allow you to make any choices as part of sustaining the chosen ability, such as telling summoned creatures how to act.
        Instead, you always make the same choice you made the last time you manually sustained the effect.
      `,
      rank: 4,
      scaling: {
        6: `Whenever you sustain an ability with this effect, you can also make any relevant choices as part of sustaining the ability.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Spellseal",

      attack: {
        crit: `The effect ends after the subject fails to cast three spells instead of only one.`,
        hit: `As a \\glossterm{condition}, the next time the subject tries to cast a spell, the spell automatically fails with no effect instead.
        When the subject fails to cast a spell in this way, this effect ends, and the subject becomes immune to this spell until it takes a \\glossterm{short rest}.`,
        targeting: `
        Make an attack vs. Fortitude with a +2 bonus to \\glossterm{accuracy} against one creature within \\medrange.
        `,
      },
      rank: 2,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Delay Teleportation",

      castingTime: "minor action",
      effect: `
        Whenever a creature or object would teleport into a \\largearea radius \\glossterm{emanation} from you from outside of that area, that teleportation is delayed by a round.
        The teleporting creature or object remains stuck in the Astral Plane and can take no actions during that time.
        Creatures delayed in this way do not experience a delay, though they may be able to deduce that they were delayed based on observable evidence.

        Whenever something is delayed in this way, you learn its approximate size and location within the area, allowing you to know which space or spaces it will occupy when it arrives.
        Creatures and objects delayed by this effect remain delayed even if you move such that their destination is no longer within the area of this effect.
        This does not affect teleportation away from the area unless that teleportation's destination lies within the area.
      `,
      rank: 4,
      scaling: { 6: `The delay increases to two rounds.` },
      type: "Attune (self)",
    },

    {
      name: "Spellward",

      effect: `
        Choose a \\glossterm{zone} within \\longrange.
        You can choose this spell's radius, up to a maximum of a \\largearea radius.
        Whenever a creature casts a spell in the area, that spell has a 50\\% chance to fail with no effect.
      `,
      narrative: `
        You break an area's connection to magic.
      `,
      rank: 5,
      scaling: { 7: `The maximum area increases to a \\hugearea radius.` },
      type: "Sustain (minor)",
    },

    {
      name: "Cryptic Spells",

      effect: `
        Whenever you cast a spell, you may choose a different spell you know.
        If you do, the visual effects and magical aura of the spell you are casting change to match your chosen spell.
        This affects inspection of the spell itself by any means, such as with the Spellsense skill (see \\pcref{Spellsense}).
        However, it does not alter the mechanical effects of the spell in any way.

        An observer can make a Spellsense check with a \\glossterm{difficulty value} of 15 \\add half your level to identify the spell's true nature.
        If the spell's effects depend on visual components, the spell may fail to work if the subject alters the spell's visuals too much.
      `,
      rank: 3,
      scaling: {
        5: `
          You can also alter your \\glossterm{verbal components} when casting spells.
          You must still make the same amount of noise, but you can make any noise of your choosing instead of the spell's normal verbal components.
        `,
        7: `
          The difficulty value to identify the spell's true nature increases to 25 \\add half your level.
        `,
      },
      type: "Attune (self)",
    },

    {
      name: "Reflect Magic",

      focus: false,
      effect: `
        This spell does not have the \\glossterm{Focus} tag.
        You immediately take the \\textit{total defense} action.
        In addition, whenever a creature within \\medrange of you misses you with a \\glossterm{magical} attack this round, that creature treats itself as a target of that strike in addition to any other targets.
        It cannot choose to reduce its accuracy or damage against itself.

        This is a \\glossterm{Swift} ability, so it affects any abilities targeting you in the phase you cast this spell.
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
      name: "Reflect Targeted Magic",

      focus: false,
      effect: `
        This spell does not have the \\glossterm{Focus} tag.
        You immediately take the \\textit{total defense} action.
        In addition, any \\glossterm{targeted} \\glossterm{magical} abilities that would target you until the end of the round are redirected to target the creature using that ability instead of you.
        It cannot choose to reduce its accuracy or damage against itself.
        Any other targets of the ability are affected normally.

        This is a \\glossterm{Swift} ability, so it affects any abilities targeting you in the phase you cast this spell.
      `,
      rank: 5,
      scaling: {
        7: `You gain an additional +1 bonus to all defenses.`,
      },
      tags: ['Swift'],
      type: "Duration",
    },
  ],
  rituals: [
    {
      name: "Dispel Curse",

      castingTime: "24 hours",
      effect: `
        Choose yourself or one \\glossterm{ally} within \\shortrange.
        All curses affecting the subject are removed.
        This ritual cannot remove a curse that is part of the effect of an item the subject has equipped.
        However, it can allow the subject to remove any cursed items it has equipped.
      `,
      rank: 3,
      type: "Instant",
    },
    {
      name: "Suppress Magic Aura",

      castingTime: "one minute",
      effect: `
        Choose one \\glossterm{ally} or \\glossterm{unattended} object within \\shortrange.
        All magical effects on the subject, including any magic items a subject creature wears or carries, are undetectable with the Spellsense skill and similar abilities that detect magic.
      `,
      rank: 2,
      type: "Attune (ritual)",
    },
    {
      name: "Permanent Suppress Magic Aura",

      castingTime: "24 hours",
      effect: `
        Choose one Large or smaller \\glossterm{unattended} object within \\shortrange.
        All magical effects on the subject are undetectable with the Spellsense skill and similar abilities that detect magic.
        This effect is permanent.
      `,
      rank: 4,
      type: "Duration",
    },
    {
      name: "Create Magic Aura",

      castingTime: "one minute",
      effect: `
        Choose one \\glossterm{ally} or \\glossterm{unattended} object within \\shortrange.
        In addition, choose any \\glossterm{mystic sphere} you have access to and any \\glossterm{power}, up to a maximum of twice your \\glossterm{power}.
        The subject appears to have a magical effect on it that is detectable with abilities like the Spellsense skill (see \\pcref{Spellsense}).
        The ability's power is equal to your chosen power, and it appears to be from the mystic sphere you chose.
      `,
      rank: 1,
      type: "Attune (ritual)",
    },
    {
      name: "Greater Create Magic Aura",

      castingTime: "one minute",
      functionsLike: {
        exceptThat: 'you can choose any mystic sphere, not just a mystic sphere you have access to.',
        name: 'create magic aura',
      },
      rank: 3,
      type: "Attune (ritual)",
    },
    {
      name: "Analyze Magic",

      castingTime: "one hour",
      effect: `
        Make a Spellsense check with a +10 bonus.
      `,
      rank: 2,
      type: "Instant",
    },
    {
      name: "Greater Analyze Magic",

      castingTime: "one hour",
      effect: `
        Make a Spellsense check with a +15 bonus.
      `,
      rank: 4,
      type: "Instant",
    },
    {
      name: "Supreme Analyze Magic",

      castingTime: "one hour",
      effect: `
        Make a Spellsense check with a +20 bonus.
      `,
      rank: 6,
      type: "Instant",
    },
  ],
};
