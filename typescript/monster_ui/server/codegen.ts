import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { paths } from './paths';
import { CustomMonsterAbility } from '@src/character_sheet/creature';
import { MonsterAttackUsageTime } from '@src/character_sheet/sheet_worker';
import { RiseAbilityDefinitionTag } from '@src/character_sheet/rise_data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface MonsterRequiredProperties {
  alignment: string;
  base_class: string;
  elite: boolean;
  creature_origin: string;
  creature_type: string;
  size: string;
  level: number;
}

export interface StandardAbilityConfig {
  type: 'spell' | 'maneuver';
  name: string;
  options?: {
    displayName?: string;
    usageTime?: string;
    isMagical?: boolean;
    weapon?: string;
    tags?: string[];
  };
}

export interface CustomAbilityAttackConfig {
  targeting: string;
  hit: string;
  crit?: string | null;
  miss?: string;
  injury?: string;
  halfOnMiss?: boolean;
}

export interface CustomAbilityConfig {
  type: 'spell' | 'maneuver';
  name: string;
  usageTime?: string;
  cost?: string;
  effect?: string;
  isMagical?: boolean;
  tags?: string[];
  attack?: CustomAbilityAttackConfig;
}

export interface PassiveAbilityConfig {
  name: string;
  effect: string;
  isMagical: boolean;
}

export interface WeaponConfig {
  name: string;
  options?: {
    displayName?: string;
    isMagical?: boolean;
  };
}

export interface MonsterData {
  name: string;
  requiredProperties: MonsterRequiredProperties;
  freeformCode: string;
  baseAttributes?: [number, number, number, number, number, number];
  trainedSkills?: string[];
  knowledge?: {
    easy?: string;
    normal?: string;
    hard?: string;
    legendary?: string;
  };
  traits?: string[];
  customSenses?: string[];
  customMovementSpeeds?: string[];
  immunities?: string[];
  resistances?: string[];
  vulnerabilities?: string[];
  equippedArmor?: string;
  equippedShield?: string;
  properties?: Record<string, string | number | boolean>;
  standardAbilities?: StandardAbilityConfig[];
  customAbilities?: CustomAbilityConfig[];
  passiveAbilities?: PassiveAbilityConfig[];
  weapons?: WeaponConfig[];
  rituals?: string[];
}

export interface MonsterGroupKnowledge {
  normal?: string;
  hard?: string;
  legendary?: string;
}

export interface MonsterGroupData {
  name: string;
  knowledge?: MonsterGroupKnowledge;
  description?: string;
  hasArt: boolean;
  sharedFreeformCode: string;
  monsters: MonsterData[];
  traits?: string[];
  customSenses?: string[];
  customMovementSpeeds?: string[];
  immunities?: string[];
  resistances?: string[];
  vulnerabilities?: string[];
  equippedArmor?: string;
  equippedShield?: string;
  properties?: Record<string, string | number | boolean>;
  standardAbilities?: StandardAbilityConfig[];
  customAbilities?: CustomAbilityConfig[];
  passiveAbilities?: PassiveAbilityConfig[];
  weapons?: WeaponConfig[];
  rituals?: string[];
}

export interface DatabaseData {
  monsters: MonsterData[];
  monsterGroups: MonsterGroupData[];
}

export function toCustomMonsterAbility(ability: CustomAbilityConfig): CustomMonsterAbility {
  return {
    name: ability.name,
    isMagical: ability.isMagical,
    usageTime: (ability.usageTime || undefined) as MonsterAttackUsageTime,
    cost: ability.cost || undefined,
    effect: ability.effect || undefined,
    tags:
      ability.tags && ability.tags.length > 0
        ? (ability.tags as RiseAbilityDefinitionTag[])
        : undefined,
    attack: ability.attack
      ? {
          targeting: ability.attack.targeting,
          hit: ability.attack.hit,
          crit: ability.attack.crit || undefined,
          miss: ability.attack.miss || undefined,
          injury: ability.attack.injury || undefined,
          halfOnMiss: ability.attack.halfOnMiss,
        }
      : undefined,
  };
}

function generateSharedPropertiesCode(
  data: MonsterData | MonsterGroupData,
  indent: string,
): string[] {
  const lines: string[] = [];

  if (data.traits && data.traits.length > 0) {
    for (const trait of data.traits) {
      lines.push(`${indent}creature.addTrait(${JSON.stringify(trait)});`);
    }
  }

  if (data.customSenses && data.customSenses.length > 0) {
    for (const sense of data.customSenses) {
      lines.push(`${indent}creature.addCustomSense(${JSON.stringify(sense)});`);
    }
  }

  if (data.customMovementSpeeds && data.customMovementSpeeds.length > 0) {
    for (const speed of data.customMovementSpeeds) {
      lines.push(`${indent}creature.addCustomMovementSpeed(${JSON.stringify(speed)});`);
    }
  }

  if (data.immunities && data.immunities.length > 0) {
    for (const immunity of data.immunities) {
      lines.push(`${indent}creature.addImmunity(${JSON.stringify(immunity)});`);
    }
  }

  if (data.resistances && data.resistances.length > 0) {
    for (const resistance of data.resistances) {
      lines.push(`${indent}creature.addResistant(${JSON.stringify(resistance)});`);
    }
  }

  if (data.vulnerabilities && data.vulnerabilities.length > 0) {
    for (const vulnerability of data.vulnerabilities) {
      lines.push(`${indent}creature.addVulnerability(${JSON.stringify(vulnerability)});`);
    }
  }

  if (data.equippedArmor || data.equippedShield) {
    const armorParts: string[] = [];
    if (data.equippedArmor) {
      armorParts.push(`bodyArmor: ${JSON.stringify(data.equippedArmor)}`);
    }
    if (data.equippedShield) {
      armorParts.push(`shield: ${JSON.stringify(data.equippedShield)}`);
    }
    lines.push(`${indent}creature.setEquippedArmorName({ ${armorParts.join(', ')} });`);
  }

  if (data.properties && Object.keys(data.properties).length > 0) {
    lines.push(`${indent}creature.setProperties(${JSON.stringify(data.properties)});`);
  }

  // 1. Standard Spells & Maneuvers:
  if (data.standardAbilities && data.standardAbilities.length > 0) {
    const SPECIAL_MANEUVERS = [
      'Equip Weapon',
      'Weapon Multiplier',
      'Grappling Strike',
      'Sneak Attack',
      'Latch On',
    ];
    for (const ability of data.standardAbilities) {
      const cleanOptions = ability.options
        ? {
            displayName: ability.options.displayName || undefined,
            usageTime: ability.options.usageTime || undefined,
            isMagical: ability.options.isMagical,
            weapon: ability.options.weapon || undefined,
            tags:
              ability.options.tags && ability.options.tags.length > 0
                ? ability.options.tags
                : undefined,
          }
        : undefined;

      const hasOptions = cleanOptions && Object.values(cleanOptions).some((v) => v !== undefined);
      const optionsStr = hasOptions ? `, ${JSON.stringify(cleanOptions)}` : '';

      if (ability.type === 'spell') {
        lines.push(`${indent}creature.addSpell(${JSON.stringify(ability.name)}${optionsStr});`);
      } else if (SPECIAL_MANEUVERS.includes(ability.name)) {
        const weapon = ability.options?.weapon;
        if (weapon) {
          const cleanSpecialOptions = ability.options
            ? {
                displayName: ability.options.displayName || undefined,
                usageTime: ability.options.usageTime || undefined,
                isMagical: ability.options.isMagical,
                tags:
                  ability.options.tags && ability.options.tags.length > 0
                    ? ability.options.tags
                    : undefined,
              }
            : undefined;
          const hasSpecialOptions =
            cleanSpecialOptions && Object.values(cleanSpecialOptions).some((v) => v !== undefined);
          const optStr = hasSpecialOptions ? `, ${JSON.stringify(cleanSpecialOptions)}` : '';

          if (ability.name === 'Equip Weapon') {
            lines.push(`${indent}creature.addWeapon(${JSON.stringify(weapon)});`);
          } else if (ability.name === 'Weapon Multiplier') {
            lines.push(`${indent}creature.addWeaponMult(${JSON.stringify(weapon)}${optStr});`);
          } else if (ability.name === 'Grappling Strike') {
            lines.push(`${indent}creature.addGrapplingStrike(${JSON.stringify(weapon)}${optStr});`);
          } else if (ability.name === 'Sneak Attack') {
            lines.push(`${indent}creature.addSneakAttack(${JSON.stringify(weapon)}${optStr});`);
          } else if (ability.name === 'Latch On') {
            lines.push(`${indent}creature.addLatchOn(${JSON.stringify(weapon)}${optStr});`);
          }
        }
      } else {
        lines.push(`${indent}creature.addManeuver(${JSON.stringify(ability.name)}${optionsStr});`);
      }
    }
  }

  // 2. Custom Active Abilities:
  if (data.customAbilities && data.customAbilities.length > 0) {
    for (const ability of data.customAbilities) {
      const abilityObj = toCustomMonsterAbility(ability);
      const abilityStr = JSON.stringify(abilityObj, null, 2)
        .split('\n')
        .map((line, idx) => (idx === 0 ? line : indent + '  ' + line))
        .join('\n');

      if (ability.type === 'spell') {
        lines.push(`${indent}creature.addCustomSpell(${abilityStr});`);
      } else {
        lines.push(`${indent}creature.addCustomManeuver(${abilityStr});`);
      }
    }
  }

  // 3. Passive Abilities:
  if (data.passiveAbilities && data.passiveAbilities.length > 0) {
    for (const ability of data.passiveAbilities) {
      const passiveStr = JSON.stringify(ability, null, 2)
        .split('\n')
        .map((line, idx) => (idx === 0 ? line : indent + '  ' + line))
        .join('\n');
      lines.push(`${indent}creature.addPassiveAbility(${passiveStr});`);
    }
  }

  // 4. Weapons:
  if (data.weapons && data.weapons.length > 0) {
    for (const weapon of data.weapons) {
      lines.push(`${indent}creature.addWeapon(${JSON.stringify(weapon.name)});`);
    }
  }

  // 5. Rituals:
  if (data.rituals && data.rituals.length > 0) {
    lines.push(`${indent}creature.addRituals(${JSON.stringify(data.rituals)});`);
  }

  return lines;
}

/**
 * Generates the TypeScript initialization body for a single monster.
 */
function generateMonsterBody(monster: MonsterData, indent: string): string {
  const lines: string[] = [];

  const reqPropsStr = JSON.stringify(monster.requiredProperties, null, 2)
    .split('\n')
    .map((line, idx) => (idx === 0 ? line : indent + '  ' + line))
    .join('\n');
  lines.push(`${indent}creature.setRequiredProperties(${reqPropsStr});`);

  if (monster.baseAttributes && monster.baseAttributes.length === 6) {
    lines.push(`${indent}creature.setBaseAttributes(${JSON.stringify(monster.baseAttributes)});`);
  }

  if (monster.trainedSkills && monster.trainedSkills.length > 0) {
    lines.push(`${indent}creature.setTrainedSkills(${JSON.stringify(monster.trainedSkills)});`);
  }

  if (monster.knowledge) {
    const cleanKnowledge = {
      easy: monster.knowledge.easy || undefined,
      normal: monster.knowledge.normal || undefined,
      hard: monster.knowledge.hard || undefined,
      legendary: monster.knowledge.legendary || undefined,
    };
    const hasKnowledge = Object.values(cleanKnowledge).some((v) => v !== undefined);
    if (hasKnowledge) {
      const knStr = JSON.stringify(cleanKnowledge, null, 2)
        .split('\n')
        .map((line, idx) => (idx === 0 ? line : indent + '  ' + line))
        .join('\n');
      lines.push(`${indent}creature.setKnowledgeResults(${knStr});`);
    }
  }

  // Add structured properties
  lines.push(...generateSharedPropertiesCode(monster, indent));

  lines.push(`${indent}// --- Begin freeform code ---`);
  if (monster.freeformCode) {
    const freeformLines = monster.freeformCode.split('\n');
    for (const line of freeformLines) {
      lines.push(line ? `${indent}${line}` : '');
    }
  }
  lines.push(`${indent}// --- End freeform code ---`);

  return lines.join('\n');
}

/**
 * Generates the TypeScript initialization body for the shared initializer of a monster group.
 */
function generateGroupSharedInitializer(group: MonsterGroupData, indent: string): string {
  const lines: string[] = [];

  // Add structured group properties
  lines.push(...generateSharedPropertiesCode(group, indent));

  lines.push(`${indent}// --- Begin shared freeform code ---`);
  if (group.sharedFreeformCode) {
    const freeformLines = group.sharedFreeformCode.split('\n');
    for (const line of freeformLines) {
      lines.push(line ? `${indent}${line}` : '');
    }
  }
  lines.push(`${indent}// --- End shared freeform code ---`);

  return lines.join('\n');
}

function generateTypeScriptCode(db: DatabaseData): string {
  const parts: string[] = [];

  // Imports header
  parts.push(`// AUTO-GENERATED by monster_ui. Do not edit manually.
// Source: Rise/typescript/monster_ui/monsters_from_ui.json

import { Grimoire } from '@src/monsters/grimoire';
import { Creature, CustomMonsterAbility } from '@src/character_sheet/creature';
import { getWeaponMultByRank } from '@src/abilities/combat_styles';
import { BARRIER_COOLDOWN, BRIEF_COOLDOWN, CONDITION_CRIT } from '@src/abilities/constants';

export function addMonstersFromUi(grimoire: Grimoire) {`);

  // Individual Monsters
  if (db.monsters && db.monsters.length > 0) {
    parts.push(`  // --- Individual Monsters ---`);
    for (const monster of db.monsters) {
      const bodyCode = generateMonsterBody(monster, '    ');
      parts.push(`  grimoire.addMonster('${monster.name}', (creature: Creature) => {
${bodyCode}
  });`);
    }
  }

  // Monster Groups
  if (db.monsterGroups && db.monsterGroups.length > 0) {
    parts.push(`  // --- Monster Groups ---`);
    for (const group of db.monsterGroups) {
      const groupConfigParts: string[] = [];
      groupConfigParts.push(`name: '${group.name}'`);
      if (group.knowledge) {
        groupConfigParts.push(
          `knowledge: ${JSON.stringify(group.knowledge, null, 8).replace(/\n/g, '\n      ')}`,
        );
      }
      if (group.description) {
        groupConfigParts.push(`description: ${JSON.stringify(group.description)}`);
      }
      groupConfigParts.push(`hasArt: ${Boolean(group.hasArt)}`);
      groupConfigParts.push(`sharedInitializer: (creature: Creature) => {
${generateGroupSharedInitializer(group, '        ')}
      }`);

      const configStr = `{\n      ${groupConfigParts.join(',\n      ')}\n    }`;

      const monstersListStr = group.monsters
        .map((monster) => {
          const bodyCode = generateMonsterBody(monster, '          ');
          return `[
        '${monster.name}',
        (creature: Creature) => {
${bodyCode}
        },
      ]`;
        })
        .join(',\n      ');

      parts.push(`  grimoire.addMonsterGroup(
    ${configStr},
    [
      ${monstersListStr}
    ]
  );`);
    }
  }

  parts.push(`}`);
  return parts.join('\n\n');
}

export function saveTypeScriptFile(db: DatabaseData) {
  const tsCode = generateTypeScriptCode(db);
  const targetPath = paths.generatedTsPath;

  // Ensure the parent directory exists
  const parentDir = path.dirname(targetPath);
  if (!fs.existsSync(parentDir)) {
    fs.mkdirSync(parentDir, { recursive: true });
  }

  fs.writeFileSync(targetPath, tsCode, 'utf8');
}
