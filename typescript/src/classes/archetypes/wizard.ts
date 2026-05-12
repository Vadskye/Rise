import { Creature } from '@src/character_sheet/creature';
import { RankAbility } from '../types';
import { addStandardSpellModifiers } from '../definitions/standard_modifiers';

export function alchemist(): RankAbility[] {
  return [
    {
      complexity: 3,
      name: 'Portable Workshop',
      isMagical: true,
      rank: 1,
      description: `
        You carry materials necessary to refine low-grade \\glossterm{alchemical items} wherever you are.
        This includes any item created using Craft (alchemy), such as potions, elixirs, and alchemist's fire.
        Where you lack material components, you fill in with some of your own magic, allowing you to create items more easily.
        The items are just as effective when used as items created normally.
        However, they are less durable, since they are partially sustained by your magic.

        You can use this ability to create alchemical items with a rank lower than your rank in this archetype (see \\pcref{Item Ranks}).
        Creating an item in this way functions in the same way as crafting items normally (see \\pcref{Crafting Items}), with the following exceptions:
        \\begin{raggeditemize}
          \\item You do not require any raw materials or an alchemist's lab.
          \\item Items created with this ability deteriorate and become useless after 24 hours or after you finish a long rest, whichever comes first.
          \\item You can only maintain the existence of four items with this ability at once.
          If you try to create an item beyond this limit, you must first dismiss another item created.
          This removes any lingering effects from the removed item, such as the protective qualities of an \\magicitem{antitoxin elixir}.
          \\item Items you create with this ability still have a lingering magic tied to you when destroyed or consumed.
          With five minutes of work, you can recreate all of those items.
          This removes any lingering effects from the recreated item.
        \\end{raggeditemize}

        You can invest any number of \\glossterm{insight points} into this ability.
        Unlike normal for insight points, this does not directly grant you any additional abilities known.
        Instead, for each insight point invested, the number of items you can maintain simultaneously with this ability increases by one.
      `,
    },
    {
      complexity: 2,
      name: 'Alchemical Discovery',
      isMagical: true,
      rank: 2,
      description: `
        You learn how to create alchemical items more effectively.
        You gain your choice of one of the following benefits.
        Each benefit can only be chosen once.

        You can only apply one of your alchemical discoveries whenever you create an item.
        For example, if you had both the Aerodynamic Construction and Expanded Construction discoveries, you could not create an item with both double throwing range and double area.
        You would have to choose which alchemical discovery to apply when creating the item.
        {
        \\parhead{Advanced Workshop} You can use your \\ability{portable workshop} ability to create items with a rank equal to your rank in this archetype.
        However, each item you create in this way counts as three items for the purpose of determining how many items you can sustain with that ability.
        \\parhead{Aerodynamic Construction} You double the range of thrown alchemical items you create.
        This does not affect alchemical items that are not designed to be thrown.
        \\parhead{Efficient Crafting} You do not need an alchemist's lab to craft alchemical items (see \\pcref{Crafting Items}).
        In addition, you reduce the \\glossterm{difficulty value} to craft alchemical items by 5.
        % TODO: wording, and does this even matter? Affects sunrods and elixirs.
        \\parhead{Enduring Construction} The duration of effects from alchemical items you create is tripled, to a maximum of an additional 16 hours.
        % In addition, alchemical items that last for a fixed number of uses have that number of uses doubled.
        \\parhead{Expanded Construction} The area affected by any alchemical item you create is doubled.
        \\parhead{Explosive Construction} Whenever you create an alchemical item that deals damage, you can enhance its destructive potential.
        Attacks with the item gain a \\plus2 accuracy bonus.
        However, if the attacker rolls a 1 or 2 on the attack roll, the item targets them in addition to any other targets, dealing them half damage.
        Ignore dice rolled for \\glossterm{explosions} for this purpose.
        \\parhead{Repetitive Construction} Whenever you use your \\ability{portable workshop} ability, you can create three copies of the same alchemical item.
        They only count as two items for the purpose of determining the number of items you can maintain with that ability.
        }
      `,
    },
    {
      complexity: 1,
      name: 'Alchemical Precision',
      isMagical: true,
      rank: 3,
      description: `
        You gain a \\plus1 \\glossterm{accuracy} bonus with alchemical items.
      `,
    },
    {
      complexity: 1,
      name: 'Alchemical Tolerance',
      isMagical: true,
      rank: 3,
      description: `
        You gain a \\plus1 bonus to your Fortitude defense.
        In addition, you are immune to \\atPoison attacks.
      `,
    },
    {
      complexity: 1,
      name: 'Alchemical Discovery+',
      isMagical: true,
      rank: 4,
      description: `
        You gain an additional alchemical discovery ability.
      `,
    },
    {
      complexity: 0,
      name: 'Alchemical Tolerance+',
      isMagical: true,
      rank: 5,
      description: `
        You gain a \\plus1 bonus to your Constitution.
        In addition, you are immune to \\atAcid attacks.
      `,
    },
    {
      complexity: 1,
      name: 'Alchemical Discovery+',
      isMagical: true,
      rank: 6,
      description: `
        You gain an additional alchemical discovery ability.
      `,
    },
    {
      complexity: 1,
      name: 'Experienced Quaffing',
      isMagical: false,
      rank: 7,
      description: `
        You can drink up to two doses of potions, elixirs, and other drinkable alchemical items as part of the same standard action.
      `,
    },
  ];
}

export function arcaneMagic(): RankAbility[] {
  const abilities: RankAbility[] = [
    {
      complexity: 4,
      name: 'Arcane Spells',
      isMagical: true,
      rank: 1,
      description: `
        Your extensive studies grant you the ability to use arcane magic.
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

export function arcaneScholar(): RankAbility[] {
  return [
    {
      complexity: 1,
      name: 'Ritualist',
      isMagical: true,
      rank: 1,
      description: `
        You gain the ability to perform arcane rituals to create unique magical effects (see \\pcref{Spell and Ritual Mechanics}).
        The maximum \\glossterm{rank} of arcane ritual you can learn or perform is equal to the maximum rank of arcane spell that you can cast.
        In addition, you automatically learn one free arcane ritual of each rank you have access to, including new ranks as you gain access to them.
      `,
    },
    {
      complexity: 1,
      name: 'Spell Knowledge',
      isMagical: true,
      rank: 1,
      description: `
        You learn an additional spell from any arcane \\glossterm{mystic sphere} that you have access to.
      `,
    },
    {
      complexity: 2,
      name: 'Scholastic Insight',
      isMagical: true,
      rank: 2,
      description: `
        You gain one of the following insights.
        Some insights can be chosen multiple times, as indicated in their descriptions.
        You may spend \\glossterm{insight points} to gain access to one additional scholastic insight per two insight points.

        {
        \\parhead{Arcane Tattoo} You gain a \\plus3 bonus to your Brawn, Fortitude, Reflex, or Mental defense.
        \\par You can choose this insight multiple times, choosing a different defense each time.

        \\parhead{Expanded Sphere Access} You gain access to a new \\glossterm{mystic sphere}.
        \\par You can choose this insight multiple times, gaining access to an additional mystic sphere each time.

        \\parhead{Ritual Master} You are exceptionally skilled at performing rituals quickly and efficiently.
        When you initiate a ritual, the time required and fatigue level cost to complete that ritual is halved.
        This cannot reduce the ritual's fatigue level cost to zero.

        \\parhead{Soulwoven Spell} Choose a rank 1 spell you know with the \\atAttune tag that is not a \\glossterm{deep attunement}.
        That spell becomes permanently active on you without requiring an \\glossterm{attunement point}.
        No outside force can remove it, and you cannot consciously suppress its effects.
        If the spell would normally release its own attunement or otherwise end as part of its own effect, it is automatically applied to you again after one minute.
        Whenever your rank in this archetype increases, you can change which spell you have soulwoven with this ability.
        The spell's maximum rank is equal to half your rank in this archetype.
        \\par You cannot choose this insight multiple times.

        \\parhead{Sphere Specialization}\\nonsectionlabel{Sphere Specialization} Choose a a \\glossterm{mystic sphere} you have access to.
        You gain \\plus1 \\glossterm{accuracy} bonus with abilities from that \\glossterm{mystic sphere}.
        You also memorize all rituals from that \\glossterm{mystic sphere} that your spellcasting rank gives you access to.
        In exchange, you must lose access to another \\glossterm{mystic sphere} you have.
        You must exchange all spells you know from that \\glossterm{mystic sphere} with spells from other \\glossterm{mystic spheres} you have access to.
        \\par You cannot choose this insight multiple times.
        }
      `,
    },
    {
      complexity: 2,
      name: 'Contingency',
      isMagical: true,
      rank: 3,
      description: `
        You gain the ability to prepare a spell so it takes effect automatically if specific circumstances arise.
        \\begin{magicalattuneability}{Contingency}{One minute}
          \\abilitytags \\atAttune
          % If any spells take more than one standard action, they would need to be excluded from Contingency, but none exist
          % You can apply this ability to any arcane spell that can be cast as a \\glossterm{standard action} or \\glossterm{minor action}.
          \\abilitycost Two \\glossterm{fatigue levels} (see text).
          \\rankline
          When you use this ability, you choose a spell that you know.
          The spell has no immediate effect.
          Instead, you specify circumstances that will automatically cause the spell to take effect.
          You cannot consciously control the spell after setting the circumstances, and any attacks made as part of the spell's resolution are \\glossterm{reactive attacks}.
          When the spell takes effect, you increase your \\glossterm{fatigue level} by two.

          The spell can be set to trigger in response to any circumstances that a typical human observing you and your situation could detect.
          For example, you could specify \`\`when I fall at least 50 feet'' or \`\`when I take a \\glossterm{vital wound}'', but not \`\`when there is an invisible creature within 50 feet of me'' or \`\`when I have only one \\glossterm{hit point} remaining.''
          The more specific the required circumstances, the better -- vague requirements, such as \`\`when I am in danger'', may cause the spell to trigger unexpectedly or fail to trigger at all.
          If you attempt to specify multiple separate triggering conditions, such as \`\`when I take damage or when an enemy is adjacent to me'', the spell will randomly ignore all but one of the conditions.

          If the spell needs to be targeted, the trigger condition can specify a simple rule for identifying how to target the spell, such as \`\`the closest enemy''.
          If the rule is poorly worded or imprecise, the spell may target incorrectly or fail to activate at all.
          Any spells which require decisions other than targeting, such as the \\spell{dimension door} spell, must have those decisions made when this ability is used.
          You cannot alter those decisions when the contingency takes effect.
        \\end{magicalattuneability}
      `,
    },
    {
      complexity: 1,
      name: 'Scholastic Insight+',
      isMagical: true,
      rank: 4,
      description: `
        You gain an additional scholastic insight.
      `,
    },
    {
      complexity: 1,
      name: 'Contingency+',
      isMagical: true,
      rank: 5,
      description: `
        When your \\ability{contingency} activates, you only increase your fatigue level by one.
      `,
    },
    {
      complexity: 1,
      name: "Scholar's Mind",
      isMagical: true,
      rank: 5,
      description: `
        You gain a \\plus1 bonus to your Intelligence.
      `,
    },
    {
      complexity: 1,
      name: 'Scholastic Insight+',
      isMagical: true,
      rank: 6,
      description: `
        You gain an additional scholastic insight.
      `,
    },
    {
      complexity: 1,
      name: 'Contingency++',
      isMagical: true,
      rank: 7,
      description: `
        You gain an additional \\glossterm{attunement point} that can only be used to attune to the \\ability{contingency} ability.
        In addition, you can attune to the \\ability{contingency} ability up to three times.
        Each contingency must have a different associated spell and triggering condition.
        Whenever one of your contingencies triggers, your other contingencies \\briefly cannot trigger.
        If multiple contingencies would activate simultaneously, randomly choose only one to activate.
      `,
    },
  ];
}

export function arcaneSpellMastery(): RankAbility[] {
  return [
    {
      complexity: 2,
      name: 'Intricate Spell',
      isMagical: true,
      rank: 1,
      description: `
        Whenever you cast a spell, you can use this ability to make the spell's incantations more nuanced and complex.
        If you do, you gain a \\plus1 accuracy bonus with the spell this turn.
        However, you \\glossterm{briefly} take a \\minus2 penalty to all defenses.
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
        \\parhead{Calculated Spell} Choose an arcane \\glossterm{spell} you know.
        As a \\glossterm{minor action}, you can calculate the effect that the spell would have.
        When you do, roll 1d10.
        If you cast that spell this turn, you use that die result as your accuracy roll for any attacks this turn, exploding as normal if the die result was a 10.
        After calculating in this way, you \\glossterm{briefly} cannot do so again, whether or not you cast the spell.
        You cannot choose this ability multiple times.
        \\parhead{Distant Spell} Choose an arcane \\glossterm{spell} you know with a standard \\glossterm{range}: \\shortrangeless, \\medrangeless, \\longrangeless, \\distrangeless, or \\extrangeless.
        You increase that spell's range to the next standard range category, to a maximum of Extreme range.
        You can choose this ability multiple times, choosing a different spell each time.
        \\parhead{Researched Spell} Choose an arcane \\glossterm{spell} you know.
        You use your Intelligence in place of your Willpower to determine your \\glossterm{power} with that spell.
        You can choose this ability multiple times, choosing a different spell each time.
        \\parhead{Rituals} You gain the ability to perform arcane rituals to create unique magical effects (see \\pcref{Spell and Ritual Mechanics}).
        The maximum \\glossterm{rank} of arcane ritual you can learn or perform is equal to the maximum \\glossterm{rank} of arcane spell that you can cast.
        When you gain this ability, you can memorize a rank 1 arcane ritual from any arcane mystic sphere you have access to.
        Whenever you gain access to a new spellcasting rank, you can memorize an additional ritual of that rank or lower.
        You cannot choose this ability multiple times.
        \\parhead{Widened Spell} Choose an arcane \\glossterm{spell} you know with a standard \\glossterm{area}: \\tinyarea, \\smallarea, \\medarea, \\largearea, \\hugearea, or \\gargarea.
        You increase that spell's area to the next standard area category, to a maximum of a Gargantuan area.
        You can choose this ability multiple times, choosing a different spell each time.
        }
      `,
    },
    {
      complexity: 1,
      name: 'Expert Metamage',
      isMagical: true,
      rank: 2,
      description: `
        You can spend \\glossterm{insight points} to learn one additional metamagic ability per insight point.
      `,
    },
    {
      complexity: 0,
      name: 'Spell-Trained Understanding',
      isMagical: true,
      rank: 3,
      description: `
        You gain a \\plus1 bonus to your Intelligence.
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
        You gain a \\plus1 bonus to your \\glossterm{accuracy} and Mental defense.
      `,
    },
  ];
}

export function schoolSpecialist(): RankAbility[] {
  return [
    {
      complexity: 1,
      name: 'School Specialization',
      isMagical: true,
      rank: 1,
      description: `
        The arcane mystic spheres can be divided into six traditional schools of magic.
        Choose one of the following schools of magic.
        You are a specialist in your chosen school.
        You cannot gain access to any arcane mystic spheres outside of your specialized school, and you cannot learn spells or rituals from those spheres by any means.
        In exchange, you gain a benefit based on your specialized school.

        \\subcf{Abjuration} The \\sphere{telekinesis} and \\sphere{thaumaturgy} mystic spheres.
        If you specialize in this school, you a \\plus1 bonus to your Armor and Reflex defenses.

        \\subcf{Conjuration} The \\sphere{astromancy} and \\sphere{fabrication} mystic spheres.
        If you specialize in this school, you gain a \\plus15 foot bonus to the \\glossterm{range} of arcane spells you cast.

        \\subcf{Evocation} The \\sphere{cryomancy}, \\sphere{electromancy}, and \\sphere{pyromancy} mystic spheres.
        If you specialize in this school, you gain a \\plus2 bonus to your \\glossterm{magical power}.

        \\subcf{Illusion} The \\sphere{enchantment}, \\sphere{photomancy}, and \\sphere{umbramancy} mystic spheres.
        If you specialize in this school, you gain a \\plus1 \\glossterm{accuracy} bonus.

        \\subcf{Necromancy} The \\sphere{revelation} and \\sphere{vivimancy} mystic spheres.
        If you specialize in this school, you gain a \\plus3 bonus to your \\glossterm{durability}.

        \\subcf{Transmutation} The \\sphere{chronomancy}, \\sphere{polymorph}, and \\sphere{terramancy} mystic spheres.
        If you specialize in this school, you gain a \\plus2 bonus to your Brawn, Fortitude, Reflex, or Mental defense.
        You can change which defense this bonus applies to as a \\glossterm{minor action}.
      `,
    },
    {
      complexity: 1,
      name: 'School Knowledge',
      isMagical: true,
      rank: 2,
      description: `
        You learn an additional spell from any mystic sphere within your chosen school, even if you do not have access to that mystic sphere.
      `,
    },
    {
      complexity: 1,
      name: 'School Resilience',
      isMagical: true,
      rank: 3,
      description: `
        You gain a defensive ability based on your chosen school.
        {
        \\subcf{Abjuration} You are immune to \\glossterm{push} and \\glossterm{fling} effects unless you choose to be affected.

        \\subcf{Conjuration} You passively flicker into the Astral Expanse, causing all \\glossterm{targeted} attacks against you to have a 10\\% \\glossterm{failure chance}.

        \\subcf{Evocation} You are \\resistant to attacks from your choice of one of the following tags: \\atCold, \\atElectricity, or \\atFire.

        \\subcf{Illusion} You are immune to being \\dazzled and \\blinded.

        \\subcf{Transmutation} You gain a \\plus1 bonus to \\glossterm{vital rolls}.

        \\subcf{Necromancy} Whenever you \\glossterm{injure} a creature, you \\glossterm{briefly} become \\resistant to their attacks.
        }
      `,
    },
    {
      complexity: 0,
      name: 'School Specialization+',
      isMagical: true,
      rank: 4,
      description: `
        Your understanding of your chosen school improves.
        {
        \\subcf{Abjuration} You also reduce your \\glossterm{injury threshold} by three times your rank in this archetype.

        \\subcf{Conjuration} The range improvement increases to \\plus30 feet.

        \\subcf{Evocation} The power bonus increases to \\plus3.

        \\subcf{Illusion} You gain a \\plus2 \\glossterm{enhancement bonus} to the Disguise, Stealth, and Sleight of Hand skills.

        \\subcf{Necromancy} The durability bonus increases to \\plus5.

        \\subcf{Transmutation} The defense bonus increases to \\plus3.
        }
      `,
    },
    {
      complexity: 1,
      name: 'School Knowledge+',
      isMagical: true,
      rank: 5,
      description: `
        You learn an additional spell from any mystic sphere within your chosen school, even if you do not have access to that mystic sphere.
        If you already know at least three spells from all mystic spheres within your chosen school, you can instead gain an additional \\glossterm{attunement point}.
        You can only use this attunement point to \\glossterm{attune} to spells from your chosen school.
      `,
    },
    {
      complexity: 1,
      name: 'School Resilience+',
      isMagical: true,
      rank: 6,
      description: `
        Your defensive ability based on your chosen school improves.
        {
        \\subcf{Abjuration} You cannot be \\grappled.

        \\subcf{Conjuration} The failure chance increases to 20\\%.

        \\subcf{Evocation} You are \\resistant to \\atCold, \\atElectricity, and \\atFire attacks.

        \\subcf{Illusion} You are immune to \\abilitytag{Emotion} and \\abilitytag{Visual} attacks.

        \\subcf{Transmutation} The vital roll bonus increases to \\plus2.

        \\subcf{Necromancy} You are \\resistant to attacks from \\glossterm{injured} creatures and undead creatures.
        }
      `,
    },
    {
      complexity: 0,
      name: 'School Specialization+',
      isMagical: true,
      rank: 7,
      description: `
        Your understanding of your chosen school reaches its full potential.
        {
        \\subcf{Abjuration} The defense bonus increases to \\plus2.

        \\subcf{Conjuration} The range improvement increases to \\plus60 feet.

        \\subcf{Evocation} The power bonus increases to \\plus4.

        \\subcf{Illusion} The accuracy bonus increases to \\plus2.

        \\subcf{Necromancy} The durability bonus increases to \\plus7.

        \\subcf{Transmutation} The defense bonus increases to \\plus4.
        }
      `,
    },
  ];
}

export function alchemistModifiers(creature: Creature, rank: number) {
  if (rank >= 3) {
    creature.addSimpleModifier({
      name: 'Alchemical Tolerance',
      statistic: 'fortitude',
      value: 1,
    });
  }

  if (rank >= 5) {
    creature.addSimpleModifier({
      name: 'Alchemical Tolerance+',
      statistic: 'constitution',
      value: 1,
    });
  }
}

export function arcaneMagicModifiers(creature: Creature, rank: number) {
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

export function arcaneScholarModifiers(creature: Creature, rank: number) {
  if (rank >= 5) {
    creature.addSimpleModifier({
      name: "Scholar's Mind",
      statistic: 'intelligence',
      value: 1,
    });
  }
}

export function arcaneSpellMasteryModifiers(creature: Creature, rank: number) {
  if (rank >= 3) {
    creature.addSimpleModifier({
      name: 'Spell-Trained Understanding',
      statistic: 'intelligence',
      value: 1,
    });
  }

  if (rank >= 7) {
    creature.addCustomModifier({
      name: 'Experienced Spellcaster',
      numericEffects: [
        { statistic: 'accuracy', modifier: 1 },
        { statistic: 'mental', modifier: 1 },
      ],
    });
  }
}

export function schoolSpecialistModifiers(creature: Creature, rank: number) {
  // Assuming Evocation for simplicity
  if (rank >= 1) {
    creature.addSimpleModifier({
      name: 'School Specialization (Evocation)',
      statistic: 'magical_power',
      value: rank >= 7 ? 4 : rank >= 4 ? 3 : 2,
    });
  }
}
