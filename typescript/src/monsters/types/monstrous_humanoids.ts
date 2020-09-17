import { energyDamageTypes } from "@src/data";
import { WeaponInput } from "@src/weapons";
import { addType, TypelessMonsterInput } from "./add_type";

const boulder: WeaponInput = {
  damageTypes: ["bludgeoning"],
  name: "boulder",
  powerBonus: 2,
  rangeIncrement: 100,
};

export const monstrousHumanoidInput: TypelessMonsterInput[] = [
  {
    alignment: "Usually chaotic evil",
    attackInputs: [
      {
        // Uses str for accuracy instead of per
        accuracyBonus: 2,
        defense: "fortitude",
        hit: `The target is knocked back 10 feet and takes $damage.`,
        name: "Forceful Shove",
        powerBonus: -6,
        preface: `
          For each size category larger or smaller than the target that the minotaur is, it gains a +4 bonus or penalty to \\glossterm{accuracy}.
        `,
        target: "As a ram strike",
        weaponName: "ram",
      },
    ],
    armorInputs: [{ name: "fur" }],
    challengeRating: 2,
    description: `
      Minotaurs are bull-headed creatures known for their poor sense of direction.
      They can be cunning in battle, but have a tendency to become trapped in dungeons of even moderate complexity.
    `,
    languages: [],
    level: 6,
    name: "Minotaur",
    size: "large",
    startingAttributes: { str: 4, dex: -1, con: 2, per: 0, wil: 1 },
    weaponInput: [{ name: "gore" }, { name: "ram" }],
  },
  {
    alignment: "Usually chaotic evil",
    attackInputs: [
      {
        defense: "reflex",
        hit: `
          The target takes $damage.
          If this attack also beats the target's Fortitude defense, it is \\glossterm{grappled} by the $name.
      `,
        name: "Snatch",
        weaponName: "tentacle",
      },
      {
        defense: "fortitude",
        hit: `The target takes $damage and is \\glossterm{grappled} by the $name.`,
        name: "Choke",
        powerBonus: 6,
        target: "One creature \\glossterm{grappled} by the $name",
        weaponName: "tentacle",
      },
    ],
    armorInputs: [{ name: "fur" }],
    challengeRating: 1,
    description: `
      Chokers are vicious predators that delight in strangling their foes.
      They live to hear the desperate gasping for breath and crunching of bones that their powerful arms can inflict on their prey.
      They are bipedal, but their arms are inhumanly long and sinuous, terminating in hands with spiny pads to help them hold on tightly to walls and foes.
    `,
    languages: [],
    level: 5,
    name: "Choker",
    size: "small",
    speeds: { climb: 20 },
    startingAttributes: { str: 3, dex: 3, con: -1, int: -5, per: 0, wil: -1 },
    weaponInput: [{ name: "tentacle" }],
  },
];

const baseOgre = {
  alignment: "Usually chaotic evil",
  armorInputs: [{ name: "thick skin" as const }, { name: "breastplate" as const }],
  languages: ["Giant"],
  size: "large" as const,
  startingAttributes: { str: 4, dex: -1, con: 1, int: -3, per: 0, wil: -1 },
  weaponInput: [{ name: "greatclub" as const }, { name: "javelin" as const }],
};

monstrousHumanoidInput.push({
  description: `
    Ogres are huge, hideous humanoid creatures with a taste for human flesh.
    If that is unavailable, they also enjoy the flesh of other humanoid creatures.
    They lack the intelligence for complex plans, but they like lying in wait to ambush helpless travelers.
    They are intelligent enough to throw their javelins first to soften up their foes before closing into melee, but ogre gangs and bands fight as unorganized individuals.
    They use greatclubs in battle to tenderize their meat instead of wastefully hacking off bits.

    Adult ogres stand 9 to 10 feet tall and weigh 600 to 650 pounds.
    Their skin color ranges from dull yellow to dull brown.
    Their clothing consists of poorly cured furs and hides, which add to their naturally repellent odor.
  `,
  name: "Ogres",
  monsters: [
    {
      ...baseOgre,
      armorInputs: [{ name: "thick skin" }, { name: "studded leather" }],
      challengeRating: 1,
      description: `
        Ogre gangers are relatively weak or young ogres that tend to gather together in gangs for mutual protection.
      `,
      level: 3,
      name: "Ogre Ganger",
    },
    {
      ...baseOgre,
      challengeRating: 3,
      description: `
        Ogre menaces are mature adult ogres that often terrorize small towns.
        They tend to work alone or with minions like goblins that they bully into submission.
      `,
      level: 4,
      name: "Ogre Menace",
      passiveAbilities: [
        {
          description: `
            Bludgeoning melee weapons wielded by an ogre menace gain the \\glossterm{Sweeping} (1) tag (see \\pcref{Weapon Tags)).
          `,
          name: "Crushing Sweep",
        },
      ],
      weaponInput: [{ name: "greatclub", tags: ["sweeping 1"] }, { name: "javelin" }],
      skillPoints: { intimidate: 2 },
    },
    {
      ...baseOgre,
      attackInputs: [{ name: "fireball" }, { name: "combustion" }],
      armorInputs: [
        { name: "thick skin" },
        // This creature is low level, so mage armor has only its simple effects
        { defenseBonuses: { armor: 2 }, name: "mage armor", resistanceBonuses: { energy: 2 } },
      ],
      challengeRating: 2,
      description: `
        Ogre mages are unusual ogres that have innate arcane magical talent.
        They are generally identifiable as the only ogres who do not go into battle wearing armor.
        They are more intelligent than other ogres, and more likely to use combat strategies like hiding behind their minions.
      `,
      level: 5,
      name: "Ogre Mage",
      skillPoints: { intimidate: 2 },
      startingAttributes: { str: 4, dex: -1, con: 0, int: 0, per: 0, wil: 3 },
    },
    {
      ...baseOgre,
      challengeRating: 4,
      description: `
        Ogre skullclaimers are the leaders of large roaming bands of ogres.
        They are named after their right to eat the most prized part of any humanoid the band kills: the head.
        Ogre bands are often accompanied by goblins or other similar creatures that help the ogres in exchange for a share of the valuable items they find, since the ogres care more about the creatures they kill.
      `,
      level: 6,
      name: "Ogre Skullclaimer",
      passiveAbilities: [
        {
          description: `
            Bludgeoning melee weapons wielded by an ogre skullclaimer gain the \\glossterm{Sweeping} (1) tag (see \\pcref{Weapon Tags)).
          `,
          name: "Crushing Sweep",
        },
      ],
      weaponInput: [{ name: "greatclub", tags: ["sweeping 1"] }, { name: "javelin" }],
      skillPoints: { intimidate: 2 },
      startingAttributes: { str: 5, dex: -1, con: 2, per: 0, wil: 1 },
    },
  ],
});

const baseGiant = {
  languages: ["Giant"],
  passiveAbilities: [
    {
      description: `
        A giant can throw objects up to two size categories smaller than itself with ease.
        Giants prefer to throw boulders, but in a pinch they can throw almost anything.
        Their \\glossterm{range increment} with objects other than boulders is generally half their range increment with boulders, and depending on the construction of the object it may also deal less damage than a boulder.
      `,
      name: "Rock Throwing",
    },
    {
      description: `
        Bludgeoning melee weapons wielded by a giant gain the \\glossterm{Sweeping} (2) tag (see \\pcref{Weapon Tags)).
      `,
      name: "Crushing Sweep",
    },
  ],
};

monstrousHumanoidInput.push({
  description: `
    Giants are massive humanoid creatures that tower over lesser creatures.
    All giants have immense strength and unimpressive agility - except when it comes to throwing and catching rocks, which they tend to excel at.
  `,
  name: "Giants",
  monsters: [
    {
      ...baseGiant,
      alignment: "Usually chaotic evil",
      armorInputs: [{ name: "breastplate" }, { name: "thick skin" }],
      challengeRating: 3,
      description: `
        Skin color among hill giants ranges from light tan to deep ruddy brown. Their hair is brown or black, with eyes the same color. Hill giants wear layers of crudely prepared hides with the fur left on. They seldom wash or repair their garments, preferring to simply add more hides as their old ones wear out.

        Adults are about 15 feet tall. Hill giants can live to be 70 years old.
      `,
      level: 7,
      name: "Hill Giant",
      size: "huge",
      startingAttributes: { str: 5, dex: -2, con: 3, int: -2, per: -2, wil: -2 },
      tactics: `
        Hill giants prefer to fight from high, rocky outcroppings, where they can pelt opponents with rocks and boulders while limiting the risk to themselves.
        They lack the intelligence or desire to retreat if their enemies survive to approach them, and prefer to draw their massive clubs and enter melee.
        If possible, they smash their foes off of cliffs.
      `,
      weaponInput: [{ name: "greatclub", tags: ["sweeping 2"] }, boulder],
    },
    {
      ...baseGiant,
      alignment: "Usually true neutral",
      armorInputs: [{ name: "hide" }, { name: "thick skin" }],
      challengeRating: 3,
      description: `
        Stone giants prefer thick leather garments, dyed in shades of brown and gray to match the stone around them. Adults stand about 20 feet tall. Stone giants can live to be 300 years old.

        Young stone giants can be capricious, hunting tiny creatures like goats and humanoids on a whim.
        Elder stone giants tend to be wiser and more cautious, and avoid unnecessary conflict.
      `,
      languages: ["Common", "Giant"],
      level: 10,
      name: "Stone Giant",
      size: "gargantuan",
      startingAttributes: { str: 7, dex: -1, con: 3, int: 0, per: 0, wil: -2 },
      tactics: `
        Stone giants fight from a great distance whenever possible, using their ability to hurl stones up to 1,000 feet.
      `,
      weaponInput: [
        { name: "greatclub", tags: ["sweeping 2"] },
        { ...boulder, rangeIncrement: 200 },
      ],
    },
  ],
});

export const monstrousHumanoids = addType("monstrous humanoid", monstrousHumanoidInput);
