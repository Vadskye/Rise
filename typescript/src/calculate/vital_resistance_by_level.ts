const baseValues: Record<number, number> = {
  "-2": 10,
  "-1": 11,
  "0": 12,
  "1": 13,
  "2": 15,
  "3": 17,
  "4": 19,
  "5": 23,
  "6": 27,
  "7": 32,
  "8": 37,
  "9": 43,
  "10": 49,
  "11": 55,
  "12": 61,
  "13": 68,
  "14": 75,
  "15": 82,
  "16": 90,
  "17": 100,
  "18": 110,
  "19": 120,
  "20": 130,
  "21": 140,
  "22": 150,
  "23": 160,
  "24": 170,
  "25": 180,
};

export function vitalResistanceByLevel(level: number, constitution: number | null) {
  return baseValues[Math.max(level, constitution || 0)];
}
