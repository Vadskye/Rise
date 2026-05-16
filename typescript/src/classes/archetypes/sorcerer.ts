import { Creature } from '@src/character_sheet/creature';
import { RankAbility } from '../types';
import { addStandardSpellModifiers } from '../definitions/standard_modifiers';
import { applyArchetypeActiveAbilities } from './apply_archetypes';

export function arcaneMagic(): RankAbility[] {
  const abilities: RankAbility[] = [
    {
      complexity: 4,
      name: 'Arcane Spells',
      isMagical: true,
      rank: 1,
      description: `
        Your innate talents grant you the ability to use arcane magic.
        You gain access to one arcane \\glossterm{mystic sphere}, plus the \\sphere{universal} mystic sphere (see \\pcref{Arcane Mystic Spheres}).
        You may spend \\glossterm{insight points} to gain access to one additional arcane \\glossterm{mystic sphere} per two \\glossterm{insight points}.
        You can only learn arcane spells from arcane mystic spheres that you have access to.

        You automatically learn all \\glossterm{cantrips} from each of your mystic spheres.
        In addition, you learn two rank 1 arcane \\glossterm{spells}.
        You can also spend \\glossterm{insight points} to learn one additional rank 1 spell per insight point.

        Arcane spells require both \\glossterm{verbal components} and \\glossterm{somatic components} to cast (see \\pcref{Ability Usage Components}).
        For details about mystic spheres and casting spells, see \\pcref{Spell and Ritual Mechanics}.

        When you gain access to a new \\glossterm{mystic sphere} or spell \\glossterm{rank},
        you can forget any number of spells you know to learn that many new spells in exchange,
        including spells of the higher rank.

        \\advancement The maximum rank of arcane spells that you can learn is equal to your rank in this archetype.
        Arcane spells also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
      `,
    },
    {
      complexity: 1,
      name: 'Mage Armor',
      isMagical: true,
      rank: 1,
      description: `
        \\begin{magicalactiveability}{Mage Armor}{Standard action}
          \\abilitytags \\atManifestation
          \\rankline
          You create a translucent suit of magical armor on your body and over your hands.
          This functions like body armor that provides a \\plus2 bonus to your Armor defense and \\glossterm{durability}.
          It does not require \\glossterm{proficiency} with armor to use.

          You can also use a \\glossterm{free hand} to wield the barrier as a shield.
          This functions like a buckler, granting you a \\plus1 bonus to your Armor and Reflex defenses, except that you do not need to be proficient with light armor.
          Since this bonus comes from a shield, it does not stack with the benefits of using any other shield.

          This ability lasts until you \\glossterm{dismiss} it or until you use it again.
          In addition, it is automatically dismissed if you wear other body armor of any kind.
        \\end{magicalactiveability}
      `,
    },
  ];
  addStandardSpellModifiers(abilities);
  return abilities;
}

export function arcaneSpellMastery(): RankAbility[] {
  return [
    {
      complexity: 1,
      name: 'Arcane Dynamo',
      isMagical: true,
      rank: 1,
      description: `
        You gain a \\plus1 bonus to your \\glossterm{magical power}.
        If your Constitution is 4 or higher, you gain an additional \\plus1 bonus.
      `,
    },
    {
      complexity: 2,
      name: 'Spell Known',
      isMagical: true,
      rank: 1,
      description: `
        You learn an additional arcane spell.
      `,
    },
    {
      complexity: 2,
      name: 'Metamagic',
      isMagical: true,
      rank: 2,
      description: `
        You learn how to further refine your spellcasting abilities.
        Choose two metamagic abilities from the list below.

        Some metamagic abilities affect specific spells.
        Each individual spell can only have one metamagic applied.
        Whenever you learn a new spell, you may change which specific spells your metamagic abilities affect.
        {
        \\parhead{Distant Spell} Choose an arcane \\glossterm{spell} you know with a standard \\glossterm{range}: \\shortrangeless, \\medrangeless, \\longrangeless, \\distrangeless, or \\extrangeless.
        You increase that spell's range to the next standard range category, to a maximum of Extreme range.
        You can choose this ability multiple times, choosing a different spell each time.
        \\parhead{Dragonbreath Spell} Choose an arcane \\glossterm{spell} you know that has a standard \\glossterm{area}: \\tinyarea, \\smallarea, \\medarea, \\largearea, \\hugearea, or \\gargarea.
        It must not have a \\glossterm{range}, and it must not create an \\glossterm{emanation}.
        The spell's area becomes a cone instead of its normal shape.
        In addition, if the area was not originally a line, the area increases to to the next standard area category, to a maximum of a Gargantuan area.
        You can choose this ability multiple times, choosing a different spell each time.
        \\parhead{Energetic Spell} Choose an arcane \\glossterm{spell} you know.
        You add any one of the following tags to that spell: \\atCold, \\atFire, or \\atElectricity.
        In addition, if it deals damage, it gains \\glossterm{extra damage} equal to your rank in this archetype.
        You can choose this ability multiple times, choosing a different spell each time.
        \\parhead{Precise Spell} Choose an arcane \\glossterm{spell} you know.
        You gain a \\plus1 accuracy bonus with that spell.
        You can choose this ability multiple times, choosing a different spell each time.
        \\parhead{Widened Spell} Choose an arcane \\glossterm{spell} you know with a standard \\glossterm{area}: \\tinyarea, \\smallarea, \\medarea, \\largearea, \\hugearea, or \\gargarea.
        The spell cannot also be affected by the Dragonbreath Spell metamagic.
        You increase that spell's area to the next standard area category, to a maximum of a Gargantuan area.
        You can choose this ability multiple times, choosing a different spell each time.
        }
      `,
    },
    {
      complexity: 0,
      name: 'Spell-Trained Mind',
      isMagical: true,
      rank: 3,
      description: `
        You gain a \\plus1 bonus to your Willpower.
      `,
    },
    {
      complexity: 2,
      name: 'Spell Knowledge',
      isMagical: true,
      rank: 4,
      description: `
        You learn an additional arcane spell.
      `,
    },
    {
      complexity: 1,
      name: 'Metamagic+',
      isMagical: true,
      rank: 5,
      description: `
        You gain an additional metamagic ability.
      `,
    },
    {
      complexity: 1,
      name: 'Attunement Point',
      isMagical: true,
      rank: 6,
      description: `
        You gain an additional \\glossterm{attunement point}.
      `,
    },
    {
      complexity: 1,
      name: 'Experienced Spellcaster',
      isMagical: true,
      rank: 7,
      description: `
        You gain a \\plus1 bonus to your \\glossterm{accuracy} and Fortitude defense.
      `,
    },
  ];
}

export function draconicMagic(): RankAbility[] {
  return [
    {
      complexity: 1,
      name: 'Draconic Bloodline',
      isMagical: false,
      rank: 1,
      description: `
        Choose a type of dragon from among the dragons on \\trefnp{Draconic Bloodline Types}.
        You have the blood of that type of dragon in your veins.
        You are \\resistant to attacks with that dragon's associated ability tag.

        \\begin{columntable}
          \\columncaption{Draconic Bloodline Types}
          \\begin{dtabularx}{\\columnwidth}{l >{\\lcol}X >{\\lcol}X}
            \\tb{Dragon} & \\tb{Tag} & \\tb{Mystic Sphere} \\tableheaderrule
            Black       & \\atAcid             & Vivimancy    \\\\
            Blue        & \\atElectricity      & Electromancy \\\\
            Brass       & \\atFire             & Enchantment  \\\\
            Bronze      & \\atElectricity      & Revelation   \\\\
            Copper      & \\atAcid             & Terramancy   \\\\
            Gold        & \\atFire             & Photomancy   \\\\
            Green       & \\atAcid             & Compulsion   \\\\
            Red         & \\atFire             & Pyromancy    \\\\
            Silver      & \\atCold             & Telekinesis  \\\\
            White       & \\atCold             & Cryomancy    \\\\
          \\end{dtabularx}
        \\end{columntable}
      `,
    },
    {
      complexity: 2,
      name: 'Draconic Spell',
      isMagical: true,
      rank: 1,
      description: `
        You learn a spell from your dragon's \\glossterm{mystic sphere}, even if you do not have access to that mystic sphere.
      `,
    },
    {
      complexity: 1,
      name: 'Draconic Hide',
      isMagical: false,
      rank: 2,
      description: `
        You gain a +3 bonus to your \\glossterm{durability}.
      `,
    },
    {
      complexity: 1,
      name: 'Draconic Precision',
      isMagical: true,
      rank: 3,
      description: `
        You gain a \\plus1 accuracy bonus with any ability that has your dragon's associated ability tag.
      `,
    },
    {
      complexity: 0,
      name: 'Draconic Body',
      isMagical: false,
      rank: 4,
      description: `
        You gain a \\plus1 bonus to your Constitution.
      `,
    },
    {
      complexity: 0,
      name: 'Energy Immunity',
      isMagical: false,
      rank: 5,
      description: `
        You become immune to attacks that have your dragon's associated ability tag.
      `,
    },
    {
      complexity: 0,
      name: 'Draconic Hide+',
      isMagical: false,
      rank: 6,
      description: `
        The durability bonus increases to +5.
      `,
    },
    {
      complexity: 0,
      name: 'Draconic Mind',
      isMagical: true,
      rank: 7,
      description: `
        You gain a \\plus1 bonus to your Intelligence and Willpower.
      `,
    },
  ];
}

export function innateArcanist(): RankAbility[] {
  return [
    {
      complexity: 1,
      name: 'Innate Magic',
      isMagical: true,
      rank: 1,
      description: `
        None of your arcane spells have \\glossterm{somatic components} or \\glossterm{verbal components}.
      `,
    },
    {
      complexity: 1,
      name: 'Arcane Infusion',
      isMagical: true,
      rank: 2,
      description: `
        You gain a \\plus1 \\glossterm{enhancement bonus} to your Constitution.
      `,
    },
    {
      complexity: 2,
      name: 'Intuitive Echo',
      isMagical: true,
      rank: 3,
      description: `
        Whenever another creature uses a \\magical ability within \\medrange of you as a \\glossterm{standard action} or \\glossterm{elite action}, you automatically \\glossterm{briefly} trace that ability.
        The ability must not have the \\abilitytag{Attune} or \\abilitytag{Sustain} tags, and it must not cost fatigue to use.

        As a standard action, you can use any ability that you have traced.
        After you decide to use a traced ability, you intuitively learn what it does, including its accuracy and any effects it would have on a hit.
        You can choose the area and targets affected by it.
        In all other ways, the ability functions in the same way as when it was originally used, including its original \\glossterm{accuracy} and \\glossterm{power}.
        All attacks you make with that ability are \\glossterm{reactive attacks}, so you cannot modify them with abilities like \\ability{desperate exertion}.

        As a \\glossterm{minor action}, you can persist one ability that you have traced.
        This means it remains traced until you finish a \\glossterm{long rest}.
        When you persist an ability in this way, you stop persisting any other traced abilities.
      `,
    },
    {
      complexity: 1,
      name: 'Implement Freedom',
      isMagical: true,
      rank: 4,
      description: `
        You can gain the benefits of one magical implement that requires a single free hand, such as a short staff or wand, without having to hold it in your hands.
        You must still have it on your person, such as in a pocket or strapped to your back, and you must still be attuned to it to gain its benefits.
        This ability only affects one implement at a time.
      `,
    },
    {
      complexity: 0,
      name: 'Arcane Infusion+',
      isMagical: true,
      rank: 5,
      description: `
        You gain a \\plus1 \\glossterm{enhancement bonus} to an attribute of your choice other than Constitution.
      `,
    },
    {
      complexity: 1,
      name: 'Intuitive Echo+',
      isMagical: true,
      rank: 6,
      description: `
        You can trace abilities at up to \\distrange.
        In addition, you can persist up to three magical abilities that you have traced.
        If you persist a fourth ability, you choose which persisted ability to remove.
        You still lose all persisted abilities when you finish a long rest.
      `,
    },
    {
      complexity: 1,
      name: 'Mystic Supremacy',
      isMagical: true,
      rank: 7,
      description: `
        You gain a \\plus2 bonus to your defenses against \\magical attacks.
        In addition, you are immune to magical attacks from creatures that are rank 5 or lower.
      `,
    },
  ];
}

export function wildMagic(): RankAbility[] {
  return [
    {
      complexity: 2,
      name: 'Wildspell',
      isMagical: true,
      rank: 1,
      description: `
        Whenever you cast a damaging spell that does not have the \\abilitytag{Attune} or \\abilitytag{Sustain} tags, you may use this ability after making all other decisions for the spell (such as targets, intended area, and so on).
        When you do, roll 1d10 and apply the corresponding wild magic effect from the table below.

        % 1 and 2 are bad. 3, 4 and 5, and 6 are mixed upside/downside.
        % 6 and above are strictly positive.
        \\begin{columntable}
          \\begin{dtabularx}{\\textwidth}{l X}
            \\tb{Roll} & \\tb{Effect} \\tableheaderrule
            1 & The spell has no immediate effect, but it \\glossterm{repeats} at the start of your next turn \\\\
            2 & You are a target of the spell in addition to any other targets, but with a -4 accuracy penalty against yourself \\\\
            3 & Your first attack roll with the spell only \\glossterm{explodes} on a 1 or 2 \\\\
            4 & You gain a \\plus10 \\glossterm{accuracy} bonus with the spell, but cannot get a \\glossterm{critical hit} \\\\
            5 & The spell gains the \\atCold, \\atElectricity, and \\atFire ability tags \\\\
            6 & The spell's area is doubled \\\\
            7 & Each target hit by the spell is \\glossterm{briefly} \\confused, \\braced, and \\focused \\\\
            8 & The spell \\glossterm{chains} once to the unaffected \\glossterm{enemy} that is closest to one of the spell's \\glossterm{primary targets}, choosing randomly between equally close creatures \\\\
            9 & The spell deals \\glossterm{extra damage} equal to your rank in this archetype \\\\
            10 & Your first attack roll with the spell \\glossterm{explodes} on any value, not just on a 10 \\\\
            11\\plus & The spell \\glossterm{repeats} at the start of your next turn \\\\
          \\end{dtabularx}
        \\end{columntable}

        Some wild magic effects cannot be meaningfully applied to all spells.
        For example, doubling the area of a spell does not affect spells that do not affect an area.
        Any wildspell effects that do not make sense for a particular spell have no effect.
      `,
    },
    {
      complexity: 2,
      name: 'Chaotic Insight',
      isMagical: true,
      rank: 2,
      description: `
        You learn a spell that does not have the \\abilitytag{Attune} or \\abilitytag{Sustain} tags from any \\glossterm{mystic sphere}, even if you do not have access to that mystic sphere.
        The spell does not have to be from a mystic sphere on the arcane mystic sphere list.
        As normal, you can change which spell you learn with this ability as you gain access to new spell ranks.
      `,
    },
    {
      complexity: 1,
      name: 'Chaotic Exertion',
      isMagical: true,
      rank: 3,
      description: `
        You gain a \\plus2 bonus to the roll when you use the \\ability{desperate exertion} ability.
        This bonus stacks with the normal \\plus2 bonus provided by that ability.
      `,
    },
    {
      complexity: 1,
      name: 'Desperate Wildspell',
      isMagical: true,
      rank: 4,
      description: `
        If you use the \\textit{desperate exertion} ability on a spell affected by this ability, you can reroll the wild magic roll for that spell in addition to the normal effects of the \\textit{desperate exertion} ability.
        You do not gain any bonus to the wild magic reroll.
      `,
    },
    {
      complexity: 1,
      name: 'Chaotic Insight+',
      isMagical: true,
      rank: 5,
      description: `
        You learn an additional spell with this ability.
      `,
    },
    {
      complexity: 1,
      name: 'Chaotic Exertion+',
      isMagical: true,
      rank: 6,
      description: `
        Once per \\glossterm{short rest}, you can use the \\ability{desperate exertion} ability without increasing your \\glossterm{fatigue level}.
      `,
    },
    {
      complexity: 0,
      name: 'Wildspell+',
      isMagical: true,
      rank: 7,
      description: `
        You gain a \\plus2 bonus to the wild magic roll.
      `,
    },
  ];
}

export function arcaneMagicModifiers(creature: Creature, rank: number) {
  applyArchetypeActiveAbilities(creature, arcaneMagic(), rank);
  if (rank >= 1) {
    creature.addCustomModifier({
      name: 'Mage Armor',
      numericEffects: [
        { statistic: 'armor_defense', modifier: 2 },
        { statistic: 'durability', modifier: 2 },
      ],
    });
  }
}

export function arcaneSpellMasteryModifiers(creature: Creature, rank: number) {
  applyArchetypeActiveAbilities(creature, arcaneSpellMastery(), rank);
  if (rank >= 1) {
    // Assuming Con requirement is met for simplicity
    creature.addSimpleModifier({
      name: 'Arcane Dynamo',
      statistic: 'magical_power',
      value: 2,
    });
  }

  if (rank >= 3) {
    creature.addSimpleModifier({
      name: 'Spell-Trained Mind',
      statistic: 'willpower',
      value: 1,
    });
  }

  if (rank >= 7) {
    creature.addCustomModifier({
      name: 'Experienced Spellcaster',
      numericEffects: [
        { statistic: 'accuracy', modifier: 1 },
        { statistic: 'fortitude', modifier: 1 },
      ],
    });
  }
}

export function draconicMagicModifiers(creature: Creature, rank: number) {
  applyArchetypeActiveAbilities(creature, draconicMagic(), rank);
  if (rank >= 2) {
    creature.addSimpleModifier({
      name: 'Draconic Hide',
      statistic: 'durability',
      value: rank >= 6 ? 5 : 3,
    });
  }

  if (rank >= 4) {
    creature.addSimpleModifier({
      name: 'Draconic Body',
      statistic: 'constitution',
      value: 1,
    });
  }

  if (rank >= 7) {
    creature.addCustomModifier({
      name: 'Draconic Mind',
      numericEffects: [
        { statistic: 'intelligence', modifier: 1 },
        { statistic: 'willpower', modifier: 1 },
      ],
    });
  }
}

export function innateArcanistModifiers(creature: Creature, rank: number) {
  applyArchetypeActiveAbilities(creature, innateArcanist(), rank);
  if (rank >= 2) {
    creature.addSimpleModifier({
      name: 'Arcane Infusion (Constitution)',
      statistic: 'constitution',
      value: 1,
    });
  }

  if (rank >= 5) {
    creature.addSimpleModifier({
      name: 'Arcane Infusion (Strength)',
      statistic: 'strength',
      value: 1,
    });
  }

  if (rank >= 7) {
    creature.addCustomModifier({
      name: 'Mystic Supremacy',
      numericEffects: [
        { statistic: 'armor_defense', modifier: 2 },
        { statistic: 'fortitude', modifier: 2 },
        { statistic: 'reflex', modifier: 2 },
        { statistic: 'mental', modifier: 2 },
      ],
    });
  }
}

export function wildMagicModifiers(creature: Creature, rank: number) {
  applyArchetypeActiveAbilities(creature, wildMagic(), rank);
}
