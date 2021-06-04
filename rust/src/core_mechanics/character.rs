use crate::classes::Class;
use crate::core_mechanics::attacks::{self, HasAttacks};
use crate::core_mechanics::attributes::{Attribute, HasAttributes};
use crate::core_mechanics::damage_absorption::HasDamageAbsorption;
use crate::core_mechanics::defenses::HasDefenses;
use crate::core_mechanics::resources::HasResources;
use crate::core_mechanics::{creature, defenses, latex, resources, HasCreatureMechanics};
use crate::equipment::{weapons, HasEquipment};

pub struct Character {
    class: Class,
    creature: creature::Creature,
}

impl Character {
    pub fn new(class: Class, level: i8) -> Character {
        return Character {
            class,
            creature: creature::Creature::new(level),
        };
    }

    pub fn set_level(&mut self, level: i8) {
        self.creature.level = level;
    }

    pub fn to_latex(&self) -> String {
        return format!(
            "
                {creature_latex}
                {class_name} {level}
                AP {ap}, FT {ft}, IP {ip}, SP {sp}
            ",
            creature_latex = latex::format_creature(self),
            class_name = self.class.name(),
            level = self.creature.level,
            ap = self.calc_resource(resources::AP),
            ft = self.calc_resource(resources::FT),
            ip = self.calc_resource(resources::IP),
            sp = self.calc_resource(resources::SP),
        );
    }
}

impl HasAttributes for Character {
    fn get_base_attribute(&self, attribute: &'static Attribute) -> i8 {
        return self.creature.get_base_attribute(attribute);
    }
    fn calc_total_attribute(&self, attribute: &'static Attribute) -> i8 {
        return self.creature.calc_total_attribute(attribute);
    }
    fn set_base_attribute(&mut self, attribute: &'static Attribute, value: i8) {
        self.creature.set_base_attribute(attribute, value);
    }
}

impl HasAttacks for Character {
    fn add_special_attack(&mut self, attack: attacks::Attack) {
        self.creature.add_special_attack(attack);
    }

    fn calc_all_attacks(&self) -> Vec<attacks::Attack> {
        return self.creature.calc_all_attacks();
    }

    fn calc_accuracy(&self) -> i8 {
        return self.creature.calc_accuracy();
    }

    fn calc_damage_per_round_multiplier(&self) -> f64 {
        return 1.0;
    }

    fn calc_damage_increments(&self, is_strike: bool) -> i8 {
        return self.creature.calc_damage_increments(is_strike);
    }

    fn calc_power(&self, is_magical: bool) -> i8 {
        return self.creature.calc_power(is_magical);
    }
}

impl HasEquipment for Character {
    fn add_weapon(&mut self, weapon: weapons::Weapon) {
        self.creature.add_weapon(weapon);
    }

    fn weapons(&self) -> Vec<&weapons::Weapon> {
        return self.creature.weapons();
    }
}

impl HasDamageAbsorption for Character {
    fn calc_damage_resistance(&self) -> i32 {
        return self.creature.calc_damage_resistance();
    }

    fn calc_hit_points(&self) -> i32 {
        return self.creature.calc_hit_points();
    }
}

impl HasDefenses for Character {
    fn calc_defense(&self, defense: &defenses::Defense) -> i8 {
        return self.creature.calc_defense(defense) + self.class.defense_bonus(defense);
    }
}

impl HasResources for Character {
    fn calc_resource(&self, resource: &'static resources::Resource) -> i8 {
        return self.creature.calc_resource(resource) + self.class.resource_bonus(resource);
    }
}

// No need for explicit funtions here - it's handled by the above functions
impl HasCreatureMechanics for Character {}
