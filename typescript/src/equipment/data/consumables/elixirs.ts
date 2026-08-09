import { Tool, RawConsumable } from '../../types';

function createElixir(data: RawConsumable): Tool {
  const dataTags = data.tags || [];
  const cleanedTags = dataTags.filter((t) => t !== 'Attune' && t !== 'Attune (deep)');
  return {
    category: 'Potion',
    item: {
      magical: true,
      rarity: 'Common',
      upgrades: [],
      ...data,
      tags: cleanedTags,
    },
  };
}

// Elixirs are -2 ranks below a spell or permanent item with the same effect.
// They combine both an attunement cost with a material cost.
// They don't exist at rank 0, and are rare at rank 1.
export function elixirs(): Tool[] {
  return [
    createElixir({
      name: 'Antitoxin Elixir',
      rank: 1,
      attunement: 'Attune',
      short_description: 'Resistant to poison',
      description: `
        When you drink this \\glossterm{potion}, if you \\glossterm{attune} to its effects, you become \\resistant to \\atPoison effects.
        This effect expires after 10 minutes.
      `,
      upgrades: [
        {
          rank: 4,
          short_description: 'Immune to poison',
          description: `
            You become immune instead of resistant.
          `,
        },
      ],
    }),
    createElixir({
      name: 'Elixir of the Silver Tongue',
      rank: 2,
      attunement: 'Attune',
      short_description: 'Grants +2 to Creature Handling, Deception, and Persuasion',
      description: `
        When you drink this \\glossterm{potion}, if you \\glossterm{attune} to its effects, you gain a +2 \\glossterm{enhancement bonus} to your Creature Handling, Deception, and Persuasion skills.
        This effect expires after 10 minutes.
      `,
      upgrades: [
        {
          rank: 5,
          short_description: 'Grants +4 to Creature Handling, Deception, and Persuasion',
          description: `
            The bonus increases to +4.
          `,
        },
      ],
    }),
    createElixir({
      name: 'Elixir of Grace',
      rank: 2,
      attunement: 'Attune',
      short_description: 'Grants +2 to Flexibility, Poise, and Stealth',
      description: `
        When you drink this \\glossterm{potion}, if you \\glossterm{attune} to its effects, you gain a +2 \\glossterm{enhancement bonus} to your Flexibility, Poise, and Stealth skills.
        This effect expires after 10 minutes.
      `,
      upgrades: [
        {
          rank: 5,
          short_description: 'Grants +4 to Flexibility, Poise, and Stealth',
          description: `
            The bonus increases to +4.
          `,
        },
      ],
    }),
    createElixir({
      name: 'Fireproof Elixir',
      rank: 1,
      attunement: 'Attune',
      short_description: 'Resistant to fire',
      description: `
        When you drink this \\glossterm{potion}, if you \\glossterm{attune} to its effects, you become \\resistant to \\atFire effects.
        This effect expires after 10 minutes.
      `,
      upgrades: [
        {
          rank: 4,
          short_description: 'Immune to fire',
          description: `
            You become immune instead of resistant.
          `,
        },
      ],
    }),
    createElixir({
      name: 'Elixir of Strength',
      rank: 1,
      attunement: 'Attune',
      short_description: 'Grants +1 bonus for weight limits',
      description: `
        When you drink this \\glossterm{potion}, if you \\glossterm{attune} to its effects, you gain a +1 \\glossterm{enhancement bonus} to your Strength that only applies for the purpose of determining your \\glossterm{weight limits} (see \\pcref{Weight Limits}).
        This effect expires after 8 hours.
      `,
      upgrades: [
        {
          rank: 4,
          short_description: 'Grants +2 bonus for weight limits',
          description: `
            The bonus increases to +2.
          `,
        },
      ],
    }),
    createElixir({
      name: 'Fortifying Elixir',
      rank: 6,
      attunement: 'Attune',
      short_description: 'Fortifies you',
      description: `
        When you drink this \\glossterm{potion}, if you \\glossterm{attune} to its effects, you become \\fortified.
        This effect expires after 10 minutes.
      `,
    }),
    // Should be rank 1 at -2 ranks, but that's scary for high level cheap spam.
    createElixir({
      name: 'Eagle-Eye Elixir',
      rank: 2,
      attunement: 'Attune',
      short_description: 'Grants +1 accuracy',
      description: `
        When you drink this \\glossterm{potion}, if you \\glossterm{attune} to its effects, you gain a \\plus1 \\glossterm{enhancement bonus} to \\glossterm{accuracy}.
        This effect expires after 10 minutes.
      `,
      upgrades: [
        {
          rank: 5,
          short_description: 'Grants +2 accuracy',
          description: `
            The bonus increases to +2.
          `,
        },
      ],
    }),
    createElixir({
      name: 'Empowering Elixir',
      rank: 7,
      attunement: 'Attune',
      short_description: 'Empowers you',
      description: `
        When you drink this \\glossterm{potion}, if you \\glossterm{attune} to its effects, you become \\empowered.
        This effect expires after 10 minutes.
      `,
    }),
    createElixir({
      name: 'Evasive Elixir',
      rank: 2,
      attunement: 'Attune',
      short_description: 'Avoid some missed area attacks',
      description: `
        When you drink this \\glossterm{potion}, if you \\glossterm{attune} to its effects, you take no damage when an area ability attacks and misses your Armor or Reflex defense.
        This does not protect you from any non-damaging effects of those abilities, or from abilities that affect multiple specific targets without affecting an area.
        This effect expires after 10 minutes.
      `,
      upgrades: [
        {
          rank: 5,
          short_description: 'Avoid missed area attacks',
          description: `
            This effect also protects you from area attacks against your Brawn, Fortitude, and Mental defenses.
          `,
        },
      ],
    }),
    createElixir({
      name: 'Focusing Elixir',
      rank: 1,
      attunement: 'Attune',
      short_description: 'Makes you focused until you attack',
      description: `
        When you drink this \\glossterm{potion}, if you \\glossterm{attune} to its effects, you become \\focused.
        This effect expires after you attack, or after 10 minutes, whichever comes first.
      `,
      upgrades: [
        {
          rank: 5,
          short_description: 'Makes you focused until after you attack',
          description: `
            When you attack, the effect expires at the end of your next turn instead of immediately.
          `,
        },
      ],
    }),
    createElixir({
      name: 'Shadowsoul Elixir',
      rank: 6,
      attunement: 'Attune',
      short_description: 'Gives attacks a 20\\% failure chance',
      description: `
        When you drink this \\glossterm{potion}, if you \\glossterm{attune} to its effects, you fade into shadows.
        While you are \\glossterm{shadowed}, attacks against you have a 20\\% \\glossterm{failure chance}.
        This effect expires after 10 minutes.
      `,
    }),
    createElixir({
      name: 'Blurring Elixir',
      rank: 3,
      attunement: 'Attune',
      short_description: 'Gives targeted attacks a 20\\% miss chance chance',
      description: `
        When you drink this \\glossterm{potion}, if you \\glossterm{attune} to its effects, your outline blurs.
        \\glossterm{Targeted} attacks against you have a 20\\% \\glossterm{miss chance}.
        This effect expires after 10 minutes.
      `,
    }),
    createElixir({
      name: 'Elixir of Water Breathing',
      rank: 1,
      attunement: 'Attune',
      short_description: 'Can breathe underwater',
      description: `
        When you drink this \\glossterm{potion}, if you \\glossterm{attune} to its effects, you gain the ability to breathe water as easily as a human breathes air.
        This does not grant you the ability to breathe other liquids.
        This effect expires after ten minutes.
      `,
      tags: ['Water'],
    }),
    createElixir({
      name: 'Elixir of Water Walking',
      rank: 2,
      attunement: 'Attune',
      short_description: 'Can walk on water',
      description: `
        When you drink this \\glossterm{potion}, if you \\glossterm{attune} to its effects, you treat the surface of all liquids as if they were firm ground.
        Your feet hover about an inch above the liquid's surface, allowing you to traverse dangerous liquids without harm as long as the surface is calm.
        If you are below the surface of the liquid, you rise towards the surface at a rate of 60 feet per turn.
        Thick liquids, such as mud and lava, may cause you to rise more slowly.

        This effect expires after ten minutes.
      `,
      tags: ['Water'],
    }),
    createElixir({
      name: 'Elixir of the True Form',
      rank: 1,
      attunement: 'Attune',
      short_description: 'Resist polymorph attacks',
      description: `
        When you drink this \\glossterm{potion}, if you \\glossterm{attune} to its effects, you become \\resistant to attacks from the \\sphere{polymorph} sphere.
        This effect expires after ten minutes.
      `,
      upgrades: [
        {
          rank: 4,
          short_description: 'Immune to polymorph attacks',
          description: `
            You become immune instead of resistant.
          `,
        },
      ],
    }),
    createElixir({
      name: 'Elixir of Invisibility',
      rank: 7,
      attunement: 'Attune',
      short_description: 'Become invisible',
      description: `
        When you drink this \\glossterm{potion}, if you \\glossterm{attune} to its effects, you become \\trait{invisible}.
        This effect expires after ten minutes, or immediately if you attack or take damage.
      `,
    }),
  ];
}
