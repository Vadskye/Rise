import { addType, TypelessMonsterInput } from "./add_type";

export const planeforgedInput: TypelessMonsterInput[] = [];

const baseFormian = {
  alignment: "Always lawful neutral",
  armorInputs: [{ name: "carapace" as const }],
  passiveAbilities: [
    {
      description: `
        All formians within 50 miles of their queen are in constant telepathic communication with her, regardless of any intervening physical obstacles.
        They instantaneously share information about threats and discoveries.
        This allows formians to usually respond to new information intelligently and in perfect unison, regardless of each formian's individual intelligence.
      `,
      name: "Hive Mind",
    },
  ],
};

planeforgedInput.push({
  knowledge: {
    0: `
      Formians are ant-like inhabitants of Lawful planes.
    `,
    5: `,
      Formians share a hive mind that allows telepathic communication at great distances.
      Most formians are simple drones with no independent thought or agency; they act only as directed by their queen.
      As a result, they fight with no concern for their own lives, serving only the greater good of the group.
      They may still retreat to avoid expending unnecessary resources on a battle that is already lost.
    `,
    10: `
      Formians often attempt to set up colonies in unclaimed locations on other planes to expand their influence, though they never attack civilizations or sentient creatures to do so.
      Once they have established their colonies, they consider themselves to have a rightful claim to that land, and they can be highly territorial.

      If a formian queen is killed, all formians it was controlling immediately become inert, taking no actions of any kind.
      These isolated formians typically die of dehydration or similar causes, though in rare cases they may be claimed by another formian queen.
    `,
  },
  level: 2,
  name: "Formians",
  monsters: [
    {
      // TODO: formian workers should have a craft skill, but representing individual craft
      // skills is awkward to read.
      ...baseFormian,
      challengeRating: 0.5,
      knowledge: {
        0: `
          Workers are the basic building block of formian society.
          A typical worker is about 3 feet long and about 2-1/2 feet high at the front.
          It weighs about 60 pounds.
          Its hands are suitable only for manual labor.
        `,
        5: `
          Individual workers are \\trait{mindless}, but they are given instructions by the hive mind.
          Even the smallest formian colony typically has hundreds of workers, and larger colonies can have tens of thousands.
          Workers are generally given orders by a formian queen in groups of at least five, and it is rare to see an individual worker on its own.
        `,
      },
      level: 2,
      name: "Worker",
      skillPoints: { climb: 2, craft: 2 },
      size: "medium",
      speeds: { land: 30 },
      startingAttributes: { str: 1, dex: 2, con: 1, int: null, per: 0, wil: 0 },
      weaponInput: [{ name: "bite" }],
    },
    {
      ...baseFormian,
      challengeRating: 1,
      knowledge: {
        0: `
          Warriors are the basic fighting unit of formian society.
          In combat, warriors use their high mobility to ruthlessly coordinate attacks on their most dangerous or most vulnerable foes.
          A warrior is about is about 5 feet long and about 4-1/2 feet high at the front.
          It weighs about 180 pounds.
        `,
        5: `
          Even the smallest colony typically has dozens of warriors, and larger colonies can have thousands.
          They are \\trait{mindless}, but they are given instructions by the hive mind.
        `,
      },
      level: 5,
      name: "Warrior",
      passiveAbilities: [
        {
          description: `
            Whenever the $name makes a creature lose hit points with its stinger, the damaged creature becomes \\glossterm{poisoned} (see \\pcref{Poison}).
            The creature loses 1d4 \\glossterm{hit points} from each hit with the poison.
            On the poison's third hit, the creature is \\dazed until the poison ends.
          `,
          name: "Poison Sting",
        },
      ],
      skillPoints: { awareness: 2, climb: 2, jump: 2, stealth: 2 },
      size: "medium",
      speeds: { land: 40 },
      startingAttributes: { str: 1, dex: 2, con: 1, int: null, per: 0, wil: 0 },
      weaponInput: [{ name: "stinger" }, { name: "bite" }],
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
      powerMultiplier: 0.5 as const,
      target: "Each \\glossterm{enemy} within reach",
      weaponName: "slam" as const,
    },
  ],
  challengeRating: 2 as const,
  knowledgeSkills: ["planes"],
  // TODO: give air elementals a unique description
  languages: ["Auran"],
  startingAttributes: { str: 1, dex: 4, con: 1, int: -2, per: 2 },
  weaponInput: [{ name: "slam" as const }],
};
planeforgedInput.push({
  knowledge: {
    0: `
      Air elementals are the embodiment of the natural element of air.
      Their rapid flying speed makes them useful on vast battlefields or in extended aerial combat.
    `,
  },
  knowledgeSkills: ["planes"],
  level: 5,
  name: "Air Elementals",
  monsters: [
    {
      ...baseAirElemental,
      level: 5,
      name: "Large Air Elemental",
      size: "large",
    },
    {
      ...baseAirElemental,
      level: 8,
      name: "Huge Air Elemental",
      size: "huge",
    },
    {
      ...baseAirElemental,
      challengeRating: 4,
      level: 11,
      name: "Elder Air Elemental",
      size: "huge",
      startingAttributes: { str: 1, dex: 6, con: 1, int: 0, per: 3 },
    },
  ],
});

export const planeforged = addType("planeforged", planeforgedInput);
