import { calculateDamagePerRound } from "@src/simulation/calculate_damage_per_round";
import { generateStandardMonster } from "@src/simulation/standard_monsters";

// Fundamental question: how long does it take for a monster to defeat itself in combat?
function simulateCombatDuration(): void {
  // TODO: span all levels
  for (let level = 1; level <= 21; level++) {
    for (const challengeRating of [2, 3, 4] as const) {
      for (const startingAttribute of [0] as const) {
        const monster = generateStandardMonster(level, challengeRating, { startingAttribute });
        const crMultiplier = {
          1: 1,
          2: 1,
          3: 1.5,
          4: 2,
        }[challengeRating] || 1;
        const damagePerRound = calculateDamagePerRound(monster, monster) * crMultiplier;


        const totalDamageAbsorption =
          monster.hitPoints + Math.min(monster.resistances.physical, monster.resistances.energy);
        const rounds = (totalDamageAbsorption / damagePerRound).toFixed(0);
        console.log(`L${level} CR${challengeRating} A${startingAttribute}: ${rounds}`);
      }
    }
  }
}

if (require.main === module) {
  simulateCombatDuration();
}
