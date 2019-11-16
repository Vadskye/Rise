import { addType, TypelessMonsterInput } from "./add_type";

export const undeadInput: TypelessMonsterInput[] = [
  {
    challengeRating: 4,
    level: 3,
    name: "allip",
    // TODO: add fly speed
    speed: 30,
    startingAttributes: { str: null, dex: 3, con: null, int: 1, per: 1, wil: 3 },
  },
];

export const undead = addType("undead", undeadInput);
