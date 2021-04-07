import { CombatStyle, combatStyles, CombatStyleSource } from "@src/combat_styles";
import { titleCase } from "change-case";

export function generateCombatStyleLists(): string {
  return `
    {
      \\RaggedRight
      ${combatStyles.sort().map(formatCombatStyle).join("\n")}
    }
  `
}

function formatCombatStyle(style: CombatStyle): string {
  return `\\par\\noindent \\combatstyle{${style.name}}: ${style.shortDescription}`;
}
