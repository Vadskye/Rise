import { damageTypes } from "@src/data";
import * as format from "@src/latex/format";
import { MonsterBase } from "@src/monsters/reformat_monster_input";
import { addType, TypelessMonsterInput } from "./add_type";

export const outsiderInput: TypelessMonsterInput[] = [];

const baseAngel = {
  alignment: "Always good",
  armorInputs: [{ name: "thick skin" as const }],
  challengeRating: 4 as const,
  delayedCalculations: [
    (monster: MonsterBase) => {
      for (const resistanceType of ["damage" as const, "vital" as const]) {
        for (const damageType of damageTypes) {
          monster.resistances[resistanceType][damageType] += Math.floor(monster.magicalPower / 2);
        }
      }
    },
  ],
  languages: ["Celestial", "Common", "Draconic", "Infernal"],
};

outsiderInput.push({
  description: ``,
  knowledge: {
    0: `
      Angels are divine beings native to the good-aligned Outer Planes.
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
          damageTypes: ["energy"],
          defense: "mental",
          hit: "Each target takes $damage.",
          name: "Proclamation",
          powerBonus: -2,
          source: "magical",
          target: "\\glossterm{Enemies} within a \\arealarge radius from the $name",
        },
        {
          accuracyBonus: 2,
          crit: "The target is \\glossterm{blinded} as a condition.",
          defense: "mental",
          hit: "The target is \\glossterm{dazzled} as a \\glossterm{condition}.",
          name: "Glimpse of Divinity",
          source: "magical",
          target: "One creature within \\rngmed range of the $name",
        },
        {
          hit:
            "The target takes $damage. If the target is \\glossterm{wounded} by the attack, it is \\glossterm{stunned} as a \\glossterm{condition}.",
          name: "Stunning Smash",
          weaponName: "greatmace",
        },
      ],
      description: ``,
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
              A typical astral deva has access to the Bless and Channel Divinity spheres, and knows the \\spell{agent of the divine}, \\spell{boon of cleansing}, \\spell{glimpse of divinity}, \\spell{mantle of faith} and \\spell{proclamation} spells.
            `,
          name: "Divine Intervention",
        },
        {
          description: `
              The $name is \\glossterm{attuned} to this ability.
              It gains a \\plus1 \\glossterm{magic bonus} to accuracy and all defenses, and a \\plus2 magic bonus to power.
            `,
          magical: true,
          name: "Agent of the Divine",
        },
        {
          description: (monster) => `
              The $name is \\glossterm{attuned} to this ability.
              It gains a ${format.modifier(
                Math.floor(monster.magicalPower / 2),
              )} \\glossterm{magic bonus} to \\glossterm{resistances}.
            `,
          magical: true,
          name: "Mantle of Faith",
        },
      ],
      speeds: { fly: 40, land: 40 },
      startingAttributes: { str: 3, dex: 2, con: 2, int: 2, per: 2, wil: 3 },
      weaponInput: [{ name: "greatmace" }],

      // mantle of faith
      resistanceBonuses: { energy: 6 },

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
      description: ``,
      knowledge: {
        0: `
          A planetar is nearly 9 feet tall and weighs about 500 pounds.
        `,
      },
      level: 16,
      name: "Planetar",
      // +half level to energy resistance
      resistanceBonuses: { energy: 8 },
      speeds: { fly: 50, land: 50 },
      startingAttributes: { str: 3, dex: 2, con: 2, int: 2, per: 2, wil: 3 },
      weaponInput: [{ name: "greatmace" }],
    },
    {
      ...baseAngel,
      description: ``,
      knowledge: {
        0: `
          A solar has a deep and commanding voice, and stands about 9 feet tall. It weighs about 500 pounds.
        `,
      },
      level: 20,
      name: "Solar",
      // +half level to energy resistance
      resistanceBonuses: { energy: 10 },
      speeds: { fly: 60, land: 60 },
      startingAttributes: { str: 3, dex: 2, con: 2, int: 2, per: 2, wil: 3 },
      weaponInput: [{ name: "greatmace" }],
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

outsiderInput.push({
  description: ``,
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
      description: ``,
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
      size: "small",
      speeds: { land: 30 },
      startingAttributes: { str: 1, dex: 2, con: 1, int: null, per: 0, wil: 0 },
      weaponInput: [{ name: "bite" }],
    },
    {
      ...baseFormian,
      challengeRating: 1,
      description: ``,
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
            Whenever the $name \\glossterm{wounds} a creature with its stinger, the damaged creature becomes \\glossterm{poisoned} (see \\pcref{Poison}).
            The creature loses a \\glossterm{hit point} from each hit with the poison.
            On the poison's third hit, the creature is \\glossterm{sickened} until the poison ends.
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

export const outsiders = addType("outsider", outsiderInput);
