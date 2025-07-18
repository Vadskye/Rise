import { MysticSphere } from '.';

export const universal: MysticSphere = {
  name: 'Universal',
  shortDescription: 'Spells and rituals that can be accessed by any spellcaster.',
  sources: ['arcane', 'divine', 'nature', 'pact'],
  specialRules: `
    The universal mystic sphere does not work in the same way as other mystic spheres.
    Every spellcaster has access to this mystic sphere without needing to spend insight points.
    You cannot lose or sacrifice your access to this mystic sphere in any way.
    It contains a variety of simple magical effects that all spellcasters can manage to replicate, though the details can change based on their individual fields of specialization.

    Whenever you learn a spell or ritual from the universal mystic sphere, you must choose a different mystic sphere that you have access to.
    Treat that spell or ritual as if it belonged to your chosen mystic sphere instead of this one.
    This allows you to gain the benefits of any sphere-specific effects when you use the spell or ritual, such as a wizard's \\textit{specialization} ability (see \\pcref{Sphere Specialization}).
    In addition, the chosen mystic sphere determines which targets are valid and may add an ability tag, as listed in \\tref{Universal Mystic Spheres}.
    If the spell is \\spell{mystic bolt}, your chosen mystic sphere also determines the spell's defense.
    You can learn the same spell from this mystic sphere any number of times, choosing different base mystic spheres for that spell each time.

    The names of the abilities from this mystic sphere have fairly generic names to reflect their universal nature.
    As with all other spells, you should feel free to rename them for your own character to make them more interesting and relevant for you.
    For example, a pyromancer might rename their \\spell{mystic bolt} spell to something more fire-themed, like \\textit{firebolt} or \\textit{flamelance}.

    % TODO: should any of these hit Brawl? Check after going through the spheres in more
    % detail.
    \\begin{dtable!*}
      \\lcaption{Universal Mystic Spheres}
      \\begin{dtabularx}{\\textwidth}{l >{\\lcol}X >{\\lcol}X >{\\lcol}X}
        \\tb{Mystic Sphere} & \\tb{Affected} & \\tb{Mystic Bolt Defense} & \\tb{Tag} \\tableheaderrule
        Aeromancy         & Creatures and objects & Brawn     &  \\atAir           \\\\
        Aquamancy         & Creatures and objects & Armor     &  \\atWater         \\\\
        Astromancy        & Creatures and objects & Mental    &  \\tdash           \\\\
        Channel Divinity  & Creatures             & Mental    &  \\tdash           \\\\
        Chronomancy       & Creatures and objects & Fortitude &  \\tdash           \\\\
        Cryomancy         & Creatures and objects & Fortitude &  \\atCold          \\\\
        Electromancy      & Creatures and objects & Fortitude &  \\atElectricity   \\\\
        Enchantment       & Creatures             & Mental    &  \\atEmotion       \\\\
        Fabrication       & Creatures and objects & Armor     &  \\atManifestation \\\\
        Photomancy        & Creatures and objects & Fortitude &  \\atVisual        \\\\
        Polymorph         & Creatures and objects & Fortitude &  \\tdash           \\\\
        Prayer            & Creatures             & Mental    &  \\tdash           \\\\
        Pyromancy         & Creatures and objects & Fortitude &  \\atFire          \\\\
        Revelation        & Creatures             & Mental    &  \\tdash           \\\\
        Summoning         & Creatures and objects & Armor     &  \\atManifestation \\\\
        Telekinesis       & Creatures and objects & Brawn     &  \\tdash           \\\\
        Terramancy        & Creatures and objects & Armor     &  \\atEarth         \\\\
        Thaumaturgy       & Creatures and objects & Fortitude &  \\tdash           \\\\
        Toxicology        & Creatures and objects & Fortitude &  \\atPoison        \\\\
        Umbramancy        & Creatures and objects & Mental    &  \\atVisual        \\\\
        Verdamancy        & Creatures and objects & Armor     &  \\tdash           \\\\
        Vivimancy         & Living creatures      & Fortitude &  \\tdash           \\\\
      \\end{dtabularx}
    \\end{dtable!*}
  `,
  spells: [
    // The rank 1 effects are on-rate, but the higher rank effects have a -1 rank penalty.
    // This gives each sphere a useful starting point early, but ensures that spheres feel
    // strongly differentiated at high levels.
    {
      name: 'Mystic Bolt',

      attack: {
        hit: `\\damagerankone.`,
        targeting: `
          Make an attack against something within \\medrange.
          The valid targets for this spell, and the defense you attack, depend on the mystic sphere you learn this spell with (see \\tref{Universal Mystic Spheres}).
        `,
      },
      rank: 1,
      roles: ['burst'],
      scaling: 'accuracy',
    },
    {
      name: 'Chaotic Bolt',

      attack: {
        hit: `\\damagerankfive, and any \\glossterm{extra damage} is doubled.`,
        targeting: `
          Make an attack with a -4 accuracy penalty against something within \\medrange.
          The valid targets for this spell, and the defense you attack, depend on the mystic sphere you learn this spell with (see \\tref{Universal Mystic Spheres}).
        `,
      },
      rank: 3,
      roles: ['burst'],
      scaling: 'accuracy',
    },
    {
      name: 'Mighty Mystic Bolt',

      attack: {
        hit: `\\damagerankfive, and any \\glossterm{extra damage} is doubled.`,
        targeting: `
          Make an attack against something within \\medrange.
          The valid targets for this spell, and the defense you attack, depend on the mystic sphere you learn this spell with (see \\tref{Universal Mystic Spheres}).
        `,
      },
      rank: 5,
      roles: ['burst'],
      scaling: 'accuracy',
    },
    {
      name: 'Mystic Blast',

      attack: {
        hit: `\\damageranktwo.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex and one other defense against everything in a \\medarea cone from you.
          The valid targets for this spell, and the extra defense you attack, depend on the mystic sphere you learn this spell with (see \\tref{Universal Mystic Spheres}).
        `,
      },
      rank: 1,
      roles: ['clear'],
      scaling: 'accuracy',
    },
    {
      name: 'Massive Mystic Blast',

      attack: {
        hit: `\\damageranktwo.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex and one other defense against everything in a \\largearea cone from you.
          The valid targets for this spell, and the extra defense you attack, depend on the mystic sphere you learn this spell with (see \\tref{Universal Mystic Spheres}).
        `,
      },
      rank: 3,
      roles: ['clear'],
      scaling: 'accuracy',
    },
  ],
};
