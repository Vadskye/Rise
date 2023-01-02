import { MysticSphere } from '.';

export const aeromancy: MysticSphere = {
  name: 'Aeromancy',
  hasImage: true,
  shortDescription: 'Command air to protect allies and blast foes.',
  sources: ['nature', 'domain'],
  cantrips: [
    {
      name: 'Airborne Leap',

      effect: `
        You gain a +3 \\glossterm{magic bonus} to the Jump skill.
      `,
      narrative: `
        The air rises beneath you and pushes you up, propelling you farther when you leap.
      `,
      scaling: {
        2: `
          You also gain a 30 foot \\glossterm{glide speed}.
          If you already have a glide speed, you gain a +10 foot \\glossterm{magic bonus} to your glide speed.
        `,
        4: 'You also become immune to \\glossterm{falling damage}.',
        6: 'The Jump bonus increases to +6.',
      },
      type: 'Attune',
    },
    {
      name: 'Manipulate Air',

      effect: `
        You change the wind speed within a \\medarea radius \\glossterm{emanation} from you by up to 10 miles per hour.
        If you decrease the wind's speed to 0, you can increase it again with the remainder of your speed change and choose any direction for it to travel.
        You choose the speed change and direction when you cast this spell, and that choice persists for the duration of this effect.
      `,
      narrative: `
        The wind around you waxes and wanes at your command, softening the force of a tempest or creating one to harass your foes.
      `,
      scaling: {
        3: 'You can choose to affect a \\largearea radius instead, and the maximum speed change increases to 20 miles per hour.',
        5: 'You can choose to affect a \\hugearea radius instead, and the maximum speed change increases to 40 miles per hour.',
        7: 'You can choose to affect a \\gargarea radius instead, and the maximum speed change increases to 60 miles per hour.',
      },
      type: 'Sustain (minor)',
    },
    {
      name: 'Feather Fall',

      effect: `
        Choose yourself or an \\glossterm{ally} within \\longrange.
        That creature treats all falls as if they were 20 feet shorter for the purpose of determining \\glossterm{falling damage} this round.
      `,
      narrative: `
        The air beneath you suddenly accelerates into a great wind, softening the force of your unexpected fall.
      `,
      scaling: {
        2: 'The distance reduction increases to 50 feet.',
        4: 'The distance reduction increases to 100 feet.',
        6: 'The distance reduction increases to 200 feet.',
      },
    },
  ],
  spells: [
    // Treat as r1.5 debuff
    {
      name: 'Arrow Attraction',

      effect: `
        Choose a creature or object within \\medrange.
        That creature takes a -2 penalty to defenses against ranged \\glossterm{strikes}.
      `,
      narrative: `
        The air around your foe ripples with hidden air currents that seem to guide the flight of arrows.
      `,
      rank: 3,
      scaling: 'accuracy',
      tags: ['Sustain (minor)'],
    },

    {
      name: 'Intense Arrow Attraction',

      effect: `
        Choose a creature or object within \\medrange.
        That creature takes a -4 penalty to defenses against ranged \\glossterm{strikes}.
      `,
      narrative: `
        The air around your foe ripples with hidden air currents that seem to guide the flight of arrows with extreme precision.
      `,
      rank: 7,
      scaling: 'accuracy',
      tags: ['Sustain (minor)'],
    },
    {
      name: 'Propulsion',

      effect: `
        Choose yourself or one Large or smaller \\glossterm{ally} within \\medrange.
        You \\glossterm{knockback} the target up to 60 feet in any direction.
        You cannot change the direction of the movement partway through.
        Moving the target upwards costs twice the normal movement cost.
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
      type: 'Attune',
    },
    {
      name: 'Windslash',

      attack: {
        // crit: '',
        hit: `
          The target takes 1d10 \\add \\glossterm{power} slashing damage.
        `,
        targeting: 'Make an attack vs. Armor against anything within \\longrange.',
      },
      // narrative: '',
      rank: 2,
      scaling: 'damage',
    },
    {
      name: 'Mighty Windslash',

      attack: {
        // crit: '',
        hit: `
          The target takes 4d8 \\add \\glossterm{power} slashing damage.
        `,
        targeting: 'Make an attack vs. Armor against anything within \\extrange.',
      },
      // narrative: '',
      rank: 6,
      scaling: 'damage',
    },
    {
      name: 'Windsnipe',

      attack: {
        // crit: '',
        hit: `
          The target takes 1d6 \\add half \\glossterm{power} bludgeoning damage.
          If it loses \\glossterm{hit points} from this damage, you \\glossterm{push} it up to 30 feet horizontally.
        `,
        targeting: 'Make an attack vs. Fortitude against anything within \\distrange.',
      },
      // narrative: '',
      rank: 1,
      scaling: 'damage',
    },
    {
      name: 'Efficient Windsnipe',

      attack: {
        // crit: '',
        hit: `
          The target takes 2d8 \\add half \\glossterm{power} bludgeoning damage.
          If it takes damage, you \\glossterm{push} it up to 30 feet horizontally.
        `,
        targeting: 'Make an attack vs. Fortitude against anything within \\distrange.',
      },
      // narrative: '',
      rank: 5,
      scaling: 'damage',
    },
    {
      name: 'Buffet',

      attack: {
        hit: `
          The target takes 1d6 bludgeoning damage.
          If it is Large or smaller and loses \\glossterm{hit points} from this damage, you can \\glossterm{knockback} it up to 30 feet upwards or horizontally (see \\pcref{Knockback Effects}).
          Moving the target upwards costs twice the normal movement cost.
        `,
        targeting: 'Make an attack vs. Fortitude against anything within \\medrange.',
      },
      // narrative: '',
      rank: 1,
      scaling: 'damage',
    },
    {
      name: 'Intense Buffet',

      functionsLike: {
        name: 'buffet',
        // This deals an immediate 6d6 if you smash someone against a barrier, which is a lot of damage.
        exceptThat:
          'the damage increases to 2d6. In addition, the knockback distance increases to 60 feet, and the maximum size category increases to Huge.',
      },
      // narrative: '',
      rank: 5,
      scaling: 'accuracy',
    },
    {
      name: 'Flight',

      effect: `
        You gain a 30 foot \\glossterm{fly speed} with a maximum height of 30 feet (see \\pcref{Flight}).
      `,
      // narrative: '',
      rank: 4,
      type: 'Attune',
      scaling: {
        6: 'The maximum height increases to 60 feet.',
      },
    },
    {
      name: 'Agile Flight',

      effect: `
        You gain a 30 foot \\glossterm{fly speed} with a maximum height of 30 feet (see \\pcref{Flight}).
        Your \\glossterm{maneuverability} with this fly speed is perfect (see \\pcref{Flying Maneuverability}).
      `,
      // narrative: '',
      rank: 6,
      type: 'Attune',
    },
    {
      name: 'Soaring Flight',

      effect: `
        You gain a 30 foot \\glossterm{fly speed} with a maximum height of 120 feet (see \\pcref{Flight}).
        Your \\glossterm{maneuverability} with this fly speed is poor (see \\pcref{Flying Maneuverability}).
      `,
      // narrative: '',
      rank: 7,
      type: 'Attune',
    },
    // -1 rank for stacking up creatures (bad against groups)
    {
      name: 'Wind Tunnel',

      attack: {
        crit: 'The target is pushed 30 feet instead.',
        hit: `
          Each target is \\glossterm{pushed} 15 feet in the direction the wind blows.
          Once a target leaves the area, it stops being pushed and blocks any other targets from being pushed.
        `,
        targeting: `
          You create a continuous blast of wind in a \\medarealong, 10 ft. wide line-shaped \\glossterm{zone} from you.
          The wind blows in a direction that you choose when you cast the spell.
          When you cast this spell, and during each subsequent \\glossterm{action phase}, make an attack vs. Fortitude against everything in the area.
        `,
      },
      // effect: '',
      // narrative: '',
      rank: 1,
      scaling: 'accuracy',
      tags: ['Sustain (minor)'],
    },
    {
      name: 'Intense Wind Tunnel',

      attack: {
        crit: 'The target is pushed 60 feet instead.',
        hit: `
          Each target is \\glossterm{pushed} 30 feet in the direction the wind blows.
          Once a target leaves the area, it stops being pushed and blocks any other targets from being pushed.
        `,
        targeting: `
          You create a continuous flow of wind in a \\largearealong, 10 ft. wide line-shaped \\glossterm{zone} from you.
          The wind blows in a direction that you choose when you cast the spell.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Fortitude against everything in the area.
        `,
      },
      // narrative: '',
      rank: 4,
      scaling: 'accuracy',
      tags: ['Sustain (minor)'],
    },
    {
      name: 'Windblade',

      effect: `
        Your melee \\glossterm{strikes} gain the \\weapontag{Long} weapon tag, allowing you to attack targets up to 10 feet away from you (see \\pcref{Weapon Tags}).
        Attacks that hit because of this extra range deal bludgeoning damage instead of any other damage types.
      `,
      // narrative: '',
      rank: 3,
      type: 'Attune',
    },
    {
      name: 'Retributive Winds',

      attack: {
        // crit: '',
        hit: `
          Each target takes 2d8 + half \\glossterm{power} bludgeoning damage.
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
      scaling: 'damage',
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

        You can control the general tendencies of the weather, such as the direction and intensity of the wind.
        You cannot control specific applications of the weather, such as the location of lightning strikes.
        Contradictory weather conditions are not possible simultaneously.

        After the spell's effect ends, the weather continues on its natural course, which may cause your chosen weather pattern to end.
        % TODO: This should be redundant with generic spell mechanics
        If another ability would magically manipulate the weather in the same area, the most recently used ability takes precedence.
      `,
      // narrative: '',
      rank: 4,
      type: 'Attune (deep)',
    },
    {
      name: 'Cyclone',

      attack: {
        // crit: '',
        hit: `
          Each target takes 2d6 \\add half \\glossterm{power} bludgeoning damage.
        `,
        targeting: `
          Make an attack vs. Reflex against everything in a \\medarea radius within \\medrange.
        `,
      },
      // narrative: '',
      rank: 4,
      scaling: 'damage',
    },
    {
      name: 'Massive Cyclone',

      attack: {
        // crit: '',
        hit: `
          Each target takes 4d6 \\add half \\glossterm{power} bludgeoning damage.
        `,
        targeting: `
          Make an attack vs. Reflex against everything in a \\largearea radius within \\distrange.
        `,
      },
      // narrative: '',
      rank: 7,
    },
    // 2 levels for push; normally, 30' push is r1, but clockwise is much worse than
    // towards/away, so it's closer to r0.5
    {
      name: 'Hurricane',

      attack: {
        // crit: '',
        hit: `
          Each target takes 2d10 \\add half \\glossterm{power} bludgeoning damage.
          In addition, each target is \\glossterm{pushed} 30 feet clockwise around you.
          Each target's final position should be the same distance from you as its starting position.
        `,
        targeting: `
          Make an attack vs. Fortitude against all \\glossterm{enemies} in a \\medarea radius from you.
        `,
      },
      // narrative: '',
      rank: 5,
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
          Make an attack vs. Reflex against one Small or smaller object within \\medrange.
          If the object is attended by a creature, the attack must also beat the attending creature's Fortitude and Reflex defenses.
          If it is held in two hands or well secured, this attack automatically fails.
        `,
      },
      // narrative: '',
      rank: 5,
      scaling: 'accuracy',
    },
    {
      name: 'Dust Cloud',

      effect: `
        You create a cloud of dust in a \\medarea radius \\glossterm{zone} within \\medrange from you.
        The cloud provides has \\glossterm{concealment} for everything in the area.
      `,
      // narrative: '',
      rank: 2,
      tags: ['Sustain (attuneable, minor)'],
      scaling: {
        4: 'You can choose to create a \\largearea radius instead.',
        6: 'You can choose to create a \\hugearea radius instead.',
      },
    },
    {
      name: 'Dust Storm',

      functionsLike: {
        name: 'dust cloud',
        exceptThat: 'you can move the cloud up to 15 feet at the end of each round.',
      },
      // narrative: '',
      rank: 4,
      scaling: {
        6: 'You can choose to create a \\largearea radius instead.',
      },
    },
    {
      name: 'Dust In The Eyes',

      attack: {
        hit: `
          The target is \\dazzled as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Reflex against one creature within \\longrange.
          If there is dirt, dust, or a collection of loose objects of similar size within 15 feet of the target's eyes, you gain a +2 accuracy bonus with this attack.
        `,
      },
      // narrative: '',
      rank: 2,
      scaling: 'accuracy',
    },
    {
      name: 'Dustblind',

      attack: {
        hit: `
          The target takes 2d10 physical damage.
          If it loses \\glossterm{hit points} from this damage, it is \\blinded as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Reflex against one creature within \\longrange.
          If there is dirt, dust, or a collection of loose objects of similar size within 15 feet of the target's eyes, you gain a +2 accuracy bonus with this attack.
        `,
      },
      // narrative: '',
      rank: 6,
      scaling: 'accuracy',
    },
    {
      name: 'Misty Step',

      effect: `
        You can move through creatures freely.
        This does not allow you to move through inanimate objects.
        In addition, you gain a 30 foot \\glossterm{glide speed}.
      `,
      narrative: `
        Your body is partially transformed into mist.
        This allows you to drift through enemies and even the air with ease.
      `,
      rank: 4,
      type: 'Attune',
    },
    {
      name: 'Airborne Jumper',

      effect: `
        If you are \\glossterm{trained} with the Jump skill, you gain a +3 \\glossterm{magic bonus} to it.
        Otherwise, you are treated as being \\glossterm{trained} in that skill.
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
      name: 'Wall of Wind',

      effect: `
        You create a \\medarea \\glossterm{wall} of wind within \\longrange.
        It does not block passage or significantly obstruct sight.
        However, ranged \\glossterm{strikes} that pass through the wall take a -4 accuracy penalty.

        After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
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
      type: 'Attune',
    },
    {
      name: 'Windburst',

      attack: {
        // crit: '',
        hit: `
          Each target takes 1d10 \\add half \\glossterm{power} bludgeoning damage.
        `,
        targeting: `
          Make an attack vs. Reflex against all \\glossterm{enemies} in a \\medarea radius from you.
        `,
      },
      // narrative: '',
      rank: 3,
      scaling: 'damage',
    },
    {
      name: 'Massive Windburst',

      attack: {
        // crit: '',
        hit: `
          Each target takes 4d8 \\add half \\glossterm{power} bludgeoning damage.
        `,
        targeting: `
          Make an attack vs. Reflex against all \\glossterm{enemies} in a \\hugearea radius from you.
        `,
      },
      // narrative: '',
      rank: 7,
      scaling: 'damage',
    },

    {
      name: 'Mistform',

      effect: `
        You \\glossterm{shapeshift} into a cloud of mist.
        You become \\trait{incorporeal}, but you cannot speak and have no \\glossterm{free hands}.
        You have a 20 foot \\glossterm{fly speed} with a 30 foot \\glossterm{height limit} and perfect \\glossterm{maneuverability} (see \\pcref{Flight}).
      `,
      rank: 5,
      tags: [],
      type: 'Sustain (standard)',
    },
  ],

  rituals: [
    {
      name: 'Air Bubble',

      castingTime: 'one minute',
      effect: `
        Choose any number of ritual participants.
        Each target gains the ability to breathe clear, clean air regardless of its surroundings.
        This can allow it to breathe underwater and avoid inhalation-based poisons.
      `,
      // narrative: '',
      rank: 4,
      type: 'Attune (target)',
    },
    {
      name: 'Gentle Descent',

      castingTime: 'one minute',
      effect: `
        Choose any number of ritual participants.
        Each target gains a 30 foot \\glossterm{glide speed}.
      `,
      // narrative: '',
      rank: 3,
      type: 'Attune (target)',
    },
    {
      name: 'Overland Flight',

      castingTime: 'one minute',
      effect: `
        Choose any number of ritual participants.
        Each target gains a 30 foot \\glossterm{fly speed} with a 30 foot \\glossterm{height limit} (see \\pcref{Flight}).
        If it takes any action other than movement or is dealt damage, this effect ends.
      `,
      // narrative: '',
      rank: 4,
      type: 'Attune (target)',
    },
    {
      name: 'Rapid Overland Flight',

      castingTime: 'one minute',
      effect: `
        Choose any number of ritual participants.
        Each target gains a 60 foot \\glossterm{fly speed} with a 30 foot \\glossterm{height limit} and poor \\glossterm{maneuverability} (see \\pcref{Flight}).
        If it takes any action other than movement or is dealt damage, this effect ends.
      `,
      // narrative: '',
      rank: 6,
      type: 'Attune (target)',
    },
    {
      name: 'Detect Air',

      castingTime: 'one minute',
      effect: `
        You learn the approximate distance and direction to any air within \\distrange of you.
        Since this is a \\abilitytag{Detection} ability, its range can penetrate some solid objects (see \\pcref{Detection}).
        This ritual can detect air pockets with a minimum size of Fine.
      `,
      // narrative: '',
      rank: 1,
      tags: ['Detection'],
    },
    {
      name: 'Distant Detect Air',

      castingTime: 'one minute',
      functionsLike: {
        exceptThat: 'the range increases to 2,000 feet.',
        name: 'detect air',
      },
      // narrative: '',
      rank: 4,
      tags: ['Detection'],
    },
  ],
};
