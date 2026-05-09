import { Creature } from '@src/character_sheet/creature';
import { RankAbility } from '../types';

export function incarnation(): RankAbility[] {
  return [
    {
      complexity: 2,
      name: 'Essence Spike',
      isMagical: true,
      rank: 1,
      description: `
        \\begin{magicalactiveability}{Essence Spike}{Standard action}
          \\abilitycost You \\briefly can't use this ability.
          \\abilitytags The tag of your \\ability{essence infusion}.
          \\rankline
          Make an attack against something within \\medrange.
          You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with this attack (see \\pcref{Power}).
          The defense against this attack depends on your \\textit{essence infusion}.
          \\begin{raggeditemize}
            \\item Armor defense: \\atWater.
            \\item Brawn defense: \\atAir, \\atEarth.
            \\item Fortitude defense: \\atAcid, \\atAuditory, \\atCold.
            \\item Reflex defense: \\atElectricity, \\atFire, \\atVisual.
            \\item Mental defense: \\atCompulsion, \\atEmotion.
          \\end{raggeditemize}
          \\hit \\damageranktwo.

          \\rankline
          \\rank{2} The damage increases to \\damagerankthree.
          \\rank{3} The damage increases to \\damagerankfour.
          \\rank{4} The damage increases to \\damagerankfive.
          \\rank{5} The damage increases to \\damageranksix.
          \\rank{6} The damage increases to \\damagerankseven.
          \\rank{7} The damage increases to \\damagerankeight.
        \\end{magicalactiveability}
      `,
    },
    {
      complexity: 2,
      name: 'Essence Flare',
      isMagical: true,
      rank: 2,
      description: `
        \\begin{magicalactiveability}{Essence Flare}{Standard action}
          \\rankline
          You are \\glossterm{briefly} \\focused.
          At the end of your next turn, if you hit with an attack that has your \\textit{essence infusion} tag during that turn, you repeat the full effect of this ability.
          Otherwise, you are \\glossterm{briefly} \\maximized.
        \\end{magicalactiveability}
      `,
    },
    {
      complexity: 2,
      name: 'Deep Tether',
      isMagical: false,
      rank: 3,
      description: `
        You gain a special ability depending on whether you are tethered or untethered.
        \\begin{raggeditemize}
          \\item Tethered: Choose an \\atAttune spell of rank 2 or lower from any \\glossterm{mystic sphere}.
          The spell must have your \\textit{essence infusion} tag, and it must not be a \\glossterm{deep attunement}.
          You gain the effect of that spell on you permanently.
          If the spell disables itself, you gain its benefit again after 10 minutes.
          \\item Untethered: The height limit of your fly speed increases to 15 feet.
        \\end{raggeditemize}
      `,
    },
    {
      complexity: 0,
      name: 'Essence Exemplar',
      isMagical: false,
      rank: 4,
      description: `
        The bonus to an attribute that you gain from being an incarnate increases to \\plus2.
      `,
    },
    {
      complexity: 1,
      name: 'Essence Infusion+',
      isMagical: true,
      rank: 5,
      description: `
        You become \\glossterm{immune} instead of resistant to attacks with your \\textit{essence infusion} tag.
        In addition, you gain a \\plus1 accuracy bonus with all abilities which have that tag.
      `,
    },
    {
      complexity: 2,
      name: 'Deep Tether+',
      isMagical: false,
      rank: 6,
      description: `
        You gain a special ability depending on whether you are tethered or untethered.
        \\begin{raggeditemize}
          \\item Tethered: You can choose up to two spells with a combined rank of 4 or less.
          \\item Untethered: The height limit of your fly speed increases to 30 feet.
          In addition, you gain a \\plus1 bonus to your \\glossterm{mundane power} and \\glossterm{magical power}.
        \\end{raggeditemize}
      `,
    },
    {
      complexity: 3,
      name: 'Essence Incarnate',
      isMagical: true,
      rank: 7,
      description: `
        \\begin{magicalactiveability}{Essence Incarnate}{Standard action}
          \\abilitycost One \\glossterm{fatigue level}, and you \\briefly can't use this ability.
          \\rankline
          You gain a benefit depending on whether you are tethered or untethered:
          \\begin{raggeditemize}
            \\item Tethered: You are \\glossterm{briefly} \\primed.
            During your next turn, if you hit with an attack that has your \\ability{essence infusion} tag, you are \\glossterm{briefly} primed again.
            \\item Untethered: You \\glossterm{briefly} become \\trait{incorporeal}.
            This makes you immune to \\glossterm{mundane}, \\atCreation, and \\atManifestation abilities, among other effects (see \\pref{Incorporeal}).
            If this effect ends while you are inside of a solid object, you are pushed back in the direction from which you entered that object until you emerge.
            You take 5d10 damage for every 5 feet that you are pushed in this way.
          \\end{raggeditemize}
          {}
        \\end{magicalactiveability}
      `,
    },
  ];
}

export function incarnationModifiers(creature: Creature, rank: number) {
  // Essence Exemplar
  if (rank >= 4) {
    // This is a bit tricky because we don't know which attribute was chosen.
    // However, we can assume the highest attribute was chosen.
  }

  // Essence Infusion+
  if (rank >= 5) {
    creature.addSimpleModifier({
      name: 'Essence Infusion+',
      statistic: 'accuracy',
      value: 1,
    });
  }

  // Deep Tether+ (Untethered)
  if (rank >= 6) {
    creature.addSimpleModifier({
      name: 'Deep Tether+',
      statistic: 'mundane_power',
      value: 1,
    });
    creature.addSimpleModifier({
      name: 'Deep Tether+',
      statistic: 'magical_power',
      value: 1,
    });
  }
}
