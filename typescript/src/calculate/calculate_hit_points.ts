import { MonsterBase } from "@src/monsters";

const hpByLevel: Record<number, number> = {
  "-1": 9,
  "0": 10,
  "1": 11,
  "2": 12,
  "3": 13,
  "4": 15,
  "5": 17,
  "6": 19,
  "7": 22,
  "8": 25,
  "9": 28,
  "10": 31,
  "11": 35,
  "12": 39,
  "13": 44,
  "14": 50,
  "15": 56,
  "16": 63,
  "17": 70,
  "18": 78,
  "19": 88,
  "20": 100,
  "21": 115,
  "22": 130,
  "23": 145,
  "24": 160,
  "25": 175,
  "26": 190,
  "27": 205,
  "28": 230,
  "29": 245,
  "30": 260,
};

export function calculateHitPoints({
  attributes,
  challengeRating,
  level,
}: Pick<MonsterBase, "attributes" | "challengeRating" | "level">): number {
  const crMult = {
    0.5: 0,
    1: 0.5,
    2: 1,
    3: 2,
    4: 2,
  }[challengeRating];
  const hpFromLevel = hpByLevel[level];
  return Math.floor(crMult * (hpFromLevel + (attributes.con || 0)));
}
