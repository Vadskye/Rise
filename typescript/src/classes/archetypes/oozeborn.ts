import { Creature } from '@src/character_sheet/creature';
import { RankAbility } from '../types';

export function oozebornAbilities(): RankAbility[] {
  return [
    {
      complexity: 1,
      name: 'Acidic Pseudopod',
      isMagical: false,
      rank: 1,
      description: `
        One of your arms becomes a pseudopod \\glossterm{natural weapon}.
        It deals 1d8 damage and has the \\atAcid and \\weapontag{Long} tags (see \\pcref{Weapon Tags}).
        You do not have a \\glossterm{free hand} on that arm while using it as a weapon in this way.

        In addition, all of your attacks with natural weapons have the \\atAcid tag.
        This does not affect damage you deal with manufactured weapons.
      `,
    },
    {
      complexity: 1,
      name: 'Darkborn Senses',
      isMagical: false,
      rank: 2,
      description: `
        You gain \\sense{blindsense} with a 60 foot range, allowing you to sense your surroundings without light (see \\pcref{Blindsense}).
        If you already have the blindsense ability, you increase its range by 60 feet.
        In addition, you gain \\sense{blindsight} with a 15 foot range, allowing you to see without light (see \\pcref{Blindsight}).
        If you already have the blindsight ability, you increase its range by 15 feet.
      `,
    },
    {
      complexity: 2,
      name: 'Ingest Object',
      isMagical: false,
      rank: 2,
      description: `
        \\begin{activeability}{Ingest Object}{Standard action}
          \\abilitytags \\atAcid
          \\rankline
          This ability functions like the \\spell{absorb object} spell, except that the maximum size of the object is equal to your size.
          Anything you absorb in this way takes a single point of \\glossterm{environmental} damage during each of your actions while it remains absorbed.
          This damage is insufficient to hurt most objects made from wood, stone, or metal, but it can destroy more fragile objects like paper or complex mechanical traps.
        \\end{activeability}
      `,
    },
    {
      complexity: 2,
      name: 'Amorphous Form+',
      isMagical: false,
      rank: 3,
      description: `
        You gain a \\plus2 bonus to your defenses when determining whether an attack gets a \\glossterm{critical hit} against you instead of a normal hit.
        In addition, your \\ability{mold body} ability loses the \\abilitytag{Sustain} (free) tag.
        Instead, it lasts until you choose to \\glossterm{dismiss} it.
        This allows you to maintain your shape while unconscious.
      `,
    },
    {
      complexity: 1,
      name: 'Compressible Body+',
      isMagical: false,
      rank: 3,
      description: `
        You reduce your penalties for \\squeezing by 1.
      `,
    },
    {
      complexity: 1,
      name: 'Acidic Pseudopod+',
      isMagical: false,
      rank: 4,
      description: `
        The damage dealt by your pseudopod increases to 1d10.
      `,
    },
    {
      complexity: 1,
      name: 'Acidic Body+',
      isMagical: false,
      rank: 4,
      description: `
        You are \\buff{immune} to \\atAcid and \\atPoison attacks.
      `,
    },
    {
      complexity: 0,
      name: 'Darkborn Senses+',
      isMagical: false,
      rank: 5,
      description: `
        The range of your \\sense{blindsense} increases by 60 feet.
        In addition, the range of your \\sense{blindsight} increases by 15 feet.
      `,
    },
    {
      complexity: 1,
      name: 'Ingest Object+',
      isMagical: false,
      rank: 5,
      description: `
        The maximum number of objects you can absorb with your \\textit{ingest object} ability increases to 2.
        In addition, you may absorb \\glossterm{allies} with that ability in addition to unattended objects.
      `,
    },
    {
      complexity: 0,
      name: 'Amorphous Form++',
      isMagical: false,
      rank: 6,
      description: `
        The defense bonus against critical hits increases to \\plus4.
      `,
    },
    {
      complexity: 0,
      name: 'Compressible Body++',
      isMagical: false,
      rank: 6,
      description: `
        The reduction of squeezing penalties increases to 2.
        This means you take no penalties for squeezing unless you use the \\ability{tight squeeze} ability (see \\pcref{Flexibility}).
      `,
    },
    {
      complexity: 2,
      name: 'Third Arm',
      isMagical: false,
      rank: 7,
      description: `
        When you use your \\ability{mold body} ability, you can create three arms instead of two.
        You can use all three hands as free hands.
        For example, this can allow you to use a \\weapontag{Heavy} weapon and a shield simultaneously.

        In addition, your arms become stronger and more agile.
        You can use any of your arms as a pseudopod natural weapon, and your pseudopods gain the \\weapontag{Light} weapon tag (see \\pcref{Weapon Tags}).
      `,
    },
  ];
}

export function oozeborn(creature: Creature, rank: number) {
  // Amorphous Form
  if (rank >= 6) {
    // Defense bonus against critical hits is +4
  } else if (rank >= 3) {
    // Defense bonus against critical hits is +2
  }
}
