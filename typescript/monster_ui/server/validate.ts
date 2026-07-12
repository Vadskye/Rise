import { MonsterData, MonsterGroupData } from './codegen';
import { generatePreview } from './preview';

/**
 * Validates a monster configuration by instantiating a real game-engine Creature.
 * Delegates to generatePreview to reuse the builder and caching, but returns only
 * the validation success status, errors, and warnings.
 */
export function validateMonster(
  monster: MonsterData,
  group?: MonsterGroupData | string,
  groupName?: string,
) {
  const preview = generatePreview(monster, group, groupName);
  return {
    success: preview.success,
    errors: preview.errors,
    warnings: preview.warnings,
    cacheHit: preview.cacheHit,
  };
}
