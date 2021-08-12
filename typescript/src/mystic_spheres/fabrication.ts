import { MysticSphere } from ".";

export const fabrication: MysticSphere = {
  name: "Fabrication",
  shortDescription: "Create objects to damage and impair foes.",
  sources: ["arcane", "pact"],

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
      focus: false,
      scaling: {
        2: `The maximum size of the object increases to Small.`,
        4: `The maximum size of the object increases to Medium.`,
        6: `The maximum size of the object increases to Large.`,
      },
      tags: ["Manifestation"],
      type: "Duration",
    },
  ],
  spells: [
    {
      name: "Mystic Arrow",

      attack: {
        hit: `The subject takes 2d6 + \\glossterm{power} piercing damage.`,
        targeting: `
        Make an attack vs. Armor against anything within \\longrange.
        `,
      },
      rank: 2,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Mystic Artillery",

      attack: {
        hit: `The subject takes 4d8 + \\glossterm{power} piercing damage.`,
        targeting: `
          Make an attack vs. Armor with a +1 accuracy bonus against anything within \\extrange.
        `,
      },
      rank: 6,
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Mystic Blast Arrow",

      attack: {
        glance: `Half damage.`,
        hit: `
          The subject takes 2d10 + \\glossterm{power} piercing damage.
          If it loses \\glossterm{hit points} from this damage, it is knocked \\prone.
        `,
        targeting: `
          Make an attack vs. Armor against anything within \\longrange.
        `,
      },
      rank: 4,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Bladestorm",

      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 2d6 + half \\glossterm{power} slashing damage.`,
        targeting: `
          This spell does not have the \\abilitytag{Focus} tag.
          Make an attack vs. Armor against all \\glossterm{enemies} adjacent to you.
        `,
      },
      focus: false,
      rank: 3,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Greater Bladestorm",

      functionsLike: {
        name: "bladestorm",
        exceptThat: "the damage increases to 4d10 + \\glossterm{power}.",
      },
      focus: false,
      rank: 7,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Missile Storm",

      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 2d8 + half \\glossterm{power} piercing damage.`,
        targeting: `
          Make an attack vs. Armor against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      rank: 4,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Greater Missile Storm",

      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 4d6 + half \\glossterm{power} piercing damage.`,
        targeting: `
          Make an attack vs. Armor against all \\glossterm{enemies} in a \\hugearea radius from you.
        `,
      },
      rank: 6,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Hail of Arrows",

      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 2d6 + half \\glossterm{power} piercing damage.`,
        targeting: `
          Make an attack vs. Armor against everything in a \\smallarea radius within \\medrange.
        `,
      },
      rank: 3,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Greater Hail of Arrows",

      functionsLike: {
        name: "hail of arrows",
        exceptThat: "the damage increases to 4d10 + \\glossterm{power}.",
      },
      rank: 7,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Blade Barrier",

      attack: {
        hit: `The subject takes 1d10 + half \\glossterm{power} slashing damage.`,
        targeting: `
          A wall of whirling blades appears within \\medrange.
          The wall takes the form of a 15 ft.\\ high, \\medarea wall.
          The wall provides \\glossterm{cover} against attacks made through it.
          Whenever anything passes through the wall, make an attack vs. Armor against it.
          You can only make this attack against a given target once per \\glossterm{phase}.
        `,
      },
      rank: 2,
      scaling: "damage",
      type: "Sustain (minor)",
    },

    {
      name: "Greater Blade Barrier",

      functionsLike: {
        exceptThat: `
          the damage increases to 2d10 + half \\glossterm{power}.
          In addition, the area increases to a 20 ft.\\ high, \\largearea wall.
        `,
        name: 'blade barrier',
      },
      rank: 5,
      scaling: "damage",
      type: "Sustain (minor)",
    },

    {
      name: "Blade Perimeter",

      attack: {
        glance: `Half damage.`,
        hit: `The subject takes 2d6 + half \\glossterm{power} slashing damage.`,
        targeting: `
        A wall of whirling blades appears within \\medrange.
        The wall takes the form of a 15 ft.\\ high, \\smallarea radius wall.
        The wall provides \\glossterm{cover} against attacks made through it.
        Whenever anything passes through the wall, make an attack vs. Armor against it.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Sustain (minor)",
    },

    {
      name: "Contracting Blade Perimeter",

      functionsLike: {
        exceptThat: `
          the damage is increased to 4d6 plus half your \\glossterm{power}.
          % TODO: Clarify interaction with solid obstacles that block contraction?
          In addition, the wall's radius shrinks by 5 feet at the end of each round, dealing damage to everything it moves through.
          After the wall shrinks to have no radius, it begins expanding again at a rate of 5 feet per round.
          Once it expands back to its maximum radius, it begins shrinking again.
        `,
        name: "blade perimeter",
      },
      rank: 6,
      scaling: "damage",
      type: "Sustain (minor)",
    },

    {
      name: "Personal Weapon",

      effect: `
        Choose a type of weapon that you are proficient with.
        You create a normal item of that type in your hand.
        If the item stops touching you, it disappears, and this effect ends.

        If you create a non-crossbow projectile weapon, you can fire it without ammunition by creating projectiles as you fire.
        The projectiles disappear after the attack is complete.
        Any \\glossterm{strikes} that you make with a weapon created with this ability are \\glossterm{magical} abilities, so you use your magical \\glossterm{power} to determine their damage instead of your \\glossterm{mundane} power.

        % Strange duration for a spell
        This spell lasts until you use it again or until you \\glossterm{dismiss} it as a \\glossterm{free action}.
      `,
      rank: 1,
      scaling: {
        3: `You gain a +2 \\glossterm{magic bonus} to \\glossterm{power} with \\glossterm{strikes} using the weapon.`,
        5: `The power bonus increases to +4.`,
        7: `The power bonus increases to +8.`,
      },
      tags: ["Manifestation"],
      type: "Duration",
    },

    {
      name: "Forge",

      effect: `
        Choose a type of body armor, weapon, or shield that you are proficient with.
        The item's level cannot exceed your level.
        In addition, it cannot be constructed of any magical or extraordinary material.

        You create a normal item of that type in your hand or in any unoccupied square on solid ground within \\shortrange.
        It is sized appropriately for you, up to a maximum of a Medium size item.
      `,
      rank: 1,
      scaling: {
        3: `
          The item created is magically enhanced.
          A weapon grants a +2 \\glossterm{magic bonus} to the wielder's \\glossterm{power},
            and armor grants a +4 \\glossterm{magic bonus} to \\glossterm{damage resistance}.
          In addition, body armor can be made from any special material other than dragonhide, dragonscale, cold iron, and the pure versions of those materials.
        `,
        5: `The magic bonus for a weapon increases to +4, and the magic bonus for armor increases to +8.`,
        7: `The magic bonus for a weapon increases to +8, and the magic bonus for armor increases to +16.`,
      },
      tags: ['Manifestation'],
      type: "Attune (self)",
    },

    {
      name: "Meteor",

      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 2d10 + half \\glossterm{power} bludgeoning and fire damage.`,
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
      type: "Instant",
    },

    {
      name: "Web",

      attack: {
        crit: `Each secondary target is \\immobilized instead of slowed.`,
        glance: "The effect lasts \\glossterm{briefly}.",
        hit: `Each secondary target is \\slowed as long as it has webbing from this ability in its space.`,
        targeting: `
          You fill a \\smallarea radius \\glossterm{zone} within \\shortrange with webs.
          The webs make the area \\glossterm{difficult terrain}.
          Each 5-ft.\\ square of webbing has 16 \\glossterm{hit points}, and all of its defenses are 0.

          In addition, make an attack vs. Reflex against all Large or smaller creatures in the area.
        `,
      },

      rank: 4,
      scaling: "accuracy",
      tags: ["Manifestation"],
      type: "Sustain (minor)",
    },

    {
      name: "Caltrops",

      attack: {
        hit: `The subject takes 1d8 + half \\glossterm{power} piercing damage.`,
        targeting: `
          You create exceptionally sharp caltrops in up to three unoccupied squares on solid ground within \\medrange.
          Whenever a creature moves into any of the squares, unless the creature moves at one quarter speed to avoid the danger, you make an attack vs. Armor against them.
          You cannot make this attack against the same creature more than once per \\glossterm{phase}.
          Unlike most attacks, this attack can happen during the \\glossterm{movement phase}.
          Caltrops may not be effective against creatures with an unusual anatomy.
        `,
      },
      rank: 1,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Sustain (minor)",
    },

    {
      name: "Greater Caltrops",

      functionsLike: {
        name: 'caltrops',
        exceptThat: "the damage increases to 4d6 + \\glossterm{power}.",
      },
      rank: 5,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Sustain (minor)",
    },

    {
      name: "Instant Arrow",

      castingTime: "minor action",
      effect: `
        This spell has no \\glossterm{somatic components}.

        You create a nonmagical arrow in a bow that you are holding.
        The ammunition can be blunted, but you cannot create other forms of special ammunition like fire arrows.
        The object persists until the end of the round, at which point it disappears.
        Because this spell has the \\abilitytag{Swift} tag, you can fire the created projectile from the weapon in the same phase that you cast this spell.
        Any attack with this ammunition is considered a \\glossterm{magical} attack, so you use your magical \\glossterm{power} instead of your mundane power.
      `,
      rank: 1,
      scaling: {
        3: `You gain a +2 \\glossterm{magic bonus} to \\glossterm{power} with any \\glossterm{strike} using ammunition created with this spell.`,
        5: `The power bonus increases to +4.`,
        7: `The power bonus increases to +8.`,
      },
      tags: ["Manifestation", "Swift"],
      type: "Duration",
    },

    {
      name: "Daggerswarm",

      castingTime: "minor action",
      attack: {
        glance: `Half damage.`,
        hit: `The subject takes 2d6 piercing damage.`,
        targeting: `
          When you cast this spell, a small swarm of daggers appears floating over your head.
          As a \\glossterm{minor action}, you can fling one dagger at a creature or object within \\shortrange.
          When you do, make an attack vs. Armor against that target.
          After the dagger deals damage, it disappears and another dagger appears in the swarm.
        `,
      },
      rank: 4,
      scaling: "damage",
      type: "Attune (self)",
    },

    {
      name: "Greater Daggerswarm",

      castingTime: "minor action",
      functionsLike: {
        name: "daggerswarm",
        exceptThat: `
          the damage increases to 4d8, and the range increases to \\medrange.
        `,
      },
      rank: 7,
      scaling: "damage",
      type: "Attune (self)",
    },

    {
      name: "Daggercloud",

      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 2d8 + half \\glossterm{power} piercing damage.`,
        targeting: `
          A swarm of daggers appears in a \\tinyarea radius \\glossterm{zone} within \\medrange.
          At the end of each round, make an attack vs. Armor with a +2 accuracy bonus against everything in the area.
        `,
      },
      rank: 5,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Sustain (minor)",
    },

    {
      name: "Grease",

      attack: {
        crit: `
          Each subject is also unable to stand up as a \\glossterm{condition}.
          If it is somehow brought into a standing position, it will immediately fall and become prone again.
        `,
        hit: `Each subject falls \\prone.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\smallarea radius within \\medrange.
        `,
      },
      rank: 1,
      scaling: "accuracy",
      tags: ["Manifestation"],
      type: "Duration",
    },

    {
      name: "Oil Slick",

      attack: {
        crit: `
          Each subject is also unable to stand up as a \\glossterm{condition}.
          If it is somehow brought into a standing position, it will immediately fall and become prone again.
        `,
        hit: `
          Each subject falls \\prone, and is \\glossterm{briefly} \\glossterm{vulnerable} to fire damage.
        `,
        targeting: `
          Make an attack vs. Reflex against everything in a \\smallarea radius within \\medrange.
        `,
      },
      rank: 5,
      scaling: "accuracy",
      tags: ["Manifestation"],
      type: "Duration",
    },

    {
      name: "Protective Cage",

      effect: `
        Choose yourself or one Large or smaller \\glossterm{ally} within \\medrange.
        You create a metal cage around the subject in its space.
        The cage has a 2 inch gap between its bars, allowing the subject to see and be seen by creatures outside of the cage.
        This does not block \\glossterm{line of sight} or \\glossterm{line of effect}, but it provides cover, and non-piercing \\glossterm{melee} weapons cannot attack through the cage.
        Each 5-ft.\\ square of the field has 12 \\glossterm{hit points}.

        % TODO: clarify that you can't create two cages around the same subject
        % simultaneously
        If another creature is in the subject's space when this spell is cast, this spell fails without effect.
      `,
      rank: 3,
      scaling: {
        5: `The \\glossterm{hit points} of each 5-ft.\\ square increase to 24.`,
        7: `The \\glossterm{hit points} of each 5-ft.\\ square increase to 48.`,
      },
      tags: ["Manifestation"],
      type: "Sustain (minor)",
    },

    {
      name: "Instant Weapon",

      effect: `
        This spell does not have the \\abilitytag{Focus} tag.

        You create a nonmagical weapon that you are proficient with your hand.
        You can immediately make a \\glossterm{strike} with that weapon.
        This strike is considered a \\glossterm{magical} attack, so you use your magical \\glossterm{power} instead of your mundane power.
        If you create a non-crossbow projectile weapon, you also create ammunition necessary for you to attack with.
        After you make the strike, the weapon disappears.
      `,
      focus: false,
      rank: 1,
      scaling: {
        3: `You gain a +1 bonus to \\glossterm{accuracy} with the strike.`,
        5: `The accuracy bonus increases to +2.`,
        7: `The accuracy bonus increases to +3.`,
      },
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Greater Instant Weapon",

      castingTime: "minor action",
      functionsLike: {
        name: 'instant weapon',
        exceptThat: `
          the weapon you create is magical.
          You may give it a single magic weapon ability of your choice with an item level no higher than your level.
        `,
      },
      focus: false,
      rank: 5,
      scaling: {
        7: `You gain a +1 bonus to \\glossterm{accuracy} with the strike.`,
      },
      tags: ["Manifestation"],
      type: "Instant",
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
      type: "Attune (ritual)",
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
      type: "Instant",
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
      type: "Instant",
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
      type: "Instant",
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
      type: "Instant",
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
      type: "Instant",
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
      type: "Attune (ritual)",
    },
  ],
};
