import { Creature, MonsterAbilityOptions } from '@src/character_sheet/creature';
import { CharacterSheet } from '@src/character_sheet/character_sheet';
import {
  createCharacterSheet,
  characterSheetExists,
  deleteCharacterSheet,
} from '@src/character_sheet/current_character_sheet';
import { handleEverything, MonsterAttackUsageTime } from '@src/character_sheet/sheet_worker';
import { MonsterData, toCustomMonsterAbility } from './codegen';
import { RiseSkill } from '@src/core_mechanics/skills';
import {
  RiseTrait,
  RiseAlignment,
  RiseBaseClass,
  RiseCreatureOrigin,
  RiseCreatureType,
  RiseSize,
  RiseAbilityDefinitionTag,
} from '@src/character_sheet/rise_data';
import { SphereName } from '@src/abilities/mystic_spheres';
import { BodyArmor, Shield } from '@src/monsters/equipment';
import { MonsterWeapon } from '@src/monsters/weapons';
import { showDetailedTiming } from './timing';
import { getManeuverByName } from '@src/abilities/combat_styles';
import {
  maneuverMakesStrike,
  formatMissingWeaponWarning,
  formatFreeformCodeWarning,
  formatSharedFreeformCodeWarning,
  formatNoStandardActionError,
} from '../src/utils/validation';

export interface BuildResult {
  creature: Creature | null;
  sheet: CharacterSheet | null;
  errors: string[];
  warnings: string[];
}

/**
 * Instantiates and configures a real game-engine Creature and CharacterSheet
 * from the given UI MonsterData and shared group freeform code.
 *
 * Captures all script/engine errors and overrides console.warn to log alignment
 * or verification warnings.
 */
export function buildCreature(monster: MonsterData, sharedFreeformCode?: string): BuildResult {
  const start = performance.now();
  const { name, requiredProperties, freeformCode } = monster;

  if (characterSheetExists(name)) {
    deleteCharacterSheet(name);
  }

  const warnings: string[] = [];
  const errors: string[] = [];

  function cleanMessage(msg: string, name: string): string {
    const prefix = `Monster ${name}: `;
    if (msg.startsWith(prefix)) {
      return msg.slice(prefix.length);
    }
    return msg;
  }

  // Override console.warn to capture validation warnings
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    const msg = args.join(' ');
    warnings.push(cleanMessage(msg, name));
    originalWarn(...args);
  };

  let creature: Creature;
  let sheet: CharacterSheet;

  try {
    const instantiateStart = performance.now();
    sheet = createCharacterSheet(name);
    sheet.setProperties({ name });
    creature = new Creature(sheet);
    const instantiateDuration = performance.now() - instantiateStart;

    const propertiesStart = performance.now();
    // Apply required properties
    creature.setRequiredProperties({
      alignment: requiredProperties.alignment as RiseAlignment,
      base_class: requiredProperties.base_class as RiseBaseClass,
      elite: requiredProperties.elite,
      creature_origin: requiredProperties.creature_origin as RiseCreatureOrigin,
      creature_type: requiredProperties.creature_type as RiseCreatureType,
      size: requiredProperties.size as RiseSize,
      level: requiredProperties.level,
    });

    // Apply structured properties
    if (monster.baseAttributes && monster.baseAttributes.length === 6) {
      creature.setBaseAttributes(monster.baseAttributes);
    }

    if (monster.trainedSkills && monster.trainedSkills.length > 0) {
      creature.setTrainedSkills(monster.trainedSkills as RiseSkill[]);
    }

    if (monster.knowledge) {
      const cleanKnowledge = {
        easy: monster.knowledge.easy || undefined,
        normal: monster.knowledge.normal || undefined,
        hard: monster.knowledge.hard || undefined,
        legendary: monster.knowledge.legendary || undefined,
      };
      if (Object.values(cleanKnowledge).some((v) => v !== undefined)) {
        creature.setKnowledgeResults(cleanKnowledge);
      }
    }

    if (monster.traits && monster.traits.length > 0) {
      for (const trait of monster.traits) {
        creature.addTrait(trait as RiseTrait);
      }
    }

    if (monster.customSenses && monster.customSenses.length > 0) {
      for (const sense of monster.customSenses) {
        creature.addCustomSense(sense);
      }
    }

    if (monster.customMovementSpeeds && monster.customMovementSpeeds.length > 0) {
      for (const speed of monster.customMovementSpeeds) {
        creature.addCustomMovementSpeed(speed);
      }
    }

    if (monster.immunities && monster.immunities.length > 0) {
      for (const immunity of monster.immunities) {
        creature.addImmunity(immunity);
      }
    }

    if (monster.resistances && monster.resistances.length > 0) {
      for (const resistance of monster.resistances) {
        creature.addResistant(resistance);
      }
    }

    if (monster.vulnerabilities && monster.vulnerabilities.length > 0) {
      for (const vulnerability of monster.vulnerabilities) {
        creature.addVulnerability(vulnerability);
      }
    }

    if (monster.equippedArmor || monster.equippedShield) {
      creature.setEquippedArmorName({
        bodyArmor: monster.equippedArmor as BodyArmor | undefined,
        shield: monster.equippedShield as Shield | undefined,
      });
    }

    if (monster.properties && Object.keys(monster.properties).length > 0) {
      creature.setProperties(monster.properties);
    }

    // 1. Standard Spells & Maneuvers:
    // Apply standard spells and maneuvers to the live preview creature instance.
    if (monster.standardAbilities && monster.standardAbilities.length > 0) {
      for (const ability of monster.standardAbilities) {
        if (ability.type === 'spell') {
          creature.addSpell(ability.name, toMonsterAbilityOptions(ability.options));
        } else {
          creature.addManeuver(ability.name, toMonsterAbilityOptions(ability.options));
          try {
            const baseManeuver = getManeuverByName(ability.name);
            if (baseManeuver && baseManeuver.effect) {
              if (maneuverMakesStrike(baseManeuver.effect) && !ability.options?.weapon) {
                const nameToUse = ability.options?.displayName || ability.name;
                warnings.push(formatMissingWeaponWarning(nameToUse));
              }
            }
          } catch {
            // Ignore if maneuver name is invalid
          }
        }
      }
    }

    // 2. Custom Active Abilities:
    // Reconstruct the CustomMonsterAbility configurations and load them.
    if (monster.customAbilities && monster.customAbilities.length > 0) {
      for (const ability of monster.customAbilities) {
        const abilityObj = toCustomMonsterAbility(ability);
        if (ability.type === 'spell') {
          creature.addCustomSpell(abilityObj);
        } else {
          creature.addCustomManeuver(abilityObj);
        }
      }
    }

    // 3. Passive Abilities:
    // Load passive effects on the live creature.
    if (monster.passiveAbilities && monster.passiveAbilities.length > 0) {
      for (const ability of monster.passiveAbilities) {
        creature.addPassiveAbility(ability);
      }
    }

    // 4. Weapons & Strikes:
    // Equip weapons and register special attack properties.
    if (monster.weapons && monster.weapons.length > 0) {
      for (const weapon of monster.weapons) {
        if (weapon.addStandard) {
          creature.addWeapon(weapon.name);
        }
        if (weapon.addMult) {
          creature.addWeaponMult(weapon.name, toMonsterAbilityOptions(weapon.options));
        }
        if (weapon.addGrappling) {
          creature.addGrapplingStrike(weapon.name, toMonsterAbilityOptions(weapon.options));
        }
        if (weapon.addSneak) {
          creature.addSneakAttack(weapon.name, toMonsterAbilityOptions(weapon.options));
        }
        if (weapon.addLatchOn) {
          creature.addLatchOn(weapon.name, toMonsterAbilityOptions(weapon.options));
        }
      }
    }

    // 5. Rituals:
    // Register Mystic Sphere lists.
    if (monster.rituals && monster.rituals.length > 0) {
      creature.addRituals(monster.rituals as SphereName[]);
    }
    const propertiesDuration = performance.now() - propertiesStart;

    // Run shared freeform code if present (for monster groups)
    let sharedFreeformDuration = 0;
    if (sharedFreeformCode) {
      const sharedFreeformStart = performance.now();
      try {
        const runShared = new Function('creature', sharedFreeformCode);
        runShared(creature);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        throw new Error(`Error in shared freeform code: ${msg}`);
      }
      sharedFreeformDuration = performance.now() - sharedFreeformStart;
    }

    // Run freeform code
    let freeformDuration = 0;
    if (freeformCode) {
      const freeformStart = performance.now();
      try {
        const runFreeform = new Function('creature', freeformCode);
        runFreeform(creature);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        throw new Error(`Error in freeform code: ${msg}`);
      }
      freeformDuration = performance.now() - freeformStart;
    }

    if (freeformCode && freeformCode.trim()) {
      warnings.push(formatFreeformCodeWarning(name));
    }
    if (sharedFreeformCode && sharedFreeformCode.trim()) {
      warnings.push(formatSharedFreeformCodeWarning(name));
    }

    // Run game engine calculations
    const calcStart = performance.now();
    creature.setProperties({ monster_type: creature.elite ? 'elite' : 'normal' });
    handleEverything();
    sheet.triggerRecalculation();
    
    // Process engine validation issues
    const issues = creature.checkValidMonster();
    for (const issue of issues) {
      if (issue.severity === 'error') {
        errors.push(`Monster ${name}: ${issue.message}`);
      } else {
        warnings.push(`Monster ${name}: ${issue.message}`);
      }
    }
    const calcDuration = performance.now() - calcStart;

    // Check for standard action abilities
    const activeAbilities = creature.getActiveAbilities();
    const standardAbilities = activeAbilities.filter(
      (ability) => (ability.usageTime || 'standard') === 'standard',
    );
    const hasStandardWeapon = (monster.weapons || []).some((w) => w.addStandard);

    if (standardAbilities.length === 0 && !hasStandardWeapon) {
      errors.push(formatNoStandardActionError(name));
    }

    const totalDuration = performance.now() - start;
    if (showDetailedTiming) {
      console.log(
        `[Timing] [Builder] "${name}" buildCreature total: ${totalDuration.toFixed(2)}ms`,
      );
      console.log(`[Timing] [Builder]   - Instantiate: ${instantiateDuration.toFixed(2)}ms`);
      console.log(`[Timing] [Builder]   - Properties & setup: ${propertiesDuration.toFixed(2)}ms`);
      if (sharedFreeformCode) {
        console.log(
          `[Timing] [Builder]   - Shared Freeform: ${sharedFreeformDuration.toFixed(2)}ms`,
        );
      }
      if (freeformCode) {
        console.log(`[Timing] [Builder]   - Freeform: ${freeformDuration.toFixed(2)}ms`);
      }
      console.log(
        `[Timing] [Builder]   - Engine Calc (handleEverything, recalculation, checkValid): ${calcDuration.toFixed(2)}ms`,
      );
    }

    return { creature, sheet, errors, warnings };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    errors.push(cleanMessage(msg, name));
    return { creature: null, sheet: null, errors, warnings };
  } finally {
    // Restore console.warn
    console.warn = originalWarn;
  }
}

function toMonsterAbilityOptions(options?: {
  displayName?: string;
  usageTime?: string;
  isMagical?: boolean;
  weapon?: string;
  tags?: string[];
}): MonsterAbilityOptions {
  if (!options) {
    return {};
  }
  return {
    displayName: options.displayName,
    isMagical: options.isMagical,
    tags: options.tags as RiseAbilityDefinitionTag[] | undefined,
    usageTime: options.usageTime as MonsterAttackUsageTime | undefined,
    weapon: options.weapon as MonsterWeapon | undefined,
  };
}
