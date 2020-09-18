import { passiveAbilities } from "@src/passive_abilities";
import { addType, TypelessMonsterInput } from "./add_type";

export const magicalBeastInput: TypelessMonsterInput[] = [
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "carapace" }],
    attackInputs: [
      {
        damageTypes: ["acid"],
        defense: "reflex",
        hit: "Each target takes $damage.",
        name: "Spit Acid",
        powerBonus: -2,
        source: "mundane",
        target: "Everything in a \\areamed line",
      },
      {
        // Accuracy bonus mimics size bonus from Shove and Str for accuracy
        accuracyBonus: 6,
        defense: "fortitude",
        hit: `The ankheg \\glossterm{pushes} the target up to 30 feet in any direction.
          It can move the same distance that it pushes the target.`,
        name: "Drag Prey",
        target: "One Medium or smaller creature or object within \\glossterm{reach}",
      },
    ],
    challengeRating: 2,
    knowledge: {
      0: `
        An ankheg is a Large burrowing ant-like creature with large mandibles and a taste for fresh meat.
        It has six legs, and most ankhegs are brown.
        In battle, they try to emerge briefly out of tunnels to ambush unwary foes and drag them underground.
      `,
      5: `
        A typical adult ankheg is about 10 feet long and weighs about 800 pounds.
        Ankhegs burrow quickly thanks to the powerful acid they naturally produce.
        They are able spit that acid at foes up to 20 feet away.
        When burrowing, they usually do not leave usable tunnels behind them.
        They can choose to do so, though this halves their burrowing speed.
      `,
      10: `
        When hunting, ankhegs usually dig a winding tunnel up to 40 feet below the surface in the rich soil of forests or farmlands.
        The tunnel usually 5 feet tall and wide, and up to 150 feet long.
        If they have been in an area for some time, they generally store the remains from previous kills at the end of the tunnel.
        When they move on, they leave any valuable objects behind with their old tunnels.
      `,
    },
    level: 5,
    passiveAbilities: [
      {
        name: "Darkvision (50 ft.)",
      },
      {
        name: "Tremorsense (50 ft.)",
      },
    ],
    name: "Ankheg",
    size: "large",
    speeds: {
      burrow: 20,
      land: 30,
    },
    skillPoints: { climb: 2, awareness: 1 },
    startingAttributes: { str: 4, dex: -1, con: 2, int: -8, wil: -2 },
    weaponInput: [{ damageTypes: ["piercing", "bludgeoning", "acid"], name: "bite" }],
    weight: "800 pounds",
  },
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "thick skin" }],
    attackInputs: [
      {
        damageTypes: ["cold"],
        defense: "fortitude",
        name: "Crawling Darkness",
        powerBonus: -2,
        source: "magical",
        target: "Enemies in a \\areamed radius",
      },
      {
        damageTypes: ["cold"],
        defense: "reflex",
        name: "Dark Embrace",
        powerBonus: 2,
        source: "magical",
        target: "One enemy within \\reach",
      },
    ],
    challengeRating: 2,
    knowledge: {
      0: `
        A nightcrawler is a Large worm imbued with umbramantic power.
        Its body is colored only in shades of gray.
        In battle, they wriggle towards their foes and try to eat them.
      `,
      5: `
        A typical nightcrawler is about 9 feet long and weighs about 700 pounds.
        They move slowly, but are surprisingly agile in combat.
        They can easily contort their body to avoid attacks or wrap around the defenses of foes.
        Nightcrawlers have several magical abilities that draw on their umbramantic power to inflict cold damage on nearby foes.
      `,
      10: `
        Nightcrawlers hate and fear light.
        They can be driven away by light, but if they have no escape, they ferociously attack any sources of light.
      `,
    },
    level: 7,
    name: "Nightcrawler",
    size: "large",
    skillPoints: { climb: 2, flexibility: 1 },
    speeds: {
      climb: 20,
      land: 20,
    },
    startingAttributes: { str: 1, dex: 3, con: 0, int: -8, per: 1, wil: 2 },
    weaponInput: [{ name: "bite" }],
  },
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "thick skin" }],
    attackInputs: [
      {
        damageTypes: ["piercing"],
        defense: "reflex",
        hit: `
          The target takes $damage.
          In addition, if this attack also beats Fortitude defense, the target is \\glossterm{grappled} by the $name.
        `,
        name: "Impaling Tentacles",
        target: "One creature within \\glossterm{reach}",
        weaponName: "tentacle",
      },
    ],
    challengeRating: 2,
    knowledge: {
      0: `
        A hydra maggot is a Large maggot-like creature that wriggles across the ground in search of food.
        It is named for the cluster of tentacles that sprout from their heads, which it uses to grab foes so it can eat them.
      `,
      5: `
        Hydra maggots are carnivorous, but are not picky, and will feast on rotting carcasses just as happily as they will feast on fresh meat.
        When hydra maggots attack, they can shape the tip of their tentacles into a point, allowing them to impale their foes.
        Their tentacles are quite adept at slipping past defenses and through cracks in armor.
      `,
    },
    level: 7,
    name: "Hydra Maggot",
    size: "large",
    startingAttributes: { str: 1, dex: 3, int: -7, per: 2, wil: -1 },
    weaponInput: [{ name: "bite" }, { name: "tentacle" }],
  },
  {
    alignment: "Always neutral evil",
    armorInputs: [{ name: "thick skin" }],
    attackInputs: [
      {
        damageTypes: ["energy"],
        defense: "fortitude",
        hit: `
          The target takes $damage.
          If this attack \\glossterm{wounds} the target, the $name regains one lost hit point.
        `,
        name: "Leech Life",
        powerBonus: 4,
        source: "magical",
        target: "One living creature within \\glossterm{reach}",
      },
    ],
    challengeRating: 1,
    description: `
    `,
    level: 7,
    knowledge: {
      0: `
        A stygian leech is a Medium worm-like creature that feeds on life energy.
        It uses its ability to crawl on walls and ceilings to drop on unsuspecting foes.
      `,
      5: `
        Stygian leeches instinctively avoid feeding on other stygian leeches, but will otherwise attempt to drain the life from any living creatures, regardless of danger.
        They can instinctively sense the location of any living creatures nearby.
        Their life-draining attacks can allow them to heal themselves.
      `,
      10: `
        Stygian leeches ignore non-living creatures entirely unless severely provoked.
        Some non-living creatures, such as intelligent undead, take advantage of this by gathering stygian leeches to guard their homes.
      `,
    },
    name: "Stygian Leech",
    passiveAbilities: [{ name: "Darkvision (100 ft.)" }, { name: "Lifesense (100 ft.)" }],
    skillPoints: { awareness: 1, climb: 2 },
    speeds: { climb: 30 },
    size: "medium",
    startingAttributes: { str: 0, dex: 2, con: 1, int: -6, wil: 3 },
    weaponInput: [{ name: "bite" }],
  },
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "thick skin" }],
    challengeRating: 2,
    knowledge: {
      0: `
        A darkmantle is a Small creature with a small body and a large number of strong tentacles.
        It hides itself on walls and ceilings and drops on its foes to strangle them to death.
      `,
      5: `
        Darkmantles hang from ceilings using a muscular "foot" at the top of their bodies.
        They can look like a stalactite by holding their tentacles stiffly under themeselves, or like a lump of rock by spreading their tentacles so the membrane between them covers their bodies.
        Their shell and skin usually resemble limestone, but a darkmantle can change its color to match almost any type of stony background.
      `,
      10: `
        A darkmantle that misses its initial attack often climbs away and tries to drop on the opponent again if there is a conveniently placed wall.
        Otherwise, it tries to climb its opponent's body to suffocate its head.
      `,
    },
    name: "Darkmantle",
    level: 1,
    passiveAbilities: [
      {
        description: `
          Whenever the $name hits a creature with its tentacles, if the attack also beats the target's Fortitude and Reflex defense,
          the target is \\glossterm{grappled} by the $name.
        `,
        name: "Latch On",
      },
      {
        name: "Darkvision (100 ft.)",
      },
    ],
    speeds: { climb: 20 },
    startingAttributes: { str: 3, dex: -1, con: 0, int: -8, per: 1, wil: 0 },
    skillPoints: { stealth: 2 },
    weaponInput: [{ name: "constrict" }, { name: "tentacle" }],
  },
  {
    alignment: "Usually true neutral",
    armorInputs: [{ name: "feathers" }],
    attackInputs: [
      {
        accuracyBonus: -2,
        name: "Quick Slash",
        powerBonus: -4,
        preface: "The $name can use this ability as a \\glossterm{minor action}.\\par",
        weaponName: "claw",
      },
    ],
    challengeRating: 4,
    knowledge: {
      0: `
        Griffons are powerful, majestic creatures with characteristics of both lions and eagles.
        A pair of broad, golden wings emerge from the creature’s back that can span 25 feet or more.
        In battle, they pounce on their foes like a lion.
      `,
      5: `
        From nose to tail, an adult griffon can measure as much as 8 feet.
        Neither males nor females are endowed with a mane.
        A griffon weighs about 500 pounds.
        Griffons cannot speak, but they understand Common.
      `,
    },
    name: "Griffon",
    level: 5,
    passiveAbilities: [{ name: "Low-light vision" }, passiveAbilities.pounce],
    size: "large",
    speeds: { fly: 60 },
    startingAttributes: { str: 3, dex: 3, con: 0, int: -3, per: 2, wil: 2 },
    skillPoints: { awareness: 2 },
    weaponInput: [{ name: "bite" }, { name: "claw" }],
  },
];

export const magicalBeasts = addType("magical beast", magicalBeastInput);
