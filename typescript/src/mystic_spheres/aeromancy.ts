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
      name: 'Windborne Leap',

      effect: `
        You gain a +10 foot \\glossterm{enhancement bonus} to your maximum horizontal jump distance (see \\pcref{Jumping}).
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
    // Treat as t1 debuff
    {
      name: 'Arrow Attraction',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          As a \\glossterm{condition}, the target takes a -2 penalty to defenses against projectile \\glossterm{strikes}.
        `,
        targeting: `
          Make an attack vs. Reflex against one creature within \\distrange.
        `,
      },
      narrative: `
        The air around your foe ripples with hidden air currents that seem to guide the flight of arrows.
      `,
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Intense Arrow Attraction',

      functionsLike: {
        name: 'arrow attraction',
        exceptThat: 'the penalty increases to -4.',
      },
      narrative: `
        The air around your foe ripples with hidden air currents that seem to guide the flight of arrows with extreme precision.
      `,
      rank: 6,
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
      scaling: {
        3: 'The maximum distance increases to 90 feet.',
        5: 'The maximum distance increases to 120 feet.',
        7: 'The maximum distance increases to 150 feet.',
      },
    },
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
    {
      name: 'Light Toss',

      effect: `
        Whenever you \\glossterm{knockback} or \\glossterm{push} a creature or object, you can increase the distance of that knockback or push by up to ten feet.
      `,
      // narrative: "",
      rank: 1,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Windslash',

      attack: {
        hit: `
          \\damagerankone.
        `,
        targeting: `
          Make an attack vs. Armor against up to two targets within \\medrange.
          If you choose two targets, they must be adjacent to each other.
        `,
      },
      // narrative: '',
      rank: 2,
      scaling: 'accuracy',
    },
    {
      name: 'Mighty Windslash',

      attack: {
        hit: `
          \\damagerankfour.
        `,
        targeting: `
          Make an attack vs. Armor against up to two targets within \\longrange.
          If you choose two targets, they must be adjacent to each other.
        `,
      },
      // narrative: '',
      rank: 5,
      scaling: 'accuracy',
    },
    {
      name: 'Windsnipe',

      attack: {
        hit: `
          \\damageranktwolow.
        `,
        targeting: 'Make an attack vs. Armor against something within \\distrange.',
      },
      // narrative: '',
      rank: 3,
      scaling: { special: 'The damage increases by 1d8 for each rank beyond 3.' },
    },
    {
      name: 'Distant Windsnipe',

      attack: {
        hit: `
          \\damagerankfourlow.
        `,
        targeting: 'Make an attack vs. Armor against something within \\extrange.',
      },
      // narrative: '',
      rank: 6,
      scaling: { special: 'The damage increases by 2d10 for each rank beyond 6.' },
    },
    {
      name: 'Windseal',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\slowed as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Brawn against one creature within \\medrange.
        `,
      },
      // narrative: '',
      rank: 5,
      scaling: 'accuracy',
    },
    {
      name: 'Skyseal',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          If the target has no remaining \\glossterm{damage resistance} and has a \\glossterm{weight category} of Large or less, it is borne aloft by heavy winds as a \\glossterm{condition}.
          It floats five feet above the ground in \\glossterm{midair}, which normally means it suffers a \\minus4 penalty to its Armor and Reflex defenses.
          This also typically prevents it from using a land speed, though it can potentially use other speeds if it can make contact with relevant objects (such as a wall for a climb speed).
        `,
        targeting: `
          Make an attack vs. Brawn against anyhthing within \\medrange.
        `,
      },
      // narrative: '',
      rank: 6,
      scaling: 'accuracy',
    },
    {
      name: 'Buffet',

      // weight category limit offsets outdoor doubling
      attack: {
        hit: `
          If the target has a \\glossterm{weight category} of Medium or less, you can \\glossterm{knockback} it up to 15 feet upwards or horizontally (see \\pcref{Knockback Effects}).
          The knockback distance increases to 30 feet if the target has no remaining \\glossterm{damage resistance}, or if it is outside in open air.
          Moving the target upwards costs twice the normal movement cost.

          If you leave the target \\glossterm{midair}, it normally suffers a \\minus4 penalty to its Armor and Reflex defenses until it lands.
          It normally falls at the end of the round, causing it to take \\glossterm{falling damage} (see \\pcref{Falling Damage}).
        `,
        targeting: 'Make an attack vs. Brawn against something within \\medrange.',
      },
      // narrative: '',
      rank: 2,
      scaling: 'accuracy',
    },
    {
      name: 'Intense Buffet',

      attack: {
        hit: `
          If the target has a \\glossterm{weight category} of Large or less, you can \\glossterm{knockback} it up to 30 feet upwards or horizontally, to a maximum of a 60 foot \\glossterm{height limit} (see \\pcref{Knockback Effects}).
          The knockback distance increases to 30 feet if the target has no remaining \\glossterm{damage resistance}, or if it is outside in open air.
          Moving the target upwards costs twice the normal movement cost.

          If you leave the target \\glossterm{midair}, it normally suffers a \\minus4 penalty to its Armor and Reflex defenses until it lands.
          It normally falls at the end of the round, causing it to take \\glossterm{falling damage} (see \\pcref{Falling Damage}).
        `,
        targeting: 'Make an attack vs. Brawn against something within \\medrange.',
      },
      // narrative: '',
      rank: 5,
      scaling: 'accuracy',
    },
    {
      name: 'Flight',

      effect: `
        You gain an average \\glossterm{fly speed} with a maximum height of 15 feet (see \\pcref{Flight}).
      `,
      // narrative: '',
      rank: 4,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Agile Flight',

      effect: `
        You gain an average \\glossterm{fly speed} with a maximum height of 15 feet (see \\pcref{Flight}).
        Unlike normal, flying with this fly speed does not penalize your Armor and Reflex defenses.
      `,
      // narrative: '',
      rank: 6,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Soaring Flight',

      effect: `
        You gain an average \\glossterm{fly speed} with a maximum height of 60 feet (see \\pcref{Flight}).
      `,
      // narrative: '',
      rank: 7,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Wind Tunnel',

      // t0.5 in t2 area is normally rank -1, then +2 for sustain minor
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
      rank: 2,
      scaling: 'accuracy',
      tags: ['Sustain (minor)'],
    },
    {
      name: 'Intense Wind Tunnel',

      functionsLike: {
        name: 'wind tunnel',
        exceptThat:
          "the push distance increases to 30 feet, and the area's length increases to \\hugearealong.",
      },
      // narrative: '',
      rank: 5,
      scaling: 'accuracy',
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
      name: 'Cyclone',

      attack: {
        hit: `
          \\damageranktwo.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything in a \\medarea radius within \\medrange.
        `,
      },
      // narrative: '',
      rank: 4,
      scaling: 'accuracy',
    },
    {
      name: 'Massive Cyclone',

      attack: {
        hit: `
          \\damagerankfive.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything in a \\largearea radius within \\distrange.
        `,
      },
      // narrative: '',
      rank: 7,
      scaling: 'accuracy',
    },
    // 2 levels for push; normally, 30' push is r1, but clockwise is much worse than
    // towards/away, so it's closer to r0.5
    {
      name: 'Hurricane',

      attack: {
        hit: `
          \\damageranktwo.
          In addition, each target is \\glossterm{pushed} 30 feet clockwise around you.
          Each target's final position should be the same distance from you as its starting position.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Brawn against all \\glossterm{enemies} in a \\medarea radius from you.
        `,
      },
      // narrative: '',
      rank: 4,
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
      scaling: 'accuracy',
    },
    {
      name: 'Dust Cloud',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          Each target is \\dazzled as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against each creature in a \\smallarea radius within \\medrange.
        `,
      },
      // narrative: '',
      rank: 2,
      tags: [],
      scaling: 'accuracy',
    },
    {
      name: 'Dust Storm',

      // Treat as large area in long range, a t6 area
      // The blinding imposes no extra rank penalty since slowly growing is already a
      // little odd.
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          Each target is \\dazzled as a \\glossterm{condition}.
          If it was already dazzled by this effect, and it has no remaining \\glossterm{damage resistance}, this condition makes it \\blinded instead.
        `,
        targeting: `
          You create a dust storm at a location within \\longrange.
          The area affected by the storm increases over time.
          It affects a \\medarea radius \\glossterm{zone} in the first round, a \\largearea radius in the second round, and a \\hugearea radius in all subsequent rounds.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Fortitude against everything in the area.
        `,
      },
      // narrative: '',
      rank: 5,
      scaling: 'accuracy',
      type: 'Sustain (standard)',
    },
    {
      name: 'Dust In The Eyes',

      // +1 rank for +2 accuracy
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\dazzled as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Reflex against one creature within \\shortrange.
          If there is dirt, dust, or a collection of loose objects of similar size within 30 feet of the target's eyes, you gain a +2 accuracy bonus with this attack.
        `,
      },
      // narrative: '',
      rank: 1,
      scaling: 'accuracy',
    },
    {
      name: 'Dustblind',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is surrounded by swirling dust as a \\glossterm{condition}.
          While it is below its maximum hit points, it is \\blinded.
        `,
        targeting: `
          Make an attack vs. Reflex against one creature within \\shortrange.
          If there is dirt, dust, or a collection of loose objects of similar size within 30 feet of the target's eyes, you gain a +2 accuracy bonus with this attack.
        `,
      },
      // narrative: '',
      rank: 4,
      scaling: 'accuracy',
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
    {
      name: 'Wall of Wind',

      cost: BARRIER_COOLDOWN,
      effect: `
        You create a \\medarea \\glossterm{wall} of wind within \\longrange.
        It does not block passage or significantly obstruct sight.
        However, ranged \\glossterm{strikes} that pass through the wall take a -4 accuracy penalty.
      `,
      rank: 1,
      scaling: {
        3: `You can increase the area to a \\medarealong wall.`,
        5: `You can increase the area to a \\largearealong wall.`,
        7: `You can increase the area to a \\hugearealong wall.`,
      },
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
      name: 'Windburst',

      attack: {
        hit: `
          \\damagerankone.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against all \\glossterm{enemies} in a \\medarea radius from you.
        `,
      },
      // narrative: '',
      rank: 3,
      scaling: 'accuracy',
    },
    {
      name: 'Massive Windburst',

      attack: {
        hit: `
          \\damagerankfive.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against all \\glossterm{enemies} in a \\hugearea radius from you.
        `,
      },
      // narrative: '',
      rank: 7,
    },

    {
      name: 'Mistform',

      effect: `
        You \\glossterm{shapeshift} into a cloud of mist.
        This makes you \\trait{floating}, \\trait{intangible}, and \\trait{legless}.
        You cannot speak and you have no \\glossterm{free hands}.
        All of your normal movement modes are replaced with a 20 foot \\glossterm{fly speed} with a 30 foot \\glossterm{height limit} (see \\pcref{Flight}).
        Since you have no land speed, flying in this way does not penalize your Armor or Reflex defenses.
        While you are in this form, you are unable to take any standard action other than \\glossterm{movement}.
      `,
      rank: 5,
      tags: [],
      type: 'Sustain (standard)',
    },
  ],
});
