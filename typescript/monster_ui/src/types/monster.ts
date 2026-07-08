export interface MonsterRequiredProperties {
  alignment: string;
  base_class: string;
  elite: boolean;
  creature_origin: string;
  creature_type: string;
  size: string;
  level: number;
}

export interface MonsterData {
  name: string;
  requiredProperties: MonsterRequiredProperties;
  freeformCode: string;
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
}

export interface DatabaseData {
  monsters: MonsterData[];
  monsterGroups: MonsterGroupData[];
}

export interface ComputedStats {
  name: string;
  level: number;
  base_class: string;
  elite: boolean;
  size: string;
  creature_origin: string;
  creature_type: string;
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
  activeAbilities: any[];
  passiveAbilities: any[];
  knowledge: any;
}

export interface ValidationResult {
  success: boolean;
  errors: string[];
  warnings: string[];
  computedStats: ComputedStats | null;
}
