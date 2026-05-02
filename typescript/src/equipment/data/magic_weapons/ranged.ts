import { MagicWeapon, StandardItem } from '../../types';

function ranged(item: Omit<StandardItem, 'magical' | 'rarity' | 'tags' | 'upgrades'> & Partial<Pick<StandardItem, 'upgrades' | 'tags'>>): MagicWeapon {
  return {
    kind: 'Ranged',
    item: {
      magical: true,
      rarity: 'Common',
      tags: item.tags || ['Attune'],
      upgrades: item.upgrades || [],
      ...item,
    }
  };
}

export const magicRangedWeapons = (): MagicWeapon[] => [
  ranged({
    name: "Longshot",
    rank: 2,
    short_description: "Reduces longshot penalty by 1",
    description: "When you make a ranged attack using this weapon, you reduce your \\glossterm{longshot penalty} by 1.",
    upgrades: [
      { rank: 5, short_description: "Reduces longshot penalty by 2", description: "The penalty reduction increases to 2." },
    ],
  }),
  ranged({
    name: "Boomerang",
    rank: 3,
    short_description: "Hits an extra target while returning",
    description: `
      After being thrown, this weapon flies back into your hand immediately after attacking all targets.
      If you can't catch it, the weapon drops to the ground in the square from which it was thrown.

      In addition, whenever you make a thrown \\glossterm{strike} with this weapon, choose one creature within a line between you and one target of the strike.
      The strike also targets that creature in addition to any other targets.
    `,
    upgrades: [
      { rank: 5, short_description: "+1d4 damage, hits an extra target while returning", description: "The weapon also deals 1d4 \\glossterm{extra damage} when thrown." },
      { rank: 7, short_description: "+1d8 damage, hits an extra target while returning", description: "The extra damage increases to 1d8." },
    ],
  }),
  ranged({
    name: "Returning",
    rank: 1,
    short_description: "Flies back to you after being thrown",
    description: `
      After being thrown, this weapon flies back into your hand at the end of your turn as long as it is still \\glossterm{unattended}.
      If you can't catch it, the weapon drops to the ground in the square from which it was thrown.
    `,
  }),
  ranged({
    name: "Jaunting",
    rank: 5,
    short_description: "Teleports when thrown",
    description: `
      When you make a thrown \\glossterm{strike} using this weapon, it teleports directly from your hand to your intended target.
      This gives you a +1 \\glossterm{enhancement bonus} to \\glossterm{accuracy} with the strike and allows you to ignore any intervening \\glossterm{cover} with the attack, as long as you still have \\glossterm{line of effect}.
    `,
    upgrades: [
      { rank: 7, short_description: "Teleports long distances when thrown", description: "You also reduce your \\glossterm{longshot penalty} with thrown attacks using the weapon by 2." },
    ],
  }),
  ranged({
    name: "Phasing",
    rank: 3,
    short_description: "Can pass through small obstacles",
    description: `
      All \\glossterm{strikes} with this weapon, including projectiles fired by this weapon, can pass through a single solid \\glossterm{unattended} obstacle of up to one foot thick on the way to their target.
      This can allow you to ignore \\glossterm{cover}, or even attack without \\glossterm{line of effect}.
      It does not allow you to ignore any equipment used by the target of your attack.
    `,
    upgrades: [
      { rank: 6, short_description: "Can pass through obstacles", description: "Your strikes can penetrate through any number of solid \\glossterm{unattended} objects with a combined thickness of five feet or less." },
    ],
  }),
];
