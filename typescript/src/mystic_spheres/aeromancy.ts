import { MysticSphere } from '.';
import { add_tag_to_sphere } from './add_tag';
import { BARRIER_COOLDOWN, CONDITION_CRIT } from './constants';

export const aeromancy: MysticSphere = add_tag_to_sphere('Air', {
  name: 'Aeromancy',
  hasImage: true,
  shortDescription: 'Command air to protect allies and blast foes.',
  sources: ['nature', 'domain'],
  cantrips: [
    {
      name: 'Manipulate Air',

      effect: `
        You change the wind speed within a \\largearea radius \\glossterm{emanation} from you by up to 10 miles per hour.
        If you decrease the wind's speed to 0, you can increase it again with the remainder of your speed change and choose any direction for it to travel.
        You choose the speed change and direction when you cast this spell, and that choice persists for the duration of this effect.
      `,
      narrative: `
        The wind around you waxes and wanes at your command, softening the force of a tempest or creating one to harass your foes.
      `,
      scaling: {
        2: 'The maximum speed change increases to 15 miles per hour.',
        4: 'The maximum speed change increases to 20 miles per hour.',
        6: 'The maximum speed change increases to 30 miles per hour.',
      },
      roles: ['narrative'],
      type: 'Sustain (minor)',
    },
    {
      name: 'Feather Fall',

      effect: `
        Choose yourself or an \\glossterm{ally} within \\longrange.
        The target treats all falls as if they were 20 feet shorter for the purpose of determining \\glossterm{falling damage} this round.
      `,
      narrative: `
        The air beneath you suddenly accelerates into a great wind, softening the force of your unexpected fall.
      `,
      roles: ['narrative'],
      scaling: {
        2: 'The distance reduction increases to 50 feet.',
        4: 'The distance reduction increases to 100 feet.',
        6: 'The distance reduction increases to 200 feet.',
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
          Each target \\glossterm{briefly} takes a -2 penalty to defenses against \\atAir abilities and projectile \\glossterm{strikes}.
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
          Each target takes a -2 penalty to defenses against \\atAir abilities and projectile \\glossterm{strikes} as a \\glossterm{condition}.
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

      cost: 'One optional \\glossterm{fatigue level}. If you pay this cost, the spell becomes \\abilitytag{Swift}, and you can only target yourself with it.',
      effect: `
        Choose yourself, one \\glossterm{ally}, or one \\glossterm{unattended} object within \\medrange.
        The target must have a \\glossterm{weight category} of Medium or less.

        You \\glossterm{knockback} the target up to 60 feet in any direction, to a maximum of a 60 foot \\glossterm{height limit}.
        You cannot change the direction of the movement partway through.
        Moving the target upwards costs twice the normal movement cost.

        If you leave the target \\glossterm{midair}, it normally suffers a \\minus4 penalty to its Armor and Reflex defenses until it lands.
        It normally falls at the end of the round, causing it to take \\glossterm{falling damage} (see \\pcref{Falling Damage}).
      `,
      rank: 1,
      roles: ['dive'],
    },
    {
      name: 'Intense Propulsion',

      cost: 'One optional \\glossterm{fatigue level}. If you pay this cost, the spell becomes \\abilitytag{Swift}, and you can only target yourself with it.',
      functionsLike: {
        name: 'propulsion',
        exceptThat: "the maximum distance increases to 120 feet.",
      },
      rank: 6,
      roles: ['dive'],
    },
    // Braced is 2.2 EA. Assume that ranged strikes are about 25% of all attacks, so this
    // is 0.55 EA, which is about right for a rank 1.
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
      name: 'Mass Wind Screen',

      functionsLike: {
        mass: true,
        name: 'wind screen',
      },
      // narrative: '',
      rank: 3,
      roles: ['attune'],
      type: 'Attune (target)',
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
      roles: ['snipe'],
      scaling: 'accuracy',
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
      roles: ['snipe'],
      scaling: 'accuracy',
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
      scaling: 'accuracy',
    },
    {
      name: 'Windseal',

      attack: {
        hit: `
          Each target is \\glossterm{briefly} \\slowed.
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
          Each target is \\glossterm{briefly} borne aloft by heavy winds.
          It floats five feet above the ground in \\debuff{midair}, which normally means it suffers a \\minus4 penalty to its Armor, Brawn, and Reflex defenses.
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
          You \\glossterm{knockback} each target that has no remaining \\glossterm{damage resistance} up to 15 feet upwards or horizontally (see \\pcref{Knockback Effects}).
          Moving the target upwards costs twice the normal movement cost.
          Each target must be knocked back in the same direction.

          You can leave the target \\midair after the knockback.
          It normally falls at the end of the round, potentially causing it to take \\glossterm{falling damage} (see \\pcref{Falling Damage}).
        `,
        targeting: 'Make an attack vs. Brawn against up to two creatures within \\medrange that each have a \\glossterm{weight category} of Medium or lighter.',
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
          You \\glossterm{knockback} each target that has no remaining \\glossterm{damage resistance} up to 30 feet upwards or horizontally (see \\pcref{Knockback Effects}).
          Moving the target upwards costs twice the normal movement cost.
          Each target must be knocked back in the same direction.

          You can leave the target \\midair after the knockback.
          It normally falls at the end of the round, potentially causing it to take \\glossterm{falling damage} (see \\pcref{Falling Damage}).
        `,
        targeting: 'Make an attack vs. Brawn against up to three creatures within \\medrange that each have a \\glossterm{weight category} of Large or lighter.',
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
      name: 'Soaring Flight',

      effect: `
        You gain a slow \\glossterm{fly speed} with a maximum height of 60 feet (see \\pcref{Flight}).
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
          Each target is \\glossterm{pushed} 15 feet in the direction the wind blows.
          Once a target leaves the area, it stops being pushed and blocks any other targets from being pushed.
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
        exceptThat:
          "the push distance increases to 30 feet.",
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
      scaling: 'accuracy',
      type: 'Attune (deep)',
    },
    {
      name: 'Control Weather',

      effect: `
        When you cast this spell, you choose a new weather pattern.
        You can only choose weather which would be reasonably probable in the climate and season of the area you are in.
        For example, you can normally create a thunderstorm, but not if you are in a desert.

        When you complete the spell, the weather begins to take effect in a two mile radius cylinder-shaped \\glossterm{zone} from your location.
        After five minutes, your chosen weather pattern fully takes effect.
        % TODO: define weather intensities
        You cannot change the intensity of the weather beyond what would be possible without magic during this time frame.
        For example, you can change a clear sky into a light thunderstorm, but you cannot create a hurricane or tornado from untroubled air.

        At any time during this spell's effect, you can choose a new weather pattern as a \\glossterm{standard action}.
        When you do, the weather transitions from your original pattern to your new pattern over a five minute period.

        You can control the general tendencies of the weather, such as the direction and intensity of the wind.
        You cannot control specific applications of the weather, such as the location of lightning strikes.
        Contradictory weather conditions are not possible simultaneously.

        After the spell's effect ends, the weather continues on its natural course, which typically causes your chosen weather pattern to end.
        % TODO: This should be redundant with generic spell mechanics
        If another ability would magically manipulate the weather in the same area, the most recently used ability takes precedence.
      `,
      // narrative: '',
      rank: 4,
      roles: ['attune'],
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

          During your next action, the dust devil forms in your chosen area, and you make an attack vs. Brawn and Reflex against everything in the area.
          If there is not at least thirty feet of open space above your chosen area, this spell fails with no effect.
        `,
      },
      // narrative: '',
      rank: 3,
      roles: ['clear'],
      scaling: 'accuracy',
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

          During your next action, the tornado forms in your chosen area, and you make an attack vs. Brawn and Reflex against everything in the area.
          If there is not at least sixty feet of open space above your chosen area, this spell fails with no effect.
        `,
      },
      // narrative: '',
      rank: 5,
      roles: ['clear'],
      scaling: 'accuracy',
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

          During your next action, the tornado forms in your chosen area, and you make an attack vs. Brawn and Reflex against everything in the area.
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
          In addition, each target is \\glossterm{pushed} 15 feet clockwise around you.
          Each target's final position should be the same distance from you as its starting position.
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
      scaling: 'accuracy',
    },
    {
      name: 'Massive Hurricane',

      functionsLike: {
        name: 'hurricane',
        exceptThat: 'the damage increases to \\damagerankfour, and it affects all \\glossterm{enemies} in a \\largearea radius from you.',
      },
      // narrative: '',
      rank: 6,
      roles: ['clear'],
      scaling: 'accuracy',
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
          Each target is \\dazzled as a \\glossterm{condition}.
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
          Each target is \\dazzled as a \\glossterm{condition}.
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
    // TODO: higher rank version
    {
      name: 'Wall of Wind',

      cost: BARRIER_COOLDOWN,
      effect: `
        You create a \\medarea \\glossterm{wall} of wind within \\longrange.
        It does not block passage or significantly obstruct sight.
        However, ranged \\glossterm{strikes} that pass through the wall take a -4 accuracy penalty.
      `,
      rank: 1,
      roles: ['hazard'],
      tags: ['Barrier'],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Air Walk',

      effect: `
        You can walk on air up to a foot above the ground.
        This allows you to ignore \\glossterm{difficult terrain} from all sources other than creature abilities.
        The extra height is generally insufficient to change your \\glossterm{space} in battle.
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
      scaling: 'accuracy',
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
      scaling: 'accuracy',
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
      scaling: 'accuracy',
    },

    {
      name: 'Mistform',

      effect: `
        You \\glossterm{shapeshift} into a cloud of mist.
        This makes you \\trait{floating}, \\trait{intangible}, and \\trait{legless}.
        You cannot speak and you have no \\glossterm{free hands}.
        All of your normal movement modes are replaced with a slow \\glossterm{fly speed} with a 30 foot \\glossterm{height limit} (see \\pcref{Flight}).
        Since you have no \\glossterm{walk speed}, flying in this way does not penalize your defenses.
        You are unable to take any standard actions other than sustaining this effect, but you can still take \\glossterm{move actions} in place of standard actions.
      `,
      rank: 4,
      roles: ['narrative'],
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
      roles: ['clear'],
      scaling: 'accuracy',
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
      roles: ['clear'],
      scaling: 'accuracy',
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
      name: 'Zephyr Guide',

      // +2 accuracy is 0.3 EA, so total EA is 0.7 on self or 1.1 on ally. But it doesn't
      // work all the time, so it's okay at r3.
      effect: `
        Choose yourself or one \\glossterm{ally} within \\distrange.
        This round, the target is \\focused and gains a \\plus2 bonus accuracy bonus with ranged \\glossterm{strikes}.
        If you choose yourself, the effect lasts \\glossterm{briefly}.
      `,
      // narrative: '',
      rank: 3,
      roles: ['focus'],
      scaling: 'accuracy',
    },
  ],
});
