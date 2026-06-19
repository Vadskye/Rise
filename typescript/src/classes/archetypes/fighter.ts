import { Creature } from '@src/character_sheet/creature';
import { RankAbility } from '../types';

import { applyArchetypeActiveAbilities } from './apply_archetypes';

export function combatDiscipline(): RankAbility[] {
  return [
    {
      complexity: 1,
      name: 'Disciplined Reaction',
      isMagical: false,
      rank: 1,
      description: `
        You halve all penalties to your \\glossterm{accuracy}, \\glossterm{defenses}, and \\glossterm{speed} from temporary debuffs on you.
        This includes the defense and speed penalties from being \\slowed, the accuracy and Mental defense penalty from being \\frightened, and so on.
        It does not include permanent effects, such as if you are intrinsically \\vulnerable to attacks.
      `,
    },
    {
      complexity: 0,
      name: 'Enduring Discipline',
      isMagical: false,
      rank: 2,
      description: `
        You gain a \\plus2 bonus to your Mental defense and \\glossterm{maximum stamina}.
      `,
    },
    {
      complexity: 0,
      name: 'Enduring Discipline+',
      isMagical: false,
      rank: 5,
      description: `
        The bonuses increase to \\plus4.
      `,
    },
    {
      complexity: 2,
      name: 'Disciplined Blow',
      isMagical: false,
      rank: 3,
      description: `
        \\begin{activeability}{Disciplined Blow}{Standard action}
          \\rankline
          Make a \\glossterm{strike} that deals \\glossterm{extra damage} equal to half your \\glossterm{power}.
          You cannot get a \\glossterm{critical hit} with this strike.
          \\miss Half damage.

          \\rankline
          \\rank{4} The strike deals double \\glossterm{weapon damage}.
          \\rank{5} The extra damage increases to be equal to your power.
          \\rank{6} The strike deals quadruple \\glossterm{weapon damage}.
          \\rank{7} The extra damage increases to 1d6 per 2 power.
        \\end{activeability}
      `,
    },
    {
      complexity: 2,
      name: 'Cleansing Discipline',
      isMagical: false,
      rank: 4,
      description: `
        \\begin{activeability}{Cleansing Discipline}{Standard action}
          \\abilitycost You can spend one \\glossterm{stamina} to use this ability as a \\glossterm{minor action}.
          \\rankline
          Remove all \\glossterm{conditions} affecting you.
          In addition, you \\glossterm{briefly} become immune to all conditions.
        \\end{activeability}
      `,
    },
    {
      complexity: 1,
      name: 'Vital Discipline',
      isMagical: false,
      rank: 6,
      description: `
        You \\glossterm{briefly} ignore the vital wound effect of each vital wound you gain.
        While a vital wound is delayed in this way, you do not suffer any effects from its specific vital wound effect, but you still consider it when calculating your penalties to \\glossterm{vital rolls}.
      `,
    },
    {
      complexity: 0,
      name: 'True Discipline',
      isMagical: false,
      rank: 7,
      description: `
        You are immune to \\glossterm{conditions}.
      `,
    },
  ];
}

export function equipmentTraining(): RankAbility[] {
  return [
    {
      complexity: 1,
      name: 'Exotic Weapon Training',
      isMagical: false,
      rank: 1,
      description: `
        You can gain proficiency with \\glossterm{exotic weapons} at the cost of one \\glossterm{insight point} per weapon group (see \\pcref{Exotic Weapons}).
        You must already be proficient with all non-exotic weapons from that weapon group.
      `,
    },
    {
      complexity: 1,
      name: 'Armor Expertise',
      isMagical: false,
      rank: 1,
      description: `
        You gain a special ability based on the \\glossterm{usage class} of body armor you wear.
        \\begin{raggeditemize}
          \\item Light or unarmored: You gain a \\plus10 foot bonus to your \\glossterm{speed}.
          \\item Medium: You add your full Dexterity to your Armor defense, rather than only half your Dexterity like normal for medium armor.
          However, the maximum Armor defense bonus you can gain from Dexterity is \\plus4.
          Using a medium armor shield also does not reduce your Dexterity bonus to Armor defense, but using a heavy armor shield still halves it.
          \\item Heavy: You gain a \\plus1 bonus to your Armor, Brawn, and Fortitude defenses.
        \\end{raggeditemize}
      `,
    },
    {
      complexity: 1,
      name: 'Armed and Ready',
      isMagical: false,
      rank: 2,
      description: `
        Once per turn, you can draw or sheathe any non-shield weapon as a \\glossterm{free action}.
        This does not count against your normal one free action \\glossterm{object manipulation} per turn (see \\pcref{Manipulating Objects}).
      `,
    },
    {
      complexity: 2,
      name: 'Adaptive Blow',
      isMagical: false,
      rank: 3,
      description: `
        \\begin{activeability}{Adaptive Blow}{Standard action}
          \\rankline
          Make a \\glossterm{strike} that deals double \\glossterm{weapon damage}.
          In addition, choose one of the following tags: \\abilitytag{Keen}, \\abilitytag{Impact}, or \\abilitytag{Subdual} (see \\pcref{Ability Tags}).
          If the strike is a \\glossterm{melee} strike, you can alternatively choose the \\weapontag{Long} or \\weapontag{Sweeping} (1) \\glossterm{weapon tags}.
          The strike gains the benefit of your chosen tag if it did not already have that tag.

          \\rankline
          \\rank{4} The strike deals triple weapon damage.
          \\rank{5} The strike deals \\glossterm{extra damage} equal to half your power.
          \\rank{6} The strike deals five times weapon damage.
          \\rank{7} The strike deals eight times weapon damage.
        \\end{activeability}
      `,
    },
    {
      complexity: 0,
      name: 'Armored Core',
      isMagical: false,
      rank: 4,
      description: `
        While wearing body armor, you gain a \\plus1 bonus to your Armor defense.
      `,
    },
    {
      complexity: 3,
      name: 'Equipment Efficiency',
      isMagical: false,
      rank: 5,
      description: `
        Whenever you draw a weapon or don a shield, you can attune to it as a \\glossterm{free action} (see \\pcref{Item Attunement}).
      `,
    },
    {
      complexity: 0,
      name: 'Weapon Precision',
      isMagical: false,
      rank: 6,
      description: `
        You gain a \\plus1 \\glossterm{accuracy} bonus with \\glossterm{strikes}.
      `,
    },
    {
      complexity: 1,
      name: 'Armor Expertise+',
      isMagical: false,
      rank: 7,
      description: `
        You gain an additional special ability based on the usage class of your body armor.
        \\begin{raggeditemize}
          \\item Light or unarmored: You take no damage when an area ability attacks and misses your Armor or Reflex defense.
          This does not protect you from any non-damaging effects of those abilities, or from abilities that affect multiple specific targets without affecting an area.
          \\item Medium: You gain a \\plus2 bonus to your Brawn, Fortitude, and Reflex defenses, up to a maximum equal to your Armor defense.
          \\item Heavy: You double your armor's \\glossterm{durability} bonus.
        \\end{raggeditemize}
      `,
    },
  ];
}

export function martialMastery(): RankAbility[] {
  const abilities: RankAbility[] = [
    {
      complexity: 3,
      name: 'Martial Maneuvers',
      isMagical: false,
      rank: 1,
      description: `
        You can channel your martial prowess into dangerous attacks.
        You gain access to any combat style of your choice (see \\pcref{Maneuver Lists}).
        You may spend \\glossterm{insight points} to gain access to one additional combat style per insight point.
        You can only learn martial \\glossterm{maneuvers} from martial combat styles that you have access to.

        You learn two rank 1 martial \\glossterm{maneuvers}.
        You may spend \\glossterm{insight points} to learn one additional maneuver per insight point.

        When you gain access to a new \\glossterm{rank} in this archetype,
        you can exchange any number of maneuvers you know for other maneuvers,
        including maneuvers of a higher rank.

        \\advancement Some martial maneuvers also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
      `,
    },
    {
      complexity: 1,
      name: 'Martial Maneuvers+',
      isMagical: false,
      rank: 3,
      description: `
        You gain access to rank 3 martial maneuvers.
      `,
    },
    {
      complexity: 0,
      name: 'Martial Maneuvers+',
      isMagical: false,
      rank: 5,
      description: `
        You gain access to rank 5 martial maneuvers.
      `,
    },
    {
      complexity: 0,
      name: 'Martial Maneuvers+',
      isMagical: false,
      rank: 7,
      description: `
        You gain access to rank 7 martial maneuvers.
      `,
    },
    {
      complexity: 2,
      name: 'Augmented Maneuvers',
      isMagical: false,
      rank: 2,
      description: `
        You gain the ability to customize your martial maneuvers.
        For each rank 1 martial maneuver you know, choose one augment from the list below and apply it to that maneuver.
        The augment permanently changes the maneuver, so you can't use an unaugmented version of the maneuver.
        However, you can learn the same maneuver more than once and apply different augments to each version.

        Augments scale in power with your \`\`excess rank''.
        Your excess rank with a maneuver is equal to your rank in this archetype minus the rank of the maneuver.

        Whenever you increase your rank in this archetype, you can change your augments.
        However, you must still apply them to rank 1 martial maneuvers.
        {
        \\parhead{Counter Maneuver} You gain an accuracy bonus equal to twice your excess rank against creatures who made a \\glossterm{strike} against you since your last turn.
        You can only apply this augment to maneuvers which cause you to make a \\glossterm{strike}.

        \\parhead{Debilitating Maneuver} You gain an accuracy bonus equal to twice your excess rank.
        However, the maneuver deals half damage.
        You can only apply this augment to maneuvers that can deal damage.

        \\parhead{Defensive Maneuver} You \\glossterm{briefly} gain a bonus to your Armor defense equal to half your excess rank (minimum 1) when you use the maneuver.
        You can only apply this augment to maneuvers which cause you to make a \\glossterm{strike}.

        \\parhead{Mighty Maneuver} You deal \\glossterm{extra damage} equal to twice your excess rank.

        \\parhead{Precise Maneuver} You gain an accuracy bonus equal to your excess rank.
        }
      `,
    },
    {
      complexity: 0,
      name: 'Augmented Maneuvers+',
      isMagical: false,
      rank: 4,
      description: `
        You can also choose an augment for each of your rank 3 martial maneuvers.
      `,
    },
    {
      complexity: 0,
      name: 'Augmented Maneuvers+',
      isMagical: false,
      rank: 6,
      description: `
        You can also choose an augment for each of your rank 5 martial maneuvers.
      `,
    },
  ];
  return abilities;
}

export function sentinel(): RankAbility[] {
  return [
    {
      complexity: 0,
      name: 'Bulwark',
      isMagical: false,
      rank: 1,
      description: `
        You gain a \\plus1 bonus to all defenses.
      `,
    },
    {
      complexity: 0,
      name: 'Specialized Bulwark',
      isMagical: false,
      rank: 5,
      description: `
        You gain a \\plus1 bonus to your Armor defense and one other defense of your choice.
      `,
    },
    {
      complexity: 2,
      name: 'Threatening Influence',
      isMagical: false,
      rank: 2,
      description: `
        Your Huge or smaller \\glossterm{enemies} move at half speed while within a \\smallarea radius \\glossterm{emanation} from you.
        This does not affect creatures who are moving in a straight line directly towards you.
        It also has no effect on enemies that are able to move through your space freely, such as \\trait{incorporeal} or very large creatures.
      `,
    },
    {
      complexity: 0,
      name: 'Threatening Influence+',
      isMagical: false,
      rank: 6,
      description: `
        The area affected by this ability increases to a \\medarea radius \\glossterm{emanation} from you, and the maximum size category increases to Gargantuan.
      `,
    },
    {
      complexity: 2,
      name: "Sentinel's Challenge",
      isMagical: false,
      rank: 3,
      description: `
        \\begin{activeability}{Sentinel's Challenge}{Standard action}
          \\abilitytags \\abilitytag{Emotion}
          \\rankline
          Make a \\glossterm{strike}.
          \\hit The target is \\glossterm{briefly} \\goaded by you.
          If it was already briefly goaded by you, it becomes goaded by you until it finishes a \\glossterm{short rest}.

          \\rankline
          \\rank{4} You gain a \\plus1 accuracy bonus with the strike.
          \\rank{5} The strike deals double damage.
          \\rank{6} The accuracy bonus increases to \\plus2.
          \\rank{7} The strike deals triple damage.
        \\end{activeability}
      `,
    },
    {
      complexity: 0,
      name: 'Stalwart Sentinel',
      isMagical: false,
      rank: 4,
      description: `
        You gain a \\plus1 bonus to your Constitution.
      `,
    },
    {
      complexity: 1,
      name: 'Demanding Challenger',
      isMagical: false,
      rank: 7,
      description: `
        Each creature that is suffering penalties for being \\goaded by you takes an additional \\minus2 \\glossterm{accuracy} penalty against creatures other than you.
      `,
    },
  ];
}

export function tactician(): RankAbility[] {
  return [
    {
      complexity: 3,
      name: 'Battle Tactics',
      isMagical: false,
      rank: 1,
      description: `
        You can lead your allies using tactics appropriate for the situation.
        Choose two battle tactics from the list below.
        You can also spend \\glossterm{insight points} to learn one additional \\textit{battle tactic} per \\glossterm{insight point}.

        You can initiate a \\textit{battle tactic} as a \\glossterm{minor action}.
        When you initiate a battle tactic, you choose whether to use visual cues like gestures, auditory cues like shouts, or both to communicate your tactic with your allies.
        Your \\textit{battle tactics} can affect yourself and your \\glossterm{allies} who can either see or hear your efforts.
        Most battle tactics will only affect a limited number of targets.
        You choose the targets whenever you initiate or sustain the battle tactic.

        All \\textit{battle tactics} have the \\abilitytag{Sustain} (free) tag, so they last as long as you \\glossterm{sustain} them (see \\pcref{Sustained Abilities}).
        You cannot sustain multiple battle tactics simultaneously, and any existing \\textit{battle tactics} end as soon as you activate another battle tactic.

        {
        \\begin{sustainability}{Dogpile}{\\glossterm{Minor action}}
          \\abilitytags \\abilitytag{Sustain} (free)
          \\rankline
          Two targets each gain a \\plus2 accuracy bonus with the \\ability{grapple} ability and a \\plus2 bonus to their Brawn defense against \\atBrawling abilities (see \\pcref{Universal Combat Abilities}).

          \\rankline
          \\rank{4} The bonuses increases to \\plus3.
          \\rank{7} The bonuses increases to \\plus4.
        \\end{sustainability}

        \\begin{sustainability}{Duck and Cover}{\\glossterm{Minor action}}
          \\abilitytags \\abilitytag{Sustain} (free)
          \\rankline
          Choose two targets.
          Each target gains a \\plus1 bonus to its defenses against ranged \\glossterm{strikes}.

          \\rankline
          \\rank{4} The bonus also applies against any attacks that a target has \\glossterm{cover} from.
          \\rank{7} The bonus increases to \\plus2.
        \\end{sustainability}

        \\begin{sustainability}{Follow My Lead}{\\glossterm{Minor action}}
          \\abilitytags \\abilitytag{Sustain} (free)
          \\rankline
          Choose one adjacent \\glossterm{ally}.
          Whenever you hit a creature with a \\glossterm{strike}, that ally gains a \\plus1 accuracy bonus against that creature until your next turn.
          As normal, this bonus does not stack with itself.

          \\rankline
          \\rank{4} The ally can be within \\shortrange.
          \\rank{7} You can choose two allies instead of one.
        \\end{sustainability}

        \\begin{sustainability}{Group Up}{\\glossterm{Minor action}}
          \\abilitytags \\abilitytag{Sustain} (free)
          \\rankline
          Two targets each gain a \\plus1 bonus to their Armor defense if they are adjacent to each other.

          \\rankline
          \\rank{4} Both targets also gain a \\plus1 bonus to their Mental defense if they are adjacent to each other.
          \\rank{7} The bonuses increase to \\plus2.
        \\end{sustainability}

        \\begin{sustainability}{Hold The Line}{\\glossterm{Minor action}}
          \\abilitytags \\abilitytag{Sustain} (free)
          \\rankline
          Choose two targets.
          Your \\glossterm{enemies} move at half speed while adjacent to either of those targets.

          \\rankline
          \\rank{4} The effect persists for an additional five feet of the enemy's movement after they stop being adjacent to either targets.
          \\rank{7} The extra distance increases to 10 feet.
        \\end{sustainability}

        \\begin{sustainability}{Keep Moving}{\\glossterm{Minor action}}
          \\abilitytags \\abilitytag{Sustain} (free)
          \\rankline
          Choose two targets.
          Whenever a target ends a \\glossterm{move action} at least twenty feet away from where it started the move action, it \\glossterm{briefly} gains a \\plus1 bonus to its Armor defense.

          \\rankline
          \\rank{4} Each target affected by the Armor defense bonus also gains a \\plus1 bonus to its Reflex defense.
          \\rank{7} The bonuses increase to \\plus2.
        \\end{sustainability}

        \\begin{sustainability}{Lead From the Front}{\\glossterm{Minor action}}
          \\abilitytags \\abilitytag{Sustain} (free)
          \\rankline
          One \\glossterm{ally} gains a \\plus1 bonus to all defenses against \\glossterm{enemies} that you are adjacent to.

          \\rankline
          \\rank{4} The bonus also applies against \\glossterm{enemies} within 15 feet of you.
          \\rank{7} You can choose a second ally.
        \\end{sustainability}

        \\begin{sustainability}{Rush}{\\glossterm{Minor action}}
          \\abilitytags \\abilitytag{Sustain} (free)
          \\rankline
          Whenever a target uses the \\ability{sprint} ability, it gains \\plus10 feet of \\glossterm{available movement}.

          \\rankline
          \\rank{4} The speed bonus increases to \\plus20 feet.
          \\rank{7} The speed bonus increases to \\plus30 feet.
        \\end{sustainability}

        \\begin{sustainability}{Stand Your Ground}{\\glossterm{Minor action}}
          \\abilitytags \\abilitytag{Sustain} (free)
          \\rankline
          Choose two targets.
          At the end of each target's turn, if it did not change its location during that turn, it gains a \\plus1 bonus to its Armor defense until its location changes.

          \\rankline
          \\rank{4} Each target affected by the Armor defense bonus also gains a \\plus1 bonus to its Brawn defense.
          \\rank{7} The bonuses increase to \\plus2.
        \\end{sustainability}
        }
      `,
    },
    {
      complexity: 1,
      name: 'Take the Lead',
      isMagical: false,
      rank: 2,
      description: `
        You gain a \\plus1 bonus to \\glossterm{inititive}.
      `,
    },
    {
      complexity: 2,
      name: 'Coordinated Charge',
      isMagical: false,
      rank: 3,
      description: `
        \\begin{activeability}{Coordinated Charge}{Standard action}
          \\rankline
          You can move up to half your \\glossterm{speed} without reducing your \\glossterm{available movement}.
          You can \\glossterm{push} one adjacent \\glossterm{ally} along to match your movement.
          After you stop moving, you can make a melee \\glossterm{strike}.
          You gain a \\plus2 \\glossterm{accuracy} bonus with the strike for each of your \\glossterm{allies} that is adjacent to the target, to a maximum of \\plus4.


          \\rankline
          \\rank{4} The strike deals double \\glossterm{weapon damage}.
          \\rank{5} The strike deals \\glossterm{extra damage} equal to half your \\glossterm{power}.
          \\rank{6} The strike deals triple weapon damage.
          \\rank{7} The extra damage increases to be equal to your \\glossterm{power}, and you can move up to your full speed.
        \\end{activeability}
      `,
    },
    {
      complexity: 2,
      name: 'Shifting Stance',
      isMagical: false,
      rank: 4,
      description: `
        \\begin{sustainability}{Shifting Stance}{\\glossterm{Minor action}}
          \\abilitytags \\abilitytag{Sustain} (free)
          \\rankline
          You gain one of the following benefits:
          \\begin{raggeditemize}
            \\item Offense: You gain a \\plus1 accuracy bonus against adjacent \\glossterm{enemies}.
            \\item Defense: You gain a \\plus1 bonus to your defenses.
            \\item Support: One \\glossterm{ally} adjacent to you gains a \\plus1 accuracy bonus.
          \\end{raggeditemize}

          This effect immediately ends if you use this ability again.
        \\end{sustainability}
      `,
    },
    {
      complexity: 1,
      name: 'Strategist',
      isMagical: false,
      rank: 5,
      description: `
        You gain a \\plus1 bonus to your Intelligence.
      `,
    },
    {
      complexity: 0,
      name: 'Take the Lead+',
      isMagical: false,
      rank: 6,
      description: `
        The bonus increases to \\plus2.
      `,
    },
    {
      complexity: 0,
      name: 'Shifting Stance+',
      isMagical: false,
      rank: 7,
      description: `
        The bonus for each stance increases to \\plus2.
      `,
    },
  ];
}

export function combatDisciplineModifiers(creature: Creature, rank: number) {
  applyArchetypeActiveAbilities(creature, combatDiscipline(), rank);
  if (rank >= 2) {
    creature.addCustomModifier({
      name: 'Enduring Discipline',
      numericEffects: [
        {
          statistic: 'mental',
          modifier: rank >= 5 ? 4 : 2,
        },
        {
          statistic: 'maximum_stamina',
          modifier: rank >= 5 ? 4 : 2,
        },
      ],
    });
  }
}

export function equipmentTrainingModifiers(creature: Creature, rank: number) {
  applyArchetypeActiveAbilities(creature, equipmentTraining(), rank);
  if (rank >= 1) {
    // Assume light/unarmored usage for Expertise bonus
    creature.addSimpleModifier({
      name: 'Armor Expertise (Light)',
      statistic: 'speed',
      value: 10,
    });
  }

  if (rank >= 4) {
    creature.addSimpleModifier({
      name: 'Armored Core',
      statistic: 'armor_defense',
      value: 1,
    });
  }

  if (rank >= 6) {
    creature.addSimpleModifier({
      name: 'Weapon Precision',
      statistic: 'accuracy',
      value: 1,
    });
  }
}

export function martialMasteryModifiers(creature: Creature, rank: number) {
  applyArchetypeActiveAbilities(creature, martialMastery(), rank);

  // Each class picks a single combat style and chooses maneuvers from it.
  // Arbitrarily, we pick two maneuvers at rank 1, then one more every two ranks.
  // We use Perfect Precision for Fighter.
  if (rank >= 1) {
    creature.addManeuver('Heartpiercer');
    creature.addManeuver('Desperate Pierce');
  }
  if (rank >= 3) {
    creature.addManeuver('Pure Precision');
  }
  if (rank >= 5) {
    creature.addManeuver('Heartpiercer+');
  }
  if (rank >= 7) {
    creature.addManeuver('Pure Precision+');
  }
}

export function sentinelModifiers(creature: Creature, rank: number) {
  applyArchetypeActiveAbilities(creature, sentinel(), rank);
  if (rank >= 1) {
    creature.addCustomModifier({
      name: 'Bulwark',
      numericEffects: [{ statistic: 'all_defenses', modifier: 1 }],
    });
  }

  if (rank >= 4) {
    creature.addSimpleModifier({
      name: 'Stalwart Sentinel',
      statistic: 'constitution',
      value: 1,
    });
  }

  if (rank >= 5) {
    creature.addSimpleModifier({
      name: 'Specialized Bulwark',
      statistic: 'armor_defense',
      value: 1,
    });
    // Choosing Fortitude as the second defense arbitrarily
    creature.addSimpleModifier({
      name: 'Specialized Bulwark (Fortitude)',
      statistic: 'fortitude',
      value: 1,
    });
  }
}

export function tacticianModifiers(creature: Creature, rank: number) {
  applyArchetypeActiveAbilities(creature, tactician(), rank);
  if (rank >= 2) {
    creature.addSimpleModifier({
      name: 'Take the Lead',
      statistic: 'initiative',
      value: rank >= 6 ? 2 : 1,
    });
  }

  if (rank >= 4) {
    // Shifting Stance - Arbitrarily assume defense
    creature.addCustomModifier({
      name: 'Shifting Stance (Defense)',
      numericEffects: [
        { statistic: 'armor_defense', modifier: rank >= 7 ? 2 : 1 },
        { statistic: 'fortitude', modifier: rank >= 7 ? 2 : 1 },
        { statistic: 'reflex', modifier: rank >= 7 ? 2 : 1 },
        { statistic: 'mental', modifier: rank >= 7 ? 2 : 1 },
      ],
    });
  }

  if (rank >= 5) {
    creature.addSimpleModifier({
      name: 'Strategist',
      statistic: 'intelligence',
      value: 1,
    });
  }
}
