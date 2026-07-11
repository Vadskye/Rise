import { prepareActiveAbilitiesForPreview } from '@src/latex/monsters/player_abilities';
import {
  characterSheetExists,
  getCharacterSheet,
} from '@src/character_sheet/current_character_sheet';
import { MonsterData } from './codegen';
import { buildCreature } from './creature_builder';

/**
 * Generates the live preview statistics (computedStats) for a monster,
 * including running game-engine validation and capturing warnings.
 * Uses character sheet caching to speed up repeated queries.
 */
export function generatePreview(
  monster: MonsterData,
  sharedFreeformCode?: string,
  _groupName?: string,
) {
  const { name } = monster;
  const inputJson = JSON.stringify({ monster, sharedFreeformCode });

  if (characterSheetExists(name)) {
    const existingSheet = getCharacterSheet(name);
    if (existingSheet && existingSheet.cachedInputJson === inputJson) {
      return {
        ...existingSheet.cachedValidationResult,
        cacheHit: true,
      };
    }
  }

  const { creature, sheet, errors, warnings } = buildCreature(monster, sharedFreeformCode);

  let computedStats = null;
  if (creature) {
    computedStats = {
      name: creature.name,
      level: creature.level,
      base_class: creature.base_class,
      elite: creature.elite,
      size: creature.size,
      creature_origin: creature.creature_origin,
      creature_type: creature.creature_type,
      alignment: creature.alignment,
      hit_points: creature.hit_points,
      injury_point: creature.injury_point,
      armor_defense: creature.armor_defense,
      brawn: creature.brawn,
      fortitude: creature.fortitude,
      reflex: creature.reflex,
      mental: creature.mental,
      speed: creature.speed,
      attributes: [
        creature.strength,
        creature.dexterity,
        creature.constitution,
        creature.intelligence,
        creature.perception,
        creature.willpower,
      ],
      skills: creature.getTrainedSkillNames(),
      traits: creature.getStandardTraits(),
      equipment: creature.getEquipment(),
      activeAbilities: prepareActiveAbilitiesForPreview(creature, creature.getActiveAbilities()),
      passiveAbilities: creature.getPassiveAbilities(),
      knowledge: creature.getKnowledgeResultConfig(),
    };
  }

  const result = {
    success: errors.length === 0,
    errors,
    warnings,
    computedStats,
    cacheHit: false,
  };

  const activeSheet = sheet || getCharacterSheet(name);
  if (activeSheet) {
    activeSheet.cachedInputJson = inputJson;
    activeSheet.cachedValidationResult = result;
  }

  return result;
}
