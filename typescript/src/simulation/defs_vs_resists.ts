import { runCombatSimulation } from "@src/simulation/run_combat_simulation";

// Fundamental question: how good are defenses compared to resistances?
function simulateDefensesVsResistances(): void {
  runCombatSimulation({
    challengeRatingPool: [2],
    customizeMonsterA: (monster) => {
      monster.defenses.armor += 1;
    },
    customizeMonsterB: (monster) => {
      monster.resistances.physical += 6;
      monster.resistances.energy += 6;
    },
    startingAttributePool: [0, 1, 2],
  });
}

if (require.main === module) {
  simulateDefensesVsResistances();
}
