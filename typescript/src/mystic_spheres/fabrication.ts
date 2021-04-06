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
      name: "Shieldbearer",

      castingTime: "minor action",
      effect: `
        You gain a +1 \\glossterm{magic bonus} to Armor defense.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +2.`,
        5: `The bonus increases to +3.`,
        7: `The bonus increases to +4.`,
      },
      tags: ["Manifestation"],
      type: "Attune (self)",
    },

    {
      name: "Mass Shieldbearer",

      castingTime: 'minor action',
      functionsLike: {
        name: 'shieldbearer',
        mass: true,
      },
      // narrative: '',
      rank: 3,
      scaling: {
        5: 'The bonus increases to +2.',
        7: 'The bonus increases to +3.',
      },
      type: 'Attune (target)',
    },

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
      name: "Mystic Blast Arrow",

      attack: {
        glance: `Half damage.`,
        hit: `The subject takes 2d10 + \\glossterm{power} piercing damage.
          If it loses \\glossterm{hit points} from this damage, it is knocked \\prone.`,
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

        If you create a projectile weapon, you can fire it without ammunition by creating projectiles as you fire.
        The projectiles disappear after the attack is complete.

        % Strange duration for a spell
        This spell lasts until you use it again or until you \\glossterm{dismiss} it as a \\glossterm{free action}.
      `,
      rank: 1,
      scaling: {
        3: `You gain a +1 \\glossterm{magic bonus} to \\glossterm{accuracy} with \\glossterm{strikes} using the weapon.`,
        5: `You gain a +4 \\glossterm{magic bonus} to \\glossterm{power} with \\glossterm{strikes} using the weapon.`,
        7: `The bonus to accuracy increases to +2, and the bonus to power increases to +8.`,
      },
      tags: ["Manifestation"],
      type: "Duration",
    },

    {
      name: "Forge",

      effect: `
        Choose a type of body armor, weapon, or shield that you are proficient with.
        You cannot create heavy armor.
        You create a normal item of that type in your hand or in any unoccupied square on solid ground within \\shortrange.

        The item cannot be constructed of any magical or extraordinary material.
        It is sized appropriately for you, up to a maximum of a Medium size item.
      `,
      rank: 1,
      scaling: {
        3: `You can also create heavy armor.
            In addition, the item created is magically enhanced.
                A weapon grants a +2 \\glossterm{magic bonus} to your \\glossterm{mundane} \\glossterm{power},
                    and armor grants a +1 \\glossterm{magic bonus} to Armor defense.`,
        5: `The magic bonus for a weapon increases to +4, and the magic bonus for armor increases to +2.`,
        7: `The magic bonus for a weapon increases to +8, and the magic bonus for armor increases to +3.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Meteor",

      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 4d6 + half \\glossterm{power} bludgeoning and fire damage.`,
        targeting: `
          You create a meteor in midair within \\medrange that falls to the ground, crushing foes in its path.
          The meteor takes up a \\smallarea radius, and must be created in unoccupied space.
          After being summoned, it falls up to 100 feet before disappearing.
          Make an attack vs. Armor against everything in its path.
        `,
      },
      rank: 6,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Web",

      attack: {
        crit: `Each secondary target is \\immobilized instead of slowed.`,
        glance: "The effect lasts until the end of the next round.",
        hit: `Each secondary target is \\slowed as long as it has webbing from this ability in its space.`,
        targeting: `
          You fill a \\smallarea radius \\glossterm{zone} within \\shortrange with webs.
          The webs make the area \\glossterm{difficult terrain}.
          Each 5-ft.\\ square of webbing has 8 \\glossterm{hit points} and is \\glossterm{vulnerable} to fire damage.

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
      name: "Instant Ammunition",

      castingTime: "minor action",
      effect: `
        You create a nonmagical arrow or crossbow bolt in a bow or crossbow that you are holding.
        The ammunition can be blunted, but you cannot create other forms of special ammunition like fire arrows or repeating bolts.
        The object persists until the end of the round, at which point it disappears.
        Because this spell has the \\abilitytag{Swift} tag, you can fire the created projectile from the weapon in the same phase that you cast this spell.
      `,
      rank: 2,
      scaling: {
        4: `You gain a +1 \\glossterm{magic bonus} to \\glossterm{accuracy} with any \\glossterm{strike} using ammunition created with this spell.`,
        6: `The accuracy bonus increases to +2.`,
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
      name: "Daggercloud",

      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 2d8 + half \\glossterm{power} piercing damage.`,
        targeting: `
          A swarm of daggers appears in a \\tinyarea radius \\glossterm{zone} within \\medrange.
          At the end of each round, make an attack vs. Armor against everything in the area.
        `,
      },
      rank: 4,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Sustain (minor)",
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
        It requires one \\glossterm{fatigue point} from its participants.
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
          It requires one \\glossterm{fatigue point} from its participants.
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
