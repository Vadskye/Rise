import { passiveAbilities } from "@src/passive_abilities";
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
        target: "One creature within \\glossterm{reach}",
      },
    ],
    challengeRating: 4,
    description: `
      An allip is the spectral remains of someone driven to suicide by a madness that afflicted it in life.
      It craves only revenge and unrelentingly pursues those who tormented it in life and pushed it over the brink.

      An allip cannot speak intelligibly.
    `,
    level: 3,
    name: "allip",
    passiveAbilities: [
      passiveAbilities.incorporeal,
      {
        description: `
          During each \\glossterm{action phase}, the allip makes an attack vs. Mental against each creature
          within an \\arealarge radius \\glossterm{emanation} from it.
          It cannot make this attack more than once against any individual target between \\glossterm{short rests}.
          \\hit Each target is \\glossterm{dazed} as a \\glossterm{condition}.
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
