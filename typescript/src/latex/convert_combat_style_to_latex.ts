import { CombatStyle, Maneuver } from "@src/combat_styles";
import {
  determineAbilityType,
  sortByRankAndLevel,
} from "@src/latex/convert_mystic_sphere_to_latex";
import * as format from "@src/latex/format";
import { assertEndsWithPeriod } from "@src/latex/format/spell_effect";

export function convertCombatStyleToLatex(style: CombatStyle): string {
  assertEndsWithPeriod(style.shortDescription, style.name);
  return format.latexify(`
    \\section{{${style.name}}}
      \\hypertargetraised{style:${style.name.toLowerCase()}}{}%
      \\hypertargetraised{style:${style.name}}{}%
      \\label{${style.name}}%
      \\textit{${style.shortDescription}}

      \\subsection{Maneuvers}
        ${sortByRankAndLevel(style.maneuvers)
          .map(convertManeuverToLatex)
          .join("\n")}
  `);
}

function convertManeuverToLatex(maneuver: Maneuver): string {
  const abilityType = determineAbilityType(maneuver);
  const internalComponents = [
    format.spellEffect(maneuver, "maneuver"),
    format.spellScaling(maneuver),
    format.spellNarrative(maneuver),
  ].filter(Boolean);

  const rankText = maneuver.rank ? `Rank ${maneuver.rank}` : '';
  const wrappedRankText = abilityType === 'activeability' ? `[${rankText}]` : `{${rankText}}`;

  const latex = `
    \\begin{${abilityType}}{${maneuver.name}}${wrappedRankText}
      ${format.spellTypePrefix(maneuver) || ""}
      \\rankline
      \\hypertargetraised{maneuver:${maneuver.name}}{}%
      \\hypertargetraised{maneuver:${maneuver.name.toLowerCase()}}{}%
      \\noindent
      ${internalComponents.join("\n\\rankline\n\n\\noindent ").trim()}%
      \\vspace{0.1em}%
    \\end{${abilityType}}
  `;

  return latex;
}
