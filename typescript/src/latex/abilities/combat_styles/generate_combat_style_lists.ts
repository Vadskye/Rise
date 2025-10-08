import { CombatStyle, combatStyles } from '@src/abilities/combat_styles';

export function generateCombatStyleLists(): string {
  return `
    {
      \\RaggedRight
      ${combatStyles.sort().map(formatCombatStyle).join('\n')}
    }
  `;
}

function formatCombatStyle(style: CombatStyle): string {
  return `\\par\\noindent \\combatstyle{${style.name}}: ${style.shortDescription}`;
}
