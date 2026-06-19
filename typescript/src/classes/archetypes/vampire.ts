import { Creature } from '@src/character_sheet/creature';
import { RankAbility } from '../types';

export function vampire(): RankAbility[] {
  return [
    {
      complexity: 2,
      name: 'Blood Drain',
      isMagical: false,
      rank: 1,
      description: `
        Whenever you \\glossterm{injure} a \\trait{blooded} creature with blood using your bite natural weapon, you can spend one \\glossterm{stamina}.
        If you do, you regain \\glossterm{hit points} equal to the hit points the target lost from the strike, ignoring negative hit points and any damage increase from critical hits.
      `,
    },
    {
      complexity: 1,
      name: 'Gentle Fangs',
      isMagical: false,
      rank: 2,
      description: `
        Whenever you deal damage using your bite natural weapon, you can choose not to reduce the target's hit points below 0, or you can treat the damage as \\glossterm{subdual damage}.
        In addition, damage dealt using your bite natural weapon does not wake sleeping creatures unless you inflict a vital wound.
      `,
    },
    {
      complexity: 2,
      name: 'Sheltering Coffin',
      isMagical: true,
      rank: 2,
      description: `
        You can designate a coffin as your home coffin by completing a long rest in it every day for a week.
        The coffin must be sized and shaped appropriately for you to sleep in while completely enclosed in the coffin.
        When you take a \\glossterm{long rest} in your home coffin, you recover two \\glossterm{vital wounds} instead of one.
        In addition, you can cross running water without penalty while in your home coffin.
        You can only have one home coffin at a time.
      `,
    },
    {
      complexity: 2,
      name: 'Charming Gaze',
      isMagical: true,
      rank: 3,
      description: `
        \\begin{magicalsustainability}{Charming Gaze}{Standard action}
          \\abilitytags \\abilitytag{Emotion}, \\abilitytag{Subtle}, \\abilitytag{Sustain} (minor), \\abilitytag{Visual}
          \\rankline
          Make an attack vs. Mental against all humanoid creatures and undead creatures in a \\medarea cone from you.
          You take a \\minus10 penalty to \\glossterm{accuracy} with this attack against creatures who have made an attack or been attacked since the start of your last turn.
          \\hit The target is \\charmed by you.
          Any act by you or by creatures that appear to be your allies that threatens or harms the charmed person breaks the effect.
          Harming the target is not limited to dealing it damage, but also includes causing it significant subjective discomfort.
          An observant target may interpret overt threats to its allies as a threat to itself.

          \\rankline
          The attack's \\glossterm{accuracy} increases by \\plus2 for each rank beyond 3.
        \\end{magicalsustainability}
      `,
    },
    {
      complexity: 4,
      name: 'Creature of the Night',
      isMagical: true,
      rank: 4,
      description: `
        \\begin{magicalattuneability}{Creature of the Night}{Standard action}
          \\abilitytags \\abilitytag{Attune}
          \\rankline
          You \\glossterm{shapeshift} into the form of a Tiny bat, a Tiny rat, or your normal humanoid form.
          \\begin{raggeditemize}
            \\item Bat: While in your bat form, you gain \\sense{blindsense} (120 ft.) and \\sense{blindsight} (30 ft.).
              You cannot speak and have no \\glossterm{free hands}.
              All of your normal movement modes are replaced with an average fly speed with a 60 ft. height limit.
              Since you are Tiny, your base speed is reduced to 20 feet.
            \\item Rat: While in your rat form, you gain \\trait{scent} and \\trait{low-light vision}.
              You cannot speak and have no \\glossterm{free hands}, but you have four legs, making you \\trait{quadrupedal}.
              Since you are Tiny, your base speed is reduced to 20 feet, for a total speed of 30 feet.
          \\end{raggeditemize}

          In either non-humanoid form, you are unable to take any standard actions, but you can still take \\glossterm{move actions} in place of standard actions.
          Since you have no walk speed in those forms, flying does not make you \\unsteady.
          You cannot use this ability while \\helpless.
          When this ability ends, you do not regain your normal humanoid form until the start of your next turn.
        \\end{magicalattuneability}
      `,
    },
    {
      complexity: 1,
      name: 'Reviving Coffin',
      isMagical: true,
      rank: 5,
      description: `
        Your home coffin can revive you from death.
        As long as some part of your corpse, even just a pinch of ash, is placed inside your home coffin, you will resurrect there after 24 hours.
        Only the destruction of your home coffin or the total annihilation of your corpse can prevent your return.
      `,
    },
    {
      complexity: 0,
      name: 'Unholy Resilience',
      isMagical: false,
      rank: 5,
      description: `
        You gain a +1 bonus to your Armor, Brawn, Reflex, and Mental defenses.
        However, you take a -2 penalty to your Fortitude defense.
      `,
    },
    {
      complexity: 2,
      name: 'Dominating Gaze',
      isMagical: true,
      rank: 6,
      description: `
        \\begin{magicalactiveability}{Dominating Gaze}{Standard action}
          \\abilitytags \\abilitytag{Emotion}, \\abilitytag{Visual}
          \\rankline
          Make an attack vs. Mental against all humanoid \\glossterm{enemies} and undead enemies within a \\medarea \\glossterm{cone} from you.
          \\hit If the target is \\glossterm{injured} or its \\glossterm{character rank} is at least 2 lower than yours, it is \\confused as a \\glossterm{condition}.
          \\crit If the target was already confused from a previous use of this ability, you may \\glossterm{attune} to this ability.
          When you do, the target becomes \\dominated by you for the duration of that attunement.
          This attunement only allows you to control one creature, not each target of this spell, and you can only attune to this effect once.

          \\rankline
          The attack's \\glossterm{accuracy} increases by \\plus2 for each rank beyond 6.
        \\end{magicalactiveability}
      `,
    },
    {
      complexity: 1,
      name: 'Blood Drain+',
      isMagical: true,
      rank: 7,
      description: `
        You can use this ability without spending \\glossterm{stamina}.
        After you do, you \\glossterm{briefly} cannot do so again.
      `,
    },
    {
      complexity: 1,
      name: 'Reviving Coffin+',
      isMagical: true,
      rank: 7,
      description: `
        You can designate up to five home coffins, rather than only one.
        This can allow you to travel with one coffin while keeping others safe for emergencies.
      `,
    },
  ];
}

export function vampireModifiers(creature: Creature, rank: number) {
  // Unholy Resilience
  if (rank >= 5) {
    creature.addCustomModifier({
      name: 'Unholy Resilience',
      numericEffects: [
        { statistic: 'armor_defense', modifier: 1 },
        { statistic: 'brawn', modifier: 1 },
        { statistic: 'reflex', modifier: 1 },
        { statistic: 'mental', modifier: 1 },
        { statistic: 'fortitude', modifier: -2 },
      ],
    });
  }
}
