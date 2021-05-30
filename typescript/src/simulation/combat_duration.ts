import { runCombatSimulation } from "@src/simulation/run_combat_simulation";

// Fundamental question: how long does it take for a monster to defeat itself in combat?
function simulateCombatDuration(): void {
  runCombatSimulation({
    challengeRatingPool: [2],
    formatOutput: (roundsA, roundsB) => Math.min(Number(roundsA), Number(roundsB)),
    startingAttributePool: [0],
  });
}

if (require.main === module) {
  simulateCombatDuration();
}
