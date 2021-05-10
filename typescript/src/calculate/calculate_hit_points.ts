import { MonsterBase } from "@src/monsters";

const hpByLevel: Record<number, number> = {
  "-1": 9,
  "0":  10 ,
  "1":  11 ,
  "2":  12 ,
  "3":  13 ,
  "4":  17 ,
  "5":  19 ,
  "6":  22 ,
  "7":  28 ,
  "8":  31 ,
  "9":  35 ,
  "10": 44 ,
  "11": 50 ,
  "12": 56 ,
  "13": 70 ,
  "14": 78 ,
  "15": 88 ,
  "16": 100,
  "17": 126,
  "18": 140,
  "19": 156,
  "20": 200,
  "21": 230,
  "22": 260,
  "23": 290,
  "24": 320,
  "25": 350,
  "26": 380,
  "27": 410,
  "28": 440,
  "29": 470,
  "30": 500,
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
    4: 4,
  }[challengeRating];
  const hpFromLevel = hpByLevel[level];
  return Math.floor(crMult * (hpFromLevel + (attributes.con || 0)));
}
