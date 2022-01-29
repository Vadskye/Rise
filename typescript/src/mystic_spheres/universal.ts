import { MysticSphere } from '.';

export const universal: MysticSphere = {
  name: 'Universal',
  shortDescription: 'Spells and rituals that can be accessed by any spellcaster.',
  sources: ['arcane', 'divine', 'nature', 'pact'],
  specialRules: `
    The universal mystic sphere does not work in the same way as other mystic spheres.
    Every spellcaster has access to this mystic sphere without needing to spend insight points.
    It contains a variety of simple magical effects that all spellcasters can manage to replicate, though the details can change based on their individual fields of specialization.

    Whenever you learn a spell or ritual from the universal mystic sphere, you must choose a different mystic sphere that you have access to from among the mystic spheres listed in \\tref{Mystic Sphere Damage Types}.
    The type of damage dealt by that spell or ritual matches the damage type listed in the Mystic Sphere Damage Types table.
    In addition, treat that spell or ritual as if it belonged to your chosen mystic sphere instead of this one.
    This allows you to gain the benefits of any sphere-specific effects when you use the spell or ritual, such as a wizard's \\textit{specialization} ability (see \\pcref{Sphere Specialization}).

    The names of the abilities from this mystic sphere have fairly generic names to reflect their universal nature.
    As with all other spells, you should feel free to rename them for your own character to make them more interesting and relevant for you.
    For example, a pyromancer might rename their \\spell{mystic bolt} spell to something more fire-themed, like \\textit{firebolt} or \\textit{flamelance}.

   \\begin{dtable}
        \\lcaption{Mystic Sphere Damage Types}
        \\begin{dtabularx}{\\columnwidth}{l >{\\lcol}X}
            \\tb{Mystic Sphere} & \\tb{Damage Type} \\tableheaderrule
            Aeromancy & Bludgeoning \\\\
            Aquamancy & Bludgeoning \\\\
            Astromancy & Energy \\\\
            Barrier & Physical \\\\
            Bless & Energy \\\\
            Channel Divinity & Energy \\\\
            Chronomancy & Energy \\\\
            Cryomancy & Cold \\\\
            Electromancy & Electricity \\\\
            Enchantment & Energy and \\glossterm{subdual} \\\\
            Fabrication & Physical \\\\
            Photomancy & Energy \\\\
            Polymorph & Physical \\\\
            Pyromancy & Fire \\\\
            Revelation & Energy and \\glossterm{subdual} \\\\
            Summoning & Physical \\\\
            Telekinesis & Physical \\\\
            Terramancy & Bludgeoning \\\\
            Thaumaturgy & Energy \\\\
            Toxicology & Acid \\\\
            Umbramancy & Cold \\\\
            Verdamancy & Physical \\\\
            Vivimancy & Energy \\\\
        \\end{dtabularx}
    \\end{dtable}
  `,
  spells: [
    {
      name: "Mystic Bolt",

      attack: {
        hit: `The target takes 1d8 + \\glossterm{power} damage.`,
        targeting: `
          Make an attack vs. Armor against anything within \\medrange.
        `,
      },
      rank: 1,
      scaling: "damage",
      type: "Instant",
    },
    {
      name: "Greater Mystic Bolt",

      attack: {
        hit: `The target takes 2d8 + \\glossterm{power} damage.`,
        targeting: `
          Make an attack vs. Armor against anything within \\medrange.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Instant",
    },
    {
      name: "Supreme Mystic Bolt",

      attack: {
        hit: `The target takes 4d10 + \\glossterm{power} damage.`,
        targeting: `
          Make an attack vs. Armor against anything within \\longrange.
        `,
      },
      rank: 6,
      scaling: "damage",
      type: "Instant",
    },
    {
      name: "Mystic Blast",

      attack: {
        hit: `Each target takes 1d8 + half \\glossterm{power} damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\medarea cone from you.
        `,
      },
      rank: 2,
      scaling: "damage",
      type: "Instant",
    },
    {
      name: "Greater Mystic Blast",

      attack: {
        hit: `Each target takes 2d6 + half \\glossterm{power} damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\largearea cone from you.
        `,
      },
      rank: 4,
      scaling: "damage",
      type: "Instant",
    },
    {
      name: "Supreme Mystic Blast",

      attack: {
        hit: `Each target takes 2d10 + half \\glossterm{power} damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\hugearea cone from you.
        `,
      },
      rank: 6,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Mystic Discharge",

      attack: {
        hit: `Each target takes 1d6 + half \\glossterm{power} damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\smallarea radius from you.
        `,
      },
      rank: 1,
      scaling: "damage",
      type: "Instant",
    },
    {
      name: "Greater Mystic Discharge",

      attack: {
        hit: `Each target takes 2d6 + half \\glossterm{power} damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\smallarea radius from you.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Instant",
    },
    {
      name: "Supreme Mystic Discharge",

      attack: {
        hit: `Each target takes 2d10 + \\glossterm{power} damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\smallarea radius from you.
        `,
      },
      rank: 5,
      scaling: "damage",
      type: "Instant",
    },
  ],
};
