import { MysticSphere } from '.';
import { CONDITION_CRIT, MULTIHIT_CRIT } from '../constants';

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
          If it is \\glossterm{injured} and was already confused by this ability, it also \\glossterm{shapeshifts} into a Tiny squirrel as a \\glossterm{condition}.
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
        Reducing your size gives you a -1 Brawn defense penalty, -1 penalty to Strength for the purpose of determining your \\glossterm{weight limits}, a +1 Reflex defense bonus, and a +4 bonus to your Stealth skill.
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
        Increasing your size gives you a +1 Brawn defense bonus, a +1 bonus to Strength for the purpose of determining your \\glossterm{weight limits}, a -1 Reflex defense penalty, and a -4 penalty to your Stealth skill.
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
      scaling: 'damage',
    },

    {
      name: 'Malleable Body',

      // TODO: Unclear rank
      effect: `
        Your body and equipment becomes highly flexible and malleable, allowing you to compress your body or contort yourself into odd shapes.
        This has the following effects:
        \\begin{raggeditemize}
          \\item You gain a +8 \\glossterm{enhancement bonus} to the Flexibility skill.
          \\item You gain a slow \\glossterm{climb speed} (see \\pcref{Climbing}).
            If you already have a slow climb speed, your climb speed becomes average instead.
          \\item You do not need hands to climb.
        \\end{raggeditemize}
      `,
      rank: 4,
      roles: ['mobility'],
      type: 'Attune',
    },

    {
      name: 'Absorb Object',

      // This intentionally uses a fixed size category instead of referencing your original size
      // category to allow interaction with items like a Staff of Giants.
      effect: `
        You absorb a Medium or smaller \\glossterm{unattended} object into your body.
        Your weight is increased by the weight of the object, but the object's presence cannot be otherwise physically detected.
        You must bear the weight of the object as if you were carrying it, not as if it was part of your body.
        A reactive object, such as alchemist's fire or poison, continues reacting inside your body, which may be harmful to you.
        You cannot absorb only part of a larger object.

        When this effect ends, the object appears in a free hand, if you have one available, or drops to the floor.
      `,
      rank: 3,
      roles: ['narrative'],
      scaling: {
        5: `The maximum size of the object increases to Large.`,
        7: `The maximum size of the object increases to Huge.`,
      },
      type: 'Sustain (attuneable, minor)',
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
        Chose yourself, or one \\glossterm{ally} or \\glossterm{unattended} object within \\shortrange.
        The target regains 1d8 \\glossterm{hit points} \\plus1 per \\glossterm{power}.
      `,
      rank: 2,
      roles: ['healing', 'exertion'],
      scaling: { special: 'The recovery increases by +2 for each rank beyond 2.' },
      tags: ['Swift'],
    },

    {
      name: 'Greater Mending',

      functionsLike: {
        name: 'mending',
        exceptThat: 'the recovery increases to 2d8 plus 1d8 per 3 power.',
      },
      rank: 5,
      roles: ['healing', 'exertion'],
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
      roles: ['healing', 'exertion'],
      scaling: { special: 'The healing increases by +2 for each rank beyond 3.' },
    },

    {
      name: 'Greater Brief Regeneration',

      cost: 'One \\glossterm{fatigue level} from the target.',
      // At rank 6, expected power is about 12. Normal healing would be dr8, which is
      // 10d8 = 45. This is 6d10 each = 66 instead, which is about 50% more like the rank
      // 3 version.
      effect: `
        Choose yourself or one living \\glossterm{ally} within \\shortrange.
        The target \\glossterm{briefly} regains \\glossterm{hit points} equal to 1d10 per 2 \\glossterm{power} at the end of each round.
      `,
      rank: 6,
      roles: ['healing', 'exertion'],
      scaling: { special: 'The healing increases by 2d8 for each rank beyond 6.' },
    },

    {
      name: 'Bleed',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankone.
        `,
        injury: `
          The target takes \\damagerankone during your next action.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\shortrange.
        `,
      },
      rank: 1,
      roles: ['burn', 'execute'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Bleed',

      functionsLike: {
        name: 'bleed',
        exceptThat:
          'both damage instances increase to \\damagerankfive, and \\glossterm{extra damage} on the initial hit is doubled.',
      },
      rank: 4,
      roles: ['burn', 'execute'],
      scaling: 'damage',
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

      // Ranged precast slow is 2.5 EA, or 3.5 EA with damage, or 1.7 EA with
      // damage, which is r3, or r2 at close range.
      attack: {
        hit: `
          \\damagerankfour, and the target's body deteriorates as a \\glossterm{condition}.
          While it is \\glossterm{injured}, it is \\slowed.
        `,
        targeting: `
          When you cast this spell, the flesh on your body writhes.
          Next round, you can spend a \\glossterm{standard action} to make an attack vs. Fortitude against a creature within \\shortrange.
        `,
      },
      rank: 2,
      roles: ['burst', 'maim'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Cripple',

      // This can get +1.1 EA over regular cripple, which we fudge to get stunned
      attack: {
        hit: `
          \\damageranknine, and any \\glossterm{extra damage} is doubled.
          In addition, the target's body deteriorates as a \\glossterm{condition}.
          While it is \\glossterm{injured}, it is \\slowed and \\stunned.
        `,
        targeting: `
          When you cast this spell, the flesh on your body writhes.
          Next round, you can spend a \\glossterm{standard action} to make an attack vs. Fortitude against a creature within \\shortrange.
        `,
      },
      rank: 6,
      roles: ['burst', 'maim'],
      scaling: 'damage',
    },

    {
      name: 'Crippling Wave',

      // Precast ranged slow is r7, which we fudge to r6 with kind of limited scope
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target's body deteriorates as a \\glossterm{condition}.
          While it is \\glossterm{injured}, it is \\slowed.
        `,
        targeting: `
          Make an attack vs. Fortitude against all \\glossterm{enemies} in a \\largearea cone from you.
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
        `,
        injury: `
          The target becomes \\vulnerable to all damage as a \\glossterm{condition}.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Fortitude and Reflex against all creatures in a \\smallarea radius within \\medrange.
        `,
      },
      rank: 7,
      roles: ['maim'],
      scaling: 'damage',
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
      scaling: 'damage',
    },

    {
      name: 'Mighty Fleshspike',

      attack: {
        hit: `
          \\damageranksix, and any \\glossterm{extra damage} is doubled.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Armor against an adjacent creature.
        `,
      },
      rank: 4,
      roles: ['burst'],
      scaling: 'damage',
    },

    {
      name: 'Bloody Fleshspike',

      // Normal would be dr5. Drop by -2dr for the injury effect.
      attack: {
        hit: `
          \\damagerankthree.
        `,
        injury: `
          The target takes \\damagerankthree during your next action.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Armor against an adjacent creature.
        `,
      },
      rank: 3,
      roles: ['burn'],
      scaling: 'damage',
    },

    {
      name: 'Impaling Fleshspike',

      // HP slow with damage requires 2.6 EA, or r7. Melee range allows that at r5.
      attack: {
        hit: `
          \\damageranksix, and any \\glossterm{extra damage} is doubled.
        `,
        injury: `
          The target becomes \\slowed as a \\glossterm{condition}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Armor against an adjacent creature.
        `,
      },
      rank: 5,
      roles: ['maim'],
      scaling: 'damage',
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
      name: 'Form of the Snake',

      effect: `
        You \\glossterm{shapeshift} into a Small snake.
        This reduces your \\glossterm{base speed} to 20 feet, among other effects (see \\pcref{Size Categories}).
        As a snake, you have an average climb speed and a bite natural weapon.
        You cannot speak and have no \\glossterm{free hands}, but you do not need hands to climb.
      `,
      rank: 2,
      roles: ['attune'],
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
      roles: ['attune'],
      tags: [],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Form of the Raven',

      effect: `
        You \\glossterm{shapeshift} into a Small raven.
        As a raven, you have an average \\glossterm{fly speed} with a \\glossterm{height limit} of 60 feet (see \\pcref{Flight}).
        You cannot speak and have no \\glossterm{free hands}.
        You are also unable to take any standard action other than \\glossterm{movement}.
      `,
      rank: 5,
      roles: ['attune'],
      tags: [],
      type: 'Sustain (attuneable, minor)',
    },

    // 0.4 + 2 * 0.2 EA
    {
      name: 'Sudden Jellification',

      effect: `
        You are \\braced this round and \\glossterm{briefly} \\steeled.
        This is a \\atSwift effect, so it protects you from attacks during the current phase.
      `,
      rank: 1,
      roles: ['turtle'],
      tags: ['Swift'],
    },

    {
      name: 'Greater Sudden Jellification',

      effect: `
        You are \\glossterm{briefly} \\steeled and \\braced.
        This is a \\atSwift effect, so it protects you from attacks during the current phase.
      `,
      rank: 6,
      roles: ['turtle'],
      tags: ['Swift'],
    },

    // Ally empower is 0.6 EA. Long is about +1a, so about 0.2 EA.
    {
      name: 'Extended Sinews',

      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        This round, the target is \\empowered and all of its melee \\glossterm{strikes} gain the \\weapontag{Long} \\glossterm{weapon tag}.
        If you choose yourself, the effect lasts \\glossterm{briefly}.
      `,
      rank: 2,
      roles: ['boon'],
      tags: ['Swift'],
    },

    // Any two empower is 1 EA, and any two accuracy is about 0.3 EA.
    {
      name: 'Greater Extended Sinews',

      functionsLike: {
        name: 'extended sinews',
        exceptThat:
          'you can choose up to two targets from among yourself and your \\glossterm{allies} within \\medrange.',
      },
      rank: 7,
      roles: ['boon'],
      tags: ['Swift'],
    },

    {
      name: 'Eyeseal',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\dazzled as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against up to two creatures within \\shortrange.
        `,
      },
      rank: 2,
      roles: ['softener'],
      scaling: 'accuracy',
    },

    // Base rank is r3. Add +1 for extended area and +1 for more area, so area rank is 6.
    {
      name: 'Massive Eyeseal',

      attack: {
        hit: `
          The target is \\dazzled as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against all \\glossterm{enemies} in a \\medarea radius within \\medrange.
        `,
      },
      rank: 5,
      roles: ['softener'],
      scaling: 'accuracy',
    },
  ],
};
