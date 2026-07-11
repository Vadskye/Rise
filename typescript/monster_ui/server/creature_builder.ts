import { Creature } from '@src/character_sheet/creature';
import { CharacterSheet } from '@src/character_sheet/character_sheet';
import {
  createCharacterSheet,
  characterSheetExists,
  deleteCharacterSheet,
} from '@src/character_sheet/current_character_sheet';
import { handleEverything } from '@src/character_sheet/sheet_worker';
import { MonsterData, toCustomMonsterAbility } from './codegen';

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
export function buildCreature(
  monster: MonsterData,
  sharedFreeformCode?: string,
): BuildResult {
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
  console.warn = (...args: any[]) => {
    const msg = args.join(' ');
    warnings.push(cleanMessage(msg, name));
    originalWarn(...args);
  };

  let creature: Creature | null = null;
  let sheet: CharacterSheet | null = null;

  try {
    sheet = createCharacterSheet(name);
    sheet.setProperties({ name });
    creature = new Creature(sheet);

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
        if (value) {
          cleanKnowledge[key] = value;
        }
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

    return { creature, sheet, errors, warnings };
  } catch (err: any) {
    const msg = err.message || String(err);
    errors.push(cleanMessage(msg, name));
    return { creature: null, sheet: null, errors, warnings };
  } finally {
    // Restore console.warn
    console.warn = originalWarn;
  }
}
