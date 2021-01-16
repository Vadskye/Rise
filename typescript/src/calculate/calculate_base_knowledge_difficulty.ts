export function calculateBaseKnowledgeDifficulty(monster: { level: number }): number {
  // This is trivial, but may in the future be more complicated
  return 5 + monster.level;
}
