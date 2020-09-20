import { AttackInput } from "@src/attacks";
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

function baseDragonSize(
  age: AgeCategory,
  breathWeapon: AttackInput,
): Pick<
  MonsterBaseInput,
  "armorInputs" | "attackInputs" | "level" | "size" | "name" | "startingAttributes"
> {
  return {
    wyrmling: {
      armorInputs: [{ name: "scales" as const }],
      attackInputs: [breathWeapon],
      level: 2,
      size: "tiny" as const,
      name: "Wyrmling",
      startingAttributes: { str: -2, dex: 3, con: 1, int: 0, per: 0, wil: -1 },
    },
    juvenile: {
      armorInputs: [{ name: "scales" as const }],
      attackInputs: [breathWeapon, frightfulPresence("\\areasmall")],
      level: 5,
      size: "medium" as const,
      name: "Juvenile",
      startingAttributes: { str: 3, dex: 1, con: 2, int: 1, per: 1, wil: 1 },
    },
    youngAdult: {
      armorInputs: [{ name: "scales" as const }, { name: "reinforced" as const }],
      attackInputs: [breathWeapon, frightfulPresence("\\areamed")],
      level: 8,
      size: "large" as const,
      name: "Young Adult",
      startingAttributes: { str: 4, dex: 0, con: 2, int: 2, per: 2, wil: 2 },
    },
    adult: {
      armorInputs: [{ name: "scales" as const }, { name: "reinforced" as const }],
      attackInputs: [breathWeapon, frightfulPresence("\\arealarge")],
      level: 11,
      size: "huge" as const,
      name: "Adult",
      startingAttributes: { str: 5, dex: 0, con: 3, int: 3, per: 3, wil: 3 },
    },
    old: {
      armorInputs: [{ name: "scales" as const }, { name: "double reinforced" as const }],
      attackInputs: [breathWeapon, frightfulPresence("\\areahuge")],
      level: 14,
      size: "gargantuan" as const,
      name: "Old",
      startingAttributes: { str: 6, dex: -1, con: 4, int: 3, per: 3, wil: 3 },
    },
    ancient: {
      armorInputs: [{ name: "scales" as const }, { name: "double reinforced" as const }],
      attackInputs: [breathWeapon, frightfulPresence("\\areaext")],
      level: 17,
      size: "colossal" as const,
      name: "Ancient",
      startingAttributes: { str: 7, dex: -1, con: 4, int: 4, per: 4, wil: 4 },
    },
    wyrm: {
      armorInputs: [{ name: "scales" as const }, { name: "scales" as const }],
      attackInputs: [breathWeapon, frightfulPresence("500 ft.")],
      level: 20,
      size: "colossal" as const,
      name: "Wyrm",
      startingAttributes: { str: 8, dex: -2, con: 4, int: 5, per: 5, wil: 5 },
    },
    greatWyrm: {
      armorInputs: [{ name: "scales" as const }, { name: "scales" as const }],
      attackInputs: [breathWeapon, frightfulPresence("1,000 ft.")],
      level: 23,
      size: "colossal" as const,
      name: "Great Wyrm",
      startingAttributes: { str: 10, dex: -3, con: 5, int: 6, per: 6, wil: 6 },
    },
  }[age];
}

function frightfulPresence(area: string): AttackInput {
  return {
    defense: "mental",
    hit: "Each target is \\glossterm{shaken} by the dragon as a \\glossterm{condition}.",
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
  powerBonus,
}: {
  area: string;
  damageType: DamageType;
  name: string;
  powerBonus?: number;
}): AttackInput {
  return {
    damageTypes: [damageType],
    defense: "reflex" as const,
    name,
    hit: `Each target takes $damage.`,
    powerBonus,
    preface: `
      A dragon can use its breath weapon as a \\glossterm{minor action}.
      After a dragon uses its breath weapon, it cannot use it again until after the end of the next round.
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
      area: "\\areamed, 5 ft. wide line",
      damageType,
      name,
      powerBonus: -2,
    }),
    juvenile: standardBreathWeapon({
      area: "\\areamed, 10 ft. wide line",
      damageType,
      name,
      powerBonus: -2,
    }),
    youngAdult: standardBreathWeapon({
      area: "\\arealarge, 10 ft. wide line",
      damageType,
      name,
      powerBonus: -2,
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
      area: "\\areaext, 15 ft. wide line",
      damageType,
      name,
    }),
    greatWyrm: standardBreathWeapon({
      area: "\\areaext, 20 ft. wide line",
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
    { name: "Darkvision", description: "200 ft." },
    { name: "Blindsense", description: "50 ft." },
  ],
  skillPoints: { awareness: 2 },
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
  ],
  skillPoints: { ...baseDragon.skillPoints, stealth: 2 },
};

dragonInput.push({
  knowledge: {
    0: `
      Black dragons are associated with death and decay.
      They are the only dragon with an acidic breath.
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
      ...baseDragonSize("wyrmling", lineBreathWeapon("wyrmling", "acid")),
    },
    {
      ...baseBlackDragon,
      ...baseDragonSize("juvenile", lineBreathWeapon("juvenile", "acid")),
    },
    {
      ...baseBlackDragon,
      ...baseDragonSize("youngAdult", lineBreathWeapon("youngAdult", "acid")),
    },
    {
      ...baseBlackDragon,
      ...baseDragonSize("adult", lineBreathWeapon("adult", "acid")),
    },
    {
      ...baseBlackDragon,
      ...baseDragonSize("old", lineBreathWeapon("old", "acid")),
    },
    {
      ...baseBlackDragon,
      ...baseDragonSize("ancient", lineBreathWeapon("ancient", "acid")),
    },
    {
      ...baseBlackDragon,
      ...baseDragonSize("wyrm", lineBreathWeapon("wyrm", "acid")),
    },
    {
      ...baseBlackDragon,
      ...baseDragonSize("greatWyrm", lineBreathWeapon("greatWyrm", "acid")),
    },
  ].map((m) => {
    m.name = `${m.name} Black Dragon`;
    return m;
  }),
});

export const dragons = addType("dragon", dragonInput);
