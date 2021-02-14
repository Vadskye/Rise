import { addType, TypelessMonsterInput } from "./add_type";

// TODO: many animals should have the scent ability
const animalInput: TypelessMonsterInput[] = [
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "fur" }],
    challengeRating: 1,
    description: `
      Baboons are powerful and aggressive primates adapted to life on the ground.
      They
    `,
    knowledge: {
      0: `
        A baboon is a Small primate adapted to life on the ground.
        A typical baboon is the size of a big dog.
      `,
      5: `
        Baboons prefer open spaces but climb trees to find safe places to rest overnight.
        They can be aggressive, though they avoid attacking creatures that seem too dangerous.
      `,
    },
    level: 1,
    name: "Baboon",
    skillPoints: { awareness: 1, climb: 2 },
    size: "small",
    speeds: { climb: 30 },
    startingAttributes: { str: 2, dex: 2, con: 1, int: -8, per: 1, wil: -1 },
    weaponInput: [{ name: "bite" }],
  },
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "fur" }],
    challengeRating: 1,
    knowledge: {
      0: `
        A badger is a Small furry animal with a squat, powerful body.
        Badgers can be tenacious in combat.
      `,
      5: `
        Badgers have strong forelimbs that are armed with long claws for digging.
        A typical adult badger is 2 to 3 feet long and weighs 25 to 35 pounds.
      `,
    },
    level: 1,
    name: "Badger",
    skillPoints: { flexibility: 2 },
    size: "small",
    speeds: { burrow: 10 },
    startingAttributes: { str: -1, dex: 2, con: 2, int: -8, per: 1, wil: -1 },
    weaponInput: [{ name: "bite" }],
  },
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "fur" }],
    challengeRating: 0.5,
    description: `
      The statistics presented here describe a common housecat.
    `,
    knowledge: {
      0: `
        A cat is a Tiny feline creature.
      `,
    },
    level: 1,
    name: "Cat",
    skillPoints: { awareness: 2, climb: 2, stealth: 2 },
    size: "tiny",
    startingAttributes: { str: -7, dex: 3, con: -1, int: -7, per: 1, wil: -2 },
    weaponInput: [{ name: "bite" }, { name: "claw" }],
  },
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "fur" }],
    challengeRating: 1,
    description: `
     The statistics presented here describe a fairly small dog of about 20 to 50 pounds in weight.
     They also can be used for small wild canines such as coyotes and jackals.
    `,
    knowledge: {
      0: `
        A dog is a Small canine creature.
      `,
    },
    level: 1,
    name: "Dog",
    skillPoints: { awareness: 2, jump: 2, swim: 2 },
    size: "small",
    startingAttributes: { str: 0, dex: 1, con: 0, int: -7, per: 1, wil: -1 },
    weaponInput: [{ name: "bite" }],
  },
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "fur" }],
    challengeRating: 1,
    description: `
      The statistics presented here describe a fairly large dog.
    `,
    knowledge: {
      0: `
        A riding dog is a Medium canine creature.
        They are bred for speed and endurance.
        Riding dogs are sometimes used as battle mounts by Small creatures such as halflings and gnomes.
      `,
    },
    level: 2,
    name: "Riding Dog",
    skillPoints: { awareness: 2, jump: 2, swim: 2 },
    size: "medium",
    speeds: { land: 35 },
    startingAttributes: { str: 1, dex: 1, con: 1, int: -7, per: 1, wil: -1 },
    weaponInput: [{ name: "bite" }],
  },
  {
    // TODO: include carrying capacity in description without having to manually calculate it
    alignment: "Always true neutral",
    armorInputs: [{ name: "fur" }],
    challengeRating: 2,
    knowledge: {
      0: `
        Camels are known for their ability to travel long distances without food or water.
      `,
    },
    level: 1,
    name: "Camel",
    skillPoints: { awareness: 1, endurance: 2 },
    size: "large",
    startingAttributes: { str: 3, dex: 0, con: 3, int: -8, per: 1 },
    weaponInput: [{ baseDamageDie: "1d6", name: "bite" }],
  },
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "fur" }],
    challengeRating: 1,
    knowledge: {
      0: `
        A dire rat is a Small omnivorous scavenger that resembles an unusually large rat.
        Dire rats are not generally aggressive, but will attack to defend their nests and territories.
      `,
      5: `
        Dire rats can grow to be up to 4 feet long and weigh over 50 pounds.
      `,
    },
    level: 1,
    name: "Dire Rat",
    // TODO: define diseases better so dire rats can inflict them
    // passiveAbilities: [{
    //   description: `
    //   `,
    //   name: "Disease",
    // }],
    skillPoints: { climb: 2, swim: 2 },
    size: "small",
    startingAttributes: { str: 0, dex: 3, con: 0, int: -9, per: 2, wil: -2 },
    weaponInput: [{ name: "bite" }],
  },
  {
    knowledge: {
      0: `
        Bears are large, furry animals known for their strength and tenacity.
      `,
    },
    level: 1,
    name: "Bears",
    monsters: [
      {
        alignment: "Always true neutral",
        armorInputs: [{ name: "fur" }],
        challengeRating: 2,
        knowledge: {
          0: `
            Black bears are Large forest-dwelling omnivores that are usually not dangerous unless an interloper threatens their cubs or food supply.
            Black bears can be pure black, blond, or cinnamon in color and are rarely more than 5 feet long.
          `,
        },
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
          A brown bear's statistics can be used for almost any big bear, including the grizzly.
        `,
        knowledge: {
          0: `
            Brown bears tend to be bad-tempered and territorial.
          `,
        },
        level: 5,
        height: "9 feet",
        name: "Brown bear",
        size: "large",
        startingAttributes: { str: 4, con: 4, int: -8, wil: -1 },
        weaponInput: [{ name: "bite" }],
        weight: "1,800 pounds",
      },
    ],
  },
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "fur" }],
    knowledge: {
      0: `
        Wolves are pack hunters known for their persistence and cunning.
      `,
    },
    level: 2,
    name: "Wolf",
    startingAttributes: { str: 1, dex: 2, con: 1, int: -7, wil: -1 },
    weaponInput: [{ name: "bite" }],
  },
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "hide" }],
    challengeRating: 2,
    knowledge: {
      // TODO: add carrying capacity to knowledge result
      0: `
        Horses are widely domesticated for riding and as beasts of burden.
      `,
    },
    level: 2,
    name: "Horse",
    size: "large",
    speeds: { land: 50 },
    startingAttributes: { str: 2, dex: 1, con: 3, int: -7, wil: -2 },
    weaponInput: [{ baseDamageDie: "1d6", name: "bite", powerMultiplier: 0.5 }],
  },
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "hide" }],
    description: `
      The statistics presented here describe a small horse, under 5 feet tall at the shoulder.
    `,
    knowledge: {
      // TODO: add carrying capacity to knowledge result
      0: `
        Ponies are similar to light horses and cannot fight while carrying a rider.
      `,
    },
    level: 2,
    name: "Pony",
    startingAttributes: { str: 1, con: 3, int: -7, wil: -2 },
    weaponInput: [{ baseDamageDie: "1d6", name: "bite", powerMultiplier: 0.5 }],
  },
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "feathers" }],
    challengeRating: 4,
    knowledge: {
      0: `
        A roc is an incredibly strong Gargantuan bird with the ability to carry off horses.
        It is typically 30 feet long from the beak to the base of the tail, with a wingspan as wide as 80 feet.
        Its plumage is either dark brown or golden from head to tail.
      `,
      5: `
        A roc attacks from the air, swooping earthward to snatch prey in its powerful talons and carry it off for itself and its young to devour.
        A solitary roc is typically hunting and will attack any Medium or larger creature that appears edible.
        A mated pair of rocs attack in concert, fighting to the death to defend their nests or hatchlings.
      `,
    },
    level: 9,
    name: "Roc",
    size: "gargantuan",
    startingAttributes: { str: 4, dex: 2, con: 3, int: -7, wil: -1 },
    weaponInput: [{ name: "bite" }],
    weight: "8,000 pounds",
  },
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "thick skin" }],
    challengeRating: 0.5,
    knowledge: {
      0: `
        Vampire eels are Medium, slimy snakelike carnivores.
        They swim through murky water, looking for edible creatures.
      `,
    },
    level: 6,
    name: "Vampire Eel",
    startingAttributes: { str: 3, dex: 3, con: 2, int: -8, per: 0, wil: -1 },
  },
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "fur" }],
    challengeRating: 2,
    knowledge: {
      0: `
        A dire wolf is a Large wolf-like creature.
        Their fur is usually mottled gray or black.
        Dire wolves are efficient pack hunters that will kill anything they can catch.
      `,
    },
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
      The statistics presented here can describe most nonpredatory birds of similar size.
    `,
    knowledge: {
      0: `
        A raven is a Tiny glossy black bird.
        A typical raven is about 2 feet long and has a wingspan of about 4 feet.
      `,
    },
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
    knowledge: {
      0: `
        A giant wasp is a Large insect resembling a normal wasp.
        Giant wasps attack when hungry or threatened, stinging their prey to death.
      `,
      5: `
        Giant wasps take dead or incapacitated opponents back to their lairs as food for their unhatched young.
      `,
    },
    level: 6,
    name: "Giant Wasp",
    size: "large",
    startingAttributes: { str: 1, dex: 4, con: 1, int: -8, per: 2, wil: -2 },
    weaponInput: [{ name: "stinger" }],
    passiveAbilities: [
      {
        description: `
          Whenever the $name makes a creature lose hit points with its stinger,
            the damaged creature becomes \\glossterm{poisoned} (see \\pcref{Poison}).
          The poison's initial hit makes the target \\glossterm{sickened} as long as the poison lasts.
          On the poison's third hit, the target becomes \\glossterm{paralyzed} as long as the poison lasts.
        `,
        name: "Paralyzing Sting",
      },
    ],
  },
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "carapace" }],
    attackInputs: [{ name: "acid breath" }],
    challengeRating: 2,
    knowledge: {
      0: `
        A giant bombardier beetle is a Large insect resembling a massive beetle.
        They feed primarily on carrion and offal, gathering heaps of the stuff in which they build nests and lay eggs.
      `,
      5: `
        A typical adult giant bombardier beetle is about 6 feet long.
        Giant bombardier beetles normally attack only to defend themselves, their nests, or their eggs.
      `,
    },
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
  passiveAbilities: [
    {
      // TODO: scale poison damage with level
      description: `
        Whenever the $name makes a creature lose hit points with its bite,
          the damaged creature becomes \\glossterm{poisoned} (see \\pcref{Poison}).
        The poison's initial hit makes the target lose 1d6 \\glossterm{hit points}.
        On the poison's third hit, the target loses 2d6 \\glossterm{hit points}.
      `,
      name: "Venom",
    },
  ],
  weaponInput: [{ name: "bite" as const }],
};
animalInput.push({
  knowledge: {
    0: `
      Centipedes can grow to enormous size.
      All giant centipedes use their poisonous bites to accelerate the death of their prey.
    `,
    5: `
      Giant centipedes are omnivorous, and are just as likely to eat a long-dead corpse or a tasty plant as they are to hunt living prey.
    `,
  },
  level: 4,
  name: "Centipedes",
  monsters: [
    {
      ...baseCentipede,
      level: 4,
      name: "Large Centipede",
      size: "large",
      startingAttributes: { str: 2, dex: -1, con: 2, int: -9 },
    },
    {
      ...baseCentipede,
      level: 7,
      name: "Huge Centipede",
      size: "huge",
      startingAttributes: { str: 4, dex: -1, con: 3, int: -9 },
    },
    {
      ...baseCentipede,
      level: 10,
      name: "Gargantuan Centipede",
      size: "gargantuan",
      startingAttributes: { str: 6, dex: -1, con: 4, int: -9 },
    },
    {
      ...baseCentipede,
      level: 13,
      name: "Colossal Centipede",
      size: "colossal",
      startingAttributes: { str: 8, dex: -1, con: 5, int: -9 },
    },
  ],
});

const baseSpider = {
  alignment: "Always true neutral",
  armorInputs: [{ name: "carapace" as const }],
  challengeRating: 4 as const,
  passiveAbilities: [
    {
      description: `
        Whenever the $name makes a creature lose hit points with its bite,
          the damaged creature becomes \\glossterm{poisoned} (see \\pcref{Poison}).
        The poison's initial hit makes the target \\glossterm{sickened} as long as the poison lasts.
        On the poison's third hit, the target becomes \\glossterm{paralyzed} as long as the poison lasts.
      `,
      name: "Paralyzing Venom",
    },
  ],
  weaponInput: [{ name: "bite" as const }],
};
animalInput.push({
  knowledge: {
    0: `
      Spiders can grow to enormous size.
      All giant spiders are able to spin entangling webs and use their paralyzing venom to subdue prey.
    `,
    5: `
      Some giant spiders are aggressive predators, wandering forests and similar areas in search of prey.
      Others are patient lurkers, building webs and waiting for prey to stumble into them.
    `,
  },
  level: 3,
  name: "Spiders",
  monsters: [
    {
      ...baseSpider,
      level: 3,
      name: "Large Spider",
      size: "large",
      startingAttributes: { str: 1, dex: 3, int: -9, per: 2 },
    },
    {
      ...baseSpider,
      level: 6,
      name: "Huge Spider",
      size: "huge",
      startingAttributes: { str: 2, dex: 3, int: -9, per: 3 },
    },
    {
      ...baseSpider,
      level: 9,
      name: "Gargantuan Spider",
      size: "gargantuan",
      startingAttributes: { str: 3, dex: 4, int: -9, per: 3 },
    },
    {
      ...baseSpider,
      level: 12,
      name: "Colossal Spider",
      size: "colossal",
      startingAttributes: { str: 4, dex: 4, int: -9, per: 4 },
    },
  ],
});

export const animals = addType("animal", animalInput);
