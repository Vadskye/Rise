use crate::core_mechanics::{
    Attribute, Defense, HasAttributes, HasDamageAbsorption, HasDefenses, HasResources,
    HasVitalWounds, MovementMode, PassiveAbility, Resource, Sense, Size, SpecialDefenseModifier,
    VitalWound,
};

use crate::creatures::attacks;
use crate::creatures::{
    latex, HasDamageTracking, HasModifiers, IdentifiedModifier, Modifier, ModifierType,
};
use crate::equipment::{Armor, HasArmor, Weapon};
use crate::monsters::ChallengeRating;
use crate::skills::{HasSkills, Skill};
use std::cmp::{max, min};
use std::collections::HashMap;

#[derive(Clone)]
pub struct Creature {
    pub anonymous_modifiers: Vec<Modifier>,
    pub base_attributes: HashMap<Attribute, i32>,
    pub category: CreatureCategory,
    pub damage_resistance_lost: i32,
    pub identified_modifiers: Vec<IdentifiedModifier>,
    pub hit_points_lost: i32,
    pub armor: Vec<Armor>,
    pub level: i32,
    pub movement_modes: Vec<MovementMode>,
    pub name: Option<String>,
    pub passive_abilities: Option<Vec<PassiveAbility>>,
    pub senses: Option<Vec<Sense>>,
    pub size: Size,
    pub skill_training: Option<HashMap<Skill, bool>>,
    pub special_attacks: Option<Vec<attacks::Attack>>,
    pub special_defense_modifiers: Option<Vec<SpecialDefenseModifier>>,
    pub vital_wounds: Vec<VitalWound>,
    pub weapons: Vec<Weapon>,
}

#[derive(Clone)]
pub enum CreatureCategory {
    Character,
    Monster(ChallengeRating),
}

impl Creature {
    pub fn new(level: i32, category: CreatureCategory) -> Creature {
        return Creature {
            anonymous_modifiers: vec![],
            armor: vec![],
            base_attributes: HashMap::<Attribute, i32>::new(),
            category,
            damage_resistance_lost: 0,
            hit_points_lost: 0,
            identified_modifiers: vec![],
            level,
            movement_modes: vec![],
            name: None,
            passive_abilities: None,
            senses: None,
            size: Size::Medium,
            skill_training: None,
            special_attacks: None,
            special_defense_modifiers: None,
            vital_wounds: vec![],
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

    pub fn set_name(&mut self, name: &str) {
        self.name = Some(name.to_string());
    }

    pub fn lowercase_name(&self) -> Option<String> {
        if let Some(n) = &self.name {
            return Some(n.to_lowercase());
        } else {
            return None;
        }
    }

    pub fn set_movement_modes(&mut self, movement_modes: Vec<MovementMode>) {
        self.movement_modes = movement_modes;
    }

    pub fn set_size(&mut self, size: Size) {
        self.size = size;
    }

    pub fn to_latex(&self) -> String {
        return latex::format_creature(self);
    }

    pub fn can_recover(&self) -> bool {
        match self.category {
            CreatureCategory::Character => true,
            CreatureCategory::Monster(_) => false,
        }
    }
}

impl HasDefenses for Creature {
    fn calc_defense(&self, defense: &Defense) -> i32 {
        let dex_multiplier: f64 = match self.category {
            CreatureCategory::Character => {
                if let Some(modifier) = self.minimum_dex_modifier() {
                    modifier
                } else {
                    1.0
                }
            }
            CreatureCategory::Monster(_) => 0.5,
        };
        let attribute_bonus = match defense {
            // TODO: check for light armor
            Defense::Armor => {
                self.get_base_attribute(&Attribute::Constitution) / 2
                    + (self.get_base_attribute(&Attribute::Dexterity) as f64 * dex_multiplier)
                        .floor() as i32
            }
            Defense::Fortitude => self.get_base_attribute(&Attribute::Constitution),
            Defense::Reflex => self.get_base_attribute(&Attribute::Dexterity),
            Defense::Mental => self.get_base_attribute(&Attribute::Willpower),
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
    fn calc_resource(&self, resource: &Resource) -> i32 {
        let value = match resource {
            Resource::AttunementPoint => max(0, (self.level + 1) / 6),
            Resource::FatigueTolerance => {
                self.get_base_attribute(&Attribute::Strength)
                    + self.get_base_attribute(&Attribute::Willpower)
            }
            Resource::InsightPoint => self.get_base_attribute(&Attribute::Intelligence),
            Resource::TrainedSkill => self.get_base_attribute(&Attribute::Intelligence),
        };
        return value + self.calc_total_modifier(ModifierType::Resource(*resource));
    }
}

impl HasVitalWounds for Creature {
    fn add_vital_wound(&mut self, vital_wound: VitalWound) {
        if let Some(modifiers) = vital_wound.modifiers() {
            for m in modifiers {
                self.add_modifier(m, None, None);
            }
        }
        self.vital_wounds.push(vital_wound);
    }

    fn calc_vital_roll_modifier(&self) -> i32 {
        match self.category {
            CreatureCategory::Character => {
                self.calc_total_modifier(ModifierType::VitalRoll) - self.vital_wounds.len() as i32
            }
            CreatureCategory::Monster(_) => 0,
        }
    }

    fn generate_vital_wound(&self) -> VitalWound {
        match self.category {
            // TODO: represent character vital wounds more accurately
            // CreatureCategory::Character => VitalWound::vital_roll(self.calc_vital_roll_modifier()),
            CreatureCategory::Character => {
                if self.calc_vital_roll_modifier() >= 0 {
                    VitalWound::NoEffect
                } else {
                    VitalWound::Zero
                }
            }
            CreatureCategory::Monster(_) => VitalWound::Zero,
        }
    }

    fn is_vitally_unconscious(&self) -> bool {
        for vital_wound in &self.vital_wounds {
            if vital_wound.causes_unconsciousness() {
                return true;
            }
        }
        return false;
    }
}

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

impl HasDamageTracking for Creature {
    fn apply_vital_wounds_from_damage(&mut self) {
        if self.remaining_hit_points() < 0 {
            let excess_damage = -self.remaining_hit_points();
            self.hit_points_lost = self.calc_effective_combat_hit_points();
            // One automatic vital wound, plus one more for every increment of half max HP
            let vital_wound_threshold = self.calc_hit_points() / 2;
            let vital_wound_count = 1 + excess_damage / vital_wound_threshold;
            for _ in 0..vital_wound_count {
                self.add_vital_wound(self.generate_vital_wound());
            }
        }
    }

    fn remaining_damage_resistance(&self) -> i32 {
        return self.calc_damage_resistance() - self.damage_resistance_lost;
    }

    fn remaining_hit_points(&self) -> i32 {
        return self.calc_effective_combat_hit_points() - self.hit_points_lost;
    }

    fn take_damage(&mut self, damage: i32) {
        let damage_resisted = min(max(0, self.remaining_damage_resistance()), damage);
        self.damage_resistance_lost += damage_resisted;
        self.hit_points_lost += damage - damage_resisted;
    }
}
