import { CharacterSheet } from '@src/character_sheet/character_sheet';
import { getCurrentCharacterSheet, setCurrentCharacterSheet, resetDefaultCharacterSheet } from '@src/character_sheet/current_character_sheet';
import {
  handleEverything, MonsterAttackAccuracy, MonsterAttackAreaShape, MonsterAttackTargeting, MonsterAttackDebuff, MonsterAttackUsageTime
} from '@src/character_sheet/sheet_worker';
import {
  RiseAlignment,
  RiseAttribute,
  RiseAttributeModifier,
  RiseBaseClass,
  RiseCraftSkill,
  RISE_CRAFT_SKILLS,
  RiseCreatureType,
  RiseDebuff,
  RiseDefense,
  RiseJumpDistance,
  RiseKnowledgeSkill,
  RISE_KNOWLEDGE_SKILLS,
  RiseRole,
  RiseSize,
  RiseSkill,
  RiseSpecialDefense,
  RiseTag,
  RiseWeaponTag,
} from '@src/character_sheet/rise_data';

// These have unique typedefs beyond the standard string/number/bool
type CustomCreatureProperty = "base_class" | "creature_type" | "role" | "size";

type NumericCreatureProperty = "accuracy" | "brawling_accuracy" | "land_speed" | "level" | "challenge_rating" | "hit_points" | "damage_resistance" | "mundane_power" | "magical_power" | RiseAttribute | RiseAttributeModifier | RiseDefense | RiseSkill | RiseJumpDistance;
type StringCreatureProperty = "description" | "name" | CreatureKnowledgeResult | RiseSpecialDefense | CustomMovementSpeed | CustomSense;
type BooleanCreatureProperty = "has_art" | RiseDebuff;

// TODO: this is poorly organized in the sheet. Senses and movement speeds are both
// grouped under the `movement_speed_i_name` bucket.
export type CustomMovementSpeed = "movement_speed_0_name" | "movement_speed_1_name" | "movement_speed_2_name" | "movement_speed_3_name";
export type CustomSense = "sense_0_name" | "sense_1_name" | "sense_2_name" | "sense_3_name";

export type CreatureKnowledgeResult = "knowledge_result_easy" | "knowledge_result_normal" | "knowledge_result_hard" | "knowledge_result_legendary";
export interface KnowledgeResultsConfig {
  easy?: string;
  normal?: string;
  hard?: string;
  legendary?: string;
}

export type CreaturePropertyMap = {
  alignment: RiseAlignment;
  base_class: RiseBaseClass;
  creature_type: RiseCreatureType;
  role: RiseRole;
  size: RiseSize;
}
  & Record<NumericCreatureProperty, number>
  & Record<StringCreatureProperty, string>
  & Record<BooleanCreatureProperty, boolean>;

export type CreatureRequiredProperties = "alignment" | "base_class" | "challenge_rating" | "creature_type" | "level";
export type CreatureRequiredPropertyMap = Pick<CreaturePropertyMap, CreatureRequiredProperties>;

type CreatureProperty = CustomCreatureProperty | BooleanCreatureProperty | NumericCreatureProperty | StringCreatureProperty;

// These are the defenses as displayed in attacks, not the defense statistics on
// characters
export type RiseDefenseHumanReadable = "Armor" | "Fortitude" | "Reflex" | "Mental";

export interface AutoAttackConfig {
  accuracy?: MonsterAttackAccuracy;
  areaShape?: MonsterAttackAreaShape;
  defense: RiseDefenseHumanReadable[];
  effect: "damage" | MonsterAttackDebuff;
  isMagical: boolean;
  name: string;
  tags?: RiseTag[];
  targeting: MonsterAttackTargeting;
  usageTime?: MonsterAttackUsageTime;
}

// This matches the `setAttrs()` in `createDamagingMonsterAttack()`.
export interface DamagingAutoAttackResult {
  attack_accuracy: number;
  attack_damage_dice: string;
  attack_effect: string;
  attack_name: string;
  is_magical: boolean;
  is_targeted: boolean;
  monster_effect: string;
  tags: string;
  usage_time: MonsterAttackUsageTime;
}
const DAMAGING_ATTACK_KEYS: Array<keyof DamagingAutoAttackResult> = [
  "attack_accuracy",
  "attack_damage_dice",
  "attack_effect",
  "attack_name",
  "is_magical",
  "is_targeted",
  "monster_effect",
  "tags",
  "usage_time",
];

export type CreatureAttack = DamagingAutoAttackResult | DebuffAutoAttackResult;

export interface DebuffAutoAttackResult {
  attack_accuracy: number;
  attack_effect: string;
  attack_name: string;
  is_magical: boolean;
  is_targeted: boolean;
  monster_effect: string;
  tags: string;
  usage_time: MonsterAttackUsageTime;
}
const DEBUFF_RESULT_KEYS: Array<keyof DebuffAutoAttackResult> = [
  "attack_accuracy",
  "attack_effect",
  "attack_name",
  "is_magical",
  "is_targeted",
  "monster_effect",
  "tags",
  "usage_time",
];

export interface CustomAttackConfig {
  effect: string;
  isMagical: boolean;
  name: string;
  usageTime?: MonsterAttackUsageTime;
  tags?: RiseTag[];
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
    return this.getTrainedSkillNames().filter((skillName) => RISE_CRAFT_SKILLS.includes(skillName as any)) as RiseCraftSkill[];
  }

  getTrainedKnowledgeSkillNames(): RiseKnowledgeSkill[] {
    // We have to use these `as` casts because Typescript can't figure out that this is
    // safe. Unless I just can't figure out why this is unsafe.
    return this.getTrainedSkillNames().filter((skillName) => RISE_KNOWLEDGE_SKILLS.includes(skillName as any)) as RiseKnowledgeSkill[];
  }

  hasTrainedSkill(skillName: RiseSkill): boolean {
    return this.getTrainedSkillNames().includes(skillName);
  }

  // TODO: Is there a way to make the return type only match the keys provided in
  // propertyNames?
  getPropertyValues(propertyNames: readonly CreatureProperty[]): Partial<CreaturePropertyMap> {
    // We can't make these types match neatly. That's the point of this wrapper.
    return this.sheet.getPropertyValues(propertyNames) as any;
  }

  private getPropertyValue<T extends keyof CreaturePropertyMap>(propertyName: T): CreaturePropertyMap[T] {
    return this.sheet.getPropertyValues([propertyName])[propertyName];
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
      [`${prefix}_tags`]: config.tags?.join(", ") || "",
    });
  }

  addAutoAttack(config: AutoAttackConfig) {
    if (!this.level) {
      throw new Error(`Creature ${this.name} must have level before adding an autoattack`);
    }
    this.sheet.setProperties({
      monster_attack_accuracy: config.accuracy || "normal",
      monster_attack_area_shape: config.areaShape || "default",
      monster_attack_effect: config.effect,
      monster_attack_is_magical: config.isMagical,
      monster_attack_name: config.name,
      monster_attack_targeting: config.targeting,
      monster_attack_usage_time: config.usageTime,
    });

    this.sheet.clickButton("createmonsterattack");

    const sectionName = config.effect === "damage" ? "repeating_otherdamagingattacks" : "repeating_nondamagingattacks";
    const prefix = `${sectionName}_${this.sheet.getLatestRowId()}`;
    this.sheet.setProperties({
      [`${prefix}_defense`]: config.defense.join(" and "),
      [`${prefix}_tags`]: config.tags?.join(", ") || "",
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

  // TODO: This isn't currently very structured in the sheet.
  addCustomMovementSpeed(speed: string) {
    // TODO: add a regex to validate that speeds look reasonable
    for (let i = 0; i < 4; i++) {
      const key = `movement_speed_${i}_name}` as CustomMovementSpeed;
      if (!this.getPropertyValues([key])[key]) {
        this.setProperties({
          [key]: speed,
        });
      }
    }
  }

  getCustomMovementSpeeds(): string[] {
    return [
      this.movement_speed_0_name,
      this.movement_speed_1_name,
      this.movement_speed_2_name,
      this.movement_speed_3_name,
    ].filter((val) => val !== undefined);
  }

  // TODO: This isn't currently very structured in the sheet.
  addCustomSense(speed: string) {
    // TODO: add a regex to validate that senses look reasonable
    for (let i = 0; i < 4; i++) {
      const key = `sense_${i}_name}` as CustomSense;
      if (!this.getPropertyValues([key])[key]) {
        this.setProperties({
          [key]: speed,
        });
      }
    }
  }

  getCustomSenses(): string[] {
    return [
      this.sense_0_name,
      this.sense_1_name,
      this.sense_2_name,
      this.sense_3_name,
    ].filter((val) => val !== undefined);
  }

  addStandardModifier(modifierName: StandardModifierName) {
    // TODO: add fancy logic for some modifiers to have special effects
    this.addCustomModifier({ name: modifierName });
  }

  // Useful for checking if a creature has some common and important modifiers that change
  // the way LaTeX is generated, like being mindless.
  hasModifier(modifierName: StandardModifierName): boolean {
    return this.sheet.getRepeatingSectionValues("permanentmodifiers", "name").includes(modifierName);
  }

  getDamagingAutoAttacks(): DamagingAutoAttackResult[] {
    // TODO: figure out how to make these types work without `any`
    return this.sheet.getRepeatingSection("otherdamagingattacks").getValuesFromAllRows(DAMAGING_ATTACK_KEYS) as any[];
  }

  getDebuffAutoAttacks(): DebuffAutoAttackResult[] {
    // We assume that everything in this section comes from an autoattack; there's no
    // other way to add something here with current typescript. If we add more support for
    // custom attacks, some names might have to change.
    //
    // TODO: figure out how to make these types work without `any`
    return this.sheet.getRepeatingSection("nondamagingattacks").getValuesFromAllRows(DEBUFF_RESULT_KEYS) as any[];
  }

  setRequiredProperties(properties: CreatureRequiredPropertyMap) {
    this.setProperties(properties);
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
  setKnowledgeResults(knowledgeResults: KnowledgeResultsConfig) {
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

  // This should include all logic that automatically applies a weapon tag to strikes.
  // Currently, the only relevant logic is the size-based Sweeping tag.
  getAutomaticStrikeTags(): RiseWeaponTag[] {
    return {
      Fine: [],
      Diminuitive: [],
      Tiny: [],
      Small: [],
      Medium: [],
      Large: [],
      Huge: ["Sweeping (1)"],
      Gargantuan: ["Sweeping (2)"],
      Colossal: ["Sweeping (3)"],
    }[this.size];
  }

  // Getters
  public get alignment() {
    const alignment = this.getPropertyValue("alignment");
    if (!alignment) {
      throw new Error(`Creature ${this.name} has no alignment`);
    }
    return alignment;
  }

  public get base_class() {
    return this.getPropertyValue("base_class");
  }

  public get creature_type() {
    return this.getPropertyValue("creature_type");
  }

  public get land_speed() {
    return this.getPropertyValue("land_speed");
  }

  public get level() {
    return this.getPropertyValue("level");
  }

  public get role() {
    return this.getPropertyValue("role");
  }

  public get size() {
    return this.getPropertyValue("size");
  }

  public get accuracy() {
    return this.getPropertyValue("accuracy");
  }

  public get brawling_accuracy() {
    return this.getPropertyValue("brawling_accuracy");
  }

  public get hit_points() {
    return this.getPropertyValue("hit_points");
  }

  public get damage_resistance() {
    return this.getPropertyValue("damage_resistance");
  }

  public get magical_power() {
    return this.getPropertyValue("magical_power");
  }

  public get mundane_power() {
    return this.getPropertyValue("mundane_power");
  }

  public get challenge_rating() {
    return this.getPropertyValue("challenge_rating");
  }

  public get strength() {
    return this.getPropertyValue("strength");
  }

  public get dexterity() {
    return this.getPropertyValue("dexterity");
  }

  public get constitution() {
    return this.getPropertyValue("constitution");
  }

  public get intelligence() {
    return this.getPropertyValue("intelligence");
  }

  public get perception() {
    return this.getPropertyValue("perception");
  }

  public get willpower() {
    return this.getPropertyValue("willpower");
  }

  public get strength_at_creation() {
    return this.getPropertyValue("strength_at_creation");
  }

  public get strength_level_scaling() {
    return this.getPropertyValue("strength_level_scaling");
  }

  public get dexterity_at_creation() {
    return this.getPropertyValue("dexterity_at_creation");
  }

  public get dexterity_level_scaling() {
    return this.getPropertyValue("dexterity_level_scaling");
  }

  public get constitution_at_creation() {
    return this.getPropertyValue("constitution_at_creation");
  }

  public get constitution_level_scaling() {
    return this.getPropertyValue("constitution_level_scaling");
  }

  public get intelligence_at_creation() {
    return this.getPropertyValue("intelligence_at_creation");
  }

  public get intelligence_level_scaling() {
    return this.getPropertyValue("intelligence_level_scaling");
  }

  public get perception_at_creation() {
    return this.getPropertyValue("perception_at_creation");
  }

  public get perception_level_scaling() {
    return this.getPropertyValue("perception_level_scaling");
  }

  public get willpower_at_creation() {
    return this.getPropertyValue("willpower_at_creation");
  }

  public get willpower_level_scaling() {
    return this.getPropertyValue("willpower_level_scaling");
  }

  public get armor_defense() {
    return this.getPropertyValue("armor_defense");
  }

  public get fortitude() {
    return this.getPropertyValue("fortitude");
  }

  public get reflex() {
    return this.getPropertyValue("reflex");
  }

  public get mental() {
    return this.getPropertyValue("mental");
  }

  public get combined_jump_distance() {
    return this.getPropertyValue("combined_jump_distance");
  }

  public get horizontal_jump_distance() {
    return this.getPropertyValue("horizontal_jump_distance");
  }

  public get vertical_jump_distance() {
    return this.getPropertyValue("vertical_jump_distance");
  }

  public get climb() {
    return this.getPropertyValue("climb");
  }

  public get jump() {
    return this.getPropertyValue("jump");
  }

  public get swim() {
    return this.getPropertyValue("swim");
  }

  public get balance() {
    return this.getPropertyValue("balance");
  }

  public get flexibility() {
    return this.getPropertyValue("flexibility");
  }

  public get perform() {
    return this.getPropertyValue("perform");
  }

  public get ride() {
    return this.getPropertyValue("ride");
  }

  public get sleight_of_hand() {
    return this.getPropertyValue("sleight_of_hand");
  }

  public get stealth() {
    return this.getPropertyValue("stealth");
  }

  public get endurance() {
    return this.getPropertyValue("endurance");
  }

  public get craft_alchemy() {
    return this.getPropertyValue("craft_alchemy");
  }

  public get craft_bone() {
    return this.getPropertyValue("craft_bone");
  }

  public get craft_ceramics() {
    return this.getPropertyValue("craft_ceramics");
  }

  public get craft_leather() {
    return this.getPropertyValue("craft_leather");
  }

  public get craft_manuscripts() {
    return this.getPropertyValue("craft_manuscripts");
  }

  public get craft_metal() {
    return this.getPropertyValue("craft_metal");
  }

  public get craft_poison() {
    return this.getPropertyValue("craft_poison");
  }

  public get craft_stone() {
    return this.getPropertyValue("craft_stone");
  }

  public get craft_textiles() {
    return this.getPropertyValue("craft_textiles");
  }

  public get craft_traps() {
    return this.getPropertyValue("craft_traps");
  }

  public get craft_wood() {
    return this.getPropertyValue("craft_wood");
  }

  public get craft_untrained() {
    return this.getPropertyValue("craft_untrained");
  }

  public get deduction() {
    return this.getPropertyValue("deduction");
  }

  public get devices() {
    return this.getPropertyValue("devices");
  }

  public get disguise() {
    return this.getPropertyValue("disguise");
  }

  public get knowledge_arcana() {
    return this.getPropertyValue("knowledge_arcana");
  }

  public get knowledge_dungeoneering() {
    return this.getPropertyValue("knowledge_dungeoneering");
  }

  public get knowledge_engineering() {
    return this.getPropertyValue("knowledge_engineering");
  }

  public get knowledge_items() {
    return this.getPropertyValue("knowledge_items");
  }

  public get knowledge_local() {
    return this.getPropertyValue("knowledge_local");
  }

  public get knowledge_nature() {
    return this.getPropertyValue("knowledge_nature");
  }

  public get knowledge_planes() {
    return this.getPropertyValue("knowledge_planes");
  }

  public get knowledge_religion() {
    return this.getPropertyValue("knowledge_religion");
  }

  public get knowledge_untrained() {
    return this.getPropertyValue("knowledge_untrained");
  }

  public get medicine() {
    return this.getPropertyValue("medicine");
  }

  public get awareness() {
    return this.getPropertyValue("awareness");
  }

  public get creature_handling() {
    return this.getPropertyValue("creature_handling");
  }

  public get deception() {
    return this.getPropertyValue("deception");
  }

  public get persuasion() {
    return this.getPropertyValue("persuasion");
  }

  public get social_insight() {
    return this.getPropertyValue("social_insight");
  }

  public get survival() {
    return this.getPropertyValue("survival");
  }

  public get intimidate() {
    return this.getPropertyValue("intimidate");
  }

  public get profession() {
    return this.getPropertyValue("profession");
  }

  public get description() {
    return this.getPropertyValue("description");
  }

  public get movement_speed_0_name() {
    return this.getPropertyValue("movement_speed_0_name");
  }

  public get movement_speed_1_name() {
    return this.getPropertyValue("movement_speed_1_name");
  }

  public get movement_speed_2_name() {
    return this.getPropertyValue("movement_speed_2_name");
  }

  public get movement_speed_3_name() {
    return this.getPropertyValue("movement_speed_3_name");
  }

  public get sense_0_name() {
    return this.getPropertyValue("sense_0_name");
  }

  public get sense_1_name() {
    return this.getPropertyValue("sense_1_name");
  }

  public get sense_2_name() {
    return this.getPropertyValue("sense_2_name");
  }

  public get sense_3_name() {
    return this.getPropertyValue("sense_3_name");
  }

  public get immune() {
    return this.getPropertyValue("immune");
  }

  public get impervious() {
    return this.getPropertyValue("impervious");
  }

  public get vulnerable() {
    return this.getPropertyValue("vulnerable");
  }

  public get knowledge_result_easy() {
    return this.getPropertyValue("knowledge_result_easy");
  }

  public get knowledge_result_normal() {
    return this.getPropertyValue("knowledge_result_normal");
  }

  public get knowledge_result_hard() {
    return this.getPropertyValue("knowledge_result_hard");
  }

  public get knowledge_result_legendary() {
    return this.getPropertyValue("knowledge_result_legendary");
  }

  public get name() {
    return this.getPropertyValue("name");
  }

  public get has_art() {
    return this.getPropertyValue("has_art");
  }

  public get climbing() {
    return this.getPropertyValue("climbing");
  }
}
