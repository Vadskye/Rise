import { Creature } from '@src/character_sheet/creature';
import { RankAbility } from '../types';
import { addStandardManeuverModifiers } from '../definitions/standard_modifiers';

export function airdancerAbilities(): RankAbility[] {
  return [
    {
      complexity: 1,
      name: 'Float Like Air',
      isMagical: false,
      rank: 1,
      description: `
        Your maximum jumping height is equal to your maximum horizontal jump distance, rather than half that distance (see \\pcref{Jumping}).
        You can also use Willpower in place of Strength to determine your horizontal jump distance.
      `,
    },
    {
      complexity: 1,
      name: 'Float Like Air+',
      isMagical: false,
      rank: 6,
      description: `
        You gain a \\plus10 bonus to your maximum horizontal jump distance.
        In addition, you are immune to \\glossterm{falling damage}.
      `,
    },
    {
      complexity: 2,
      name: 'Heart of Air',
      isMagical: true,
      rank: 4,
      description: `
        When you jump, you can land in midair as if it was solid ground.
        Your landing location has a \\glossterm{height limit} of 30 feet, like a fly speed (see \\pcref{Flight}).
        You cannot walk in the air, but you can continue jumping or remain in place.
        The air holds you until the end of your turn, at which point you fall normally.
        After you land on air in this way, you \\glossterm{briefly} cannot do so again.
      `,
    },
    {
      complexity: 1,
      name: 'Evasion',
      isMagical: false,
      rank: 2,
      description: `
        You take no damage when an area ability attacks and misses your Armor or Reflex defense.
        This does not protect you from any non-damaging effects of those abilities, or from abilities that affect multiple specific targets without affecting an area.
        If you have the \\textit{evasion} rogue ability with the same effect as this ability, you also gain a \\plus2 bonus to your Armor and Reflex defenses against area abilities.
      `,
    },
    {
      complexity: 0,
      name: 'Evasion+',
      isMagical: false,
      rank: 5,
      description: `
        This ability also protects you from area attacks against your Brawn, Fortitude, and Mental defenses.
      `,
    },
    {
      complexity: 2,
      name: 'Death From Above',
      isMagical: false,
      rank: 3,
      description: `
        \\begin{activeability}{Death From Above}{Standard action}
          \\rankline
          You jump and move as normal for the jump (see \\pcref{Jumping}).
          In addition, you can make a \\glossterm{strike} that deals 1d6 \\glossterm{extra damage} at any point during that jump.

          \\rankline
          \\rank{4} This extra damage is doubled against each creature that you are directly above when you make the strike.
          \\rank{5} The extra damage increases to 2d6.
          \\rank{6} The extra damage increases to 2d6 \\add half \\glossterm{power}.
          \\rank{7} The extra damage increases to 4d6 \\add half \\glossterm{power}.
        \\end{activeability}
      `,
    },
    {
      complexity: 0,
      name: 'Move Like Wind',
      isMagical: false,
      rank: 6,
      description: `
        You gain a \\plus10 foot bonus to your \\glossterm{speed}.
      `,
    },
    {
      complexity: 1,
      name: 'Airdance',
      isMagical: true,
      rank: 7,
      description: `
        You gain a slow \\glossterm{fly speed} with a \\glossterm{height limit} of 15 feet (see \\pcref{Flight}).
        Flying using this fly speed does not cause you to suffer penalties for being \\glossterm{midair}.
        While flying, you can jump as if you were on solid ground, allowing you to rapidly gain height and change directions unexpectedly.
      `,
    },
  ];
}

export function esotericWarriorAbilities(): RankAbility[] {
  const abilities: RankAbility[] = [
    {
      complexity: 3,
      name: 'Esoteric Maneuvers',
      isMagical: false,
      rank: 1,
      description: `
        You can perform a wide variety of unusual attacks.
        You gain access to one of the following \\glossterm{combat styles}: \\combatstyle{dirty fighting}, \\combatstyle{flurry of blows}, or \\combatstyle{mobile hunter}.
        You may spend \\glossterm{insight points} to gain access to one additional combat style per insight point, including combat styles other than those three.
        You can only learn esoteric \\glossterm{maneuvers} from esoteric combat styles that you have access to.

        You learn two rank 1 esoteric \\glossterm{maneuvers}.
        You may spend \\glossterm{insight points} to learn one additional maneuver per insight point.

        When you gain access to a new \\glossterm{rank} in this archetype,
        you can exchange any number of maneuvers you know for other maneuvers,
        including maneuvers of a higher rank.

        \\advancement Some esoteric maneuvers also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
      `,
    },
    {
      complexity: 1,
      name: 'Esoteric Weaponry',
      isMagical: false,
      rank: 1,
      description: `
        If you spend an \\glossterm{insight point}, you can become proficient with exotic monk weapons (see \\pcref{Exotic Weapons}).
        You must already be proficient with all non-exotic monk weapons.
      `,
    },
    {
      complexity: 1,
      name: 'Esoteric Maneuvers+',
      isMagical: false,
      rank: 3,
      description: `
        You gain access to rank 3 esoteric maneuvers.
      `,
    },
    {
      complexity: 0,
      name: 'Esoteric Maneuvers+',
      isMagical: false,
      rank: 5,
      description: `
        You gain access to rank 5 esoteric maneuvers.
      `,
    },
    {
      complexity: 0,
      name: 'Esoteric Maneuvers+',
      isMagical: false,
      rank: 7,
      description: `
        You gain access to rank 7 esoteric maneuvers.
      `,
    },
    {
      complexity: 2,
      name: 'Augmented Maneuvers',
      isMagical: false,
      rank: 2,
      description: `
        You gain the ability to customize your esoteric maneuvers.
        For each rank 1 esoteric maneuver you know, choose one augment from the list below and apply it to that maneuver.
        The augment permanently changes the maneuver, so you can't use an unaugmented version of the maneuver.
        However, you can learn the same maneuver more than once and apply different augments to each version.

        Augments scale in power with your \`\`excess rank''.
        Your excess rank with a maneuver is equal to your rank in this archetype minus the rank of the maneuver.

        Whenever you increase your rank in this archetype, you can change your augments.
        However, you must still apply them to rank 1 esoteric maneuvers.
        {
        \\parhead{Counter Maneuver} You gain an accuracy bonus equal to twice your excess rank against creatures who made a \\glossterm{strike} against you since your last turn.
        You can only apply this augment to maneuvers which cause you to make a \\glossterm{strike}.

        \\parhead{Debilitating Maneuver} You gain an accuracy bonus equal to twice your excess rank.
        However, the maneuver deals half damage.
        You can only apply this augment to maneuvers that can deal damage.

        \\parhead{Mighty Maneuver} You deal \\glossterm{extra damage} equal to twice your excess rank.

        \\parhead{Mobile Maneuver} You can walk up to 5 feet per excess rank before or after using your chosen maneuver, up to a maximum distance equal to your \\glossterm{speed}.
        This does not reduce your \\glossterm{available movement}.
        You cannot apply this augment to maneuvers that already allow you to move using one of your movement modes.

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
        You can also choose an augment for each of your rank 3 esoteric maneuvers.
      `,
    },
    {
      complexity: 0,
      name: 'Augmented Maneuvers+',
      isMagical: false,
      rank: 6,
      description: `
        You can also choose an augment for each of your rank 5 esoteric maneuvers.
      `,
    },
  ];
  addStandardManeuverModifiers(abilities);
  return abilities;
}

export function kiAbilities(): RankAbility[] {
  return [
    {
      complexity: 1,
      name: 'Ki Energy',
      isMagical: true,
      rank: 1,
      description: `
        Whenever you make a \\glossterm{strike}, you can choose to treat it as a \\magical ability.
        This allows you to use your \\glossterm{magical power} to determine your damage instead of your \\glossterm{mundane power} (see \\pcref{Power}).
      `,
    },
    {
      complexity: 1,
      name: 'Ki Barrier',
      isMagical: true,
      rank: 1,
      description: `
        While you are not wearing other body armor, you gain a ki barrier around your body.
        This functions like body armor that provides a \\plus2 bonus to your Armor defense and a \\plus3 bonus to your \\glossterm{durability}.
        It does not require \\glossterm{proficiency} with armor to use.

        You can also use a \\glossterm{free hand} to wield the barrier as a shield.
        This functions like a buckler, granting you a \\plus1 bonus to your Armor and Reflex defenses, except that you do not need to be proficient with light armor.
        Since this bonus comes from a shield, it does not stack with the benefits of using any other shield.
      `,
    },
    {
      complexity: 3,
      name: 'Ki Manifestations',
      isMagical: true,
      rank: 2,
      description: `
        You can channel your ki to temporarily enhance your abilities.
        Choose two \\textit{ki manifestations} from the list below.
        You can also spend \\glossterm{insight points} to learn one additional \\textit{ki manifestation} per \\glossterm{insight point}.

        You can only use one \\textit{ki manifestation} per turn.
        After you use a \\textit{ki manifestation}, you \\briefly can't use any \\textit{ki manifestation} again.
        {
        \\begin{magicalactiveability}{Abandon the Fragile Self}{Free action}
          \\rankline
          The first time you would gain a \\glossterm{condition} before your next turn, you negate that condition.
          In exchange, you take a \\minus2 penalty to \\glossterm{defenses} until your next turn.

          \\rankline
          \\rank{5} The defense penalty is reduced to \\minus1.
        \\end{magicalactiveability}

        \\begin{magicalactiveability}{Burst of Blinding Speed}{Free action}
          \\rankline
          You increase your \\glossterm{available speed} by 10 feet this turn.
          In exchange, you cannot use the \\ability{sprint} ability this turn.

          \\rankline
          \\rank{5} The speed bonus increases to \\plus20 feet.
        \\end{magicalactiveability}

        \\begin{magicalactiveability}{Calm the Inner Tempest}{Free action}
          \\rankline
          You gain a \\plus4 bonus to the Endurance skill this turn (see \\pcref{Endurance}).

          \\rankline
          \\rank{5} The bonus increases to \\plus6.
        \\end{magicalactiveability}

        \\begin{magicalactiveability}{Extend the Flow of Ki}{Free action}
          \\rankline
          Your melee \\glossterm{strikes} gain the \\weapontag{Long} weapon tag this turn, allowing you to attack targets up to 10 feet away from you (see \\pcref{Weapon Tags}).

          \\rankline
          \\rank{5} You can attack enemies up to 15 feet away from you.
        \\end{magicalactiveability}

        \\begin{magicaltriggeredability}{Flash Step}{Triggered}
          \\rankline
          You can use this ability as part of movement with your walk speed.
          You \\glossterm{teleport} horizontally instead of moving normally.
          If your \\glossterm{line of effect} to your destination is blocked, or if this teleportation would somehow place you inside a solid object, your teleportation is cancelled and you remain where you are.

          Teleporting a given distance costs movement equal to twice that distance.
          For example, if you have a 30 foot \\glossterm{speed}, you can move 10 feet, teleport 5 feet, and move an additional 10 feet before your movement ends.
          If you are unable to use your walk speed, you also cannot move with this ability.

          \\rankline
          \\rank{5} The movement cost to teleport is reduced to be equal to the distance you teleport.
        \\end{magicaltriggeredability}

        \\begin{magicalactiveability}{Flurry of a Thousand Cuts}{Free action}
          \\rankline
          When you make a \\glossterm{strike} this turn, you \\glossterm{reroll} the attack roll once and take the higher result.
          However, you cannot get a \\glossterm{critical hit} with strikes this turn.

          \\rankline
          \\rank{5} You also gain a \\plus1 \\glossterm{accuracy} bonus with strikes.
        \\end{magicalactiveability}

        \\begin{magicalactiveability}{Hear the Rustling Wings}{Free action}
          \\rankline
          You \\briefly gain a \\plus4 bonus to the Awareness skill (see \\pcref{Awareness}).

          \\rankline
          \\rank{5} The bonus increases to \\plus6.
        \\end{magicalactiveability}

        \\begin{magicalactiveability}{Kindle the Living Flame}{Free action}
          \\abilitytags \\atFire
          \\rankline
          Your \\glossterm{strikes} have the \\atFire tag this turn.

          \\rankline
          \\rank{5} This effect lasts \\glossterm{briefly}.
        \\end{magicalactiveability}

        \\begin{magicalactiveability}{Leap of the Heavens}{Free action}
          \\rankline
          You gain a \\plus10 foot bonus to your maximum horizontal jump distance (see \\pcref{Jumping}).

          \\rankline
          \\rank{5} The bonus increases to \\plus20 feet.
        \\end{magicalactiveability}

        \\begin{magicalactiveability}{Rest Atop the Precipice}{Free action}
          \\rankline
          You gain a \\plus4 bonus to the Balance skill this turn (see \\pcref{Balance}).

          \\rankline
          \\rank{5} The bonus increases to \\plus6.
        \\end{magicalactiveability}

        \\begin{magicalactiveability}{Scale the Highest Tower}{Free action}
          \\rankline
          You gain a \\plus4 bonus to the Climb skill this turn (see \\pcref{Climb}).

          \\rankline
          \\rank{5} The bonus increases to \\plus6.
        \\end{magicalactiveability}

        \\begin{magicalactiveability}{Shelter from Falling Rain}{Free action}
          \\rankline
          You gain a \\plus2 bonus to your defenses against ranged \\glossterm{strikes}.
          However, you \\glossterm{briefly} take a \\minus2 penalty to your defenses against melee \\glossterm{strikes}.

          \\rankline
          \\rank{5} The bonus increases to \\plus3.
        \\end{magicalactiveability}

        \\begin{magicalactiveability}{Step Between the Mystic Worlds}{Free action}
          \\rankline
          All attacks against you \\glossterm{briefly} have a 20\\% \\glossterm{failure chance}.
          However, your attacks also \\glossterm{briefly} have a 20\\% failure chance.

          \\rankline
          \\rank{5} The failure chance for attacks against you increases to 30\\%.
        \\end{magicalactiveability}

        \\begin{magicalactiveability}{Thread the Eye of the Storm}{Free action}
          \\rankline
          You reduce your \\glossterm{longshot penalty} with thrown weapons by 2 this turn (see \\pcref{Weapon Range Limits}).

          \\rankline
          \\rank{5} The penalty reduction increases to 3.
        \\end{magicalactiveability}

        \\begin{magicalactiveability}{Surpass the Mortal Limits}{Free action}
          \\rankline
          You can add your Willpower to all \\glossterm{checks} you make this turn that are based on Strength, Dexterity, or Constitution.
          However, you \\glossterm{briefly} take a \\minus2 penalty to Strength, Dexterity, and Constitution checks.

          \\rankline
          \\rank{5} The brief penalty is removed.
        \\end{magicalactiveability}
        }
      `,
    },
    {
      complexity: 2,
      name: 'Invested Blow',
      isMagical: true,
      rank: 3,
      description: `
        \\begin{magicalactiveability}{Invested Blow}{Standard action}
          \\abilitycost Two \\glossterm{fatigue levels} (see text).
          \\rankline
          Make a \\glossterm{strike} that deals double damage.
          You cannot use a \\weapontag{Heavy} weapon to make the strike.
          It must target a single creature within \\shortrange, with no secondary targets.

          Whether or not the target takes damage, it becomes invested with your ki.
          This does not cause it any ill effects.
          If it dies or falls unconscious, or you finish a \\glossterm{short rest}, your ki returns to you.
          When it does, you reduce your \\glossterm{fatigue level} by two.

          \\rankline
          \\rank{4} You gain a \\plus1 accuracy bonus with the strike.
          \\rank{5} The strike deals double \\glossterm{weapon damage}.
          \\rank{6} The strike deals triple \\glossterm{weapon damage}.
          \\rank{7} The strike deals triple damage.
        \\end{magicalactiveability}
      `,
    },
    {
      complexity: 1,
      name: 'Ki Energy+',
      isMagical: true,
      rank: 5,
      description: `
        Choose one type of energy: \\atCold, \\atElectricity, or \\atFire.
        You become \\resistant to attacks with that ability tag.
        If you are already resistant to attacks with that ability tag, you become immune instead.
        Whenever you make a strike \\magical with this ability, you can choose to give it that tag.
      `,
    },
    {
      complexity: 0,
      name: 'Ki-Focused Mind',
      isMagical: true,
      rank: 6,
      description: `
        You gain a \\plus1 bonus to your Willpower.
      `,
    },
    {
      complexity: 1,
      name: 'Endless Ki',
      isMagical: true,
      rank: 7,
      description: `
        After using a \\textit{ki manifestation}, you can use a different \\textit{ki manifestation} during your next turn.
        You still cannot use the same \\textit{ki manifestation} in two consecutive turns.
      `,
    },
  ];
}

export function perfectedFormAbilities(): RankAbility[] {
  return [
    {
      complexity: 0,
      name: 'Unarmed Warrior',
      isMagical: false,
      rank: 1,
      description: `
        Your punch/kick \\glossterm{natural weapon} becomes a \\plus1 accuracy weapon that deals 1d4 damage and has the \\weapontag{Light} \\glossterm{weapon tag}.
        Since this bonus is local to the weapon, it is doubled if you make \\glossterm{dual strikes} with it.
        Whenever you make a strike with it, you can freely choose whether it also has the \\atSubdual tag.
      `,
    },
    {
      complexity: 0,
      name: 'Unarmed Warrior+',
      isMagical: false,
      rank: 4,
      description: `
        Your punch/kick natural weapon deals 1d6 damage.
      `,
    },
    {
      complexity: 0,
      name: 'Unarmed Warrior++',
      isMagical: false,
      rank: 7,
      description: `
        Your punch/kick natural weapon becomes a \\plus2 accuracy weapon.
      `,
    },
    {
      complexity: 1,
      name: 'Unhindered Agility',
      isMagical: false,
      rank: 1,
      description: `
        You gain a \\plus1 bonus to your Armor and Reflex defenses while you are not wearing medium or heavy body armor.
      `,
    },
    {
      complexity: 1,
      name: 'Unhindered Freedom',
      isMagical: false,
      rank: 4,
      description: `
        While you are not wearing medium or heavy body armor, you are immune to being \\slowed, and your movement is not slowed by \\glossterm{difficult terrain}.
      `,
    },
    {
      complexity: 0,
      name: 'Unhindered Agility+',
      isMagical: false,
      rank: 7,
      description: `
        The defense bonus increases to \\plus2.
      `,
    },
    {
      complexity: 1,
      name: 'Perfected Power',
      isMagical: false,
      rank: 2,
      description: `
        You gain a \\plus1 bonus to your \\glossterm{mundane power} and \\glossterm{magical power}.
        If each of your Strength, Dexterity, and Constitution are 3 or higher, this bonus increases to \\plus2.
      `,
    },
    {
      complexity: 1,
      name: 'Perfected Power+',
      isMagical: false,
      rank: 5,
      description: `
        The bonus increases to \\plus2, or to \\plus3 if you meet the attribute requirement.
      `,
    },
    {
      complexity: 0,
      name: 'Perfect Body',
      isMagical: false,
      rank: 3,
      description: `
        Choose a physical \\glossterm{attribute}: Strength, Dexterity, or Constitution (see \\pcref{Attributes}).
        You gain a \\plus1 bonus to that attribute.
      `,
    },
    {
      complexity: 0,
      name: 'Perfect Body+',
      isMagical: false,
      rank: 6,
      description: `
        The bonus applies to all physical attributes, not just the one you chose.
      `,
    },
  ];
}

export function transcendentSageAbilities(): RankAbility[] {
  return [
    {
      complexity: 0,
      name: 'Transcend Frailty',
      isMagical: false,
      rank: 1,
      description: `
        You gain a \\plus1 bonus to your Fortitude and Mental defenses.
        In addition, you gain a \\plus1 bonus to your \\glossterm{vital rolls} (see \\pcref{Vital Wounds}).
      `,
    },
    {
      complexity: 1,
      name: 'Feel the Flow of Life',
      isMagical: true,
      rank: 2,
      description: `
        You become so attuned to the natural energy of life that you can sense it even when sight fails you.
        You gain \\sense{lifesense} with a 120 foot range, allowing you to sense the location of living things without light (see \\pcref{Lifesense}).
        In addition, you gain \\sense{lifesight} with a 30 foot range, allowing you to see living things without light (see \\pcref{Lifesight}).
      `,
    },
    {
      complexity: 1,
      name: 'Transcend Emotion',
      isMagical: false,
      rank: 3,
      description: `
        You are immune to \\abilitytag{Emotion} attacks.
        In addition, you are immune to being \\frightened, \\panicked, and \\goaded.
      `,
    },
    {
      complexity: 1,
      name: 'Transcend Fatigue',
      isMagical: false,
      rank: 4,
      description: `
        You gain a bonus to your \\glossterm{fatigue tolerance} equal to your rank in this archetype.
      `,
    },
    {
      complexity: 1,
      name: 'Transcend Mortality',
      isMagical: true,
      rank: 5,
      description: `
        You are immune to \\atLife attacks.
        In addition, you no longer take penalties to your attributes for aging, and cannot be magically aged.
        You still die of old age when your time is up.
      `,
    },
    {
      complexity: 0,
      name: 'Feel the Flow of Life+',
      isMagical: true,
      rank: 6,
      description: `
        The range of your lifesense increases by 240 feet, and the range of your lifesight increases by 60 feet.
      `,
    },
    {
      complexity: 1,
      name: 'Inner Transcendence',
      isMagical: false,
      rank: 7,
      description: `
        You are immune to \\glossterm{conditions}.
      `,
    },
  ];
}

export function airdancer(creature: Creature, rank: number) {
  if (rank >= 6) {
    creature.addSimpleModifier({
      name: 'Move Like Wind',
      statistic: 'speed',
      value: 10,
    });
  }
}

export function esotericWarrior(creature: Creature, rank: number) {
  // Maneuvers
}

export function ki(creature: Creature, rank: number) {
  if (rank >= 1) {
    // Ki Barrier
    creature.addCustomModifier({
      name: 'Ki Barrier',
      numericEffects: [
        { statistic: 'armor_defense', modifier: 2 },
        { statistic: 'durability', modifier: 3 },
      ],
    });
  }

  if (rank >= 6) {
    creature.addSimpleModifier({
      name: 'Ki-Focused Mind',
      statistic: 'willpower',
      value: 1,
    });
  }
}

export function perfectedForm(creature: Creature, rank: number) {
  if (rank >= 1) {
    creature.addCustomModifier({
      name: 'Unhindered Agility',
      numericEffects: [
        { statistic: 'armor_defense', modifier: rank >= 7 ? 2 : 1 },
        { statistic: 'reflex', modifier: rank >= 7 ? 2 : 1 },
      ],
    });
  }

  if (rank >= 2) {
    // Perfected Power - Assume attribute requirement is met for simplicity
    const bonus = rank >= 5 ? 3 : 2;
    creature.addCustomModifier({
      name: 'Perfected Power',
      numericEffects: [
        { statistic: 'mundane_power', modifier: bonus },
        { statistic: 'magical_power', modifier: bonus },
      ],
    });
  }

  if (rank >= 6) {
    creature.addCustomModifier({
      name: 'Perfect Body+',
      numericEffects: [
        { statistic: 'strength', modifier: 1 },
        { statistic: 'dexterity', modifier: 1 },
        { statistic: 'constitution', modifier: 1 },
      ],
    });
  } else if (rank >= 3) {
    // Arbitrarily choosing Strength
    creature.addSimpleModifier({
      name: 'Perfect Body (Strength)',
      statistic: 'strength',
      value: 1,
    });
  }
}

export function transcendentSage(creature: Creature, rank: number) {
  if (rank >= 1) {
    creature.addCustomModifier({
      name: 'Transcend Frailty',
      numericEffects: [
        { statistic: 'fortitude', modifier: 1 },
        { statistic: 'mental', modifier: 1 },
        { statistic: 'vital_rolls', modifier: 1 },
      ],
    });
  }

  if (rank >= 4) {
    creature.addSimpleModifier({
      name: 'Transcend Fatigue',
      statistic: 'fatigue_tolerance',
      value: rank,
    });
  }
}
