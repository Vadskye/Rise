import { MysticSphere } from '.';
import { add_tag_to_sphere } from './add_tag';
import { BARRIER_COOLDOWN, CONDITION_CRIT, SWIFT_FATIGUE_SELF } from './constants';

export const aeromancy: MysticSphere = add_tag_to_sphere('Air', {
  name: 'Aeromancy',
  hasImage: true,
  shortDescription: 'Command air to protect allies and blast foes.',
  sources: ['nature', 'domain'],
  cantrips: [
    {
      name: 'Feather Fall',

      effect: `
        Choose yourself or an \\glossterm{ally} within \\longrange.
        The target treats all falls as if they were 30 feet shorter for the purpose of determining \\glossterm{falling damage} this round.
      `,
      narrative: `
        The air beneath you suddenly accelerates into a great wind, softening the force of your unexpected fall.
      `,
      roles: ['boon'],
      // Most cantrips don't scale, but this is simple and falling damage also
      // intrinsically matters less at higher levels, so this seems necessary to make it
      // matter at all.
      scaling: {
        2: 'The distance reduction increases to 60 feet.',
        4: 'The distance reduction increases to 90 feet.',
        6: 'The distance reduction increases to 120 feet.',
      },
    },
  ],
  spells: [
    {
      name: 'Updraft',

      effect: `
        Whenever you \\glossterm{knockback} or \\glossterm{push} a creature or object, you can increase the distance of that knockback or push by up to ten feet.
        In addition, you gain a +10 foot \\glossterm{enhancement bonus} to your maximum horizontal jump distance (see \\pcref{Jumping}).
        This increases your maximum vertical jump distance normally.
      `,
      narrative: `
        The air rises beneath you and pushes you up, propelling you farther when you leap.
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Cushion of Air',

      effect: `
        You gain an average \\glossterm{glide speed}.
        In addition, you become immune to \\glossterm{falling damage}.
      `,
      rank: 3,
      roles: ['attune'],
      type: 'Attune',
    },
    // Of the 7 possible attacks against the target, assume that 4 can benefit, so this is
    // 0.8 EA. That allows room to increase to distrange.
    {
      name: 'Guiding Winds',

      attack: {
        hit: `
          The target \\glossterm{briefly} takes a -2 penalty to defenses against \\atAir abilities and projectile \\glossterm{strikes}.
        `,
        targeting: `
          Make an attack vs. Reflex against up to two creatures within \\distrange.
        `,
      },
      narrative: `
        The air around your foe ripples with hidden air currents that seem to guide the flight of arrows.
      `,
      rank: 1,
      roles: ['softener'],
      scaling: 'accuracy',
    },

    // Of the 15 possible attacks, assume that 8 can benefit, so this is 1.6 EA.
    // Increasing to distrange takes us to rank 4.
    {
      name: 'Intense Guiding Winds',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target takes a -2 penalty to defenses against \\atAir abilities and projectile \\glossterm{strikes} as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Reflex against up to two creatures within \\distrange.
        `,
      },
      narrative: `
        The air around your foe ripples with hidden air currents that seem to guide the flight of arrows.
      `,
      rank: 4,
      roles: ['softener'],
      scaling: 'accuracy',
    },

    {
      name: 'Propulsion',

      cost: SWIFT_FATIGUE_SELF,
      effect: `
        Choose either yourself or one unattended object or \\glossterm{ally} within \\medrange.
        If you choose something other than yourself, it must have a \\glossterm{weight category} of Medium or less.

        You \\glossterm{knockback} the target up to 30 feet in any direction, to a maximum of a 30 foot \\glossterm{height limit}.
        Moving the target upwards costs twice the normal movement cost.

        If you leave the target \\glossterm{midair}, it is normally \\unsteady until it lands.
        It normally falls at the end of the round, causing it to take \\glossterm{falling damage} (see \\pcref{Falling Damage}).
      `,
      rank: 1,
      roles: ['mobility'],
    },
    {
      name: 'Intense Propulsion',

      cost: SWIFT_FATIGUE_SELF,
      functionsLike: {
        name: 'propulsion',
        exceptThat: 'the maximum knockback distance increases to 60 feet.',
      },
      rank: 4,
      roles: ['mobility'],
    },
    // Braced is 2.2 EA. Assume that ranged strikes are about 33% of all attacks, so this
    // is 0.73 EA, which is about right for a rank 1. They aren't actually 33% of attacks,
    // but it's dangerous to undervalue rare modifiers. Doubled would be 1.5 EA for the
    // empowered version.
    {
      name: 'Wind Screen',

      effect: `
        You gain a +2 bonus to your defenses against ranged \\glossterm{strikes}.
      `,
      // narrative: "",
      rank: 1,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Greater Wind Screen',

      effect: `
        You gain a +4 bonus to your defenses against ranged \\glossterm{strikes}.
      `,
      // narrative: "",
      rank: 7,
      roles: ['attune'],
      type: 'Attune',
    },
    // Normally, long range single target would be dr2, or two targets at med range would
    // be dr2. This is better than normal for distrange, but long range damage is rare.
    {
      name: 'Windslash',

      attack: {
        hit: `
          \\damageranktwo.
        `,
        targeting: `
          Make an attack vs. Armor against up to two targets within \\longrange.
          If you choose two targets, they must be adjacent to each other.
        `,
      },
      // narrative: '',
      rank: 3,
      roles: ['clear', 'snipe'],
      scaling: 'damage',
    },
    {
      name: 'Mighty Windslash',

      attack: {
        hit: `
          \\damagerankfive.
        `,
        targeting: `
          Make an attack vs. Armor against up to two targets within \\longrange.
          If you choose two targets, they must be adjacent to each other.
        `,
      },
      // narrative: '',
      rank: 6,
      roles: ['clear', 'snipe'],
      scaling: 'damage',
    },
    {
      name: 'Windsnipe',

      attack: {
        hit: `
          \\damageranktwo.
        `,
        targeting: 'Make an attack vs. Armor against something within \\distrange.',
      },
      // narrative: '',
      rank: 4,
      roles: ['snipe'],
      scaling: 'damage',
    },
    {
      name: 'Windseal',

      attack: {
        hit: `
          The target is \\glossterm{briefly} \\slowed.
        `,
        targeting: `
          Make an attack vs. Brawn against up to three creatures within \\medrange.
        `,
      },
      // narrative: '',
      rank: 4,
      roles: ['flash'],
      scaling: 'accuracy',
    },
    // -4 Armor/Brawn/Reflex will probably apply to 6 of the 7 attacks, so it's worth 2.4
    // EA, which is R6. Adding the grounded requirement means this can't be chained
    // indefinitely.
    {
      name: 'Skyward',

      attack: {
        hit: `
          The target is \\glossterm{briefly} borne aloft by heavy winds.
          It floats five feet above the ground in \\glossterm{midair}, which normally makes it \\unsteady.
          Although it cannot use a \\glossterm{walk speed} or most other normal movement modes while midair, it gains an average \\glossterm{fly speed} with a 5 foot \\glossterm{height limit} that it intuitively knows how to use.
          Although it can move around in the air with this fly speed, it cannot get lower than 5 feet above the ground.
        `,
        targeting: `
          Make an attack vs. Brawn against all Huge or smaller \\glossterm{grounded} \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      // narrative: '',
      rank: 6,
      roles: ['flash'],
      scaling: 'accuracy',
    },
    // Alternate design: push, or knockback if no remaining DR. More useful, but would
    // have to be higher rank and have more complicated text.
    {
      name: 'Buffet',

      // A 15' vertical push is worth 1.6 EA, which is r2.
      attack: {
        hit: `
          If the target is \\glossterm{injured}, you \\glossterm{knockback} it up to 15 feet upwards or horizontally (see \\pcref{Knockback Effects}).
          Moving it upwards costs twice the normal movement cost.
          Each target of this spell must be knocked back in the same direction.

          You can leave the target \\midair after the knockback.
          It normally falls at the end of the round, potentially causing it to take \\glossterm{falling damage} (see \\pcref{Falling Damage}).
        `,
        targeting: `
          Make an attack vs. Brawn against up to two creatures within \\medrange that each have a \\glossterm{weight category} of Medium or lighter.
        `,
      },
      // narrative: '',
      rank: 2,
      roles: ['maim'],
      scaling: 'accuracy',
    },
    {
      name: 'Intense Buffet',

      // A 30' vertical push is 2.6 EA, which is r7. Drop to r6 for limited scope. We
      // sneak into three targets by keeping a relatively low weight category.
      attack: {
        hit: `
          If the target is \\glossterm{injured}, you \\glossterm{knockback} it up to 30 feet upwards or horizontally (see \\pcref{Knockback Effects}).
          Moving it upwards costs twice the normal movement cost.
          Each target of this spell must be knocked back in the same direction.

          You can leave the target \\midair after the knockback.
          It normally falls at the end of the round, potentially causing it to take \\glossterm{falling damage} (see \\pcref{Falling Damage}).
        `,
        targeting: `
          Make an attack vs. Brawn against up to three creatures within \\medrange that each have a \\glossterm{weight category} of Large or lighter.
        `,
      },
      // narrative: '',
      rank: 6,
      roles: ['maim'],
      scaling: 'accuracy',
    },
    {
      name: 'Flight',

      effect: `
        You gain a slow \\glossterm{fly speed} with a maximum height of 15 feet (see \\pcref{Flight}).
      `,
      // narrative: '',
      rank: 4,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Agile Flight',

      effect: `
        You gain a slow \\glossterm{fly speed} with a maximum height of 15 feet (see \\pcref{Flight}).
        Flying with this fly speed does not cause you to suffer penalties for being \midair.
      `,
      // narrative: '',
      rank: 6,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Rapid Flight',

      effect: `
        You gain an average \\glossterm{fly speed} with a maximum height of 15 feet (see \\pcref{Flight}).
      `,
      // narrative: '',
      rank: 7,
      roles: ['attune'],
      type: 'Attune',
    },
    // 15' push is about 0.8 since this can't be used for full kiting, then 1.8 EA for
    // sustain (minor).
    {
      name: 'Wind Tunnel',

      attack: {
        hit: `
          The target is \\glossterm{pushed} 15 feet in the direction the wind blows.
          Once it leaves the area, it stops being pushed and blocks any other targets from being pushed.
        `,
        targeting: `
          You create a continuous blast of wind in a \\largearealong, 10 ft. wide line-shaped \\glossterm{zone} from you.
          The wind blows either towards you or away from you.
          You choose the direction when you cast the spell.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Brawn against everything in the area.
        `,
      },
      // effect: '',
      // narrative: '',
      rank: 3,
      roles: ['hazard'],
      scaling: 'accuracy',
      tags: ['Sustain (minor)'],
    },
    // 30' push is 2.0 at range, then 3.0 from sustain (minor). Drop to limited scope is
    // -1r, and also gets us closer to "melee" range push, so say we can get away with
    // that at r7.
    {
      name: 'Intense Wind Tunnel',

      functionsLike: {
        name: 'wind tunnel',
        exceptThat: 'the push distance increases to 30 feet.',
      },
      // narrative: '',
      rank: 7,
      roles: ['hazard'],
      tags: ['Sustain (minor)'],
    },
    {
      name: 'Windblade',

      effect: `
        Your melee \\glossterm{strikes} gain the \\atAir tag and the \\weapontag{Long} weapon tag, allowing you to attack targets up to 10 feet away from you (see \\pcref{Weapon Tags}).
      `,
      // narrative: '',
      rank: 3,
      roles: ['attune'],
      type: 'Attune',
    },
    // dr3 is standard for 75% common reactive damage
    {
      name: 'Retributive Winds',

      attack: {
        hit: `
          \\damagerankthree.
        `,
        targeting: `
          Whenever a creature within \\medrange of you attacks you, make a \\glossterm{reactive attack} vs. Armor against them.
          Any effect which increases this spell's range increases the range of this retaliation by the same amount.
          You can only make this attack against a given target once per \\glossterm{phase}.
        `,
      },
      // effect: '',
      // narrative: '',
      rank: 5,
      roles: ['attune'],
      scaling: 'damage',
      type: 'Attune (deep)',
    },
    {
      name: 'Call Dust Devil',

      // Rank 3 spell would normally have dr1 and r3 area.
      // Then add +2dr for avoidable delay and +1dr for double defense.
      // The open area requirement is a cost for stacking this much +damage.
      attack: {
        hit: `
          \\damagerankfour.
        `,
        missGlance: true,
        targeting: `
          When you cast this spell, you choose a \\smallarea radius within \\shortrange.
          A dust devil begins forming in that area.
          Creatures can generally identify what area the dust devil will form in with a DV 10 Awareness check.

          During your next action, the dust devil forms in your chosen area, and you make a \\glossterm{reactive attack} vs. Brawn and Reflex against everything in the area.
          If there is not at least thirty feet of open space above your chosen area, this spell fails with no effect.
        `,
      },
      // narrative: '',
      rank: 3,
      roles: ['clear'],
      scaling: 'damage',
    },

    // Rank 5 spell would normally have dr3 and r5 area, or dr2 and r5 area with extended
    // area. Then add +2dr for avoidable delay and +1dr for double defense.
    // The open area requirement is a cost for stacking this much +damage.
    {
      name: 'Call Tornado',

      attack: {
        hit: `
          \\damagerankfive.
        `,
        missGlance: true,
        targeting: `
          When you cast this spell, you choose a \\medarea radius within \\medrange.
          A tornado begins forming in that area.
          Creatures can generally identify what area the tornado will form in with a DV 10 Awareness check.

          During your next action, the tornado forms in your chosen area, and you make a \\glossterm{reactive attack} vs. Brawn and Reflex against everything in the area.
          If there is not at least sixty feet of open space above your chosen area, this spell fails with no effect.
        `,
      },
      // narrative: '',
      rank: 5,
      roles: ['clear'],
      scaling: 'damage',
    },
    {
      name: 'Call Massive Tornado',

      // We only get +1dr from the "avoidable" delay because it really isn't that
      // avoidable anymore
      attack: {
        hit: `
          \\damageranksix.
        `,
        missGlance: true,
        targeting: `
          When you cast this spell, you choose a \\largearea radius within \\medrange.
          A tornado begins forming in that area.
          Creatures can generally identify what area the tornado will form in with a DV 10 Awareness check.

          During your next action, the tornado forms in your chosen area, and you make a \\glossterm{reactive attack} vs. Brawn and Reflex against everything in the area.
          If there is not at least sixty feet of open space above your chosen area, this spell fails with no effect.
        `,
      },
      // narrative: '',
      rank: 7,
      roles: ['clear'],
      scaling: 'accuracy',
    },
    // A standard debuff + damage r4 spell would deal dr1 with a r4 area. Increase to dr2
    // for double defense.
    // Standard debuff rank for a r4 damage + debuff spell would be 1.0. Push is a little
    // weak for that, so we also add empowered.
    {
      name: 'Hurricane',

      attack: {
        hit: `
          \\damageranktwo.
          In addition, the target is \\glossterm{pushed} 15 feet clockwise around you.
          Its final position should be the same distance from you as its starting position.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Brawn and Reflex against all \\glossterm{enemies} in a \\medarea radius from you.
          Then, you are \\glossterm{briefly} \\empowered.
        `,
      },
      // narrative: '',
      rank: 4,
      roles: ['clear'],
      scaling: 'damage',
    },
    {
      name: 'Massive Hurricane',

      functionsLike: {
        name: 'hurricane',
        exceptThat:
          'the damage increases to \\damagerankfour, and it affects all \\glossterm{enemies} in a \\largearea radius from you.',
      },
      // narrative: '',
      rank: 6,
      roles: ['clear'],
      scaling: 'damage',
    },
    {
      name: 'Windtheft',

      attack: {
        hit: `
          You \\glossterm{knockback} the object up to 60 feet towards you.
          You can use a \\glossterm{free hand} to catch the object if it reaches you.
        `,
        targeting: `
          Make an attack vs. Reflex against one object within \\medrange.
          The object must have a \\glossterm{weight category} of Small or less.
          If the object is attended by a creature, the attack must also beat the attending creature's Brawn and Reflex defenses.
          If it is held in two hands or well secured, this attack automatically fails.
        `,
      },
      // narrative: '',
      rank: 5,
      roles: ['softener'],
      scaling: 'accuracy',
    },
    // Dazzle is 1.8 EA, so r3.
    {
      name: 'Dust Cloud',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\dazzled as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Reflex against each creature in a \\smallarea radius within \\shortrange.
        `,
      },
      // narrative: '',
      rank: 3,
      roles: ['flash'],
      tags: [],
      scaling: 'accuracy',
    },
    {
      name: 'Dust Storm',

      // Start from standard dazzle, +1r for extended area, +1r for larger area, total is
      // r5 with r6 area. Huge radius from self would be r7 area, which seems fine with
      // Sustain (standard).
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\dazzled as a \\glossterm{condition}.
        `,
        targeting: `
          You create a dust storm in a \\glossterm{zone} around you.
          The area affected by the storm increases over time.
          It affects a \\largearea radius in the first round, a \\hugearea radius in the second round, and a \\gargarea radius in all subsequent rounds.
          Any effect which increases or changes this spell's area affects all of its areas equally, not just the area in the first round.

          When you cast this spell, and during each of your subsequent actions, make an attack vs. Reflex against all \\glossterm{enemies} in the area.
        `,
      },
      // narrative: '',
      rank: 5,
      roles: ['flash'],
      scaling: 'accuracy',
      type: 'Sustain (standard)',
    },
    // TODO: standardize EA for movement speeds and moving through enemies
    {
      name: 'Misty Step',

      effect: `
        You can move through creatures freely.
        This does not allow you to move through inanimate objects.
        In addition, you gain an average \\glossterm{glide speed}.
      `,
      narrative: `
        Your body is partially transformed into mist.
        This allows you to drift through enemies and even the air with ease.
      `,
      rank: 4,
      roles: ['attune'],
      type: 'Attune',
    },
    // TODO: higher rank version?
    {
      name: 'Wall of Wind',

      cost: BARRIER_COOLDOWN,
      effect: `
        You create a \\medarea \\glossterm{wall} of wind within \\longrange.
        It does not block passage or significantly obstruct sight.
        However, ranged \\glossterm{strikes} that pass through the wall take a -4 accuracy penalty.
      `,
      rank: 1,
      roles: ['barrier'],
      tags: ['Barrier'],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Air Walk',

      effect: `
        You can walk on air up to a foot above the ground.
        This allows you to ignore \\glossterm{difficult terrain} from all sources other than creature abilities.
        The extra height is insufficient to change your \\glossterm{space} in battle.
      `,
      rank: 2,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Windblast',

      attack: {
        hit: `
          \\damageranktwo.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Brawn and Reflex against everything in a \\medarea cone from you.
        `,
      },
      // narrative: '',
      rank: 1,
      roles: ['clear'],
      scaling: 'damage',
    },
    {
      name: 'Mighty Windblast',

      attack: {
        hit: `
          \\damagerankfive.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Brawn and Reflex against everything in a \\medarea cone from you.
        `,
      },
      // narrative: '',
      rank: 4,
      roles: ['clear'],
      scaling: 'damage',
    },

    {
      name: 'Massive Windblast',

      attack: {
        hit: `
          \\damageranksix.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Brawn and Reflex against everything in a \\largearea cone from you.
        `,
      },
      // narrative: '',
      rank: 6,
      roles: ['clear'],
      scaling: 'damage',
    },

    {
      name: 'Mistform',

      effect: `
        You \\glossterm{shapeshift} into a cloud of mist.
        This makes you \\trait{floating}, \\trait{intangible}, and \\trait{legless}.
        You cannot speak and you have no \\glossterm{free hands}.
        All of your normal movement modes are replaced with a slow \\glossterm{fly speed} with a 30 foot \\glossterm{height limit} (see \\pcref{Flight}).
        Since you have no \\glossterm{walk speed}, flying in this way does not penalize your defenses for being \\midair.
        You are unable to take any standard actions other than sustaining this effect, but you can still take \\glossterm{move actions} in place of standard actions.
      `,
      rank: 4,
      roles: ['attune'],
      tags: [],
      type: 'Sustain (attuneable, standard)',
    },

    {
      name: 'Shielding Windblast',

      // dr-2 for buff effect. Tiny radius from self is r0, so that would normally be
      // drX+1.
      attack: {
        hit: `
          \\damagerankone.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Brawn and Reflex against all \\glossterm{enemies} adjacent to you.
          Then, you are \\glossterm{briefly} \\shielded.
        `,
      },
      // narrative: '',
      rank: 2,
      roles: ['clear', 'turtle'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Shielding Windblast',

      // dr-2 for buff effect. Tiny radius from self is r0, so that would normally be
      // drX+1.
      attack: {
        hit: `
          \\damagerankfour.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Brawn and Reflex against all \\glossterm{enemies} adjacent to you.
          Then, you are \\glossterm{briefly} \\shielded.
        `,
      },
      // narrative: '',
      rank: 5,
      roles: ['clear', 'turtle'],
      scaling: 'damage',
    },

    // Shield on other is 0.6 EA, shield on self is 0.4 EA
    {
      name: 'Zephyr Shield',

      effect: `
        Choose yourself or one \\glossterm{ally} within \\distrange.
        This round, the target is \\shielded and gains a \\plus2 bonus to all defenses against \\glossterm{ranged} \\glossterm{strikes}.
        Because this is a \\abilitytag{Swift} ability, it affects attacks against the target during the current phase.
      `,
      // narrative: '',
      rank: 1,
      roles: ['turtle'],
      tags: ['Swift'],
    },

    {
      name: 'Asphyxiate',

      attack: {
        hit: `
          \\damagerankfour.
        `,
        targeting: `
          Make an attack vs. Fortitude with a \\minus4 accuracy penalty against one creature within \\medrange.
          If the target does not need to breathe air, this attack has no effect.
        `,
      },
      // narrative: '',
      rank: 2,
      roles: ['burst'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Asphyxiate',

      attack: {
        hit: `
          \\damagerankseven, and any \\glossterm{extra damage} is doubled.
        `,
        targeting: `
          Make an attack vs. Fortitude with a \\minus4 accuracy penalty against one creature within \\distrange.
          If the target does not need to breathe air, this attack has no effect.
        `,
      },
      // narrative: '',
      rank: 5,
      roles: ['burst'],
      scaling: 'damage',
    },

    // This is too weak as +1 and too strong as +2? Ranged strikes are probably weak
    // enough that +2 is safe.
    {
      name: 'Wind Shear',

      effect: `
        Choose yourself or one \\glossterm{ally} within \\distrange.
        This round, the target gains a \\plus2 accuracy bonus with ranged \\glossterm{strikes} and is \\honed.
        If you choose yourself, the effect lasts \\glossterm{briefly}.
      `,
      // narrative: '',
      rank: 2,
      roles: ['boon'],
    },

    {
      name: 'Building Tempest',

      effect: `
        When you cast this spell, and whenever you sustain it, air loudly rushes around you.
        When you stop sustaining this spell, you gain a benefit based on how many times you sustained it.
        \\begin{mdframedraggeditemize}
          \\item Never: You are \\shielded this round.
          \\item Once: You are shielded and \\honed this round.
          \\item Two or more times: You are shielded and \\primed this round.
        \\end{mdframedraggeditemize}
      `,
      // narrative: '',
      rank: 2,
      roles: ['focus'],
      type: 'Sustain (minor)'
    },

    {
      name: 'Greater Building Tempest',

      effect: `
        When you cast this spell, and whenever you sustain it, air loudly rushes around you.
        When you stop sustaining this spell, you gain a benefit based on how many times you sustained it.
        \\begin{mdframedraggeditemize}
          \\item Never: You are \\shielded and \\honed this round.
          \\item Once: You are shielded and \\primed this round.
          \\item Two or more times: You are \\primed this round and \\glossterm{briefly} shielded.
        \\end{mdframedraggeditemize}
      `,
      // narrative: '',
      rank: 6,
      roles: ['focus'],
      type: 'Sustain (minor)'
    },
  ],
});
