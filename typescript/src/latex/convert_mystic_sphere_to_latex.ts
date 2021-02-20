import * as format from "@src/latex/format";
import { MysticSphere, Spell, SpellLike } from "@src/mystic_spheres";
import _ from "lodash";

export function convertMysticSphereToLatex(sphere: MysticSphere): string {
  return `
    \\begin{spellsection}{${sphere.name}}
      \\begin{spellheader}
        \\spelldesc{${sphere.shortDescription}}
      \\end{spellheader}

      ${
        sphere.cantrips
          ? `
            \\subsubsection{Cantrips}
            ${sortSpells(sphere.cantrips)
              .map(convertSpellToLatex)
              .join("\n")}
          `
          : ""
      }

      \\subsubsection{Spells}
        ${sortSpells(sphere.spells)
          .map((spell) => {
            try {
              return convertSpellToLatex(spell);
            } catch (err) {
              err.message = `Error converting spell ${spell.name} to LaTeX: ${err.message}`;
              throw err;
            }
          })
          .join("\n")}

      ${
        sphere.rituals
          ? `
            \\subsubsection{Rituals}
            ${sortSpells(sphere.rituals)
              .map(convertSpellToLatex)
              .join("\n")}
          `
          : ""
      }

    \\end{spellsection}
  `;
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
