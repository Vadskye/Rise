import { CalculatedDamagingAttack, calculateStrike } from "@src/calculate";
import { MonsterBase } from "@src/monsters";

export function calculateDamagePerRound(
  attacker: MonsterBase,
  defender: Pick<MonsterBase, "defenses">,
): number {
  // TODO: look through attacker's attack options to find the best attack
  const strike = calculateStrike(attacker, attacker.weapons[0]);
  const withoutExplosion = calculateHitProbability(strike, defender);
  // TODO: multiply accuracy by damage
  return withoutExplosion;
}

// This takes crits into account, so it can return a number greater than 1.
// For example, with a +14 accuracy vs a defense of 10, there is a 100% chance to hit and a 50%
// chance to crit, so this would return 1.5.
export function calculateHitProbability(
  strike: Pick<CalculatedDamagingAttack, "accuracy" | "defense">,
  defender: Pick<MonsterBase, "defenses">,
  maxExplosionDepth: number = 2,
) {
  let totalHitProbability = 0;
  let critCount = 0;
  let explosionCount = 0;
  while (true) {
    let hitProbability =
      (strike.accuracy +
        11 -
        critCount * 10 +
        explosionCount * 10 -
        defender.defenses[strike.defense]) /
      10;
    hitProbability = Math.min(1, Math.max(0, hitProbability));
    if (hitProbability > 0) {
      critCount += 1;
      totalHitProbability += hitProbability * 0.1 ** explosionCount;
    } else if (explosionCount < maxExplosionDepth) {
      explosionCount += 1;
    } else {
      return totalHitProbability;
    }
  }
}
