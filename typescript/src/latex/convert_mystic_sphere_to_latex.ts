import * as format from "@src/latex/format";
import { MysticSphere, Spell, SpellLike } from "@src/mystic_spheres";
import _ from "lodash";

export function convertMysticSphereToLatex(sphere: MysticSphere): string {
  return format.latexify(`
    \\newpage
    \\hypertarget{spell:${sphere.name.toLowerCase()}}{}\\label{${sphere.name}}
    \\section{{${sphere.name}}}
      \\textit{${sphere.shortDescription}}

      ${
        sphere.cantrips
          ? `
            \\subsection{Cantrips}
            ${sortSpells(sphere.cantrips)
              .map(convertSpellToLatex)
              .join("\n")}
          `
          : ""
      }

      \\subsection{Spells}
        ${sortSpells(sphere.spells)
          .map(convertSpellToLatex)
          .join("\n")}

      ${
        sphere.rituals
          ? `
            \\subsection{Rituals}
            ${sortSpells(sphere.rituals)
              .map(convertSpellToLatex)
              .join("\n")}
          `
          : ""
      }
  `);
}

function determineAbilityType(spell: Pick<SpellLike, "type">): string {
  if (spell.type === "Instant") {
    return "instantability";
  } else if (spell.type.includes("Attune")) {
    return "attuneability";
  } else {
    return "freeability";
  }
}

function convertSpellToLatex(spell: SpellLike): string {
  const abilityType = determineAbilityType(spell);
  const rankText = (spell as Spell).rank ? `[Rank ${spell.rank}]` : "";
  const internalComponents = [
    format.spellTypePrefix(spell),
    format.spellEffect(spell),
    format.spellScaling(spell),
    format.spellNarrative(spell),
  ].filter(Boolean);

  const latex = `
    \\hypertarget{spell:${spell.name.toLowerCase()}}{}\\label{${spell.name}}
    \\begin{${abilityType}}{${spell.name}}${rankText}
      ${internalComponents.join("\n\\rankline\n\n\\noindent ")}
      \\vspace{0.1em}
    \\end{${abilityType}}
  `;

  // if (spell.type === "Attune (target)" && (latex.includes("you ") || latex.includes("your "))) {
  //   console.log(`Spell ${spell.name} has inconsistent you/target`);
  // }

  return latex;
}

export function sortSpells<T extends SpellLike>(spells: T[]): T[] {
  // Sort by level as primary, name as secondary
  return _.sortBy(
    _.sortBy(spells, (s) => s.name),
    (s) => s.rank,
  );
}
