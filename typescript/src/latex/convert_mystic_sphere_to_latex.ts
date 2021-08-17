import * as format from "@src/latex/format";
import { assertEndsWithPeriod } from "@src/latex/format/spell_effect";
import { MysticSphere, SpellLike } from "@src/mystic_spheres";
import _ from "lodash";

export function convertMysticSphereToLatex(sphere: MysticSphere): string {
  assertEndsWithPeriod(sphere.shortDescription);
  return format.latexify(`
    \\section{{${sphere.name}}}
      \\hypertargetraised{spell:${sphere.name}}{}%
      \\hypertargetraised{spell:${sphere.name.toLowerCase()}}{}%
      \\label{${sphere.name}}%
      \\textit{${sphere.shortDescription}}

      ${
        sphere.cantrips
          ? `
            \\subsection{Cantrips}
            ${sortByRankAndLevel(sphere.cantrips)
              .map(convertSpellToLatex)
              .join("\n")}
          `
          : ""
      }

      \\subsection{Spells}
        ${sortByRankAndLevel(sphere.spells)
          .map(convertSpellToLatex)
          .join("\n")}

      ${
        sphere.rituals
          ? `
            \\subsection{Rituals}
            ${sortByRankAndLevel(sphere.rituals)
              .map(convertSpellToLatex)
              .join("\n")}
          `
          : ""
      }
  `);
}

export function determineAbilityType(spell: Pick<SpellLike, "type">): string {
  if (spell.type === "Instant") {
    return "instantability";
  } else if (spell.type.includes("Attune")) {
    return "attuneability";
  } else {
    return "durationability";
  }
}

function convertSpellToLatex(spell: SpellLike): string {
  const abilityType = determineAbilityType(spell);
  const internalComponents = [
    format.spellEffect(spell, "spell"),
    format.spellScaling(spell),
    format.spellNarrative(spell),
  ].filter(Boolean);
  const tableText = spell.tableText || "";

  const latex = `
    \\begin{${abilityType}}{${spell.name}}[${spell.type}]
      ${format.spellTypePrefix(spell) || ""}
      \\rankline
      \\noindent
      ${internalComponents.join("\n\\rankline\n\n\\noindent ")}
      \\vspace{0.1em}
    \\end{${abilityType}}
    ${tableText}
  `;

  // if (spell.type === "Attune (target)" && (latex.includes("you ") || latex.includes("your "))) {
  //   console.log(`Spell ${spell.name} has inconsistent you/target`);
  // }

  return latex;
}

export function sortByRankAndLevel<T extends Pick<SpellLike, "name" | "rank">>(spells: T[]): T[] {
  // Sort by level as primary, name as secondary
  return _.sortBy(
    _.sortBy(spells, (s) => s.name),
    (s) => s.rank,
  );
}
