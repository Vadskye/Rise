import { MysticSphere } from '.';
import { CONDITION_CRIT } from './constants';

export const enchantment: MysticSphere = {
  name: 'Enchantment',
  hasImage: true,
  shortDescription: 'Enchant the minds of your foes and allies.',
  sources: ['arcane', 'divine', 'soulkeeper'],

  cantrips: [
    {
      name: 'Cheer',

      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The target's mood improves and it feels more cheerful.
      `,
      roles: ['narrative'],
      tags: ['Emotion'],
      type: 'Sustain (attuneable, minor)',
    },
  ],
  spells: [
    // A full action skip is 3 EA. This is roughly 50% as strong, so 1.5 EA? That's pretty
    // generous, but Repeat is an interesting concept, so we'll test it.
    {
      name: 'Repeat',

      attack: {
        hit: `
          During the next round, the target must repeat the same standard action that it took this round if possible.
          It can choose different targets or otherwise make different decisions about its action, but the action must be the same.
          This does not affect its other actions, such as movement.
          If it is unable to take the same standard action, it can act normally.
          For example, if the target used the \\ability{recover} ability this round, which can only be used once per short rest, its actions would not be restricted next round.

          After the target repeats or fails to repeat its action in this way, it becomes immune to this effect until it finishes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against up to two creatures within \\shortrange.
        `,
      },
      roles: ['stasis'],
      rank: 2,
      scaling: 'accuracy',
      tags: ['Compulsion'],
    },
    // TODO: too strong now that accuracy is nerfed?
    {
      name: 'Sympathetic Link',

      effect: `
        Whenever you use a \\atCompulsion or \\atEmotion ability that makes an attack, you can choose to include yourself as a target.
        If you do, the attack automatically hits you.
        As long as you are not immune to the ability or any part of its effects, this grants you a \\plus2 \\glossterm{enhancement bonus} to \\glossterm{accuracy} with that ability against its other targets.
      `,
      rank: 3,
      roles: ['attune'],
      type: 'Attune',
    },

    // TODO: EA math, this is weird and not terribly strong
    {
      name: 'Curated Threat',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          As a \\glossterm{condition}, the target's assessment of the threat you pose matches your intention.
          If you chose to appear powerful, they consider you to be their most powerful currently present foe.
          Likewise, if you chose to appear weak, they consider you to be their weakest currently present foe.
          This effect only changes how the target perceives you relative to its other enemies, and does not correlate to a specific level of power.
          Depending on the creature's personality and intentions, this may cause them to prioritize you as a target or avoid you.
        `,
        targeting: `
          When you cast this spell, you choose to appear either powerful or weak.

          Whenever an \\glossterm{enemy} enters a \\largearea radius \\glossterm{emanation} from you, make a \\glossterm{reactive attack} vs. Mental against them.
          After you attack a creature this way, it becomes immune to this attack from you until it finishes a \\glossterm{short rest}.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      roles: ['attune'],
      tags: ['Emotion', 'Subtle'],
      // Probably complex enough to be deep? But it doesn't change combat math that much,
      // so deep for this would feel punishing.
      type: 'Attune',
    },

    {
      name: 'Monologue',

      attack: {
        crit: CONDITION_CRIT,
        hit: `As a \\glossterm{condition}, the target is forced to speak out loud constantly whenever it can.
        This does not control what it talks about, so a reasonably savvy creature may be able to avoid revealing anything of great interest.
        In combat, most creatures with an intelligence of 0 or less will explain their thoughts about the combat, which can help you predict their actions.`,
        targeting: `
          This spell has no \\glossterm{verbal components} or \\glossterm{somatic components}.

          Make an attack vs. Mental with a +2 accuracy bonus against one creature within \\medrange.
        `,
      },
      rank: 1,
      roles: ['narrative'],
      scaling: 'accuracy',
      tags: ['Compulsion', 'Subtle'],
    },

    {
      name: 'Dance',

      // Assuming they never dance, this is roughly stunned, which is 3 EA.
      // Assuming they dance every other round, this is 0.75 EA from defense debuff and 25%
      // action denial from anti-movement, which is 0.75 EA + 3 EA = 3.75 EA??
      // But letting the target choose between those two options makes it weaker than
      // stunned with a slower ramp time, so call it 2.6 EA. That's r7, or r6 limited
      // scope.
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          As a \\glossterm{condition}, the target is compelled to dance.
          It can spend a \\glossterm{move action} to dance, if it is physically capable of dancing.
          At the end of each movement phase, if the target did not dance during that phase, it takes a -1 penalty to its defenses as the compulsion intensifies.
          This penalty stacks each round up to a maximum of -4.
          When the target dances, it resets its penalties to 0.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius within \\shortrange.
        `,
      },

      rank: 6,
      roles: ['flash'],
      scaling: 'accuracy',
      tags: ['Compulsion'],
    },

    // Ranged prone is 1.6 EA, or r2 +1r for area rank gives a r4 area.
    {
      name: 'Collapse',

      attack: {
        hit: `The target falls \\prone.`,
        targeting: `
          Make an attack vs. Mental against all Large or smaller \\glossterm{enemies} in a \\smallarea radius within \\shortrange.
        `,
      },
      rank: 3,
      roles: ['flash'],
      scaling: 'accuracy',
      tags: ['Compulsion'],
    },

    // Brief + HP goad is 1.6 EA, or r2.
    {
      name: 'Taunt',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\glossterm{briefly} \\goaded by you.
          If it \\glossterm{injured}, it is also goaded by you as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against up to two creatures within \\medrange.
        `,
      },
      rank: 2,
      roles: ['trip', 'maim'],
      scaling: 'accuracy',
      tags: ['Emotion'],
    },

    // HP confusion is 2.9 EA. Limited scope lets us sneak in at r7.
    {
      name: 'Confusion',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          If the target is \\glossterm{injured}, it is \\confused as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius within \\shortrange.
        `,
      },
      rank: 7,
      roles: ['maim'],
      tags: ['Compulsion'],
    },

    {
      name: 'Dominate Person',

      // Stunned as a condition is 3 EA. Humanoid only is about -0.4 EA, and limited scope
      // is r6.
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\stunned as a \\glossterm{condition}.
          If the target is currently unconscious due to \\glossterm{vital wounds} and is not \\glossterm{elite}, you can choose to \\glossterm{attune} to this ability.
          When you do, it becomes \\dominated by you for the duration of that attunement.
          This attunement only allows you to control one creature, not each target of this spell, and you can only attune to this effect once.
        `,
        targeting: `
          Make an attack vs. Mental against up to three humanoid creatures within \\medrange.
        `,
      },
      rank: 6,
      roles: ['softener'],
      scaling: 'accuracy',
      tags: ['Compulsion'],
    },

    {
      name: 'Sleep',

      // prebuff ranged slow is 2.5 EA, and add 0.2 EA for the narrative effect. With
      // limited scope, we can get away with r6.
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target feels sleepy as a \\glossterm{condition}.
          If it can find a convenient opportunity to go to sleep, it will do so.
          This generally will not remove it from combat or high pressure social situations, and it will generally take the time to find a convenient place to sleep rather than simply dropping asleep in the middle of a room.
          In addition, while the target is \\glossterm{injured}, it is \\slowed.

          While asleep, the target can be awakened normally, such as by taking damage.
        `,
        targeting: `
          This spell has no \\glossterm{verbal components}.

          Make an attack vs. Mental against up to three creatures within \\medrange.
        `,
      },

      rank: 6,
      roles: ['maim', 'softener'],
      scaling: 'accuracy',
      tags: ['Emotion'],
    },

    {
      name: 'Mind Blank',

      // action skip is r3 with limited scope
      attack: {
        hit: `
          If the target is \\glossterm{injured}, it is compelled to spend its next \\glossterm{standard action} doing nothing at all.
          After it takes this standard action, it becomes \\trait{immune} to this effect until it finishes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against up to two creatures within \\medrange.
        `,
      },
      rank: 3,
      roles: ['stasis', 'maim'],
      scaling: 'accuracy',
      tags: ['Compulsion'],
    },

    // r4 base, +1r for extended range, +1r because large area mind blank is scary?
    {
      name: 'Mass Mind Blank',

      functionsLike: {
        name: 'mind blank',
        // TODO: awkward wording
        exceptThat:
          'the attack affects all \\glossterm{enemies} in a \\smallarea within \\medrange. If the target would be immune to \\spell{mind blank}, it is also immune to this spell, and vice versa.',
      },
      rank: 6,
      roles: ['stasis', 'maim'],
      scaling: 'accuracy',
      tags: ['Compulsion'],
    },

    {
      name: 'Selfstrike',

      // Action denial is 3 EA. Attacking yourself is roughly one action? so 4 EA. Only
      // working in HP is 66%, so 2.8 EA. That's r7 with limited scope.
      // TODO: better EA math. Only 1 EA for a self-strike is probably wrong, and HP brief
      // is not well defined.
      attack: {
        hit: `
          If the target is \\glossterm{injured}, it is compelled to make a \\glossterm{strike} against itself using its next \\glossterm{standard action}.
          It cannot target any other creatures with the strike, even if it has a Sweeping weapon or similar abilities.
          The target uses whatever type of strike it believes will be most effective, as if it was attacking an enemy.

          After it makes this attack against itself, it becomes \\trait{immune} to this effect until it finishes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against up to three creatures within \\medrange.
        `,
      },
      roles: ['maim', 'stasis'],
      rank: 7,
      scaling: 'accuracy',
      tags: ['Compulsion'],
    },

    // Frightened by you as a condition is 2.1 EA.
    {
      name: 'Cause Fear',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\frightened by you as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      rank: 5,
      roles: ['flash'],
      scaling: 'accuracy',
      tags: ['Emotion'],
    },

    // TODO: update
    // {
    //   name: 'Fearsome Aura',

    //   attack: {
    //     crit: CONDITION_CRIT,
    //     hit: `The target is \\frightened by you as a \\glossterm{condition}.`,
    //     targeting: `
    //       Whenever an \\glossterm{enemy} enters a \\medarea radius \\glossterm{emanation} from you, make a \\glossterm{reactive attack} vs. Mental against them.
    //       After you attack a creature this way, it becomes immune to this attack from you until it finishes a \\glossterm{short rest}.
    //     `,
    //   },
    //   rank: 4,
    //   scaling: 'accuracy',
    //   tags: ['Emotion'],
    //   type: 'Attune (deep)',
    // },

    // {
    //   name: 'Intense Fearsome Aura',

    //   attack: {
    //     crit: CONDITION_CRIT,
    //     hit: `The target is \\panicked by you as a \\glossterm{condition}.`,
    //     targeting: `
    //       Whenever an \\glossterm{enemy} enters a \\smallarea radius \\glossterm{emanation} from you, make a \\glossterm{reactive attack} vs. Mental against them.
    //       After you attack a creature this way, it becomes immune to this attack from you until it finishes a \\glossterm{short rest}.
    //     `,
    //   },
    //   rank: 7,
    //   scaling: 'accuracy',
    //   tags: ['Emotion'],
    //   type: 'Attune (deep)',
    // },

    {
      name: 'Charm',

      attack: {
        hit: `The target is \\charmed by you.`,
        targeting: `
          This spell has no \\glossterm{verbal components}.

          Make an attack vs. Mental against one creature within \\medrange.
          You take a -10 penalty to \\glossterm{accuracy} with this attack against creatures who have made an attack or been attacked since the start of the last round.
        `,
      },
      rank: 3,
      roles: ['narrative', 'softener'],
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
      roles: ['narrative', 'softener'],
      scaling: 'accuracy',
      tags: ['Emotion', 'Subtle'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Calm Emotions',

      // TODO: unclear rank
      attack: {
        hit: `
          The target has its emotions calmed.
          The effects of all other \\abilitytag{Emotion} abilities on it are \\glossterm{suppressed}.
          It cannot take violent actions (although it can defend itself) or do anything destructive.
          If the target is harmed or feels that it is in danger, this effect is \\glossterm{dismissed}.
          Harming the target is not limited to dealing it damage, but also includes causing it significant subjective discomfort.
        `,
        targeting: `
          Make an attack vs. Mental against all creatures in a \\largearea radius from you.
          You take a -10 penalty to \\glossterm{accuracy} with this attack against creatures who have made an attack or been attacked since the start of the last round.
        `,
      },
      rank: 3,
      roles: ['cleanse', 'softener'],
      scaling: 'accuracy',
      tags: ['Emotion'],
      type: 'Sustain (standard)',
    },

    {
      name: 'Demotivate',

      // Assume this affects 5 of the 15 actions, so it's 1 EA by default. Add 0.4 EA for
      // stacking and +1r for the accuracy bonus.
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target takes a -2 penalty to Mental defense as a \\glossterm{condition}.
          Unlike normal conditions, this effect stacks with itself if applied multiple times, up to a maximum of -10.
        `,
        targeting: `
          This spell has no \\glossterm{verbal components}.

          Make an attack vs. Mental with a +2 bonus against up to two creatures within \\medrange.
        `,
      },
      roles: ['softener'],
      rank: 2,
      scaling: 'accuracy',
      tags: ['Emotion', 'Subtle'],
    },

    {
      name: 'Ominous Presence',

      effect: `
        If you have Intimidate as a \\glossterm{trained skill}, you gain a +3 \\glossterm{enhancement bonus} to it.
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
      name: 'Alluring Presence',

      effect: `
        If you have Persuasion as a \\glossterm{trained skill}, you gain a +3 \\glossterm{enhancement bonus} to it.
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
      name: 'Solipsism',

      // TODO: EA calc. This is kind of a permanent action denial, but easily removed so
      // it's hard to abuse?
      attack: {
        hit: `
          If the target is \\glossterm{injured}, it becomes deluded as a \\glossterm{condition}.
          It believes that it is the only real creature, and the rest of the world is an illusion.
          It may wander aimlessly, but generally takes no action to defend itself or attack others.
          This generally means it is at least \\partiallyunaware of any attacks against it.
          It still avoids obvious environmental hazards, such as cliff edges or fires.
          If it takes any damage or is otherwise harmed, including significant subjective discomfort, this effect is automatically broken.

          After this effect ends, the target becomes immune to it until it finishes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against up to two creatures within \\medrange.
        `,
      },
      rank: 7,
      roles: ['maim', 'stasis'],
      tags: ['Emotion', 'Subtle'],
    },

    {
      name: 'Friend to Animals',

      effect: `
        If you have Creature Handling as a \\glossterm{trained skill}, you gain a +3 \\glossterm{enhancement bonus} to it.
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

    // HP prebuff stun is 1.6 EA
    {
      name: 'Agony',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          As a \\glossterm{condition}, the target feels excruciating pain from even minor injuries.
          While it is \\glossterm{injured}, it is \\stunned.
        `,
        targeting: `
          Make an attack vs. Mental against up to two creatures within \\medrange.
        `,
      },
      rank: 2,
      roles: ['maim'],
      scaling: 'accuracy',
      tags: ['Emotion'],
    },

    // {
    //   name: 'Crippling Agony',

    //   attack: {
    //     crit: CONDITION_CRIT,
    //     hit: `
    //       As a \\glossterm{condition}, the target feels crippling pain from even minor injuries.
    //       While it is at less than its maximum \\glossterm{hit points}, it is \\immobilized.
    //     `,
    //     targeting: `
    //       Make an attack vs. Mental against one creature within \\medrange.
    //     `,
    //   },
    //   rank: 7,
    //   scaling: 'accuracy',
    //   tags: ['Emotion'],
    // },

    {
      name: 'Friend to Foe',

      // +0.4 EA over mind blank because attacking allies can be strong?
      // Don't scale enemy count because action skip scales strongly with enemy count.
      attack: {
        hit: `
          If the target is \\glossterm{injured}, it \\glossterm{briefly} sees all creatures as its \\glossterm{enemies}.
          It is compelled to attack the creature closest to it, choosing randomly between equally close creatures.
          After this effect ends, the target becomes immune to this spell until it finishes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against up to two creatures within \\medrange.
        `,
      },
      rank: 5,
      roles: ['stasis'],
      scaling: 'accuracy',
      tags: ['Compulsion'],
    },

    {
      name: 'Mind Crush',

      // -1dr for conditional +4 accuracy
      attack: {
        hit: `
          \\damagerankone.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\shortrange.
          You gain a +4 accuracy bonus if the target has a negative Intelligence.
        `,
      },
      rank: 1,
      roles: ['burst'],
      scaling: 'damage',
      tags: ['Compulsion', 'Subdual'],
    },
    {
      name: 'Mighty Mind Crush',

      attack: {
        hit: `
          \\damagerankfive, and any \\glossterm{extra damage} is doubled.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\shortrange.
          You gain a +4 accuracy bonus if the target has a negative Intelligence.
        `,
      },
      rank: 5,
      roles: ['burst'],
      scaling: 'damage',
      tags: ['Compulsion', 'Subdual'],
    },

    {
      name: 'Restore Bravado',

      // TODO: EA math on healing + buff
      cost: 'One \\glossterm{fatigue level} from the target.',
      // dr3
      effect: `
        Chose yourself or one \\glossterm{ally} within \\medrange.
        The target regains \\glossterm{hit points} equal to 1d8 \\add your power.
        In addition, it gains a +2 bonus to its Mental defense this round.
      `,
      rank: 2,
      roles: ['healing', 'boon', 'exertion'],
      // Flat would be 1d10, but power scaling means we shouldn't scale too much. TODO:
      // math.
      scaling: { special: 'The recovery increases by 2 for each rank beyond 2.' },
      tags: ['Swift'],
    },

    {
      name: 'Greater Restore Bravado',

      // TODO: EA math on healing + buff
      cost: 'One \\glossterm{fatigue level} from the target.',
      // dr7
      effect: `
        Chose yourself or one \\glossterm{ally} within \\medrange.
        The target regains \\glossterm{hit points} equal to 1d10 plus 1d10 per 2 power.
        In addition, it gains a +4 bonus to its Mental defense this round.
      `,
      rank: 6,
      roles: ['healing', 'boon', 'exertion'],
      // Flat would be 3d10, but power scaling means we shouldn't scale too much. TODO:
      // math.
      scaling: { special: 'The recovery increases by 1d10 for each rank beyond 6.' },
      tags: ['Swift'],
    },
    {
      name: 'Speak Only Truth',

      attack: {
        hit: `
          The target is unable to say things it knows to be untrue.
          It can still remain silent, say misleading truths, and so on.
        `,
        targeting: `
          Make an attack vs. Mental with a \\plus4 accuracy bonus against up to five creatures within \\medrange.
        `,
      },
      rank: 4,
      roles: ['narrative'],
      scaling: 'accuracy',
      type: 'Sustain (attuneable, standard)',
    },

    // Reactive brief frighten is 1.2 EA. Deep r2 spell is ~1.6 EA, so we can increase the
    // area.
    {
      name: 'Daunting Presence',

      attack: {
        hit: `
          The target is \\glossterm{briefly} \\frightened by you.
        `,
        targeting: `
          Whenever an \\glossterm{enemy} enters a \\largearea radius \\glossterm{emanation} from you, make a \\glossterm{reactive attack} vs. Mental against them.
          After you attack a creature this way, it becomes immune to this attack from you until it finishes a \\glossterm{short rest}.
        `,
      },
      rank: 2,
      roles: ['attune'],
      scaling: 'accuracy',
      tags: ['Emotion'],
      type: 'Attune (deep)',
    },

    // r5 attunement can give 1.2 EA
    {
      name: 'Efficient Daunting Presence',

      functionsLike: {
        name: 'daunting presence',
        exceptThat: 'it is a normal attunement instead of a \\glossterm{deep attunement}.',
      },
      rank: 5,
      roles: ['attune'],
      scaling: 'accuracy',
      tags: ['Emotion'],
      type: 'Attune',
    },

    // Injury stun is 1.2 EA. We compensate for the low debuff EA with the Intelligence
    // accuracy?
    {
      name: 'Psionic Blast',

      attack: {
        hit: `
          \\damageranktwo.
        `,
        injury: `
          The target is \\stunned as a \\glossterm{condition}.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\medarea cone from you.
          You gain a +4 accuracy bonus against each target with a negative Intelligence.
        `,
      },
      rank: 4,
      roles: ['clear', 'flash'],
      scaling: 'damage',
      tags: ['Compulsion', 'Subdual'],
    },

    {
      name: 'Mighty Psionic Blast',

      attack: {
        hit: `
          \\damagerankfive, and the target is \\glossterm{briefly} \\stunned.
        `,
        injury: `
          The target is stunned as a \\glossterm{condition}.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea cone from you.
          You gain a +4 accuracy bonus against each target with a negative Intelligence.
        `,
      },
      rank: 7,
      roles: ['clear', 'flash'],
      scaling: 'damage',
      tags: ['Compulsion', 'Subdual'],
    },

    {
      name: 'Mind Scour',

      // -1dr for debuff, -1d for +2a
      attack: {
        hit: `
          \\damagerankthree, and the target \\glossterm{briefly} takes a \\minus2 penalty to its Mental defense.
        `,
        targeting: `
          Make an attack vs. Mental with a \\plus2 accuracy bonus against one creature within \\medrange.
        `,
      },
      rank: 4,
      roles: ['burst'],
      scaling: 'damage',
      tags: ['Compulsion', 'Subdual'],
    },
  ],
};
