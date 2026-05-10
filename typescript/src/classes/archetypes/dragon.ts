import { Creature } from '@src/character_sheet/creature';
import { RankAbility } from '../types';

export function dragon(): RankAbility[] {
  return [
    {
      complexity: 2,
      name: 'Dragon Breath',
      isMagical: false,
      rank: 1,
      description: `
        \\begin{activeability}{Dragon Breath}{Standard action}
          \\abilitycost You \\briefly can't use this ability again.
          \\rankline
          This ability's tag depends on your dragon type (see \\pcref{Dragon Types}).
          Make an attack vs. Reflex against everything in the area defined by your dragon type.
          \\hit \\damageranktwo.
          \\miss Half damage.

          \\rankline
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
      complexity: 0,
      name: 'Draconic Bulk',
      isMagical: false,
      rank: 3,
      description: `
        Your size category increases to Medium.
        This increases your \\glossterm{base speed} to 30 feet.
        You reduce your Dexterity by 1 and increase your Strength by 2.
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
        Your attribute modifiers to Dexterity and Strength increase to \\minus2 and \\plus3 respectively, and you gain a \\plus1 bonus to your Constitution.
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
        You draw power from your accumulated wealth.
        Your hoard must be owned exclusively by you, and you must know its location at all times.
        Only wealth items that consist of gold, gems, and similar objects of intrinsic mundane value contribute to your hoard's effects, though you may have other items in your hoard.
        For each rank 7 wealth item in your hoard, you gain a \\plus1 \\glossterm{enhancement bonus} to your Constitution, to a maximum of \\plus5.
        Fr each rank 8 wealth item in your hoard, you gain an additional \\glossterm{attunement point}, to a maximum of 3.
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
