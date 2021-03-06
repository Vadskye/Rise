import { CombatStyle, combatStyles, CombatStyleSource } from "@src/combat_styles";
import { titleCase } from "change-case";

export function generateCombatStyleLists(): string {
  const sources: CombatStyleSource[] = ["esoteric", "martial", "primal", "trick", "wild"];
  return sources.map(generateSourceList).join("\n");
}

function generateSourceList(source: CombatStyleSource): string {
  const sourceSpheres = combatStyles.filter((style) => style.sources.includes(source));
  return `
    {
    \\RaggedRight
    \\subsection{${titleCase(source)} Combat Styles}\\label{${titleCase(source)} Combat Styles}

    ${sourceSpheres.map(formatCombatStyle).join("\n")}
  `;
}

function formatCombatStyle(style: CombatStyle): string {
  return `\\par\\noindent \\combatstyle{${style.name}}: ${style.shortDescription}`;
}
