import { MysticSphere } from '.';

export const enchantment: MysticSphere = {
  name: 'Enchantment',
  hasImage: true,
  shortDescription: 'Enchant the minds of your foes and allies.',
  sources: ['arcane', 'divine', 'pact'],

  cantrips: [
    {
      name: 'Cheer',

      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The target's mood improves and it feels more cheerful.
      `,
      scaling: {
        2: `You may target an additional ally within range.`,
        4: `You may target an additional ally within range.`,
        6: `You may target an additional ally within range.`,
      },
      tags: ['Emotion'],
      type: 'Sustain (free)',
    },

    {
      name: 'Repeat',

      attack: {
        crit: `The target does not become immune to this effect.`,
        hit: `
          During the next round, the target must repeat all actions that it took this round.
          It can choose different targets or otherwise make different decisions about its action, but the action must be the same.
          If it is unable to take the same action, it unable to take any action of that action type.
          For example, if a creature moved during the round that you cast this spell and was \\immobilized or knocked \\prone, it cannot move at all during the following round.

          After the target stops repeating its actions, it becomes immune to this effect until it takes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      scaling: 'accuracy',
      tags: ['Compulsion'],
    },
  ],
  spells: [
    {
      name: 'Mass Repeat',

      functionsLike: {
        exceptThat: `
          it affects all creatures in a \\smallarea radius within \\medrange.
        `,
        name: 'repeat',
      },
      rank: 3,
      scaling: 'accuracy',
      tags: ['Compulsion'],
    },

    {
      name: 'Monologue',

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        hit: `As a \\glossterm{condition}, the target is forced to speak out loud constantly whenever it can.
        This does not control what it talks about, so a reasonably savvy creature may be able to avoid revealing anything of great interest.
        In combat, most creatures with an intelligence of 0 or less will often talk about what they are planning on doing, which can help you predict their actions.`,
        targeting: `
          Make an attack vs. Mental with a +3 accuracy bonus against one creature within \\longrange.
        `,
      },

      rank: 2,
      scaling: 'accuracy',
      tags: ['Compulsion'],
    },

    {
      name: 'Dance',

      // This is T1; it is a weird hybrid of immobilized and a minor T1 effect
      attack: {
        crit: `The target must dance as a standard action to reset the penalties, instead of as a movement.`,
        hit: `
          As a \\glossterm{condition}, the target is compelled to dance.
          It can spend a \\glossterm{movement} to dance, if it is physically capable of dancing.
          At the end of each movement phase, if the target did not dance during that phase, it takes a -2 penalty to its defenses as the compulsion intensifies.
          This penalty stacks each round up to a maximum of -5.
          When the target dances, it resets its penalties to 0.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },

      rank: 1,
      scaling: 'accuracy',
      tags: ['Compulsion'],
    },

    // "fall prone" is a r1.5 effect
    {
      name: 'Collapse',

      attack: {
        crit: `Each target is also unable to stand up as a \\glossterm{condition}.
        If it is somehow brought into a standing position, it will immediately fall and become prone again.`,
        // No relevant glance effect
        hit: `Each target falls \\prone.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius within \\shortrange.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Compulsion'],
    },

    {
      name: 'Taunt',

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        hit: `The target is \\goaded by you as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
      tags: ['Emotion'],
    },

    {
      name: 'Confusion',

      attack: {
        crit: `Creatures that have remaining damage resistance are also affected.`,
        hit: `
          Each target with no remaining \\glossterm{damage resistance} is \\confused as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against all creatures in a \\smallarea radius within \\medrange.
        `,
      },
      rank: 7,
      tags: ['Compulsion'],
    },

    {
      name: 'Dominate Person',

      // +1 level for super attunement
      attack: {
        crit: `
          The target is \\confused instead of stunned.
          In addition, if the target is humanoid and was already confused from a previous casting of this spell, you may \\glossterm{attune} to this ability.
          If you do, it becomes \\dominated by you for the duration of that attunement.
          As normal, you can only attune to this effect once.
        `,
        hit: `The target is \\stunned as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\shortrange.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
      tags: ['Compulsion'],
    },

    {
      name: 'Dominate Monster',

      functionsLike: {
        exceptThat: `
          you are also able to dominate non-humanoid creatures with its critical hit effect.
          You cannot be attuned to this effect and \\spell{dominate person} at the same time.
        `,
        name: 'dominate person',
      },
      rank: 7,
      tags: ['Compulsion'],
    },

    {
      name: 'Sleep',

      // +1 level over normal med range r2 debuff due to sleep effect
      attack: {
        crit: `
          If the target has no remaining \\glossterm{damage resistance}, it immediately falls asleep even if it is in combat or otherwise exerting itself.
        `,
        hit: `
          The target is \\slowed as a \\glossterm{condition}.
          During that condition, if it is not in combat or otherwise exerting itself, it falls asleep.
          It cannot be awakened while this effect lasts unless it loses \\glossterm{hit points}, which causes it to wake up and ends the effect.
          After the effect ends by other means, the target can wake up normally, though it continues to sleep until it awakens for any reason.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },

      rank: 6,
      scaling: 'accuracy',
      tags: ['Compulsion'],
    },

    {
      name: 'Mind Blank',

      attack: {
        crit: 'The target does not become immune to this effect.',
        hit: `
          The target is compelled to spend its next \\glossterm{standard action} doing nothing at all.
          After it takes this standard action, it becomes \\trait{immune} to this effect until it takes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
      tags: ['Compulsion'],
    },

    {
      name: 'Selfstrike',

      // original targets: One creature within \medrange
      attack: {
        crit: 'The target does not become immune to this effect.',
        // No glance effect since it's already one round
        hit: `
          The target is compelled to make a \\glossterm{strike} against itself using its next \\glossterm{standard action}.
          It cannot target any other creatures with the strike, even if it has a Sweeping weapon or similar abilities.
          The target uses whatever type of strike it believes will be most effective, as if it was attacking an enemy.

          After it makes this attack against itself, it becomes \\trait{immune} to this effect until it takes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Compulsion'],
    },

    {
      name: 'Discordant Song',

      attack: {
        crit: `Each target is \\stunned instead of dazed.`,
        hit: `
          Each target is \\dazed as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius from you.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
      tags: ['Compulsion'],
    },

    {
      name: 'Massive Discordant Song',

      attack: {
        crit: `Each target is \\stunned instead of dazed.`,
        hit: `
          Each target is \\dazed as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\hugearea radius from you.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
      tags: ['Compulsion'],
    },

    {
      name: 'Cause Fear',

      attack: {
        crit: `The target is \\frightened by the chosen creature instead of shaken.`,
        hit: `
          As a \\glossterm{condition}, each target is \\shaken by the chosen creature.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius within \\medrange.
          In addition, choose a creature within range.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: ['Emotion'],
    },

    {
      name: 'Cause Intense Fear',

      attack: {
        crit: `The target is \\panicked by the chosen creature instead of shaken.`,
        hit: `
          As a \\glossterm{condition}, each target is \\frightened by the chosen creature.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius within \\medrange.
          In addition, choose a creature within range.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
      tags: ['Emotion'],
    },

    {
      name: 'Fearsome Aura',

      attack: {
        crit: `The target is \\frightened by you instead of shaken.`,
        hit: `Each target is \\shaken by you as a \\glossterm{condition}.`,
        targeting: `
          Whenever an \\glossterm{enemy} enters a \\largearea radius \\glossterm{emanation} from you, make a \\glossterm{reactive attack} vs. Mental against them.
          After you attack a creature this way, it becomes immune to this attack from you until it takes a \\glossterm{short rest}.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
      tags: ['Emotion'],
      type: 'Attune (deep)',
    },

    {
      name: 'Intense Fearsome Aura',

      attack: {
        crit: `The target is \\panicked by you instead of shaken.`,
        hit: `Each target is \\frightened by you as a \\glossterm{condition}.`,
        targeting: `
          Whenever an \\glossterm{enemy} enters a \\largearea radius \\glossterm{emanation} from you, make a \\glossterm{reactive attack} vs. Mental against them.
          After you attack a creature this way, it becomes immune to this attack from you until it takes a \\glossterm{short rest}.
        `,
      },
      rank: 7,
      scaling: 'accuracy',
      tags: ['Emotion'],
      type: 'Attune (deep)',
    },

    {
      name: 'Charm',

      attack: {
        crit: `The effect persists for ten minutes after you stop sustaining it.`,
        hit: `The target is \\charmed by you.`,
        targeting: `
        Make an attack vs. Mental against one creature within \\medrange.
        You take a -10 penalty to \\glossterm{accuracy} with this attack against creatures who have made an attack or been attacked since the start of the last round.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
      tags: ['Emotion', 'Subtle'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Amnesiac Charm',

      functionsLike: {
        exceptThat: `
        when the effect ends, the target forgets all events that transpired during the spell's duration.
        It becomes aware of its surroundings as if waking up from a daydream.
        The target is not directly aware of any magical influence on its mind, though unusually paranoid or perceptive creatures may deduce that their minds were affected.
        `,
        name: 'charm',
      },
      rank: 6,
      scaling: 'accuracy',
      tags: ['Emotion', 'Subtle'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Calm Emotions',

      // TODO: unclear rank
      attack: {
        crit: `Situations which cause the target to feel that it is in danger without harming it do not break the effect.`,
        hit: `Each target has its emotions calmed.
        The effects of all other \\abilitytag{Emotion} abilities on that target are \\glossterm{suppressed}.
        It cannot take violent actions (although it can defend itself) or do anything destructive.
        If the target is harmed or feels that it is in danger, this effect is \\glossterm{dismissed}.
        Harming the target is not limited to dealing it damage, but also includes causing it significant subjective discomfort.`,
        targeting: `
          Make an attack vs. Mental against all creatures in a \\largearea radius from you.
          You take a -10 penalty to \\glossterm{accuracy} with this attack against creatures who have made an attack or been attacked since the start of the last round.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Emotion'],
      type: 'Sustain (standard)',
    },

    {
      name: 'Enrage',

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        hit: `As a \\glossterm{condition}, the target is unable to take any \\glossterm{standard actions} that do not cause it to make an attack.
        For example, it could make a \\glossterm{strike} or cast an offensive spell, but it could not heal itself or summon a creature.`,
        targeting: `
        Make an attack vs. Mental with a +4 bonus to \\glossterm{accuracy} against one creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: ['Emotion'],
    },

    {
      name: 'Demotivate',

      attack: {
        crit: `The penalty increases to -5.`,
        hit: `As a \\glossterm{condition}, the target takes a -2 penalty to Mental defense.`,
        targeting: `
          Make an attack vs. Mental with a +3 bonus against one creature within \\longrange.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: ['Emotion', 'Subtle'],
    },

    {
      name: 'Ominous Presence',

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
      type: 'Attune',
    },

    {
      name: 'Alluring Presence',

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
      type: 'Attune',
    },

    {
      name: 'Solipsism',

      attack: {
        crit: 'The target does not become immune to this effect.',
        hit: `
          As a \\glossterm{condition}, the target believes that it is the only real creature, and the rest of the world is an illusion.
          It may wander aimlessly, but generally takes no action to defend itself and does not perceive itself to be in danger from other creatures.
          It still avoids obvious environmental hazards, such as cliff edges or fires.
          If it takes any damage or is otherwise harmed, including significant subjective discomfort, this effect is automatically broken.

          After this effect ends, the target becomes immune to it until it takes a \\glossterm{short rest}.
        `,
        targeting: `
        Make an attack vs. Mental against one creature within \\shortrange.
        You take a -10 penalty to \\glossterm{accuracy} with this attack against creatures who have made an attack or been attacked since the start of the last round.
        `,
      },
      rank: 7,
      tags: ['Emotion', 'Subtle'],
    },

    {
      name: 'Friend to Animals',

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
      type: 'Attune',
    },

    {
      name: 'Agony',

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        hit: `
          As a \\glossterm{condition}, the target feels excruciating pain from even minor injuries.
          As long as it is at less than its maximum \\glossterm{hit points}, it is \\stunned.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: ['Emotion'],
    },

    {
      name: 'Friend to Foe',

      attack: {
        crit: `The target does not become immune to this effect.`,
        // No relevant glance effect
        hit: `The target \\glossterm{briefly} sees all creatures as its \\glossterm{enemies}.
        It is compelled to attack the creature closest to it, choosing randomly between equally close creatures.
        After this effect ends, the target becomes immune to this spell until it takes a \\glossterm{short rest}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Compulsion'],
    },

    {
      name: 'Mind Crush',

      // +1 level for conditional +2 accuracy
      attack: {
        hit: `
          The target takes 2d6 + \\glossterm{power} psychic \\glossterm{subdual damage}.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
          You gain a +2 accuracy bonus if the target has a negative Intelligence.
        `,
      },
      rank: 2,
      scaling: 'damage',
      tags: ['Emotion'],
    },
    {
      name: 'Certain Mind Crush',

      // +3 levels for conditional +4 accuracy, +2 levels for +1d
      attack: {
        hit: `
          The target takes 4d10 + \\glossterm{power} psychic \\glossterm{subdual damage}.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
          You gain a +4 accuracy bonus if the target has a negative Intelligence.
        `,
      },
      rank: 6,
      scaling: 'damage',
      tags: ['Emotion'],
    },

    {
      name: 'Restore Bravado',

      effect: `
        Chose yourself or one \\glossterm{ally} within \\medrange.
        The target regains 1d10 + \\glossterm{power} \\glossterm{damage resistance} and increases its \\glossterm{fatigue level} by one.
        In addition, it gains a +2 bonus to its Mental defense this round.
        This defense bonus is \\abilitytag{Swift}, but the recovery is not.
      `,
      rank: 2,
      scaling: { special: 'The recovery increases by +1d for each rank beyond 2.' },
      tags: ['Swift (see text)'],
    },

    {
      name: 'Empowered Restore Bravado',

      functionsLike: {
        name: 'restore bravado',
        exceptThat: 'the recovery increases to 4d10 + \\glossterm{power}.',
      },
      rank: 6,
      scaling: { special: 'The recovery increases by +1d for each rank beyond 6.' },
      tags: ['Swift (see text)'],
    },
  ],
  rituals: [
    {
      name: 'Animal Messenger',

      castingTime: 'one minute',
      attack: {
        hit: `
          The target is compelled to deliver a message for you.
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
          You take a -10 penalty to \\glossterm{accuracy} with this attack against creatures who have made an attack or been attacked since the start of the last round.
        `,
      },
      rank: 2,
      type: 'Attune',
    },

    {
      name: 'Tell the Truth',

      castingTime: 'one minute',
      attack: {
        hit: `Each target is unable to say things it knows to be untrue.`,
        targeting: `
          Make an attack vs. Mental with a +4 \\glossterm{accuracy} bonus against up to five creatures within \\medrange.
        `,
      },
      rank: 3,
      type: 'Attune',
    },

    {
      name: 'Antipathy',

      // original targets: ['One Large or smaller object within \\medrange', 'Creatures near the target (see text)']
      castingTime: '24 hours',
      attack: {
        crit: `The creature is \\panicked instead of frightened.`,
        hit: `The creature is \\frightened by the chosen object until it takes a \\glossterm{short rest}.`,
        targeting: `
        Choose a creature type: aberration, animal, animate, dragon, humanoid, magical beast, monstrous humanoid, planeforged, or undead.
        In addition, choose one Large or smaller object within \\medrange.
        If the target is moved, this effect ends.

        Whenever a creature of the chosen type enters a \\largearea radius \\glossterm{emanation} from the chosen object, make a \\glossterm{reactive attack} vs. Mental against it.
        Your accuracy with this attack is equal to half your level \\add half your Perception.
        This accuracy is calculated at the time that you perform this ritual and does not change afterwards.
        After you make this attack against a particular creature, you do not make this attack against it again until it takes a \\glossterm{short rest}.
        `,
      },

      rank: 4,
      tags: ['Emotion'],
      type: 'Attune',
    },

    {
      name: 'Sympathy',

      castingTime: '24 hours',
      attack: {
        crit: `The creature is also compelled to get as close as possible to the chosen object to admire it in greater detail.`,
        hit: `The creature is fascinated by the chosen object until it takes a \\glossterm{short rest}.
        It can take no actions other than staring at the object.
        It is \\unaware of any attacks against it, and anything else going on its environment.
        Any act by you or by creatures that appear to be your allies that threatens or harms the creature breaks the effect.
        Harming the creature is not limited to dealing it damage, but also includes causing it significant subjective discomfort.
        `,
        targeting: `
        Choose a creature type: aberration, animal, animate, dragon, humanoid, magical beast, monstrous humanoid, planeforged, or undead.
        In addition, choose one Large or smaller object within \\medrange.
        If the target is moved, this effect ends.

        Whenever a creature of the chosen type enters a \\largearea radius \\glossterm{emanation} from the target, make a \\glossterm{reactive attack} vs. Mental against it.
        Your accuracy with this attack is equal to half your level \\add half your Perception.
        This accuracy is calculated at the time that you perform this ritual and does not change afterwards.
        After you make this attack against a particular creature, you do not make this attack against it again until it takes a \\glossterm{short rest}.
        `,
      },
      rank: 4,
      tags: ['Emotion'],
      type: 'Attune',
    },
  ],
};
