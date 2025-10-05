import { sortByRankAndLevel } from '@src/latex';
import { MysticSphere, mysticSpheres, SpellLike, rituals } from '@src/mystic_spheres';
import _ from 'lodash';

export function generateMysticSphereSpellSummaries(): string {
  return mysticSpheres.map(generateMysticSphereSpellSummary).join('\n');
}

function generateMysticSphereSpellSummary(sphere: MysticSphere): string {
  const spells = sortByRankAndLevel(sphere.spells);
  // console.log('sphere.name, spells.length', sphere.name, spells.length);
  const ranks = [1, 2, 3, 4, 5, 6, 7];
  const spellsByRank = _.groupBy(spells, (s) => s.rank);

  return `
    {
      \\RaggedRight
      \\subsection{${sphere.name} Spells}

      ${generateSpellsSummary('Cantrips', _.sortBy(sphere.cantrips, 'name'))}
      ${ranks
        .map((rank) =>
          generateSpellsSummary(`Rank ${rank}`, sortByRankAndLevel(spellsByRank[rank])),
        )
        .filter(Boolean)
        .join('\n')}
    }
  `;
}

function generateSpellsSummary(category: string, spells: SpellLike[]): string {
  if (!(spells?.length > 0)) {
    return '';
  }
  return `\\par\\noindent ${category}: ${spells
    .map((s) => `\\spell{${s.name.toLowerCase()}}`)
    .join(', ')}`;
}

export function generateMysticSphereRitualSummaries(): string {
  return mysticSpheres.map(generateMysticSphereRitualSummary).join('\n');
}

function generateMysticSphereRitualSummary(sphere: MysticSphere): string {
  const sphereRituals = rituals.filter((ritual) => ritual.spheres.includes(sphere.name));
  const ranks = [1, 2, 3, 4, 5, 6, 7];
  const ritualsByRank = _.groupBy(sphereRituals, (s) => s.rank);
  return `
    {
      \\RaggedRight
      \\subsection{${sphere.name} Rituals}

      ${ranks
        .map((rank) =>
          generateSpellsSummary(`Rank ${rank}`, sortByRankAndLevel(ritualsByRank[rank])),
        )
        .filter(Boolean)
        .join('\n')}
    }
  `;
}
