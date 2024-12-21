import { MysticSphere } from '.';

export const fabrication: MysticSphere = {
  name: 'Fabrication',
  hasImage: true,
  shortDescription: 'Create objects to damage and impair foes.',
  sources: ['arcane', 'divine', 'pact'],

  cantrips: [
    {
      name: 'Fabricate Trinket',

      effect: `
        You make a Craft check to create an object of Tiny size or smaller.
        The object appears in your hand or at your feet.
        It must be made of nonliving, nonmagical, nonreactive vegetable matter, such as wood or cloth.
        At the end of each round, this spell ends if you are not within \\medrange of the item.

        This spell lasts until you use it again or until you \\glossterm{dismiss} it.
      `,
      scaling: {
        2: `The maximum size of the object increases to Small.`,
        4: `The maximum size of the object increases to Medium.`,
        6: `The maximum size of the object increases to Large.`,
      },
      tags: ['Manifestation'],
    },

    {
      name: 'Forge',

      effect: `
        You can create any one weapon, shield, or body armor that you are proficient with.
        It is sized appropriately for you, up to a maximum of a Medium size item.
        The item appears in your hand or on the ground at your feet.

        If you create body armor or a weapon, it can be created from any special material other than cold iron, dragonscale, and dragonhide.
        The item's rank cannot exceed your spellcasting rank with this spell.

        Unlike normal \\abilitytag{Attune} spells, you can attune to this spell any number of times, creating a different item each time.
        A \\glossterm{difficulty value} 5 Knowledge (items) or relevant Craft check reveals that the item is a magical fabrication rather than an ordinary item.
        If you spend ten consecutive minutes without \\glossterm{line of effect} to the item, your attunement to that item ends and it disappears.
      `,
      tags: ['Manifestation'],
      type: 'Attune',
    },
  ],
  spells: [
    {
      name: 'Desperate Shieldwall',

      effect: `
        Whenever you use the \ability{total defense} or \ability{recover} ability, you can activate this ability.
        If you do, you create a wall of indestructible shields around you.
        This grants you a \plus2 bonus to your Armor defense and \\glossterm{cover} for the rest of the round.
        After that time, your attunement to this effect ends.
        This is a \atSwift effect, so it protects you from attacks during the current phase.
      `,
      rank: 1,
      tags: ['Manifestation'],
      type: 'Attune',
    },
    {
      name: 'Instant Shield',

      effect: `
        As a \\glossterm{minor action}, you can create a shield that you are proficient with in one \\glossterm{free hand}.
        The shield can be a buckler, standard shield, or tower shield.
        It is automatically strapped to your arm, allowing you to use it immediately.
        This is a \atSwift effect, so the shield protects you from attacks during the current phase.
        The shield automatically disappears at the end of the round, but you can summon it again in future rounds.
      `,
      rank: 1,
      tags: ['Manifestation'],
      type: 'Attune',
    },
    {
      name: 'Instant Copy',

      effect: `
        Choose one Small or smaller object within \medrange.
        You create a nonmagical copy of that item that appears in your hands or at your feet.
        Make a Craft check with a \plus5 bonus to determine how closely the appearance and function of the copy matches the original.
        The copy is always \\glossterm{mundane}, even if the original was magical.
        It may appear to be made of a special material such as adamantine, but functions as if it was made of an ordinary material like wood or iron.
        The copy lasts as long as you stay attuned to this effect.
      `,
      rank: 2,
      tags: ['Manifestation'],
      type: 'Attune',
    },
    {
      name: 'Hidden Copy',

      functionsLike: {
        name: "instant copy",
        exceptThat: "the copy can appear in your backpack, or some other small personal storage you are touching.",
      },
      rank: 5,
      tags: ['Manifestation'],
      type: 'Attune',
    },
    {
      name: 'Mystic Forge',

      // TODO: unclear rank
      functionsLike: {
        name: 'forge',
        exceptThat: `
          the item you create is magical, but cannot be made from any special material.
          When you learn this spell, you choose a single magic weapon or armor property with a rank no higher than your spellcasting rank with this spell.
          If you create an item that the property can be applied to, the item has that property.
          Whenever your spellcasting rank with this spell increases, you can choose a new magic property.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Attune'],
    },
    {
      name: 'Mystic Blast Arrow',

      attack: {
        hit: `
          \\damageranktwo.
          If the target is Large or smaller and loses \\glossterm{hit points} from this damage, it is knocked \\prone.
        `,
        targeting: `
          Make an attack vs. Armor against anything within \\longrange.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Mystic Artillery',

      attack: {
        hit: `
          \\damagerankone.
        `,
        targeting: `
          When you cast this spell, you create a ballista bolt in midair within your space and choose a target within \\longrange.
          During your next action, if that target is still within \\longrange, make an attack vs. Armor against it.
          Otherwise, the bolt disappears and this spell is wasted.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Mighty Mystic Artillery',

      functionsLike: {
        name: 'mystic artillery',
        exceptThat: 'the damage increases to \\damagerankfour.',
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: "Executioner's Axe",

      // Melee single-target attack would normally be d4. Drop to d3h for multitarget.
      attack: {
        hit: `
          \\damagerankthree.
        `,
        missGlance: false,
        targeting: `
          When you cast this spell, you create a greataxe in midair within your space.
          During your next action, make an attack vs. Armor with the axe against up to two targets adjacent to you.
        `,
      },
      rank: 2,
      tags: ['Manifestation'],
    },

    {
      name: "Mighty Executioner's Axe",

      functionsLike: {
        name: "executioner's axe",
        exceptThat: "the damage increases to \\damagerankseven.",
      },
      rank: 6,
      tags: ['Manifestation'],
    },

    {
      name: 'Whirlwind of Blades',

      attack: {
        hit: `\\damagerankone.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor against all \\glossterm{enemies} adjacent to you.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Mighty Whirlwind of Blades',

      attack: {
        hit: `\\damagerankfour.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor against all \\glossterm{enemies} adjacent to you.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Rain of Arrows',

      attack: {
        hit: `
          \\damagerankone.
        `,
        missGlance: true,
        targeting: `
          You create a rain of arrows in a \\smallarea radius \\glossterm{zone} within \\medrange.
          When you cast this spell, and during your next action, make an attack vs. Armor against everything in the area.
          This attack does not damage thin \\glossterm{walls} in the area.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Massive Rain of Arrows',

      attack: {
        hit: `
          \\damagerankfour.
        `,
        missGlance: true,
        targeting: `
          You create a rain of arrows in a \\medarea radius \\glossterm{zone} within \\longrange.
          When you cast this spell, and during your next action, make an attack vs. Armor against everything in the area.
          This attack does not damage thin \\glossterm{walls} in the area.
        `,
      },
      rank: 7,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Blade Barrier',

      attack: {
        hit: `\\damagerankone.`,
        missGlance: true,
        targeting: `
          You create a \\medarealong \\glossterm{wall} of whirling blades within \\medrange.
          The wall provides \\glossterm{cover} against attacks made through it, though it takes no damage from attacks that hit it.
          Whenever anything passes through the wall, you make a \\glossterm{reactive attack} vs. Reflex against it.
          In addition, when you cast this spell and during each of your subsequent actions, make an attack vs. Reflex against any creature currently sharing space with it.
          Generally, this is only possible for Large or larger creatures.
          You can only attack a given target with this spell once per \\glossterm{phase}.

          After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Mighty Blade Barrier',

      functionsLike: {
        exceptThat: `
          the damage increases to \\damagerankfive.
        `,
        name: 'blade barrier',
      },
      rank: 6,
      scaling: 'accuracy',
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Blade Perimeter',

      functionsLike: {
        exceptThat: `
          the area changes to a \\medarea radius \\glossterm{wall}.
          In addition, the damage increases to \\damageranktwo.
        `,
        name: 'blade barrier',
      },
      rank: 3,
      scaling: 'accuracy',
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Personal Weapon',

      effect: `
        Choose a type of weapon that you are proficient with.
        You create a normal item of that type in your hand.
        If the item stops touching you, it disappears, and this effect ends.

        If you create a \\weapontag{Projectile} weapon, it is created in an unloaded state.
        Loading the weapon takes the normal amount of time, though you can load it by creating projectiles out of thin air rather than using regular projectiles.
        The projectiles disappear after the attack is complete.
        Any \\glossterm{strikes} that you make with a weapon created with this ability are \\magical abilities, so you use your your \\glossterm{magical power} to determine your damage instead of your \\glossterm{mundane power} (see \\pcref{Power}).

        % Strange duration for a spell
        This spell lasts until you use it again or until you \\glossterm{dismiss} it.
      `,
      rank: 1,
      tags: ['Manifestation'],
    },

    {
      name: 'Web',

      effect: `
        You fill a \\smallarea radius \\glossterm{zone} within \\medrange with webs.
        The webs make the area \\glossterm{difficult terrain}.
        The web has \\glossterm{hit points} equal to three times your \\glossterm{power}, and all of its defenses are 0.
      `,
      rank: 3,
      scaling: {
        5: "The web's hit points increase to four times your power.",
        7: "The web's hit points increase to five times your power.",
      },
      tags: ['Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Caltrops',

      attack: {
        hit: `\\damagerankone.`,
        targeting: `
          You create exceptionally sharp caltrops in up to three unoccupied squares on solid ground within \\medrange.
          Whenever a creature moves into any of the squares, unless the creature moves at half speed to avoid the danger, you make a \\glossterm{reactive attack} vs. Armor against them.
          You cannot make this attack against the same creature more than once per \\glossterm{phase}.
          Unlike most attacks, this attack can happen during the \\glossterm{movement phase}.
          Caltrops may not be effective against creatures with an unusual anatomy.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Mighty Caltrops',

      functionsLike: {
        name: 'caltrops',
        exceptThat: 'the damage increases to \\damagerankfour.',
      },
      rank: 5,
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Instant Arrow',

      castingTime: 'minor action',
      effect: `
        This spell has no \\glossterm{somatic components} or \\glossterm{verbal components}.

        You create an arrow in a bow that you are holding.
        You can create special ammunition of any type that you are proficient with.
        However, the item's rank cannot exceed half your spellcasting rank with this spell.

        The object persists until the end of the round, at which point it disappears.
        Any attack with this ammunition is considered a \\magical attack, so you use your \\glossterm{magical power} to determine your damage instead of your \\glossterm{mundane power} (see \\pcref{Power}).
      `,
      rank: 1,
      tags: ['Manifestation'],
    },

    {
      name: 'Dagger Cloud',

      attack: {
        hit: `\\damagerankone.`,
        targeting: `
          When you cast this spell, a cloud of flying daggers appears in a \\tinyarea radius \\glossterm{zone} within \\shortrange.
          Whenever anything passes through the cloud, you make a \\glossterm{reactive attack} vs. Armor against it.
          In addition, when you cast this spell and during each of your subsequent actions, make an attack vs. Armor against each creature in the area.
          You can only attack a given target with this spell once per \\glossterm{phase}.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
      type: 'Sustain (minor)',
      tags: ['Manifestation'],
    },
    {
      name: 'Blade Cloud',

      attack: {
        hit: `\\damagerankfour.`,
        targeting: `
          When you cast this spell, a cloud of flying swords appears in a \\smallarea radius \\glossterm{zone} within \\medrange.
          Whenever anything passes through the cloud, you make a \\glossterm{reactive attack} vs. Armor against it.
          In addition, when you cast this spell and during each of your subsequent actions, make an attack vs. Armor against each creature in the area.
          You can only attack a given target with this spell once per \\glossterm{phase}.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
      type: 'Sustain (minor)',
      tags: ['Manifestation'],
    },
    {
      name: 'Daggerswarm',

      attack: {
        hit: `\\damagerankthree.`,
        targeting: `
          When you cast this spell, a small swarm of daggers appears floating over your head.
          As a \\glossterm{minor action}, you can fling one dagger at a creature or object within \\shortrange.
          When you do, make an attack vs. Armor with a -2 accuracy penalty against that target.
          After the dagger deals damage, it disappears and another dagger appears in the swarm.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
      type: 'Attune (deep)',
    },

    {
      name: 'Grease',

      attack: {
        hit: `Each target falls \\prone.`,
        targeting: `
          Make an attack vs. Reflex against all Large or smaller \\glossterm{grounded} creatures in a \\smallarea radius within \\shortrange.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Oil Slick',

      attack: {
        hit: `
          Each target falls \\prone, and is \\glossterm{briefly} \\glossterm{vulnerable} to fire damage.
          This vulnerability ends for a target if it takes fire damage.
        `,
        targeting: `
          Make an attack vs. Reflex against everything that is Large or smaller and \\glossterm{grounded} in a \\smallarea radius within \\shortrange.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Protective Cage',

      effect: `
        Choose yourself or one Large or smaller \\glossterm{ally} within \\medrange.
        You create a metal cage around the target in its space.
        The cage has a 2 inch gap between its bars, allowing the target to see and be seen by creatures outside of the cage.
        This does not block \\glossterm{line of sight} or \\glossterm{line of effect}, but it provides cover.
        % TODO: clarify that you can't create two cages around the same target
        % simultaneously
        If another creature is in the target's space when this spell is cast, this spell fails without effect.

        The field has \\glossterm{hit points} equal to three times your \\glossterm{power}.
        After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
      `,
      rank: 3,
      scaling: {
        5: `The field's \\glossterm{hit points} increase to four times your power.`,
        7: `The field's \\glossterm{hit points} increase to five times your power.`,
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Instant Weapon',

      effect: `
        This spell has no \\glossterm{somatic components}.

        You create a nonmagical weapon that you are proficient with your hand or hands.
        The weapon can be made of any special material other than cold iron.
        Its rank cannot exceed your spellcasting rank with this spell.

        After the weapon appears, you can immediately make a \\glossterm{strike} with that weapon.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
        If you create a \\weapontag{Projectile} weapon that is not from the crossbow weapon group, you also create ammunition necessary for you to attack with.
        After you make the strike, the weapon disappears.
      `,
      rank: 2,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Instant Magic Weapon',

      functionsLike: {
        name: 'instant weapon',
        exceptThat: `
          the weapon you create is magical.
          When you learn this spell, you choose a single magic weapon property with a rank no higher than your spellcasting rank with this spell.
          The weapon has that property.
          Whenever your spellcasting rank with this spell increases, you can choose a new magic weapon property.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Mirror Barrier',

      functionsLike: {
        exceptThat: `
          it reflects \\glossterm{mundane} attacks against it.
            The barrier's defenses become equal to 6 \\add half your level.
            Whenever a creature misses or \\glossterm{glances} the barrier with a \\glossterm{mundane} attack, it scores a \\glossterm{glancing blow} with that attack against itself.
        `,
        name: 'mystic barrier',
      },
      rank: 4,
      scaling: {
        6: `You can choose to create a \\medarealong wall instead.`,
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Greater Mirror Barrier',

      functionsLike: {
        exceptThat: `
          it reflects \\glossterm{mundane} attacks against it.
            The barrier's defenses become equal to 9 \\add half your level, and the hit points of each 5-ft. square increase to three times your \\glossterm{power}.
            Whenever a creature misses or \\glossterm{glances} the barrier with a \\glossterm{mundane} attack, it scores a \\glossterm{glancing blow} with that attack against itself.
        `,
        name: 'mystic barrier',
      },
      rank: 7,
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Visual Barrier',

      functionsLike: {
        exceptThat: `
          you can choose the visibility of the barrier.
            There are three possibilities: fully \\glossterm{invisible}, barely visible like a normal \\spell{mystic barrier}, and visible as a deep black that completely blocks sight.
            You can change the opacity of the barrier as part of the action you use to sustain this spell, or as a \\glossterm{minor action} if you attune to this spell.
        `,
        name: 'mystic barrier',
      },
      rank: 2,
      scaling: {
        4: 'You can choose to create a \\medarealong wall instead.',
        6: 'You can choose to create a \\largearealong wall instead.',
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Sonic Barrier',

      functionsLike: {
        exceptThat: `
          you can choose whether the barrier blocks sound.
          You can change whether the barrier blocks sound as part of the action you use to sustain this spell, or as a \\glossterm{minor action} if you attune to this spell.

          Both types of barrier still block \\glossterm{line of effect} for effects that deal bludgeoning damage, even if they narratively come from a sound or voice.
          If the barrier does not block sound, the sound or voice can be heard on the other side at a non-damaging volume, but the attack still damages the barrier instead of anything on the other side.
        `,
        name: 'mystic barrier',
      },
      rank: 2,
      scaling: {
        4: 'You can choose to create a \\medarealong wall instead.',
        6: 'You can choose to create a \\largearealong wall instead.',
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Forceful Barrier',

      functionsLike: {
        exceptThat: `
          it breaks objects in its area that obstruct its path.
          Each object in the path of the wall takes \\damagerankthree.
          Any object destroyed in this way does not block the barrier's area of effect.
          This does no damage to creatures, who block the path of the barrier like normal.
        `,
        name: 'mystic barrier',
      },
      rank: 3,
      scaling: {
        5: 'You can choose to create a \\medarealong wall instead.',
        7: 'You can choose to create a \\largearealong wall instead.',
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Mystic Barrier',

      effect: `
        You create a \\smallarealong \\glossterm{wall} of magical energy within \\medrange.
        The wall is visible as a shimmering magical membrane that does not block sight.
        Nothing can pass through the wall until it is destroyed.

        The wall has \\glossterm{hit points} equal to three times your \\glossterm{power}.
        After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
      `,
      rank: 1,
      scaling: {
        3: 'You can choose to create a \\medarealong wall instead.',
        5: 'You can choose to create a \\largearealong wall instead.',
        7: 'You can choose to create a \\hugearealong wall instead.',
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Mystic Bridge',

      functionsLike: {
        exceptThat: `
          the wall is aligned horizontally instead of vertically.
        `,
        name: 'mystic barrier',
      },
      rank: 2,
      scaling: {
        4: 'You can choose to create a \\medarealong wall instead.',
        6: 'You can choose to create a \\largearealong wall instead.',
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Sturdy Barrier',

      functionsLike: {
        exceptThat: `
          the wall has \\glossterm{hit points} equal to four times your \\glossterm{power} instead of three times your power.
        `,
        name: 'mystic barrier',
      },
      rank: 3,
      scaling: {
        5: 'You can choose to create a \\medarealong wall instead.',
        7: 'You can choose to create a \\largearealong wall instead.',
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Personal Sphere',

      effect: `
        You create a sphere of magical energy around yourself.
        The sphere is visible as a shimmering magical membrane that does not block sight.
        Nothing can pass through the field until it is destroyed.
        This prevents you from having \\glossterm{line of effect} to anything outside of the area.
        When you move using one of your movement speeds, the sphere moves with you, though you cannot force it against another creature or object.

        The field as a whole has \\glossterm{hit points} equal to three times your \\glossterm{power}.
        After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
      `,
      rank: 6,
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Entrapping Sphere',

      attack: {
        crit: "The sphere's \\glossterm{hit points} are doubled.",
        hit: `
          A sphere of magical energy appears around the target in its space.
          The sphere is visible as a shimmering magical membrane that does not block sight.
          Nothing can pass through the sphere until it is destroyed.
          This prevents the target from having \\glossterm{line of effect} to anything outside of the area.
          If another creature is in the target's space when this spell is cast, this spell fails without effect.

          The field as a whole has \\glossterm{hit points} equal to twice your power.
          After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
        `,
        targeting: `
          Make an attack vs. Reflex against anything Large or smaller within \\medrange.
        `,
      },
      rank: 7,
      // scaling: "accuracy",
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Invulnerable Barrier',

      functionsLike: {
        exceptThat: `
          the wall's defenses are each equal to 6 + your level, and it is \\trait{impervious} to physical damage.
          In addition, the wall's \\glossterm{hit points} increase to four times your \\glossterm{power}.
        `,
        name: 'mystic barrier',
      },
      rank: 5,
      scaling: {
        7: 'You can choose to create a \\medarealong wall instead.',
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Shrapnel Grenade',

      attack: {
        hit: `
          \\damagerankthree.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor and Reflex against everything within a \\smallarea radius in \\shortrange.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },
    {
      name: 'Mighty Shrapnel Grenade',

      attack: {
        hit: `
          \\damageranksix.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor and Reflex against everything within a \\smallarea radius in \\shortrange.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },
    // TODO: may not be within sphere's narrative scope
    {
      name: 'Powderkeg',

      attack: {
        hit: `
          \\damagerankthree.
        `,
        missGlance: true,
        targeting: `
          You create a powderkeg on the ground within \\shortrange.
          The powderkeg has 10 hit points, and it automatically takes 5 physical damage whenever you sustain this spell.
          It explodes when it reaches 0 hit points, or when it takes any fire damage.
          When it explodes, make an attack vs. Armor and Reflex against everything within a \\medarea radius of it.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
      tags: ['Fire', 'Manifestation', 'Sustain (minor)'],
    },
  ],
  rituals: [
    {
      name: 'Ritual Forge',

      castingTime: 'one hour',
      functionsLike: {
        abilityType: "cantrip",
        name: "forge",
        exceptThat: `
          any ritual participant can attune to the effect.
          That participant must maintain proximity to the item to prevent it from disappearing.
        `,
      },
      rank: 1,
      tags: ['Manifestation'],
      type: 'Attune',
    },
    {
      name: 'Manifest Object',

      castingTime: 'one hour',
      effect: `
        Make a Craft check to create an object of Small size or smaller.
        The object appears out of thin air in your hand or in one unoccupied square on solid ground within \\shortrange.
        % TODO: add ability to create objects of other sizes/materials
        It must be made of nonliving, nonmagical, nonreactive vegetable matter, such as wood or cloth.
      `,
      rank: 3,
      tags: ['Manifestation'],
      type: 'Attune',
    },

    {
      name: 'Fabricate Water',

      castingTime: 'one minute',
      effect: `
        You create up to two gallons of wholesome, drinkable water at any number of locations within \\shortrange, allowing you to fill multiple small water containers.
        You must create a minimum of one ounce of water in each location.
      `,
      rank: 1,
      tags: ['Creation', 'Water'],
    },

    {
      name: 'Fabricate Sustenance',

      castingTime: 'one hour',
      effect: `
        This ritual creates food and drink in one unoccupied square within \\shortrange that is sufficient to sustain five Medium creatures for 24 hours.
        It also creates basic receptacles to hold the food and drink.
        The food that this ritual creates is simple fare of your choice -- highly nourishing, if rather bland.
      `,
      rank: 2,
      tags: ['Creation', 'Water'],
    },

    {
      name: 'Fabricate Feast',

      castingTime: 'one hour',
      effect: `
        This ritual creates food and drink in any number of unoccupied squares within \\shortrange that is sufficient to sustain twenty Medium creatures for 24 hours.
        It also creates basic receptacles to hold the food and drink.
        The food that this ritual creates is simple fare of your choice -- highly nourishing, if rather bland.
      `,
      rank: 3,
      tags: ['Creation', 'Water'],
    },

    {
      name: 'Copy Writing',

      castingTime: 'special',
      effect: `
        You copy the writing from one Small or smaller written work within \\shortrange to a Small or smaller set of blank pages within \\shortrange.
        The blank pages must have enough room for the original writing.
        This ritual takes half the time required to copy the writing by hand, to a minimum of one minute, and does not require writing materials.
        It requires one \\glossterm{fatigue level} from its participants.
      `,
      rank: 1,
    },

    {
      name: 'Greater Copy Writing',

      castingTime: 'special',
      functionsLike: {
        exceptThat: `
          it can target objects of Medium or smaller size.
          In addition, the time required to perform this ritual decreases to one tenth of the time required to copy the writing by hand, to a minimum of one minute.
          It requires one \\glossterm{fatigue level} from its participants.
        `,
        name: 'copy writing',
      },
      rank: 4,
    },

    {
      name: 'Ammunition Stockpile',

      castingTime: 'one hour',
      effect: `
        You create a Large pile of either nonmagical arrows or crossbow bolts in any unoccupied location on solid ground adjacent to you.
        You can choose to create blunted ammunition, but you cannot create other forms of special ammunition like fire arrows or repeating bolts.
        Any creature may take ammunition from the pile to use.
      `,
      rank: 3,
      tags: ['Manifestation'],
      type: 'Attune',
    },
    {
      name: 'Tiny Hut',

      castingTime: 'one minute',
      effect: `
        You create a permeable barrier around a \\smallarea radius \\glossterm{zone} from your location.
        The barrier is visible as a shimmering magical membrane that does not block sight.
        As a standard action, a creature can move five feet from outside the hut to inside the hut, or vice versa.
        However, the hut blocks \\glossterm{line of effect} for all other purposes.
        The barrier has \\glossterm{hit points} equal to three times your \\glossterm{power}.

        If you leave the zone, this effect ends.
      `,
      // narrative: '',
      rank: 2,
      tags: ['Manifestation'],
      type: 'Attune',
    },
  ],
};
