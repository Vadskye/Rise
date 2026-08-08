import * as fs from 'fs';
import * as path from 'path';
import { pathToFileURL } from 'url';

const KNOWN_FOLDERS: Record<string, string> = {
  Kobolds: 'Uncivilized Humanoids',
  Ogres: 'Uncivilized Humanoids',
  Orcs: 'Uncivilized Humanoids',
  Necromancers: 'Civilized Humanoids',
  Townsfolk: 'Civilized Humanoids',
  Lizardfolk: 'Uncivilized Humanoids',
};

const STANDARD_SENSES = [
  { name: 'Blindsense', hasRange: true, defaultRange: 30 },
  { name: 'Blindsight', hasRange: true, defaultRange: 60 },
  { name: 'Darkvision', hasRange: true, defaultRange: 60 },
  { name: 'Lifesense', hasRange: true, defaultRange: 30 },
  { name: 'Lifesight', hasRange: true, defaultRange: 60 },
  { name: 'Low-light Vision', hasRange: false },
  { name: 'Scent', hasRange: false },
  { name: 'Telepathy', hasRange: true, defaultRange: 100 },
  { name: 'Tremorsense', hasRange: true, defaultRange: 30 },
  { name: 'Tremorsight', hasRange: true, defaultRange: 60 },
];

const STANDARD_MOVEMENT_MODES = [
  { name: 'Fly', hasLimit: true, defaultLimit: 60 },
  { name: 'Glide', hasLimit: true, defaultLimit: 30 },
  { name: 'Burrow', hasLimit: false },
  { name: 'Climb', hasLimit: false },
  { name: 'Swim', hasLimit: false },
  { name: 'Land', hasLimit: false },
  { name: 'Walk', hasLimit: false },
];

function parseSense(senseStr: string) {
  const match = senseStr.match(/^([^(]+)\s*\((\d+)\s*ft\.\)$/);
  if (match) {
    const typeCandidate = match[1].trim();
    const range = parseInt(match[2], 10);
    const standardSense = STANDARD_SENSES.find(
      (s) => s.name.toLowerCase() === typeCandidate.toLowerCase(),
    );
    if (standardSense) {
      return { type: standardSense.name, range };
    } else {
      return { type: 'Other', customName: typeCandidate, range };
    }
  } else {
    const typeCandidate = senseStr.trim();
    const standardSense = STANDARD_SENSES.find(
      (s) => s.name.toLowerCase() === typeCandidate.toLowerCase(),
    );
    if (standardSense) {
      return { type: standardSense.name };
    } else {
      return { type: 'Other', customName: typeCandidate };
    }
  }
}

function parseMovementSpeed(speedStr: string) {
  const match = speedStr.match(/^([^(]+)\s*\(([^)]+)\)$/);
  if (!match) {
    return null;
  }
  const modeCandidate = match[1].trim();
  const details = match[2].split(',').map((s) => s.trim());
  const categoryStr = details[0].toLowerCase();
  const category = categoryStr === 'slow' ? 'slow' : categoryStr === 'fast' ? 'fast' : 'average';

  const standardMode = STANDARD_MOVEMENT_MODES.find(
    (m) => m.name.toLowerCase() === modeCandidate.toLowerCase(),
  );
  const mode = standardMode ? standardMode.name : 'Other';
  const customMode = standardMode ? undefined : modeCandidate;

  let limitType = 'none';
  let limitValue: number | undefined;

  if (details.length > 1) {
    const limitDetail = details[1];
    if (limitDetail === 'limitless') {
      limitType = 'limitless';
    } else if (limitDetail.includes('limit')) {
      limitType = 'limit';
      const valMatch = limitDetail.match(/(\d+)/);
      if (valMatch) {
        limitValue = parseInt(valMatch[1], 10);
      }
    }
  }

  // Omit default Land (average)
  if (mode === 'Land' && category === 'average' && limitType === 'none') {
    return null;
  }

  return {
    mode,
    ...(customMode ? { customMode } : {}),
    category,
    ...(limitType !== 'none' ? { limitType, limitValue } : {}),
  };
}

class MockCreature {
  public requiredProperties: any = {};
  public baseAttributes: number[] = [];
  public trainedSkills: string[] = [];
  public knowledge: any = {};

  public traits: string[] = [];
  public customSenses: any[] = [];
  public customMovementSpeeds: any[] = [];
  public immunities: string[] = [];
  public resistances: string[] = [];
  public vulnerabilities: string[] = [];
  public equippedArmor?: string;
  public equippedShield?: string;
  public properties: any = {};
  public standardAbilities: any[] = [];
  public customAbilities: any[] = [];
  public passiveAbilities: any[] = [];
  public weapons: any[] = [];
  public rituals: string[] = [];

  setRequiredProperties(props: any) {
    this.requiredProperties = { ...this.requiredProperties, ...props };
  }
  setBaseAttributes(attrs: number[]) {
    this.baseAttributes = attrs;
  }
  setTrainedSkills(skills: string[]) {
    this.trainedSkills = skills;
  }
  setKnowledgeResults(kn: any) {
    this.knowledge = { ...this.knowledge, ...kn };
  }
  addTrait(trait: string) {
    this.traits.push(trait);
  }
  addCustomSense(sense: string) {
    const parsed = parseSense(sense);
    this.customSenses.push(parsed);
  }
  addCustomMovementSpeed(speed: string) {
    const parsed = parseMovementSpeed(speed);
    if (parsed) {
      this.customMovementSpeeds.push(parsed);
    }
  }
  addImmunity(immunity: string) {
    this.immunities.push(immunity);
  }
  addResistant(resistant: string) {
    this.resistances.push(resistant);
  }
  addVulnerability(vulnerability: string) {
    this.vulnerabilities.push(vulnerability);
  }
  setEquippedArmorName(config: any) {
    if (config.bodyArmor) {
      this.equippedArmor = config.bodyArmor;
    }
    if (config.shield) {
      this.equippedShield = config.shield;
    }
  }
  setProperties(props: any) {
    this.properties = { ...this.properties, ...props };
  }
  addWeapon(name: string) {
    this.weapons.push({ name });
  }
  addWeaponMult(weapon: string, options?: any) {
    this.standardAbilities.push({
      type: 'maneuver',
      name: 'Weapon Multiplier',
      options: {
        isMagical: false,
        weapon,
        ...options,
      },
    });
  }
  addGrapplingStrike(weapon: string, options?: any) {
    this.standardAbilities.push({
      type: 'maneuver',
      name: 'Grappling Strike',
      options: {
        isMagical: false,
        weapon,
        ...options,
      },
    });
  }
  addSneakAttack(weapon: string, options?: any) {
    this.standardAbilities.push({
      type: 'maneuver',
      name: 'Sneak Attack',
      options: {
        isMagical: false,
        weapon,
        ...options,
      },
    });
  }
  addLatchOn(weapon: string, options?: any) {
    this.standardAbilities.push({
      type: 'maneuver',
      name: 'Latch On',
      options: {
        isMagical: false,
        weapon,
        ...options,
      },
    });
  }
  addManeuver(name: string, options?: any) {
    this.standardAbilities.push({
      type: 'maneuver',
      name,
      options: {
        isMagical: false,
        ...options,
      },
    });
  }
  addSpell(name: string, options?: any) {
    this.standardAbilities.push({
      type: 'spell',
      name,
      options: {
        isMagical: true,
        ...options,
      },
    });
  }
  addCustomSpell(ability: any) {
    this.customAbilities.push({
      type: 'spell',
      ...ability,
    });
  }
  addCustomManeuver(ability: any) {
    this.customAbilities.push({
      type: 'maneuver',
      ...ability,
    });
  }
  addPassiveAbility(ability: any) {
    const { name, effect, isMagical } = ability;
    this.passiveAbilities.push({
      name,
      effect,
      isMagical: Boolean(isMagical),
    });
  }
  addRituals(rituals: string[]) {
    this.rituals.push(...rituals);
  }
}

function createMockCreature() {
  const creature = new MockCreature();
  return new Proxy(creature, {
    get(target: any, prop: string) {
      if (prop in target) {
        return target[prop];
      }
      return (...args: any[]) => {
        console.warn(`[WARNING] Unhandled creature method: ${prop} with args:`, args);
        return target;
      };
    },
  });
}

class MockGrimoire {
  public monsterGroups: any[] = [];
  public monsters: any[] = [];

  addMonster(name: string, initializer: any) {
    this.monsters.push({ name, initializer });
  }

  addMonsterGroup(config: any, initializers: [string, any][]) {
    this.monsterGroups.push({ config, initializers });
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error(
      'Usage: npx tsx convert_monsters_to_ui.ts <file_path> <function_name> [default_folder]',
    );
    process.exit(1);
  }

  const [filePath, functionName, defaultFolder] = args;
  const absolutePath = path.resolve(process.cwd(), filePath);

  console.log(`Loading target file: ${absolutePath}`);
  const targetModule = await import(pathToFileURL(absolutePath).toString());
  const registerFn = targetModule[functionName];

  if (typeof registerFn !== 'function') {
    console.error(`Error: Function "${functionName}" not found in target file.`);
    process.exit(1);
  }

  console.log(`Running registration function "${functionName}"...`);
  const mockGrimoire = new MockGrimoire();
  registerFn(mockGrimoire);

  console.log(`Loading database...`);
  const dbPath = path.resolve(process.cwd(), 'monster_ui/monsters_from_ui.json');
  const rawDb = fs.readFileSync(dbPath, 'utf8');
  const db = JSON.parse(rawDb);

  console.log(`Processing registered monster groups...`);
  for (const group of mockGrimoire.monsterGroups) {
    const groupConfig = group.config;
    const groupName = groupConfig.name;
    console.log(`  - Processing group: ${groupName}`);

    const sharedCreature = createMockCreature() as any;
    if (groupConfig.sharedInitializer) {
      groupConfig.sharedInitializer(sharedCreature);
    }

    const monstersJson = [];
    for (const [monsterName, initializer] of group.initializers) {
      const monsterCreature = createMockCreature() as any;
      initializer(monsterCreature);

      const finalSkills = [
        ...new Set([
          ...(monsterCreature.trainedSkills || []),
          ...(sharedCreature.trainedSkills || []),
        ]),
      ];

      const normalizedProps = {
        alignment: monsterCreature.requiredProperties.alignment,
        base_class: monsterCreature.requiredProperties.base_class,
        elite: Boolean(monsterCreature.requiredProperties.elite),
        creature_origin: monsterCreature.requiredProperties.creature_origin || 'natural',
        creature_types:
          monsterCreature.requiredProperties.creature_types ||
          (monsterCreature.requiredProperties.creature_type
            ? [monsterCreature.requiredProperties.creature_type]
            : []),
        size: monsterCreature.requiredProperties.size,
        level: Number(monsterCreature.requiredProperties.level),
      };

      const normalizedKn: any = {};
      if (monsterCreature.knowledge) {
        const kn = monsterCreature.knowledge;
        if (kn.easy) {
          normalizedKn.easy = kn.easy.trim();
        }
        if (kn.normal) {
          normalizedKn.normal = kn.normal.trim();
        }
        if (kn.hard) {
          normalizedKn.hard = kn.hard.trim();
        }
        if (kn.legendary) {
          normalizedKn.legendary = kn.legendary.trim();
        }
      }

      const monsterObj: any = {
        name: monsterName,
        requiredProperties: normalizedProps,
        freeformCode: '',
      };

      if (monsterCreature.baseAttributes && monsterCreature.baseAttributes.length === 6) {
        monsterObj.baseAttributes = monsterCreature.baseAttributes;
      }
      if (finalSkills.length > 0) {
        monsterObj.trainedSkills = finalSkills;
      }
      if (Object.keys(normalizedKn).length > 0) {
        monsterObj.knowledge = normalizedKn;
      }
      if (monsterCreature.traits.length > 0) {
        monsterObj.traits = monsterCreature.traits;
      }
      if (monsterCreature.customSenses.length > 0) {
        monsterObj.customSenses = monsterCreature.customSenses;
      }
      if (monsterCreature.customMovementSpeeds.length > 0) {
        monsterObj.customMovementSpeeds = monsterCreature.customMovementSpeeds;
      }
      if (monsterCreature.immunities.length > 0) {
        monsterObj.immunities = monsterCreature.immunities;
      }
      if (monsterCreature.resistances.length > 0) {
        monsterObj.resistances = monsterCreature.resistances;
      }
      if (monsterCreature.vulnerabilities.length > 0) {
        monsterObj.vulnerabilities = monsterCreature.vulnerabilities;
      }
      if (monsterCreature.equippedArmor) {
        monsterObj.equippedArmor = monsterCreature.equippedArmor;
      }
      if (monsterCreature.equippedShield) {
        monsterObj.equippedShield = monsterCreature.equippedShield;
      }
      if (Object.keys(monsterCreature.properties).length > 0) {
        monsterObj.properties = monsterCreature.properties;
      }
      if (monsterCreature.standardAbilities.length > 0) {
        monsterObj.standardAbilities = monsterCreature.standardAbilities;
      }
      if (monsterCreature.customAbilities.length > 0) {
        monsterObj.customAbilities = monsterCreature.customAbilities;
      }
      if (monsterCreature.passiveAbilities.length > 0) {
        monsterObj.passiveAbilities = monsterCreature.passiveAbilities;
      }
      if (monsterCreature.weapons.length > 0) {
        monsterObj.weapons = monsterCreature.weapons;
      }
      if (monsterCreature.rituals.length > 0) {
        monsterObj.rituals = monsterCreature.rituals;
      }

      monstersJson.push(monsterObj);
    }

    const groupObj: any = {
      name: groupName,
      folder: KNOWN_FOLDERS[groupName] || defaultFolder || undefined,
      hasArt: Boolean(groupConfig.hasArt),
      sharedFreeformCode: '',
      monsters: monstersJson,
    };

    const normalizedGroupKn: any = {};
    if (groupConfig.knowledge) {
      const kn = groupConfig.knowledge;
      if (kn.easy) {
        normalizedGroupKn.easy = kn.easy.trim();
      }
      if (kn.normal) {
        normalizedGroupKn.normal = kn.normal.trim();
      }
      if (kn.hard) {
        normalizedGroupKn.hard = kn.hard.trim();
      }
      if (kn.legendary) {
        normalizedGroupKn.legendary = kn.legendary.trim();
      }
    }

    // Special check for Kobolds dragonsworn knowledge extraction
    if (groupName === 'Kobolds' && Object.keys(normalizedGroupKn).length === 0) {
      normalizedGroupKn.normal = `Although kobolds can be found in civilization, many kobolds live out in the wilds.\nThey are coordinated and brave fighters as long as they have a leader present to guide them.\nIf their leader falls, they will generally try to flee and regroup.`;
      normalizedGroupKn.hard = `Kobolds must respect their leader for more than brute strength.\nThey always prefer to serve dragons if possible, but cunning and charismatic creatures can convince kobolds to form temporary alliances out of mutual interest.`;
    }

    if (Object.keys(normalizedGroupKn).length > 0) {
      groupObj.knowledge = normalizedGroupKn;
    }
    if (groupConfig.description) {
      groupObj.description = groupConfig.description;
    }

    if (sharedCreature.traits.length > 0) {
      groupObj.traits = sharedCreature.traits;
    }
    if (sharedCreature.customSenses.length > 0) {
      groupObj.customSenses = sharedCreature.customSenses;
    }
    if (sharedCreature.customMovementSpeeds.length > 0) {
      groupObj.customMovementSpeeds = sharedCreature.customMovementSpeeds;
    }
    if (sharedCreature.immunities.length > 0) {
      groupObj.immunities = sharedCreature.immunities;
    }
    if (sharedCreature.resistances.length > 0) {
      groupObj.resistances = sharedCreature.resistances;
    }
    if (sharedCreature.vulnerabilities.length > 0) {
      groupObj.vulnerabilities = sharedCreature.vulnerabilities;
    }
    if (sharedCreature.equippedArmor) {
      groupObj.equippedArmor = sharedCreature.equippedArmor;
    }
    if (sharedCreature.equippedShield) {
      groupObj.equippedShield = sharedCreature.equippedShield;
    }
    if (Object.keys(sharedCreature.properties).length > 0) {
      groupObj.properties = sharedCreature.properties;
    }
    if (sharedCreature.standardAbilities.length > 0) {
      groupObj.standardAbilities = sharedCreature.standardAbilities;
    }
    if (sharedCreature.customAbilities.length > 0) {
      groupObj.customAbilities = sharedCreature.customAbilities;
    }
    if (sharedCreature.passiveAbilities.length > 0) {
      groupObj.passiveAbilities = sharedCreature.passiveAbilities;
    }
    if (sharedCreature.weapons.length > 0) {
      groupObj.weapons = sharedCreature.weapons;
    }
    if (sharedCreature.rituals.length > 0) {
      groupObj.rituals = sharedCreature.rituals;
    }

    const existingGroupIndex = db.monsterGroups.findIndex(
      (g: any) => g.name.toLowerCase() === groupName.toLowerCase(),
    );
    if (existingGroupIndex !== -1) {
      console.log(`  Updating existing group "${groupName}" in DB.`);
      db.monsterGroups[existingGroupIndex] = groupObj;
    } else {
      console.log(`  Adding new group "${groupName}" to DB.`);
      db.monsterGroups.push(groupObj);
    }
  }

  console.log(`Processing registered individual monsters...`);
  for (const m of mockGrimoire.monsters) {
    console.log(`  - Processing monster: ${m.name}`);
    const monsterCreature = createMockCreature() as any;
    m.initializer(monsterCreature);

    const normalizedProps = {
      alignment: monsterCreature.requiredProperties.alignment,
      base_class: monsterCreature.requiredProperties.base_class,
      elite: Boolean(monsterCreature.requiredProperties.elite),
      creature_origin: monsterCreature.requiredProperties.creature_origin || 'natural',
      creature_types:
        monsterCreature.requiredProperties.creature_types ||
        (monsterCreature.requiredProperties.creature_type
          ? [monsterCreature.requiredProperties.creature_type]
          : []),
      size: monsterCreature.requiredProperties.size,
      level: Number(monsterCreature.requiredProperties.level),
    };

    const normalizedKn: any = {};
    if (monsterCreature.knowledge) {
      const kn = monsterCreature.knowledge;
      if (kn.easy) {
        normalizedKn.easy = kn.easy.trim();
      }
      if (kn.normal) {
        normalizedKn.normal = kn.normal.trim();
      }
      if (kn.hard) {
        normalizedKn.hard = kn.hard.trim();
      }
      if (kn.legendary) {
        normalizedKn.legendary = kn.legendary.trim();
      }
    }

    const monsterObj: any = {
      name: m.name,
      folder: KNOWN_FOLDERS[m.name] || defaultFolder || undefined,
      requiredProperties: normalizedProps,
      freeformCode: '',
    };

    if (monsterCreature.baseAttributes && monsterCreature.baseAttributes.length === 6) {
      monsterObj.baseAttributes = monsterCreature.baseAttributes;
    }
    if (monsterCreature.trainedSkills.length > 0) {
      monsterObj.trainedSkills = monsterCreature.trainedSkills;
    }
    if (Object.keys(normalizedKn).length > 0) {
      monsterObj.knowledge = normalizedKn;
    }
    if (monsterCreature.traits.length > 0) {
      monsterObj.traits = monsterCreature.traits;
    }
    if (monsterCreature.customSenses.length > 0) {
      monsterObj.customSenses = monsterCreature.customSenses;
    }
    if (monsterCreature.customMovementSpeeds.length > 0) {
      monsterObj.customMovementSpeeds = monsterCreature.customMovementSpeeds;
    }
    if (monsterCreature.immunities.length > 0) {
      monsterObj.immunities = monsterCreature.immunities;
    }
    if (monsterCreature.resistances.length > 0) {
      monsterObj.resistances = monsterCreature.resistances;
    }
    if (monsterCreature.vulnerabilities.length > 0) {
      monsterObj.vulnerabilities = monsterCreature.vulnerabilities;
    }
    if (monsterCreature.equippedArmor) {
      monsterObj.equippedArmor = monsterCreature.equippedArmor;
    }
    if (monsterCreature.equippedShield) {
      monsterObj.equippedShield = monsterCreature.equippedShield;
    }
    if (Object.keys(monsterCreature.properties).length > 0) {
      monsterObj.properties = monsterCreature.properties;
    }
    if (monsterCreature.standardAbilities.length > 0) {
      monsterObj.standardAbilities = monsterCreature.standardAbilities;
    }
    if (monsterCreature.customAbilities.length > 0) {
      monsterObj.customAbilities = monsterCreature.customAbilities;
    }
    if (monsterCreature.passiveAbilities.length > 0) {
      monsterObj.passiveAbilities = monsterCreature.passiveAbilities;
    }
    if (monsterCreature.weapons.length > 0) {
      monsterObj.weapons = monsterCreature.weapons;
    }
    if (monsterCreature.rituals.length > 0) {
      monsterObj.rituals = monsterCreature.rituals;
    }

    const existingMonsterIndex = db.monsters.findIndex(
      (x: any) => x.name.toLowerCase() === m.name.toLowerCase(),
    );
    if (existingMonsterIndex !== -1) {
      console.log(`  Updating existing monster "${m.name}" in DB.`);
      db.monsters[existingMonsterIndex] = monsterObj;
    } else {
      console.log(`  Adding new monster "${m.name}" to DB.`);
      db.monsters.push(monsterObj);
    }
  }

  console.log(`Saving database...`);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  console.log(`Database saved successfully.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
