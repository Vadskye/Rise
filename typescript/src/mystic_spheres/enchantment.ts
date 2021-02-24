import { MysticSphere } from ".";

export const enchantment: MysticSphere = {
  name: "Enchantment",
  shortDescription: "Enchant the minds of your foes and allies.",
  sources: ["arcane", "divine", "pact"],

  cantrips: [
    {
      name: "Cheer",

      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The subject's mood improves and it feels more cheerful.
      `,
      focus: false,
      scaling: {
        2: `You may target an additional ally within range.`,
        4: `You may target an additional ally within range.`,
        6: `You may target an additional ally within range.`,
      },
      tags: ["Emotion"],
      type: "Sustain (free)",
    },

    {
      name: "Repeat",

      attack: {
        hit: `During the next round, the subject must repeat all actions that it took this round.
        It can choose different targets or otherwise make different decisions about its action, but the action must be the same.
        If it is unable to take the same action, it unable to take any action of that action type.
        For example, if a creature moved during the round that you cast this spell and was \\glossterm{immobilized} or knocked \\glossterm{prone}, it cannot move at all during the following round.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
          If the subject is currently repeating its actions from this effect or a similar effect, this attack automatically fails.
        `,
      },
      focus: false,
      scaling: "accuracy",
      tags: ["Compulsion"],
      type: "Instant",
    },
  ],
  spells: [
    {
      name: "Mass Repeat",

      functionsLike: {
        exceptThat: `
          it affects all creatures in a \\smallarea radius within \\medrange.
        `,
        spell: "repeat",
      },
      rank: 2,
      scaling: "accuracy",
      tags: ["Compulsion"],
      type: "Instant",
    },

    {
      name: "Drop",

      attack: {
        crit: `The subject is also unable to pick up the dropped items as a \\glossterm{condition}.
        It can still hold other items, but if the dropped items are placed in its hands, it will immediately drop them again.`,
        hit: `The subject imediately drops anything it is holding in its hands.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 3,
      scaling: "accuracy",
      tags: ["Compulsion"],
      type: "Duration",
    },

    {
      name: "Greater Drop",

      // original targets: Creatures in a \areasmall radius within \medrange
      attack: {
        crit: `Each subject is also unable to pick up the dropped items as a \\glossterm{condition}.
        It can still hold other items, but if the dropped items are placed in its hands, it will immediately drop them again.`,
        hit: `Each subject drops anything it is holding in its hands.`,
        targeting: `
          Make an attack vs. Mental against all creatures in a \\smallarea radius within \\medrange.
        `,
      },
      rank: 5,
      scaling: "accuracy",
      tags: ["Compulsion"],
      type: "Duration",
    },

    {
      name: "Monologue",

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        glance: "The effect lasts until the end of the next round.",
        hit: `As a \\glossterm{condition}, the subject is forced to speak out loud constantly whenever it can.
        This does not control what it talks about, so a reasonably savvy creature may be able to avoid revealing anything of great interest.
        In combat, most creatures with an intelligence of 0 or less will often talk about what they are planning on doing, which can help you predict their actions.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\longrange.
        `,
      },

      rank: 3,
      scaling: "accuracy",
      tags: ["Compulsion"],
      type: "Duration",
    },

    {
      name: "Dance",

      attack: {
        crit: `The subject must dance as a \\glossterm{standard action} to reset the penalties, instead of as a move action.`,
        hit: `As a \\glossterm{condition}, the subject is compelled to dance.
        It can spend a \\glossterm{move action} to dance, if it is physically capable of dancing.
        At the end of each round, if the subject did not dance during that round, it takes a -2 penalty to \\glossterm{accuracy} and Mental defense as the compulsion intensifies.
        This penalty stacks each round until the subject dances, which resets the penalties to 0.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },

      rank: 2,
      scaling: "accuracy",
      tags: ["Compulsion"],
      type: "Duration",
    },

    {
      name: "Collapse",

      attack: {
        crit: `Each subject is also unable to stand up as a \\glossterm{condition}.
        If it is somehow brought into a standing position, it will immediately fall and become prone again.`,
        hit: `Each subject falls \\glossterm{prone}.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius within \\medrange.
        `,
      },
      rank: 2,
      scaling: "accuracy",
      tags: ["Compulsion"],
      type: "Duration",
    },

    {
      name: "Slow Down",

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        hit: `The subject is \\glossterm{slowed} as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\longrange.
        `,
      },

      rank: 3,
      scaling: "accuracy",
      tags: ["Compulsion"],
      type: "Duration",
    },

    {
      name: "Mass Slow Down",

      attack: {
        crit: `The effect becomes a \\glossterm{condition} on each subject.`,
        hit: `Each subject is \\glossterm{slowed} until the end of the next round.`,
        targeting: `
        Make an attack vs. Mental against all creatures in a \\smallarea radius within \\longrange.
        `,
      },
      rank: 2,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Stop Moving",

      attack: {
        crit: `The subject is \\glossterm{paralyzed} instead of immobilized.`,
        glance: "The effect lasts until the end of the next round.",
        hit: `The subject is \\glossterm{immobilized} as a \\glossterm{condition}.`,
        targeting: `
        Make an attack vs. Mental against one creature within \\shortrange.
        `,
      },
      rank: 7,
      type: "Duration",
    },

    {
      name: "Confusion",

      attack: {
        crit: `The effect becomes a \\glossterm{condition} on each subject.`,
        hit: `Each subject is \\confused until the end of the next round.`,
        targeting: `
          Make an attack vs. Mental against all creatures in a \\smallarea radius within \\shortrange.
        `,
      },
      rank: 6,
      tags: ["Compulsion"],
      type: "Duration",
    },

    {
      name: "Dominate Person",

      attack: {
        crit: `The subject is also \\glossterm{confused} as part of the same condition.
        In addition, if the subject is humanoid and was already stunned and confused from a previous casting of this spell, you may \\glossterm{attune} to this ability.
        If you do, it becomes \\glossterm{dominated} by you for the duration of that attunement.`,
        glance: "The effect lasts until the end of the next round.",
        hit: `The subject is \\glossterm{stunned} as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\shortrange.
        `,
      },
      rank: 5,
      scaling: "accuracy",
      tags: ["Compulsion"],
      type: "Duration",
    },

    {
      name: "Dominate Monster",

      functionsLike: {
        exceptThat: `
          you are also able to dominate non-humanoid creatures with its critical hit effect.
        `,
        spell: "dominate person",
      },
      rank: 7,
      tags: ["Compulsion"],
      type: "Duration",
    },

    {
      name: "Sleep",

      attack: {
        crit: `The subject does not wake up until it suffers two \\glossterm{vital wounds}.`,
        // No glance effect since brief sleep still allows coup de grace`,
        hit: `The falls asleep as a \\glossterm{condition}.
        It cannot be awakened while the condition lasts unless it takes a \\glossterm{vital wound}, which causes it to wake up and ends the sleeping part of the condition.
        After the condition ends, the subject can wake up normally, though it continues to sleep until it would wake up naturally.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
          You take a -5 penalty to \\glossterm{accuracy} with this attack against creatures who are engaged in combat or taking any physical actions during the current phase.
        `,
      },

      rank: 6,
      scaling: "accuracy",
      tags: ["Compulsion"],
      type: "Duration",
    },

    {
      name: "Run",

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        glance: "The effect lasts until the end of the next round.",
        hit: `As a \\glossterm{condition}, the subject must move a distance equal to its maximum movement speed in a straight line during each \\glossterm{movement phase}.
        It must use its movement mode with the highest speed to move this way.
        It is not required to use the \\textit{sprint} ability, or use any other special movement ability, though it may choose to do so.
        If it is unable to move its full speed without making a skill check or encountering a solid obstacle, it may choose to stop its movement after moving the maximum possible distance without doing so.`,
        targeting: `
          Make an attack vs. Mental with a +4 bonus to \\glossterm{accuracy} against one creature within \\longrange.
        `,
      },

      rank: 3,
      scaling: "accuracy",
      tags: ["Compulsion"],
      type: "Duration",
    },

    {
      name: "Dramatic Reveal",

      attack: {
        crit: `The effect becomes a \\glossterm{condition} on each subject.`,
        hit: `Until the end of the next round, each subject is convinced that they just learned some phenomenal cosmic truth or life-changing revelation, making them \\glossterm{stunned}.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\medarea radius from you.
        `,
      },
      rank: 4,
      scaling: "accuracy",
      tags: ["Emotion"],
      type: "Duration",
    },

    {
      name: "Heedless Rush",

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        hit: `As a \\glossterm{condition}, the subject is forced to use the \\textit{sprint} action whenever it moves (see \\pcref{Sprint}).
        It can still stop before reaching its maximum movement speed, but it must pay the hit point cost if it moves from its current position.`,
        targeting: `
          Make an attack vs. Mental with a +4 bonus to \\glossterm{accuracy} against one creature within \\longrange.
        `,
      },
      rank: 1,
      scaling: "accuracy",
      tags: ["Compulsion"],
      type: "Duration",
    },

    {
      name: "Selfstrike",

      // original targets: One creature within \medrange
      attack: {
        crit: `The subject takes a -4 penalty to its defenses against the strike.`,
        // No glance effect since it's already one round
        hit: `During the next \\glossterm{action phase}, the subject is compelled to make a \\glossterm{strike} against itself instead of taking any other actions.
        It cannot target any other creatures with the strike, even if it has a Sweeping weapon or similar abilities.
        If it has any weapons in hand or natural weapons at that time, it must use one of them.
        Otherwise, it uses its unarmed attack.
        This does not use up any of the creature's actions for the round, and it can take any unused actions during the \\glossterm{delayed action phase} of that round.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 4,
      scaling: "accuracy",
      tags: ["Compulsion"],
      type: "Duration",
    },

    {
      name: "Discordant Song",

      attack: {
        crit: `The effect becomes a \\glossterm{condition} on each subject.`,
        hit: `Each subject is \\dazed until the end of the next round.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\hugearea radius from you.
        `,
      },
      rank: 3,
      scaling: "accuracy",
      tags: ["Compulsion"],
      type: "Duration",
    },

    {
      name: "Cause Fear",

      attack: {
        crit: `The subject is \\glossterm{frightened} by you instead of shaken.`,
        hit: `The subject is \\shaken by you as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: "accuracy",
      tags: ["Emotion"],
      type: "Duration",
    },

    {
      name: "Mass Fear",

      attack: {
        crit: `The effect becomes a \\glossterm{condition} on each subject.`,
        hit: `Each subject is \\glossterm{shaken} by you until the end of the next round.`,
        targeting: `
        Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius within \\medrange.
        `,
      },
      rank: 1,
      scaling: "accuracy",
      tags: ["Emotion"],
      type: "Duration",
    },

    {
      name: "Frighten",

      attack: {
        crit: `The subject is \\glossterm{panicked} by you instead of frightened.`,
        glance: "The effect lasts until the end of the next round.",
        hit: `The subject is \\glossterm{frightened} by you as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 4,
      scaling: "accuracy",
      tags: ["Emotion"],
      type: "Duration",
    },

    {
      name: "Fearsome Aura",

      attack: {
        crit: "The effect becomes a \\glossterm{condition} on each subject.",
        hit: `Each subject is \\glossterm{shaken} by you until the end of the next round.`,
        targeting: `
          At the end of each round, make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius \\glossterm{emanation} from you.
          After you attack a creature this way, you do not make this attack against it again until it takes a \\glossterm{short rest}.
        `,
      },
      rank: 3,
      scaling: "accuracy",
      tags: ["Emotion"],
      type: "Attune (self)",
    },

    {
      name: "Cause Redirected Fear",

      attack: {
        crit: `The subject is \\glossterm{frightened} instead of shaken.`,
        hit: `The subject is \\glossterm{shaken} by an \\glossterm{ally} of your choice within range as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 2,
      scaling: "accuracy",
      tags: ["Emotion"],
      type: "Duration",
    },

    {
      name: "Charm",

      attack: {
        crit: `Actions which threaten the charmed person without harming them do not break the effect.`,
        glance: "The effect lasts until the end of the next round.",
        hit: `The subject is \\charmed by you.
        Any act by you or by creatures that appear to be your allies that threatens or harms the charmed person breaks the effect.
        Harming the subject is not limited to dealing it damage, but also includes causing it significant subjective discomfort.
        An observant target may interpret overt threats to its allies as a threat to itself.`,
        targeting: `
        Make an attack vs. Mental against one creature within \\medrange.
        You take a -5 penalty to \\glossterm{accuracy} with this attack against creatures who are engaged in combat during the current phase.
        `,
      },
      rank: 3,
      scaling: "accuracy",
      tags: ["Emotion", "Subtle"],
      type: "Sustain (minor)",
    },

    {
      name: "Amnesiac Charm",

      functionsLike: {
        exceptThat: `
        when the effect ends, the subject forgets all events that transpired during the spell's duration.
        It becomes aware of its surroundings as if waking up from a daydream.
        The subject is not directly aware of any magical influence on its mind, though unusually paranoid or perceptive creatures may deduce that their minds were affected.
        `,
        spell: "charm",
      },
      rank: 6,
      scaling: "accuracy",
      tags: ["Emotion", "Subtle"],
      type: "Sustain (minor)",
    },

    {
      name: "Calm Emotions",

      attack: {
        crit: `Situations which cause the subject to feel that it is in danger without harming it do not break the effect.`,
        hit: `Each subject has its emotions calmed.
        The effects of all other \\glossterm{Emotion} abilities on that target are \\glossterm{suppressed}.
        It cannot take violent actions (although it can defend itself) or do anything destructive.
        If the subject is harmed or feels that it is in danger, this effect is \\glossterm{dismissed}.
        Harming the subject is not limited to dealing it damage, but also includes causing it significant subjective discomfort.`,
        targeting: `
        Make an attack vs. Mental against all creatures in a \\largearea radius from you.
        You take a -5 penalty to \\glossterm{accuracy} with this attack against creatures who are engaged in combat during the current phase.
        `,
      },
      rank: 2,
      scaling: "accuracy",
      tags: ["Emotion"],
      type: "Sustain (standard)",
    },

    {
      name: "Enrage",

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        hit: `As a \\glossterm{condition}, the subject is unable to take any \\glossterm{standard actions} that do not cause it to make an attack.
        For example, it could make a \\glossterm{strike} or cast an offensive spell, but it could not heal itself or summon a creature.`,
        targeting: `
        Make an attack vs. Mental with a +4 bonus to \\glossterm{accuracy} against one creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: "accuracy",
      tags: ["Emotion"],
      type: "Duration",
    },

    {
      name: "Deaden Emotions",

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        glance: "The effect lasts until the end of the next round.",
        hit: `As a \\glossterm{condition}, the subject is unable to take any \\glossterm{standard actions} that cause it to make an attack.
        If it is harmed, either by taking damage or by experiencing significant subjective discomfort, this effect immediately ends.`,
        targeting: `
        Make an attack vs. Mental against one creature within \\shortrange.
        `,
      },
      rank: 6,
      scaling: "accuracy",
      tags: ["Emotion"],
      type: "Duration",
    },

    {
      name: "Curse of Phobia",

      attack: {
        crit: `The effect lasts until this curse is removed.`,
        glance: "The effect lasts until the end of the next round.",
        hit: `The subject is \\glossterm{shaken} by all sources of your chosen fear until it takes a \\glossterm{short rest}.`,
        targeting: `
        When you cast this spell, choose one of the following fears: blood (including any creature with a \\glossterm{vital wound}, even the subject), darkness (any location that does not have \\glossterm{bright illumination}), heights (any drop more 10 feet high), insects, snakes, or water.

        Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 3,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Demotivate",

      attack: {
        crit: `The penalty increases to -5.`,
        hit: `As a \\glossterm{condition}, the subject takes a -2 penalty to Mental defense.`,
        targeting: `
          Make an attack vs. Mental with a +3 bonus against one creature within \\medrange.
        `,
      },
      rank: 2,
      scaling: "accuracy",
      tags: ["Emotion"],
      type: "Duration",
    },

    {
      name: "Motivate",

      effect: `
        You gain a +2 \\glossterm{magic bonus} to Mental defense.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +3.`,
        5: `The bonus increases to +4.`,
        7: `The bonus increases to +5.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Mass Motivate",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        spell: "Motivate",
      },
      // narrative: '',
      rank: 3,
      scaling: {
        5: `The bonus increases to +3.`,
        7: `The bonus increases to +4.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Ominous Presence",

      effect: `
        You gain a +3 \\glossterm{magic bonus} to the Intimidate skill.
        In addition, you are treated as being \\glossterm{trained} in that skill if you would otherwise be untrained.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +4.`,
        5: `The bonus increases to +5.`,
        7: `The bonus increases to +6.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Alluring Presence",

      effect: `
        You gain a +3 \\glossterm{magic bonus} to the Persuasion skill.
        In addition, you are treated as being \\glossterm{trained} in that skill if you would otherwise be untrained.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +4.`,
        5: `The bonus increases to +5.`,
        7: `The bonus increases to +6.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Solipsism",

      attack: {
        glance: "The effect lasts until the end of the next round.",
        hit: `As a \\glossterm{condition}, the subject believes that it is the only real creature, and the rest of the world is an illusion.
        It may wander aimlessly, but generally takes no action to defend itself and does not perceive itself to be in danger from other creatures.
        It still avoids obvious environmental hazards, such as cliff edges or fires.
        If it takes any damage or is otherwise harmed, including significant subjective discomfort, this effect is automatically broken.`,
        targeting: `
        Make an attack vs. Mental against one creature within \\shortrange.
        You take a -5 penalty to \\glossterm{accuracy} with this attack against creatures who are engaged in combat during the current phase.
        `,
      },
      rank: 7,
      tags: ["Subtle"],
      type: "Duration",
    },

    {
      name: "Friend to Animals",

      effect: `
        You gain a +3 \\glossterm{magic bonus} to the Creature Handling skill.
        In addition, you are treated as being \\glossterm{trained} in that skill if you would otherwise be untrained.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +4.`,
        5: `The bonus increases to +5.`,
        7: `The bonus increases to +6.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Dull the Senses",

      attack: {
        crit: `The penalty increases to -8.`,
        hit: `The subject takes a -4 penalty to Awareness, Social Insight, and \\glossterm{initiative} checks as a \\glossterm{condition}.`,
        targeting: `
        This spell has no \\glossterm{verbal components}.

        Make an attack vs. Mental with a +2 bonus to \\glossterm{accuracy} against one creature within \\longrange.
        `,
      },
      rank: 1,
      scaling: "accuracy",
      tags: ["Subtle"],
      type: "Duration",
    },

    {
      name: "Agony",

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        hit: `As a \\glossterm{condition}, the subject feels excruciating pain from even minor injuries.
        As long as it is at less than its maximum \\glossterm{hit points}, it is \\glossterm{nauseated}.`,
        targeting: `
        Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: "accuracy",
      tags: ["Emotion"],
      type: "Duration",
    },

    {
      name: "Friend to Foe",

      attack: {
        crit: `The effect becomes a \\glossterm{condition} that lasts until it is removed.`,
        hit: `During the next round, the subject sees all creatures as its \\glossterm{enemies}.
        It is compelled to attack the creature closest to it, choosing randomly between equally close creatures.
        After this effect ends, it becomes immune to this spell until it takes a \\glossterm{short rest}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 2,
      scaling: "accuracy",
      tags: ["Compulsion"],
      type: "Duration",
    },

    {
      name: "Distraction",

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        hit: `As a \\glossterm{condition}, the subject's \\glossterm{focus penalty} is increased by 4.`,
        targeting: `
          Make an attack vs. Mental with a +4 \\glossterm{accuracy} bonus against one creature within \\longrange.
        `,
      },
      rank: 2,
      scaling: "accuracy",
      tags: ["Emotion"],
      type: "Duration",
    },

    {
      name: "Delayed Distraction",

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        glance: "The effect lasts until the end of the next round.",
        hit: `As a \\glossterm{condition}, the subject's mind is primed for distraction.
        When it uses a \\glossterm{Focus} ability, the distraction triggers, wrenching the subject's attention away.
        Its \\glossterm{focus penalty} is increased by 4, and it fails to use the ability, wasting its action.
        After the distraction is triggered this way, the condition ends.`,
        targeting: `
          Make an attack vs. Mental with a +2 \\glossterm{accuracy} bonus against one creature within \\longrange.
        `,
      },
      rank: 3,
      scaling: "accuracy",
      tags: ["Emotion", "Subtle"],
      type: "Duration",
    },
  ],
  rituals: [
    {
      name: "Animal Messenger",

      castingTime: "one minute",
      attack: {
        hit: `
          The subject is compelled to deliver a message for you.
        You can give the animal a small piece of parchment or similarly sized item containing up to 25 words.
        In addition, choose a destination that you can clearly visualize.
        You must have a general idea of the direction and distance to that location from your current location.
        You must also visualize what a valid recipient for the message looks like.
        You can leave this description vague, such as "any humanoid creature", or be more specific, like "a hawk-nosed human wearing a red cloak".

        The animal will attempt to travel to that destination to the best of its ability, following the directions you have given it.
        It will not willingly part with its message until it reaches its destination.
        Once it reaches its destination, it will wait until it observes a valid recipient, leaving the destination only briefly as necessary to sustain itself.
        When the animal has delivered its message, this effect ends, allowing you to know that the message has been delivered.
        `,
        targeting: `
          Make an attack vs. Mental against one Small or Tiny animal within \\medrange.
          You take a -10 penalty to \\glossterm{accuracy} with the attack if the subject is currently in combat.
        `,
      },
      rank: 2,
      type: "Attune (self)",
    },

    {
      name: "Tell the Truth",

      castingTime: "one minute",
      attack: {
        hit: `Each subject is unable to say things it knows to be untrue.`,
        targeting: `
          Make an attack vs. Mental with a +4 \\glossterm{accuracy} bonus against up to five creatures within \\medrange.
        `,
      },
      rank: 3,
      type: "Attune (ritual)",
    },

    {
      name: "Antipathy",

      // original targets: ['One Large or smaller object within \\medrange', 'Creatures near the subject (see text)']
      castingTime: "24 hours",
      attack: {
        crit: `The creature is \\glossterm{panicked} instead of frightened.`,
        glance: "The effect lasts until the end of the next round.",
        hit: `The creature is \\glossterm{frightened} by the chosen object as a \\glossterm{condition}.`,
        targeting: `
        Choose a creature type: aberration, animal, animate, dragon, humanoid, magical beast, monstrous humanoid, planeforged, or undead.
        In addition, choose one Large or smaller object within \\medrange.

        Whenever a creature of the chosen type enters a \\largearea radius \\glossterm{emanation} from the chosen object, make an attack vs. Mental against it.
        After you make this attack against a particular creature, you do not make this attack against it again until it takes a \\glossterm{short rest}.
        `,
      },

      rank: 4,
      tags: ["Emotion"],
      type: "Attune (ritual)",
    },

    {
      name: "Sympathy",

      castingTime: "24 hours",
      attack: {
        crit: `The creature is also compelled to get as close as possible to the primary target to admire it in greater detail.`,
        glance: "The effect lasts until the end of the next round.",
        hit: `The creature is \\glossterm{fascinated} by the primary target as a \\glossterm{condition}.
        Any act by you or by creatures that appear to be your allies that threatens or harms the creature breaks the effect.
        Harming the creature is not limited to dealing it damage, but also includes causing it significant subjective discomfort.
        An observant creature may interpret overt threats to its allies as a threat to itself.`,
        targeting: `
        Choose a creature type: aberration, animal, animate, dragon, humanoid, magical beast, monstrous humanoid, planeforged, or undead.
        In addition, choose one Large or smaller object within \\medrange.

        Whenever a creature of the chosen type enters a \\largearea radius \\glossterm{emanation} from the subject, make an attack vs. Mental against it.
        After you make this attack against a particular creature, you do not make this attack against it again until it takes a \\glossterm{short rest}.
        `,
      },
      rank: 4,
      tags: ["Emotion"],
      type: "Attune (ritual)",
    },
  ],
};
