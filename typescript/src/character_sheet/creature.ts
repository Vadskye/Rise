import { CharacterSheet } from '@src/character_sheet/character_sheet';
import { getCurrentCharacterSheet, setCurrentCharacterSheet, resetDefaultCharacterSheet } from '@src/character_sheet/current_character_sheet';
import { MonsterAttackAccuracy, MonsterAttackAreaShape, MonsterAttackTargeting, MonsterAttackDebuff } from '@src/character_sheet/sheet_worker';
import { handleEverything } from '@src/character_sheet/sheet_worker';

// These have unique typedefs beyond the standard string/number/bool
type CustomCreatureProperty = "base_class" | "creature_type" | "role" | "size";

export type CreaturePropertyMap = {
  base_class: RiseBaseClass;
  creature_type: RiseCreatureType;
  role: RiseRole;
  size: RiseSize;
}
  & Record<NumericCreatureProperty, number>
  & Record<StringCreatureProperty, string>
  & Record<BooleanCreatureProperty, boolean>;

type CreatureProperty = CustomCreatureProperty | BooleanCreatureProperty | NumericCreatureProperty | StringCreatureProperty;

export type RiseCreatureType = "animate" | "beast" | "dragon" | "humanoid" | "planeforged" | "undead";
export type RiseRole = "Brute" | "Skirmisher" | "Warrior" | "Sniper" | "Mystic" | "Leader";
export type RiseBaseClass = "barbarian"
  | "cleric"
  | "druid"
  | "fighter"
  | "monk"
  | "paladin"
  | "ranger"
  | "rogue"
  | "sorcerer"
  | "votive"
  | "wizard"
  | "hybrid"
  | "automaton"
  | "awakened"
  | "changeling"
  | "dragon"
  | "drow"
  | "dryad"
  | "eladrin"
  | "harpy"
  | "kit"
  | "naiad"
  | "oozeborn"
  | "orc"
  | "tiefling"
  | "treant"
  | "troll"
  | "vampire"
  | "brute"
  | "leader"
  | "mystic"
  | "skirmisher"
  | "sniper"
  | "warrior";
// First letter is capitalized; this is a value, not a key
export type RiseSize = "Fine" | "Diminuitive" | "Tiny" | "Small" | "Medium" | "Large" | "Huge" | "Gargantuan" | "Colossal";

type BooleanCreatureProperty = "has_art" | RiseDebuff;
// TODO: list all debuffs if we ever actually care
export type RiseDebuff = "climbing";

type NumericCreatureProperty = "accuracy" | "brawling_accuracy" | "level" | "challenge_rating" | "hit_points" | "damage_resistance" | RiseAttribute | RiseAttributeModifier | RiseDefense | RiseSkill;
export type RiseAttribute = "strength" | "dexterity" | "constitution" | "intelligence" | "perception" | "willpower";
export type RiseAttributeModifier = "strength_at_creation"
  | "strength_level_scaling"
  | "dexterity_at_creation"
  | "dexterity_level_scaling"
  | "constitution_at_creation"
  | "constitution_level_scaling"
  | "intelligence_at_creation"
  | "intelligence_level_scaling"
  | "perception_at_creation"
  | "perception_level_scaling"
  | "willpower_at_creation"
  | "willpower_level_scaling";
// TODO: make these consistent; it's weird that only armor has the '_defense' suffix
export type RiseDefense = "armor_defense" | "fortitude" | "reflex" | "mental";

// TODO: add perform subskills; they aren't supported properly on the sheet either
export type RiseSkill = "climb"
  | "jump"
  | "swim"
  | "balance"
  | "flexibility"
  | "perform"
  | "ride"
  | "sleight_of_hand"
  | "stealth"
  | "endurance"
  | RiseCraftSkill
  | "deduction"
  | "devices"
  | "disguise"
  | RiseKnowledgeSkill
  | "medicine"
  | "awareness"
  | "creature_handling"
  | "deception"
  | "persuasion"
  | "social_insight"
  | "survival"
  | "intimidate"
  | "profession";

export type RiseCraftSkill = "craft_alchemy"
  | "craft_bone"
  | "craft_ceramics"
  | "craft_leather"
  | "craft_manuscripts"
  | "craft_metal"
  | "craft_poison"
  | "craft_stone"
  | "craft_textiles"
  | "craft_traps"
  | "craft_wood"
  | "craft_untrained"
export const RISE_CRAFT_SKILLS: Set<RiseCraftSkill> = new Set([
  "craft_alchemy",
  "craft_bone",
  "craft_ceramics",
  "craft_leather",
  "craft_manuscripts",
  "craft_metal",
  "craft_poison",
  "craft_stone",
  "craft_textiles",
  "craft_traps",
  "craft_wood",
  "craft_untrained",
])

export type RiseKnowledgeSkill = "knowledge_arcana"
  | "knowledge_dungeoneering"
  | "knowledge_engineering"
  | "knowledge_items"
  | "knowledge_local"
  | "knowledge_nature"
  | "knowledge_planes"
  | "knowledge_religion"
  | "knowledge_untrained";
export const RISE_KNOWLEDGE_SKILLS: Set<RiseKnowledgeSkill> = new Set([
  "knowledge_arcana",
  "knowledge_dungeoneering",
  "knowledge_engineering",
  "knowledge_items",
  "knowledge_local",
  "knowledge_nature",
  "knowledge_planes",
  "knowledge_religion",
  "knowledge_untrained"
]);

type StringCreatureProperty = "description" | "name" | RiseKnowledgeResult | RiseSpecialDefense;

export type RiseSpecialDefense = "immune" | "impervious" | "vulnerable";

export type RiseKnowledgeResult = "knowledge_result_easy" | "knowledge_result_normal" | "knowledge_result_hard" | "knowledge_result_legendary";
export interface RiseKnowledgeResultsConfig {
  easy?: string;
  normal?: string;
  hard?: string;
  legendary?: string;
}

// TODO: list them all individually?
export type RiseAbilityTag = string;
// These are the defenses as displayed in attacks, not the defense statistics on
// characters
export type RiseDefenseHumanReadable = "Armor" | "Fortitude" | "Reflex" | "Mental";
export type RiseAbilityUsageTime = 'standard' | 'elite' | 'minor';

export interface AutoAttackConfig {
  accuracy?: MonsterAttackAccuracy;
  areaShape?: MonsterAttackAreaShape;
  defense: RiseDefenseHumanReadable[];
  effect: "damage" | MonsterAttackDebuff;
  isMagical: boolean;
  name: string;
  tags?: RiseAbilityTag[];
  targeting: MonsterAttackTargeting;
  usageTime?: RiseAbilityUsageTime;
}

export interface CustomAttackConfig {
  effect: string;
  isMagical: boolean;
  name: string;
  usageTime?: RiseAbilityUsageTime;
  tags?: RiseAbilityTag[];
}

// TODO: add more standard modifiers, add infra for their effects
export type StandardModifierName = "mindless";

export interface CustomModifierConfig {
  immune?: string;
  impervious?: string;
  name: string;
  numericEffects?: CustomModifierNumericEffect[];
  vulnerable?: string;
}

export interface CustomModifierNumericEffect {
  modifier: number;
  statistic: NumericCreatureProperty;
}

export interface CreatureAttack {
  effect: string;
  name: string;
  tags: RiseAbilityTag[];
  usageTime: RiseAbilityUsageTime;
}

// A creature wraps a CharacterSheet, exposing only more user-friendly functions.
// This means that "normal" typescript code shouldn't have to grapple with the complexity
// of, say, repeating abilities in Roll20.
export class Creature implements CreaturePropertyMap {
  private sheet: CharacterSheet;

  constructor(sheet: CharacterSheet) {
    this.sheet = sheet;
  }

  static new() {
    const sheet = resetDefaultCharacterSheet();
    handleEverything();
    return new this(sheet)
  }

  // If a sheet with this name already exists, it will use the existing sheet with that
  // name.
  static fromName(name: string): Creature {
    setCurrentCharacterSheet(name);
    const sheet = getCurrentCharacterSheet();
    handleEverything();
    return new this(sheet);
  }

  // This is the Knowledge skill used to learn more about the creature, not the creature's
  // own knowledge skills.
  // TODO: redesign creature types and tags; plants should use knowledge (nature), etc.
  getRelevantKnowledge(): RiseKnowledgeSkill {
    if (!this.creature_type) {
      throw new Error(`Unable to get relevant knowledge for creature ${this.name} with no creature type.`);
    }
    return {
      animate: "knowledge_arcana" as const,
      beast: "knowledge_nature" as const,
      dragon: "knowledge_arcana" as const,
      humanoid: "knowledge_local" as const,
      planeforged: "knowledge_planes" as const,
      undead: "knowledge_religion" as const,
    }[this.creature_type];
  }

  getTrainedSkillNames(): RiseSkill[] {
    return this.sheet.getRepeatingSectionValues("trainedskills", "trained_skill") as RiseSkill[];
  }

  getTrainedCraftSkillNames(): RiseCraftSkill[] {
    // We have to use these `as` casts because Typescript can't figure out that this is
    // safe. Unless I just can't figure out why this is unsafe.
    return this.getTrainedSkillNames().filter((skillName) => RISE_CRAFT_SKILLS.has(skillName as any)) as RiseCraftSkill[];
  }

  getTrainedKnowledgeSkillNames(): RiseKnowledgeSkill[] {
    // We have to use these `as` casts because Typescript can't figure out that this is
    // safe. Unless I just can't figure out why this is unsafe.
    return this.getTrainedSkillNames().filter((skillName) => RISE_KNOWLEDGE_SKILLS.has(skillName as any)) as RiseKnowledgeSkill[];
  }

  // TODO: Is there a way to make the return type only match the keys provided in
  // propertyNames?
  getPropertyValues(propertyNames: CreatureProperty[]): CreaturePropertyMap {
    // We can't make these types match neatly. That's the point of this wrapper.
    return this.sheet.getPropertyValues(propertyNames) as any;
  }

  getSheetForTesting(): CharacterSheet {
    return this.sheet;
  }

  addCustomAttack(config: CustomAttackConfig) {
    const rowId = this.sheet.generateRowId();
    // This isn't a repeating section that exists in the real Roll20 sheet. There's no
    // advantage in using any of the "real" sections since we don't take advantage of any
    // sheet worker magic anyway.
    const prefix = `repeating_monsterattacks_${rowId}`;
    this.sheet.setProperties({
      [`${prefix}_attack_name`]: config.name,
      [`${prefix}_attack_effect`]: config.effect,
      [`${prefix}_usage_time`]: config.usageTime,
      [`${prefix}_tags`]: config.tags?.join(","),
    });
  }

  addAutoAttack(config: AutoAttackConfig) {
    this.sheet.setProperties({
      monster_attack_accuracy: config.accuracy || "normal",
      monster_attack_area_shape: config.areaShape || "default",
      monster_attack_effect: config.effect,
      monster_attack_is_magical: config.isMagical,
      monster_attack_name: config.name,
      monster_attack_targeting: config.targeting,
    });

    // TODO: figure out how to trigger the add button

    const sectionName = config.effect === "damage" ? "repeating_otherdamagingattacks" : "repeating_nondamagingattacks";
    const prefix = `${sectionName}_${this.sheet.getLatestRowId()}`;
    this.sheet.setProperties({
      [`${prefix}_defense`]: config.defense.join(" and "),
      [`${prefix}_tags`]: config.tags?.join(", "),
      [`${prefix}_usage_time`]: config.tags?.join(", "),
    });
  }

  addCustomModifier(config: CustomModifierConfig) {
    if (config.numericEffects && config.numericEffects.length > 3) {
      throw new Error("We only support a maximum of three numeric effects per custom modifier.");
    }

    const prefix = `repeating_permanentmodifiers_${this.sheet.generateRowId()}`;
    const attrs: Record<string, string | number | undefined> = {
      [`${prefix}_immune`]: config.immune,
      [`${prefix}_impervious`]: config.impervious,
      [`${prefix}_vulnerable`]: config.vulnerable,
      [`${prefix}_name`]: config.name,
    };
    if (config.numericEffects) {
      for (let i = 0; i < config.numericEffects.length; i++) {
        attrs[`${prefix}_statistic${i}`] = config.numericEffects[i].statistic;
        attrs[`${prefix}_value${i}`] = config.numericEffects[i].modifier;
      }
    }
    this.sheet.setProperties(attrs);
  }

  addStandardModifier(modifierName: StandardModifierName) {
    // TODO: add fancy logic for some modifiers to have special effects
    this.addCustomModifier({name: modifierName});
  }

  // Useful for checking if a creature has some common and important modifiers that change
  // the way LaTeX is generated, like being mindless.
  hasModifier(modifierName: StandardModifierName): boolean {
    return this.sheet.getRepeatingSectionValues("permanentmodifiers", "name").includes(modifierName);
  }

  getAttacks(callback: (attacks: CreatureAttack[]) => void): void {
    // TODO: use this.sheet.getRepeatingSectionNames...
  }

  setProperties(properties: Partial<CreaturePropertyMap>) {
    this.sheet.setProperties(properties);
  }

  setBaseAttributes(attributes: number[]) {
    if (attributes.length !== 6) {
      throw new Error(`Invalid attributes array: ${attributes}`);
    }
    this.setProperties({
      strength_at_creation: attributes[0],
      dexterity_at_creation: attributes[1],
      constitution_at_creation: attributes[2],
      intelligence_at_creation: attributes[3],
      perception_at_creation: attributes[4],
      willpower_at_creation: attributes[5],
    });
  }

  // These are the results of a Knowledge check about the creature, not the creature's own
  // trained knowledges.
  setKnowledgeResults(knowledgeResults: RiseKnowledgeResultsConfig) {
    this.setProperties({
      knowledge_result_easy: knowledgeResults.easy,
      knowledge_result_normal: knowledgeResults.normal,
      knowledge_result_hard: knowledgeResults.hard,
      knowledge_result_legendary: knowledgeResults.legendary,
    });
  }

  setTrainedSkills(skillNames: RiseSkill[]) {
    const props: Record<string, string> = {};
    for (const skillName of skillNames) {
      const rowId = this.sheet.generateRowId();
      props[`repeating_trainedskills_${rowId}_trained_skill`] = skillName;
    }
    this.sheet.setProperties(props);
  }

  // Getters

  public get base_class() {
    return this.getPropertyValues(["base_class"]).base_class;
  }

  public get creature_type() {
    return this.getPropertyValues(["creature_type"]).creature_type;
  }

  public get level() {
    return this.getPropertyValues(["level"]).level;
  }

  public get role() {
    return this.getPropertyValues(["role"]).role;
  }

  public get size() {
    return this.getPropertyValues(["size"]).size;
  }

  public get accuracy() {
    return this.getPropertyValues(["accuracy"]).accuracy;
  }

  public get brawling_accuracy() {
    return this.getPropertyValues(["brawling_accuracy"]).brawling_accuracy;
  }

  public get hit_points() {
    return this.getPropertyValues(["hit_points"]).hit_points;
  }

  public get damage_resistance() {
    return this.getPropertyValues(["damage_resistance"]).damage_resistance;
  }

  public get challenge_rating() {
    return this.getPropertyValues(["challenge_rating"]).challenge_rating;
  }

  public get strength() {
    return this.getPropertyValues(["strength"]).strength;
  }

  public get dexterity() {
    return this.getPropertyValues(["dexterity"]).dexterity;
  }

  public get constitution() {
    return this.getPropertyValues(["constitution"]).constitution;
  }

  public get intelligence() {
    return this.getPropertyValues(["intelligence"]).intelligence;
  }

  public get perception() {
    return this.getPropertyValues(["perception"]).perception;
  }

  public get willpower() {
    return this.getPropertyValues(["willpower"]).willpower;
  }

  public get strength_at_creation() {
    return this.getPropertyValues(["strength_at_creation"]).strength_at_creation;
  }

  public get strength_level_scaling() {
    return this.getPropertyValues(["strength_level_scaling"]).strength_level_scaling;
  }

  public get dexterity_at_creation() {
    return this.getPropertyValues(["dexterity_at_creation"]).dexterity_at_creation;
  }

  public get dexterity_level_scaling() {
    return this.getPropertyValues(["dexterity_level_scaling"]).dexterity_level_scaling;
  }

  public get constitution_at_creation() {
    return this.getPropertyValues(["constitution_at_creation"]).constitution_at_creation;
  }

  public get constitution_level_scaling() {
    return this.getPropertyValues(["constitution_level_scaling"]).constitution_level_scaling;
  }

  public get intelligence_at_creation() {
    return this.getPropertyValues(["intelligence_at_creation"]).intelligence_at_creation;
  }

  public get intelligence_level_scaling() {
    return this.getPropertyValues(["intelligence_level_scaling"]).intelligence_level_scaling;
  }

  public get perception_at_creation() {
    return this.getPropertyValues(["perception_at_creation"]).perception_at_creation;
  }

  public get perception_level_scaling() {
    return this.getPropertyValues(["perception_level_scaling"]).perception_level_scaling;
  }

  public get willpower_at_creation() {
    return this.getPropertyValues(["willpower_at_creation"]).willpower_at_creation;
  }

  public get willpower_level_scaling() {
    return this.getPropertyValues(["willpower_level_scaling"]).willpower_level_scaling;
  }

  public get armor_defense() {
    return this.getPropertyValues(["armor_defense"]).armor_defense;
  }

  public get fortitude() {
    return this.getPropertyValues(["fortitude"]).fortitude;
  }

  public get reflex() {
    return this.getPropertyValues(["reflex"]).reflex;
  }

  public get mental() {
    return this.getPropertyValues(["mental"]).mental;
  }

  public get climb() {
    return this.getPropertyValues(["climb"]).climb;
  }

  public get jump() {
    return this.getPropertyValues(["jump"]).jump;
  }

  public get swim() {
    return this.getPropertyValues(["swim"]).swim;
  }

  public get balance() {
    return this.getPropertyValues(["balance"]).balance;
  }

  public get flexibility() {
    return this.getPropertyValues(["flexibility"]).flexibility;
  }

  public get perform() {
    return this.getPropertyValues(["perform"]).perform;
  }

  public get ride() {
    return this.getPropertyValues(["ride"]).ride;
  }

  public get sleight_of_hand() {
    return this.getPropertyValues(["sleight_of_hand"]).sleight_of_hand;
  }

  public get stealth() {
    return this.getPropertyValues(["stealth"]).stealth;
  }

  public get endurance() {
    return this.getPropertyValues(["endurance"]).endurance;
  }

  public get craft_alchemy() {
    return this.getPropertyValues(["craft_alchemy"]).craft_alchemy;
  }

  public get craft_bone() {
    return this.getPropertyValues(["craft_bone"]).craft_bone;
  }

  public get craft_ceramics() {
    return this.getPropertyValues(["craft_ceramics"]).craft_ceramics;
  }

  public get craft_leather() {
    return this.getPropertyValues(["craft_leather"]).craft_leather;
  }

  public get craft_manuscripts() {
    return this.getPropertyValues(["craft_manuscripts"]).craft_manuscripts;
  }

  public get craft_metal() {
    return this.getPropertyValues(["craft_metal"]).craft_metal;
  }

  public get craft_poison() {
    return this.getPropertyValues(["craft_poison"]).craft_poison;
  }

  public get craft_stone() {
    return this.getPropertyValues(["craft_stone"]).craft_stone;
  }

  public get craft_textiles() {
    return this.getPropertyValues(["craft_textiles"]).craft_textiles;
  }

  public get craft_traps() {
    return this.getPropertyValues(["craft_traps"]).craft_traps;
  }

  public get craft_wood() {
    return this.getPropertyValues(["craft_wood"]).craft_wood;
  }

  public get craft_untrained() {
    return this.getPropertyValues(["craft_untrained"]).craft_untrained;
  }

  public get deduction() {
    return this.getPropertyValues(["deduction"]).deduction;
  }

  public get devices() {
    return this.getPropertyValues(["devices"]).devices;
  }

  public get disguise() {
    return this.getPropertyValues(["disguise"]).disguise;
  }

  public get knowledge_arcana() {
    return this.getPropertyValues(["knowledge_arcana"]).knowledge_arcana;
  }

  public get knowledge_dungeoneering() {
    return this.getPropertyValues(["knowledge_dungeoneering"]).knowledge_dungeoneering;
  }

  public get knowledge_engineering() {
    return this.getPropertyValues(["knowledge_engineering"]).knowledge_engineering;
  }

  public get knowledge_items() {
    return this.getPropertyValues(["knowledge_items"]).knowledge_items;
  }

  public get knowledge_local() {
    return this.getPropertyValues(["knowledge_local"]).knowledge_local;
  }

  public get knowledge_nature() {
    return this.getPropertyValues(["knowledge_nature"]).knowledge_nature;
  }

  public get knowledge_planes() {
    return this.getPropertyValues(["knowledge_planes"]).knowledge_planes;
  }

  public get knowledge_religion() {
    return this.getPropertyValues(["knowledge_religion"]).knowledge_religion;
  }

  public get knowledge_untrained() {
    return this.getPropertyValues(["knowledge_untrained"]).knowledge_untrained;
  }

  public get medicine() {
    return this.getPropertyValues(["medicine"]).medicine;
  }

  public get awareness() {
    return this.getPropertyValues(["awareness"]).awareness;
  }

  public get creature_handling() {
    return this.getPropertyValues(["creature_handling"]).creature_handling;
  }

  public get deception() {
    return this.getPropertyValues(["deception"]).deception;
  }

  public get persuasion() {
    return this.getPropertyValues(["persuasion"]).persuasion;
  }

  public get social_insight() {
    return this.getPropertyValues(["social_insight"]).social_insight;
  }

  public get survival() {
    return this.getPropertyValues(["survival"]).survival;
  }

  public get intimidate() {
    return this.getPropertyValues(["intimidate"]).intimidate;
  }

  public get profession() {
    return this.getPropertyValues(["profession"]).profession;
  }

  public get description() {
    return this.getPropertyValues(["description"]).description;
  }

  public get immune() {
    return this.getPropertyValues(["immune"]).immune;
  }

  public get impervious() {
    return this.getPropertyValues(["impervious"]).impervious;
  }

  public get vulnerable() {
    return this.getPropertyValues(["vulnerable"]).vulnerable;
  }

  public get knowledge_result_easy() {
    return this.getPropertyValues(["knowledge_result_easy"]).knowledge_result_easy;
  }

  public get knowledge_result_normal() {
    return this.getPropertyValues(["knowledge_result_normal"]).knowledge_result_normal;
  }

  public get knowledge_result_hard() {
    return this.getPropertyValues(["knowledge_result_hard"]).knowledge_result_hard;
  }

  public get knowledge_result_legendary() {
    return this.getPropertyValues(["knowledge_result_legendary"]).knowledge_result_legendary;
  }

  public get name() {
    return this.getPropertyValues(["name"]).name;
  }

  public get has_art() {
    return this.getPropertyValues(["has_art"]).has_art;
  }

  public get climbing() {
    return this.getPropertyValues(["climbing"]).climbing;
  }
}
