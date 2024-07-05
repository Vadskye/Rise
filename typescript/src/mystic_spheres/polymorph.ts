import { MysticSphere } from '.';
import { CONDITION_CRIT, MULTIHIT_CRIT } from './constants';

export const polymorph: MysticSphere = {
  name: 'Polymorph',
  shortDescription: 'Change the physical shape or outward form of objects and creatures.',
  sources: ['arcane', 'nature', 'pact'],

  cantrips: [
    {
      name: 'Alter Object',

      effect: `
        Choose one \\glossterm{unattended}, nonmagical object you touch.
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
        2: `The bonus increases to +6.`,
        4: `The bonus increases to +8.`,
        6: `The bonus increases to +10.`,
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
        Choose one nonmagical suit of body armor you touch.
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

        Make a melee \\glossterm{strike} using a \\glossterm{natural weapon}.
        If the target is living and your attack result beats its Fortitude defense, it bleeds.
        During your next action, it takes \\glossterm{extra damage} equal to your power.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
      `,
      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Twisting Claw',
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a melee \\glossterm{strike} using a \\glossterm{natural weapon}.
        The attack is made against the target's Reflex defense instead of its Armor defense.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
      `,
      rank: 2,
      scaling: 'accuracy',
    },

    // TODO: nerf once less relevant to campaign
    {
      name: 'Power Claw',
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a melee \\glossterm{strike} with a -3 accuracy penalty using a \\glossterm{natural weapon}.
        The strike deals double \\glossterm{weapon damage}.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
      `,
      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Power Claw',
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a melee \\glossterm{strike} with a -2 accuracy penalty using a \\glossterm{natural weapon}.
        The strike deals triple \\glossterm{weapon damage}.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
      `,
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Distant Claw',
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a melee \\glossterm{strike} using a \\glossterm{natural weapon}.
        The strike gains the \\weapontag{Long} weapon tag, allowing you to attack targets up to 10 feet away from you (see \\pcref{Weapon Tags}).
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
      `,
      rank: 1,
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
          \\damagerankfive{physical}.
          This damage is doubled if the target is an object.
          If this damage reduces an object to zero hit points, or gives a creature a vital wound that knocks it unconscious, the target is completely disintegrated.
          Only a fine dust remains.
          A disintegrated creature's equipment is unaffected.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange.
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
        \\end{itemize}

        You can suppress or resume this effect as a \\glossterm{free action}.
      `,
      rank: 3,
      type: 'Attune (deep)',
    },

    {
      name: 'Greater Malleable Body',

      functionsLike: {
        name: 'malleable body',
        exceptThat: 'you also become \\glossterm{immune} to critical hits from strikes.',
      },
      rank: 7,
      type: 'Attune (deep)',
    },

    {
      name: 'Spikeform',

      attack: {
        hit: `\\damagerankone{piercing}.`,
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
        hit: `\\damagerankfour{piercing}.`,
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
        hit: `\\damagerankfour{piercing}.`,
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

        This effect lasts until you use it again or \\glossterm{dismiss} it.
        When this effect ends, the object appears in a free hand, if you have one available, or drops to the floor.
      `,
      rank: 3,
      scaling: {
        5: `The maximum size of the object increases to Large.`,
        7: `The maximum size of the object increases to Huge.`,
      },
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
        6: 'The bonus increases to +4.',
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
      name: 'Mass Scent',

      functionsLike: {
        mass: true,
        name: 'scent',
      },
      // narrative: '',
      rank: 5,
      type: 'Attune (target)',
    },

    {
      name: 'Bleed',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankone{slashing}.
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
          \\damagerankthree{}.
          The damage is of the chosen type.
        `,
        missGlance: true,
        targeting: `
          Choose one of the following damage types: acid, cold, electricity, or fire.
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
          \\damagerankfive{slashing}.
          If the target loses \\glossterm{hit points}, it is \\vulnerable to all damage as a \\glossterm{condition}.
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
          \\damagerankthree{piercing}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Armor against one adjacent creature.
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
          \\damagerankfour{piercing}.
          If the target loses hit points, it takes this damage again during your next action.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Armor against one adjacent creature.
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
          \\damageranksix{piercing}.
          If the target loses hit points, it becomes \\slowed as a \\glossterm{condition}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Armor against one adjacent creature.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },
  ],
  rituals: [
    {
      name: 'Overland Runner',
      rank: 4,
      // Worse than Overland Teleportation in rough terrain, but can be comparable on
      // smooth ground depending on party composition and size.
      effect: `
        Choose up to six ritual participants.
        Each target gains a +30 foot \\glossterm{enhancement bonus} to its land speed.
        If it takes any action other than movement or is dealt damage, this effect ends.
      `,
      tags: [],
      castingTime: 'one minute',
      type: 'Attune (target)',
    },
    {
      name: 'Overland Wings',

      castingTime: 'one minute',
      effect: `
        Choose up to six ritual participants.
        Each target gains a 30 foot \\glossterm{fly speed} with a 30 foot \\glossterm{height limit} (see \\pcref{Flight}).
        If it takes any action other than movement or is dealt damage, this effect ends.
      `,
      // narrative: '',
      rank: 5,
      type: 'Attune (target)',
    },
    {
      name: 'Sensory Enhancement',

      castingTime: 'one hour',
      effect: `
        Choose up to six ritual participants.
        For each creature, you choose one of the following effects.
        \\parhead{Awareness} The target gains a +3 \\glossterm{enhancement bonus} to the Awareness skill.
        \\parhead{Darkvision} The target gains \\trait{darkvision} with a range of 60 feet.
        If it already has darkvision, the range of that ability increases by 60 feet instead.
        \\parhead{Low-light Vision} The target gains \\trait{low-light vision}.
        \\parhead{Scent} The target gains the \\glossterm{scent} ability, giving it a +10 bonus to scent-based Awareness checks (see \\pcref{Awareness}).
      `,
      rank: 4,
      type: 'Attune (target)',
    },
    {
      name: 'Mountform',

      castingTime: 'one minute',
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The target must be no more than one size category larger or smaller than Large.
        It \\glossterm{shapeshifts} into a Large horse.
        Horses have a 50 foot land speed and a bite natural weapon.
        They cannot speak and have no \\glossterm{free hands}.
      `,
      rank: 2,
      tags: [],
      type: 'Attune (target)',
    },
    {
      name: 'Snakeform',

      castingTime: 'one minute',
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The target must be no more than one size category larger or smaller than Small.
        It \\glossterm{shapeshifts} into a Small snake.
        Snakes have a 20 foot land speed, a 20 foot climb speed, and a bite natural weapon.
        They cannot speak and have no \\glossterm{free hands}, but they do not need hands to climb.
      `,
      rank: 2,
      tags: [],
      type: 'Attune (target)',
    },
    {
      name: 'Ravenform',

      castingTime: 'one minute',
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The target must be no more than one size category larger or smaller than Small.
        It \\glossterm{shapeshifts} into a Small raven.
        Ravens have a 30 foot \\glossterm{fly speed} with a \\glossterm{height limit} of 60 feet (see \\pcref{Flight}).
        They cannot speak and have no \\glossterm{free hands}.
      `,
      rank: 5,
      tags: [],
      type: 'Attune (target)',
    },
    {
      name: 'Create Handholds',

      castingTime: 'one minute',
      effect: `
        Choose one \\glossterm{unattended}, \\glossterm{mundane} wall up to 50 feet high and 10 feet wide within \\medrange.
        You create handholds in the target, making it easier to climb.
        This reduces the \\glossterm{difficulty value} to climb the object by 10.
        When this effect ends, the handholds disappear.
      `,
      rank: 1,
      type: 'Attune',
    },

    {
      name: 'Craft Object',

      castingTime: 'special',
      effect: `
        Choose any number of unattended, nonmagical objects within \\shortrange.
        You make a Craft check to transform the subjects into a new item (or items) made of the same materials.
        You require none of the tools that would normally be necessary, such as an anvil and furnace.
        The total size of all targets combined must be Medium size or smaller.

        This ritual takes time equal to one tenth of the time that would normally be required to craft the object, to a minimum of one hour.
      `,
      rank: 3,
    },

    {
      name: 'Craft Large Object',

      castingTime: 'special',
      functionsLike: {
        exceptThat: `
          the maximum combined size of all targets increases to Large.
        `,
        name: 'Craft Object',
      },
      rank: 5,
    },

    {
      name: 'Craft Huge Object',

      castingTime: 'special',
      functionsLike: {
        exceptThat: `
          the maximum combined size of all targets increases to Huge.
        `,
        name: 'craft object',
      },
      rank: 7,
    },

    {
      name: 'Morph Weapon',

      castingTime: 'one minute',
      effect: `
        Choose one \\glossterm{unattended} manufactured weapon within \\medrange.
        The target changes into another weapon from the same weapon group.
        At least one ritual participant must be proficient with that weapon group.
        You cannot change it into an exotic weapon in this way.
        When this effect ends, the target returns to its original shape.
      `,
      rank: 1,
      type: 'Attune',
    },

    {
      name: 'Morph Exotic Weapon',

      castingTime: 'one minute',
      functionsLike: {
        exceptThat: `you can also change the target into an exotic weapon.`,
        name: 'morph weapon',
      },
      rank: 3,
      type: 'Attune',
    },

    {
      name: 'Fortify',

      castingTime: 'one hour',
      effect: `
        Choose one \\glossterm{unattended}, nonmagical object or part of an object of up to Large size.
        Unlike most abilities, this ritual can affect individual parts of a whole object.

        % How should this affect Strength break difficulty value?
        The target gains a +10 \\glossterm{enhancement bonus} to its \\glossterm{damage resistance}.
        If the target is moved, this effect ends.
        Otherwise, it lasts for one year.
      `,
      rank: 1,
      type: 'Attune',
    },

    {
      name: 'Enduring Fortify',

      // original targets: One \glossterm{unattended}, nonmagical object or part of an object of up to Large size.
      castingTime: '24 hours',
      functionsLike: {
        exceptThat: `
          the effect lasts for one hundred years.
        `,
        name: 'fortify',
      },
      rank: 3,
    },

    {
      name: 'Enduring Empowered Fortify',

      // original targets: Empowered Fortify
      castingTime: '24 hours',
      functionsLike: {
        exceptThat: `
          the effect lasts for one hundred years.
        `,
        name: 'Empowered fortify',
      },
      rank: 6,
    },

    {
      name: 'Empowered Fortify',

      castingTime: 'one hour',
      functionsLike: {
        exceptThat: `
          the bonus to \\glossterm{damage resistance} increases to +20.
        `,
        name: 'fortify',
      },
      rank: 4,
      type: 'Attune',
    },

    {
      name: 'Purify Sustenance',

      castingTime: 'one hour',
      effect: `
        All food and water in a single square within \\shortrange is purified.
        Spoiled, rotten, poisonous, or otherwise contaminated food and water becomes pure and suitable for eating and drinking.
        This does not prevent subsequent natural decay or spoiling.
      `,
      rank: 1,
    },

    {
      name: 'Awaken',

      castingTime: '24 hours',
      effect: `
        One Large or smaller \\glossterm{ally} within \\medrange becomes fully intelligent.
        Its Intelligence becomes 1d6 - 5.
        Its type changes from animal to magical beast.
        It gains the ability to speak and understand one language that you know of your choice.
        Its maximum age increases to that of a human (rolled secretly).
        This effect is permanent.

        You can only learn this ritual if you have access to this mystic sphere through the nature \\glossterm{magic source}.
      `,
      rank: 6,
    },

    {
      name: 'Lungs',

      castingTime: 'one minute',
      effect: `
        Choose up to six ritual participants.
        Each target can breathe air as easily as a human breathes air, preventing it from suffocating above water if it can normally only breathe water or some other substance.
      `,
      rank: 4,
      type: 'Attune (target)',
    },

    {
      name: 'Meld Shut',

      castingTime: 'one minute',
      effect: `
        Choose one Large or smaller closable, nonmagical object within \\shortrange, such as a door or box.
        The target changes its form so it cannot be opened.
        A box becomes fully sealed instead of hinged, a door expands slightly to merge with its frame, and so on.
        To a casual observer, it may not be obvious that there was ever an opening, though a DV 15 Awareness check would reveal the alteration.
        It can be opened with a DV 25 Devices check.

        When you perform this ritual, you may choose a Fine object within \\shortrange to function as a key.
        When the chosen key touches the sealed object, this ritual is \\glossterm{suppressed} for one minute, allowing the object to be opened normally.
      `,
      rank: 2,
      type: 'Attune',
    },

    {
      name: 'Empowered Meld Shut',

      castingTime: 'one minute',
      functionsLike: {
        exceptThat: `
          the maximum size increases to Huge, and the Devices DV to unlock it increases to 35.
        `,
        name: 'meld shut',
      },
      rank: 5,
      type: 'Attune',
    },

    {
      name: 'Gills',

      castingTime: 'one minute',
      effect: `
        Choose up to six ritual participants.
        Each target gains the ability to breathe water as easily as a human breathes air, preventing it from drowning or suffocating underwater.
      `,
      // narrative: '',
      rank: 4,
      type: 'Attune (target)',
    },
  ],
};
