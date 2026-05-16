import { ActiveAbility } from '@src/abilities/active_abilities';
import { MonsterAttackUsageTime } from '@src/character_sheet/sheet_worker';

export interface RankAbility {
  name: string;
  rank: number;
  description: string;
  isMagical: boolean;
  complexity: number;
}

/**
 * Parses a LaTeX archetype ability description into an ActiveAbility.
 * Only parses `activeability` or `magicalactiveability` blocks.
 */
export function parseArchetypeAbility(
  ability: RankAbility,
  effectiveRank: number
): ActiveAbility | null {
  const description = ability.description;
  
  // Only parse activeability or magicalactiveability
  const match = description.match(/\\begin{(activeability|magicalactiveability)}{([^}]+)}{([^}]+)}/);
  
  if (!match) {
    return null;
  }
  
  const kind = match[1];
  const name = match[2];
  const usageTimeStr = match[3];
  
  // Extract content
  const startIdx = match.index! + match[0].length;
  const endIdx = description.indexOf(`\\end{${kind}}`);
  
  if (endIdx === -1) {
    return null;
  }
  
  const content = description.substring(startIdx, endIdx);
  
  // Find the start of rank scaling
  const firstRankMatch = content.match(/\\rank{\d+}/);
  const baseTextEnd = firstRankMatch ? firstRankMatch.index! : content.length;
  
  // Base text is everything before the first \rank{X}, removing \rankline
  const baseText = content.substring(0, baseTextEnd).replace(/\\rankline/g, '').trim();
  
  let effect = baseText;
  
  // Extract rank scaling
  const rankParts = content.split(/\\rank{(\d+)}/);
  if (rankParts.length > 1) {
    for (let i = 1; i < rankParts.length; i += 2) {
      const reqRank = parseInt(rankParts[i]);
      const rankText = rankParts[i + 1].trim();
      
      if (reqRank <= effectiveRank) {
        effect += ' ' + rankText;
      }
    }
  }
  
  // Map usage time string to MonsterAttackUsageTime
  let usageTime: MonsterAttackUsageTime = 'standard';
  const lowerUsage = usageTimeStr.toLowerCase();
  if (lowerUsage.includes('standard')) usageTime = 'standard';
  if (lowerUsage.includes('minor')) usageTime = 'minor';
  if (lowerUsage.includes('free')) usageTime = 'triggered';
  if (lowerUsage.includes('reaction')) usageTime = 'triggered';
  
  return {
    name: name,
    usageTime: usageTime,
    kind: ability.isMagical || kind === 'magicalactiveability' ? 'spell' : 'maneuver',
    isMagical: ability.isMagical || kind === 'magicalactiveability',
    rank: ability.rank as any,
    effect: effect.replace(/\s+/g, ' ').trim(),
    roles: [],
  };
}
