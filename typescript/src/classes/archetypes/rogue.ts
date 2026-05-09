import { Creature } from '@src/character_sheet/creature';
import { RankAbility } from '../types';
import { addStandardManeuverModifiers } from '../definitions/standard_modifiers';

export function assassin(): RankAbility[] {
  const abilities: RankAbility[] = [
    {
      complexity: 2,
      name: 'Sneak Attack',
      isMagical: false,
      rank: 1,
      description: `
        \\begin{activeability}{Sneak Attack}{Standard action}
          \\rankline
          Make a \\glossterm{strike} against a creature within \\shortrange (see \\pcref{Weapon Tags}).
          The strike must only use \\weapontag{Light} or \\weapontag{Compact} weapons.

          The strike deals 1d4 \\glossterm{extra damage} if the target is \\unaware or \\partiallyunaware of your attack, or if they are adjacent to one of your \\glossterm{allies}.
          If the target didn't know you were present in the combat at the start of your turn, the strike deals double damage.

          \\rankline
          \\rank{2} The extra damage increases to 1d6.
          \\rank{3} The extra damage increases to 1d10.
          \\rank{4} The strike deals double \\glossterm{weapon damage}.
          \\rank{5} The extra damage increases to 3d8.
          \\rank{6} The strike deals triple \\glossterm{weapon damage}, and the extra damage increases to 4d8.
          \\rank{7} The extra damage increases to 6d10.
        \\end{activeability}
      `,
    },
    {
      complexity: 1,
      name: 'Exotic Assassination Tools',
      isMagical: false,
      rank: 1,
      description: `
        If you spend an \\glossterm{insight point}, you can become proficient with all \\weapontag{Compact} and \\weapontag{Light} exotic weapons (see \\pcref{Exotic Weapons}).
        You must already be proficient with all Compact and Light non-exotic weapons.
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
      `,
    },
    {
      complexity: 0,
      name: 'Evasion+',
      isMagical: false,
      rank: 6,
      description: `
        This ability also protects you from area attacks against your Brawn, Fortitude, and Mental defenses.
      `,
    },
    {
      complexity: 2,
      name: 'Darkstalker',
      isMagical: false,
      rank: 3,
      description: `
        \\begin{attuneability}{Darkstalker}{Standard action}
          \\abilitytags \\atAttune
          \\rankline
          You become completely undetectable by your choice of one of the following sense groups:
          \\begin{raggeditemize}
            \\item \\sense{Blindsense} and \\sense{blindsight}
            \\item \\sense{Darkvision}
            \\item \\abilitytag{Detection} abilities
            \\item \\sense{Lifesense} and \\sense{lifesight}
            \\item \\sense{Scent}
            \\item \\abilitytag{Scrying} abilities
            \\item \\sense{Tremorsense} and \\sense{tremorsight}
          \\end{raggeditemize}
          If you have access to any other more unusual senses, such as the \\ability{mindsight} ability from the Telepath feat, you may also choose one of those senses as a separate sense group.

          You can attune to this ability multiple times.
          Each time, you can choose a different sense group.
        \\end{attuneability}
      `,
    },
    {
      complexity: 1,
      name: 'Darkstalker+',
      isMagical: false,
      rank: 7,
      description: `
        Each time you attune to this ability, you can choose up to three of the possible sense groups rather than only one.
      `,
    },
    {
      complexity: 1,
      name: "Assassin's Grace",
      isMagical: false,
      rank: 4,
      description: `
        You gain a \\plus1 bonus to your Dexterity.
      `,
    },
    {
      complexity: 2,
      name: 'Assassination',
      isMagical: false,
      rank: 5,
      description: `
        \\begin{activeability}{Assassination}{Standard action}
          \\abilitytags \\atSubtle
          \\rankline
          You study a creature within \\rngmed range, finding weak points you can take advantage of.
          As a \\brief effect, whenever you make a \\glossterm{strike} against the target while it is adjacent to you and \\unaware of the attack, the strike deals double damage.
          This is multiplicative with the doubling from \\ability{sneak attack}, for a total of four times normal damage.
        \\end{activeability}
      `,
    },
  ];
  addSneakAttack(abilities);
  return abilities;
}

function addSneakAttack(abilities: RankAbility[]) {
  for (let rank = 1; rank <= 7; rank++) {
    abilities.push({
      complexity: 0,
      name: 'Sneak Attack Scaling',
      isMagical: false,
      rank: rank,
      description: '',
    });
  }
}

export function bardicMusic(): RankAbility[] {
  return [
    {
      complexity: 3,
      name: 'Bardic Spells',
      isMagical: true,
      rank: 1,
      description: `
        You have the ability to use bardic magic.
        You gain access to one bardic \\glossterm{mystic sphere}, plus the \\sphere{universal} mystic sphere (see \\pcref{Bardic Mystic Spheres}).
        You may spend \\glossterm{insight points} to gain access to one additional bardic \\glossterm{mystic sphere} per two \\glossterm{insight points}.
        You can only learn bardic spells from bardic mystic spheres that you have access to.

        You automatically learn all \\glossterm{cantrips} from each of your mystic spheres.
        In addition, you learn two rank 1 bardic \\glossterm{spells}.
        You can also spend \\glossterm{insight points} to learn one additional rank 1 spell per insight point.

        Bardic spells require you to use a Perform skill that you are trained with.
        There are four types of performances: dance, instrumental, manipulation, and vocal.
        For details about mystic spheres and casting spells, see \\pcref{Spell and Ritual Mechanics}.
        \\begin{raggeditemize}
          \\item Dance: You use your body to dance or act. This limits your ability to defend yourself, which \\briefly gives you a \\minus2 penalty to your Armor and Reflex defenses each time you cast or sustain the spell. Spells you cast using a dance performance gain the \\atVisual tag.
          \\item Instrumental: You use an instrument to make music. This requires at least one \\glossterm{free hand} to use the instrument. Spells you cast using an instrumental performance gain the \\atAuditory tag.
          \\item Manipulation: You use objects or gestures to perform, such as juggling or puppetry. This requires at least one \\glossterm{free hand} to use the objects. Spells you cast using a manipulation performance gain the \\atVisual tag.
          \\item Vocal: You use your voice to orate or sing. This prevents you from talking or using other abilities with \\glossterm{verbal components}. Spells you cast using a vocal performance gain the \\atAuditory tag.
        \\end{raggeditemize}

        Unlike other spellcasters, you cannot \\glossterm{attune} to bardic spells.
        In addition, if a target of a sustained bardic spell stops being able to see or hear you, depending on the nature of your performance, the effect ends for them as if you had stopped sustaining the performance.

        When you gain access to a new \\glossterm{mystic sphere} or spell \\glossterm{rank},
        you can forget any number of spells you know to learn that many new spells in exchange,
        including spells of the higher rank.

        \\advancement The maximum rank of bardic spells that you can learn is equal to your rank in this archetype.
        Bardic spells also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
      `,
    },
    {
      complexity: 0,
      name: 'Bardic Lore',
      isMagical: false,
      rank: 2,
      description: `
        You gain a bonus equal to your rank in this archetype to Knowledge skills that you are untrained in (see \\pcref{Trained Skills}).
      `,
    },
    {
      complexity: 0,
      name: 'Bardic Lore+',
      isMagical: true,
      rank: 5,
      description: `
        You gain a \\plus2 bonus to all Knowledge skills.
      `,
    },
    {
      complexity: 0,
      name: 'Steady Beat',
      isMagical: false,
      rank: 3,
      description: `
        You are \\buff{immune} to \\abilitytag{Auditory} attacks.
      `,
    },
    {
      complexity: 0,
      name: 'Rhythm of War',
      isMagical: false,
      rank: 4,
      description: `
        You gain a \\plus1 bonus to your \\glossterm{magical power} and \\glossterm{mundane power}.
      `,
    },
    {
      complexity: 0,
      name: 'Critical Eye',
      isMagical: false,
      rank: 6,
      description: `
        You are \\resistant to \\abilitytag{Visual} attacks.
      `,
    },
    {
      complexity: 2,
      name: 'Virtuoso',
      isMagical: true,
      rank: 7,
      description: `
        Once per turn, you can \\glossterm{sustain} a bardic spell that has the \\atSustain (minor) tag as a \\glossterm{free action}.
      `,
    },
  ];
}

export function combatTrickster(): RankAbility[] {
  const abilities: RankAbility[] = [
    {
      complexity: 3,
      name: 'Trick Maneuvers',
      isMagical: false,
      rank: 1,
      description: `
        You can confuse and confound your foes in combat.
        You gain access to one of the following \\glossterm{combat styles}: \\combatstyle{dirty fighting}, \\combatstyle{ebb and flow}, or \\combatstyle{mobile hunter}.
        You may spend \\glossterm{insight points} to gain access to one additional combat style per insight point, including combat styles other than those three.
        You can only learn trick \\glossterm{maneuvers} from trick combat styles that you have access to.

        You learn two rank 1 trick \\glossterm{maneuvers}.
        You may spend \\glossterm{insight points} to learn one additional maneuver per insight point.

        When you gain access to a new \\glossterm{rank} in this archetype,
        you can exchange any number of maneuvers you know for other maneuvers,
        including maneuvers of a higher rank.

        \\advancement Some trick maneuvers also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
      `,
    },
    {
      complexity: 1,
      name: 'Trick Maneuvers+',
      isMagical: false,
      rank: 3,
      description: `
        You gain access to rank 3 trick maneuvers.
      `,
    },
    {
      complexity: 0,
      name: 'Trick Maneuvers+',
      isMagical: false,
      rank: 5,
      description: `
        You gain access to rank 5 trick maneuvers.
      `,
    },
    {
      complexity: 0,
      name: 'Trick Maneuvers+',
      isMagical: false,
      rank: 7,
      description: `
        You gain access to rank 7 trick maneuvers.
      `,
    },
    {
      complexity: 2,
      name: 'Augmented Maneuvers',
      isMagical: false,
      rank: 2,
      description: `
        You gain the ability to customize your trick maneuvers.
        For each rank 1 trick maneuver you know, choose one augment from the list below and apply it to that maneuver.
        The augment permanently changes the maneuver, so you can't use an unaugmented version of the maneuver.
        However, you can learn the same maneuver more than once and apply different augments to each version.

        Augments scale in power with your \`\`excess rank''.
        Your excess rank with a maneuver is equal to your rank in this archetype minus the rank of the maneuver.

        Whenever you increase your rank in this archetype, you can change your augments.
        However, you must still apply them to rank 1 trick maneuvers.
        {
        \\parhead{Debilitating Maneuver} You gain an accuracy bonus equal to twice your excess rank.
        However, the maneuver deals half damage.
        You can only apply this augment to maneuvers that can deal damage.

        \\parhead{Finishing Maneuver} You gain an accuracy bonus equal to twice your excess rank against creatures who are \\glossterm{injured}.

        \\parhead{Mighty Maneuver} You deal \\glossterm{extra damage} equal to twice your excess rank.

        \\parhead{Mobile Maneuver} You can move up to 5 feet per excess rank before or after using your chosen maneuver, up to a maximum distance equal to your \\glossterm{speed}.
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
        You can also choose an augment for each of your rank 3 trick maneuvers.
      `,
    },
    {
      complexity: 0,
      name: 'Augmented Maneuvers+',
      isMagical: false,
      rank: 6,
      description: `
        You can also choose an augment for each of your rank 5 trick maneuvers.
      `,
    },
  ];
  addStandardManeuverModifiers(abilities);
  return abilities;
}

export function jackOfAllTrades(): RankAbility[] {
  return [
    {
      complexity: 2,
      name: 'Dabbler',
      isMagical: false,
      rank: 1,
      description: `
        You gain two additional \\glossterm{insight points}.
        In addition, you can spend insight points to gain one additional \\glossterm{trained skill} per insight point.
      `,
    },
    {
      complexity: 1,
      name: 'Skill Exemplar',
      isMagical: false,
      rank: 2,
      description: `
        You gain a \\plus1 bonus to all skills.
      `,
    },
    {
      complexity: 2,
      name: 'Arcane Dilettante',
      isMagical: true,
      rank: 3,
      description: `
        You can use wands as if you were able to cast arcane spells.
        Your maximum spell rank is equal to your rank in this archetype.
        In addition, you gain an additional \\glossterm{attunement point}.
        You can only use this attunement point to \\glossterm{attune} to magic wands.
      `,
    },
    {
      complexity: 2,
      name: 'Well Rounded',
      isMagical: true,
      rank: 6,
      description: `
        You gain a \\plus1 bonus to all of your defenses that are lower than your highest defense.
      `,
    },
    {
      complexity: 0,
      name: 'Skill Exemplar+',
      isMagical: false,
      rank: 5,
      description: `
        The skill bonus increases to \\plus2.
        In addition, using the \\ability{desperate exertion} ability to affect a skill check only increases your \\glossterm{fatigue level} by one.
      `,
    },
    {
      complexity: 0,
      name: 'Versatile Expertise',
      isMagical: false,
      rank: 4,
      description: `
        You gain a \\plus1 bonus to an attribute of your choice.
      `,
    },
    {
      complexity: 0,
      name: 'Versatile Expertise+',
      isMagical: false,
      rank: 7,
      description: `
        You gain a \\plus1 bonus to two attributes of your choice.
      `,
    },
  ];
}

export function suaveScoundrel(): RankAbility[] {
  return [
    {
      complexity: 2,
      name: 'Fool Them Once',
      isMagical: true,
      rank: 1,
      description: `
        \\begin{activeability}{Fool Them Once}{Minor action}
          \\abilitytags \\atCompulsion, \\atSubtle
          \\abilitycost You cannot use this ability again until you finish a \\glossterm{short rest}.
          The next time this turn that you make an attack or check against one or more creatures, you can use your Deception or Persuasion skill instead of your normal \\glossterm{accuracy} or check modifier against those creatures.
          Each target must be aware of the attack or check.
          You must use this ability before making the attack or check.
          If a target is unaware of the attack or check, or is otherwise immune to this ability, you use your normal accuracy or check modifier against that creature.
          \\rankline
        \\end{activeability}
      `,
    },
    {
      complexity: 0,
      name: 'Silver Tongue',
      isMagical: true,
      rank: 2,
      description: `
        You gain a \\plus2 bonus to your Deception, Persuasion, and Social Insight skills.
      `,
    },
    {
      complexity: 0,
      name: 'Silver Tongue+',
      isMagical: false,
      rank: 6,
      description: `
        The bonus increases to \\plus4.
      `,
    },
    {
      complexity: 2,
      name: "What's That Over There",
      isMagical: false,
      rank: 3,
      description: `
        \\begin{activeability}{What's That Over There}{Standard action}
          \\abilitytags \\atCompulsion, \\atVisual
          \\rankline
          Make a attack vs. Mental against a creature within \\medrange.
          In addition, choose a location on stable ground within range.
          \\hit As a \\glossterm{brief} effect, the target is compelled to move to the location you chose if it can do so safely.
          It must spend its \\glossterm{movement} and \\glossterm{standard action} to move to that location, or if it is already there, to do nothing except observe the location carefully.
          After this movement it can use any other actions, including \\glossterm{elite actions}, as normal.
          After this effect ends, the target becomes immune to it until it finishes a \\glossterm{short rest}.

          \\rankline
          You gain a \\plus2 \\glossterm{accuracy} bonus with the attack for each rank beyond 3.
        \\end{activeability}
      `,
    },
    {
      complexity: 0,
      name: 'Slippery Mind',
      isMagical: true,
      rank: 4,
      description: `
        You gain a \\plus2 bonus to your Mental defense, and you are \\resistant to \\atEmotion attacks.
      `,
    },
    {
      complexity: 1,
      name: 'Fool Them Twice',
      isMagical: false,
      rank: 5,
      description: `
        You can use your \\ability{fool them once} ability twice per \\glossterm{short rest}.
        However, after using that ability, you \\briefly can't use it again.
      `,
    },
    {
      complexity: 1,
      name: 'No Need For Violence',
      isMagical: false,
      rank: 7,
      description: `
        Whenever a combat starts, each \\glossterm{enemy} that you have been speaking with for at least six seconds takes a \\minus5 penalty to \\glossterm{initiative}.
        In addition, enemies are at least \\partiallyunaware of your attacks until they take their first turn, even if they can see you clearly.
        This does not affect creatures that join while the combat is already active.
      `,
    },
  ];
}

export function assassinModifiers(creature: Creature, rank: number) {
  if (rank >= 4) {
    creature.addSimpleModifier({
      name: "Assassin's Grace",
      statistic: 'dexterity',
      value: 1,
    });
  }
}

export function bardicMusicModifiers(creature: Creature, rank: number) {
  if (rank >= 4) {
    creature.addCustomModifier({
      name: 'Rhythm of War',
      numericEffects: [
        { statistic: 'mundane_power', modifier: 1 },
        { statistic: 'magical_power', modifier: 1 },
      ],
    });
  }
}

export function combatTricksterModifiers(_creature: Creature, _rank: number) {
  // Maneuvers
}

export function jackOfAllTradesModifiers(creature: Creature, rank: number) {
  if (rank >= 2) {
    creature.addSimpleModifier({
      name: 'Skill Exemplar',
      statistic: 'all_skills',
      value: rank >= 5 ? 2 : 1,
    });
  }

  if (rank >= 4) {
    // Versatile Expertise - Choosing Dexterity
    creature.addSimpleModifier({
      name: 'Versatile Expertise (Dexterity)',
      statistic: 'dexterity',
      value: 1,
    });
  }

  if (rank >= 6) {
    // Well Rounded - Too complex to calculate highest vs lowest here easily,
    // so we'll just add it as a general note or a flat bonus if we can.
    // For now, let's just add it to all defenses and assume it's filtered elsewhere
    // or just leave it for the user.
  }

  if (rank >= 7) {
    // Versatile Expertise+ - Choosing Intelligence
    creature.addSimpleModifier({
      name: 'Versatile Expertise (Intelligence)',
      statistic: 'intelligence',
      value: 1,
    });
  }
}

export function suaveScoundrelModifiers(creature: Creature, rank: number) {
  if (rank >= 2) {
    const bonus = rank >= 6 ? 4 : 2;
    creature.addCustomModifier({
      name: 'Silver Tongue',
      numericEffects: [
        { statistic: 'deception', modifier: bonus },
        { statistic: 'persuasion', modifier: bonus },
        { statistic: 'social_insight', modifier: bonus },
      ],
    });
  }

  if (rank >= 4) {
    creature.addSimpleModifier({
      name: 'Slippery Mind',
      statistic: 'mental',
      value: 2,
    });
  }
}
