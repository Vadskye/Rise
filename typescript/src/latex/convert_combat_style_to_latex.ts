import { CombatStyle, Maneuver } from "@src/combat_styles";
import {
  determineAbilityType,
  sortByRankAndLevel,
} from "@src/latex/convert_mystic_sphere_to_latex";
import * as format from "@src/latex/format";
import { assertEndsWithPeriod } from "@src/latex/format/spell_effect";

export function convertCombatStyleToLatex(style: CombatStyle): string {
  assertEndsWithPeriod(style.shortDescription);
  return format.latexify(`
    \\section{{${style.name}}}
      \\hypertarget{style:${style.name.toLowerCase()}}{}%
      \\hypertarget{style:${style.name}}{}%
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
  const rankText = maneuver.rank ? `[Rank ${maneuver.rank}]` : "";
  const internalComponents = [
    format.spellTypePrefix({ ...maneuver, focus: maneuver.focus ?? false }),
    format.spellEffect(maneuver, "maneuver"),
    format.spellScaling(maneuver),
    format.spellNarrative(maneuver),
  ].filter(Boolean);

  const latex = `
    \\hypertarget{maneuver:${maneuver.name}}{}%
    \\hypertarget{maneuver:${maneuver.name.toLowerCase()}}{}%
    \\label{${maneuver.name}}%
    \\begin{${abilityType}}{${maneuver.name}}${rankText}
      ${internalComponents.join("\n\\rankline\n\n\\noindent ")}
      \\vspace{0.1em}
    \\end{${abilityType}}
  `;

  return latex;
}
