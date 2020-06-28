import { poisonousWeapon } from "@src/passive_abilities";
import { addType, TypelessMonsterInput } from "./add_type";

const animalInput: TypelessMonsterInput[] = [
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "fur" }],
    challengeRating: 2,
    description: `
      The black bear is a forest-dwelling omnivore that usually is not dangerous unless an interloper threatens its cubs or food supply.

      Black bears can be pure black, blond, or cinnamon in color and are rarely more than 5 feet long.
    `,
    level: 3,
    name: "Black bear",
    startingAttributes: { str: 3, con: 3, int: -8, wil: -1 },
    weaponInput: [{ name: "bite" }],
  },
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "fur" }],
    challengeRating: 2,
    description: `
      These massive omnivores are bad-tempered and territorial.
      The brown bear's statistics can be used for almost any big bear, including the grizzly.
    `,
    level: 5,
    height: "9 feet",
    name: "Brown bear",
    size: "large",
    startingAttributes: { str: 4, con: 4, int: -8, wil: -1 },
    weaponInput: [{ name: "bite" }],
    weight: "1,800 pounds",
  },
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "fur" }],
    description: `
      Wolves are pack hunters known for their persistence and cunning.
    `,
    level: 2,
    name: "Wolf",
    startingAttributes: { str: 1, dex: 2, con: 1, int: -7, wil: -1 },
    weaponInput: [{ name: "bite" }],
  },
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "hide" }],
    description: `
      The statistics presented here describe a small horse, under 5 feet tall at the shoulder.
      Ponies are similar to light horses and cannot fight while carrying a rider.
      A pony's maximum load is 120 pounds, and it can drag up to 800 pounds.
    `,
    level: 2,
    name: "Pony",
    startingAttributes: { str: 1, con: 3, int: -7, wil: -1 },
    weaponInput: [{ powerBonus: -2, name: "bite" }],
  },
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "feathers" }],
    challengeRating: 4,
    description: `
      Rocs are massive and incredibly strong birds with the ability to carry off horses.
      It is typically 30 feet long from the beak to the base of the tail, with a wingspan as wide as 80 feet.
      Its plumage is either dark brown or golden from head to tail.

      A roc attacks from the air, swooping earthward to snatch prey in its powerful talons and carry it off for itself and its young to devour.
      A solitary roc is typically hunting and will attack any Medium or larger creature that appears edible.
      A mated pair of rocs attack in concert, fighting to the death to defend their nests or hatchlings.
    `,
    level: 9,
    name: "Roc",
    size: "gargantuan",
    startingAttributes: { str: 4, dex: 2, con: 3, int: -7, wil: -1 },
    weaponInput: [{ name: "bite" }],
    weight: "8,000 pounds",
  },
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "scales" }],
    challengeRating: 2,
    description: `
      Vampire eels are large, slimy snakelike carnivores.
      They swim through murky water, looking for edible creatures.
    `,
    level: 6,
    name: "Vampire Eel",
    size: "large",
    startingAttributes: { str: 3, dex: 3, con: 2, int: -8, per: 0, wil: -1 },
  },
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "fur" }],
    challengeRating: 2,
    description: `
      Dire wolves are efficient pack hunters that will kill anything they can catch.
      Their fur is usually mottled gray or black.
    `,
    level: 5,
    height: "9 feet",
    name: "Dire Wolf",
    size: "large",
    startingAttributes: { str: 4, dex: 3, con: 2, int: -7, per: 2 },
    weaponInput: [{ name: "bite" }],
    weight: "800 pounds",
  },
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "feathers" }],
    description: `
      These glossy black birds are about 2 feet long and have wingspans of about 4 feet.
      The statistics presented here can describe most nonpredatory birds of similar size.
    `,
    level: 1,
    name: "raven",
    size: "tiny",
    startingAttributes: { str: -8, dex: 3, con: -4, int: -6, per: 2 },
    weaponInput: [{ name: "talon" }],
  },
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "carapace" }],
    challengeRating: 2,
    description: `
      Giant wasps attack when hungry or threatened, stinging their prey to death.
      They take dead or incapacitated opponents back to their lairs as food for their unhatched young.
    `,
    level: 6,
    name: "Giant Wasp",
    size: "large",
    startingAttributes: { str: 1, dex: 4, con: 1, int: -8, per: 2, wil: -2 },
    weaponInput: [{ name: "stinger" }],
    passiveAbilities: [
      {
        description: poisonousWeapon("stinger", "\\glossterm{sickened}", "\\glossterm{paralyzed}"),
        name: "Poison Sting",
      },
    ],
  },
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "carapace" }],
    attackInputs: [{ name: "acid breath" }],
    challengeRating: 2,
    description: `
      These creatures feed primarily on carrion and offal, gathering heaps of the stuff in which to build nests and lay eggs.
      A giant bombardier beetle is about 6 feet long. Giant bombardier beetles normally attack only to defend themselves, their nests, or their eggs.
    `,
    level: 7,
    name: "Giant Bombardier Beetle",
    size: "large",
    startingAttributes: { str: 4, dex: -1, con: 4, int: -9 },
    weaponInput: [{ name: "bite" }],
  },
];

const baseCentipede = {
  alignment: "Always true neutral",
  armorInputs: [{ name: "carapace" as const }],
  challengeRating: 4 as const,
  description: `
    Monstrous centipedes tend to attack anything that resembles food, biting with their jaws and injecting their poison.
  `,
  passiveAbilities: [
    {
      description: poisonousWeapon(
        "bite",
        "lose a \\glossterm{hit point}",
        "lose two \\glossterm{hit points}",
      ),
      name: "Poison Sting",
    },
  ],
  weaponInput: [{ name: "bite" as const }],
};
animalInput.push({
  ...baseCentipede,
  level: 4,
  name: "Large Centipede",
  size: "large",
  startingAttributes: { str: 2, dex: -1, con: 2, int: -9 },
});
animalInput.push({
  ...baseCentipede,
  level: 7,
  name: "Huge Centipede",
  size: "huge",
  startingAttributes: { str: 3, dex: -1, con: 3, int: -9 },
});
animalInput.push({
  ...baseCentipede,
  level: 10,
  name: "Gargantuan Centipede",
  size: "gargantuan",
  startingAttributes: { str: 4, dex: -1, con: 4, int: -9 },
});
animalInput.push({
  ...baseCentipede,
  level: 13,
  name: "Colossal Centipede",
  size: "colossal",
  startingAttributes: { str: 5, dex: -1, con: 5, int: -9 },
});

const spiderBase = {
  alignment: "Always true neutral",
  armorInputs: [{ name: "carapace" as const }],
  challengeRating: 4 as const,
  description: `
    All monstrous spiders are aggressive predators that use their poisonous bites to subdue or kill prey.
  `,
  passiveAbilities: [
    {
      description: poisonousWeapon("bite", "\\glossterm{sickened}", "\\glossterm{paralyzed}"),
      name: "Poison Sting",
    },
  ],
  weaponInput: [{ name: "bite" as const }],
};
animalInput.push({
  ...spiderBase,
  level: 3,
  name: "Spider, Large",
  size: "large",
  startingAttributes: { str: 1, dex: 3, int: -9, per: 2 },
});
animalInput.push({
  ...spiderBase,
  level: 6,
  name: "Spider, Huge",
  size: "huge",
  startingAttributes: { str: 2, dex: 3, int: -9, per: 3 },
});
animalInput.push({
  ...spiderBase,
  level: 9,
  name: "Spider, Gargantuan",
  size: "gargantuan",
  startingAttributes: { str: 3, dex: 4, int: -9, per: 3 },
});
animalInput.push({
  ...spiderBase,
  level: 12,
  name: "Spider, Colossal",
  size: "colossal",
  startingAttributes: { str: 4, dex: 4, int: -9, per: 4 },
});

export const animals = addType("animal", animalInput);
