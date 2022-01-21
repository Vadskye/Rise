import { parseActiveAbility, parseAttack, passiveAbilities } from "@src/monsters/mechanics";
import { MonsterBaseInput } from "@src/monsters/reformat_monster_input";
import { addType, TypelessMonsterInput } from "./add_type";

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

export const undead = addType("undead", undeadInput);
