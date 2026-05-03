import { StandardItem } from '../types';
import { getRankAndPriceText } from '../item_price';
import { getItemCreature } from '../item_creature';
import { replacePlaceholders } from '../../latex/monsters/replace_placeholders';
import { formatTagLatex, latexify } from '../../latex/format';

/**
 * Generates the LaTeX block for an item, including placeholder replacement.
 * @param craftingText LaTeX string for the "Craft" line (e.g., "Craft (alchemy)").
 */
export function itemLatex(item: StandardItem, craftingText: string): string {
  validateDescription(item);
  validateShortDescription(item);

  const tags = [...(item.tags || [])];
  const formattedTags = tags.map(formatTagLatex).sort();

  const isAttuned = tags.some((t) => t.toLowerCase().includes('attune'));
  const abilityType = isAttuned ? 'attuneitem' : 'passiveitem';
  const magicalPrefix = item.magical ? 'magical' : '';
  const rankAndPrice = getRankAndPriceText(item.rank, item.rarity);

  const creature = getItemCreature(item.rank);
  const description = replacePlaceholders(creature, item.description.trim(), {
    isMagical: item.magical,
  });

  const upgradesSection =
    item.upgrades.length > 0 ? `\\rankline\n${latexUpgradesSection(item)}` : '';

  const latex = `
\\begin{${magicalPrefix}${abilityType}}{${item.name}}{Rank ${rankAndPrice}}
  \\spelltwocol{${craftingText}}{${formattedTags.join(', ')}}
  \\rankline
  ${description}
  ${upgradesSection}
\\end{${magicalPrefix}${abilityType}}
  `;

  return latexify(latex);
}

/**
 * Flags descriptions starting with "as an action", which usually require specific costs.
 */
function validateDescription(item: StandardItem) {
  const trimDesc = item.description.trim();
  if (/^As a.*action.*you can/i.test(trimDesc) && !/^[^.]*strike/i.test(trimDesc)) {
    console.warn(`Item ${item.name} starts its description with 'as an action'`);
  }
}

/**
 * Flags damage types in short descriptions; these should be in the main description.
 */
function validateShortDescription(item: StandardItem) {
  if (/\d \w+ damage/.test(item.short_description)) {
    console.warn(`Item ${item.name} includes a damage type in its short description`);
  }
}

/**
 * Renders higher-rank upgrades as \upgraderank blocks.
 */
function latexUpgradesSection(item: StandardItem): string {
  if (item.upgrades.length === 0) return '';

  return item.upgrades
    .map((upgrade, i) => {
      const upgradeTier = i + 1;
      const upgradeName = `${item.name}${'+'.repeat(upgradeTier)}`;
      const rankAndPrice = getRankAndPriceText(upgrade.rank, item.rarity);
      const creature = getItemCreature(upgrade.rank);
      const description = replacePlaceholders(creature, upgrade.description.trim(), {
        isMagical: item.magical,
      });

      return `
      \\upgraderank{${upgradeName}}{${rankAndPrice}} 
      ${description}
    `;
    })
    .join('');
}
