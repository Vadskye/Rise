import { Creature } from '@src/character_sheet/creature';
import { RankAbility } from '../types';
import {
  addStandardManeuverModifiers,
  addStandardSpellModifiers,
} from '../definitions/standard_modifiers';

export function pactboundWarrior(): RankAbility[] {
  const abilities: RankAbility[] = [
    {
      complexity: 3,
      name: 'Pact Maneuvers',
      isMagical: false,
      rank: 1,
      description: `
        You can use magically enhanced weaponry to overwhelm your foes in combat.
        You gain access to one \\glossterm{combat style} based on your soulkeeper:
        \\begin{raggeditemize}
          \\item Devil: Herald of War or Rip and Tear
          \\item Fae: Flurry of Blows or Mobile Hunter
          \\item Moirai: Ebb and Flow or Perfect Precision
          \\item Precursor: Brute Force or Unbreakable Defense
        \\end{raggeditemize}
        You may spend \\glossterm{insight points} to gain access to one additional combat style per insight point, including combat styles other than those from your soulkeeper.
        You can only learn pact \\glossterm{maneuvers} from pact combat styles that you have access to.

        You learn two rank 1 pact \\glossterm{maneuvers}.
        You may spend \\glossterm{insight points} to learn one additional maneuver per insight point.

        When you gain access to a new \\glossterm{rank} in this archetype,
        you can exchange any number of maneuvers you know for other maneuvers,
        including maneuvers of a higher rank.

        \\advancement Some pact maneuvers also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
      `,
    },
    {
      complexity: 1,
      name: 'Soulblade',
      isMagical: false,
      rank: 1,
      description: `
        The pact you made to gain martial prowess infuses your weaponry with mystic power.
        All \\glossterm{strikes} you make are \\magical abilities.
        This means you use your \\glossterm{magical power} to determine your damage instead of your \\glossterm{mundane power} (see \\pcref{Power}).
      `,
    },
    {
      complexity: 2,
      name: 'Augmented Maneuvers',
      isMagical: false,
      rank: 2,
      description: `
        You gain the ability to customize your pact maneuvers.
        For each rank 1 pact maneuver you know, choose one augment from the list below and apply it to that maneuver.
        Augments scale in power with your \`\`excess rank''.
        Your excess rank with a maneuver is equal to your rank in this archetype minus the rank of the maneuver.

        Whenever you increase your rank in this archetype, you can change your augments.
        However, you must still apply them to rank 1 pact maneuvers.
        {
        \\parhead{Finishing Maneuver} You gain an accuracy bonus equal to twice your excess rank against creatures who are \\glossterm{injured}.

        \\parhead{Mighty Maneuver} You deal \\glossterm{extra damage} equal to twice your excess rank.

        \\parhead{Precise Maneuver} You gain an accuracy bonus equal to your excess rank.

        \\parhead{Reckless Maneuver} You gain an accuracy bonus equal to twice your excess rank.
        However, you \\glossterm{briefly} take a \\minus2 penalty to your defenses after you use the maneuver.
        You can only apply this augment to maneuvers which cause you to make a melee \\glossterm{strike} or \\glossterm{brawling attack}.

        \\parhead{Spellfused Maneuver\\sparkle} Choose a \\glossterm{ranged} pact spell you know that does not have the \\atAttune or \\atSustain tags.
        Its rank must not exceed your excess rank with the maneuver.
        Each target of the maneuver is also affected by that spell, using separate attack rolls for the spell and maneuver.
        Your attack with the spell is a \\glossterm{reactive attack}.
        You do not spend time casting the spell, but each target must still meet any targeting requirements for the spell, such as being a living creature.
        You treat your rank with that spell as being equal to your excess rank, which limits the bonuses it gains from rank scaling.

        You can only apply this augment to maneuvers which cause you to make a melee \\glossterm{strike}, and you must choose a different spell each time you apply this augment to a maneuver.
        After you use this maneuver, you \\briefly can't use any spellfused maneuvers.
        }
      `,
    },
    {
      complexity: 1,
      name: 'Pact Maneuvers+',
      isMagical: false,
      rank: 3,
      description: `
        You gain access to rank 3 pact maneuvers.
      `,
    },
    {
      complexity: 0,
      name: 'Augmented Maneuvers+',
      isMagical: false,
      rank: 4,
      description: `
        You can also choose an augment for each of your rank 3 pact maneuvers.
      `,
    },
    {
      complexity: 0,
      name: 'Pact Maneuvers+',
      isMagical: false,
      rank: 5,
      description: `
        You gain access to rank 5 pact maneuvers.
      `,
    },
    {
      complexity: 0,
      name: 'Augmented Maneuvers+',
      isMagical: false,
      rank: 6,
      description: `
        You can also choose an augment for each of your rank 5 pact maneuvers.
      `,
    },
    {
      complexity: 0,
      name: 'Pact Maneuvers+',
      isMagical: false,
      rank: 7,
      description: `
        You gain access to rank 7 pact maneuvers.
      `,
    },
  ];
  addStandardManeuverModifiers(abilities);
  return abilities;
}

export function covenantKeeper(): RankAbility[] {
  return [
    {
      complexity: 2,
      name: 'Sacrificial Covenant',
      isMagical: true,
      rank: 1,
      description: `
        You make one covenant of your choice from the following list.
        Each covenant grants great power at a cost.
        {
        \\subcf{Covenant of Bloodforging} While you are not wearing other body armor, your blood flows to the surface of your skin, manifesting a carapace around you.
        This functions like light body armor.
        It provides a \\plus4 bonus to your Armor defense, a \\plus4 bonus to your \\glossterm{durability}, and a \\plus1 bonus to your \\glossterm{vital rolls}.
        In exchange, the \\ability{recover} ability no longer causes you to recover hit points (see \\pcref{Recover}).
        You must be \\trait{blooded} to choose this covenant.

        \\subcf{Covenant of Bloodsharing} Once per turn, when you cause a \\trait{blooded} creature other than yourself to lose \\glossterm{hit points}, you can regain \\glossterm{hit points} equal to half your \\glossterm{power} (minimum 1).
        In exchange, you are \\glossterm{injured} whenever you are below your maximum hit points, regardless of your normal \\glossterm{injury point}.
        You must be \\trait{blooded} to choose this covenant.

        \\subcf{Covenant of Soulcursing} Whenever you would inflict a \\glossterm{condition} on an \\trait{ensouled} creature that is not already under the effects of a Curse, that effect becomes a Curse on it instead of a condition.
        It is removed when the creature finishes a \\glossterm{short rest}.
        If the condition would normally have a special way to remove it, such as the \\spell{ignition} spell, that also removes the curse.

        In exchange, whenever you would gain a \\glossterm{condition} that you are not \\buff{immune} to, that effect becomes a \\atCurse on you instead of a condition.
        If you were already affected by a Curse from this ability, the old Curse becomes a condition instead.
        Whenever you finish a \\glossterm{short rest}, you remove any Curse affecting you as a result of this ability.
        }
      `,
    },
    {
      complexity: 1,
      name: 'Covenant of Power',
      isMagical: true,
      rank: 2,
      description: `
        You can choose to gain a \\plus2 bonus to your \\glossterm{magical power} and \\glossterm{mundane power}.
        If you do, you take a \\minus1 penalty to your \\glossterm{fatigue tolerance}.
        Otherwise, you gain a \\plus2 bonus to your \\glossterm{fatigue tolerance}.
      `,
    },
    {
      complexity: 2,
      name: 'Exchange Soul Fragment',
      isMagical: true,
      rank: 3,
      description: `
        Your connection to your soulkeeper deepens, allowing you to send a fragment of your soul through the link in exchange for aid.
        \\begin{magicalactiveability}{Exchange Soul Fragment}{Standard action}
          \\abilitytags \\atSoul
          \\abilitycost One \\glossterm{fatigue level}.
          \\rankline
          You regain \\hprankthree.
          In addition, you may remove a \\glossterm{condition} affecting you.
          This effect \\glossterm{repeats} at the start of your next turn.

          \\rankline
          \\rank{4} The recovery increases to \\hprankfour.
          \\rank{5} The recovery increases to \\hprankfive.
          \\rank{6} The recovery increases to \\hpranksix.
          \\rank{7} The recovery increases to \\hprankseven.
        \\end{magicalactiveability}
      `,
    },
    {
      complexity: 0,
      name: 'Sacrificial Covenant+',
      isMagical: true,
      rank: 4,
      description: `
        The effect of your chosen covenant improves.
        {
        \\subcf{Covenant of Bloodforging} The vital roll bonus from the armor increases to \\plus2.

        \\subcf{Covenant of Bloodsharing} The healing increases to \\hprankthree.

        \\subcf{Covenant of Soulcursing} You can convert conditions into Curse effects against creatures that already have a single Curse effect active on them.
        }
      `,
    },
    {
      complexity: 0,
      name: 'Covenant of Power+',
      isMagical: true,
      rank: 5,
      description: `
        The bonus you chose increases to \\plus4.
      `,
    },
    {
      complexity: 2,
      name: 'Exchange Vitality',
      isMagical: true,
      rank: 6,
      description: `
        Your connection to your soulkeeper deepens, allowing you to send a larger fragment of your soul through the link fragment in exchange for greater aid.
        \\begin{magicalactiveability}{Exchange Vitality}{Standard action}
          \\abilitytags \\atSoul
          \\abilitycost See text.
          \\rankline
          You are \\glossterm{briefly} \\empowered.
          Then, you may remove one of your \\glossterm{vital wounds}.
          If you remove a vital wound in this way, you increase your \\glossterm{fatigue level} by two.
          This effect \\glossterm{repeats} at the end of your next turn.
        \\end{magicalactiveability}
      `,
    },
    {
      complexity: 0,
      name: 'Sacrificial Covenant++',
      isMagical: true,
      rank: 7,
      description: `
        Your understanding of your chosen covenant reaches its full potential.
        {
        \\parhead{Covenant of Bloodforging} The durability bonus from the armor increases to \\plus5.
        In addition, the defense bonus increases to \\plus5.

        \\parhead{Covenant of Bloodsharing} The healing increases to \\hprankseven.

        \\parhead{Covenant of Soulcursing} You can convert conditions into Curse effects with this ability regardless of the number of Curse effects active on the target.
        }
      `,
    },
  ];
}

export function pactMagic(): RankAbility[] {
  const abilities: RankAbility[] = [
    {
      complexity: 4,
      name: 'Pact Spells',
      isMagical: true,
      rank: 1,
      description: `
        Your soulkeeper grants you the ability to use pact magic.
        You gain access to two pact \\glossterm{mystic spheres}, plus the \\sphere{universal} mystic sphere (see \\pcref{Pact Mystic Spheres}).
        At least one of those mystic spheres must be from your soulkeeper (see Soulkeeper Spheres, below).
        You can only learn pact spells from pact mystic spheres that you have access to.

        You automatically learn all \\glossterm{cantrips} from each of your mystic spheres.
        In addition, you learn two rank 1 pact \\glossterm{spells}.
        You can also spend \\glossterm{insight points} to learn one additional rank 1 spell per two insight points.

        Pact spells require \\glossterm{verbal components} and \\glossterm{somatic components} to cast (see \\pcref{Ability Usage Components}).
        For details about mystic spheres and casting spells, see \\pcref{Spell and Ritual Mechanics}.

        When you gain access to a new \\glossterm{mystic sphere} or spell \\glossterm{rank},
        you can forget any number of spells you know to learn that many new spells in exchange,
        including spells of the higher rank.

        \\advancement The maximum rank of pact spells that you can learn is equal to your rank in this archetype.
        Pact spells also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
      `,
    },
    {
      complexity: 0,
      name: 'Soulkeeper Spheres',
      isMagical: true,
      rank: 1,
      description: `
        Your soulkeeper has a particular affinity for two \\glossterm{mystic spheres}.
        You add them to your list of pact mystic spheres if they are not already present.
        In addition, you must always know least one of your soulkeeper spheres.

        % Each soulkeeper is associated with one sphere that is normally part of the pact list, and one that isn't.
        % Devil: Astromancy (extra), Pyromancy (base)
        % Fae: Enchantment (extra), Photomancy (base)
        % Moirai: Fabrication (base), Revelation (extra)
        % Precursor: Chronomancy (base), Polymorph (extra)
        \\begin{raggeditemize}
          \\itemhead{Devil} Astromancy, Pyromancy
          \\itemhead{Fae} Enchantment, Photomancy
          \\itemhead{Moirai} Fabrication, Revelation
          \\itemhead{Precursor} Chronomancy, Polymorph
        \\end{raggeditemize}
      `,
    },
    {
      complexity: 0,
      name: 'Survival Pact',
      isMagical: true,
      rank: 1,
      description: `
        You gain a \\plus1 bonus to your \\glossterm{durability}.
      `,
    },
  ];
  addStandardSpellModifiers(abilities);
  return abilities;
}

export function pactSpellMastery(): RankAbility[] {
  return [
    {
      complexity: 1,
      name: 'Desperate Pact',
      isMagical: true,
      rank: 1,
      description: `
        You can use the \\ability{desperate exertion} ability without increasing your fatigue level (see \\pcref{Desperate Exertion}).
        When you do, you suffer no immediate negative consequences.
        After 10 minutes, your maximum \\glossterm{hit points} are reduced to three-quarters of normal until you complete a \\glossterm{long rest}.
        Each time this penalty takes effect, your hit points are reduced by an additional quarter, so using it three times would reduce your maximum hit points to a quarter of their normal value.
        If your hit points would be reduced below 1 in this way, your body and soul are ripped through the planes directly into your soulkeeper's realm.
        This is invariably lethal, and leaves no corpse behind.
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
        \\parhead{Desperate Spell} Choose a pact \\glossterm{spell} you know.
        When you cast the spell, you may choose to increase your \\glossterm{fatigue level} by one.
        If you do, you become \\empowered and \\focused that turn.
        However, you cannot use the \\ability{desperate exertion} ability to affect the spell.
        You can choose this ability multiple times, choosing a different spell each time.
        \\parhead{Distant Spell} Choose a pact \\glossterm{spell} you know with a standard \\glossterm{range}: \\shortrangeless, \\medrangeless, \\longrangeless, \\distrangeless, or \\extrangeless.
        You increase that spell's range to the next standard range category, to a maximum of Extreme range.
        You can choose this ability multiple times, choosing a different spell each time.
        \\parhead{Powerful Spell} Choose a damaging pact \\glossterm{spell} you know.
        It deals \\glossterm{extra damage} equal to your rank in this archetype.
        You can choose this ability multiple times, choosing a different spell each time.
        \\parhead{Rituals} You gain the ability to perform pact rituals to create unique magical effects (see \\pcref{Spell and Ritual Mechanics}).
        The maximum \\glossterm{rank} of pact ritual you can learn or perform is equal to the maximum \\glossterm{rank} of pact spell that you can cast.
        When you gain this ability, you can memorize a rank 1 pact ritual from any pact mystic sphere you have access to.
        Whenever you gain access to a new spellcasting rank, you can memorize an additional ritual of that rank or lower.
        You cannot choose this ability multiple times.
        \\parhead{Widened Spell} Choose a pact \\glossterm{spell} you know with a standard \\glossterm{area}: \\tinyarea, \\smallarea, \\medarea, \\largearea, \\hugearea, or \\gargarea.
        You increase that spell's area to the next standard area category, to a maximum of a Gargantuan area.
        You can choose this ability multiple times, choosing a different spell each time.
        }
      `,
    },
    {
      complexity: 2,
      name: 'Spell Knowledge',
      isMagical: true,
      rank: 3,
      description: `
        You learn an additional pact spell.
      `,
    },
    {
      complexity: 0,
      name: 'Spell-Trained Mind',
      isMagical: true,
      rank: 4,
      description: `
        You gain a \\plus1 bonus to your Willpower.
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
        You gain a \\plus1 bonus to your \\glossterm{accuracy} and \\glossterm{fatigue tolerance}.
      `,
    },
  ];
}

export function soulforged(): RankAbility[] {
  return [
    {
      complexity: 1,
      name: 'Body and Soul As One',
      isMagical: true,
      rank: 1,
      description: `
        Your body is shaped by your soulkeeper's influence.

        \\subcf{Devil -- Calculating} You gain a bonus to your \\glossterm{mundane power} and \\glossterm{magical power} equal to half your Intelligence.

        \\subcf{Fae -- Unconcerned} You gain a \\plus1 bonus to \\glossterm{accuracy} and all \\glossterm{checks}.
        However, you cannot increase your fatigue to use the \\ability{desperate exertion} ability.
        You can still use it with \\ability{desperate pact} or other similar abilities.

        % 1d10! is about 6.1 accuracy, and 1d8+2 is 6.5 accuracy.
        \\subcf{Moirai -- Inevitable} You gain a \\plus2 \\glossterm{accuracy} bonus.
        However, you roll 1d8 instead of 1d10 for attack rolls, and your attack rolls cannot \\glossterm{explode}.

        \\subcf{Precursor -- Burgeoning} You can use your Constitution in place of your Strength to determine your \\glossterm{brawling accuracy}.
        In addition, you gain a tentacle \\glossterm{natural weapon} (see \\pcref{Natural Weapons}).
        It deals 1d6 damage, has the \\weapontag{Maneuverable} weapon tag, and does not require a \\glossterm{free hand}.
      `,
    },
    {
      complexity: 2,
      name: 'Soulforged Spell',
      isMagical: true,
      rank: 2,
      description: `
        If you have access to pact magic, you learn an additional pact spell.
        The spell can be up to rank 2, even if you do not have access to rank 2 spells.
        It gains a special effect based on your soulkeeper.
        This is a metamagic effect, so the spell cannot have other metamagic applied to it.
        When you gain access to new spell ranks, you can change which spell you know with this ability, including spells with a higher rank.
        {
        \\subcf{Devil -- Tormenting Spell} One creature hit by the spell becomes tormented by the spell as a \\glossterm{condition}.
        If it is \\glossterm{injured} while it is tormented, the spell \\glossterm{repeats} on that creature, and all instances of the condition are removed.
        You gain a \\plus2 accuracy bonus with the repeat for each additional instance of this condition, but the spell still only repeats once.
        After the spell repeats on a creature in this way, it is immune to being tormented by this ability until it finishes a \\glossterm{short rest}.

        \\subcf{Fae -- Hidden Spell} The spell does not have \\glossterm{verbal components} or \\glossterm{somatic components}.
        In addition, if it does not deal damage, it gains the \\atSubtle tag.

        \\subcf{Moirai -- Inevitable Spell} Whenever you would make an attack roll, you can instead determine if an attack result of 6 \\add your \\glossterm{accuracy} with the spell would result in a hit.
        If it does, you hit the target without making an attack roll.
        Otherwise, you roll the attack roll normally.
        This does not allow you to bypass other effects that can cause you to miss without making an attack roll, such as a \\glossterm{miss chance}.

        \\subcf{Precursor -- Fortifying Spell} Whenever you cast the spell, you \\glossterm{briefly} are \\fortified, and your tentacle gains the \\weapontag{Long} \\glossterm{weapon tag}.
        }
      `,
    },
    {
      complexity: 0,
      name: 'Soulforged Weaponry',
      isMagical: true,
      rank: 2,
      description: `
        If you do not have access to pact magic, choose a magic weapon property with a rank no higher than your rank in this archetype (see \\pcref{Magic Weapons}).
        It must not be a \\glossterm{deep attunement}.
        You can \\glossterm{attune} to that magic weapon property.
        If you do, you always treat one weapon you wield as having that property.
        This applies in addition to any other special material or magical properties.
        However, it does not stack if the item would already have that property normally.
        If you wield more than one weapon at a time, you can choose which of your weapons gains this effect as a \\glossterm{free action} once per turn.

        Whenever you increase your rank in this archetype, you can change which magic weapon property you have with this ability.
      `,
    },
    {
      complexity: 1,
      name: 'Soulbound Resilience',
      isMagical: true,
      rank: 3,
      description: `
        You gain a \\plus3 bonus to your \\glossterm{durability}.
        In addition, you take half the normal penalties for being \\glossterm{resurrected} (see \\pcref{Resurrection}).
      `,
    },
    {
      complexity: 0,
      name: 'Body and Soul As One+',
      isMagical: true,
      rank: 4,
      description: `
        Your body continues to be shaped by your soulkeeper's influence.

        \\subcf{Devil -- Specialized Torment} You gain a \\plus4 accuracy bonus for the purpose of determining whether your attacks get a \\glossterm{critical hit} against creatures that are \\vulnerable to the attack.

        \\subcf{Fae -- Free Spirit} At the end of your turn, you have a 50\\% chance to remove a random \\glossterm{poison} or \\glossterm{condition} affecting you.
        This ability is \\glossterm{briefly} disabled whenever you take damage from a cold iron weapon.

        \\subcf{Moirai -- Inexorable} You gain a \\plus2 bonus to all \\glossterm{checks}.
        However, you roll 1d8 instead of 1d10 for checks, and your checks cannot \\glossterm{explode} even if another ability would cause them to explode.

        \\subcf{Precursor -- Grotesque} You gain a \\plus1 bonus to your Constitution.
        In addition, your tentacle gains the \\weapontag{Sweeping} (1) \\glossterm{weapon tag} (see \\pcref{Weapon Tags}).
      `,
    },
    {
      complexity: 1,
      name: 'Soulforged Spell+',
      isMagical: true,
      rank: 5,
      description: `
        You learn an additional spell with this ability.
        It can be up to rank 5, even if you do not have access to rank 5 spells.
      `,
    },
    {
      complexity: 0,
      name: 'Soulforged Armory',
      isMagical: true,
      rank: 5,
      description: `
        If you do not have access to pact magic, choose a magic body armor property with a rank no higher than your rank in this archetype (see \\pcref{Magic Armor}).
        You can \\glossterm{attune} to that magic body armor property.
        If you do, you treat your body armor as if it had that property.
        This applies in addition to any other special material or magical properties.
        However, it does not stack if the item would already have that property normally.

        Whenever you increase your rank in this archetype, you can change which magic body armor property you have with this ability.
      `,
    },
    {
      complexity: 0,
      name: 'Soulbound Resilience+',
      isMagical: true,
      rank: 6,
      description: `
        The durability bonus increases to \\plus5.
        In addition, you take no penalties for being \\glossterm{resurrected}.
      `,
    },
    {
      complexity: 0,
      name: 'Body and Soul As One+',
      isMagical: true,
      rank: 7,
      description: `
        Your body continues to be shaped by your soulkeeper's influence.

        \\subcf{Devil -- Calculating\\plus} You gain a bonus to your Mental defense equal to half your Intelligence.

        \\subcf{Fae -- Unconcerned\\plus} The bonus to accuracy and checks increases to 1d4.

        \\subcf{Moirai -- Inevitable\\plus} The bonus to accuracy and checks increases to \\plus3.

        \\subcf{Precursor -- Burgeoning\\plus} The durability bonus increases to \\plus4.
        In addition, your tentacle now deals 1d10 damage.
      `,
    },
  ];
}

export function pactboundWarriorModifiers(_creature: Creature, _rank: number) {}

export function covenantKeeperModifiers(creature: Creature, rank: number) {
  if (rank >= 2) {
    creature.addSimpleModifier({
      name: 'Covenant of Power (Fatigue)',
      statistic: 'fatigue_tolerance',
      value: rank >= 5 ? 4 : 2,
    });
  }
}

export function pactMagicModifiers(creature: Creature, rank: number) {
  if (rank >= 1) {
    creature.addSimpleModifier({
      name: 'Survival Pact',
      statistic: 'durability',
      value: 1,
    });
  }
}

export function pactSpellMasteryModifiers(creature: Creature, rank: number) {
  if (rank >= 4) {
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
        { statistic: 'fatigue_tolerance', modifier: 1 },
      ],
    });
  }
}

export function soulforgedModifiers(creature: Creature, rank: number) {
  // Generic modifiers
  if (rank >= 3) {
    creature.addSimpleModifier({
      name: 'Soulbound Resilience',
      statistic: 'durability',
      value: rank >= 6 ? 5 : 3,
    });
  }
}
