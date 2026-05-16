import { Creature } from '@src/character_sheet/creature';
import { RankAbility } from '../types';
import { addStandardManeuverModifiers } from '../definitions/standard_modifiers';
import { applyArchetypeActiveAbilities } from './apply_archetypes';

export function beastmaster(): RankAbility[] {
  return [
    {
      complexity: 2,
      name: 'Animal Companion',
      isMagical: true,
      rank: 1,
      description: `
        You can use the \\ability{animal companion} ability.
        This ability requires 8 hours of training and attunement which the target must actively participate in.
        You can convince a wild animal to undergo this training with the Creature Handling skill (see \\pcref{Creature Handling}).
        \\begin{magicalattuneability}{Animal Companion}{8 hours}
          \\abilitytags \\abilitytag{Attune}, \\abilitytag{Emotion}
          \\rankline
          This ability requires eight hours of training with a non-\\glossterm{elite} Medium or smaller animal \\glossterm{ally}.
          Its level must not exceed your level.
          The target serves as a loyal companion to you.
          It follows your directions to the best of its ability.

          Your magical connection to the animal improves its resilience and strength in combat.
          Its combat statistics are replaced with the values below.
          All other aspects of the animal, such as its speed and natural weapons, are unchanged.
          Animals are unable to understand complex concepts, so their ability to obey convoluted instructions is limited.
          Generally, your animal companion acts immediately before or after your action in combat, though the GM may decide that it acts separately in specific circumstances.

          \\begin{raggeditemize}
            \\item Its size category is Medium, and its \\glossterm{base speed} is 30 feet.
            \\item Its level is equal to your level.
            \\item It has no \\glossterm{resources}, and it cannot use abilities that would increase its fatigue level.
            \\item Its maximum \\glossterm{hit points} are equal to your level \\x your rank in this archetype, plus 10 additional hit points.
            \\item Its \\glossterm{injury point} is equal to half its maximum hit points.
            \\item Each of its \\glossterm{defenses} is equal to 4 \\add half your level.
            \\item Its \\glossterm{accuracy} is equal to your accuracy, but it makes its own attack rolls.
            \\item Its \\glossterm{power} is equal to half your power. You can use the higher of your \\glossterm{mundane power} and \\glossterm{magical power} for this ability.
            \\item It does not make \\glossterm{vital rolls}, but it automatically drops unconscious if it gains a \\glossterm{vital wound}. If it gains three vital wounds, it dies.
          \\end{raggeditemize}

          \\rankline
          \\rank{3} The animal's \\glossterm{power} becomes equal to your \\glossterm{power}.
          \\rank{5} The animal's strikes deal double \\glossterm{weapon damage}.
          \\rank{7} The animal's strikes deal triple \\glossterm{weapon damage}.
        \\end{magicalattuneability}
      `,
    },
    {
      complexity: 1,
      name: 'Animal Companion+',
      isMagical: true,
      rank: 4,
      description: `
        Your animal companion gains an \\glossterm{attunement point}.
        In addition, it gains a \\plus1 bonus to its \\glossterm{defenses}.
      `,
    },
    {
      complexity: 1,
      name: 'Animal Companion+',
      isMagical: true,
      rank: 7,
      description: `
        Your animal companion gains an additional attunement point.
        In addition, its defense bonus increases to \\plus2.
      `,
    },
    {
      complexity: 2,
      name: 'Tag-Team Takedown',
      isMagical: false,
      rank: 3,
      description: `
        As a standard action, you can use the \\ability{tag-team takedown} ability.
        When you use this ability, your animal companion generally waits until after you attack to make its own attack.
        \\begin{activeability}{Tag-Team Takedown}{Standard action}
          \\rankline
          Make a \\glossterm{strike} that deals 1d4 \\glossterm{extra damage}.
          Your \\ability{animal companion} gains the same extra damage this turn against each damaged creature.

          \\rankline
          \\rank{4} The extra damage increases to 1d10.
          \\rank{5} The extra damage increases to 1d10 \\add half your \\glossterm{power}.
          \\rank{6} The extra damage increases to 2d10 \\add half your \\glossterm{power}.
          \\rank{7} The extra damage increases to 2d10 \\add your \\glossterm{power}.
        \\end{activeability}
      `,
    },
    {
      complexity: 1,
      name: 'Survival Bond',
      isMagical: false,
      rank: 6,
      description: `
        Whenever you regain \\glossterm{hit points}, your animal companion also regains that many hit points.
      `,
    },
    {
      complexity: 0,
      name: 'Beast Bond',
      isMagical: false,
      rank: 2,
      description: `
        You gain a \\plus3 bonus to the Creature Handling skill and a \\plus1 bonus to \\glossterm{vital rolls}.
        In addition, your \\ability{animal companion} gains a \\plus1 bonus to its defenses.
      `,
    },
    {
      complexity: 0,
      name: 'Beast Bond+',
      isMagical: false,
      rank: 5,
      description: `
        The Creature Handling bonus increases to \\plus6.
        In addition, your animal companion's defense bonus increases to \\plus2.
      `,
    },
  ];
}

export function boundaryWarden(): RankAbility[] {
  return [
    {
      complexity: 2,
      name: "Warden's Wisdom",
      isMagical: false,
      rank: 1,
      description: `
        You gain two additional \\glossterm{insight points}.
        In addition, you can spend insight points to gain one additional Knowledge \\glossterm{trained skill} per insight point.
      `,
    },
    {
      complexity: 1,
      name: 'Know Your Weapons',
      isMagical: false,
      rank: 1,
      description: `
        You can gain proficiency with \\glossterm{exotic weapons} at the cost of one \\glossterm{insight point} per weapon group (see \\pcref{Exotic Weapons}).
        You must already be proficient with all non-exotic weapons from that weapon group.
      `,
    },
    {
      complexity: 0,
      name: 'Know Your Enemy',
      isMagical: false,
      rank: 4,
      description: `
        You gain a \\plus1 \\glossterm{accuracy} bonus against creatures associated with Knowledge skills that you are trained with.
      `,
    },
    {
      complexity: 0,
      name: 'Know Your Enemy+',
      isMagical: false,
      rank: 7,
      description: `
        You gain a \\plus2 bonus to all defenses against creatures associated with Knowledge skills that you are trained with.
      `,
    },
    {
      complexity: 1,
      name: 'Experienced Guide',
      isMagical: false,
      rank: 2,
      description: `
        You and your \\glossterm{allies} who can see or hear you can ignore \\glossterm{difficult terrain} from inanimate natural sources, such as \\glossterm{heavy undergrowth}.
        This also applies during overland travel.
        In addition, each ally who can see or hear you can use half of your skill modifier in place of its own for the Balance, Climb, Survival, and Swim skills.
      `,
    },
    {
      complexity: 1,
      name: "Warden's Warning",
      isMagical: false,
      rank: 6,
      description: `
        You and your \\glossterm{allies} who can see or hear you take no damage when an area ability attacks and misses a target's Armor or Reflex defense.
        This does not protect creatures from any non-damaging effects of those abilities, or from abilities that affect multiple specific targets without affecting an area.
      `,
    },
    {
      complexity: 0,
      name: 'Steadfast Warden',
      isMagical: false,
      rank: 5,
      description: `
        You gain a \\plus1 bonus to your Constitution.
      `,
    },
    {
      complexity: 2,
      name: 'Banestrike',
      isMagical: false,
      rank: 3,
      description: `
        \\begin{activeability}{Banestrike}{Standard action}
          \\rankline
          Make a \\glossterm{strike}.
          If the target is \\vulnerable to the strike or is \\glossterm{injured}, the strike deals double damage.

          \\rankline
          \\rank{4} You gain a \\plus1 accuracy bonus with the strike.
          \\rank{5} The strike deals double \\glossterm{weapon damage}.
          \\rank{6} The strike deals triple \\glossterm{weapon damage}.
          \\rank{7} If the strike would deal double damage, it deals triple damage instead.
        \\end{activeability}
      `,
    },
  ];
}

export function huntmaster(): RankAbility[] {
  return [
    {
      complexity: 2,
      name: 'Quarry',
      isMagical: false,
      rank: 1,
      description: `
        \\begin{sustainability}{Quarry}{\\glossterm{Minor action}}
          \\abilitytags \\abilitytag{Sustain} (attunable, free), \\abilitytag{Subtle}
          \\rankline
          Choose a creature you can see.
          That creature becomes your quarry.
          You gain a \\plus1 \\glossterm{accuracy} bonus against your quarry, and you gain a \\plus5 bonus to checks you make to follow tracks left by your quarry.
        \\end{sustainability}
      `,
    },
    {
      complexity: 0,
      name: 'Quarry+',
      isMagical: false,
      rank: 6,
      description: `
        The accuracy bonus from your \\ability{quarry} ability increases to \\plus2.
      `,
    },
    {
      complexity: 3,
      name: 'Hunting Styles',
      isMagical: false,
      rank: 2,
      description: `
        You learn specific hunting styles to defeat specific quarries.
        While your \\ability{quarry} ability is active, you and your \\glossterm{allies} who can see or hear you are called your hunting party.
        Hunting styles improve your hunting party's ability to fight your quarry.

        Choose two hunting styles from the list below.
        You can also spend \\glossterm{insight points} to learn one additional \\textit{hunting style} per \\glossterm{insight point}.
        When you use your \\textit{quarry} ability, you may also use one of your \\textit{hunting styles}.
        Each \\textit{hunting style} ability lasts as long as the \\textit{quarry} ability you used it with.
        {
        \\begin{magicaltriggeredability}{Anchoring}{Triggered}
          \\rankline
          As long as your quarry is within \\medrange of any member of your hunting party, it cannot \\glossterm{teleport}.

          \\rankline
          \\rank{5} The range increases to \\distrange.
        \\end{magicaltriggeredability}

        \\begin{magicaltriggeredability}{Bring Down}{Triggered}
          \\rankline
          If your quarry is \\glossterm{midair}, the accuracy bonus from \\ability{quarry} also applies to all members of your hunting party.

          \\rankline
          \\rank{5} The accuracy bonus also applies if your quarry used a fly or glide speed at any point since your last turn, even if it is currently grounded.
        \\end{magicaltriggeredability}

        \\begin{triggeredability}{Coordinated Stealth}{Triggered}
          \\rankline
          Your quarry takes a \\minus4 penalty to Awareness checks to notice members of your hunting party.

          \\rankline
          \\rank{5} The penalty increases to \\minus6.
        \\end{triggeredability}

        \\begin{triggeredability}{Decoy}{Triggered}
          \\abilitytags \\abilitytag{Emotion}
          \\rankline
          If your quarry is within \\shortrange of you, it is \\goaded by you.

          \\rankline
          \\rank{5} This effect instead applies if your quarry is within \\medrange of you.
        \\end{triggeredability}

        \\begin{magicaltriggeredability}{Distraction}{Triggered}
          \\rankline
          You do not gain the normal accuracy bonus against your quarry.
          If you are adjacent to your quarry, the rest of your hunting party gains a \\plus1 accuracy bonus against it.

          \\rankline
          \\rank{5} The accuracy bonus applies as long as you are within \\medrange of your quarry.
        \\end{magicaltriggeredability}

        \\begin{triggeredability}{Swarm Hunter}{Triggered}
          \\rankline
          When you use your \\textit{quarry} ability, you can choose five additional targets as your quarry.

          \\rankline
          \\rank{5} The number of additional targets is unlimited.
        \\end{triggeredability}

        \\begin{magicaltriggeredability}{Titanslayer}{Triggered}
          \\rankline
          If your quarry is Gargantuan or larger, the accuracy bonus from \\ability{quarry} also applies to all members of your hunting party that are adjacent to it.

          \\rankline
          \\rank{5} The accuracy bonus instead applies to each member that is within \\medrange of it.
        \\end{magicaltriggeredability}

        \\begin{triggeredability}{Vigilant}{Triggered}
          \\rankline
          Your quarry takes a \\minus4 penalty to Sleight of Hand and Stealth checks against members of your hunting party.

          \\rankline
          \\rank{5} The penalty increases to \\minus6.
        \\end{triggeredability}

        \\begin{triggeredability}{Wolfpack}{Triggered}
          \\rankline
          While your quarry is adjacent to at least two members of your hunting party, each adjacent \\glossterm{ally} gains a \\plus1 accuracy bonus against it.

          \\rankline
          \\rank{5} This effect instead applies if your quarry is within \\shortrange of at least two members of your hunting party.
        \\end{triggeredability}
        }
      `,
    },
    {
      complexity: 2,
      name: 'No Escape',
      isMagical: false,
      rank: 3,
      description: `
        \\begin{activeability}{No Escape}{Standard action}
          \\rankline
          Make a strike that deals 1d6 \\glossterm{extra damage}.
          \\hit If the target is your \\ability{quarry} and it moved away from you since your last turn, it is \\glossterm{briefly} \\slowed.
          \\injury If the target would be briefly slowed, it is also slowed as a \\glossterm{condition}.

          \\rankline
          \\rank{4} The strike deals double \\glossterm{weapon damage}.
          \\rank{5} The extra damage increases to 1d6 \\add half \\glossterm{power}.
          \\rank{6} The strike deals triple \\glossterm{weapon damage}.
          \\rank{7} The extra damage increases to 1d6 per 2 power.
        \\end{activeability}
      `,
    },
    {
      complexity: 0,
      name: 'Agile Hunter',
      isMagical: false,
      rank: 4,
      description: `
        You gain a \\plus1 bonus to your Dexterity.
      `,
    },
    {
      complexity: 0,
      name: 'Tracking Expert',
      isMagical: false,
      rank: 5,
      description: `
        The bonus from your \\ability{quarry} ability to follow tracks from your quarry increases to \\plus20.
        In addition, whenever your quarry \\glossterm{teleports}, you automatically know the distance and direction of the teleport if you can see them.
        If you are following their tracks, you can track where they teleported to in the same way.
      `,
    },
    {
      complexity: 0,
      name: 'Apex Hunter',
      isMagical: false,
      rank: 7,
      description: `
        While your \\ability{quarry} ability is active, if your quarry is aware of you, it is \\frightened of you.
        This is an \\atEmotion effect.
      `,
    },
  ];
}

export function scout(): RankAbility[] {
  return [
    {
      complexity: 1,
      name: 'Keen Vision',
      isMagical: false,
      rank: 1,
      description: `
        You reduce your \\glossterm{longshot penalty} by 1.
        You gain \\sense{low-light vision}, allowing you to see in \\glossterm{dim illumination} (see \\pcref{Low-light Vision}).
        In addition, you gain \\sense{darkvision} with a 60 foot range, allowing you to see in complete darkness (see \\pcref{Darkvision}).
        If you already have that ability, you increase its range by 60 feet.
      `,
    },
    {
      complexity: 1,
      name: 'Keen Vision+',
      isMagical: false,
      rank: 5,
      description: `
        The longshot penalty reduction increases to 2.
        In addition, the range of your darkvision increases by 120 feet.
        Your darkvision is also not disabled in \\glossterm{bright illumination} or when you become \\dazzled.
      `,
    },
    {
      complexity: 0,
      name: 'Swift Step',
      isMagical: false,
      rank: 2,
      description: `
        You gain a \\plus10 foot bonus to your \\glossterm{speed}.
      `,
    },
    {
      complexity: 0,
      name: 'Swift Step+',
      isMagical: false,
      rank: 7,
      description: `
        The speed bonus increases to \\plus20 feet.
      `,
    },
    {
      complexity: 2,
      name: 'Ambush',
      isMagical: false,
      rank: 3,
      description: `
        \\begin{activeability}{Ambush}{Standard action}
          \\rankline
          Move up to your speed, reducing your \\glossterm{available movement} normally.
          Then, you can make a \\glossterm{strike} that deals 1d4 \\glossterm{extra damage}.
          If the target was \\partiallyunaware or \\unaware of you before your movement, they remain so until after your strike.
          From an observer's perspective, the movement and the strike happen simultaneously in a blur of motion.
          In addition, you gain a \\plus2 accuracy bonus if the target is partially or fully unaware of your attack.

          \\rankline
          \\rank{4} The strike deals double \\glossterm{weapon damage}.
          \\rank{5} The extra damage increases to 2d6.
          \\rank{6} The extra damage increases to 3d6 \\add half \\glossterm{power}.
          \\rank{7} The extra damage increases to 5d6 \\add half \\glossterm{power}.
        \\end{activeability}
      `,
    },
    {
      complexity: 0,
      name: 'Experienced Scout',
      isMagical: false,
      rank: 4,
      description: `
        You gain a \\plus1 bonus to your Perception.
      `,
    },
    {
      complexity: 1,
      name: 'Blindsight',
      isMagical: false,
      rank: 6,
      description: `
        Your perceptions are so finely honed that you can sense your enemies without seeing them.
        You gain \\sense{blindsense} with a 120 foot range, allowing you to sense your surroundings without light (see \\pcref{Blindsense}).
        If you already have the blindsense ability, you increase its range by 120 feet.
        In addition, you gain \\sense{blindsight} with a 60 foot range, allowing you to see without light (see \\pcref{Blindsight}).
        If you already have the blindsight ability, you increase its range by 60 feet.
      `,
    },
    {
      complexity: 1,
      name: 'Hyperawareness',
      isMagical: false,
      rank: 7,
      description: `
        You gain a \\plus10 bonus to the Awareness skill.
      `,
    },
  ];
}

export function wildernessWarrior(): RankAbility[] {
  const abilities: RankAbility[] = [
    {
      complexity: 3,
      name: 'Wild Maneuvers',
      isMagical: false,
      rank: 1,
      description: `
        You can channel your connection to the wilderness into dangerous attacks.
        You gain access to one of the following \\glossterm{combat styles}: \\combatstyle{mobile hunter}, \\combatstyle{perfect precision}, or \\combatstyle{rip and tear}.
        You may spend \\glossterm{insight points} to gain access to one additional combat style per insight point, including combat styles other than those three.
        You can only learn wild \\glossterm{maneuvers} from wild combat styles that you have access to.

        You learn two rank 1 wild \\glossterm{maneuvers}.
        You may spend \\glossterm{insight points} to learn one additional maneuver per insight point.

        When you gain access to a new \\glossterm{rank} in this archetype,
        you can exchange any number of maneuvers you know for other maneuvers,
        including maneuvers of a higher rank.

        \\advancement Some wild maneuvers also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
      `,
    },
    {
      complexity: 1,
      name: 'Wild Maneuvers+',
      isMagical: false,
      rank: 3,
      description: `
        You gain access to rank 3 wild maneuvers.
      `,
    },
    {
      complexity: 0,
      name: 'Wild Maneuvers+',
      isMagical: false,
      rank: 5,
      description: `
        You gain access to rank 5 wild maneuvers.
      `,
    },
    {
      complexity: 0,
      name: 'Wild Maneuvers+',
      isMagical: false,
      rank: 7,
      description: `
        You gain access to rank 7 wild maneuvers.
      `,
    },
    {
      complexity: 2,
      name: 'Augmented Maneuvers',
      isMagical: false,
      rank: 2,
      description: `
        You gain the ability to customize your wild maneuvers.
        For each rank 1 wild maneuver you know, choose one augment from the list below and apply it to that maneuver.
        The augment permanently changes the maneuver, so you can't use an unaugmented version of the maneuver.
        However, you can learn the same maneuver more than once and apply different augments to each version.

        Augments scale in power with your \`\`excess rank''.
        Your excess rank with a maneuver is equal to your rank in this archetype minus the rank of the maneuver.

        Whenever you increase your rank in this archetype, you can change your augments.
        However, you must still apply them to rank 1 wild maneuvers.
        {
        \\parhead{Distant Maneuver} The range of your chosen maneuver doubles, and any \\glossterm{longshot penalty} that would apply is reduced by an amount equal to your excess rank.
        If your excess rank is at least 4, the range triples instead.
        You can only apply this augment to maneuvers that have a listed range.

        \\parhead{Mighty Maneuver} You deal \\glossterm{extra damage} equal to twice your excess rank.

        \\parhead{Mobile Maneuver} You can walk up to 5 feet per excess rank before or after using your chosen maneuver, up to a maximum distance equal to your \\glossterm{speed}.
        This does not reduce your \\glossterm{available movement}.
        You cannot apply this augment to maneuvers that already allow you to move using one of your movement modes.

        \\parhead{Precise Maneuver} You gain an accuracy bonus equal to your excess rank.

        \\parhead{Widened Maneuver} The area affected by your chosen maneuver doubles.
        If your excess rank is at least 4, the area triples instead.
        You can only apply this augment to maneuvers that affect an area.
        }
      `,
    },
    {
      complexity: 0,
      name: 'Augmented Maneuvers+',
      isMagical: false,
      rank: 4,
      description: `
        You can also choose an augment for each of your rank 3 wild maneuvers.
      `,
    },
    {
      complexity: 0,
      name: 'Augmented Maneuvers+',
      isMagical: false,
      rank: 6,
      description: `
        You can also choose an augment for each of your rank 5 wild maneuvers.
      `,
    },
  ];
  addStandardManeuverModifiers(abilities);
  return abilities;
}

export function beastmasterModifiers(creature: Creature, rank: number) {
  applyArchetypeActiveAbilities(creature, beastmaster(), rank);
  if (rank >= 2) {
    creature.addCustomModifier({
      name: 'Beast Bond',
      numericEffects: [{ statistic: 'vital_rolls', modifier: 1 }],
    });
  }
}

export function boundaryWardenModifiers(creature: Creature, rank: number) {
  applyArchetypeActiveAbilities(creature, boundaryWarden(), rank);
  if (rank >= 5) {
    creature.addSimpleModifier({
      name: 'Steadfast Warden',
      statistic: 'constitution',
      value: 1,
    });
  }
}

export function huntmasterModifiers(creature: Creature, rank: number) {
  applyArchetypeActiveAbilities(creature, huntmaster(), rank);
  if (rank >= 1) {
    creature.addSimpleModifier({
      name: 'Quarry (Accuracy)',
      statistic: 'accuracy',
      value: rank >= 6 ? 2 : 1,
    });
  }

  if (rank >= 4) {
    creature.addSimpleModifier({
      name: 'Agile Hunter',
      statistic: 'dexterity',
      value: 1,
    });
  }
}

export function scoutModifiers(creature: Creature, rank: number) {
  applyArchetypeActiveAbilities(creature, scout(), rank);
  if (rank >= 2) {
    creature.addSimpleModifier({
      name: 'Swift Step',
      statistic: 'speed',
      value: rank >= 7 ? 20 : 10,
    });
  }

  if (rank >= 4) {
    creature.addSimpleModifier({
      name: 'Experienced Scout',
      statistic: 'perception',
      value: 1,
    });
  }
}

export function wildernessWarriorModifiers(creature: Creature, rank: number) {
  applyArchetypeActiveAbilities(creature, wildernessWarrior(), rank);
  // Maneuvers
}
