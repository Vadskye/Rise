import { MysticSphere } from ".";

export const chronomancy: MysticSphere = {
  name: "Chronomancy",
  shortDescription: "Manipulate the passage of time to inhibit foes and aid allies.",
  sources: ["arcane", "pact"],

  cantrips: [
    {
      name: "Accelerated Reading",

      effect: `
        You can read at twice your normal speed.
        However, the mental effort imposes a -4 penalty to Mental defense.
      `,
      focus: false,
      scaling: {
        2: "You can read at four times your normal speed.",
        4: "You can read at six times your normal speed.",
        6: "You can read at ten times your normal speed.",
      },
      type: "Sustain (free)",
    },
    {
      name: "Accelerated Search",

      effect: `
        Make an Awareness check to notice things in a single 10-ft.\\ squrae within 10 feet of you.
        You gain a +4 bonus to this check.
      `,
      focus: false,
      scaling: {
        2: "The bonus increases to +6.",
        4: "The bonus increases to +8.",
        6: "The bonus increases to +10.",
      },
      type: "Instant",
    },
    {
      name: "Rapid Aging",

      effect: `
        Choose one Large or smaller \\glossterm{unattended}, nonmagical object within \\medrange.
        In addition, choose any number of hours, up to 24 hours.
        The subject ages as if that much time had passed.
        When this spell ends, the object returns to its original state.
      `,
      focus: false,
      scaling: {
        2: "You can choose to age the target by up to a week.",
        4: "You can choose to age the target by up to a month.",
        6: "You can choose to age the target by up to three months.",
      },
      type: "Sustain (minor)",
    },
  ],
  spells: [
    {
      name: "Slowing Curse",

      attack: {
        crit: `The effect lasts until the curse is removed.`,
        glance: `The effect lasts until the end of the next round.`,
        hit: `The subject is \\slowed until it takes a \\glossterm{short rest}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 3,
      scaling: "accuracy",
      tags: ["Curse"],
      type: "Duration",
    },

    {
      name: "Curse of Temporal Dislocation",

      attack: {
        crit: `The effect lasts until the curse is removed.`,
        glance: `The effect is lasts until the end of the next round.`,
        hit: `At the end of each round, if the subject lost hit points that round, it has a 50\\% chance to be sent forward in time by one round.
        At the end of the next round, it returns to its original location, or the closest open space if that location is occupied.
        This effect lasts until the subject takes a \\glossterm{short rest}.`,
        targeting: `
        Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: "accuracy",
      tags: ["Curse"],
      type: "Duration",
    },

    {
      name: "Decelerated Timestream",

      attack: {
        glance: `The effect lasts until the end of the next round, allowing the creature to act normally in the zone after that time.`,
        hit: `Each subject acts at half speed within the area.
        It skips every other round, starting with the round after it becomes affected by this affect.
        In addition, it takes a -2 penalty to \\glossterm{accuracy} and \\glossterm{defenses} against creatures moving at normal speed.`,
        targeting: `
          Make an attack vs. Mental against all creatures within a \\areasmall radius \\glossterm{zone} from your location.
          In addition, whenever a creature enters the area, you make the same attack against them.
          A creature that leaves the area and re-enters it uses the original attack result against it.
        `,
      },

      rank: 5,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Slow",

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        hit: `The subject is \\slowed as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\shortrange.
        `,
      },
      rank: 1,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Distant Slow",

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        glance: "The effect lasts until the end of the next round.",
        hit: `The subject is \\slowed as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\longrange.
        `,
      },
      rank: 3,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Decelerate",

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        glance: `The effect lasts until the end of the next round.`,
        hit: `The subject is \\decelerated as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\shortrange.
        `,
      },
      rank: 7,
      type: "Duration",
    },

    {
      name: "Mass Slow",

      attack: {
        crit: `The effect becomes a \\glossterm{condition} on each subject.`,
        hit: `Each target is \\slowed until the end of the next round.`,
        targeting: `
          Make an attack vs. Mental against all creatures in a \\smallarea radius within \\medrange.
        `,
      },
      rank: 1,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Stutterstop",

      attack: {
        crit: `The subject is immobilized every round.`,
        glance: `The effect lasts until the end of the next round.`,
        hit: `As a \\glossterm{condition}, the subject is \\slowed and randomly \\immobilized.
        At the start of each round, it has a 50\\% chance to be \\immobilized during that round.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },

      rank: 5,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Mental Lag",

      attack: {
        crit: `The subject \\stunned instead of dazed.`,
        glance: "The effect lasts until the end of the next round.",
        hit: `The subject is \\slowed and \\dazed as a single \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\shortrange.
        `,
      },

      rank: 4,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Haste",

      castingTime: "minor action",
      effect: `
        You gain a +5 foot \\glossterm{magic bonus} to speed with all of your \\glossterm{movement modes}, and a +1 \\glossterm{magic bonus} to Reflex defense.
      `,
      rank: 1,
      scaling: {
        3: `The speed bonus increases to +10 feet, and the defense bonus increases to +2.`,
        5: `The speed bonus increases to +15 feet, and the defense bonus increases to +3.`,
        7: `The speed bonus increases to +20 feet, and the defense bonus increases to +4.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Haste",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        name: "haste",
      },
      rank: 3,
      scaling: {
        5: `The speed bonus increases to +10 feet, and the defense bonus increases to +2.`,
        7: `The speed bonus increases to +15 feet, and the defense bonus increases to +3.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Accelerated Strike",

      effect: `
        As a \\glossterm{minor action}, you can make a \\glossterm{strike} with a -3 penalty to \\glossterm{accuracy}.
        You take a -2d damage penalty with the strike, and you do not add your \\glossterm{power} to damage.
      `,
      rank: 4,
      scaling: { 6: `The accuracy penalty is reduced to -2.` },
      type: "Attune (self)",
    },

    {
      name: "Temporal Duplicate",

      castingTime: "minor action",
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        You reach into a possible future and create a duplicate of the subject.
        The duplicate is identical in all ways to the subject when the spell resolves.

        The subject and its duplicate can act during the next round.
        At the end of that round, the subject and its duplicate cease to exist.
        During that round, time does not pass for the subject.
        At the end of the following round, the subject reappears in the place where it ceased to exist.
        If that space is occupied, it appears in the closest unoccupied space.
        When the subject reappears, its condition is unchanged from when it left.
        Its \\glossterm{hit points}, conditions, and all other statistics are unaffected, regardless of any damage or other negative effects suffered by the duplicate.

        The duplicate is fragile, and its actions are limited.
        It cannot use actions that would cause it to increase its \\glossterm{fatigue level}, lose \\glossterm{hit points}, or otherwise suffer negative consequences as a cost of the action.
        If it loses any \\glossterm{hit points}, it ceases to exist.
      `,
      rank: 5,
      scaling: {
        7: `If you cast this spell as a standard action, you can choose to have the duplicate persist for two rounds instead of one.
                If you do, the subject disappears for two rounds at the same time as the duplicate.`,
      },
      type: "Duration",
    },

    {
      name: "Time Hop",

      castingTime: "minor action",
      effect: `
        Choose either yourself or one Medium or smaller \\glossterm{ally} or \\glossterm{unattended} object within \\medrange.
        You send the subject into the future, causing it to temporarily cease to exist.
        When you cast this spell, you choose how many rounds the subject ceases to exist for, up to a maximum of five rounds.
        At the end of the last round, it reappears in the same location where it disappeared.

        The area the subject occupied can be physically crossed, but it is treated as an invalid destination for teleportation and other similar magic.
        When the subject reappears, all of its surroundings are adjusted as if the object had retroactively always existed in its space.
        For example, if the location is occupied by a creature that walked into the area, the creature is relocated to the closest unoccupied space along the path it took to reach the subject.
      `,
      rank: 2,
      scaling: {
        4: `The maximum size of the subject increases to Large.`,
        6: `The maximum size of the subject increases to Huge.`,
      },
      type: "Instant",
    },

    {
      name: "Accelerated Reaction",

      effect: `
        You gain a +2 \\glossterm{magic bonus} to Reflex defense and \\glossterm{initiative} checks.
      `,
      rank: 1,
      scaling: {
        3: `The bonuses increase to +3.`,
        5: `The bonuses increase to +4.`,
        7: `The bonuses increase to +5.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Accelerated Reaction",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        name: "Accelerated Reaction",
      },
      // narrative: '',
      rank: 3,
      scaling: {
        5: `The bonuses increase to +3.`,
        7: `The bonuses increase to +4.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Temporal Stasis",

      castingTime: "minor action",
      effect: `
        Choose yourself or one Medium or smaller \\glossterm{ally} within \\medrange.
        The subject is placed into stasis, rendering it unconscious.
        While in stasis, it cannot take any actions and cannot be targeted, moved, damaged, or otherwise affected by outside forces in any way.

        % TODO: wording
        This effect normally lasts as long as you \\glossterm{attune} to it, and until the end of the round when you release the attunement.
        If you use this ability on yourself, it instead lasts for a number of rounds you choose when you cast the spell, up to a maximum of five rounds.
      `,
      rank: 4,
      scaling: { 6: `The maximum size of the subject increases to Large.` },
      type: "Attune (self)",
    },

    {
      name: "Time Lock",

      effect: `
        Choose yourself or an \\glossterm{ally} within \\medrange.
        You lock the state of the subject's body in time.
        Note the subject's \\glossterm{hit points}, \\glossterm{vital wounds} (including \\glossterm{vital roll} results), and \\glossterm{conditions}.
        If the subject dies, this effect ends immediately.

        As a \\glossterm{standard action}, you can reach through time to restore the subject's state.
        If you do, the subject's \\glossterm{hit points} and \\glossterm{conditions} become identical to what they were when you cast this spell.
        This effect cannot restore \\glossterm{vital wounds}.
        This does not affect any other properties of the subject, such as any resources expended.
        After you restore the subject's state in this way, the spell ends.
      `,
      rank: 4,
      scaling: {
        6: `The restoration effect can also remove \\glossterm{vital wounds} gained since the subject was locked.`,
      },
      type: "Sustain (minor)",
    },

    {
      name: "Time Stop",

      effect: `
        You can take two full rounds of actions immediately.
        During this time, all other creatures and objects are fixed in time, and cannot be targeted, moved, damaged, or otherwise affected by outside forces in any way.
        You can still affect yourself and create areas or new effects.
        When this effect ends, you are \\stunned as a \\glossterm{condition}.

        You are still vulnerable to danger, such as from heat or dangerous gases.
        However, you cannot be detected by any means while you travel.

        After you cast this spell, you cannot cast it again until you take a \\glossterm{short rest}.
      `,
      rank: 7,
      type: "Duration",
    },

    {
      name: "Evasion",

      effect: `
        You take half damage from abilities that affect an area.
        This does not protect you from any non-damaging effects of those abilities, or from abilities that affect multiple specific targets without affecting an area.
      `,
      rank: 4,
      scaling: { 6: `You also gain a +3 \\glossterm{magic bonus} to Reflex defense.` },
      type: "Attune (self)",
    },

    {
      name: "Greater Evasion",

      effect: `
        You can use your Reflex defense in place of any other defense against abilities that affect an area.
        This does not protect you from abilities that affect multiple specific targets without affecting an area.
      `,
      rank: 7,
      type: "Attune (self)",
    },

    {
      name: "Minor Acceleration",

      effect: `
        You can take two \\glossterm{minor actions} each round instead of one.
        You cannot take the same minor action twice in the same round.
      `,
      rank: 6,
      type: "Attune (self)",
    },

    {
      name: "Accelerate Aging",

      attack: {
        crit: `The penalties increase to -6, and the subject moves at one quarter speed.`,
        glance: `The effect lasts until the end of the next round.`,
        hit: `As a \\glossterm{condition}, the subject's body temporarily ages to become extremely old.
          It suffers a -4 penalty to \\glossterm{accuracy}, \\glossterm{checks}, Armor defense, Fortitude defense, and Reflex defense.
          These penalties are doubled if the subject was already suffering age-related penalties.
          In addition, the subject moves at half speed.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 6,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Instant Analysis",

      effect: `
        You accelerate your mind to incredible speed, allowing you to process information quickly.
        From your perspective, you freeze time for five rounds.
        During this time, all creatures and objects are fixed in time, and cannot be targeted, moved, damaged, or otherwise affected by outside forces in any way.
        Your mind remains active during this time, and you are the only one aware of the stoppage of time.
        You cannot move or take any actions other than to observe your surroundings.
        In addition, you can release the time freeze as a \\glossterm{free action}.
        When this spell ends, time resumes in the same phase that it was originally frozen.

        After casting this spell, you cannot cast it again until you take a \\glossterm{short rest}.
      `,
      rank: 3,
      scaling: {
        5: `You can cast this spell as a \\glossterm{minor action}.`,
        7: `The length of frozen time increases to five minutes.`,
      },
      type: "Duration",
    },

    {
      name: "Disjointed Slow",

      attack: {
        hit: `The subject takes 1d8 + half \\glossterm{power} energy damage.
        If it loses \\glossterm{hit points} from this damage, it is \\slowed as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      narrative: `
        This spell was discovered accidentally by an inexperienced chronomancer, but it has since been weaponized to great effect.
        It creates inconsistent pockets of slowed time at random within a foe's body.
      `,
      rank: 1,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Disjointed Deceleration",

      attack: {
        glance: `Half damage.`,
        hit: `The subject takes 2d6 energy damage.
        If it loses \\glossterm{hit points} from this damage, it is \\decelerated as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      narrative: `
        This spell resulted from extensive research by the creator of the \\spell{disjointed slow} spell.
        It functions similarly by creating inconsistent pockets of drastically slowed time within a foe's body.
      `,
      rank: 4,
      scaling: "damage",
      type: "Duration",
    },
    {
      name: "Timeseal",

      // effect: '',
      // narrative: '',
      attack: {
        // crit: '',
        // glance: '',
        hit: `
          The target takes 1d10 energy damage.
          If it loses \\glossterm{hit points} from this damage, it is briefly frozen in time.
          Until the end of the next round, it is completely immune to all damage, attacks, and effects of any kind.
          In addition, it is \\unconscious and cannot act in any way.
          At the end of the next round, it returns to normal, with no awareness of the intervening time.
          After this effect ends, the subject becomes immune to this spell until it takes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Duration",
    },
  ],
  rituals: [
    {
      name: "Gentle Repose",

      castingTime: "one minute",
      effect: `
        Choose one \\glossterm{unattended}, nonmagical object within \\shortrange.
        Time does not pass for the subject, preventing it from decaying or spoiling.
        This can extend the time a poison or similar item lasts before becoming inert.
        % What effects have an explicit time limit?
        If used on a corpse, this effectively extends the time limit for effects that require a fresh or intact body.
        Additionally, this can make transporting a fallen comrade more pleasant.

        % Does this need to explicitly clarify that it doesn't stop time from passing for the creature's soul?
      `,
      rank: 3,
      type: "Attune (ritual)",
    },
  ],
};
