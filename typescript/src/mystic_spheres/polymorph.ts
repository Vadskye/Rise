import { MysticSphere } from '.';
import { CONDITION_CRIT, MULTIHIT_CRIT } from './constants';

// This is a very broad sphere, but it is relatively weak with AOE.
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
      name: 'Natural Weapon',

      effect: `
        You gain either one bite \\glossterm{natural weapon} or two claws.
        For details, see \\tref{Natural Weapons}.
      `,
      roles: ['attune'],
      // no scaling; unclear what scaling could exist
      type: 'Sustain (attuneable, minor)',
    },
  ],
  spells: [
    {
      name: 'Flesh-Rending Claw',
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a \\glossterm{mundane} melee \\glossterm{strike} using \\glossterm{natural weapons}.
        If the target takes damage and is living, it bleeds.
        A bleeding creature takes damage equal to half your power during your next action.
        This bleeding damage is doubled on a critical hit.
      `,
      rank: 3,
      roles: ['burn'],
      scaling: 'accuracy',
    },

    {
      name: 'Twisting Claw',
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a \\glossterm{mundane} melee \\glossterm{strike} using \\glossterm{natural weapons}.
        The attack is made against the target's Reflex defense instead of its Armor defense.
      `,
      rank: 3,
      roles: ['burst'],
      scaling: 'accuracy',
    },

    {
      name: 'Power Claw',
      effect: `
        This spell has no \\glossterm{somatic components}.

        You become \\empowered this round.
        Make a \\glossterm{mundane} melee \\glossterm{strike} with a -2 accuracy penalty using \\glossterm{natural weapons}.
      `,
      rank: 1,
      roles: ['burst'],
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Power Claw',
      effect: `
        This spell has no \\glossterm{somatic components}.

        You become \\maximized this round.
        Make a \\glossterm{mundane} melee \\glossterm{strike} with a -2 accuracy penalty using \\glossterm{natural weapons}.
        The strike deals double damage.
      `,
      rank: 5,
      roles: ['burst'],
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
      roles: ['burst'],
      scaling: 'accuracy',
    },

    {
      name: 'Massive Claw',
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a \\glossterm{mundane} melee \\glossterm{strike} that deals double damage using \\glossterm{natural weapons}.
        The strike targets everything in a 10 ft.\\ long, 10 ft.\\ wide line from you.
        If all spaces in that area are occupied by a single creature, you gain a \\plus3 accuracy bonus against that creature.
      `,
      rank: 6,
      roles: ['clear'],
      scaling: 'accuracy',
    },

    {
      name: 'Baleful Polymorph',

      // Base r7, +1 from limited scope, +2 from two defenses, +2 from removed on damage =
      // r12, or 3.6 EA. That's still not enough, so require a double application before
      // it works.
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\glossterm{briefly} \\confused.
          If it has no remaining \\glossterm{damage resistance} and was already confused by this ability, it also \\glossterm{shapeshifts} into a Tiny squirrel as a \\glossterm{condition}.
          Squirrels have a 30 foot movement speed, an average climb speed, and a bite natural weapon.
          They cannot speak and have no \\glossterm{free hands}.
          If the target takes damage, this condition is removed.
        `,
        targeting: `
          Make an attack vs. Fortitude and Mental against all Huge or smaller \\glossterm{enemies} in a \\smallarea radius in \\shortrange.
        `,
      },
      rank: 7,
      roles: ['maim'],
      scaling: 'accuracy',
    },

    {
      name: 'Shrink',

      effect: `
        Your size decreases by one \\glossterm{size category}, to a minimum of Small.
        Reducing your size gives you a -1 Brawn defense penalty, -1 penalty to Strength for the purpose of determining your \\glossterm{weight limits}, a +1 Reflex defense bonus, and a +5 bonus to Stealth.
        It also reduces your \\glossterm{base speed} (see \\pcref{Size Categories}).
      `,
      rank: 2,
      roles: ['attune'],
      type: 'Attune',
    },

    // Unclear how to do proper EV calc, but Tiny is a scary high stealth bonus
    {
      name: 'Greater Shrink',

      effect: `
        Your size decreases by two \\glossterm{size categories}, to a minimum of Tiny.
        This gives you a -2 Brawn defense penalty, a -2 penalty to Strength for the purpose of determining your \\glossterm{weight limits}, a +2 Reflex defense bonus, and a +10 bonus to Stealth.
        It also reduces your \\glossterm{base speed} (see \\pcref{Size Categories}).
      `,
      rank: 7,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Mass Shrink',

      functionsLike: {
        exceptThat:
          'it affects up to five creatures of your choice from among yourself and your Medium or larger \\glossterm{allies} within \\medrange.',
        name: 'Shrink',
      },
      // narrative: '',
      rank: 4,
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Enlarge',

      effect: `
        Your size increases by one \\glossterm{size category}, to a maximum of Huge.
        Increasing your size gives you a +1 Brawn defense bonus, a +1 bonus to Strength for the purpose of determining your \\glossterm{weight limits}, a -1 Reflex defense penalty, and a -5 penalty to Stealth.
        It also increases your \\glossterm{base speed} (see \\pcref{Size Categories}).

        This spell makes you slightly clumsy in your new size.
        You take a -10 foot penalty to your speed with all of your \\glossterm{movement modes}.
      `,
      rank: 3,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Greater Enlarge',

      effect: `
        Your size increases by two \\glossterm{size categories}.
        This gives you a +2 Brawn defense bonus, a +2 bonus to Strength for the purpose of determining your \\glossterm{weight limits}, a -2 Reflex defense penalty, and a -10 penalty to Stealth.
        It also increases your \\glossterm{base speed} (see \\pcref{Size Categories}).

        This spell makes you slightly clumsy in your new size.
        You take a -10 foot penalty to your speed with all of your \\glossterm{movement modes}.
      `,
      rank: 7,
      roles: ['attune'],
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
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Disintegrate',

      attack: {
        hit: `
          \\damagerankseven, and any \\glossterm{extra damage} is doubled.
          This damage is \\maximized if the target is an object.
          If this damage reduces an object to zero hit points, or gives a creature a vital wound that knocks it unconscious, the target is completely disintegrated.
          Only a fine dust remains.
          A disintegrated creature's equipment is unaffected.
        `,
        targeting: `
          Make an attack vs. Fortitude with a \\minus4 accuracy penalty against something within \\shortrange.
        `,
      },

      rank: 4,
      roles: ['burst'],
      scaling: 'accuracy',
    },

    {
      name: 'Malleable Body',

      // Strike crit immune alone is about right for rank 2.
      // The deep attunement gives the other bonuses.
      effect: `
        Your body and equipment becomes highly flexible and malleable, allowing you to compress your body or contort yourself into odd shapes.
        This has the following effects:
        \\begin{itemize}
          \\item You gain a slow \\glossterm{climb speed} (see \\pcref{Climbing}).
            If you already have a slow climb speed, your climb speed becomes average instead.
          \\item You do not need hands to climb.
          \\item You gain a +8 \\glossterm{enhancement bonus} to the Flexibility skill. In addition, the minimum size you can squeeze down to is reduced to one inch, which can dramatically improve your ability to squeeze through tight spaces.
          \\item You cannot receive \\glossterm{critical hits} from \\glossterm{strikes}.
        \\end{itemize}

        You can suppress or resume this effect as a \\glossterm{free action} once per round.
      `,
      rank: 3,
      roles: ['attune'],
      type: 'Attune (deep)',
    },

    {
      name: 'Spikeform',

      attack: {
        hit: `\\damagerankone.`,
        targeting: `
          Whenever a creature makes a \\glossterm{melee} attack against you using a free hand or non-\\weapontag{Long} weapon, make a \\glossterm{reactive attack} vs. Armor against them.
        `,
      },
      narrative: `
        Your body grows large spikes that impale creatures who attack you.
      `,
      rank: 2,
      roles: ['attune'],
      scaling: 'accuracy',
      type: 'Attune (deep)',
    },

    {
      name: 'Mighty Spikeform',

      attack: {
        hit: `\\damagerankfive.`,
        targeting: `
          Whenever a creature makes a \\glossterm{melee} attack against you using a free hand or non-\\weapontag{Long} weapon, make a \\glossterm{reactive attack} vs. Armor against them.
        `,
      },
      narrative: `
        Your body grows large spikes that impale creatures who attack you.
      `,
      rank: 5,
      roles: ['attune'],
      scaling: 'accuracy',
      type: 'Attune (deep)',
    },

    // r4 minor action attack is normally dr0.
    // All adjacent enemies is r0, so drX+1, so total damage is dr1.
    {
      name: 'Extruding Spikes',

      attack: {
        hit: `\\damagerankone.`,
        missGlance: true,
        targeting: `
          As a \\glossterm{minor action}, you can extend spikes to make an attack vs. Armor against all \\glossterm{enemies} adjacent to you.
        `,
      },
      narrative: `
        Your body grows small spikes that you can consciously extrude to impale nearby foes.
      `,
      rank: 4,
      roles: ['attune'],
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
      roles: ['attune'],
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
      roles: ['attune'],
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
      roles: ['attune'],
      scaling: {
        3: `The bonus increases to +4.`,
        5: `The bonus increases to +5.`,
        7: `The bonus increases to +6.`,
      },
      type: 'Attune',
    },

    {
      name: 'Mending',

      cost: 'One \\glossterm{fatigue level} from the target if it is a creature.',
      // dr3 from short range. No healing buff since this is more versatile and in an odd
      // sphere for healing.
      effect: `
        Chose yourself, one \\glossterm{ally}, or one \\glossterm{unattended} object within \\shortrange.
        The target regains 1d8 \\glossterm{damage resistance} \\plus1 per \\glossterm{power} if it is a creature, or that many hit points if it is an object.
      `,
      rank: 2,
      roles: ['healing'],
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
      roles: ['healing'],
      scaling: { special: 'The recovery increases by 1d8 for each rank beyond 5.' },
      tags: ['Swift'],
    },

    {
      name: 'Brief Regeneration',

      cost: 'One \\glossterm{fatigue level} from the target.',
      // At rank 4, expected power is about 9. Normal healing would be dr5, which is
      // 1d8+3d8 = 18. This is 27 instead, which is a big buff, but healing is generally
      // best as an emergency button and this requires planning.
      effect: `
        Choose yourself or one living \\glossterm{ally} within \\shortrange.
        The target \\glossterm{briefly} regains 1d8 \\glossterm{hit points} +1 per \\glossterm{power} at the end of each round.
      `,
      rank: 3,
      roles: ['healing'],
      scaling: { special: 'The healing increases by +2 for each rank beyond 3.' },
    },

    {
      name: 'Empowered Brief Regeneration',

      cost: 'One \\glossterm{fatigue level} from the target.',
      // At rank 6, expected power is about 12. Normal healing would be dr8, which is
      // 10d8 = 45. This is 6d10 each = 66 instead, which is about 50% more like the rank
      // 3 version.
      effect: `
        Choose yourself or one living \\glossterm{ally} within \\shortrange.
        The target \\glossterm{briefly} regains \\glossterm{hit points} equal to 1d10 per 2 \\glossterm{power} at the end of each round.
      `,
      rank: 6,
      roles: ['healing'],
      scaling: { special: 'The healing increases by 2d8 for each rank beyond 6.' },
    },

    {
      name: 'Vital Regeneration',

      cost: 'See text.',
      effect: `
        At the end of each round, if the target's \\glossterm{fatigue level} does not exceed its \\glossterm{fatigue tolerance}, it automatically removes one of its \\glossterm{vital wounds}.
        It can choose to stop this regeneration if it is conscious, but the regeneration happens automatically if it is unconscious due to vital wounds.
        For each vital wound removed in this way, it increases its \\glossterm{fatigue level} by three.
      `,
      rank: 5,
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Regeneration',

      effect: `
        At the end of each round, you regain hit points equal to your \\glossterm{power}.
      `,
      rank: 3,
      roles: ['healing'],
      scaling: { special: 'The healing increases by +2 for each rank beyond 3.' },
      type: 'Attune (deep)',
    },

    {
      name: 'Empowered Regeneration',

      // -1d6 for double healing on vital wounds
      effect: `
        At the end of each round, you regain \\glossterm{hit points} equal to 1d6 \add your \\glossterm{power}
        If you gained a vital wound this round, this healing is doubled.
      `,
      rank: 5,
      roles: ['healing'],
      scaling: { special: 'The healing increases by 1d6 for each rank beyond 5.' },
      type: 'Attune (deep)'
    },

    {
      name: 'Efficient Regeneration',

      effect: `
        At the end of each round, you regain \\glossterm{hit points} equal to 1d10 \add 1d10 per 2 \\glossterm{power}.
      `,
      rank: 7,
      roles: ['healing'],
      type: 'Attune (deep)',
    },

    {
      name: 'Physical Enhancement',

      effect: `
        When you cast this spell, choose a physical attribute: Strength, Dexterity, or Constitution.
        You gain a +2 \\glossterm{enhancement bonus} to checks using the chosen attribute.
        In addition, if you choose Strength, you gain a +1 \\glossterm{enhancement bonus} to Strength for the purpose of determining your weight limits (see \\pcref{Weight Limits}).
      `,
      rank: 2,
      roles: ['attune'],
      scaling: { 4: `The bonus to checks increases to +3.`, 6: `The bonus to checks increases to +4.` },
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
      roles: ['attune'],
      scaling: {
        6: 'The bonus to checks increases to +3.',
      },
      type: 'Attune (target)',
    },

    {
      name: 'Scent',

      effect: `
        You gain the \\trait{scent} trait, which reduces the \\glossterm{difficulty value} of scent-based Awareness checks by 10 (see \\pcref{Awareness}).
      `,
      rank: 3,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Bleed',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankone.
          If the target loses \\glossterm{hit points}, it takes \\damagerankone during your next action.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\shortrange.
        `,
      },
      rank: 1,
      roles: ['burn'],
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Bleed',

      functionsLike: {
        name: 'bleed',
        exceptThat: 'both damage instances increase to \\damagerankfive.',
      },
      rank: 4,
      roles: ['burn'],
      scaling: 'accuracy',
    },

    {
      name: 'Eyes of Darksight',

      effect: `
        You gain \\trait{darkvision} with a 30 foot radius, allowing you to see in complete darkness (see \\pcref{Darkvision}).
        If you already have darkvision, the range of that ability increases by this amount instead.
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Draconic Senses',

      effect: `
        You gain \\trait{darkvision} with a 60 foot radius, \\trait{low-light vision}, and \\trait{blindsense} with a 30 foot radius.
        If you already have darkvision or blindsense, the range of that ability increases by the given amount instead.
      `,
      rank: 4,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Swimmer',

      effect: `
        You gain a slow \\glossterm{swim speed} (see \\pcref{Swimming}).
        If you already have a slow swim speed, you gain an average swim speed instead.
      `,
      rank: 2,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Climber',

      effect: `
        You gain a slow \\glossterm{climb speed} (see \\pcref{Climbing}).
        If you already have a slow climb speed, you gain an average climb speed instead.
      `,
      rank: 2,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Runner',

      effect: `
        You gain a +10 foot \\glossterm{enhancement bonus} to your \\glossterm{movement speed}.
      `,
      rank: 4,
      roles: ['attune'],
      type: 'Attune',
    },

    // The sustain mechanic is designed to force you to be consistent about your choice of
    // breath weapon within a single fight. It doesn't directly affect the power level of
    // the breath, since it doesn't have to cost attunement.
    {
      name: 'Dragon Breath',

      attack: {
        hit: `
          \\damageranktwo.
          The damage is of the chosen type.
        `,
        missGlance: true,
        targeting: `
          Choose one of the following tags: \\atAcid, \\atCold, \\atElectricity, or \\atFire.
          For the duration of this spell, you can breath that type of energy like a dragon as a standard action.
          When you do, make an attack vs. Reflex against everything within a \\largearea cone from you.
          After you breathe energy, you \\glossterm{briefly} cannot do so again.
        `,
      },
      rank: 3,
      roles: ['clear'],
      scaling: 'accuracy',
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Cleansing Bodymorph',

      effect: `
        You remove a \\glossterm{condition} of your choice.
        This cannot remove conditions caused by \\abilitytag{Compulsion} or \\abilitytag{Emotion} abilities.
      `,
      rank: 4,
      roles: ['cleanse'],
    },

    {
      name: 'Cripple',

      // +1r for precast
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target's body deteriorates as a \\glossterm{condition}.
          While it is below its maximum \\glossterm{hit points}, it is \\slowed.
        `,
        targeting: `
          Make an attack vs. Fortitude against all \\glossterm{enemies} in a \\smallarea radius in \\shortrange.
        `,
      },
      rank: 3,
      roles: ['maim'],
      scaling: 'accuracy',
    },

    {
      name: 'Efficient Cripple',

      // +1r for precast, +1r for extra area scaling, +2r for brief effect
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\glossterm{briefly} \\slowed.
          In addition, its body deteriorates as a \\glossterm{condition}.
          While it is below its maximum \\glossterm{hit points}, it is \\slowed.
        `,
        targeting: `
          Make an attack vs. Fortitude against all \\glossterm{enemies} in a \\medarea radius within \\longrange.
        `,
      },
      rank: 6,
      roles: ['maim'],
      scaling: 'accuracy',
    },

    {
      name: 'Flense',

      // -1r for limited scope, -1r for Reflex extra gives 3 EA, or 2 after damage
      attack: {
        hit: `
          \\damagerankfive, and any \\glossterm{extra damage} is doubled.
          If the target loses \\glossterm{hit points}, it becomes \\vulnerable to all damage as a \\glossterm{condition}.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Fortitude and Reflex against all creatures in a \\smallarea radius within \\medrange.
        `,
      },
      rank: 7,
      roles: ['maim'],
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
      roles: ['burst'],
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
      roles: ['burn'],
      scaling: 'accuracy',
    },

    {
      name: 'Impaling Fleshspike',

      // HP slow with damage requires 2.6 EA, or r7. Melee range allows that at r5.
      attack: {
        hit: `
          \\damageranksix, and any \\glossterm{extra damage} is doubled.
          If the target loses hit points, it becomes \\slowed as a \\glossterm{condition}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Armor against an adjacent creature.
        `,
      },
      rank: 5,
      roles: ['maim'],
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
      roles: ['narrative'],
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
      roles: ['attune'],
      scaling: {
        2: `
          The weapon can be made of any special material other than cold iron and silver (see \\pcref{Weapon Special Materials}).
          The rank of the special material cannot exceed your spellcasting rank with this spell.
        `,
      },
      type: 'Attune',
    },
    {
      name: 'Form of the Snake',

      effect: `
        You \\glossterm{shapeshift} into a Small snake.
        This reduces your \\glossterm{base speed} to 20 feet, among other effects (see \\pcref{Size Categories}).
        As a snake, you have an average climb speed and a bite natural weapon.
        You cannot speak and have no \\glossterm{free hands}, but you do not need hands to climb.
      `,
      rank: 2,
      roles: ['narrative'],
      tags: [],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Form of the Wolf',

      effect: `
        You \\glossterm{shapeshift} into a Medium wolf.
        As a wolf, you are \\trait{multipedal} and have a bite natural weapon.
        You cannot speak and have no \\glossterm{free hands}.
        You also gain the \\trait{scent} ability.
      `,
      rank: 3,
      roles: ['narrative'],
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
      roles: ['narrative'],
      tags: [],
      type: 'Sustain (attuneable, minor)',
    },
  ],
};
