import { runCombatSimulation } from "@src/simulation/run_combat_simulation";

// Fundamental question: how good are defenses compared to resistances?
function simulateDefensesVsResistances(): void {
  runCombatSimulation({
    challengeRatingPool: [2],
    customizeMonsterA: (monster) => {
      monster.defenses.armor += 1;
    },
    customizeMonsterB: (monster) => {
      monster.resistances.physical += 20;
      monster.resistances.energy += 20;
    },
    startingAttributePool: [2],
  });
}

if (require.main === module) {
  simulateDefensesVsResistances();
}
