import { MysticSphere } from '.';
import { CONDITION_CRIT, EXCEPT_NOT_DEEP, MULTIHIT_CRIT } from './constants';

// This sphere gets maneuvers at -1 rank from combat styles. However, the cost is that they are
// strictly mundane and require natural weapons, forcing a gish-style caster or Spellsword.
export const polymorph: MysticSphere = {
  name: 'Polymorph',
  shortDescription: 'Change the physical shape or outward form of objects and creatures.',
  sources: ['arcane', 'nature', 'soulkeeper'],
  specialRules: `
    This mystic sphere manipulates the physical bodies of creatures, objects, or both.
    Anything that does not have a physical body, such as an \\trait{intangible} creature, is immune to all abilities from this mystic sphere.
  `,

  cantrips: [
    {
      name: 'Alter Object',

      effect: `
        Choose one \\glossterm{unattended}, nonmagical object you \\glossterm{touch}.
        You make a Craft check to alter it (see \\pcref{Craft}), except that you do not need any special tools to make the check (such as an anvil and furnace).
        The maximum \\glossterm{damage resistance} of a material you can affect with this ability is equal to your \\glossterm{power}.

        % TODO: nerf all magical crafting times
        Each time you cast this spell, you can accomplish work that would take up to two rounds with a normal Craft check.
      `,
      scaling: {
        2: `The amount of work you accomplish with the spell increases to five rounds.`,
        4: `The amount of work you accomplish with the spell increases to one minute.`,
        6: `The amount of work you accomplish with the spell increases to two minutes.`,
      },
    },

    {
      name: 'Alter Appearance',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          that you gain a +4 bonus and you cannot change the appearance of your equipment, species, creature type, or number of limbs (see \\pcref{Change Appearance}).
          This is a physical change to your body, so no amount of inspection will reveal your true form.
          A successful Awareness check that beats your Disguise check only reveals that your body's appearance has been magically altered.

          This ability lasts until you use it again.
        `,
        name: 'disguise creature',
      },
      scaling: {
        2: `The bonus increases to +5.`,
        4: `The bonus increases to +6.`,
        6: `The bonus increases to +8.`,
      },
    },

    {
      name: 'Natural Weapon',

      effect: `
        You gain either one bite \\glossterm{natural weapon} or two claws.
        For details, see \\tref{Natural Weapons}.
      `,
      // no scaling; unclear what scaling could exist
      type: 'Attune',
    },
  ],
  spells: [
    {
      name: 'Alter Self',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          that you gain a +4 bonus and you cannot change the appearance of your equipment (see \\pcref{Change Appearance}).
          This is a physical change to your body, so no amount of inspection will reveal your true form.
          A successful Awareness check that beats your Disguise check only reveals that your body's appearance has been magically altered.
        `,
        name: 'disguise creature',
      },
      rank: 2,
      tags: ['Sustain (attuneable, minor)'],
    },

    {
      name: 'Reforge Armor',

      effect: `
        Choose one nonmagical suit of body armor you \\glossterm{touch}.
        The armor becomes composed of a special material of your choice other than cold iron (see \\tref{Armor Special Materials}).
        The special material chosen must not cause the item's total rank to exceed your spellcasting rank with this spell.
        You can only change the target into a special material appropriate for its base composition of either leather or metal.
        For example, you cannot create mithral hide armor with this spell.
      `,
      rank: 4,
      // TODO: weird that this is one of the few ways you can attune on behalf of an ally
      type: 'Attune',
    },

    {
      name: 'Flesh-Rending Claw',
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a \\glossterm{mundane} melee \\glossterm{strike} using \\glossterm{natural weapons}.
        If the target is living and your attack result beats its Fortitude defense, it bleeds.
        During your next action, it takes \\glossterm{extra damage} equal to your power.
      `,
      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Twisting Claw',
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a \\glossterm{mundane} melee \\glossterm{strike} using \\glossterm{natural weapons}.
        The attack is made against the target's Reflex defense instead of its Armor defense.
      `,
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Power Claw',
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a \\glossterm{mundane} melee \\glossterm{strike} with a -3 accuracy penalty using \\glossterm{natural weapons}.
        The strike deals double \\glossterm{weapon damage}.
      `,
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Power Claw',
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a \\glossterm{mundane} melee \\glossterm{strike} with a -2 accuracy penalty using \\glossterm{natural weapons}.
        The strike deals triple \\glossterm{weapon damage}.
      `,
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Extended Claw',
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a \\glossterm{mundane} melee \\glossterm{strike} using \\glossterm{natural weapons}.
        The strike gains the \\weapontag{Long} and \\weapontag{Sweeping} (1) weapon tags (see \\pcref{Weapon Tags}).
      `,
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Massive Claw',
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a \\glossterm{mundane} melee \\glossterm{strike} using \\glossterm{natural weapons}.
        The strike targets everything in a \tinyarea radius adjacent to you, and it deals double \\glossterm{weapon damage}.
      `,
      rank: 6,
      scaling: 'accuracy',
    },

    {
      name: 'Baleful Polymorph',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          If the target has no remaining \\glossterm{damage resistance}, it \\glossterm{shapeshifts} into a Tiny squirrel as a \\glossterm{condition}.
          Squirrels have a 30 foot land speed, a 20 foot climb speed, and a bite natural weapon.
          They cannot speak and have no \\glossterm{free hands}.
        `,
        targeting: `
          Make an attack vs. Fortitude and Mental against one Huge or smaller creature within \\shortrange.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Shrink',

      effect: `
        Your size decreases by one \\glossterm{size category}, to a minimum of Tiny.
        Reducing your size gives you a -1 penalty to Strength for the purpose of determining your \\glossterm{weight limits}, a +1 bonus to your Reflex defense, and a +5 bonus to Stealth.
        It also reduces your \\glossterm{base speed} (see \\pcref{Size Categories}).
      `,
      rank: 2,
      type: 'Attune',
    },

    {
      name: 'Greater Shrink',

      effect: `
        Your size decreases by two \\glossterm{size categories}, to a minimum of Tiny.
        This gives you a -2 penalty to Strength for the purpose of determining your \\glossterm{weight limits}, a +2 bonus to your Reflex defense, and a +10 bonus to Stealth.
        It also reduces your \\glossterm{base speed} (see \\pcref{Size Categories}).
      `,
      rank: 6,
      type: 'Attune',
    },

    {
      name: 'Mass Shrink',

      functionsLike: {
        exceptThat:
          'it affects up to five creatures of your choice from among yourself and your Small or larger \\glossterm{allies} within \\medrange.',
        name: 'Shrink',
      },
      // narrative: '',
      rank: 4,
      type: 'Attune (target)',
    },

    {
      name: 'Stoneskin',

      effect: `
        You gain a +4 \\glossterm{enhancement bonus} to your \\glossterm{damage resistance}.
      `,

      rank: 1,
      scaling: {
        3: `The bonus increases to +8.`,
        5: `The bonus increases to +16.`,
        7: `The bonus increases to +32.`,
      },
      type: 'Attune',
    },

    {
      name: 'Mass Stoneskin',

      functionsLike: {
        mass: true,
        name: 'Stoneskin',
      },
      // narrative: '',
      rank: 3,
      scaling: {
        5: `The bonus increases to +8.`,
        7: `The bonus increases to +16.`,
      },
      type: 'Attune (target)',
    },

    {
      name: 'Enlarge',

      effect: `
        Your size increases by one \\glossterm{size category}, to a maximum of Huge.
        Increasing your size gives you a +1 bonus to Strength for the purpose of determining your \\glossterm{weight limits}, a -1 penalty to your Reflex defense, and a -5 penalty to Stealth.
        It also increases your \\glossterm{base speed} (see \\pcref{Size Categories}).

        This spell makes you slightly clumsy in your new size.
        You take a -10 foot penalty to your speed with all of your \\glossterm{movement modes}.
      `,
      rank: 3,
      type: 'Attune',
    },

    {
      name: 'Greater Enlarge',

      effect: `
        Your size increases by two \\glossterm{size categories}.
        This gives you a +2 bonus to Strength for the purpose of determining your \\glossterm{weight limits}, a -2 penalty to your Reflex defense, and a -10 penalty to Stealth.
        It also increases your \\glossterm{base speed} (see \\pcref{Size Categories}).

        This spell makes you slightly clumsy in your new size.
        You take a -10 foot penalty to your speed with all of your \\glossterm{movement modes}.
      `,
      rank: 7,
      type: 'Attune',
    },

    {
      name: 'Mass Enlarge',

      functionsLike: {
        exceptThat:
          'it affects up to five creatures of your choice from among yourself and your Large or smaller \\glossterm{allies} within \\medrange.',
        name: 'Enlarge',
      },
      // narrative: '',
      rank: 5,
      type: 'Attune (target)',
    },

    {
      name: 'Disintegrate',

      attack: {
        hit: `
          \\damagerankfive.
          This damage is doubled if the target is an object.
          If this damage reduces an object to zero hit points, or gives a creature a vital wound that knocks it unconscious, the target is completely disintegrated.
          Only a fine dust remains.
          A disintegrated creature's equipment is unaffected.
        `,
        targeting: `
          Make an attack vs. Fortitude against something within \\shortrange.
        `,
      },

      rank: 4,
      scaling: 'accuracy',
    },

    {
      name: 'Malleable Body',

      effect: `
        Your body and equipment becomes highly flexible and malleable, allowing you to compress your body or contort yourself into odd shapes.
        This has the following effects:
        \\begin{itemize}
          \\item You gain a \\glossterm{climb speed} 10 feet slower than the \\glossterm{base speed} for your size.
          \\item You gain a +8 \\glossterm{enhancement bonus} to the Flexibility skill. In addition, the minimum size you can squeeze down to is reduced to one inch, which can dramatically improve your ability to squeeze through tight spaces.
          \\item You gain a +4 bonus to your defenses when determining whether a \\glossterm{strike} gets a \\glossterm{critical hit} against you instead of a normal hit.
          \\item You take a -1 penalty to your Armor defense.
        \\end{itemize}

        You can suppress or resume this effect as a \\glossterm{free action}.
      `,
      rank: 3,
      type: 'Attune (deep)',
    },

    {
      name: 'Efficient Malleable Body',

      functionsLike: {
        name: 'malleable body',
        exceptThat: EXCEPT_NOT_DEEP,
      },
      rank: 6,
      type: 'Attune',
    },

    {
      name: 'Spikeform',

      attack: {
        hit: `\\damagerankone.`,
        targeting: `
          Whenever a creature makes a \\glossterm{melee} attack against you using a free hand or non-Long weapon, make a \\glossterm{reactive attack} vs. Armor against them.
        `,
      },
      narrative: `
        Your body grows large spikes that impale creatures who attack you.
      `,
      rank: 2,
      scaling: 'accuracy',
      type: 'Attune (deep)',
    },

    {
      name: 'Mighty Spikeform',

      attack: {
        hit: `\\damagerankfour.`,
        targeting: `
          Whenever a creature makes a \\glossterm{melee} attack against you using a free hand or non-Long weapon, make a \\glossterm{reactive attack} vs. Armor against them.
        `,
      },
      narrative: `
        Your body grows large spikes that impale creatures who attack you.
      `,
      rank: 5,
      type: 'Attune (deep)',
    },

    {
      name: 'Extruding Spikes',

      attack: {
        hit: `\\damagerankfour.`,
        missGlance: true,
        targeting: `
          As a \\glossterm{minor action}, you can extend spikes to make an attack vs. Armor with a -2 accuracy penalty against all \\glossterm{enemies} adjacent to you.
        `,
      },
      narrative: `
        Your body grows small spikes that you can consciously extrude to impale nearby foes.
      `,
      rank: 6,
      scaling: 'accuracy',
      type: 'Attune (deep)',
    },

    {
      name: 'Absorb Object',

      // This intentionally uses a fixed size category instead of referencing your original size
      // category to allow interaction with items like a Staff of Giants.
      effect: `
        You absorb Medium or smaller \\glossterm{unattended} object into your body.
        Your weight is increased by the weight of the object, but the object's presence cannot be otherwise physically detected.
        You must bear the weight of the object as if you were carrying it, not as if it was part of your body.
        A reactive object, such as alchemist's fire or poison, continues reacting inside your body, which may be harmful to you.
        You cannot absorb only part of a larger object.

        When this effect ends, the object appears in a free hand, if you have one available, or drops to the floor.
      `,
      rank: 3,
      scaling: {
        5: `The maximum size of the object increases to Large.`,
        7: `The maximum size of the object increases to Huge.`,
      },
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Camouflage',

      effect: `
        If you have Stealth as a \\glossterm{trained skill}, you gain a +3 \\glossterm{enhancement bonus} to it.
        Otherwise, you are treated as being trained in that skill.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +4.`,
        5: `The bonus increases to +5.`,
        7: `The bonus increases to +6.`,
      },
      type: 'Attune',
    },

    {
      name: 'Minor Bodymorph',

      effect: `
        If you have Flexibility as a \\glossterm{trained skill}, you gain a +3 \\glossterm{enhancement bonus} to it.
        Otherwise, you are treated as being trained in that skill.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +4.`,
        5: `The bonus increases to +5.`,
        7: `The bonus increases to +6.`,
      },
      type: 'Attune',
    },

    {
      name: 'Sludgeform',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          If the target has no remaining \\glossterm{damage resistance}, its physical form loses coherence and partially collapses into a sludgelike mass as a \\glossterm{condition}.
          This has the following effects:
          \\begin{itemize}
            \\item Its exposed flesh makes it \\vulnerable to all damage.
            \\item It has no \\glossterm{free hands}, causing it to drop anything it is holding and making it unable to take any actions that require free hands.
            \\item It is unable to speak normally or use \\glossterm{verbal components} or \\glossterm{somatic components}.
          \\end{itemize}

          % There must be text between an itemize block and the end of a mdframed env
          \\hypertarget{itemizespace}{}
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 7,
    },

    {
      name: 'Mending',

      cost: "One \\glossterm{fatigue level} from the target if it is a creature.",
      // dr3 from short range. No healing buff since this is more versatile and in an odd
      // sphere for healing.
      effect: `
        Chose yourself, one \\glossterm{ally}, or one \\glossterm{unattended} object within \\shortrange.
        The target regains 1d8 \\glossterm{damage resistance} \\plus1 per \\glossterm{power} if it is a creature, or that many hit points if it is an object.
      `,
      rank: 2,
      scaling: { special: 'The recovery increases by +2 for each rank beyond 2.' },
      tags: ['Swift'],
    },

    {
      name: 'Empowered Mending',

      functionsLike: {
        name: 'mending',
        exceptThat: 'the recovery increases to 2d8 plus 1d8 per 3 power.',
      },
      rank: 5,
      scaling: { special: 'The recovery increases by 1d8 for each rank beyond 5.' },
      tags: ['Swift'],
    },

    {
      name: 'Brief Regeneration',

      cost: "One \\glossterm{fatigue level} from the target.",
      // At rank 4, expected power is about 9. Normal healing would be dr5, which is
      // 1d8+3d8 = 18. This is 27 instead, which is a big buff, but healing is generally
      // best as an emergency button and this requires planning.
      effect: `
        Choose yourself or one living \\glossterm{ally} within \\shortrange.
        The target \\glossterm{briefly} regains 1d8 \\glossterm{hit points} +1 per \\glossterm{power} at the end of each round.
      `,
      rank: 3,
      scaling: { special: 'The healing increases by +2 for each rank beyond 3.' },
    },

    {
      name: 'Empowered Brief Regeneration',

      cost: "One \\glossterm{fatigue level} from the target.",
      // At rank 6, expected power is about 12. Normal healing would be dr8, which is
      // 10d8 = 45. This is 6d10 each = 66 instead, which is about 50% more like the rank
      // 3 version.
      effect: `
        Choose yourself or one living \\glossterm{ally} within \\shortrange.
        The target \\glossterm{briefly} regains \\glossterm{hit points} equal to 1d10 per 2 \\glossterm{power} at the end of each round.
      `,
      rank: 6,
      scaling: { special: 'The healing increases by 2d8 for each rank beyond 6.' },
    },

    {
      name: 'Vital Regeneration',

      cost: "See text.",
      effect: `
        At the end of each round, if the target's \\glossterm{fatigue level} does not exceed its \\glossterm{fatigue tolerance}, it automatically removes one of its \\glossterm{vital wounds}.
        It can choose to stop this regeneration if it is conscious, but the regeneration happens automatically if it is unconscious due to vital wounds.
        For each vital wound removed in this way, it increases its \\glossterm{fatigue level} by three.
      `,
      rank: 5,
      type: 'Attune (target)',
    },

    {
      name: 'Regeneration',

      effect: `
        At the end of each round, you regain 1d6 \\glossterm{hit points}.
        This healing cannot increase your hit points above half your maximum hit points.
      `,
      rank: 2,
      scaling: { special: 'The healing increases by +1 for each rank beyond 2.' },
      type: 'Sustain (attuneable, standard)',
    },

    {
      name: 'Empowered Regeneration',

      effect: `
        At the end of each round, you regain 2d8 \\glossterm{hit points}.
        If you gained a vital wound this round, this healing is doubled.
        This healing cannot increase your hit points above half your maximum hit points.
      `,
      rank: 5,
      scaling: { special: 'The healing increases by 1d8 for each rank beyond 5.' },
      type: 'Sustain (attuneable, standard)',
    },

    {
      name: 'Efficient Regeneration',

      effect: `
        At the end of each round, you regain 2d10 \\glossterm{hit points}.
        If you lost \\glossterm{hit points} this round, this healing is doubled.
        This healing cannot increase your hit points above half your maximum hit points.
      `,
      rank: 7,
      type: 'Sustain (attuneable, standard)',
    },

    {
      name: 'Physical Enhancement',

      effect: `
        When you cast this spell, choose a physical attribute: Strength, Dexterity, or Constitution.
        You gain a +2 \\glossterm{enhancement bonus} to checks using the chosen attribute.
        In addition, if you choose Strength, you gain a +1 \\glossterm{enhancement bonus} to Strength for the purpose of determining your weight limits (see \\pcref{Weight Limits}).
      `,
      rank: 2,
      scaling: { 4: `The bonus increases to +3.`, 6: `The bonus increases to +4.` },
      type: 'Attune',
    },

    {
      name: 'Mass Physical Enhancement',

      functionsLike: {
        mass: true,
        name: 'Physical Enhancement',
      },
      // narrative: '',
      rank: 4,
      scaling: {
        6: 'The bonus increases to +3.',
      },
      type: 'Attune (target)',
    },

    {
      name: 'Scent',

      effect: `
        You gain the \\trait{scent} trait, which reduces the \\glossterm{difficulty value} of scent-based Awareness checks by 10 (see \\pcref{Awareness}).
      `,
      rank: 3,
      type: 'Attune',
    },

    {
      name: 'Bleed',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankone.
          If the target loses \\glossterm{hit points}, it takes this damage again during your next action.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\shortrange.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Bleed',

      functionsLike: {
        name: 'bleed',
        exceptThat: 'the damage increases to \\damagerankfive.',
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Eyes of Darksight',

      effect: `
        You gain \\trait{darkvision} with a 30 foot radius, allowing you to see in complete darkness (see \\pcref{Darkvision}).
        If you already have darkvision, the range of that ability increases by this amount instead.
      `,
      rank: 1,
      scaling: {
        3: `The radius increases to 60 feet.`,
        5: `The radius increases to 90 feet.`,
        7: `The radius increases to 120 feet.`,
      },
      type: 'Attune',
    },

    {
      name: 'Draconic Senses',

      effect: `
        You gain \\trait{darkvision} with a 60 foot radius, \\trait{low-light vision}, and \\trait{blindsense} with a 30 foot radius.
        If you already have darkvision or blindsense, the range of that ability increases by the given amount instead.
      `,
      rank: 4,
      scaling: {
        6: `The radius of both senses increases by 30 feet.`,
      },
      type: 'Attune',
    },
    {
      name: 'Mass Draconic Senses',

      functionsLike: {
        mass: true,
        name: 'draconic senses',
      },
      // narrative: '',
      rank: 6,
      type: 'Attune (target)',
    },

    {
      name: 'Swimmer',

      effect: `
        You gain a \\glossterm{swim speed} 10 feet slower than the \\glossterm{base speed} for your size.
        If you already have a swim speed, you gain a +10 foot \\glossterm{enhancement bonus} to your swim speed.
      `,
      rank: 3,
      type: 'Attune',
    },

    {
      name: 'Climber',

      effect: `
        You gain a \\glossterm{climb speed} 10 feet slower than the \\glossterm{base speed} for your size.
        If you already have a climb speed, you gain a +10 foot \\glossterm{enhancement bonus} to your climb speed.
      `,
      rank: 3,
      type: 'Attune',
    },

    {
      name: 'Runner',

      effect: `
        You gain a +10 foot \\glossterm{enhancement bonus} to your \\glossterm{land speed}.
      `,
      rank: 4,
      type: 'Attune',
    },

    {
      name: 'Dragon Breath',

      attack: {
        hit: `
          \\damagerankthree.
          The damage is of the chosen type.
        `,
        missGlance: true,
        targeting: `
          Choose one of the following tags: \\atAcid, \\atCold, \\atElectricity, or \\atFire.
          For the duration of this spell, you can breath that type of energy like a dragon as a standard action.
          When you do, make an attack vs. Reflex against everything within a \\largearea cone from you.
          After you use this ability, you \\glossterm{briefly} cannot use it again.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      type: 'Attune',
    },

    {
      name: 'Cleansing Bodymorph',

      effect: `
        You remove a \\glossterm{condition} of your choice.
        This cannot remove conditions caused by \\abilitytag{Compulsion} or \\abilitytag{Emotion} abilities.
      `,
      rank: 4,
    },

    {
      name: 'Cripple',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target's body deteriorates as a \\glossterm{condition}.
          While it is below its maximum \\glossterm{hit points}, it is \\slowed.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Intense Cripple',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target's body deteriorates as a \\glossterm{condition}.
          While it is below its maximum \\glossterm{hit points}, it is \\immobilized.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Flense',

      attack: {
        hit: `
          \\damagerankfive.
          If the target loses \\glossterm{hit points}, it becomes \\vulnerable to all damage as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 7,
      scaling: 'accuracy',
    },

    {
      name: 'Fleshspike',

      attack: {
        hit: `
          \\damagerankthree.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Armor against an adjacent creature.
        `,
      },
      narrative: `
        Your arm transforms into a hideous spike that you use to impale your enemy.
      `,
      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Bloody Fleshspike',

      attack: {
        hit: `
          \\damagerankfour.
          If the target loses hit points, it takes this damage again during your next action.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Armor against an adjacent creature.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Impaling Fleshspike',

      // like dX at Grasp range, but +1dr and -2ct.
      attack: {
        hit: `
          \\damageranksix.
          If the target loses hit points, it becomes \\slowed as a \\glossterm{condition}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Armor against an adjacent creature.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },
    {
      name: 'Duplicate Organ',

      effect: `
        When you cast this spell, you choose your eyes, nose, mouth, or ears.
        You gain a duplicate copy of that organ anywhere on your body.
        You can only use one of them at a time, but you can change which one is active once per round as a \\glossterm{free action}.

        You can sustain or attune to this spell multiple times.
        Each time, you must choose a different organ to copy.
      `,
      rank: 2,
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Armblade',

      effect: `
        When you cast this spell, you choose a weapon you are proficient with.
        One of your \\glossterm{free hands} shapeshifts into that weapon.

        The weapon functions like an ordinary manufactured weapon, with two exceptions.
        First, it cannot leave your body, so you cannot throw it or drop it.
        Second, you can treat it as a \\glossterm{natural weapon}, a \\glossterm{manufactured weapon}, or both, depending on what is more beneficial for you.
      `,
      rank: 1,
      scaling: {
        2: `
          The weapon can be made of any special material other than cold iron and silver (see \\pcref{Weapon Special Materials}).
          Its rank cannot exceed your spellcasting rank with this spell.
        `
      },
      type: 'Attune',
    },
    {
      name: 'Sudden Liquification',

      effect: `
        When you would suffer a \\glossterm{critical hit} from a \\glossterm{strike}, this spell automatically activates.
        When it does, your body liquifies in an instant, limiting the damage to vital areas.
        This causes the critical hit to become only a regular hit.
        However, this rapid liquification also interferes with your own bodily functions.
        You are \\glossterm{briefly} \\dazzled and \\stunned, and this ability ends.
      `,
      rank: 1,
      type: 'Attune',
    },
    {
      name: 'Form of the Snake',

      effect: `
        You \\glossterm{shapeshift} into a Small snake.
        As a snake, you have a 20 foot land speed, a 20 foot climb speed, and a bite natural weapon.
        You cannot speak and have no \\glossterm{free hands}, but you do not need hands to climb.
      `,
      rank: 2,
      tags: [],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Form of the Wolf',

      effect: `
        You \\glossterm{shapeshift} into a Medium wolf.
        As a wolf, you have a 40 foot land speed, are \\trait{multipedal}, and have a bite natural weapon.
        You cannot speak and have no \\glossterm{free hands}.
        You also gain the \\trait{scent} ability.
      `,
      rank: 3,
      tags: [],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Form of the Raven',

      effect: `
        You \\glossterm{shapeshift} into a Small raven.
        As a raven, you have a 30 foot \\glossterm{fly speed} with a \\glossterm{height limit} of 60 feet (see \\pcref{Flight}).
        You cannot speak and have no \\glossterm{free hands}.
        You are also unable to take any standard action other than \\glossterm{movement}.
      `,
      rank: 5,
      tags: [],
      type: 'Sustain (attuneable, minor)',
    },
  ],
};
