import { CharacterSheet } from '@src/character_sheet/character_sheet';

export type CreaturePropertyMap = {
  base_class: RiseBaseClass;
  size: RiseSize;
}
  & Record<NumericCreatureProperty, number>
  & Record<StringCreatureProperty, string>
  & Record<BooleanCreatureProperty, boolean>;
type CreatureProperty = "size" | BooleanCreatureProperty | NumericCreatureProperty | StringCreatureProperty;

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

// A creature wraps a CharacterSheet, exposing only more user-friendly functions.
// This means that "normal" typescript code shouldn't have to grapple with the complexity
// of, say, repeating abilities in Roll20.
export class Creature {
  private sheet: CharacterSheet;

  constructor(sheet: CharacterSheet) {
    this.sheet = sheet;
  }

  // TODO: Is there a way to make the return type only match the keys provided in
  // propertyNames?
  getProperties(propertyNames: CreatureProperty[], callback: (p: CreaturePropertyMap) => void): void {
    this.sheet.getProperties(propertyNames, (attrs) => {
      // We can't make these types match neatly. That's the point of this wrapper.
      callback(attrs as any);
    });
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
}
