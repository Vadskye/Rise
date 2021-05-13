import { ChallengeRating } from "@src/data";

export interface DamageDice {
  count: number;
  flatBonus: number;
  size: number;
}

export function calculateDamageDice(
  baseDamageDie: string,
  level: number,
  flatBonus: number,
  challengeRating: ChallengeRating,
): DamageDice {
  let [count, size] = baseDamageDie.split("d").map(Number);
  // +1d at 4/7/10, just like player abilities
  let bonusIncrements = Math.floor((level - 1) / 3);
  if (challengeRating === 0.5) {
    bonusIncrements -= 1;
  } else if (challengeRating > 2) {
    bonusIncrements += 1;
  }

  for (let i = 0; i < bonusIncrements; i += 1) {
    size += 2;
    if (size > 10) {
      if (count < 4) {
        count *= 2;
        size = 6;
      } else {
        count += 1;
        size = 10;
      }
    }
  }

  return { count, flatBonus, size };
}

export function calculateAverageDamage(dice: DamageDice): number {
  return dice.flatBonus + (dice.count * (dice.size + 1)) / 2;
}
