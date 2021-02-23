import { sortSpells } from "@src/latex/convert_mystic_sphere_to_latex";
import { MysticSphere, mysticSpheres, SpellLike } from "@src/mystic_spheres";
import _ from "lodash";

export function generateMysticSphereSummaries(): string {
  return mysticSpheres.map(generateMysticSphereSummary).join("\n");
}

function generateMysticSphereSummary(sphere: MysticSphere): string {
  const spells = sortSpells(sphere.spells);
  const ranks = [1, 2, 3, 4, 5, 6, 7];
  const spellsByRank = _.groupBy(spells, (s) => s.rank);
  return `
    {
    \\RaggedRight
    \\subsection{${sphere.name}}

    ${generateSpellsSummary("Cantrips", _.sortBy(sphere.cantrips, "name"))}
    ${ranks
      .map((rank) => generateSpellsSummary(`Rank ${rank}`, sortSpells(spellsByRank[rank])))
      .filter(Boolean)
      .join("\n")}
    ${generateSpellsSummary("Rituals", _.sortBy(sphere.rituals, "name"))}
    }
  `;
}

function generateSpellsSummary(category: string, spells: SpellLike[]): string | null {
  if (!(spells?.length > 0)) {
    return null;
  }
  return `\\par\\noindent ${category}: ${spells
    .map((s) => `\\spell{${s.name.toLowerCase()}}`)
    .join(", ")}`;
}
