import { prepareActiveAbilitiesForPreview } from '@src/latex/monsters/player_abilities';
import {
  characterSheetExists,
  getCharacterSheet,
} from '@src/character_sheet/current_character_sheet';
import { MonsterData } from './codegen';
import { buildCreature } from './creature_builder';
import { showDetailedTiming } from './timing';

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
  const start = performance.now();
  const { name } = monster;

  const jsonStart = performance.now();
  const inputJson = JSON.stringify({ monster, sharedFreeformCode });
  const jsonDuration = performance.now() - jsonStart;

  const cacheStart = performance.now();
  if (characterSheetExists(name)) {
    const existingSheet = getCharacterSheet(name);
    if (existingSheet && existingSheet.cachedInputJson === inputJson) {
      if (showDetailedTiming) {
        const cacheCheckDuration = performance.now() - cacheStart;
        const totalDuration = performance.now() - start;
        console.log(
          `[Timing] [Preview] "${name}" cache hit check took ${cacheCheckDuration.toFixed(2)}ms`,
        );
        console.log(
          `[Timing] [Preview] "${name}" overall preview took ${totalDuration.toFixed(2)}ms (CACHE HIT)`,
        );
      }
      return {
        ...existingSheet.cachedValidationResult,
        cacheHit: true,
      };
    }
  }
  const cacheDuration = performance.now() - cacheStart;

  const buildStart = performance.now();
  const { creature, sheet, errors, warnings } = buildCreature(monster, sharedFreeformCode);
  const buildDuration = performance.now() - buildStart;

  const formatStart = performance.now();
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

  const cacheWriteStart = performance.now();
  const activeSheet = sheet || getCharacterSheet(name);
  if (activeSheet) {
    activeSheet.cachedInputJson = inputJson;
    activeSheet.cachedValidationResult = result;
  }
  const cacheWriteDuration = performance.now() - cacheWriteStart;
  const formatDuration = performance.now() - formatStart;

  const totalDuration = performance.now() - start;
  if (showDetailedTiming) {
    console.log(
      `[Timing] [Preview] "${name}" overall preview took ${totalDuration.toFixed(2)}ms (CACHE MISS)`,
    );
    console.log(`[Timing] [Preview]   - JSON Stringify: ${jsonDuration.toFixed(2)}ms`);
    console.log(`[Timing] [Preview]   - Cache Check: ${cacheDuration.toFixed(2)}ms`);
    console.log(`[Timing] [Preview]   - buildCreature: ${buildDuration.toFixed(2)}ms`);
    console.log(`[Timing] [Preview]   - Formatting & stats prep: ${formatDuration.toFixed(2)}ms`);
    console.log(`[Timing] [Preview]   - Cache Write: ${cacheWriteDuration.toFixed(2)}ms`);
  }

  return result;
}
