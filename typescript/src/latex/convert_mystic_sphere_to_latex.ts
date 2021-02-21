import * as format from "@src/latex/format";
import { MysticSphere, Spell, SpellLike } from "@src/mystic_spheres";
import _ from "lodash";

export function convertMysticSphereToLatex(sphere: MysticSphere): string {
  return format.latexify(`
    \\section{${sphere.name}}\\label{spell:${sphere.name}}
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

function convertSpellToLatex(spell: SpellLike): string {
  const abilityType = spell.type.includes("Attune") ? "attuneability" : "freeability";
  const rankText = (spell as Spell).rank ? `[Rank ${spell.rank}]` : "";
  const internalComponents = [
    format.spellTypePrefix(spell),
    format.spellEffect(spell),
    format.spellScaling(spell),
    format.spellNarrative(spell),
  ].filter(Boolean);
  return `
    \\begin{${abilityType}}{${spell.name}}${rankText}
      ${internalComponents.join("\n\\rankline\n\n\\noindent ")}
      \\vspace{0.1em}
    \\end{${abilityType}}
  `;
}

function sortSpells<T extends SpellLike>(spells: T[]): T[] {
  // Sort by level as primary, name as secondary
  return _.sortBy(
    _.sortBy(spells, (s) => s.name),
    (s) => s.rank,
  );
}
