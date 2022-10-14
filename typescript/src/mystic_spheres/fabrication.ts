import { MysticSphere } from ".";

export const fabrication: MysticSphere = {
  name: "Fabrication",
  shortDescription: "Create objects to damage and impair foes.",
  sources: ["arcane", "divine", "pact"],

  cantrips: [
    {
      name: "Fabricate Trinket",

      effect: `
        You make a Craft check to create an object of Tiny size or smaller.
        The object appears in your hand or at your feet.
        It must be made of nonliving, nonmagical, nonreactive vegetable matter, such as wood or cloth.
        At the end of each round, this spell ends if you are not within \\medrange of the item.

        This spell lasts until you use it again or until you \\glossterm{dismiss} it as a \\glossterm{free action}.
      `,
      scaling: {
        2: `The maximum size of the object increases to Small.`,
        4: `The maximum size of the object increases to Medium.`,
        6: `The maximum size of the object increases to Large.`,
      },
      tags: ["Manifestation"],
    },
  ],
  spells: [
    {
      name: "Mystic Arrow",

      attack: {
        hit: `The target takes 1d10 + \\glossterm{power} piercing damage.`,
        targeting: `
        Make an attack vs. Armor against anything within \\longrange.
        `,
      },
      rank: 2,
      scaling: "damage",
      tags: ["Manifestation"],
    },

    {
      name: "Mystic Artillery",

      attack: {
        hit: `The target takes 4d6 + \\glossterm{power} piercing damage.`,
        targeting: `
          Make an attack vs. Armor with a +1 accuracy bonus against anything within \\extrange.
        `,
      },
      rank: 6,
      tags: ["Manifestation"],
    },

    {
      name: "Mystic Blast Arrow",

      attack: {
        hit: `
          The target takes 2d8 + \\glossterm{power} piercing damage.
          If it loses \\glossterm{hit points} from this damage, it is knocked \\prone.
        `,
        targeting: `
          Make an attack vs. Armor against anything within \\longrange.
        `,
      },
      rank: 4,
      scaling: "damage",
      tags: ["Manifestation"],
    },

    {
      name: "Bladestorm",

      attack: {
        hit: `Each target takes 1d10 + half \\glossterm{power} slashing damage.`,
        targeting: `
          Make an attack vs. Armor against all \\glossterm{enemies} adjacent to you.
        `,
      },
      rank: 3,
      scaling: "damage",
      tags: ["Manifestation"],
    },

    {
      name: "Greater Bladestorm",

      functionsLike: {
        name: "bladestorm",
        exceptThat: "the damage increases to 4d8 + \\glossterm{power}.",
      },
      rank: 7,
      scaling: "damage",
      tags: ["Manifestation"],
    },

    {
      name: "Missile Storm",

      attack: {
        hit: `Each target takes 2d6 + half \\glossterm{power} piercing damage.`,
        targeting: `
          Make an attack vs. Armor against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      rank: 4,
      scaling: "damage",
      tags: ["Manifestation"],
    },

    {
      name: "Greater Missile Storm",

      attack: {
        hit: `Each target takes 2d10 + half \\glossterm{power} piercing damage.`,
        targeting: `
          Make an attack vs. Armor against all \\glossterm{enemies} in a \\hugearea radius from you.
        `,
      },
      rank: 6,
      scaling: "damage",
      tags: ["Manifestation"],
    },

    {
      name: "Hail of Arrows",

      attack: {
        hit: `Each target takes 1d10 + half \\glossterm{power} piercing damage.`,
        targeting: `
          Make an attack vs. Armor against everything in a \\smallarea radius within \\medrange.
        `,
      },
      rank: 3,
      scaling: "damage",
      tags: ["Manifestation"],
    },

    {
      name: "Greater Hail of Arrows",

      functionsLike: {
        name: "hail of arrows",
        exceptThat: "the damage increases to 4d8 + \\glossterm{power}.",
      },
      rank: 7,
      scaling: "damage",
      tags: ["Manifestation"],
    },

    {
      name: "Blade Barrier",

      attack: {
        hit: `The target takes 1d8 + half \\glossterm{power} slashing damage.`,
        targeting: `
          You create a \\medarealong \\glossterm{wall} of whirling blades wihtin \\medrange.
          The wall provides \\glossterm{cover} against attacks made through it.
          Whenever anything passes through the wall, make a \\glossterm{reactive attack} vs. Armor against it.
          You can only make this attack against a given target once per \\glossterm{phase}.

          The wall has \\glossterm{hit points} equal to three times your \\glossterm{power}.
          After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
        `,
      },
      rank: 2,
      scaling: "damage",
      tags: ["Barrier", "Manifestation"],
      type: "Sustain (attuneable, minor)",
    },

    {
      name: "Greater Blade Barrier",

      functionsLike: {
        exceptThat: `
          the damage increases to 2d8 + half \\glossterm{power}.
          In addition, the area increases to a \\largearealong wall.
        `,
        name: 'blade barrier',
      },
      rank: 5,
      scaling: "damage",
      tags: ["Barrier", "Manifestation"],
      type: "Sustain (attuneable, minor)",
    },

    {
      name: "Blade Perimeter",

      attack: {
        hit: `The target takes 1d10 + half \\glossterm{power} slashing damage.`,
        targeting: `
        You create a \\smallarea radius \\glossterm{wall} of blades within \\medrange.
        The wall provides \\glossterm{cover} against attacks made through it.
        Whenever anything passes through the wall, make a \\glossterm{reactive attack} vs. Armor against it.
        You can only make this attack against a given target once per \\glossterm{phase}.

        The wall has \\glossterm{hit points} equal to three times your \\glossterm{power}.
        After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
        `,
      },
      rank: 3,
      scaling: "damage",
      tags: ["Barrier", "Manifestation"],
      type: "Sustain (attuneable, minor)",
    },

    {
      name: "Contracting Blade Perimeter",

      functionsLike: {
        exceptThat: `
          the damage is increased to 2d10 plus half your \\glossterm{power}.
          % TODO: Clarify interaction with solid obstacles that block contraction?
          In addition, the wall's radius shrinks by 5 feet during each subsequent \\glossterm{action phase}, dealing damage to everything it moves through.
          After the wall shrinks to have no radius, it begins expanding again at a rate of 5 feet per round.
          Once it expands back to its maximum radius, it begins shrinking again.
        `,
        name: "blade perimeter",
      },
      rank: 6,
      scaling: "damage",
      tags: ["Barrier", "Manifestation"],
      type: "Sustain (attuneable, minor)",
    },

    {
      name: "Personal Weapon",

      effect: `
        Choose a type of weapon that you are proficient with.
        You create a normal item of that type in your hand.
        If the item stops touching you, it disappears, and this effect ends.

        If you create a non-crossbow projectile weapon, you can fire it without ammunition by creating projectiles as you fire.
        The projectiles disappear after the attack is complete.
        Any \\glossterm{strikes} that you make with a weapon created with this ability are \\glossterm{magical} abilities, so you use your your Willpower to determine your damage instead of your Strength (see \\pcref{Dice Bonuses From Attributes}).

        % Strange duration for a spell
        This spell lasts until you use it again or until you \\glossterm{dismiss} it as a \\glossterm{free action}.
      `,
      rank: 1,
      scaling: {
        3: `You gain a +2 \\glossterm{magic bonus} to \\glossterm{power} while you wield the weapon.`,
        5: `The power bonus increases to +4.`,
        7: `The power bonus increases to +8.`,
      },
      tags: ["Manifestation"],
    },

    {
      name: "Forge",

      effect: `
        This spell creates one or two weapons, suits of body armor, or shields.
        You can create any weapon, shield, or body armor that you are proficient with.
        It is sized appropriately for you, up to a maximum of a Medium size item.
        The items appear in your hand or on the ground at your feet.

        If you create body armor or a weapon, it can be created from any special material other than cold iron.
        The item's rank cannot exceed your spellcasting rank with this spell, including any modifiers from special materials.
      `,
      rank: 1,
      tags: ['Manifestation'],
      type: "Attune",
    },

    {
      name: "Meteor",

      attack: {
        hit: `Each target takes 2d8 + half \\glossterm{power} bludgeoning and fire damage.`,
        targeting: `
          You create a meteor in midair within \\medrange that falls to the ground, crushing foes in its path.
          The meteor takes up a \\smallarea radius, and must be created in unoccupied space.
          After being summoned, it falls up to 100 feet before disappearing.
          Make an attack vs. Armor against everything in its path.
        `,
      },
      rank: 5,
      scaling: "damage",
      tags: ["Manifestation"],
    },

    {
      name: "Web",

      attack: {
        crit: `Each secondary target is \\immobilized instead of slowed.`,
        hit: `Each secondary target is \\slowed as long as it has webbing from this ability in its space.`,
        targeting: `
          You fill a \\smallarea radius \\glossterm{zone} within \\shortrange with webs.
          The webs make the area \\glossterm{difficult terrain}.
          The web has \\glossterm{hit points} equal to three times your \\glossterm{power}, and all of its defenses are 0.

          In addition, make an attack vs. Reflex against all Large or smaller creatures in the area.
          Whenever a creature enters the area, you make the same attack against it.
        `,
      },

      rank: 4,
      scaling: "accuracy",
      tags: ["Manifestation"],
      type: "Sustain (attuneable, minor)",
    },

    {
      name: "Caltrops",

      attack: {
        hit: `The target takes 1d6 + half \\glossterm{power} piercing damage.`,
        targeting: `
          You create exceptionally sharp caltrops in up to three unoccupied squares on solid ground within \\medrange.
          Whenever a creature moves into any of the squares, unless the creature moves at one quarter speed to avoid the danger, you make a \\glossterm{reactive attack} vs. Armor against them.
          You cannot make this attack against the same creature more than once per \\glossterm{phase}.
          Unlike most attacks, this attack can happen during the \\glossterm{movement phase}.
          Caltrops may not be effective against creatures with an unusual anatomy.
        `,
      },
      rank: 1,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Sustain (attuneable, minor)",
    },

    {
      name: "Greater Caltrops",

      functionsLike: {
        name: 'caltrops',
        exceptThat: "the damage increases to 2d10 + \\glossterm{power}.",
      },
      rank: 5,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Sustain (attuneable, minor)",
    },

    {
      name: "Instant Arrow",

      castingTime: "minor action",
      effect: `
        This spell has no \\glossterm{somatic components} or \\glossterm{verbal components}.

        You create an arrow in a bow that you are holding.
        You can create special ammunition of any type that you are proficient with.
        However, the item's rank cannot exceed half your spellcasting rank with this spell.

        The object persists until the end of the round, at which point it disappears.
        Any attack with this ammunition is considered a \\glossterm{magical} attack, so you use your Willpower to determine your damage instead of your Strength (see \\pcref{Dice Bonuses From Attributes}).
      `,
      rank: 1,
      tags: ["Manifestation"],
    },

    {
      name: "Daggerswarm",

      attack: {
        hit: `The target takes 2d8 piercing damage.`,
        targeting: `
          When you cast this spell, a small swarm of daggers appears floating over your head.
          As a \\glossterm{minor action}, you can fling one dagger at a creature or object within \\shortrange.
          When you do, make an attack vs. Armor against that target.
          After the dagger deals damage, it disappears and another dagger appears in the swarm.
        `,
      },
      rank: 4,
      scaling: "damage",
      type: "Attune (deep)",
    },

    {
      name: "Greater Daggerswarm",

      functionsLike: {
        name: "daggerswarm",
        exceptThat: `
          the damage increases to 4d10, and the range increases to \\medrange.
        `,
      },
      rank: 7,
      scaling: "damage",
      type: "Attune (deep)",
    },

    {
      name: "Daggercloud",

      attack: {
        hit: `Each target takes 2d6 + half \\glossterm{power} piercing damage.`,
        targeting: `
          A swarm of daggers appears in a \\tinyarea radius \\glossterm{zone} within \\medrange.
          Make an attack vs. Armor with a +2 accuracy bonus against everything in the area immediately and during each subsequent \\glossterm{action phase}.
        `,
      },
      rank: 5,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Sustain (attuneable, minor)",
    },

    {
      name: "Grease",

      attack: {
        crit: `
          Each target is also unable to stand up as a \\glossterm{condition}.
          If it is somehow brought into a standing position, it will immediately fall and become prone again.
        `,
        // No relevant glance effect
        hit: `Each target falls \\prone.`,
        targeting: `
          Make an attack vs. Reflex against all Large or smaller creatures in a \\smallarea radius within \\medrange.
        `,
      },
      rank: 3,
      scaling: "accuracy",
      tags: ["Manifestation"],
    },

    {
      name: "Oil Slick",

      attack: {
        crit: `
          Each target is also unable to stand up as a \\glossterm{condition}.
          If it is somehow brought into a standing position, it will immediately fall and become prone again.
        `,
        hit: `
          Each target falls \\prone, and is \\glossterm{briefly} \\glossterm{vulnerable} to fire damage.
        `,
        targeting: `
          Make an attack vs. Reflex against everything in a \\smallarea radius within \\medrange.
        `,
      },
      rank: 7,
      scaling: "accuracy",
      tags: ["Manifestation"],
    },

    {
      name: "Protective Cage",

      effect: `
        Choose yourself or one Large or smaller \\glossterm{ally} within \\medrange.
        You create a metal cage around the target in its space.
        The cage has a 2 inch gap between its bars, allowing the target to see and be seen by creatures outside of the cage.
        This does not block \\glossterm{line of sight} or \\glossterm{line of effect}, but it provides cover.
        Only piercing weapons can make \\glossterm{strikes} through the bars of the cage.
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
      tags: ["Barrier", "Manifestation"],
      type: "Sustain (minor)",
    },

    {
      name: "Instant Weapon",

      effect: `
        You create a nonmagical weapon that you are proficient with your hand.
        You can immediately make a \\glossterm{strike} with that weapon.
        This strike is considered a \\glossterm{magical} attack, so you use your your Willpower to determine your damage instead of your Strength (see \\pcref{Dice Bonuses From Attributes}).
        If you create a non-crossbow projectile weapon, you also create ammunition necessary for you to attack with.
        After you make the strike, the weapon disappears.
      `,
      rank: 1,
      scaling: {
        3: `You gain a +1 bonus to \\glossterm{accuracy} with the strike.`,
        5: `The accuracy bonus increases to +2.`,
        7: `The accuracy bonus increases to +3.`,
      },
      tags: ["Manifestation"],
    },

    {
      name: "Greater Instant Weapon",

      functionsLike: {
        name: 'instant weapon',
        exceptThat: `
          the weapon you create is magical.
          You may give it a single magic weapon ability of your choice with rank no higher than your spellcasting rank with this spell.
        `,
      },
      rank: 5,
      scaling: {
        7: `You gain a +1 bonus to \\glossterm{accuracy} with the strike.`,
      },
      tags: ["Manifestation"],
    },

    {
      name: "Mirror Barrier",

      functionsLike: {
        exceptThat: `
          it reflects \\glossterm{mundane} attacks against it.
            The barrier's defenses become equal to 6 \\add half your level.
            Whenever a creature misses or \\glossterm{glances} the barrier with a \\glossterm{mundane} attack, it scores a \\glossterm{glancing blow} with that attack against itself.
        `,
        name: "mystic barrier",
      },
      rank: 4,
      scaling: {
        6: `The area increases to a \\medarealong wall.`,
      },
      tags: ["Barrier", "Manifestation"],
      type: "Sustain (attuneable, minor)",
    },

    {
      name: "Greater Mirror Barrier",

      functionsLike: {
        exceptThat: `
          it reflects \\glossterm{mundane} attacks against it.
            The barrier's defenses become equal to 9 \\add half your level, and the hit points of each 5-ft. square increase to three times your \\glossterm{power}.
            Whenever a creature misses or \\glossterm{glances} the barrier with a \\glossterm{mundane} attack, it scores a \\glossterm{glancing blow} with that attack against itself.
        `,
        name: "mystic barrier",
      },
      rank: 7,
      tags: ["Barrier", "Manifestation"],
      type: "Sustain (attuneable, minor)",
    },

    {
      name: "Visual Barrier",

      functionsLike: {
        exceptThat: `
          you can choose the visibility of the barrier.
            There are three possibilities: fully invisible, barely visible like a normal \\spell{mystic barrier}, and visible as a deep black that completely blocks sight.
            You can change the opacity of the barrier as part of the action you use to sustain this spell, or as a \\glossterm{minor action} if you attune to this spell.
        `,
        name: "mystic barrier",
      },
      rank: 2,
      scaling: {
        4: `The area increases to a \\medarealong wall.`,
        6: `The area increases to a \\largearealong wall.`,
      },
      tags: ["Barrier", "Manifestation"],
      type: "Sustain (attuneable, minor)",
    },

    {
      name: "Sonic Barrier",

      functionsLike: {
        exceptThat: `
          you can choose how much the barrier blocks sound.
            There are three possibilities: fully sound-permeable, fully sound-blocking like a normal \\spell{mystic barrier}, and sound-dampening.
            You can change how much the barrier blocks sound as part of the action you use to sustain this spell, or as a \\glossterm{minor action} if you attune to this spell.

            A sound-dampening barrier increases the \\glossterm{difficulty value} of sound-based Awareness checks by 20.
            Sound-permeable and sound-dampening barriers do not block \\glossterm{line of effect} for effects that deal \\glossterm{sonic damage}, but a sound-dampening barrier makes everything \\trait{impervious} to \\glossterm{sonic damage} that originates from the other side of the barrier.
        `,
        name: "mystic barrier",
      },
      rank: 2,
      scaling: {
        4: `The area increases to a \\medarealong wall.`,
        6: `The area increases to a \\largearealong wall.`,
      },
      tags: ["Barrier", "Manifestation"],
      type: "Sustain (attuneable, minor)",
    },

    {
      name: "Forceful Barrier",

      functionsLike: {
        exceptThat: `
          it breaks objects in its area that obstruct its path.
            Each object in the path of the wall takes energy damage equal to 1d10 plus your \\glossterm{power}.
            Any object destroyed in this way does not block the barrier's area of effect.
            This does no damage to creatures, who block the path of the barrier like normal.
        `,
        name: "mystic barrier",
      },
      rank: 3,
      scaling: "damage",
      tags: ["Barrier", "Manifestation"],
      type: "Sustain (attuneable, minor)",
    },

    {
      name: "Mystic Barrier",

      effect: `
        You create a \\smallarealong \\glossterm{wall} of magical energy within \\medrange.
        The wall is visible as a shimmering magical membrane that does not block sight.
        Nothing can pass through the wall until it is destroyed.

        The wall has \\glossterm{hit points} equal to three times your \\glossterm{power}.
        After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
      `,
      rank: 1,
      scaling: {
        3: `The area increases to a \\medarealong wall.`,
        5: `The area increases to a \\largearealong wall.`,
        7: `The area increases to a \\hugearealong wall.`,
      },
      tags: ["Barrier", "Manifestation"],
      type: "Sustain (attuneable, minor)",
    },

    {
      name: "Mystic Bridge",

      functionsLike: {
        exceptThat: `
          the wall is aligned horizontally instead of vertically.
        `,
        name: "mystic barrier",
      },
      rank: 2,
      scaling: {
        3: `The area increases to a \\medarealong wall.`,
        5: `The area increases to a \\largearealong wall.`,
      },
      tags: ["Barrier", "Manifestation"],
      type: "Sustain (attuneable, minor)",
    },

    {
      name: "Sturdy Barrier",

      functionsLike: {
        exceptThat: `
          the wall has \\glossterm{hit points} equal to four times your \\glossterm{power} instead of three times your power.
        `,
        name: "mystic barrier",
      },
      rank: 3,
      scaling: {
        5: `The area increases to a \\medarealong wall.`,
        7: `The area increases to a \\largearealong wall.`,
      },
      tags: ["Barrier", "Manifestation"],
      type: "Sustain (attuneable, minor)",
    },

    {
      name: "Personal Sphere",

      effect: `
        You create a sphere of magical energy around yourself.
        The sphere is visible as a shimmering magical membrane that does not block sight.
        Nothing can pass through the field until it is destroyed.
        This prevents you from having \\glossterm{line of effect} to anything outside of the area.
        When you move using one of your movement speeds, the sphere moves with you, though you cannot force it against another creature or object.

        The field as a whole has \\glossterm{hit points} equal to twice your \\glossterm{power}.
        After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
      `,
      rank: 5,
      scaling: {
        7: `The field's \\glossterm{hit points} increase to three times your power.`,
      },
      tags: ["Barrier", "Manifestation"],
      type: "Sustain (attuneable, minor)",
    },

    {
      name: "Entrapping Sphere",

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
      tags: ["Barrier", "Manifestation"],
      type: "Sustain (minor)",
    },

    {
      name: "Invulnerable Barrier",

      functionsLike: {
        exceptThat: `
          the wall's defenses are each equal to 6 + your level, and it is \\trait{impervious} to physical damage.
          In addition, the wall's \\glossterm{hit points} increase to four times your \\glossterm{power}.
        `,
        name: "mystic barrier",
      },
      rank: 5,
      scaling: {
        7: `The area increases to a \\medarealong wall.`,
      },
      tags: ["Barrier", "Manifestation"],
      type: "Sustain (attuneable, minor)",
    },
  ],
  rituals: [
    {
      name: "Manifest Object",

      castingTime: "one hour",
      effect: `
        Make a Craft check to create an object of Small size or smaller.
        The object appears out of thin air in your hand or in one unoccupied square on solid ground within \\shortrange.
        % TODO: add ability to create objects of other sizes/materials
        It must be made of nonliving, nonmagical, nonreactive vegetable matter, such as wood or cloth.
      `,
      rank: 3,
      tags: ["Manifestation"],
      type: "Attune",
    },

    {
      name: "Fabricate Water",

      castingTime: "one minute",
      effect: `
        You create up to two gallons of wholesome, drinkable water at any number of locations within \\shortrange, allowing you to fill multiple small water containers.
        You must create a minimum of one ounce of water in each location.
      `,
      rank: 1,
      tags: ["Creation"],
    },

    {
      name: "Fabricate Sustenance",

      castingTime: "one hour",
      effect: `
        This ritual creates food and drink in one unoccupied square within \\shortrange that is sufficient to sustain five Medium creatures for 24 hours.
        It also creates basic receptacles to hold the food and drink.
        The food that this ritual creates is simple fare of your choice -- highly nourishing, if rather bland.
      `,
      rank: 2,
      tags: ["Creation"],
    },

    {
      name: "Fabricate Feast",

      castingTime: "one hour",
      effect: `
        This ritual creates food and drink in any number of unoccupied squares within \\shortrange that is sufficient to sustain twenty Medium creatures for 24 hours.
        It also creates basic receptacles to hold the food and drink.
        The food that this ritual creates is simple fare of your choice -- highly nourishing, if rather bland.
      `,
      rank: 3,
      tags: ["Creation"],
    },

    {
      name: "Copy Writing",

      castingTime: "special",
      effect: `
        You copy the writing from one Small or smaller written work within \\shortrange to a Small or smaller set of blank pages within \\shortrange.
        The blank pages must have enough room for the original writing.
        This ritual takes half the time required to copy the writing by hand, to a minimum of one minute, and does not require writing materials.
        It requires one \\glossterm{fatigue level} from its participants.
      `,
      rank: 1,
    },

    {
      name: "Greater Copy Writing",

      castingTime: "special",
      functionsLike: {
        exceptThat: `
          it can target objects of Medium or smaller size.
          In addition, the time required to perform this ritual decreases to one tenth of the time required to copy the writing by hand, to a minimum of one minute.
          It requires one \\glossterm{fatigue level} from its participants.
        `,
        name: "copy writing",
      },
      rank: 4,
    },

    {
      name: "Ammunition Stockpile",

      castingTime: "one hour",
      effect: `
        You create a Large pile of either nonmagical arrows or crossbow bolts in any unoccupied location on solid ground adjacent to you.
        You can choose to create blunted ammunition, but you cannot create other forms of special ammunition like fire arrows or repeating bolts.
        Any creature may take ammunition from the pile to use.
      `,
      rank: 3,
      tags: ["Manifestation"],
      type: "Attune",
    },
    {
      name: "Tiny Hut",

      castingTime: "one minute",
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
      type: "Attune",
    },
  ],
};
