use crate::core_mechanics::attacks::{self, HasAttacks};
use crate::core_mechanics::attributes::{Attribute, HasAttributes};
use crate::core_mechanics::damage_absorption::HasDamageAbsorption;
use crate::core_mechanics::defenses::{self, HasDefenses, SpecialDefenseModifier};
use crate::core_mechanics::latex;
use crate::core_mechanics::movement_modes;
use crate::core_mechanics::resources::{self, HasResources};
use crate::core_mechanics::sizes;
use crate::core_mechanics::HasCreatureMechanics;
use crate::equipment::{weapons, HasEquipment};
use crate::skills::{HasSkills, Skill};
use std::cmp::{max, min};
use std::collections::HashMap;
use crate::core_mechanics::passive_abilities::PassiveAbility;
use crate::core_mechanics::senses::Sense;

pub struct Creature {
    base_attributes: HashMap<Attribute, i32>,
    pub name: Option<String>,
    pub level: i32,
    pub movement_modes: Vec<movement_modes::MovementMode>,
    pub passive_abilities: Option<Vec<PassiveAbility>>,
    pub senses: Option<Vec<Sense>>,
    pub size: sizes::Size,
    pub skill_points: Option<HashMap<Skill, i32>>,
    pub special_attacks: Option<Vec<attacks::Attack>>,
    pub special_defense_modifiers: Option<Vec<SpecialDefenseModifier>>,
    pub weapons: Vec<weapons::Weapon>,
}

impl Creature {
    pub fn new(level: i32) -> Creature {
        let base_attributes = HashMap::<Attribute, i32>::new();
        return Creature {
            base_attributes,
            level,
            movement_modes: vec![],
            name: None,
            passive_abilities: None,
            senses: None,
            size: sizes::Size::Medium,
            skill_points: None,
            special_attacks: None,
            special_defense_modifiers: None,
            weapons: vec![],
        };
    }

    pub fn add_special_defense_modifier(&mut self, special_defense_modifier: SpecialDefenseModifier) {
        if self.special_defense_modifiers.is_none() {
            self.special_defense_modifiers = Some(vec![]);
        }
        self.special_defense_modifiers.as_mut().unwrap().push(special_defense_modifier);
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

impl HasAttributes for Creature {
    fn get_base_attribute(&self, attribute: &Attribute) -> i32 {
        if let Some(a) = self.base_attributes.get(attribute) {
            *a
        } else {
            0
        }
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

        return dr_from_level + (self.get_base_attribute(&Attribute::Constitution) as i32) / 2;
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

        return hp_from_level + self.get_base_attribute(&Attribute::Constitution) as i32;
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
        let weapons_without_attacks: Vec<&weapons::Weapon> = self
            .weapons()
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
        return self.level + self.get_base_attribute(&Attribute::Perception) / 2;
    }

    fn calc_damage_increments(&self, _is_strike: bool) -> i32 {
        return 0;
    }

    fn calc_power(&self, is_magical: bool) -> i32 {
        if is_magical {
            return self.calc_total_attribute(&Attribute::Willpower) / 2;
        } else {
            return self.calc_total_attribute(&Attribute::Strength) / 2;
        }
    }
}

impl HasEquipment for Creature {
    fn add_weapon(&mut self, weapon: weapons::Weapon) {
        self.weapons.push(weapon);
    }

    fn weapons(&self) -> Vec<&weapons::Weapon> {
        return self.weapons.iter().collect();
    }
}

impl HasDefenses for Creature {
    fn calc_defense(&self, defense: &defenses::Defense) -> i32 {
        return self.level + self.get_base_attribute(defense.associated_attribute());
    }
}

impl HasResources for Creature {
    fn calc_resource(&self, resource: &'static resources::Resource) -> i32 {
        match resource {
            resources::Resource::AttunementPoint => {
                let mut ap_from_level = max(0, min(self.level, 5) - 1);
                if self.level >= 11 {
                    ap_from_level += 1;
                };
                if self.level >= 17 {
                    ap_from_level += 1;
                };
                return ap_from_level;
            }
            resources::Resource::FatigueTolerance => {
                self.get_base_attribute(&Attribute::Constitution)
                    + self.get_base_attribute(&Attribute::Willpower)
            }
            resources::Resource::InsightPoint => self.get_base_attribute(&Attribute::Intelligence),
            resources::Resource::SkillPoint => {
                (self.get_base_attribute(&Attribute::Intelligence)) * 2
            }
        }
    }
}

// No need for explicit funtions here - it's handled by the above functions
impl HasCreatureMechanics for Creature {}

impl HasSkills for Creature {
    fn set_skill_points(&mut self, skill: Skill, value: i32) {
        if self.skill_points.is_none() {
            self.skill_points = Some(HashMap::new());
        }
        let ref mut skill_points = self.skill_points.as_mut().unwrap();
        skill_points.insert(skill, value);
    }

    fn get_skill_points(&self, skill: &Skill) -> i32 {
        if let Some(ref skill_points) = self.skill_points {
            if let Some(p) = skill_points.get(skill) {
                return *p;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }

    fn calc_skill_modifier(&self, skill: &Skill) -> i32 {
        let attribute_modifier = if let Some(ref a) = skill.attribute() {
            self.get_base_attribute(a)
        } else {
            0
        };
        let skill_points = self.get_skill_points(skill);
        let level_modifier = match skill_points {
            0 => 0,
            1 => 1 + self.level / 2,
            2 => 2 + self.level,
            3 => 2 + self.level,
            _ => panic!("Invalid number of skill points {}", skill_points),
        };
        return level_modifier + attribute_modifier;
    }
}
