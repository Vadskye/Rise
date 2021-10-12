import * as format from "@src/latex/format";
import { addType, TypelessMonsterInput } from "./add_type";

export const planeforgedInput: TypelessMonsterInput[] = [];

const baseAngel = {
  alignment: "Always good",
  armorInputs: [{ name: "thick skin" as const }],
  challengeRating: 4 as const,
  languages: ["Celestial", "Common", "Draconic", "Abyssal"],
};

planeforgedInput.push({
  knowledge: {
    0: `
      Angels are divine beings native to the good-aligned Aligned Planes.
    `,
    10: `
      All angels have a striking and highly memorable appearance that evokes strong emotions in most viewers.
      Most angels evoke an overpowering sense of awe and beauty, but individual angels may have highly varied appearances.
    `,
  },
  level: 0,
  name: "Angels",
  monsters: [
    {
      ...baseAngel,
      attackInputs: [
        {
          baseDamageDie: "1d8",
          damageTypes: ["energy"],
          defense: "mental",
          hit: "Each target takes $damage.",
          name: "Proclamation",
          powerMultiplier: 0.5,
          source: "magical",
          target: "All \\glossterm{enemies} within a \\areamed radius from the $name",
        },
        {
          accuracyBonus: 2,
          crit: "The target is \\blinded as a condition.",
          defense: "mental",
          hit: "The target is \\dazzled as a \\glossterm{condition}.",
          name: "Glimpse of Divinity",
          source: "magical",
          target: "One creature within \\rngmed range of the $name",
        },
        {
          hit:
            "The target takes $damage. If the target loses \\glossterm{hit points} from the attack, it is \\stunned as a \\glossterm{condition}.",
          name: "Stunning Smash",
          powerMultiplier: 1,
          weaponName: "greatmace",
        },
      ],
      knowledge: {
        0: `
          An astral deva is about 7 1/2 feet tall and weighs about 250 pounds.
        `,
      },
      level: 12,
      name: "Astral Deva",
      passiveAbilities: [
        {
          description: `
              The $name can take two standard actions each round.
              It cannot use the same action twice in the same round.
            `,
          name: "Divine Alacrity",
        },
        {
          description: `
              An astral deva can learn and perform divine spells and rituals as a rank 5 caster.
              It has access to two spheres and knows five spells from among those spheres.
              They do not use verbal or somatic components to cast spells, and do not suffer any \\glossterm{focus penalty}.
              A typical astral deva has access to the Bless and Channel Divinity spheres, and knows the \\spell{agent of the divine}, \\spell{boon of cleansing}, \\spell{glimpse of divinity}, \\spell{mantle of faith} and \\spell{greater word of faith} spells.
            `,
          name: "Divine Intervention",
        },
        {
          description: (monster) => `
              The $name is \\glossterm{attuned} to this ability.
              It gains a +8 \\glossterm{magic bonus} to \\glossterm{damage resistance}.
            `,
          magical: true,
          name: "Mantle of Faith",
        },
      ],
      speeds: { fly: 40, land: 40 },
      startingAttributes: { str: 3, dex: 2, con: 2, int: 2, per: 2, wil: 3 },
      weaponInput: [{ name: "greatmace" }],

      // mantle of faith
      drBonus: 8,

      // agent of the divine
      accuracyBonus: 1,
      defenseBonuses: {
        armor: 1,
        fortitude: 1,
        reflex: 1,
        mental: 1,
      },
      powerBonuses: {
        magical: 2,
        mundane: 2,
      },
    },
    {
      ...baseAngel,
      knowledge: {
        0: `
          A planetar is nearly 9 feet tall and weighs about 500 pounds.
        `,
      },
      level: 16,
      name: "Planetar",
      drBonus: 16,
      speeds: { fly: 50, land: 50 },
      startingAttributes: { str: 3, dex: 2, con: 2, int: 2, per: 2, wil: 3 },
      weaponInput: [{ name: "greatmace" }],
    },
    {
      ...baseAngel,
      drBonus: 16,
      knowledge: {
        0: `
          A solar has a deep and commanding voice, and stands about 9 feet tall. It weighs about 500 pounds.
        `,
      },
      level: 20,
      name: "Solar",
      speeds: { fly: 60, land: 60 },
      startingAttributes: { str: 3, dex: 2, con: 2, int: 2, per: 2, wil: 3 },
      weaponInput: [{ name: "greatmace" }],
    },
  ],
});

const baseDemon = {
  alignment: "Always evil",
  armorInputs: [{ name: "thick skin" as const }],
  languages: ["Abyssal"],
};

planeforgedInput.push({
  knowledge: {
    0: `
      Demons are infernal beings native to the evil-aligned Aligned Planes.
    `,
  },
  level: 0,
  name: "Demons",
  monsters: [
    {
      ...baseDemon,
      attackInputs: [
        {
          baseDamageDie: "1d8",
          damageTypes: ["piercing"],
          defense: "armor",
          hit: "The target takes $damage.",
          name: "Retributive Barbs",
          powerMultiplier: 0.5,
          preface: `
            Whenever a creature adjacent to the barbed demon makes a melee \\glossterm{strike} against it,
            the barbed demon makes this attack against the attacker.
            \\par
          `,
          source: "mundane",
          target: "The attacking creature",
        },
        {
          baseDamageDie: "1d10",
          damageTypes: ["piercing"],
          defense: "armor",
          hit: `
            The target takes $damage.
            In addition, if the target loses \\glossterm{hit points} from this attack, it is \\grappled by the $name.
          `,
          name: "Impale",
          powerMultiplier: 1,
          source: "mundane",
          target: "One creature within \\glossterm{reach}",
          weaponName: "tentacle",
        },
      ],
      challengeRating: 1,
      knowledge: {
        0: `
          Barbed demons are named for the dangerous spikes that protrude from all around their bodies.
          They use the spikes to impale their foes.
        `,
        5: `
          Attacking a barbed demon in close range is dangerous because of their spikes.
          Careless attackers can easily hurt themselves more than the demon.
        `,
      },
      level: 7,
      name: "Barbed Demon",
      startingAttributes: { str: 2, dex: 1, con: 0, int: -2, per: 2, wil: 2 },
      weaponInput: [{ name: "stinger" }],
    },
  ],
});

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
          Individual workers are \\glossterm{mindless}, but they are given instructions by the hive mind.
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
          They are \\glossterm{mindless}, but they are given instructions by the hive mind.
        `,
      },
      level: 5,
      name: "Warrior",
      passiveAbilities: [
        {
          description: `
            Whenever the $name makes a creature lose hit points with its stinger, the damaged creature becomes \\glossterm{poisoned} (see \\pcref{Poison}).
            The creature loses 1d6 \\glossterm{hit points} from each hit with the poison.
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
