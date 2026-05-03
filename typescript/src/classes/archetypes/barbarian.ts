import { Creature } from '@src/character_sheet/creature';
import { RankAbility } from '../types';
import { addStandardManeuverModifiers } from '../definitions/standard_modifiers';

export function battleforgedResilienceAbilities(): RankAbility[] {
  return [
    {
      complexity: 2,
      name: 'Second Wind',
      isMagical: false,
      rank: 1,
      description: `
        \\begin{activeability}{Second Wind}{\\glossterm{Minor action}}
          \\abilitycost Two \\glossterm{fatigue levels}, and you cannot use this ability again until you finish a \\glossterm{short rest}.
          \\rankline
          You regain half of your maximum \\glossterm{hit points}.
        \\end{activeability}
      `,
    },
    {
      complexity: 0,
      name: 'Battle-Scarred',
      isMagical: false,
      rank: 2,
      description: `
        You gain a \\plus4 bonus to your \\glossterm{durability} (see \\pcref{Durability}).
        However, you also increase your \\glossterm{injury point} by 4.
        If your Constitution is 4 or higher, you gain an additional \\plus2 durability bonus.
      `,
    },
    {
      complexity: 0,
      name: 'Battle-Scarred+',
      isMagical: false,
      rank: 6,
      description: `
        The durability bonus increases to \\plus8, and the injury point bonus increases to 20.
        If your Constitution is 7 or higher, you gain an additional \\plus2 durability bonus.
      `,
    },
    {
      complexity: 2,
      name: 'Resilient Blow',
      isMagical: false,
      rank: 3,
      description: `
        \\begin{activeability}{Resilient Blow}{Standard action}
          \\rankline
          Make a melee \\glossterm{strike}.
          As a \\glossterm{brief} effect, whenever you would lose hit points that are below your \\glossterm{injury point}, you lose half that many hit points instead (minimum 1).

          \\rankline
          \\rank{4} You gain a \\plus1 accuracy bonus with the strike.
          \\rank{5} If you not \\glossterm{injured}, the strike deals double damage.
          \\rank{6} The strike always deals double damage.
          \\rank{7} The strike deals triple damage instead of double damage.
        \\end{activeability}
      `,
    },
    {
      complexity: 0,
      name: 'Primal Resilience',
      isMagical: false,
      rank: 4,
      description: `
        You gain a \\plus1 bonus to your Constitution.
      `,
    },
    {
      complexity: 1,
      name: 'Limitless Recovery',
      isMagical: false,
      rank: 5,
      description: `
        You can use the \\ability{recover} and \\ability{second wind} abilities any number of times between short rests.
        In addition, when you use the \\ability{recover} ability, you can also remove a \\glossterm{vital wound}.
        When you do, you increase your \\glossterm{fatigue level} by two.
      `,
    },
    {
      complexity: 1,
      name: 'Unbreakable',
      isMagical: false,
      rank: 7,
      description: `
        At the start of your turn, note your current hit points.
        Your hit points can't go lower than 100 less than that value until your next turn.
        This includes hit point loss below 0 hit points.
        Any excess damage beyond that point does not reduce your hit points, but it does offset any healing you receive before your next turn.
        Attacks with special effects, such as inflicting conditions on you, still treat you as if you lost hit points from the attack.
      `,
    },
  ];
}

export function battleragerAbilities(): RankAbility[] {
  return [
    {
      complexity: 2,
      name: 'Rage',
      isMagical: false,
      rank: 1,
      description: `
        For most barbarians, this represents entering a furious rage.
        Some barbarians instead enter a joyous battle trance or undergo a partial physical transformation into a more fearsome form.
        \\begin{sustainability}{Rage}{\\glossterm{Free action}}
          \\abilitytags \\atEmotion, \\atSustain (minor)
          \\rankline
          For the duration of this ability, you gain the following benefits and drawbacks:
          \\begin{raggeditemize}
            \\item You gain a \\plus2 accuracy bonus with \\glossterm{mundane} abilities that are not \\weapontag{Projectile} strikes.
            \\item You take a \\minus2 penalty to your Armor and Reflex defenses.
            \\item You are \\enraged.
          \\end{raggeditemize}

          When this ability ends, you are \\glossterm{briefly} \\stunned.
        \\end{sustainability}
      `,
    },
    {
      complexity: 0,
      name: 'Amplified Anger',
      isMagical: false,
      rank: 2,
      description: `
        You gain a \\plus1 bonus to your \\glossterm{mundane power}.
        If your Willpower is 3 or higher, you gain an additional \\plus1 bonus.
      `,
    },
    {
      complexity: 2,
      name: 'Aggravated Violence',
      isMagical: false,
      rank: 3,
      description: `
        \\begin{activeability}{Aggravated Violence}{Standard action}
          \\rankline
          Make a melee \\glossterm{strike}.
          The strike deals double damage against any creature that dealt damage to you since your last turn.

          \\rankline
          \\rank{4} You gain a \\plus1 accuracy bonus with the strike.
          \\rank{5} The strike deals double \\glossterm{weapon damage}.
          \\rank{6} The strike deals triple \\glossterm{weapon damage}.
          \\rank{7} If the strike would deal double damage, it deals triple damage instead.
        \\end{activeability}
      `,
    },
    {
      complexity: 0,
      name: 'Primal Brawn',
      isMagical: false,
      rank: 4,
      description: `
        You gain a \\plus1 bonus to your Strength.
      `,
    },
    {
      complexity: 1,
      name: 'Insensible Rage',
      isMagical: false,
      rank: 5,
      description: `
        During your \\ability{rage} ability, you are unaffected by all \\glossterm{vital wound} effects except for unconsciousness and death.
        Each vital wound still causes the normal \\minus2 penalty to \\glossterm{vital rolls}.
      `,
    },
    {
      complexity: 0,
      name: 'Amplified Anger+',
      isMagical: false,
      rank: 6,
      description: `
        The power bonus increases to \\plus2.
        If your Willpower is 6 or higher, you gain an additional \\plus1 bonus.
      `,
    },
    {
      complexity: 1,
      name: 'Titanic Rage',
      isMagical: false,
      rank: 7,
      description: `
        When you use your \\ability{rage} ability, you can grow by one \\glossterm{size category}, to a maximum of Huge.
        Increasing your size gives you a \\plus1 bonus to Strength for the purpose of determining your \\glossterm{weight limits}, a \\plus1 bonus to your Brawn defense, a \\minus1 penalty to your Reflex defense, and a \\minus4 penalty to the Stealth skill.
        It also increases your \\glossterm{base speed} (see \\pcref{Size Categories}).
        Since this is a \\glossterm{mundane} ability, it stacks with other size-increasing effects (see \\pcref{Stacking Rules}).
      `,
    },
  ];
}

export function outlandSavageAbilities(): RankAbility[] {
  return [
    {
      complexity: 1,
      name: 'Outlandish Weaponry',
      isMagical: false,
      rank: 1,
      description: `
        You can gain proficiency with \\glossterm{exotic weapons} at the cost of one \\glossterm{insight point} per weapon group (see \\pcref{Exotic Weapons}).
        You must already be proficient with all non-exotic weapons from that weapon group.
      `,
    },
    {
      complexity: 0,
      name: 'Savage Precision',
      isMagical: false,
      rank: 1,
      description: `
        You gain a \\plus1 bonus to your Brawn defense and your \\glossterm{brawling accuracy} (see \\pcref{Brawling Accuracy}).
      `,
    },
    {
      complexity: 1,
      name: 'Outlandish Movement',
      isMagical: false,
      rank: 2,
      description: `
        You gain your choice of one of the following benefits:
        \\begin{raggeditemize}
          \\item Climb: A slow \\glossterm{climb speed}.
          \\item Jump: A \\plus10 foot bonus to your maximum horizontal jump distance.
          \\item Swim: A slow \\glossterm{swim speed}.
        \\end{raggeditemize}

        You can invest up to two additional \\glossterm{insight points} into this ability.
        For each insight point, you can choose a different one of these benefits.
      `,
    },
    {
      complexity: 2,
      name: 'Savage Rush',
      isMagical: false,
      rank: 3,
      description: `
        \\begin{activeability}{Savage Rush}{Standard action}
          \\rankline
          Move up to your speed.
          During this movement, you can pass through spaces occupied by your \\glossterm{enemies} as if they were unoccupied.
          You must still end your movement in an unoccupied space.
          At any two points during this movement, you may make a melee \\glossterm{strike}.
          You cannot include the same creature or object as a target of both strikes.

          \\rankline
          \\rank{4} The strike deals double \\glossterm{weapon damage}.
          \\rank{5} The strike deals \\glossterm{extra damage} equal to half your \\glossterm{power}.
          \\rank{6} The extra damage increases to be equal to your power.
          \\rank{7} The strike deals quadruple \\glossterm{weapon damage}.
        \\end{activeability}
      `,
    },
    {
      complexity: 0,
      name: 'Primal Agility',
      isMagical: false,
      rank: 4,
      description: `
        You gain a \\plus1 bonus to your Dexterity.
      `,
    },
    {
      complexity: 0,
      name: 'Outlandish Speed',
      isMagical: false,
      rank: 5,
      description: `
        You gain a \\plus10 foot bonus to your \\glossterm{speed}.
      `,
    },
    {
      complexity: 1,
      name: 'Versatile Savagery',
      isMagical: false,
      rank: 6,
      description: `
        Choose one of the following tags: \\abilitytag{Clinch}, \\abilitytag{Impact}, \\weapontag{Maneuverable}, or \\weapontag{Thrown} (30/60).
        You may treat all non-projectile weapons you use as if they had the chosen tag.
        If you choose the Thrown weapon tag, it does not affect your \\glossterm{natural weapons}.
      `,
    },
    {
      complexity: 2,
      name: 'Primal Rush',
      isMagical: false,
      rank: 7,
      description: `
        Once per turn, you can use the \\ability{sprint} ability without increasing your \\glossterm{fatigue level}.
        After using this ability, you \\briefly can't use it again.
      `,
    },
  ];
}

export function primalWarriorAbilities(): RankAbility[] {
  const abilities: RankAbility[] = [
    {
      complexity: 3,
      name: 'Primal Maneuvers',
      isMagical: false,
      rank: 1,
      description: `
        You can channel your primal energy into ferocious attacks.
        You gain access to one of the following \\glossterm{combat styles}: \\combatstyle{brute force}, \\combatstyle{dirty fighting}, or \\combatstyle{herald of war}.
        You may spend \\glossterm{insight points} to gain access to one additional combat style per insight point, including combat styles other than those three.
        You can only learn primal \\glossterm{maneuvers} from primal combat styles that you have access to.

        You learn two rank 1 primal \\glossterm{maneuvers}.
        You may spend \\glossterm{insight points} to learn one additional maneuver per insight point.

        When you gain access to a new \\glossterm{rank} in this archetype,
        you can exchange any number of maneuvers you know for other maneuvers,
        including maneuvers of a higher rank.

        \\advancement Some primal maneuvers also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
      `,
    },
    {
      complexity: 0,
      name: 'Primal Maneuvers+',
      isMagical: false,
      rank: 3,
      description: `
        You gain access to rank 3 primal maneuvers.
      `,
    },
    {
      complexity: 0,
      name: 'Primal Maneuvers+',
      isMagical: false,
      rank: 5,
      description: `
        You gain access to rank 5 primal maneuvers.
      `,
    },
    {
      complexity: 0,
      name: 'Primal Maneuvers+',
      isMagical: false,
      rank: 7,
      description: `
        You gain access to rank 7 primal maneuvers.
      `,
    },
    {
      complexity: 2,
      name: 'Augmented Maneuvers',
      isMagical: false,
      rank: 2,
      description: `
        You gain the ability to customize your primal maneuvers.
        For each rank 1 primal maneuver you know, choose one augment from the list below and apply it to that maneuver.
        The augment permanently changes the maneuver, so you can't use an unaugmented version of the maneuver.
        However, you can learn the same maneuver more than once and apply different augments to each version.

        Augments scale in power with your \`\`excess rank''.
        Your excess rank with a maneuver is equal to your rank in this archetype minus the rank of the maneuver.

        Whenever you increase your rank in this archetype, you can change your augments.
        However, you must still apply them to rank 1 primal maneuvers.
        {
        \\parhead{Finishing Maneuver} You gain an accuracy bonus equal to twice your excess rank against creatures who are \\glossterm{injured}.

        \\parhead{Mighty Maneuver} You deal \\glossterm{extra damage} equal to twice your excess rank.

        \\parhead{Precise Maneuver} You gain an accuracy bonus equal to your excess rank.

        \\parhead{Reckless Maneuver}You gain an accuracy bonus equal to twice your excess rank.
        However, you \\glossterm{briefly} take a \\minus2 penalty to your defenses after you use the maneuver.
        You can only apply this augment to maneuvers which cause you to make a melee \\glossterm{strike} or \\glossterm{brawling attack}.

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
        You can also choose an augment for each of your rank 3 primal maneuvers.
      `,
    },
    {
      complexity: 0,
      name: 'Augmented Maneuvers+',
      isMagical: false,
      rank: 6,
      description: `
        You can also choose an augment for each of your rank 5 primal maneuvers.
      `,
    },
  ];
  addStandardManeuverModifiers(abilities);
  return abilities;
}

export function totemistAbilities(): RankAbility[] {
  return [
    {
      complexity: 2,
      name: 'Totem Animal',
      isMagical: false,
      rank: 1,
      description: `
        You choose a totem animal that represents you.
        Each totem animal grants you abilities that are associated with that animal.

        \\subcf{Bear} You add half your Constitution to your \\glossterm{mundane power}.

        \\subcf{Crocodile} Once per turn, when you damage a creature with a melee \\glossterm{strike}, you can use this ability to \\glossterm{push} it up to 5 feet into unoccupied space.
        This is a \\abilitytag{Size-Based} ability, so it has no effect on creatures that are two or more size categories larger than you.

        \\subcf{Eagle} You gain \\sense{low-light vision}, allowing you to see in \\glossterm{dim illumination} (see \\pcref{Low-light Vision}).
        In addition, you reduce your \\glossterm{longshot penalty} by 1 (see \\pcref{Weapon Range Limits}).

        \\subcf{Lion} You add half your Willpower to your \\glossterm{mundane power}.

        \\subcf{Shark} You gain a \\plus1 \\glossterm{accuracy} bonus against creatures that are \\glossterm{injured}.
      `,
    },
    {
      complexity: 1,
      name: 'Totem Animal+',
      isMagical: false,
      rank: 4,
      description: `
        The benefit from your \\textit{totem animal} ability improves.

        \\subcf{Bear} You add half your Constitution to Climb, Swim, and Strength checks.

        \\subcf{Crocodile} When you use this ability, if your strike \\glossterm{injures} the target, you can also knock it \\prone or enter a grapple with it (see \\pcref{Grappling}).
        This is a \\abilitytag{Size-Based} ability.

        \\subcf{Eagle} You gain a \\plus1 bonus to your Perception.

        \\subcf{Lion} You add half your Willpower to your accuracy with \\atAuditory attacks.

        \\subcf{Shark} The accuracy bonus increases to \\plus2.
      `,
    },
    {
      complexity: 0,
      name: 'Totem Animal++',
      isMagical: false,
      rank: 7,
      description: `
        The benefit from your \\textit{totem animal} ability improves further.

        \\subcf{Bear} You gain a \\plus1 bonus to your Constitution.

        \\subcf{Crocodile} If your attack hits the target's Brawn defense, you do not have to \\glossterm{injure} it to knock it prone or grapple it.

        \\subcf{Eagle} The Perception bonus increases to \\plus2.

        \\subcf{Lion} You gain a \\plus1 bonus to your Willpower.

        \\subcf{Shark} The accuracy bonus increases to \\plus3.
      `,
    },
    {
      complexity: 2,
      name: 'Feral Frenzy',
      isMagical: false,
      rank: 3,
      description: `
        At the end of your turn, if you attacked a creature other than yourself that turn, you gain a frenzy point.
        Otherwise, you lose a frenzy point.
        You can have a maximum of 4 frenzy points and a minimum of 0.
        Frenzy points increase the power of your \\ability{feral frenzy} ability.
        \\begin{activeability}{Feral Frenzy}{Standard action}
          \\rankline
          Make a melee or thrown \\glossterm{strike}.
          Then, you can spend three frenzy points to make an additional melee or thrown strike.

          \\rankline
          \\rank{4} You gain a \\plus2 accuracy bonus with the first strike you make with this ability each turn.
          \\rank{5} The second strike you make with this ability each turn deals double damage.
          \\rank{6} The accuracy bonus applies to both strikes.
          \\rank{7} Both strikes deal 1d8 \\glossterm{extra damage}.
        \\end{activeability}
      `,
    },
    {
      complexity: 0,
      name: 'Animal Ferocity',
      isMagical: false,
      rank: 5,
      description: `
        You gain a \\plus1 accuracy bonus.
      `,
    },
    {
      complexity: 1,
      name: 'Animal Instincts',
      isMagical: false,
      rank: 2,
      description: `
        You gain benefits based on your totem animal:
        \\begin{raggeditemize}
          \\itemhead{Bear} \\plus2 Endurance and \\plus1 to your \\glossterm{vital rolls}.
          \\itemhead{Crocodile} \\plus2 Stealth and you can hold your breath ten times as long as normal (see \\pcref{Endurance}).
          \\itemhead{Eagle} \\plus2 Awareness and \\plus10 feet to your maximum horizontal jump distance (see \\pcref{Jumping}).
          \\itemhead{Lion} \\plus2 Intimidate and \\plus20 feet to your \\glossterm{available movement} while you are affected by the \\ability{sprint} ability.
          \\itemhead{Shark} \\plus2 Swim and you gain the \\sense{scent} ability (see \\pcref{Tracking}).
        \\end{raggeditemize}
      `,
    },
    {
      complexity: 0,
      name: 'Animal Instincts+',
      isMagical: false,
      rank: 6,
      description: `
        The benefits based on your totem animal improve:
        \\begin{raggeditemize}
          \\itemhead{Bear} \\plus4 Endurance and \\plus2 to your \\glossterm{vital rolls}.
          \\itemhead{Crocodile} \\plus4 Stealth and you can hold your breath indefinitely, though you cannot rest while holding your breath.
          \\itemhead{Eagle} \\plus4 Awareness and \\plus20 feet to your maximum horizontal jump distance.
          \\itemhead{Lion} \\plus4 Intimidate and you gain a \\plus10 foot bonus to your \\glossterm{speed}.
          \\itemhead{Shark} \\plus4 Swim, \\plus2 Survival, and \\plus2 Awareness.
        \\end{raggeditemize}
      `,
    },
  ];
}

export function battleforgedResilience(creature: Creature, rank: number) {
  if (rank >= 1) {
    // Second Wind doesn't have a clear combat effect
  }

  // Battle-Scarred
  if (rank >= 6) {
    creature.addCustomModifier({
      name: 'Battle-Scarred+',
      numericEffects: [
        {
          modifier: 8,
          statistic: 'durability',
        },
        {
          modifier: 20,
          statistic: 'injury_point',
        },
      ],
    });
  } else if (rank >= 2) {
    creature.addCustomModifier({
      name: 'Battle-Scarred',
      numericEffects: [
        {
          modifier: 4,
          statistic: 'durability',
        },
        {
          modifier: 4,
          statistic: 'injury_point',
        },
      ],
    });
  }

  if (rank >= 3) {
    // Resilient Blow doesn't have a clear combat effect
  }

  if (rank >= 4) {
    creature.addSimpleModifier({
      name: 'Primal Resilience',
      statistic: 'constitution',
      value: 1,
    });
  }

  if (rank >= 5) {
    // Limitless Recovery doesn't have a clear combat effect
  }

  if (rank >= 7) {
    // Unbreakable doesn't have a clear combat effect
  }
}

export function battlerager(creature: Creature, rank: number) {
  if (rank >= 1) {
    // Assume rage is constantly active
    creature.addCustomModifier({
      name: 'Rage',
      numericEffects: [
        {
          // Technically Rage doesn't provide a bonus to magical or projectile strikes.
          // However, that's an edge case that we can generally ignore.
          modifier: 2,
          statistic: 'accuracy_with_strikes',
        },
        {
          modifier: -2,
          statistic: 'armor_defense',
        },
        {
          modifier: -2,
          statistic: 'reflex',
        },
      ],
    });
  }

  // Amplified Anger
  if (rank >= 6) {
    let bonusFromWillpower = 0;
    if (creature.willpower >= 3) {
      bonusFromWillpower += 1;
    }
    if (creature.willpower >= 6) {
      bonusFromWillpower += 1;
    }
    creature.addSimpleModifier({
      name: 'Amplified Anger+',
      statistic: 'mundane_power',
      value: 2 + bonusFromWillpower,
    });
  } else if (rank >= 2) {
    creature.addSimpleModifier({
      name: 'Amplified Anger',
      statistic: 'mundane_power',
      value: creature.willpower >= 3 ? 2 : 1,
    });
  }

  if (rank >= 3) {
    // Aggravated Violence doesn't have a clear combat effect
  }

  if (rank >= 4) {
    creature.addSimpleModifier({
      name: 'Primal Brawn',
      statistic: 'strength',
      value: 1,
    });
  }

  if (rank >= 5) {
    // Insensible Rage doesn't have a clear combat effect
  }

  if (rank >= 7) {
    // Assume you always choose to increase your size, and that you start from Medium.
    // Technically we should check creature.size and increase it by one step, but I'm
    // lazy.
    creature.setProperties({ size: 'large' });
  }
}

export function outlandSavage(creature: Creature, rank: number) {
  if (rank >= 1) {
    creature.addSimpleModifier({
      name: 'Savage Precision',
      statistic: 'brawling_accuracy',
      value: 1,
    });
  }

  if (rank >= 4) {
    creature.addSimpleModifier({
      name: 'Primal Agility',
      statistic: 'dexterity',
      value: 1,
    });
  }

  if (rank >= 5) {
    creature.addSimpleModifier({
      name: 'Outlandish Speed',
      statistic: 'speed',
      value: 10,
    });
  }
}

export function primalWarrior(creature: Creature, rank: number) {
  // Primal Warrior adds maneuvers and augments to maneuvers.
  // These don't have static statistical modifiers that we represent here.
}

export function totemist(creature: Creature, rank: number) {
  // Bear Totem
  if (rank >= 1) {
    creature.addSimpleModifier({
      name: 'Totem Animal (Bear)',
      statistic: 'mundane_power',
      value: Math.floor(creature.constitution / 2),
    });
  }

  if (rank >= 2) {
    // Animal Instincts
    creature.addCustomModifier({
      name: 'Animal Instincts (Bear)',
      numericEffects: [
        {
          statistic: 'endurance',
          modifier: rank >= 6 ? 4 : 2,
        },
        {
          statistic: 'vital_rolls',
          modifier: rank >= 6 ? 2 : 1,
        },
      ],
    });
  }

  if (rank >= 5) {
    creature.addSimpleModifier({
      name: 'Animal Ferocity',
      statistic: 'accuracy',
      value: 1,
    });
  }

  if (rank >= 7) {
    creature.addSimpleModifier({
      name: 'Totem Animal++ (Bear)',
      statistic: 'constitution',
      value: 1,
    });
  }
}
