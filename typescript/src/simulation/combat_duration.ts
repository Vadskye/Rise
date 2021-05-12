import { calculateDamagePerRound } from "@src/simulation/calculate_damage_per_round";
import { generateStandardMonster } from "@src/simulation/standard_monsters";

// Fundamental question: how long does it take for a monster to defeat itself in combat?
function simulateCombatDuration(): void {
  // TODO: span all levels
  for (let level = 1; level <= 5; level++) {
    for (const challengeRating of [1, 2, 3, 4]) {
      const monster = generateStandardMonster(level, 1);
      const damagePerRound = calculateDamagePerRound(monster, monster);
      const totalDamageAbsorption =
        monster.hitPoints + Math.min(monster.resistances.physical, monster.resistances.energy);
      const rounds = (totalDamageAbsorption / damagePerRound).toFixed(1);
      console.log(`L${level} CR${challengeRating}: ${rounds}`);
    }
  }
}

if (require.main === module) {
  simulateCombatDuration();
}
