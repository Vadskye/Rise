import { sortByRankAndLevel } from "@src/latex/convert_mystic_sphere_to_latex";
import { MysticSphere, mysticSpheres, SpellLike } from "@src/mystic_spheres";
import _ from "lodash";

export function generateMysticSphereSummaries(): string {
  return mysticSpheres.map(generateMysticSphereSummary).join("\n");
}

function generateMysticSphereSummary(sphere: MysticSphere): string {
  const spells = sortByRankAndLevel(sphere.spells);
  // console.log('sphere.name, spells.length', sphere.name, spells.length);
  const ranks = [1, 2, 3, 4, 5, 6, 7];
  const spellsByRank = _.groupBy(spells, (s) => s.rank);
  return `
    {
      \\RaggedRight
      \\subsection{${sphere.name}}

      ${generateSpellsSummary("Cantrips", _.sortBy(sphere.cantrips, "name"))}
      ${ranks
        .map((rank) => generateSpellsSummary(`Rank ${rank}`, sortByRankAndLevel(spellsByRank[rank])))
        .filter(Boolean)
        .join("\n")}
      ${
        sphere.rituals && sphere.rituals.length > 0
          ? generateSpellsSummary("Rituals", _.sortBy(sphere.rituals, "name"))
          : ""
      }
    }
  `;
}

function generateSpellsSummary(category: string, spells: SpellLike[]): string {
  if (!(spells?.length > 0)) {
    return "";
  }
  return `\\par\\noindent ${category}: ${spells
    .map((s) => `\\spell{${s.name.toLowerCase()}}`)
    .join(", ")}`;
}
