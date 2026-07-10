import { Creature } from '@src/character_sheet/creature';
import {
  createCharacterSheet,
  characterSheetExists,
  getCharacterSheet,
  deleteCharacterSheet,
} from '@src/character_sheet/current_character_sheet';
import { handleEverything } from '@src/character_sheet/sheet_worker';
import { MonsterData } from './codegen';

/**
 * Validates a monster configuration by instantiating a real game-engine Creature.
 * Design decisions:
 * 1. Caching: We serialize the input data (`monster` and `sharedFreeformCode`) and check if
 *    an existing character sheet with the same payload is cached. Since sheet recalculations
 *    are CPU-intensive, this cache prevents redundant calculations during rapid UI updates/switches.
 * 2. Execution Order: Applies properties in the exact same sequence as codegen: required properties,
 *    structured fields, group shared freeform code, and finally individual freeform code.
 * 3. Warning Capture: Overrides `console.warn` to record engine-level validation warnings 
 *    (e.g., skill/attribute alignment mismatches) so they can be shown inline in the UI.
 * 4. Error Handling: Intercepts script exceptions (like JavaScript syntax errors in the freeform block)
 *    and returns them as user-facing errors rather than crashing the server.
 */
export function validateMonster(
  monster: MonsterData,
  sharedFreeformCode?: string,
  groupName?: string,
) {
  const { name, requiredProperties, freeformCode } = monster;
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
  console.warn = (...args: any[]) => {
    const msg = args.join(' ');
    warnings.push(cleanMessage(msg, name));
    originalWarn(...args);
  };

  try {
    const sheet = createCharacterSheet(name);
    sheet.setProperties({ name });
    const creature = new Creature(sheet);

    // Apply required properties
    creature.setRequiredProperties(requiredProperties);

    // Apply structured properties
    if (monster.baseAttributes && monster.baseAttributes.length === 6) {
      creature.setBaseAttributes(monster.baseAttributes);
    }

    if (monster.trainedSkills && monster.trainedSkills.length > 0) {
      creature.setTrainedSkills(monster.trainedSkills as any);
    }

    if (monster.knowledge && Object.values(monster.knowledge).some((v) => v)) {
      const cleanKnowledge: Record<string, string> = {};
      for (const [key, value] of Object.entries(monster.knowledge)) {
        if (value) cleanKnowledge[key] = value;
      }
      if (Object.keys(cleanKnowledge).length > 0) {
        creature.setKnowledgeResults(cleanKnowledge);
      }
    }

    if (monster.traits && monster.traits.length > 0) {
      for (const trait of monster.traits) {
        creature.addTrait(trait as any);
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

    if (monster.equippedArmor) {
      creature.setEquippedArmorName({ bodyArmor: monster.equippedArmor as any });
    }

    if (monster.properties && Object.keys(monster.properties).length > 0) {
      creature.setProperties(monster.properties);
    }

    // 1. Standard Spells & Maneuvers:
    // Apply standard spells and maneuvers to the live preview creature instance.
    if (monster.standardAbilities && monster.standardAbilities.length > 0) {
       for (const ability of monster.standardAbilities) {
        if (ability.type === 'spell') {
          creature.addSpell(ability.name, ability.options);
        } else {
          creature.addManeuver(ability.name, ability.options);
        }
      }
    }

    // 2. Custom Active Abilities:
    // Reconstruct the CustomMonsterAbility configurations and load them.
    if (monster.customAbilities && monster.customAbilities.length > 0) {
      for (const ability of monster.customAbilities) {
        const abilityObj: any = {
          name: ability.name,
          isMagical: ability.isMagical,
        };
        if (ability.usageTime) abilityObj.usageTime = ability.usageTime;
        if (ability.cost) abilityObj.cost = ability.cost;
        if (ability.effect) abilityObj.effect = ability.effect;
        if (ability.tags && ability.tags.length > 0) abilityObj.tags = ability.tags as any;
        if (ability.attack) {
          abilityObj.attack = {
            targeting: ability.attack.targeting,
            hit: ability.attack.hit,
          };
          if (ability.attack.crit) abilityObj.attack.crit = ability.attack.crit;
          if (ability.attack.miss) abilityObj.attack.miss = ability.attack.miss;
          if (ability.attack.injury) abilityObj.attack.injury = ability.attack.injury;
          if (ability.attack.halfOnMiss !== undefined) abilityObj.attack.halfOnMiss = ability.attack.halfOnMiss;
        }

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
          creature.addWeaponMult(weapon.name, weapon.options);
        }
        if (weapon.addGrappling) {
          creature.addGrapplingStrike(weapon.name, weapon.options);
        }
        if (weapon.addSneak) {
          creature.addSneakAttack(weapon.name, weapon.options);
        }
        if (weapon.addLatchOn) {
          creature.addLatchOn(weapon.name, weapon.options);
        }
      }
    }

    // 5. Rituals:
    // Register Mystic Sphere lists.
    if (monster.rituals && monster.rituals.length > 0) {
      creature.addRituals(monster.rituals as any);
    }

    // Run shared freeform code if present (for monster groups)
    if (sharedFreeformCode) {
      try {
        const runShared = new Function('creature', sharedFreeformCode);
        runShared(creature);
      } catch (err: any) {
        throw new Error(`Error in shared freeform code: ${err.message || err}`);
      }
    }

    // Run freeform code
    if (freeformCode) {
      try {
        const runFreeform = new Function('creature', freeformCode);
        runFreeform(creature);
      } catch (err: any) {
        throw new Error(`Error in freeform code: ${err.message || err}`);
      }
    }

    // Run game engine calculations
    creature.setProperties({ monster_type: creature.elite ? 'elite' : 'normal' });
    handleEverything();
    sheet.triggerRecalculation();
    creature.checkValidMonster();

    // Serialize computed stats for frontend preview
    const computedStats = {
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
      activeAbilities: creature.getActiveAbilities(),
      passiveAbilities: creature.getPassiveAbilities(),
      knowledge: creature.getKnowledgeResultConfig(),
    };

    const result = {
      success: true,
      errors,
      warnings,
      computedStats,
      cacheHit: false,
    };
    sheet.cachedInputJson = inputJson;
    sheet.cachedValidationResult = result;
    return result;
  } catch (err: any) {
    const msg = err.message || String(err);
    errors.push(cleanMessage(msg, name));
    const result = {
      success: false,
      errors,
      warnings,
      computedStats: null,
      cacheHit: false,
    };
    const sheet = getCharacterSheet(name);
    if (sheet) {
      sheet.cachedInputJson = inputJson;
      sheet.cachedValidationResult = result;
    }
    return result;
  } finally {
    // Restore console.warn
    console.warn = originalWarn;
  }
}
