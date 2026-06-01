import { Creature } from '@src/character_sheet/creature';
import { RankAbility } from '../types';

export function dragon(): RankAbility[] {
  return [
    {
      complexity: 1,
      name: 'Dragonic Wealth',
      isMagical: true,
      rank: 1,
      description: `
        You draw power from mineral-based wealth items with intrinsic mundane value, such as gold, gems, and jewels.
        Those items are called draconic wealth items.
        Your draconic wealth rank is equal to the highest item rank of a draconic wealth item in your possession.
        Some of your abilities are improved by your draconic wealth rank, such as your \ability{dragon breath}.

        The draconic wealth item must be carried on your body, including containers on your body.
        As normal when calculating wealth items, five items of one rank can be collectively considered to be a single item one rank higher.
        For example, if you have five rank 2 rubies, your draconic wealth rank would be 3.
      `,
    },
    {
      complexity: 2,
      name: 'Dragon Breath',
      isMagical: false,
      rank: 1,
      description: `
        \\begin{activeability}{Dragon Breath}{Standard action}
          \\abilitycost You \\briefly can't use this ability again.
          \\rankline
          This ability's tag depends on your dragon type (see \\pcref{Dragon Species Types}).
          If your dragon's source is \magical, this ability is also magical, which means you use your \glossterm{magical power} for damage instead of your mundane power.
          Make an attack vs. Reflex against everything in the area defined by your dragon type.
          \\hit \\damageranktwo.
          \\miss Half damage.

          \\rankline
          You use the higher of your draconic wealth rank and your rank in this archetype to determine your rank with this ability. 
          \\rank{2} The damage increases to \\damagerankthree.
          \\rank{3} The area increases.
          A line breath weapon becomes a \\arealarge, 10 ft.\\ wide line.
          A cone breath weapon becomes a \\areamed cone.
          \\rank{4} The damage increases to \\damagerankfour.
          \\rank{5} The damage increases to \\damagerankfive.
          \\rank{6} The damage increases to \\damageranksix.
          \\rank{7} The damage increases to \\damagerankseven, and the area increases.
          A line breath weapon becomes a \\areagarg, 15 ft.\\ wide line.
          A cone breath weapon becomes a \\arealarge cone.
          \\rank{8} The damage increases to \\damagerankeight.
        \\end{activeability}
      `,
    },
    {
      complexity: 0,
      name: 'Draconic Power',
      isMagical: false,
      rank: 2,
      description: `
        You add half your Strength to your \\glossterm{magical power}.
        In addition, you add half your Willpower to your \\glossterm{mundane power}.
      `,
    },
    {
      complexity: 2,
      name: 'Consume Wealth',
      isMagical: true,
      rank: 3,
      description: `
        \\begin{activeability}{Consume Wealth}{Standard action}
          \\abilitycost One \\glossterm{fatigue level}, and you \\briefly can't use this ability again.
          \\rankline
          You consume a mineral-based wealth item that is at least one size category smaller than you.
          For the next ten minutes, your minimum draconic wealth rank is equal to the rank of the consumed item plus two.
          In addition, you \\briefly regain hit points based on the item's rank at the end of your turn:
          \\begin{itemize}
            \\item Rank 0: \\hpranktwolow. 
            \\item Rank 1: \\hprankthreelow. 
            \\item Rank 2: \\hprankfourlow. 
            \\item Rank 3: \\hprankfivelow. 
            \\item Rank 3: \\hpranksixlow. 
            \\item Rank 4: \\hpranksevenlow. 
            \\item Rank 6: \\hprankeightlow. 
            \\item Rank 7: \\hprankninelow. 
            \\item Rank 8: \\hpranktenlow. 
          \\end{itemize}
      `,
    },
    {
      complexity: 1,
      name: 'Draconic Bulk',
      isMagical: false,
      rank: 3,
      description: `
        Your size category increases to Medium.
        This increases your \\glossterm{base speed} to 30 feet.
        You reduce your Dexterity by 1 and increase your Strength and Constitution by 1.
        In addition, you gain a \\plus1 bonus to your Armor defense.
      `,
    },
    {
      complexity: 1,
      name: 'Draconic Flight',
      isMagical: true,
      rank: 4,
      description: `
        Your wings grow larger, granting you a limited ability to fly.
        You gain an average \\glossterm{fly speed} with a maximum height of 10 feet (see \\pcref{Flight}).
      `,
    },
    {
      complexity: 0,
      name: 'Draconic Mind',
      isMagical: false,
      rank: 5,
      description: `
        You gain a \\plus1 bonus to your Intelligence, Perception, or Willpower.
        If your Constitution is higher than your chosen attribute before applying this bonus, the bonus increases to \\plus2.
      `,
    },
    {
      complexity: 0,
      name: 'Draconic Bulk+',
      isMagical: false,
      rank: 6,
      description: `
        Your size category increases to Large.
        This increases your \\glossterm{base speed} to 40 feet.
        Your Dexterity penalty increases to \\minus2, and your bonus to Strength and Constitution increases to \\plus2.
        You also gain a tail slam \\glossterm{natural weapon}.
        It deals 1d8 damage and has the \\abilitytag{Impact} weapon tag (see \\pcref{Weapon Tags}).
      `,
    },
    {
      complexity: 1,
      name: 'Draconic Flight+',
      isMagical: true,
      rank: 7,
      description: `
        The height limit of your flight increases to 60 feet.
      `,
    },
    {
      complexity: 1,
      name: 'Draconic Hoard',
      isMagical: true,
      rank: 7,
      description: `
        Your \ability{draconic wealth} ability draws power from a hoard you maintain, not merely items you carry with you.
        Your hoard must be owned exclusively by you, and you must know its location at all times.
        Only draconic wealth items contribute to your hoard's effects, though you may have other items in your hoard.
        If a draconic wealth item disappears from your hoard, you know immediately.

        For each rank 7 draconic wealth item in your hoard, you gain a \\plus1 \\glossterm{enhancement bonus} to your Constitution, to a maximum of \\plus5.
        For each rank 8 draconic wealth item in your hoard, you gain an additional \\glossterm{attunement point}, to a maximum of 3.
      `,
    },
  ];
}

export function dragonModifiers(creature: Creature, rank: number) {
  // Draconic Power
  if (rank >= 2) {
    creature.addSimpleModifier({
      name: 'Draconic Power',
      statistic: 'magical_power',
      value: Math.floor(creature.strength / 2),
    });
    creature.addSimpleModifier({
      name: 'Draconic Power',
      statistic: 'mundane_power',
      value: Math.floor(creature.willpower / 2),
    });
  }

  // Draconic Bulk
  if (rank >= 6) {
    creature.setProperties({ size: 'large' });
    creature.addSimpleModifier({
      name: 'Draconic Bulk+',
      statistic: 'strength',
      value: 3,
    });
    creature.addSimpleModifier({
      name: 'Draconic Bulk+',
      statistic: 'dexterity',
      value: -2,
    });
    creature.addSimpleModifier({
      name: 'Draconic Bulk+',
      statistic: 'constitution',
      value: 1,
    });
  } else if (rank >= 3) {
    creature.setProperties({ size: 'medium' });
    creature.addSimpleModifier({
      name: 'Draconic Bulk',
      statistic: 'strength',
      value: 2,
    });
    creature.addSimpleModifier({
      name: 'Draconic Bulk',
      statistic: 'dexterity',
      value: -1,
    });
    creature.addSimpleModifier({
      name: 'Draconic Bulk',
      statistic: 'armor_defense',
      value: 1,
    });
  }

  // Draconic Mind
  if (rank >= 5) {
    // Assume Intelligence is the chosen attribute and Constitution is higher
    creature.addSimpleModifier({
      name: 'Draconic Mind',
      statistic: 'intelligence',
      value: creature.constitution > creature.intelligence ? 2 : 1,
    });
  }
}
