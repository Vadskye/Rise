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
        hit: `
          During the next round, the subject must repeat all actions that it took this round.
          It can choose different targets or otherwise make different decisions about its action, but the action must be the same.
          If it is unable to take the same action, it unable to take any action of that action type.
          For example, if a creature moved during the round that you cast this spell and was \\immobilized or knocked \\prone, it cannot move at all during the following round.

          After the subject stops repeating its actions, it becomes immune to this effect until it takes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
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
        name: "repeat",
      },
      rank: 3,
      scaling: "accuracy",
      tags: ["Compulsion"],
      type: "Instant",
    },

    // This is a weird effect with no clearly defined rank
    {
      name: "Drop",

      attack: {
        crit: `
          The inability to hold the item becomes a \\glossterm{condition}.
        `,
        hit: `
          The subject immediately drops one object it is holding in a single hand.
          It is \\glossterm{briefly} unable to pick up that item.
          It can still hold other items, but if the dropped item is placed in its hand, it will immediately drop it again.

          After you successfully make a creature drop an item with this spell, it gains a +5 bonus to its defenses against this spell until it takes a \\glossterm{short rest}.
        `,
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
      name: "Monologue",

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        hit: `As a \\glossterm{condition}, the subject is forced to speak out loud constantly whenever it can.
        This does not control what it talks about, so a reasonably savvy creature may be able to avoid revealing anything of great interest.
        In combat, most creatures with an intelligence of 0 or less will often talk about what they are planning on doing, which can help you predict their actions.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\longrange.
        `,
      },

      rank: 2,
      scaling: "accuracy",
      tags: ["Compulsion"],
      type: "Duration",
    },

    {
      name: "Dance",

      // This is T1 + one level; it is a weird hybrid of immobilized and a minor T1 effect
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

    // "fall prone" is like a brief t1 effect
    {
      name: "Collapse",

      attack: {
        crit: `Each subject is also unable to stand up as a \\glossterm{condition}.
        If it is somehow brought into a standing position, it will immediately fall and become prone again.`,
        hit: `Each subject falls \\prone.`,
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
        glance: "The effect lasts \\glossterm{briefly}.",
        hit: `The subject is \\slowed as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\longrange.
        `,
      },

      rank: 2,
      scaling: "accuracy",
      tags: ["Compulsion"],
      type: "Duration",
    },

    {
      name: "Greater Slow Down",

      attack: {
        glance: "The effect lasts \\glossterm{briefly}.",
        crit: `The condition must be removed twice before the effect ends.`,
        hit: `The subject is \\decelerated as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\longrange.
        `,
      },

      rank: 6,
      scaling: "accuracy",
      tags: ["Compulsion"],
      type: "Duration",
    },

    {
      name: "Mass Slow Down",

      attack: {
        crit: `The effect becomes a \\glossterm{condition} on each subject.`,
        hit: `Each subject is \\glossterm{briefly} \\slowed.`,
        targeting: `
          Make an attack vs. Mental against all creatures in a \\smallarea radius within \\longrange.
        `,
      },
      rank: 2,
      scaling: "accuracy",
      tags: ['Compulsion'],
      type: "Duration",
    },

    {
      name: "Greater Mass Slow Down",

      attack: {
        crit: `The effect becomes a \\glossterm{condition} on each subject.`,
        hit: `Each subject is \\glossterm{briefly} \\decelerated.`,
        targeting: `
          Make an attack vs. Mental against all creatures in a \\smallarea radius within \\longrange.
        `,
      },
      rank: 6,
      scaling: "accuracy",
      tags: ['Compulsion'],
      type: "Duration",
    },

    {
      name: "Confusion",

      attack: {
        crit: `The effect becomes a \\glossterm{condition} on each subject.`,
        hit: `
          Each subject with no remaining \\glossterm{damage resistance} is \\glossterm{briefly} \\confused.
        `,
        targeting: `
          Make an attack vs. Mental against all creatures in a \\smallarea radius within \\medrange.
        `,
      },
      rank: 4,
      tags: ["Compulsion"],
      type: "Duration",
    },

    {
      name: "Dominate Person",

      // +1 level for super attunement
      attack: {
        crit: `The subject is \\confused instead of stunned.
        In addition, if the subject is humanoid and was already confused from a previous casting of this spell, you may \\glossterm{attune} to this ability.
        If you do, it becomes \\dominated by you for the duration of that attunement.`,
        glance: "The effect lasts \\glossterm{briefly}.",
        hit: `The subject is \\stunned as a \\glossterm{condition}.`,
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
        name: "dominate person",
      },
      rank: 7,
      tags: ["Compulsion"],
      type: "Duration",
    },

    {
      name: "Sleep",

      // +1 level over normal med range r2 debuff due to sleep effect
      attack: {
        crit: `
          If the subject has no remaining \\glossterm{damage resistance}, it immediately falls asleep even if it is in combat or otherwise exerting itself.
        `,
        glance: 'The effect lasts \\glossterm{briefly}.',
        hit: `
          The subject is \\glossterm{decelerated} as a \\glossterm{condition}.
          During that condition, if it is not in combat or otherwise exerting itself, it falls asleep.
          It cannot be awakened while this effect lasts unless it loses \\glossterm{hit points}, which causes it to wake up and ends the effect.
          After the effect ends by other means, the subject can wake up normally, though it continues to sleep until it awakens for any reason.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },

      rank: 6,
      scaling: "accuracy",
      tags: ["Compulsion"],
      type: "Duration",
    },

    {
      name: "Dramatic Reveal",

      attack: {
        crit: `The effect becomes a \\glossterm{condition} on each subject.`,
        hit: `Each subject is \\glossterm{briefly} convinced that they just learned some phenomenal cosmic truth or life-changing revelation, making them \\stunned.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\medarea radius from you.
        `,
      },
      rank: 5,
      scaling: "accuracy",
      tags: ["Emotion"],
      type: "Duration",
    },

    {
      name: "Selfstrike",

      // original targets: One creature within \medrange
      attack: {
        crit: `The subject takes a -4 penalty to its defenses against the strike.`,
        // No glance effect since it's already one round
        hit: `
          During the next \\glossterm{action phase}, the subject is compelled to make a \\glossterm{strike} against itself instead of taking any other actions.
          It cannot target any other creatures with the strike, even if it has a Sweeping weapon or similar abilities.
          If it has any weapons in hand or natural weapons at that time, it must use one of them.
          Otherwise, it uses its unarmed attack.
          This does not use up any of the creature's actions for the round, and it can take any unused actions during the \\glossterm{delayed action phase} of that round.

          After it makes this attack against itself, it becomes \\glossterm{immune} to this effect until it takes a \\glossterm{short rest}.
        `,
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
        hit: `Each subject is \\glossterm{briefly} \\dazed.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      rank: 2,
      scaling: "accuracy",
      tags: ["Compulsion"],
      type: "Duration",
    },

    {
      name: "Greater Discordant Song",

      functionsLike: {
        exceptThat: "the area increases to a \\gargarea radius from you.",
        name: "discordant song",
      },
      rank: 6,
      scaling: "accuracy",
      tags: ["Compulsion"],
      type: "Duration",
    },

    {
      name: "Cause Fear",

      attack: {
        crit: `The subject is \\frightened by you instead of shaken.`,
        hit: `
          The subject is \\shaken by either you or an \\glossterm{ally} of your choice within range as a \\glossterm{condition}.
        `,
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
        hit: `Each subject is \\glossterm{briefly} \\shaken by either you or an \\glossterm{ally} of your choice within range.`,
        targeting: `
          Make an attack vs. Mental against all creatures in a \\smallarea radius within \\medrange.
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
        crit: `The subject is \\panicked by you instead of frightened.`,
        glance: "The effect lasts \\glossterm{briefly}.",
        hit: `The subject is \\frightened by you as a \\glossterm{condition}.`,
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
        hit: `Each subject is \\glossterm{briefly} \\shaken by you.`,
        targeting: `
          At the end of each round, make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius \\glossterm{emanation} from you.
          After you attack a creature this way, it becomes immune to this attack from you until it takes a \\glossterm{short rest}.
        `,
      },
      rank: 3,
      scaling: "accuracy",
      tags: ["Emotion"],
      type: "Attune (self)",
    },

    {
      name: "Greater Fearsome Aura",

      functionsLike: {
        name: 'fearsome aura',
        exceptThat: 'each subject is \\frightened by you instead of shaken.',
      },
      rank: 7,
      scaling: "accuracy",
      tags: ["Emotion"],
      type: "Attune (self)",
    },

    {
      name: "Charm",

      attack: {
        crit: `Actions which threaten the charmed person without harming them do not break the effect.`,
        glance: "The effect lasts \\glossterm{briefly}.",
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
        name: "charm",
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
        The effects of all other \\abilitytag{Emotion} abilities on that target are \\glossterm{suppressed}.
        It cannot take violent actions (although it can defend itself) or do anything destructive.
        If the subject is harmed or feels that it is in danger, this effect is \\glossterm{dismissed}.
        Harming the subject is not limited to dealing it damage, but also includes causing it significant subjective discomfort.`,
        targeting: `
        Make an attack vs. Mental against all creatures in a \\largearea radius from you.
        You take a -5 penalty to \\glossterm{accuracy} with this attack against creatures who are engaged in combat during the current phase.
        `,
      },
      rank: 4,
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
      name: "Curse of Phobia",

      attack: {
        crit: `The effect lasts until this curse is removed.`,
        glance: "The effect lasts \\glossterm{briefly}.",
        hit: `The subject is \\shaken by all sources of your chosen fear until it takes a \\glossterm{short rest}.`,
        targeting: `
        When you cast this spell, choose one of the following fears: blood (including any creature with a \\glossterm{vital wound}, even the subject), darkness (any location that does not have \\glossterm{bright illumination}), heights (any drop more 10 feet high), insects, snakes, or water.

        Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 3,
      scaling: "accuracy",
      tags: ['Curse', 'Emotion'],
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
      name: "Ominous Presence",

      effect: `
        If you are \\glossterm{trained} with the Intimidate skill, you gain a +3 \\glossterm{magic bonus} to it.
        Otherwise, you are treated as being \\glossterm{trained} in that skill.
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
        If you are \\glossterm{trained} with the Persuasion skill, you gain a +3 \\glossterm{magic bonus} to it.
        Otherwise, you are treated as being \\glossterm{trained} in that skill.
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
        glance: "The effect lasts \\glossterm{briefly}.",
        hit: `
          As a \\glossterm{condition}, the subject believes that it is the only real creature, and the rest of the world is an illusion.
          It may wander aimlessly, but generally takes no action to defend itself and does not perceive itself to be in danger from other creatures.
          It still avoids obvious environmental hazards, such as cliff edges or fires.
          If it takes any damage or is otherwise harmed, including significant subjective discomfort, this effect is automatically broken.

          After this effect ends, the subject becomes immune to it until it takes a \\glossterm{short rest}.
        `,
        targeting: `
        Make an attack vs. Mental against one creature within \\shortrange.
        You take a -5 penalty to \\glossterm{accuracy} with this attack against creatures who are engaged in combat during the current phase.
        `,
      },
      rank: 7,
      tags: ['Emotion', "Subtle"],
      type: "Duration",
    },

    {
      name: "Friend to Animals",

      effect: `
        If you are \\glossterm{trained} with the Creature Handling skill, you gain a +3 \\glossterm{magic bonus} to it.
        Otherwise, you are treated as being \\glossterm{trained} in that skill.
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

        Make an attack vs. Mental with a +3 bonus to \\glossterm{accuracy} against one creature within \\longrange.
        `,
      },
      rank: 1,
      scaling: "accuracy",
      tags: ["Emotion", "Subtle"],
      type: "Duration",
    },

    {
      name: "Agony",

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        hit: `
          As a \\glossterm{condition}, the subject feels excruciating pain from even minor injuries.
          As long as it is at less than its maximum \\glossterm{hit points}, it is \\stunned.
        `,
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
        hit: `The subject \\glossterm{briefly} sees all creatures as its \\glossterm{enemies}.
        It is compelled to attack the creature closest to it, choosing randomly between equally close creatures.
        After this effect ends, the subject becomes immune to this spell until it takes a \\glossterm{short rest}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\distrange.
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
        glance: "The effect lasts \\glossterm{briefly}.",
        hit: `
          As a \\glossterm{condition}, the subject's mind is primed for distraction.
          When it uses a \\abilitytag{Focus} ability, the distraction triggers, wrenching the subject's attention away.
          Its \\glossterm{focus penalty} is increased by 4, and it fails to use the ability, wasting its action.
          After the distraction is triggered this way, the condition ends, and the creature becomes immune to this effect until it takes a \\glossterm{short rest}.
        `,
        targeting: `
          This spell has no \\glossterm{verbal components}.

          Make an attack vs. Mental with a +4 \\glossterm{accuracy} bonus against one creature within \\longrange.
        `,
      },
      rank: 3,
      scaling: "accuracy",
      tags: ["Emotion", "Subtle"],
      type: "Duration",
    },

    {
      name: "Mind Crush",

      attack: {
        hit: `
          The subject takes 1d8 + half \\glossterm{power} energy \\glossterm{subdual damage}.
          If it takes damage, it is \\glossterm{briefly} \\dazed.
          After this effect ends, the subject becomes immune to being dazed in this way until it takes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against anything within \\medrange.
        `,
      },
      rank: 1,
      scaling: "damage",
      type: "Instant",
    },
    {
      name: "Greater Mind Crush",

      attack: {
        hit: `
          The subject takes 2d6 + half \\glossterm{power} energy \\glossterm{subdual damage}.
          If it takes damage, it is \\glossterm{briefly} \\dazed.
        `,
        targeting: `
          Make an attack vs. Mental against anything within \\medrange.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Instant",
    },
    {
      name: "Supreme Mind Crush",

      attack: {
        hit: `
          The subject takes 4d8 + half \\glossterm{power} energy \\glossterm{subdual damage}.
          If it takes damage, it is \\glossterm{briefly} \\stunned.
        `,
        targeting: `
          Make an attack vs. Mental against anything within \\medrange.
        `,
      },
      rank: 7,
      scaling: "damage",
      type: "Instant",
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
        crit: `The creature is \\panicked instead of frightened.`,
        glance: "The effect lasts \\glossterm{briefly}.",
        hit: `The creature is \\frightened by the chosen object until it takes a \\glossterm{short rest}.`,
        targeting: `
        Choose a creature type: aberration, animal, animate, dragon, humanoid, magical beast, monstrous humanoid, planeforged, or undead.
        In addition, choose one Large or smaller object within \\medrange.
        If the subject is moved, this effect ends.

        Whenever a creature of the chosen type enters a \\largearea radius \\glossterm{emanation} from the chosen object, make an attack vs. Mental against it.
        Your accuracy with this attack is equal to half your level \\add half your base Perception.
        This accuracy is calculated at the time that you perform this ritual and does not change afterwards.
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
        crit: `The creature is also compelled to get as close as possible to the chosen object to admire it in greater detail.`,
        glance: "The effect lasts \\glossterm{briefly}.",
        hit: `The creature is \\fascinated by the chosen object until it takes a \\glossterm{short rest}.
        Any act by you or by creatures that appear to be your allies that threatens or harms the creature breaks the effect.
        Harming the creature is not limited to dealing it damage, but also includes causing it significant subjective discomfort.
        An observant creature may interpret overt threats to its allies as a threat to itself.`,
        targeting: `
        Choose a creature type: aberration, animal, animate, dragon, humanoid, magical beast, monstrous humanoid, planeforged, or undead.
        In addition, choose one Large or smaller object within \\medrange.
        If the subject is moved, this effect ends.

        Whenever a creature of the chosen type enters a \\largearea radius \\glossterm{emanation} from the subject, make an attack vs. Mental against it.
        Your accuracy with this attack is equal to half your level \\add half your base Perception.
        This accuracy is calculated at the time that you perform this ritual and does not change afterwards.
        After you make this attack against a particular creature, you do not make this attack against it again until it takes a \\glossterm{short rest}.
        `,
      },
      rank: 4,
      tags: ["Emotion"],
      type: "Attune (ritual)",
    },
  ],
};
