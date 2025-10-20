import { CharacterSheet } from '@src/character_sheet/character_sheet';
import {
  getCurrentCharacterSheet,
  setCurrentCharacterSheet,
  resetDefaultCharacterSheet,
} from '@src/character_sheet/current_character_sheet';
import {
  handleEverything,
  MonsterAttackUsageTime,
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
  RiseTrait,
  isTrait,
} from '@src/character_sheet/rise_data';
import { getManeuverByName, getWeaponMultByRank } from '@src/abilities/combat_styles';
import { getSpellByName } from '@src/abilities/mystic_spheres';
import { MonsterWeapon, isManufactured, getWeaponTag } from '@src/monsters/weapons';
import {
  ActiveAbility,
  ActiveAbilityRank,
  PassiveAbility,
  ActiveAbilityScaling,
} from '@src/abilities';
import { titleCase } from '@src/latex/format/title_case';
import {
  EquippedItem,
  isBodyArmor,
  isShield,
  generateBodyArmorProperties,
  generateShieldProperties,
  BodyArmor,
  Shield,
} from '@src/monsters/equipment';

// These have unique typedefs beyond the standard string/number/bool
type CustomCreatureProperty = 'base_class' | 'creature_type' | 'role' | 'size';

type NumericCreatureProperty =
  | 'accuracy'
  | 'brawling_accuracy'
  | 'land_speed'
  | 'level'
  | 'hit_points'
  | 'durability'
  | 'injury_point'
  | 'mundane_power'
  | 'magical_power'
  | 'speed'
  | RiseAttribute
  | RiseAttributeModifier
  | RiseDefense
  | RiseSkill
  | RiseJumpDistance;
type StringCreatureProperty =
  | 'description'
  | 'name'
  | 'weapon_0_name'
  | 'weapon_1_name'
  | 'weapon_2_name'
  | 'weapon_3_name'
  | CreatureKnowledgeResult
  | RiseSpecialDefense
  | CustomMovementSpeed
  | CustomSense;
type BooleanCreatureProperty = 'has_art' | 'elite' | RiseDebuff;

// TODO: this is poorly organized in the sheet. Senses and movement speeds are both
// grouped under the `movement_speed_i_name` bucket.
export type CustomMovementSpeed =
  | 'movement_speed_0_name'
  | 'movement_speed_1_name'
  | 'movement_speed_2_name'
  | 'movement_speed_3_name';
export type CustomSense = 'sense_0_name' | 'sense_1_name' | 'sense_2_name' | 'sense_3_name';

export type CreatureKnowledgeResult =
  | 'knowledge_result_easy'
  | 'knowledge_result_normal'
  | 'knowledge_result_hard'
  | 'knowledge_result_legendary';
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
} & Record<NumericCreatureProperty, number> &
  Record<StringCreatureProperty, string> &
  Record<BooleanCreatureProperty, boolean>;

export type CreatureRequiredProperties =
  | 'alignment'
  | 'base_class'
  | 'elite'
  | 'creature_type'
  | 'size'
  | 'level';
export type CreatureRequiredPropertyMap = Pick<CreaturePropertyMap, CreatureRequiredProperties>;

type CreatureProperty =
  | CustomCreatureProperty
  | BooleanCreatureProperty
  | NumericCreatureProperty
  | StringCreatureProperty;

// These are the defenses as displayed in attacks, not the defense statistics on
// characters
export type RiseDefenseHumanReadable = 'Armor' | 'Brawn' | 'Fortitude' | 'Reflex' | 'Mental';

export interface CustomModifierConfig {
  immune?: string;
  impervious?: string;
  name?: string;
  numericEffects?: CustomModifierNumericEffect[];
  vulnerable?: string;
}

export interface CustomModifierNumericEffect {
  modifier: number;
  statistic: NumericCreatureProperty;
}

export interface MonsterAbilityOptions {
  displayName?: string;
  isMagical?: boolean; // Spells default to true, maneuvers default to false
  tags?: RiseTag[];
  usageTime?: MonsterAttackUsageTime;
  weapon?: MonsterWeapon;
}

interface NonScaledCustomMonsterAbility
  extends Omit<ActiveAbility, 'isMagical' | 'kind' | 'rank' | 'roles' | 'scaling'> {
  isMagical?: boolean;
  usageTime?: MonsterAttackUsageTime;
}

// If you provide `scaling`, you must also provide `rank`. Most monster abilities will
// provide neither.
interface ScaledCustomMonsterAbility extends NonScaledCustomMonsterAbility {
  rank: ActiveAbilityRank;
  scaling: ActiveAbilityScaling;
}

export type CustomMonsterAbility = NonScaledCustomMonsterAbility | ScaledCustomMonsterAbility;

export interface PoisonDefinition {
  accuracyModifier?: number;
  injury: boolean;
  itMakes: string;
  name: string;
}

// A creature wraps a CharacterSheet, exposing only more user-friendly functions.
// This means that "normal" typescript code shouldn't have to grapple with the complexity
// of, say, repeating abilities in Roll20.
export class Creature implements CreaturePropertyMap {
  private sheet: CharacterSheet;
  private activeAbilities: Record<string, ActiveAbility>;

  constructor(sheet: CharacterSheet) {
    this.sheet = sheet;
    this.activeAbilities = {};
  }

  static new() {
    const sheet = resetDefaultCharacterSheet();
    handleEverything();
    return new this(sheet);
  }

  // If a sheet with this name already exists, it will use the existing sheet with that
  // name.
  static fromName(name: string): Creature {
    setCurrentCharacterSheet(name);
    const sheet = getCurrentCharacterSheet();
    handleEverything();
    return new this(sheet);
  }

  getRelevantPower(isMagical: boolean) {
    return isMagical ? this.magical_power : this.mundane_power;
  }

  // This is the Knowledge skill used to learn more about the creature, not the creature's
  // own knowledge skills.
  // TODO: redesign creature types and tags; plants should use knowledge (nature), etc.
  getRelevantKnowledge(): RiseKnowledgeSkill {
    if (!this.creature_type) {
      throw new Error(
        `Unable to get relevant knowledge for creature ${this.name} with no creature type.`,
      );
    }
    return {
      aberration: 'knowledge_dungeoneering' as const,
      animate: 'knowledge_arcana' as const,
      beast: 'knowledge_nature' as const,
      dragon: 'knowledge_arcana' as const,
      humanoid: 'knowledge_local' as const,
      planeforged: 'knowledge_planes' as const,
      undead: 'knowledge_religion' as const,
    }[this.creature_type];
  }

  getTrainedSkillNames(): RiseSkill[] {
    return this.sheet.getRepeatingSectionValues('trainedskills', 'trained_skill') as RiseSkill[];
  }

  getTrainedCraftSkillNames(): RiseCraftSkill[] {
    // We have to use these `as` casts because Typescript can't figure out that this is
    // safe. Unless I just can't figure out why this is unsafe.
    return this.getTrainedSkillNames().filter((skillName) =>
      RISE_CRAFT_SKILLS.includes(skillName as any),
    ) as RiseCraftSkill[];
  }

  getTrainedKnowledgeSkillNames(): RiseKnowledgeSkill[] {
    // We have to use these `as` casts because Typescript can't figure out that this is
    // safe. Unless I just can't figure out why this is unsafe.
    return this.getTrainedSkillNames().filter((skillName) =>
      RISE_KNOWLEDGE_SKILLS.includes(skillName as any),
    ) as RiseKnowledgeSkill[];
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

  private getPropertyValue<T extends keyof CreaturePropertyMap>(
    propertyName: T,
  ): CreaturePropertyMap[T] {
    return this.sheet.getPropertyValues([propertyName])[propertyName];
  }

  getSheetForTesting(): CharacterSheet {
    return this.sheet;
  }

  // This is "set" instead of "add" because it overwrites any existing equipment.
  // By default, any manufactured weapons specified in maneuvers are automatically
  // included in the creature's equipment using `addWeapon`, and armor can be set with
  // `setEquippedArmor`, so you don't normally need to use this.
  // This function is primarily useful for defining creatures that have equipment that
  // doesn't match their maneuvers for some weird reason.
  setEquipment(items: EquippedItem[]) {
    let weaponIndex = 0;
    for (const item of items) {
      if (isBodyArmor(item)) {
        this.sheet.setProperties(generateBodyArmorProperties(item));
      } else if (isShield(item)) {
        this.sheet.setProperties(generateShieldProperties(item));
      } else {
        const key = `weapon_${weaponIndex}_name`;
        this.sheet.setProperties({ [key]: item });
        weaponIndex += 1;
      }
    }
    // Clear any remaining weapons
    while (weaponIndex <= 3) {
      this.sheet.setProperties({ [`weapon_${weaponIndex}_name`]: '' });
      weaponIndex += 1;
    }
  }

  setEquippedArmor({ bodyArmor, shield }: { bodyArmor?: BodyArmor; shield?: Shield }) {
    if (bodyArmor) {
      this.sheet.setProperties(generateBodyArmorProperties(bodyArmor));
    }
    if (shield) {
      this.sheet.setProperties(generateShieldProperties(shield));
    }
  }

  // This skips over existing weapons to make sure it's an additive process.
  // Adding a copy of an existing weapon is a no-op.
  addWeapon(weapon: MonsterWeapon) {
    for (let weaponIndex = 0; weaponIndex <= 3; weaponIndex++) {
      const key = `weapon_${weaponIndex}_name`;
      const existingWeapon = this.sheet.getPropertyValue(key);
      if (existingWeapon === weapon) {
        return;
      } else if (!existingWeapon) {
        this.sheet.setProperties({ [key]: weapon });
        return;
      }
    }

    throw new Error(`Creature ${this.name}: Could not add fifth weapon '${weapon}'`);
  }

  getEquipment(): EquippedItem[] {
    // We use this as the return ordering
    const keys = [
      'body_armor_name',
      'shield_name',
      'weapon_0_name',
      'weapon_1_name',
      'weapon_2_name',
      'weapon_3_name',
    ];
    const equippedItemMap = this.sheet.getPropertyValues(keys);
    return keys.map((key) => equippedItemMap[key]).filter(Boolean);
  }

  // Use this instead of directly setting `this.activeAbilities` to get some standard
  // logic.
  addActiveAbility(ability: ActiveAbility) {
    if (ability.weapon && isManufactured(ability.weapon)) {
      this.addWeapon(ability.weapon);
    }
    if (this.activeAbilities[ability.name]) {
      console.warn(`Creature ${this.name}: Overwriting existing ability '${ability.name}'`);
    }
    // Monsters ignore personal fatigue
    if (ability.cost === 'One \\glossterm{fatigue level}') {
      delete ability.cost;
    }
    this.activeAbilities[ability.name] = ability;
  }

  // `displayName` is used if we want to use the mechanical effects of an existing
  // maneuver, but to display it in the book with a different name.
  addManeuver(
    maneuverName: string,
    { displayName, isMagical, tags, usageTime, weapon }: MonsterAbilityOptions = {},
  ) {
    const baseManeuver = getManeuverByName(maneuverName);

    // Maneuvers almost never have defined scaling.
    let scaling: ActiveAbilityScaling | null = null;
    if (weapon) {
      // If the maneuver uses a weapon and does not already have a defined scaling,
      // we should scale accuracy with rank.
      scaling = 'accuracy';
    } else if (/damagerank/.test(baseManeuver.effect || '')) {
      // Maneuvers that deal fixed damage should scale that.
      scaling = 'damage';
    }
    this.addActiveAbility({
      kind: 'maneuver',
      ...(scaling ? { scaling } : {}),
      tags,
      ...baseManeuver,
      name: displayName || maneuverName,
      isMagical: Boolean(isMagical),
      weapon,
      // We don't want to override the original maneuver's usage time
      ...(usageTime ? { usageTime } : {}),
    });
  }

  addGrapplingStrike(
    weapon: MonsterWeapon,
    { displayName, isMagical, tags, usageTime }: Omit<MonsterAbilityOptions, 'weapon'> = {},
  ) {
    displayName = displayName || `Grappling ${titleCase(weapon)}`;

    // TODO: what is the correct effective rank for this? It should do less damage than
    // a normal strike, but how much?
    const effectiveRank = Math.max(1, this.calculateRank() - 1);
    const maneuver = getWeaponMultByRank(effectiveRank);
    maneuver.effect += `
        \\hit If your attack result also hits the target's Brawn defense, it is \\grappled.
      `;
    maneuver.tags = maneuver.tags || [];
    if (tags) {
      maneuver.tags = maneuver.tags.concat(tags);
    }
    maneuver.tags.push('Size-Based');

    this.addActiveAbility({
      kind: 'maneuver',
      ...maneuver,
      name: displayName,
      isMagical: Boolean(isMagical),
      usageTime,
      weapon,
    });
  }

  addPoisonousStrike(
    weapon: MonsterWeapon,
    poison: PoisonDefinition,
    { displayName, isMagical, tags, usageTime }: Omit<MonsterAbilityOptions, 'weapon'> = {},
  ) {
    displayName = displayName || `Venomous ${titleCase(weapon)}`;

    // TODO: what is the correct effective rank for this? It should do less damage than
    // a normal strike, but how much?
    const effectiveRank = Math.max(1, this.calculateRank() - 1);
    const maneuver = getWeaponMultByRank(effectiveRank);
    const poisonTrigger = poison.injury ? '\\injury' : '\\hit';
    if (poison.itMakes.trimEnd().slice(-1) !== '.') {
      console.warn(`Ability ${this.name}.${displayName}: poison.itMakes should end with a period`);
    }
    maneuver.effect += `
        ${poisonTrigger} The target becomes \\glossterm{poisoned} by ${poison.name}.
          The poison's accuracy is $accuracy${formatNumericModifier(poison.accuracyModifier)}.
          It makes ${poison.itMakes}
      `;

    this.addActiveAbility({
      kind: 'maneuver',
      tags,
      ...maneuver,
      name: displayName,
      isMagical: Boolean(isMagical),
      usageTime,
      weapon,
    });
  }

  addWeaponMult(
    weapon: MonsterWeapon,
    { displayName, isMagical, tags, usageTime }: Omit<MonsterAbilityOptions, 'weapon'> = {},
  ) {
    displayName = displayName || titleCase(weapon);
    this.addActiveAbility({
      kind: 'maneuver',
      tags,
      ...getWeaponMultByRank(this.calculateRank()),
      name: displayName,
      isMagical: Boolean(isMagical),
      usageTime,
      weapon,
    });
  }

  addSneakAttack(
    weapon: MonsterWeapon,
    { displayName, isMagical, tags, usageTime }: Omit<MonsterAbilityOptions, 'weapon'> = {},
  ) {
    const maybeRanged = /(Projectile|Thrown)/.test(getWeaponTag(weapon) || '') ? 'Ranged ' : '';
    displayName = displayName || 'Sneak Attack';
    this.addActiveAbility({
      kind: 'maneuver',
      tags,
      ...getManeuverByName(`${maybeRanged}Sneak Attack ${this.calculateRank()}`),
      name: displayName,
      isMagical: Boolean(isMagical),
      usageTime,
      weapon,
    });
  }

  addSpell(
    spellName: string,
    { displayName, isMagical, tags, usageTime, weapon }: MonsterAbilityOptions = {},
  ) {
    this.addActiveAbility({
      kind: 'spell',
      tags,
      ...getSpellByName(spellName),
      name: displayName || spellName,
      isMagical: isMagical === undefined ? true : isMagical,
      weapon,
      // We don't want to override the original spell's usage time
      ...(usageTime ? { usageTime } : {}),
    });
  }

  addCustomManeuver(maneuver: CustomMonsterAbility) {
    this.addActiveAbility({
      ...maneuver,
      kind: 'maneuver',
      isMagical: maneuver.isMagical === undefined ? false : maneuver.isMagical,
      rank: 1,
      roles: [],
    });
  }

  // We don't care what the rank of a custom spell is, but we create one for it anyway to
  // avoid type confusion. Since the spell won't have scaling, the rank should never
  // matter.
  addCustomSpell(spell: CustomMonsterAbility) {
    this.addActiveAbility({
      rank: 1,
      ...spell,
      kind: 'spell',
      isMagical: spell.isMagical === undefined ? true : spell.isMagical,
      roles: [],
    });
  }

  // Arbitrary names are ignored when generating LaTeX. However, names that match standard
  // trait definitions are displayed.
  addCustomModifier(config: CustomModifierConfig) {
    if (config.numericEffects && config.numericEffects.length > 3) {
      throw new Error('We only support a maximum of three numeric effects per custom modifier.');
    }

    const prefix = `repeating_permanentmodifiers_${this.sheet.generateRowId()}`;
    const attrs: Record<string, string | number | undefined> = {
      [`${prefix}_immune`]: config.immune,
      [`${prefix}_impervious`]: config.impervious,
      [`${prefix}_vulnerable`]: config.vulnerable,
      [`${prefix}_name`]: config.name || 'Invisible',
    };
    if (config.numericEffects) {
      for (let i = 0; i < config.numericEffects.length; i++) {
        attrs[`${prefix}_statistic${i}`] = config.numericEffects[i].statistic;
        attrs[`${prefix}_value${i}`] = config.numericEffects[i].modifier;
      }
    }
    this.sheet.setProperties(attrs);
  }

  addPassiveAbility({ name, effect, isMagical }: PassiveAbility) {
    const prefix = `repeating_passiveabilities_${this.sheet.generateRowId()}`;
    this.sheet.setProperties({
      [`${prefix}_ability_name`]: name,
      [`${prefix}_is_magical`]: Boolean(isMagical),
      [`${prefix}_ability_effects`]: effect,
    });
  }

  getPassiveAbilities(): PassiveAbility[] {
    return this.sheet
      .getRepeatingSection('passiveabilities')
      .getValuesFromAllRows(['ability_name', 'ability_effects', 'is_magical'])
      .map((ability) => {
        return {
          name: ability.ability_name as string,
          isMagical: Boolean(ability.is_magical),
          effect: ability.ability_effects as string,
        };
      });
  }

  getModifierNames(): string[] {
    return this.sheet.getRepeatingSectionValues('permanentmodifiers', 'name') as string[];
  }

  getStandardTraits(): RiseTrait[] {
    return this.getModifierNames().filter(isTrait);
  }

  addImmunity(immuneTo: string) {
    this.addCustomModifier({
      immune: immuneTo,
    });
  }

  addImpervious(imperviousTo: string) {
    this.addCustomModifier({
      impervious: imperviousTo,
    });
  }

  addVulnerability(vulnerableTo: string) {
    this.addCustomModifier({
      vulnerable: vulnerableTo,
    });
  }

  // TODO: This isn't currently very structured in the sheet.
  addCustomMovementSpeed(speed: string) {
    // TODO: add a regex to validate that speeds look reasonable
    for (let i = 0; i < 4; i++) {
      const key = `movement_speed_${i}_name` as CustomMovementSpeed;
      if (!this.getPropertyValues([key])[key]) {
        this.setProperties({
          [key]: speed,
        });
        return;
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
  addCustomSense(sense: string) {
    // TODO: add a regex to validate that senses look reasonable
    for (let i = 0; i < 4; i++) {
      const key = `sense_${i}_name` as CustomSense;
      if (!this.getPropertyValues([key])[key]) {
        this.setProperties({
          [key]: sense,
        });
        return;
      }
    }
  }

  getCustomSenses(): string[] {
    return [this.sense_0_name, this.sense_1_name, this.sense_2_name, this.sense_3_name].filter(
      (val) => val !== undefined,
    );
  }

  addTrait(traitName: RiseTrait) {
    // TODO: add fancy logic for some traits to have special effects
    const modifier: CustomModifierConfig = { name: traitName };

    if (traitName === 'incorporeal') {
      modifier.immune = '\\atCreation, \\atManifestation, \\glossterm{mundane}';
      modifier.numericEffects = [{ modifier: 5, statistic: 'stealth' }];
    } else if (traitName === 'multipedal') {
      modifier.numericEffects = [
        { modifier: 5, statistic: 'balance' },
        { modifier: 10, statistic: 'speed' },
      ];
    } else if (traitName === 'legless') {
      modifier.immune = 'Prone';
      // No way to mark inability to jump. Just don't give legless creatures the
      // Jump skill as a trained skill and it shouldn't appear in the book, though.
    } else if (traitName === 'quadrupedal') {
      modifier.numericEffects = [{ modifier: 10, statistic: 'speed' }];
    }
    this.addCustomModifier(modifier);
  }

  hasTrait(traitName: RiseTrait): boolean {
    return this.getModifierNames().includes(traitName);
  }

  getActiveAbilities(): ActiveAbility[] {
    return Object.values(this.activeAbilities);
  }

  setRequiredProperties(properties: CreatureRequiredPropertyMap) {
    this.setProperties(properties);
    // TODO: this is a bit of a hack, since it's possible to define a monster as being
    // elite without calling this function. However, it's unlikely that we'd do that, so
    // this is fine for now.
    if (properties.elite) {
      this.addManeuver('Elite Cleanse');
    }
  }

  setProperties(properties: Partial<CreaturePropertyMap>) {
    this.sheet.setProperties(properties);
  }

  // TODO: support missing attributes, such as for mindless creatures
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

  // We currently don't provide a way to bulk *unset* trained skills; this function is
  // purely additive.
  setTrainedSkills(skillNames: RiseSkill[]) {
    const props: Record<string, string> = {};
    for (const skillName of skillNames) {
      const rowId = this.sheet.generateRowId();
      props[`repeating_trainedskills_${rowId}_trained_skill`] = skillName;
    }
    this.sheet.setProperties(props);
  }

  getSizeBasedSweepingTag(): RiseWeaponTag | null {
    return {
      fine: null,
      diminuitive: null,
      tiny: null,
      small: null,
      medium: null,
      large: null,
      huge: 'Sweeping (1)',
      gargantuan: 'Sweeping (2)',
      colossal: 'Sweeping (3)',
    }[this.size];
  }

  // We throw errors for things that can cause runtime warnings later.
  // For things that are just suspicious, we warn.
  // We're specifically checking that the monster is ready for LaTeX generation, so
  // anything that would break that is treated as an error, even if it doesn't block the
  // sheet worker from doing ordinary combat math.
  checkValidMonster() {
    if (this.name === this.name.toLowerCase()) {
      this.throwError('Name must be title case');
    }
    if (!this.alignment) {
      this.throwError('Must have alignment');
    }

    if (this.getTrainedSkillNames().length === 0) {
      this.warn('Has no trained skills');
    }
  }

  throwError(message: string) {
    throw new Error(`Monster ${this.name}: ${message}`);
  }

  warn(message: string) {
    console.warn(`Monster ${this.name}: ${message}`);
  }

  calculateRank(): ActiveAbilityRank {
    // TODO: should level 22+ creatures be capped at 7?
    const rank = Math.max(0, Math.min(7, Math.floor((this.level + 2) / 3)));
    return rank as ActiveAbilityRank;
  }

  // Getters
  public get alignment() {
    return this.getPropertyValue('alignment');
  }

  public get base_class() {
    return this.getPropertyValue('base_class');
  }

  public get creature_type() {
    return this.getPropertyValue('creature_type');
  }

  public get land_speed() {
    return this.getPropertyValue('land_speed');
  }

  public get level() {
    return this.getPropertyValue('level');
  }

  public get role() {
    return this.getPropertyValue('role');
  }

  public get size() {
    return this.getPropertyValue('size');
  }

  public get accuracy() {
    return this.getPropertyValue('accuracy');
  }

  public get brawling_accuracy() {
    return this.getPropertyValue('brawling_accuracy');
  }

  public get durability() {
    return this.getPropertyValue('durability');
  }

  public get hit_points() {
    return this.getPropertyValue('hit_points');
  }

  public get injury_point() {
    return this.getPropertyValue('injury_point');
  }

  public get magical_power() {
    return this.getPropertyValue('magical_power');
  }

  public get mundane_power() {
    return this.getPropertyValue('mundane_power');
  }

  public get elite() {
    return this.getPropertyValue('elite');
  }

  public get strength() {
    return this.getPropertyValue('strength');
  }

  public get dexterity() {
    return this.getPropertyValue('dexterity');
  }

  public get constitution() {
    return this.getPropertyValue('constitution');
  }

  public get intelligence() {
    return this.getPropertyValue('intelligence');
  }

  public get perception() {
    return this.getPropertyValue('perception');
  }

  public get willpower() {
    return this.getPropertyValue('willpower');
  }

  public get strength_at_creation() {
    return this.getPropertyValue('strength_at_creation');
  }

  public get strength_level_scaling() {
    return this.getPropertyValue('strength_level_scaling');
  }

  public get dexterity_at_creation() {
    return this.getPropertyValue('dexterity_at_creation');
  }

  public get dexterity_level_scaling() {
    return this.getPropertyValue('dexterity_level_scaling');
  }

  public get constitution_at_creation() {
    return this.getPropertyValue('constitution_at_creation');
  }

  public get constitution_level_scaling() {
    return this.getPropertyValue('constitution_level_scaling');
  }

  public get intelligence_at_creation() {
    return this.getPropertyValue('intelligence_at_creation');
  }

  public get intelligence_level_scaling() {
    return this.getPropertyValue('intelligence_level_scaling');
  }

  public get perception_at_creation() {
    return this.getPropertyValue('perception_at_creation');
  }

  public get perception_level_scaling() {
    return this.getPropertyValue('perception_level_scaling');
  }

  public get willpower_at_creation() {
    return this.getPropertyValue('willpower_at_creation');
  }

  public get willpower_level_scaling() {
    return this.getPropertyValue('willpower_level_scaling');
  }

  public get armor_defense() {
    return this.getPropertyValue('armor_defense');
  }

  public get brawn() {
    return this.getPropertyValue('brawn');
  }

  public get fortitude() {
    return this.getPropertyValue('fortitude');
  }

  public get reflex() {
    return this.getPropertyValue('reflex');
  }

  public get mental() {
    return this.getPropertyValue('mental');
  }

  public get speed() {
    return this.getPropertyValue('speed');
  }

  public get combined_jump_distance() {
    return this.getPropertyValue('combined_jump_distance');
  }

  public get horizontal_jump_distance() {
    return this.getPropertyValue('horizontal_jump_distance');
  }

  public get vertical_jump_distance() {
    return this.getPropertyValue('vertical_jump_distance');
  }

  public get climb() {
    return this.getPropertyValue('climb');
  }

  public get jump() {
    return this.getPropertyValue('jump');
  }

  public get swim() {
    return this.getPropertyValue('swim');
  }

  public get balance() {
    return this.getPropertyValue('balance');
  }

  public get flexibility() {
    return this.getPropertyValue('flexibility');
  }

  public get perform() {
    return this.getPropertyValue('perform');
  }

  public get ride() {
    return this.getPropertyValue('ride');
  }

  public get sleight_of_hand() {
    return this.getPropertyValue('sleight_of_hand');
  }

  public get stealth() {
    return this.getPropertyValue('stealth');
  }

  public get endurance() {
    return this.getPropertyValue('endurance');
  }

  public get craft_alchemy() {
    return this.getPropertyValue('craft_alchemy');
  }

  public get craft_bone() {
    return this.getPropertyValue('craft_bone');
  }

  public get craft_ceramics() {
    return this.getPropertyValue('craft_ceramics');
  }

  public get craft_leather() {
    return this.getPropertyValue('craft_leather');
  }

  public get craft_manuscripts() {
    return this.getPropertyValue('craft_manuscripts');
  }

  public get craft_metal() {
    return this.getPropertyValue('craft_metal');
  }

  public get craft_poison() {
    return this.getPropertyValue('craft_poison');
  }

  public get craft_stone() {
    return this.getPropertyValue('craft_stone');
  }

  public get craft_textiles() {
    return this.getPropertyValue('craft_textiles');
  }

  public get craft_traps() {
    return this.getPropertyValue('craft_traps');
  }

  public get craft_wood() {
    return this.getPropertyValue('craft_wood');
  }

  public get craft_untrained() {
    return this.getPropertyValue('craft_untrained');
  }

  public get deduction() {
    return this.getPropertyValue('deduction');
  }

  public get devices() {
    return this.getPropertyValue('devices');
  }

  public get disguise() {
    return this.getPropertyValue('disguise');
  }

  public get knowledge_arcana() {
    return this.getPropertyValue('knowledge_arcana');
  }

  public get knowledge_dungeoneering() {
    return this.getPropertyValue('knowledge_dungeoneering');
  }

  public get knowledge_engineering() {
    return this.getPropertyValue('knowledge_engineering');
  }

  public get knowledge_items() {
    return this.getPropertyValue('knowledge_items');
  }

  public get knowledge_local() {
    return this.getPropertyValue('knowledge_local');
  }

  public get knowledge_nature() {
    return this.getPropertyValue('knowledge_nature');
  }

  public get knowledge_planes() {
    return this.getPropertyValue('knowledge_planes');
  }

  public get knowledge_religion() {
    return this.getPropertyValue('knowledge_religion');
  }

  public get knowledge_untrained() {
    return this.getPropertyValue('knowledge_untrained');
  }

  public get medicine() {
    return this.getPropertyValue('medicine');
  }

  public get awareness() {
    return this.getPropertyValue('awareness');
  }

  public get creature_handling() {
    return this.getPropertyValue('creature_handling');
  }

  public get deception() {
    return this.getPropertyValue('deception');
  }

  public get persuasion() {
    return this.getPropertyValue('persuasion');
  }

  public get social_insight() {
    return this.getPropertyValue('social_insight');
  }

  public get survival() {
    return this.getPropertyValue('survival');
  }

  public get intimidate() {
    return this.getPropertyValue('intimidate');
  }

  public get profession() {
    return this.getPropertyValue('profession');
  }

  public get description() {
    return this.getPropertyValue('description');
  }

  public get weapon_0_name() {
    return this.getPropertyValue('weapon_0_name');
  }

  public get weapon_1_name() {
    return this.getPropertyValue('weapon_1_name');
  }

  public get weapon_2_name() {
    return this.getPropertyValue('weapon_2_name');
  }

  public get weapon_3_name() {
    return this.getPropertyValue('weapon_3_name');
  }

  public get movement_speed_0_name() {
    return this.getPropertyValue('movement_speed_0_name');
  }

  public get movement_speed_1_name() {
    return this.getPropertyValue('movement_speed_1_name');
  }

  public get movement_speed_2_name() {
    return this.getPropertyValue('movement_speed_2_name');
  }

  public get movement_speed_3_name() {
    return this.getPropertyValue('movement_speed_3_name');
  }

  public get sense_0_name() {
    return this.getPropertyValue('sense_0_name');
  }

  public get sense_1_name() {
    return this.getPropertyValue('sense_1_name');
  }

  public get sense_2_name() {
    return this.getPropertyValue('sense_2_name');
  }

  public get sense_3_name() {
    return this.getPropertyValue('sense_3_name');
  }

  public get immune() {
    return this.getPropertyValue('immune');
  }

  public get impervious() {
    return this.getPropertyValue('impervious');
  }

  public get vulnerable() {
    return this.getPropertyValue('vulnerable');
  }

  public get knowledge_result_easy() {
    return this.getPropertyValue('knowledge_result_easy');
  }

  public get knowledge_result_normal() {
    return this.getPropertyValue('knowledge_result_normal');
  }

  public get knowledge_result_hard() {
    return this.getPropertyValue('knowledge_result_hard');
  }

  public get knowledge_result_legendary() {
    return this.getPropertyValue('knowledge_result_legendary');
  }

  public get name() {
    return this.getPropertyValue('name');
  }

  public get lowercase_name() {
    return this.name.toLowerCase();
  }

  public get has_art() {
    return this.getPropertyValue('has_art');
  }

  public get climbing() {
    return this.getPropertyValue('climbing');
  }
}

function formatNumericModifier(modifier?: number): string {
  if (modifier === undefined) {
    return '';
  } else if (modifier > 0) {
    return `+${modifier}`;
  } else if (modifier < 0) {
    return `${modifier}`;
  } else {
    return '';
  }
}
