import { damageTypes } from "@src/data";
import * as format from "@src/latex/format";
import { MonsterBase } from "@src/monsters/reformat_monster_input";
import { addType, TypelessMonsterInput } from "./add_type";

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

export const outsiderInput: TypelessMonsterInput[] = [
  {
    description: `
      Angels are divine beings native to the good-aligned Outer Planes.
      All angels have a striking and highly memorable appearance that evokes strong emotions in most viewers.
      Most angels evoke an overpowering sense of awe and beauty, but individual angels may have highly varied appearances.
    `,
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
        description: `
         An astral deva is about 7 1/2 feet tall and weighs about 250 pounds.
        `,
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
        description: `
          A planetar is nearly 9 feet tall and weighs about 500 pounds.
        `,
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
        description: `
          A solar has a deep and commanding voice, and stands about 9 feet tall. It weighs about 500 pounds.
        `,
        level: 20,
        name: "Solar",
        // +half level to energy resistance
        resistanceBonuses: { energy: 10 },
        speeds: { fly: 60, land: 60 },
        startingAttributes: { str: 3, dex: 2, con: 2, int: 2, per: 2, wil: 3 },
        weaponInput: [{ name: "greatmace" }],
      },
    ],
  },
];

export const outsiders = addType("outsider", outsiderInput);
