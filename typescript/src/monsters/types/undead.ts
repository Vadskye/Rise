import { parseActiveAbility, parseAttack, passiveAbilities } from "@src/monsters/mechanics";
import { MonsterBaseInput } from "@src/monsters/reformat_monster_input";
import { MonsterGroupInput } from "@src/monsters/reformat_monster_input";
import { addType, TypelessMonsterInput } from "./add_type";
import { humanoids } from "./humanoids";

export const undeadInput: TypelessMonsterInput[] = [
  {
    alignment: "Always neutral evil",
    attackInputs: [
      {
        crit: "The target loses two \\glossterm{hit points}.",
        defense: "reflex",
        hit: "The target loses a \\glossterm{hit point}.",
        source: "magical",
        name: "Draining Touch",
        target: "One living creature within \\glossterm{reach}",
      },
    ],
    challengeRating: 4,
    knowledge: {
      0: `
        An allip is a Medium incorporeal creature.
        It cannot speak intelligibly, though it is known for its propensity for babbling incoherently as it attacks.
      `,
      5: `
        An allip is spectral remains of someone driven to suicide by a madness that afflicted it in life.
        It craves only revenge and unrelentingly pursues those who tormented it in life and pushed it over the brink.
      `,
    },
    level: 3,
    name: "allip",
    passiveAbilities: [
      passiveAbilities.incorporeal,
      {
        description: `
          During each \\glossterm{action phase}, the allip makes an attack vs. Mental against each creature
          within an \\areamed radius \\glossterm{emanation} from it.
          After it attacks a creature this way, that creature becomes immune to this allip's \\textit{babble} ability until it takes a \\glossterm{short rest}.
          \\hit Each target is \\dazed as a \\glossterm{condition}.
          \\crit Each target is \\confused as a \\glossterm{condition}.
        `,
        name: "Babble",
      },
    ],
    skillPoints: { awareness: 2, intimidate: 2, stealth: 2 },
    speeds: { fly: 30, land: null },
    startingAttributes: { str: null, dex: 3, con: null, int: 1, per: 1, wil: 2 },
  },
];

function skelefy(monster: Omit<MonsterBaseInput, "monsterType">): MonsterBaseInput {
  return {
    ...monster,
    activeAbilityInputs: (monster?.activeAbilityInputs || []).filter((ability) => {
      const parsed = parseActiveAbility(ability);
      return parsed.source === "mundane";
    }),
    alignment: "Always true neutral",
    attackInputs: (monster?.attackInputs || []).filter((attack) => {
      const parsed = parseAttack(attack);
      return parsed.source === "mundane" && !parsed.weaponName;
    }),
    // TODO: Should description be cleared?
    knowledge: {},
    monsterType: "undead",
    name: `Skeleton ${monster.name}`,
    startingAttributes: {
      ...monster.startingAttributes,
      str: (monster.startingAttributes?.str || 0) - 2,
      dex: (monster.startingAttributes?.dex || 0) + 2,
      int: null,
    },
    passiveAbilities: [
      // TODO: filter magical passive abilities
      ...(monster.passiveAbilities || []),
      {
        description: `
          Skeletons are \\glossterm{vulnerable} to bludgeoning damage.
        `,
        name: "Bludgeoning Vulnerability",
      },
    ],
    weaponInput: [
      ...(monster.weaponInput || []).filter((weapon) => weapon.name !== "claw"),
      { name: "claw" },
    ],
  };
}

const lizardfolk = humanoids.find((mon) => mon.name === "Lizardfolk") as MonsterGroupInput;

const skelefiableMonsters = lizardfolk.monsters;

undeadInput.push({
  knowledge: {
    0: `
      Skeleton are the reanimated corpses of once-living creatures.
      They are one of the most basic forms of undead, though some skeletons are still quite powerful.
      Creating a skeleton is generally regarded as a fundamentally evil act.
    `,
    5: `
      Skeletons retain all of the \\glossterm{mundane} abilities of the reanimated creature, but lose all \\glossterm{magical} abilities.
      They retain the ability to wield the same weapons and armor as the original creature.
      In addition, skeletons are always more agile and less strong than the original creature.
      All skeletons are \\glossterm{vulnerable} to bludgeoning damage thanks to their exposed and easily crumpled bones.
    `,
    10: `
      Creating a skeleton from a corpse requires fracturing the soul of the creature the corpse belonged to.
      The soul splinter created this way is used to give the skeleton its agency.
      This is unpleasant for the dead creature in its afterlife, though not dangerous.
      Skeletons require a less intact corpse than zombies, so they are preferred for reanimating bodies in a greater state of decay.
    `,
  },
  level: 1,
  name: "Skeletons",
  monsters: skelefiableMonsters.map(skelefy),
});

function zombify(monster: Omit<MonsterBaseInput, "monsterType">): MonsterBaseInput {
  return {
    ...monster,
    activeAbilityInputs: (monster?.activeAbilityInputs || []).filter((ability) => {
      const parsed = parseActiveAbility(ability);
      return parsed.source === "mundane";
    }),
    alignment: "Always true neutral",
    attackInputs: (monster?.attackInputs || []).filter((attack) => {
      const parsed = parseAttack(attack);
      return parsed.source === "mundane" && !parsed.weaponName;
    }),
    // TODO: Should description be cleared?
    knowledge: {},
    monsterType: "undead",
    name: `Zombie ${monster.name}`,
    startingAttributes: {
      ...monster.startingAttributes,
      str: (monster.startingAttributes?.str || 0) + 2,
      dex: (monster.startingAttributes?.dex || 0) - 2,
      con: (monster.startingAttributes?.con || 0) + 2,
      int: null,
    },
    passiveAbilities: [
      // TODO: filter magical passive abilities
      ...(monster.passiveAbilities || []),
      {
        description: `
          Zombies are \\glossterm{vulnerable} to slashing damage.
        `,
        name: "Slashing Vulnerability",
      },
    ],
    weaponInput: [{ name: "slam" }],
  };
}

const orcs = humanoids.find((mon) => mon.name === "Orcs") as MonsterGroupInput;

const zombifiableMonsters = orcs.monsters.filter((orc) => orc.name !== "Orc Shaman");

undeadInput.push({
  knowledge: {
    0: `
      Zombies are the reanimated corpses of once-living creatures.
      They are one of the most basic forms of undead, though some zombies are still quite powerful.
      Creating a zombie is generally regarded as a fundamentally evil act.
    `,
    5: `
      Zombies retain all of the \\glossterm{mundane} abilities of the reanimated creature, but lose all \\glossterm{magical} abilities.
      They also lose any ability to wield weapons, though they are often found in the same armor (if any) as the original creature.
      In addition, zombies are always stronger and more durable than the original creature, though they are less agile.
      All zombies are \\glossterm{vulnerable} to slashing damage thanks to their exposed and rotting flesh.
    `,
    10: `
      Creating a zombie from a corpse requires fracturing the soul of the creature the corpse belonged to.
      The soul splinter created this way is used to give the zombie its agency.
      This is unpleasant for the dead creature in its afterlife, though not dangerous.
      Only corpses with the majority of their flesh intact can be reanimated as zombies.
      Creatures with too little flesh cannot become zombies at all.
    `,
  },
  level: 1,
  name: "Zombies",
  monsters: zombifiableMonsters.map(zombify),
});

export const undead = addType("undead", undeadInput);
