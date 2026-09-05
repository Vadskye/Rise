import { Creature, MonsterAbilityOptions } from '@src/character_sheet/creature';
import { CharacterSheet } from '@src/character_sheet/character_sheet';
import {
  createCharacterSheet,
  characterSheetExists,
  deleteCharacterSheet,
} from '@src/character_sheet/current_character_sheet';
import { MonsterAttackUsageTime } from '@src/character_sheet/sheet_worker';
import {
  toCustomMonsterAbility,
  formatStructuredSense,
  formatStructuredMovementSpeed,
} from './codegen';
import { MonsterData, MonsterGroupData } from '../src/types/monster';
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
  formatMissingPoisonWarning,
  formatFreeformCodeWarning,
  formatSharedFreeformCodeWarning,
  checkValidMonster,
} from '@src/monsters/monster_validation';

export interface BuildResult {
  creature: Creature | null;
  sheet: CharacterSheet | null;
  errors: string[];
  requirements: string[];
  guidelines: string[];
}

/**
 * Instantiates and configures a real game-engine Creature and CharacterSheet
 * from the given UI MonsterData and shared group properties/freeform code.
 *
 * Captures all script/engine errors and overrides console.warn to log alignment
 * or verification warnings.
 */
export function buildCreature(monster: MonsterData, group?: MonsterGroupData): BuildResult {
  const start = performance.now();
  const { name, requiredProperties, freeformCode } = monster;

  if (characterSheetExists(name)) {
    deleteCharacterSheet(name);
  }

  const requirements: string[] = [];
  const guidelines: string[] = [];
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
    guidelines.push(cleanMessage(msg, name));
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
      creature_types: requiredProperties.creature_types as RiseCreatureType[],
      size: requiredProperties.size as RiseSize,
      level: requiredProperties.level,
    });

    // Parse group helper variables
    let groupObj: MonsterGroupData | undefined;
    let sharedFreeformCode: string | undefined;
    if (typeof group === 'string') {
      sharedFreeformCode = group;
    } else if (group) {
      groupObj = group;
      sharedFreeformCode = group.sharedFreeformCode;
    }

    // A. Apply shared group properties FIRST
    if (groupObj) {
      if (groupObj.traits && groupObj.traits.length > 0) {
        for (const trait of groupObj.traits) {
          creature.addTrait(trait as RiseTrait);
        }
      }

      if (groupObj.customSenses && groupObj.customSenses.length > 0) {
        for (const sense of groupObj.customSenses) {
          creature.addCustomSense(formatStructuredSense(sense));
        }
      }

      if (groupObj.customMovementSpeeds && groupObj.customMovementSpeeds.length > 0) {
        for (const speed of groupObj.customMovementSpeeds) {
          creature.addCustomMovementSpeed(formatStructuredMovementSpeed(speed));
        }
      }

      if (groupObj.immunities && groupObj.immunities.length > 0) {
        for (const immunity of groupObj.immunities) {
          creature.addImmunity(immunity);
        }
      }

      if (groupObj.resistances && groupObj.resistances.length > 0) {
        for (const resistance of groupObj.resistances) {
          creature.addResistant(resistance);
        }
      }

      if (groupObj.vulnerabilities && groupObj.vulnerabilities.length > 0) {
        for (const vulnerability of groupObj.vulnerabilities) {
          creature.addVulnerability(vulnerability);
        }
      }

      if (groupObj.properties && Object.keys(groupObj.properties).length > 0) {
        creature.setProperties(groupObj.properties);
      }

      if (groupObj.standardAbilities && groupObj.standardAbilities.length > 0) {
        for (const ability of groupObj.standardAbilities) {
          if (ability.type === 'spell') {
            creature.addSpell(ability.name, toMonsterAbilityOptions(ability.options));
          } else {
            compileStandardManeuver(creature, ability, requirements);
          }
        }
      }

      if (groupObj.customAbilities && groupObj.customAbilities.length > 0) {
        for (const ability of groupObj.customAbilities) {
          const abilityObj = toCustomMonsterAbility(ability);
          if (ability.type === 'spell') {
            creature.addCustomSpell(abilityObj);
          } else {
            creature.addCustomManeuver(abilityObj);
          }
        }
      }

      if (groupObj.passiveAbilities && groupObj.passiveAbilities.length > 0) {
        for (const ability of groupObj.passiveAbilities) {
          creature.addPassiveAbility(ability);
        }
      }

      if (groupObj.weapons && groupObj.weapons.length > 0) {
        for (const weapon of groupObj.weapons) {
          creature.addWeapon(weapon.name);
        }
      }

      if (groupObj.rituals && groupObj.rituals.length > 0) {
        creature.addRituals(groupObj.rituals as SphereName[]);
      }
    }

    // B. Apply individual monster properties SECOND
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
        creature.addCustomSense(formatStructuredSense(sense));
      }
    }

    if (monster.customMovementSpeeds && monster.customMovementSpeeds.length > 0) {
      for (const speed of monster.customMovementSpeeds) {
        creature.addCustomMovementSpeed(formatStructuredMovementSpeed(speed));
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

    // Armor and shield overrides group's defaults if specified
    const finalArmor =
      monster.equippedArmor !== undefined ? monster.equippedArmor : groupObj?.equippedArmor;
    const finalShield =
      monster.equippedShield !== undefined ? monster.equippedShield : groupObj?.equippedShield;
    if (finalArmor || finalShield) {
      creature.setEquippedArmorName({
        bodyArmor: finalArmor as BodyArmor | undefined,
        shield: finalShield as Shield | undefined,
      });
    }

    if (monster.properties && Object.keys(monster.properties).length > 0) {
      creature.setProperties(monster.properties);
    }

    // 1. Standard Spells & Maneuvers:
    if (monster.standardAbilities && monster.standardAbilities.length > 0) {
      for (const ability of monster.standardAbilities) {
        if (ability.type === 'spell') {
          creature.addSpell(ability.name, toMonsterAbilityOptions(ability.options));
        } else {
          compileStandardManeuver(creature, ability, requirements);
        }
      }
    }

    // 2. Custom Active Abilities:
    if (monster.customAbilities && monster.customAbilities.length > 0) {
      for (const ability of monster.customAbilities) {
        const abilityObj = toCustomMonsterAbility(ability);
        if (ability.type === 'spell') {
          creature.addCustomSpell(abilityObj);
        } else {
          creature.addCustomManeuver(abilityObj);
          if (ability.effect && maneuverMakesStrike(ability.effect) && !ability.weapon) {
            requirements.push(formatMissingWeaponWarning(ability.name));
          }
        }
      }
    }

    // 3. Passive Abilities:
    if (monster.passiveAbilities && monster.passiveAbilities.length > 0) {
      for (const ability of monster.passiveAbilities) {
        creature.addPassiveAbility(ability);
      }
    }

    // 4. Weapons & Strikes:
    if (monster.weapons && monster.weapons.length > 0) {
      for (const weapon of monster.weapons) {
        creature.addWeapon(weapon.name);
      }
    }

    // 5. Rituals:
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
      guidelines.push(formatFreeformCodeWarning(name));
    }
    if (sharedFreeformCode && sharedFreeformCode.trim()) {
      guidelines.push(formatSharedFreeformCodeWarning(name));
    }

    // Run game engine calculations
    const calcStart = performance.now();
    creature.setProperties({ monster_type: creature.elite ? 'elite' : 'normal' });
    sheet.triggerRecalculation();

    const calcDuration = performance.now() - calcStart;

    const validation = checkValidMonster(creature, group);
    requirements.push(...validation.requirements);
    guidelines.push(...validation.guidelines);

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

    return { creature, sheet, errors, requirements, guidelines };
  } catch (err) {
    console.error(`[creature_builder] Error building creature "${name}":`, err);
    const msg = err instanceof Error ? err.message : String(err);
    errors.push(cleanMessage(msg, name));
    return { creature: null, sheet: null, errors, requirements, guidelines };
  } finally {
    // Restore console.warn
    console.warn = originalWarn;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function compileStandardManeuver(creature: Creature, ability: any, requirements: string[]) {
  const options = toMonsterAbilityOptions(ability.options);
  const weapon = ability.options?.weapon;

  if (ability.name === 'Equip Weapon') {
    if (weapon) {
      creature.addWeapon(weapon);
    }
    return;
  }

  const STRIKE_MODIFICATIONS = [
    'Weapon Multiplier',
    'Grappling Strike',
    'Sneak Attack',
    'Latch On',
    'Throw Item',
    'Poisonous Strike',
  ];

  if (STRIKE_MODIFICATIONS.includes(ability.name)) {
    const nameToUse = ability.options?.displayName || ability.name;
    const poison = ability.options?.poison;

    if (ability.name === 'Poisonous Strike') {
      let valid = true;
      if (!weapon) {
        requirements.push(formatMissingWeaponWarning(nameToUse));
        valid = false;
      }
      if (!poison) {
        requirements.push(formatMissingPoisonWarning(nameToUse));
        valid = false;
      }
      if (valid && weapon && poison) {
        creature.addStandardPoisonousStrike(weapon, poison, options);
      }
      return;
    }

    if (!weapon) {
      requirements.push(formatMissingWeaponWarning(nameToUse, ability.name === 'Throw Item'));
      return;
    }
    if (ability.name === 'Weapon Multiplier') {
      creature.addWeaponMult(weapon, options);
    } else if (ability.name === 'Grappling Strike') {
      creature.addGrapplingStrike(weapon, options);
    } else if (ability.name === 'Sneak Attack') {
      creature.addSneakAttack(weapon, options);
    } else if (ability.name === 'Latch On') {
      creature.addLatchOn(weapon, options);
    } else if (ability.name === 'Throw Item') {
      creature.addThrowItem(weapon, options);
    }
    return;
  }

  // Regular standard maneuvers
  creature.addManeuver(ability.name, options);
  try {
    const baseManeuver = getManeuverByName(ability.name);
    if (baseManeuver && baseManeuver.effect) {
      if (maneuverMakesStrike(baseManeuver.effect) && !weapon) {
        const nameToUse = ability.options?.displayName || ability.name;
        requirements.push(formatMissingWeaponWarning(nameToUse));
      }
    }
  } catch {
    // Ignore if maneuver name is invalid
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
