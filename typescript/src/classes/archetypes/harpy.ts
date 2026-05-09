import { Creature } from '@src/character_sheet/creature';
import { RankAbility } from '../types';

export function harpyAbilities(): RankAbility[] {
  return [
    {
      complexity: 2,
      name: 'Luring Song',
      isMagical: true,
      rank: 1,
      description: `
        \\begin{magicalactiveability}{Luring Song}{Standard action}
          \\abilitytags \\abilitytag{Auditory}, \\abilitytag{Compulsion}
          \\rankline
          Make an attack vs. Mental against a creature within \\longrange.
          In addition, you begin a vocal performance (see \\pcref{Performance Types}).
          \\hit As a \\glossterm{condition}, the target must use all of its \\glossterm{available movement} to move towards you as best it can during each of its turns.
          In addition, it cannot move farther away from you at any time, except as necessary to get closer to you (such as to avoid an intervening obstacle).
          It can otherwise act freely, and is still able to attack you and your allies.
          It is not required to use abilities that would increase its available movement.

          The target will risk danger to reach you, such as moving towards your allies or swimming through rough water.
          However, it is not compelled to take actions that are guaranteed to damage harm it, such as jumping off of a cliff.
          If it cannot make any progress towards you, it remains in place.

          If the target notices you attacking it with any ability other than this one, or if you stop your vocal performance, this effect is automatically broken.
          When this effect ends, the target becomes immune to this effect until it finishes a \\glossterm{short rest}.

          \\rankline
          The attack's \\glossterm{accuracy} increases by \\plus1 for each rank beyond 1.
          In addition:
          \\rank{3} You can target an additional creature within range.
          \\rank{5} The maximum number of targets increases to 3.
          \\rank{7} The maximum number of targets increases to 5.
        \\end{magicalactiveability}
      `,
    },
    {
      complexity: 1,
      name: 'Harpy Wings',
      isMagical: false,
      rank: 2,
      description: `
        You gain a slow \\glossterm{fly speed} with a maximum height of 10 feet (see \\pcref{Flight}).
        As a \\glossterm{free action}, you can increase your \\glossterm{fatigue level} by one to ignore this height limit this turn.
        In addition, you reduce the penalties to your Armor and Reflex defenses for being \\glossterm{midair} by 2.
      `,
    },
    {
      complexity: 0,
      name: 'Sharp Talons',
      isMagical: false,
      rank: 3,
      description: `
        Your talons deal 1d6 damage and gain the \\abilitytag{Keen} \\glossterm{ability tag}.
      `,
    },
    {
      complexity: 0,
      name: 'Winged Agility+',
      isMagical: false,
      rank: 3,
      description: `
        The Armor defense bonus increases to \\plus3, and the Balance bonus increases to \\plus8.
      `,
    },
    {
      complexity: 2,
      name: 'Siren Song',
      isMagical: true,
      rank: 4,
      description: `
        \\begin{magicalsustainability}{Siren Song}{Standard action}
          \\abilitytags \\abilitytag{Auditory}, \\abilitytag{Emotion}, \\abilitytag{Sustain} (minor)
          \\rankline
          Make an attack vs. Mental against all \\glossterm{enemies} within a \\medarea radius from you.
          In addition, you begin a vocal performance (see \\pcref{Performance Types}).
          \\hit The target is both \\charmed by you and \\stunned as long as it can still hear your vocal performance.
          It remains stunned even if it stops being charmed, such as if you or your allies attack it.
          This ability does not have the \\abilitytag{Subtle} tag, so an observant target may notice that it is being influenced.
          \\rankline
          The attack\\'s \\glossterm{accuracy} increases by \\plus1 for each rank beyond 4.
          In addition:
          \\rank{6} The area increases to a \\largearea radius.
        \\end{magicalsustainability}
      `,
    },
    {
      complexity: 1,
      name: 'Caress the Enthralled',
      isMagical: false,
      rank: 5,
      description: `
        You gain a \\plus2 accuracy bonus against creatures that are affected by either your \\ability{luring song} or \\ability{siren song} ability.
      `,
    },
    {
      complexity: 1,
      name: 'Harpy Wings+',
      isMagical: false,
      rank: 6,
      description: `
        Your fly speed increases to average, and its maximum height increases to 30 feet.
      `,
    },
    {
      complexity: 0,
      name: 'Sharp Talons+',
      isMagical: false,
      rank: 7,
      description: `
        Your talons deal 1d8 damage.
      `,
    },
    {
      complexity: 1,
      name: 'Mythic Siren',
      isMagical: true,
      rank: 7,
      description: `
        You gain a \\plus5 \\glossterm{accuracy} bonus with your \\ability{luring song} and \\ability{siren song} abilities, and they gain the \\atSubtle tag.
        Targets still observe your performance, but they do not realize they are being magically compelled, which can change how they react to you.
      `,
    },
  ];
}

export function harpy(_creature: Creature, _rank: number) {
  // Harpy wings and talons
}
