export interface MonsterRequiredProperties {
  alignment: string;
  base_class: string;
  elite: boolean;
  creature_origin: string;
  creature_types: string[];
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

export interface SharedEditableProperties {
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

export interface MonsterData extends SharedEditableProperties {
  name: string;
  folder?: string;
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
}

export interface MonsterGroupKnowledge {
  easy?: string;
  normal?: string;
  hard?: string;
  legendary?: string;
}

export interface MonsterGroupData extends SharedEditableProperties {
  name: string;
  folder?: string;
  knowledge?: MonsterGroupKnowledge;
  description?: string;
  hasArt: boolean;
  sharedFreeformCode: string;
  monsters: MonsterData[];
}

export interface DatabaseData {
  monsters: MonsterData[];
  monsterGroups: MonsterGroupData[];
  folders?: string[];
}

export interface ComputedStats {
  name: string;
  level: number;
  base_class: string;
  elite: boolean;
  size: string;
  creature_origin: string;
  creature_types: string[];
  alignment: string;
  hit_points: number;
  injury_point: number;
  armor_defense: number;
  brawn: number;
  fortitude: number;
  reflex: number;
  mental: number;
  speed: number;
  attributes: number[];
  skills: string[];
  traits: string[];
  equipment: string[];
  activeAbilities: CustomAbilityConfig[];
  passiveAbilities: PassiveAbilityConfig[];
  knowledge: ComputedKnowledge;
  // Calculated stats from character sheet
  accuracy: number;
  brawling_accuracy: number;
  mundane_power: number;
  magical_power: number;
  movementComponents: string[];
  sensesComponents: string[];
  socialComponents: string[];
  otherSkillsComponents: string[];
  immune: string;
  resistant: string;
  vulnerable: string;
}

export interface ComputedKnowledge {
  easy?: string;
  normal?: string;
  hard?: string;
  legendary?: string;
  relevantKnowledges?: string[];
}

export interface ValidationResult {
  success: boolean;
  errors: string[];
  warnings: string[];
  computedStats: ComputedStats | null;
}
