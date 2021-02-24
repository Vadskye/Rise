import { MysticSphere } from ".";

export const thaumaturgy: MysticSphere = {
  name: "Thaumaturgy",
  shortDescription: "Suppress and manipulate magical effects.",
  sources: ["arcane"],

  cantrips: [
    {
      name: "Sense Magic",

      effect: `
        You gain a +4 bonus to the Spellsense skill until the end of the next round.
      `,
      focus: false,
      scaling: {
        2: `The bonus increases to +6.`,
        4: `The bonus increases to +8.`,
        6: `The bonus increases to +10.`,
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

      effect: `
        Anything within \\medrange takes 1d6 energy damage.
      `,
      narrative: `
        An unerring projectile made of pure magical energy streaks towards your foe, inflicting damage unavoidably.
      `,
      rank: 1,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Magic Missile Flurry",

      effect: `
        Everything in a \\smallarea radius within \\medrange takes 1d8 energy damage.
      `,
      narrative: `
        A barrage of unerring projectiles made of pure magical energy streak towards an area, inflicting damage unavoidably.
      `,
      rank: 3,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Magic Missile Storm",

      effect: `
        All \\glossterm{enemies} in a \\medarea radius within \\longrange take 2d8 energy damage.
      `,
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
      name: "Deattunement",

      attack: {
        crit: `The subject stops being \\glossterm{attuned} to two abilities of its choice that it is currently attuned to.
        In addition, as a \\glossterm{condition}, it becomes unable to \\glossterm{attune} to any additional abilities.`,
        hit: `The subject stops being \\glossterm{attuned} to one effect of its choice that it is currently attuned to.`,
        targeting: `
          Make an attack vs. Fortitude with a +2 bonus to \\glossterm{accuracy} against one creature within \\medrange.
        `,
      },
      rank: 3,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Reattunement",

      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The subject can reattune to one ability that it stopped being attuned to since the start of the last round without spending an additional \\glossterm{attunement point}.
        Any choices and effects of the attuned ability are restored to their exact state before the attunement was broken.
      `,
      rank: 3,
      scaling: {
        5: `You can target an additional ally within range.`,
        7: `You can target an additional ally within range.`,
      },
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
          It also does not include \\glossterm{Curse} effects, which are more difficult to remove.
          The target's defense against this attack is equal to its \\glossterm{power}.

          This spell cannot be used to interrupt or negate immediate effects.
          Identifying non-visual magical effects to target with this spell may require the use of the Spellsense skill (see \\pcref{Spellsense}).
        `,
      },

      rank: 2,
      scaling: "accuracy",
      type: "Sustain (minor)",
    },

    {
      name: "Dispel Magic",

      functionsLike: {
        exceptThat: `
          on a hit, the effect ends completely instead of being suppressed.
          If the effect required attunement, that attunement is broken.
        `,
        spell: "suppress magic",
      },
      rank: 4,
      scaling: "accuracy",
      type: "Instant",
    },

    {
      name: "Malign Transferance",

      // original targets: ['Yourself or an \\glossterm{ally} within \\medrange', 'One other creature within that range']
      attack: {
        crit: `You can transfer any number of magical conditions in this way.`,
        // No glance effect; weird shenanigans if you autoremove the conditions
        hit: `One magical condition of your choice is removed from yourself or your chosen ally and applied to the struck creature.`,
        targeting: `
          Choose yourself or one \\glossterm{ally} within \\medrange that is currently affected by a \\glossterm{magical} condition.
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
        crit: `You can transfer any number of magical conditions in this way.`,
        // No glance effect; weird shenanigans if you autoremove the conditions
        hit: `One magical condition of your choice is removed from each chosen creature and applied to the struck creature.`,
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
      name: "Spell Absoption",

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
        spell: "Enhance Magic",
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
        It also does not include \\glossterm{Curse} effects, which are more difficult to remove.

        Unlike most emanation spells, you cannot exclude yourself from this \\glossterm{emanation}.
        However, this spell does not supress itself.
      `,
      rank: 7,
      type: "Sustain (standard)",
    },

    {
      name: "Dimensional Anchor",

      attack: {
        glance: "The effect lasts until the end of the next round.",
        hit: `The subject is unable to travel extradimensionally.
        This prevents all \\glossterm{Manifestation} effects and effects that teleport the subject or move it between planes.`,
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
        This spell creates a dimensional lock in a \\medarea radius \\glossterm{zone} from your location.
        Extraplanar travel into or out of the area is impossible.
        This prevents all \\glossterm{Manifestation} effects and effects teleport targets or move them between planes.
      `,
      rank: 5,
      scaling: { 7: `The area increases to a \\largearea radius \\glossterm{zone}.` },
      type: "Attune (self)",
    },

    {
      name: "Teleportation Ward",

      effect: `
        Teleportation into and out of a \\medarea radius \\glossterm{emanation} from you is impossible.
        Any abilities which would cause creatures to teleport within the area have no effect.
      `,
      rank: 4,
      scaling: { 6: `The area increases to a \\largearea radius \\glossterm{emanation}.` },
      type: "Attune (self)",
    },

    {
      name: "Absorb Magic",

      effect: `
        You gain a +2 bonus to defenses against \\glossterm{magical} effects.
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
        crit: `The effect ends after the subject miscasts three spells instead of only one.`,
        hit: `As a \\glossterm{condition}, the next time the subject tries to cast a spell, the spell automatically fails with no effect instead.
        When the subject fails to cast a spell in this way, this effect ends.`,
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
        Whenever a creature or object would teleport into a \\largearea radius \\glossterm{emanation} from you, that teleportation is delayed by a round.
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
        Choose a \\medarea radius \\glossterm{zone} within \\longrange.
        Whenever a creature casts a spell in the area, that spell has a 50\\% chance to fail with no effect.
      `,
      narrative: `
        You break an area's connection to magic.
      `,
      rank: 4,
      scaling: { 6: `The area increases to a \\largearea radius.` },
      type: "Sustain (minor)",
    },

    {
      name: "Cryptic Spells",

      effect: `
        Whenever you cast a spell, you may choose a different spell you know.
        If you do, the visual effects and magical aura of the spell they are casting change to match your chosen spell.
        This affects inspection of the spell itself by any means, such as with the Spellsense skill (see \\pcref{Spellsense}).
        However, it does not alter the mechanical effects of the spell in any way.

        An observer can make a Spellsense check with a \\glossterm{difficulty rating} of 15 \\add your magical \\glossterm{power} to identify the spell's true nature.
        If the spell's effects depend on visual components, the spell may fail to work if the subject alters the spell's visuals too much.
      `,
      rank: 2,
      scaling: {
        4: `You also gain a +1 \\glossterm{magic bonus} to \\glossterm{accuracy} with spells.`,
        6: `The accuracy bonus increases to +2.`,
      },
      type: "Attune (target)",
    },
  ],
  rituals: [
    {
      name: "Dispel Curse",

      castingTime: "24 hours",
      effect: `
        All curses affecting yourself or one \\glossterm{ally} within \\medrange are removed.
        This ritual cannot remove a curse that is part of the effect of an item the subject has equipped.
        However, it can allow the subject to remove any cursed items it has equipped.
      `,
      rank: 3,
      type: "Instant",
    },
  ],
};
