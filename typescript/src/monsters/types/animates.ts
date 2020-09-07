import { passiveAbilities } from "@src/passive_abilities";
import { addType, TypelessMonsterInput } from "./add_type";

const animateInput: TypelessMonsterInput[] = [
  {
    alignment: "Always neutral evil",
    attackInputs: [
      {
        damageTypes: ["cold"],
        defense: "reflex",
        name: "Dark Grasp",
        powerBonus: 4,
        source: "magical",
        target: "One creature within \\glossterm{reach}",
      },
      {
        damageTypes: ["cold"],
        defense: "fortitude",
        preface: `
          The darkwraith automatically makes this attack at the end of each round in addition to its other actions.
          \\par
        `,
        name: "Chilling Aura",
        powerBonus: -2,
        target: "Each \\glossterm{enemy} within a \\areasmall radius \\glossterm{emanation}",
      },
    ],
    challengeRating: 4,
    description: `
      An darkwraith is a shadow disconnected from its host through strange umbramantic power.
      Though it appears similar to a ghost, it is not undead.
      Darkwraiths bear a hateful malevolence towards anything that brings light.
      They instinctively seek out sources of warmth, including most living creatures, to suppress them with its chilling aura.
      However, it will not attack directly unless provoked by light or damage.
      Darkwraiths cannot speak or make noise of any kind.
    `,
    level: 9,
    name: "Darkwraith",
    passiveAbilities: [passiveAbilities.incorporeal],
    skillPoints: { awareness: 2, stealth: 2 },
    speeds: { fly: 30, land: null },
    startingAttributes: { str: null, dex: 3, int: 1, per: 2, wil: 0 },
  },
];

const baseTreant = {
  activeAbilityInputs: [
    {
      effect: `
        The target tree must be the same type of tree as the treant.
        The target animates and fights at the treant's command.

        Its statistics are the same as the treant's, except that the tree may be a different size category, and it lacks this ability.
        This ability lasts until the treant uses it again or \\glossterm{dismisses} it as a \\glossterm{free action}.
        When this ability ends, the tree sets down roots in its new location if possible.
        Treants avoid stranding trees in unsustainable locations except in desperate circumstances.
      `,
      name: "Animate Tree",
      target: "One tree no larger than the treant (see text)",
    },
  ],
  armorInputs: [{ name: "hide" } as const],
  challengeRating: 2 as const,
  languages: ["Common", "Sylvan"],
  passiveAbilities: [
    {
      description: `
        Treants are \\glossterm{vulnerable} to fire damage.
      `,
      name: "Fire Vulnerability",
    },
    {
      description: `
        Treants can stand immobile, allowing them to impersonate trees.
        Distinguishing an immobile treant from a tree requires an Awareness check with a \\glossterm{difficulty rating} of 20.
      `,
      name: "Tree Body",
    },
  ],
  weaponInput: [{ name: "slam" as const, tags: ["Sweeping 2"] }],
};
animateInput.push({
  description: `
    Treants are intelligent plant creatures that appear extremely similar to trees.
    They are bipedal, but their legs fuse together when they rest or wish to hide, matching the appearance of a tree trunk.

    A treant's appearance and attitude generally depends on the type of tree it resembles.
    They they are generally both strong and durable, though they are vulnerable to fire and lack agility.
    Virtually all treants share a strong affinity for nature and forests, and react angrily to those who would befoul nature.
    In combat, they are almost always encountered in the company of a tree they animated to fight by their side.
  `,
  name: "Treants",
  monsters: [
    {
      ...baseTreant,
      alignment: "Usually true neutral",
      description: `
        Birch treants tend to be shy, and they to avoid conflict if at all possible.
      `,
      level: 5,
      name: "Birth Treant",
      size: "large",
      startingAttributes: { str: 2, dex: 0, con: 2, int: 1, per: 2, wil: -1 },
    },
    {
      ...baseTreant,
      alignment: "Usually true neutral",
      description: `
        Chestnut treants tend to mischievous and outgoing.
        They like playing small tricks on interesting creatures that pass by.
      `,
      level: 6,
      name: "Maple Treant",
      size: "large",
      startingAttributes: { str: 2, dex: 0, con: 2, int: 1, per: 4, wil: 0 },
    },
    {
      ...baseTreant,
      alignment: "Usually true neutral",
      description: `
        Willow treants are the most agile treants, and they can twist and bend their bodies with surprising finesse.
        Their attitudes tend to be similarly flexible, and they tend to be easily persuadable.
      `,
      level: 7,
      name: "Willow Treant",
      size: "large",
      startingAttributes: { str: 4, dex: 2, con: 2, int: 1, per: 2, wil: -2 },
    },
    {
      ...baseTreant,
      alignment: "Usually neutral evil",
      description: `
        Darkroot treants, unlike most other treants, primarily inhabit swamps and other grimy places.
        Their bark is mottled with fungus, and they tend to have a more sinister demeanor than most treants.
      `,
      level: 8,
      name: "Darkroot Treant",
      size: "huge",
      startingAttributes: { str: 4, dex: 0, con: 1, int: 1, per: 2, wil: 1 },
    },
    {
      ...baseTreant,
      alignment: "Usually neutral good",
      description: `
         Pine treants tend to be the most steadfast treants.
         They are strong-willed, but while oak treants are stubborn, pine treants are resolutely benevolent, sheltering all who need aid.
      `,
      level: 9,
      name: "Pine Treant",
      size: "huge",
      startingAttributes: { str: 4, dex: -2, con: 4, int: 1, per: 2, wil: 3 },
    },
    {
      ...baseTreant,
      alignment: "Usually true neutral",
      description: `
        Oak treants tend to be the most stubborn treants, and they brook no guff from wayward adventurers.
      `,
      level: 10,
      name: "Oak Treant",
      size: "huge",
      startingAttributes: { str: 4, dex: -2, con: 4, int: 1, per: 2, wil: 3 },
    },
    {
      ...baseTreant,
      alignment: "Usually true neutral",
      description: `
        Cyprus treants are the most durable of treants.
        They are virtually indestructible, and are fearsome when roused to anger.
      `,
      level: 11,
      name: "Cyprus Treant",
      size: "huge",
      startingAttributes: { str: 6, dex: -2, con: 6, int: 1, per: 2, wil: 1 },
    },
  ],
});

const baseAirElemental = {
  // TODO: add fly speed
  // TODO: add whirlwind
  alignment: "Usually true neutral",
  armorInputs: [{ name: "hide" as const }],
  attackInputs: [
    {
      hit: "Each target takes $damage.",
      name: "Whirlwind",
      target: "Each \\glossterm{enemy} within reach",
      weaponName: "slam" as const,
    },
  ],
  challengeRating: 2 as const,
  // TODO: give air elementals a unique description
  description: ``,
  languages: ["Auran"],
  startingAttributes: { str: 1, dex: 4, con: 1, int: -2, per: 2 },
  weaponInput: [{ name: "slam" as const }],
};
animateInput.push({
  description: `
    Air elementals are the embodiment of the natural element of air.
    Their rapid flying speed makes them useful on vast battlefields or in extended aerial combat.
  `,
  name: "Air Elementals",
  monsters: [
    {
      ...baseAirElemental,
      level: 5,
      name: "Air Elemental, Large",
      size: "large",
    },
    {
      ...baseAirElemental,
      level: 8,
      name: "Air Elemental, Huge",
      size: "huge",
    },
    {
      ...baseAirElemental,
      challengeRating: 4,
      level: 11,
      name: "Air Elemental, Elder",
      size: "huge",
      startingAttributes: { str: 1, dex: 5, con: 1, int: 0, per: 3 },
    },
  ],
});

const baseAnimatedObject = {
  alignment: "Always true neutral",
  armorInputs: [{ name: "thick skin" as const }],
  description: "",
  startingAttributes: { int: null, per: 0, wil: -8 },
  // TODO: special abilities for each animated object shape
  weaponInput: [{ name: "slam" as const }],
};
animateInput.push({
  description: `
    Animated objects come in all sizes, shapes, and colors. They owe their existence as creatures to magical effects.

    Animated objects fight only as directed by the animator. They follow orders without question and to the best of their abilities. Since they do not need to breathe and never tire, they can be extremely capable minions.
  `,
  name: "Animated Objects",
  monsters: [
    {
      ...baseAnimatedObject,
      challengeRating: 0.5,
      level: 1,
      name: "Animated Object, Tiny",
      size: "tiny",
      startingAttributes: { ...baseAnimatedObject.startingAttributes, str: -4, dex: 4, con: -4 },
    },
    {
      ...baseAnimatedObject,
      challengeRating: 1,
      level: 1,
      name: "Animated Object, Small",
      size: "small",
      startingAttributes: { ...baseAnimatedObject.startingAttributes, str: -2, dex: 2, con: -2 },
    },
    {
      ...baseAnimatedObject,
      challengeRating: 2,
      level: 2,
      name: "Animated Object, Medium",
      size: "medium",
      startingAttributes: { ...baseAnimatedObject.startingAttributes, str: 0, dex: 0, con: 0 },
    },
    {
      ...baseAnimatedObject,
      challengeRating: 2,
      level: 4,
      name: "Animated Object, Large",
      size: "large",
      startingAttributes: { ...baseAnimatedObject.startingAttributes, str: 2, dex: 0, con: 2 },
    },
    {
      ...baseAnimatedObject,
      challengeRating: 2,
      level: 7,
      name: "Animated Object, Huge",
      size: "huge",
      startingAttributes: { ...baseAnimatedObject.startingAttributes, str: 3, dex: -1, con: 3 },
    },
    {
      ...baseAnimatedObject,
      challengeRating: 3,
      level: 9,
      name: "Animated Object, Gargantuan",
      size: "gargantuan",
      startingAttributes: { ...baseAnimatedObject.startingAttributes, str: 4, dex: -2, con: 4 },
    },
    {
      ...baseAnimatedObject,
      challengeRating: 3,
      level: 11,
      name: "Animated Object, Colossal",
      size: "gargantuan",
      startingAttributes: { ...baseAnimatedObject.startingAttributes, str: 5, dex: -3, con: 5 },
    },
  ],
});

export const animates = addType("animate", animateInput);
