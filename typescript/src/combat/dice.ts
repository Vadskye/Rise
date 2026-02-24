export function rollD10(exploding: boolean): number {
  const firstRoll = Math.floor(Math.random() * 10) + 1;
  if (exploding && firstRoll === 10) {
    const secondRoll = Math.floor(Math.random() * 10) + 1;
    return 10 + secondRoll;
  }
  return firstRoll;
}

export function rollDice(expression: string): number {
  const match = expression.match(/^(\d+)d(\d+)([+-]\d+)?$/);
  if (!match) {
    return parseInt(expression, 10) || 0;
  }

  const count = parseInt(match[1], 10);
  const sides = parseInt(match[2], 10);
  const bonus = match[3] ? parseInt(match[3], 10) : 0;

  let total = 0;
  for (let i = 0; i < count; i++) {
    total += Math.floor(Math.random() * sides) + 1;
  }
  return total + bonus;
}
