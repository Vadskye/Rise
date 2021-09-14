use crate::core_mechanics::{
    Attribute, Defense, HasAttributes, HasDamageAbsorption, HasDefenses, HasResources,
    HasVitalWounds, MovementMode, PassiveAbility, Resource, Sense, Size, SpecialDefenseModifier,
    VitalWound,
};
use crate::creatures::attack_effects::AttackEffect;
use crate::creatures::attacks::{self, Attack, HasAttacks};
use crate::creatures::{latex, HasDamageTracking, HasModifiers, Maneuver, Modifier, ModifierType};
use crate::equipment::{Armor, HasArmor, HasWeapons, Weapon};
use crate::monsters::ChallengeRating;
use crate::skills::{HasSkills, Skill};
use std::cmp::{max, min};
use std::collections::HashMap;

pub struct Creature {
    anonymous_modifiers: Vec<Modifier>,
    base_attributes: HashMap<Attribute, i32>,
    category: CreatureCategory,
    pub damage_resistance_lost: i32,
    identified_modifiers: Vec<IdentifiedModifier>,
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

struct IdentifiedModifier {
    modifier: Modifier,
    source: String,
    priority: i32,
}

impl IdentifiedModifier {
    fn key(&self) -> String {
        return format!("{} {}", self.source, self.modifier.name());
    }

    fn replaces(&self, other: &Self) -> bool {
        return self.key() == other.key() && self.priority > other.priority;
    }
}

impl HasModifiers for Creature {
    fn add_modifier(&mut self, modifier: Modifier, source: Option<&str>, priority: Option<i32>) {
        if let Some(source) = source {
            let priority = priority.unwrap_or(0);
            let identified_modifier = IdentifiedModifier {
                modifier,
                source: source.to_string(),
                priority,
            };
            self.identified_modifiers
                .retain(|im| !identified_modifier.replaces(im));
            if self
                .identified_modifiers
                .iter()
                .filter(|im| im.replaces(&identified_modifier))
                .count()
                == 0
            {
                self.identified_modifiers.push(identified_modifier);
            }
        } else {
            self.anonymous_modifiers.push(modifier);
        }
    }

    fn add_magic_modifier(&mut self, modifier: Modifier) {
        let value = modifier.value();
        self.add_modifier(modifier, Some("magic"), Some(value));
    }

    fn get_modifiers(&self) -> Vec<&Modifier> {
        let mut modifiers: Vec<&Modifier> = self
            .identified_modifiers
            .iter()
            .map(|im| &im.modifier)
            .collect();
        for m in &self.anonymous_modifiers {
            modifiers.push(m);
        }
        return modifiers;
    }

    fn get_modifiers_by_source(&self, source: &str) -> Vec<&Modifier> {
        return self
            .identified_modifiers
            .iter()
            .filter(|im| im.source == source)
            .map(|im| &im.modifier)
            .collect();
    }

    fn calc_total_modifier(&self, mt: ModifierType) -> i32 {
        return self
            .get_modifiers()
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
        let mut dr_from_level = match self.level {
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

        let dr_from_level = match self.category {
            CreatureCategory::Character => dr_from_level,
            CreatureCategory::Monster(_) => dr_from_level * 3,
        };

        let dr_from_armor: i32 = self.get_armor().iter().map(|a| a.damage_resistance()).sum();

        let dr = dr_from_level
            + self.calc_total_attribute(&Attribute::Constitution)
            + dr_from_armor
            + self.calc_total_modifier(ModifierType::DamageResistance);

        return match self.category {
            CreatureCategory::Character => dr,
            CreatureCategory::Monster(cr) => (dr as f64 * cr.dr_multiplier()) as i32,
        };
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

        let hp_from_level = match self.category {
            CreatureCategory::Character => hp_from_level,
            CreatureCategory::Monster(_) => (hp_from_level as f64 * 1.5) as i32,
        };

        let hp = hp_from_level
            + self.calc_total_attribute(&Attribute::Constitution)
            + self.calc_total_modifier(ModifierType::HitPoints);

        return match self.category {
            CreatureCategory::Character => hp,
            CreatureCategory::Monster(cr) => (hp as f64 * cr.hp_multiplier()) as i32,
        };
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

        for attack in self
            .get_modifiers()
            .iter()
            .map(|m| m.attack_definition())
            .collect::<Vec<Option<&Attack>>>()
        {
            if let Some(a) = attack {
                all_attacks.push(a.clone());
            }
        }

        for maneuver in self
            .get_modifiers()
            .iter()
            .map(|m| m.maneuver_definition())
            .collect::<Vec<Option<&Maneuver>>>()
        {
            if let Some(m) = maneuver {
                for weapon in self.get_weapons() {
                    all_attacks.push(m.attack(weapon.clone()));
                }
            }
        }

        let weapons_without_attacks: Vec<&Weapon> = self
            .get_weapons()
            .into_iter()
            .filter(|weapon| {
                let same_weapon_attack = all_attacks.iter().any(|attack| {
                    if let Some(w) = attack.replaces_weapon {
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

        if let CreatureCategory::Monster(cr) = self.category {
            for attack in &mut all_attacks {
                if let AttackEffect::Damage(ref mut e) = attack.hit {
                    e.damage_dice = e.damage_dice.add(cr.damage_increments());
                }
            }
        }

        if self.calc_total_modifier(ModifierType::EnableGlancingStrikes) > 0 {
            for attack in &mut all_attacks {
                if attack.is_strike && attack.glance.is_none() {
                    attack.glance = Some(AttackEffect::HalfDamage);
                }
            }
        }
        return all_attacks;
    }

    fn calc_damage_per_round_multiplier(&self) -> f64 {
        match self.category {
            CreatureCategory::Character => 1.0,
            CreatureCategory::Monster(cr) => cr.damage_per_round_multiplier(),
        }
    }

    fn calc_accuracy(&self) -> i32 {
        // note implicit floor due to integer storage
        return self.level / 2
            + self.get_base_attribute(&Attribute::Perception) / 2
            + self.calc_total_modifier(ModifierType::Accuracy);
    }

    fn calc_damage_increments(&self, is_strike: bool) -> i32 {
        let mut increments: i32 = 0;
        if is_strike {
            increments += self.calc_total_modifier(ModifierType::StrikeDamageDice);
        }
        increments += match self.category {
            CreatureCategory::Character => 0,
            CreatureCategory::Monster(cr) => cr.damage_increments(),
        };
        return increments;
    }

    fn calc_power(&self, is_magical: bool) -> i32 {
        if is_magical {
            return self.calc_total_attribute(&Attribute::Willpower) / 2
                + self.calc_total_modifier(ModifierType::MagicalPower);
        } else {
            return self.calc_total_attribute(&Attribute::Strength) / 2
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
    fn calc_defense(&self, defense: &Defense) -> i32 {
        let attribute_bonus = match defense {
            // TODO: check for light armor
            Defense::Armor => {
                self.get_base_attribute(&Attribute::Dexterity) / 2
                    + self.get_base_attribute(&Attribute::Constitution) / 2
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
            CreatureCategory::Character => VitalWound::vital_roll(self.calc_vital_roll_modifier()),
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
            self.hit_points_lost = self.calc_hit_points();
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
        return self.calc_hit_points() - self.damage_resistance_lost;
    }

    fn take_damage(&mut self, damage: i32) {
        let damage_resisted = min(self.remaining_damage_resistance(), damage);
        self.damage_resistance_lost += damage_resisted;
        self.hit_points_lost += damage - damage_resisted;
    }
}
