use crate::core_mechanics::attributes::{Attribute, HasAttributes};
use crate::core_mechanics::creatures::attacks::{self, HasAttacks};
use crate::core_mechanics::creatures::{
    latex, HasCreatureMechanics, HasModifiers, Modifier, ModifierType,
};
use crate::core_mechanics::damage_absorption::HasDamageAbsorption;
use crate::core_mechanics::defenses::{self, HasDefenses, SpecialDefenseModifier};
use crate::core_mechanics::movement_modes;
use crate::core_mechanics::passive_abilities::PassiveAbility;
use crate::core_mechanics::resources::{self, HasResources};
use crate::core_mechanics::senses::Sense;
use crate::core_mechanics::sizes;
use crate::equipment::{Armor, HasArmor, HasWeapons, Weapon};
use crate::skills::{HasSkills, Skill};
use std::cmp::max;
use std::collections::HashMap;

pub struct Creature {
    pub armor: Vec<Armor>,
    base_attributes: HashMap<Attribute, i32>,
    pub name: Option<String>,
    pub level: i32,
    pub modifiers: Vec<Modifier>,
    pub movement_modes: Vec<movement_modes::MovementMode>,
    pub passive_abilities: Option<Vec<PassiveAbility>>,
    pub senses: Option<Vec<Sense>>,
    pub size: sizes::Size,
    pub skill_training: Option<HashMap<Skill, bool>>,
    pub special_attacks: Option<Vec<attacks::Attack>>,
    pub special_defense_modifiers: Option<Vec<SpecialDefenseModifier>>,
    pub weapons: Vec<Weapon>,
}

impl Creature {
    pub fn new(level: i32) -> Creature {
        let base_attributes = HashMap::<Attribute, i32>::new();
        return Creature {
            armor: vec![],
            base_attributes,
            level,
            modifiers: vec![],
            movement_modes: vec![],
            name: None,
            passive_abilities: None,
            senses: None,
            size: sizes::Size::Medium,
            skill_training: None,
            special_attacks: None,
            special_defense_modifiers: None,
            weapons: vec![],
        };
    }

    pub fn add_special_defense_modifier(
        &mut self,
        special_defense_modifier: SpecialDefenseModifier,
    ) {
        if self.special_defense_modifiers.is_none() {
            self.special_defense_modifiers = Some(vec![]);
        }
        self.special_defense_modifiers
            .as_mut()
            .unwrap()
            .push(special_defense_modifier);
    }

    pub fn add_passive_ability(&mut self, ability: PassiveAbility) {
        if self.passive_abilities.is_none() {
            self.passive_abilities = Some(vec![]);
        }
        self.passive_abilities.as_mut().unwrap().push(ability);
    }

    pub fn add_sense(&mut self, sense: Sense) {
        if self.senses.is_none() {
            self.senses = Some(vec![]);
        }
        self.senses.as_mut().unwrap().push(sense);
    }

    pub fn set_level(&mut self, level: i32) {
        self.level = level;
    }

    pub fn set_name(&mut self, name: String) {
        self.name = Some(name);
    }

    pub fn lowercase_name(&self) -> Option<String> {
        if let Some(n) = &self.name {
            return Some(n.to_lowercase());
        } else {
            return None;
        }
    }

    pub fn set_movement_modes(&mut self, movement_modes: Vec<movement_modes::MovementMode>) {
        self.movement_modes = movement_modes;
    }

    pub fn set_size(&mut self, size: sizes::Size) {
        self.size = size;
    }

    pub fn to_latex(&self) -> String {
        return latex::format_creature(self);
    }
}

impl HasModifiers for Creature {
    fn add_modifier(&mut self, modifier: Modifier) {
        self.modifiers.push(modifier);
    }

    fn get_modifiers(&self) -> Vec<&Modifier> {
        return self.modifiers.iter().collect();
    }

    fn calc_total_modifier(&self, mt: ModifierType) -> i32 {
        return self
            .modifiers
            .iter()
            .filter(|m| m.modifier_type() == mt)
            .map(|m| m.value())
            .sum();
    }
}

impl HasAttributes for Creature {
    fn get_base_attribute(&self, attribute: &Attribute) -> i32 {
        let value = if let Some(a) = self.base_attributes.get(attribute) {
            *a
        } else {
            0
        };
        return value + self.calc_total_modifier(ModifierType::BaseAttribute(*attribute));
    }

    fn calc_total_attribute(&self, attribute: &Attribute) -> i32 {
        Attribute::calculate_total(self.get_base_attribute(attribute), self.level)
    }

    fn set_base_attribute(&mut self, attribute: Attribute, value: i32) {
        if let Some(a) = self.base_attributes.get_mut(&attribute) {
            *a = value;
        } else {
            self.base_attributes.insert(attribute, value);
        }
    }
}

// Calculation functions
impl HasDamageAbsorption for Creature {
    fn calc_damage_resistance(&self) -> i32 {
        let dr_from_level = match self.level {
            1 => 2,
            2 => 3,
            3 => 3,
            4 => 3,
            5 => 4,
            6 => 4,
            7 => 5,
            8 => 6,
            9 => 7,
            10 => 8,
            11 => 9,
            12 => 10,
            13 => 11,
            14 => 12,
            15 => 14,
            16 => 15,
            17 => 17,
            18 => 19,
            19 => 22,
            20 => 25,
            21 => 28,
            _ => panic!("Invalid level {}", self.level),
        };

        return dr_from_level
            + (self.get_base_attribute(&Attribute::Constitution) as i32)
            + self.calc_total_modifier(ModifierType::DamageResistance);
    }

    fn calc_hit_points(&self) -> i32 {
        let hp_from_level = match self.level {
            1 => 11,
            2 => 12,
            3 => 13,
            4 => 15,
            5 => 17,
            6 => 19,
            7 => 22,
            8 => 25,
            9 => 28,
            10 => 31,
            11 => 35,
            12 => 39,
            13 => 44,
            14 => 50,
            15 => 56,
            16 => 63,
            17 => 70,
            18 => 78,
            19 => 88,
            20 => 100,
            21 => 115,
            _ => panic!("Invalid level {}", self.level),
        };

        return hp_from_level
            + (self.get_base_attribute(&Attribute::Constitution) as i32) * 2
            + self.calc_total_modifier(ModifierType::HitPoints);
    }
}

impl HasAttacks for Creature {
    fn add_special_attack(&mut self, attack: attacks::Attack) {
        if self.special_attacks.is_none() {
            self.special_attacks = Some(vec![]);
        }
        if let Some(ref mut a) = self.special_attacks {
            a.push(attack);
        }
    }

    fn calc_all_attacks(&self) -> Vec<attacks::Attack> {
        let mut all_attacks: Vec<attacks::Attack> = vec![];
        if let Some(ref special_attacks) = self.special_attacks {
            for a in special_attacks {
                all_attacks.push(a.clone());
            }
        }
        let weapons_without_attacks: Vec<&Weapon> = self
            .get_weapons()
            .into_iter()
            .filter(|weapon| {
                let same_weapon_attack = all_attacks.iter().any(|attack| {
                    if let Some(w) = attack.weapon {
                        return w.name() == weapon.name();
                    } else {
                        return false;
                    }
                });
                return !same_weapon_attack;
            })
            .collect();
        let strikes = attacks::Attack::calc_strikes(weapons_without_attacks);
        for strike in strikes {
            all_attacks.push(strike);
        }
        return all_attacks;
    }

    fn calc_damage_per_round_multiplier(&self) -> f64 {
        return 1.0;
    }

    fn calc_accuracy(&self) -> i32 {
        // note implicit floor due to integer storage
        return self.level / 2
            + self.get_base_attribute(&Attribute::Perception) / 2
            + self.calc_total_modifier(ModifierType::Accuracy);
    }

    fn calc_damage_increments(&self, _is_strike: bool) -> i32 {
        return 0;
    }

    fn calc_power(&self, is_magical: bool) -> i32 {
        if is_magical {
            return self.calc_total_attribute(&Attribute::Willpower)
                + self.calc_total_attribute(&Attribute::Perception) / 2
                + self.calc_total_modifier(ModifierType::MagicalPower);
        } else {
            return self.calc_total_attribute(&Attribute::Strength)
                + self.calc_total_attribute(&Attribute::Perception) / 2
                + self.calc_total_modifier(ModifierType::MundanePower);
        }
    }
}

impl HasArmor for Creature {
    fn add_armor(&mut self, armor: Armor) {
        self.armor.push(armor);
    }

    fn get_armor(&self) -> Vec<&Armor> {
        return self.armor.iter().collect();
    }

    fn calc_encumbrance(&self) -> i32 {
        let armor_encumbrance: i32 = self.get_armor().iter().map(|a| a.encumbrance()).sum();
        return max(
            0,
            armor_encumbrance - self.get_base_attribute(&Attribute::Strength)
                + self.calc_total_modifier(ModifierType::Encumbrance),
        );
    }
}

impl HasWeapons for Creature {
    fn add_weapon(&mut self, weapon: Weapon) {
        self.weapons.push(weapon);
    }

    fn get_weapons(&self) -> Vec<&Weapon> {
        return self.weapons.iter().collect();
    }
}

impl HasDefenses for Creature {
    fn calc_defense(&self, defense: &defenses::Defense) -> i32 {
        let attribute_bonus = if let Some(a) = defense.associated_attribute() {
            self.get_base_attribute(&a)
        } else {
            0
        };
        let armor_bonus = if defense.include_armor_bonus() {
            self.get_armor().iter().map(|a| a.defense()).sum()
        } else {
            0
        };
        return self.level / 2
            + attribute_bonus
            + armor_bonus
            + self.calc_total_modifier(ModifierType::Defense(*defense));
    }
}

impl HasResources for Creature {
    fn calc_resource(&self, resource: &resources::Resource) -> i32 {
        let value = match resource {
            resources::Resource::AttunementPoint => max(0, (self.level + 1) / 6),
            resources::Resource::FatigueTolerance => {
                self.get_base_attribute(&Attribute::Constitution)
                    + self.get_base_attribute(&Attribute::Willpower)
            }
            resources::Resource::InsightPoint => self.get_base_attribute(&Attribute::Intelligence),
            resources::Resource::TrainedSkill => self.get_base_attribute(&Attribute::Intelligence),
        };
        return value + self.calc_total_modifier(ModifierType::Resource(*resource));
    }
}

// No need for explicit funtions here - it's handled by the above functions
impl HasCreatureMechanics for Creature {}

impl HasSkills for Creature {
    fn set_skill_trained(&mut self, skill: Skill, trained: bool) {
        if self.skill_training.is_none() {
            self.skill_training = Some(HashMap::new());
        }
        let ref mut skill_training = self.skill_training.as_mut().unwrap();
        skill_training.insert(skill, trained);
    }

    fn is_skill_trained(&self, skill: &Skill) -> bool {
        if let Some(ref skill_training) = self.skill_training {
            if let Some(p) = skill_training.get(skill) {
                return *p;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    fn calc_skill_modifier(&self, skill: &Skill) -> i32 {
        let attribute = if let Some(ref a) = skill.attribute() {
            self.calc_total_attribute(a)
        } else {
            0
        };
        let training_modifier = if self.is_skill_trained(skill) {
            4 + max(self.level / 2, attribute)
        } else {
            attribute / 2
        };
        let encumbrance_modifier = if skill.apply_encumbrance() {
            self.calc_encumbrance()
        } else {
            0
        };

        return training_modifier - encumbrance_modifier
            + self.calc_total_modifier(ModifierType::Skill(skill.clone()));
    }
}
