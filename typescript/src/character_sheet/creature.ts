import { CharacterSheet } from '@src/character_sheet/character_sheet';
import { MonsterAttackAccuracy, MonsterAttackAreaShape, MonsterAttackTargeting, MonsterAttackDebuff } from '@src/character_sheet/sheet_worker';

export type CreaturePropertyMap = {
  base_class: RiseBaseClass;
  size: RiseSize;
}
  & Record<NumericCreatureProperty, number>
  & Record<StringCreatureProperty, string>
  & Record<BooleanCreatureProperty, boolean>;
type CreatureProperty = "base_class" | "size" | BooleanCreatureProperty | NumericCreatureProperty | StringCreatureProperty;

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

type BooleanCreatureProperty = RiseDebuff;
// TODO: list all debuffs if we ever actually care
export type RiseDebuff = "climbing";

type NumericCreatureProperty = "accuracy" | "brawling_accuracy" | "level" | "challenge_rating" | "hit_points" | "damage_resistance" | RiseAttribute | RiseAttributeModifier | RiseSkill;
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
  | "craft"
  | "deduction"
  | "devices"
  | "disguise"
  | "knowledge"
  | "medicine"
  | "awareness"
  | "creature_handling"
  | "deception"
  | "persuasion"
  | "social_insight"
  | "survival"
  | "intimidate"
  | "profession";

type StringCreatureProperty = "name";

// TODO: list them all individually?
export type RiseAbilityTag = string;
export type RiseDefense = "Armor" | "Fortitude" | "Reflex" | "Mental";
export type RiseAbilityUsageTime = 'standard' | 'elite' | 'minor';

export interface AutoAttackConfig {
  accuracy?: MonsterAttackAccuracy;
  areaShape?: MonsterAttackAreaShape;
  defense: RiseDefense[];
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

  // TODO: Is there a way to make the return type only match the keys provided in
  // propertyNames?
  getPropertyValues(propertyNames: CreatureProperty[]): CreaturePropertyMap {
    // We can't make these types match neatly. That's the point of this wrapper.
    return this.sheet.getPropertyValues(propertyNames) as any;
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

    const sectionName = config.effect === "damage" ? "repeating_otherdamagingattacks" : "repeating_nondamagingattacks";
    const prefix = `${sectionName}_${this.sheet.getLatestRowId()}`;
    this.sheet.setProperties({
      [`${prefix}_defense`]: config.defense.join(" and "),
      [`${prefix}_tags`]: config.tags?.join(", "),
      [`${prefix}_usage_time`]: config.tags?.join(", "),
    });
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

  setTrainedSkills(skillNames: RiseSkill[]) {
    const props: Record<string, string> = {};
    for (const skillName of skillNames) {
      const rowId = this.sheet.generateRowId();
      props[`repeating_trainedskills_${rowId}_trained_skill`] = skillName;
    }
    this.sheet.setProperties(props);
  }

  // Getters

  public get level() {
    return this.getPropertyValues(["level"]).level;
  }

  public get base_class() {
    return this.getPropertyValues(["base_class"]).base_class;
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

  public get craft() {
    return this.getPropertyValues(["craft"]).craft;
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

  public get knowledge() {
    return this.getPropertyValues(["knowledge"]).knowledge;
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

  public get name() {
    return this.getPropertyValues(["name"]).name;
  }

  public get climbing() {
    return this.getPropertyValues(["climbing"]).climbing;
  }
}
