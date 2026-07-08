import { Creature } from '@src/character_sheet/creature';
import {
  createCharacterSheet,
  clearAllCharacterSheets,
} from '@src/character_sheet/current_character_sheet';
import { handleEverything } from '@src/character_sheet/sheet_worker';
import { MonsterData } from './codegen';

export function validateMonster(
  monster: MonsterData,
  sharedFreeformCode?: string,
) {
  const { name, requiredProperties, freeformCode } = monster;
  clearAllCharacterSheets();
  const warnings: string[] = [];
  const errors: string[] = [];

  // Override console.warn to capture validation warnings
  const originalWarn = console.warn;
  console.warn = (...args: any[]) => {
    warnings.push(args.join(' '));
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

    if (monster.knowledge && Object.values(monster.knowledge).some(v => v)) {
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

    return {
      success: true,
      errors,
      warnings,
      computedStats,
    };
  } catch (err: any) {
    errors.push(err.message || String(err));
    return {
      success: false,
      errors,
      warnings,
      computedStats: null,
    };
  } finally {
    // Restore console.warn
    console.warn = originalWarn;
  }
}
