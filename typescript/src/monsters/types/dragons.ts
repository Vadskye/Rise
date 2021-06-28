import { AttackInput } from "@src/monsters/mechanics";
import { DamageType } from "@src/data";
import { MonsterBaseInput } from "@src/monsters/reformat_monster_input";
import { titleCase } from "change-case";
import { addType, TypelessMonsterInput } from "./add_type";

type AgeCategory =
  | "wyrmling"
  | "juvenile"
  | "youngAdult"
  | "adult"
  | "old"
  | "ancient"
  | "wyrm"
  | "greatWyrm";

const baseDragonBySize = {
  wyrmling: {
    armorInputs: [{ name: "scales" as const }],
    attackInputs: [],
    level: 2,
    size: "tiny" as const,
    name: "Wyrmling",
    startingAttributes: { str: -2, dex: 3, con: 1, int: 0, per: 0, wil: -1 },
  },
  juvenile: {
    armorInputs: [{ name: "scales" as const }],
    attackInputs: [frightfulPresence("\\areasmall")],
    level: 5,
    size: "medium" as const,
    name: "Juvenile",
    startingAttributes: { str: 3, dex: 1, con: 2, int: 1, per: 1, wil: 1 },
  },
  youngAdult: {
    armorInputs: [{ name: "scales" as const }, { name: "reinforced" as const }],
    attackInputs: [frightfulPresence("\\areamed")],
    level: 8,
    size: "large" as const,
    name: "Young Adult",
    startingAttributes: { str: 4, dex: 0, con: 2, int: 2, per: 2, wil: 2 },
  },
  adult: {
    armorInputs: [{ name: "scales" as const }, { name: "reinforced" as const }],
    attackInputs: [frightfulPresence("\\arealarge")],
    level: 11,
    size: "huge" as const,
    name: "Adult",
    startingAttributes: { str: 5, dex: 0, con: 3, int: 3, per: 3, wil: 3 },
  },
  old: {
    armorInputs: [{ name: "scales" as const }, { name: "double reinforced" as const }],
    attackInputs: [frightfulPresence("\\areahuge")],
    level: 14,
    size: "gargantuan" as const,
    name: "Old",
    startingAttributes: { str: 6, dex: -1, con: 4, int: 3, per: 3, wil: 3 },
  },
  ancient: {
    armorInputs: [{ name: "scales" as const }, { name: "double reinforced" as const }],
    attackInputs: [frightfulPresence("\\areagarg")],
    level: 17,
    size: "colossal" as const,
    name: "Ancient",
    startingAttributes: { str: 7, dex: -1, con: 4, int: 4, per: 4, wil: 4 },
  },
  wyrm: {
    armorInputs: [{ name: "scales" as const }, { name: "scales" as const }],
    attackInputs: [frightfulPresence("480 ft.")],
    level: 20,
    size: "colossal" as const,
    name: "Wyrm",
    startingAttributes: { str: 8, dex: -2, con: 4, int: 5, per: 5, wil: 5 },
  },
  greatWyrm: {
    armorInputs: [{ name: "scales" as const }, { name: "scales" as const }],
    attackInputs: [frightfulPresence("1,000 ft.")],
    level: 23,
    size: "colossal" as const,
    name: "Great Wyrm",
    startingAttributes: { str: 10, dex: -3, con: 5, int: 6, per: 6, wil: 6 },
  },
};

function baseDragonWithBreath(
  age: AgeCategory,
  breathWeapon: AttackInput,
): Pick<
  MonsterBaseInput,
  "armorInputs" | "attackInputs" | "level" | "size" | "name" | "startingAttributes"
> {
  return {
    ...baseDragonBySize[age],
    attackInputs: [...baseDragonBySize[age].attackInputs, breathWeapon],
  };
}

function frightfulPresence(area: string): AttackInput {
  return {
    defense: "mental",
    hit: "Each target is \\shaken by the dragon as a \\glossterm{condition}.",
    name: "Frightful Presence",
    preface: `
      The dragon can use this ability once per round as a \\glossterm{free action}.
      After it attacks a creature this way, the creature becomes immune to this ability until it takes a \\glossterm{short rest}.
      \\par
    `,
    source: "mundane",
    target: `Enemies within a ${area} radius from the dragon`,
  };
}

function standardBreathWeapon({
  area,
  damageType,
  name,
}: {
  area: string;
  damageType: DamageType;
  name: string;
}): AttackInput {
  return {
    baseDamageDie: "1d8",
    damageTypes: [damageType],
    defense: "reflex" as const,
    name,
    hit: `Each target takes $damage.`,
    powerMultiplier: 0.5,
    preface: `
      A dragon can use its breath weapon as a \\glossterm{minor action}.
      After a dragon uses its breath weapon, it \\glossterm{briefly} cannot use it again.
      \\par
    `,
    source: "magical" as const,
    target: `Everything in a ${area}`,
  };
}

function lineBreathWeapon(age: AgeCategory, damageType: DamageType): AttackInput {
  const name = titleCase(`${damageType} Breath`);
  return {
    wyrmling: standardBreathWeapon({
      area: "\\areasmall, 5 ft. wide line",
      damageType,
      name,
    }),
    juvenile: standardBreathWeapon({
      area: "\\areamed, 5 ft. wide line",
      damageType,
      name,
    }),
    youngAdult: standardBreathWeapon({
      area: "\\arealarge, 5 ft. wide line",
      damageType,
      name,
    }),
    adult: standardBreathWeapon({
      area: "\\arealarge, 10 ft. wide line",
      damageType,
      name,
    }),
    old: standardBreathWeapon({
      area: "\\areahuge, 10 ft. wide line",
      damageType,
      name,
    }),
    ancient: standardBreathWeapon({
      area: "\\areahuge, 15 ft. wide line",
      damageType,
      name,
    }),
    wyrm: standardBreathWeapon({
      area: "\\areagarg, 15 ft. wide line",
      damageType,
      name,
    }),
    greatWyrm: standardBreathWeapon({
      area: "\\areagarg, 20 ft. wide line",
      damageType,
      name,
    }),
  }[age];
}

function coneBreathWeapon(age: AgeCategory, damageType: DamageType): AttackInput {
  const name = titleCase(`${damageType} Breath`);
  return {
    wyrmling: standardBreathWeapon({
      area: "\\areasmall cone",
      damageType,
      name,
    }),
    juvenile: standardBreathWeapon({
      area: "\\areamed cone",
      damageType,
      name,
    }),
    youngAdult: standardBreathWeapon({
      area: "\\areamed cone",
      damageType,
      name,
    }),
    adult: standardBreathWeapon({
      area: "\\arealarge cone",
      damageType,
      name,
    }),
    old: standardBreathWeapon({
      area: "\\arealarge cone",
      damageType,
      name,
    }),
    ancient: standardBreathWeapon({
      area: "\\areahuge cone",
      damageType,
      name,
    }),
    wyrm: standardBreathWeapon({
      area: "\\areahuge cone",
      damageType,
      name,
    }),
    greatWyrm: standardBreathWeapon({
      area: "\\areagarg cone",
      damageType,
      name,
    }),
  }[age];
}

export const dragonInput: TypelessMonsterInput[] = [];

const baseDragon = {
  challengeRating: 4 as const,
  passiveAbilities: [
    { name: "Low-light vision" },
    { name: "Darkvision", description: "240 ft." },
    { name: "Blindsense", description: "60 ft." },
  ],
  skillPoints: { awareness: 2, intimidate: 2, persuasion: 2, socialInsight: 2 },
  weaponInput: [{ name: "bite" as const }, { name: "claw" as const }],
};

const baseBlackDragon = {
  ...baseDragon,
  alignment: "Usually neutral evil",
  passiveAbilities: [
    ...baseDragon.passiveAbilities,
    {
      description: `
        A black dragon can breathe underwater indefinitely.
        It suffers no penalties for fighting underwater, and its breath weapon functions at full strength underwater.
      `,
      name: "Underwater Freedom",
    },
    {
      description: `A black dragon is immune to acid damage.`,
      name: "Acid immunity",
    },
  ],
  skillPoints: { ...baseDragon.skillPoints, stealth: 2 },
};

dragonInput.push({
  knowledge: {
    0: `
      Black dragons are associated with death and decay.
      They are the only type of dragon that commonly kills for no purpose other than sport, even if there is no treasure to be gained.
    `,
    5: `
      As black dragons age, the fleshy hide around their horns and face deteriorates, causing their heads to increasingly resemble a skull.
      Young black dragons usually inhabit marshes and swamps, though older dragons tend to migrate to caves that are better equipped to support large dragon hoards.
    `,
  },
  level: 3,
  name: "Black dragons",
  monsters: [
    {
      ...baseBlackDragon,
      ...baseDragonWithBreath("wyrmling", lineBreathWeapon("wyrmling", "acid")),
    },
    {
      ...baseBlackDragon,
      ...baseDragonWithBreath("juvenile", lineBreathWeapon("juvenile", "acid")),
    },
    {
      ...baseBlackDragon,
      ...baseDragonWithBreath("youngAdult", lineBreathWeapon("youngAdult", "acid")),
    },
    {
      ...baseBlackDragon,
      ...baseDragonWithBreath("adult", lineBreathWeapon("adult", "acid")),
    },
    {
      ...baseBlackDragon,
      ...baseDragonWithBreath("old", lineBreathWeapon("old", "acid")),
    },
    {
      ...baseBlackDragon,
      ...baseDragonWithBreath("ancient", lineBreathWeapon("ancient", "acid")),
    },
    {
      ...baseBlackDragon,
      ...baseDragonWithBreath("wyrm", lineBreathWeapon("wyrm", "acid")),
    },
    {
      ...baseBlackDragon,
      ...baseDragonWithBreath("greatWyrm", lineBreathWeapon("greatWyrm", "acid")),
    },
  ].map((m) => {
    m.name = `${m.name} Black Dragon`;
    return m;
  }),
});

const baseRedDragon = {
  ...baseDragon,
  alignment: "Usually chaotic evil",
  passiveAbilities: [
    ...baseDragon.passiveAbilities,
    {
      description: `A red dragon is immune to fire damage.`,
      name: "Fire immunity",
    },
  ],
};

dragonInput.push({
  knowledge: {
    0: `
      Red dragons are the most aggressive dragons, and they are extremely confident in their own abilities.
      This combination makes them the most feared type of dragon in most locations.
    `,
    5: `
      Red dragons are less intelligent and more impulsive than most dragons, though older red dragons are still far above average human intelligence.
    `,
    10: `
      Older red dragons know that their fire breath is hot enough to destroy valuable treasure, so they tend to avoid using it in fights that they expect to be both easy and profitable.
    `,
  },
  level: 3,
  name: "Red dragons",
  monsters: [
    {
      ...baseRedDragon,
      ...baseDragonWithBreath("wyrmling", coneBreathWeapon("wyrmling", "fire")),
      startingAttributes: { ...baseDragonBySize.wyrmling.startingAttributes, int: -2, wil: 1 },
    },
    {
      ...baseRedDragon,
      ...baseDragonWithBreath("juvenile", coneBreathWeapon("juvenile", "fire")),
      startingAttributes: { ...baseDragonBySize.juvenile.startingAttributes, int: -1, wil: 3 },
    },
    {
      ...baseRedDragon,
      ...baseDragonWithBreath("youngAdult", coneBreathWeapon("youngAdult", "fire")),
      startingAttributes: { ...baseDragonBySize.youngAdult.startingAttributes, int: 0, wil: 4 },
    },
    {
      ...baseRedDragon,
      ...baseDragonWithBreath("adult", coneBreathWeapon("adult", "fire")),
      startingAttributes: { ...baseDragonBySize.adult.startingAttributes, int: 1, wil: 5 },
    },
    {
      ...baseRedDragon,
      ...baseDragonWithBreath("old", coneBreathWeapon("old", "fire")),
      startingAttributes: { ...baseDragonBySize.old.startingAttributes, int: 2, wil: 6 },
    },
    {
      ...baseRedDragon,
      ...baseDragonWithBreath("ancient", coneBreathWeapon("ancient", "fire")),
      startingAttributes: { ...baseDragonBySize.ancient.startingAttributes, int: 3, wil: 7 },
    },
    {
      ...baseRedDragon,
      ...baseDragonWithBreath("wyrm", coneBreathWeapon("wyrm", "fire")),
      startingAttributes: { ...baseDragonBySize.wyrm.startingAttributes, int: 4, wil: 8 },
    },
    {
      ...baseRedDragon,
      ...baseDragonWithBreath("greatWyrm", coneBreathWeapon("greatWyrm", "fire")),
      startingAttributes: { ...baseDragonBySize.greatWyrm.startingAttributes, int: 5, wil: 9 },
    },
  ].map((m) => {
    m.name = `${m.name} Red Dragon`;
    return m;
  }),
});

const baseBlueDragon = {
  ...baseDragon,
  alignment: "Usually lawful evil",
  passiveAbilities: [
    ...baseDragon.passiveAbilities,
    {
      description: `A blue dragon is immune to electricity damage.`,
      name: "Electricity immunity",
    },
  ],
};

dragonInput.push({
  knowledge: {
    0: `
      Blue dragons are the most cunning and quick-thinking dragons.
    `,
  },
  level: 3,
  name: "Blue dragons",
  monsters: [
    {
      ...baseBlueDragon,
      ...baseDragonWithBreath("wyrmling", lineBreathWeapon("wyrmling", "electricity")),
    },
    {
      ...baseBlueDragon,
      ...baseDragonWithBreath("juvenile", lineBreathWeapon("juvenile", "electricity")),
    },
    {
      ...baseBlueDragon,
      ...baseDragonWithBreath("youngAdult", lineBreathWeapon("youngAdult", "electricity")),
    },
    {
      ...baseBlueDragon,
      ...baseDragonWithBreath("adult", lineBreathWeapon("adult", "electricity")),
    },
    {
      ...baseBlueDragon,
      ...baseDragonWithBreath("old", lineBreathWeapon("old", "electricity")),
    },
    {
      ...baseBlueDragon,
      ...baseDragonWithBreath("ancient", lineBreathWeapon("ancient", "electricity")),
    },
    {
      ...baseBlueDragon,
      ...baseDragonWithBreath("wyrm", lineBreathWeapon("wyrm", "electricity")),
    },
    {
      ...baseBlueDragon,
      ...baseDragonWithBreath("greatWyrm", lineBreathWeapon("greatWyrm", "electricity")),
    },
  ].map((m) => {
    m.name = `${m.name} Blue Dragon`;
    return m;
  }),
});

const baseGreenDragon = {
  ...baseDragon,
  alignment: "Usually chaotic evil",
  passiveAbilities: [
    ...baseDragon.passiveAbilities,
    {
      description: `A green dragon is immune to acid damage.`,
      name: "Acid immunity",
    },
  ],
};

dragonInput.push({
  knowledge: {
    0: `
      Green dragons are the most jealous and greedy dragons.
      Their lust for wealth, especially the wealth of others, is insatiable.
      Towns near a green dragon may never know peace until it leaves.
    `,
    5: `
      Younger green dragons sometimes get themselves into trouble by trying to steal from more powerful creatures, or by pillaging cities with the resources to pay for a hefty bounty.
      Green dragons that have survived to old age are usually more reasonable than the average green dragon, and recognize the necessity for other creatures to temporarily have nice things.
    `,
  },
  level: 3,
  name: "Green dragons",
  monsters: [
    {
      ...baseGreenDragon,
      ...baseDragonWithBreath("wyrmling", coneBreathWeapon("wyrmling", "acid")),
    },
    {
      ...baseGreenDragon,
      ...baseDragonWithBreath("juvenile", coneBreathWeapon("juvenile", "acid")),
    },
    {
      ...baseGreenDragon,
      ...baseDragonWithBreath("youngAdult", coneBreathWeapon("youngAdult", "acid")),
    },
    {
      ...baseGreenDragon,
      ...baseDragonWithBreath("adult", coneBreathWeapon("adult", "acid")),
    },
    {
      ...baseGreenDragon,
      ...baseDragonWithBreath("old", coneBreathWeapon("old", "acid")),
    },
    {
      ...baseGreenDragon,
      ...baseDragonWithBreath("ancient", coneBreathWeapon("ancient", "acid")),
    },
    {
      ...baseGreenDragon,
      ...baseDragonWithBreath("wyrm", coneBreathWeapon("wyrm", "acid")),
    },
    {
      ...baseGreenDragon,
      ...baseDragonWithBreath("greatWyrm", coneBreathWeapon("greatWyrm", "acid")),
    },
  ].map((m) => {
    m.name = `${m.name} Green Dragon`;
    return m;
  }),
});

export const dragons = addType("dragon", dragonInput);
