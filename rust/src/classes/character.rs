use crate::classes::Class;
use crate::core_mechanics::creatures::attacks::{self, HasAttacks};
use crate::core_mechanics::creatures::{creature, latex, HasCreatureMechanics};
use crate::core_mechanics::{
    Attribute, Defense, HasAttributes, HasDamageAbsorption, HasDefenses, HasResources, Resource,
};
use crate::equipment::{HasWeapons, Weapon, HasArmor, Armor};
use crate::skills::{HasSkills, Skill};

pub struct Character {
    class: Class,
    creature: creature::Creature,
}

impl Character {
    pub fn new(class: Class, level: i32) -> Character {
        return Character {
            class,
            creature: creature::Creature::new(level),
        };
    }

    pub fn set_level(&mut self, level: i32) {
        self.creature.level = level;
    }

    // Currently this creates a Martial Mastery fighter
    pub fn standard_character(&mut self, level: i32) -> Self {
        let mut creature = creature::Creature::new(level);
        creature.add_weapon(Weapon::Totokia);
        creature.set_name("Standard Character".to_string());

        for a in Attribute::all() {
            creature.set_base_attribute(a, 4);
            creature.set_base_attribute(a, 0);
            creature.set_base_attribute(a, 2);
            creature.set_base_attribute(a, 1);
            creature.set_base_attribute(a, 2);
            creature.set_base_attribute(a, 0);
        }

        let character = Self {
            class: Class::Fighter,
            creature,
        };

        return character;
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
            ap = self.calc_resource(&Resource::AttunementPoint),
            ft = self.calc_resource(&Resource::FatigueTolerance),
            ip = self.calc_resource(&Resource::InsightPoint),
            sp = self.calc_resource(&Resource::TrainedSkill),
        );
    }
}

impl HasAttributes for Character {
    fn get_base_attribute(&self, attribute: &Attribute) -> i32 {
        return self.creature.get_base_attribute(attribute);
    }
    fn calc_total_attribute(&self, attribute: &Attribute) -> i32 {
        return self.creature.calc_total_attribute(attribute);
    }
    fn set_base_attribute(&mut self, attribute: Attribute, value: i32) {
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

    fn calc_accuracy(&self) -> i32 {
        return self.creature.calc_accuracy();
    }

    fn calc_damage_per_round_multiplier(&self) -> f64 {
        return 1.0;
    }

    fn calc_damage_increments(&self, is_strike: bool) -> i32 {
        return self.creature.calc_damage_increments(is_strike);
    }

    fn calc_power(&self, is_magical: bool) -> i32 {
        return self.creature.calc_power(is_magical);
    }
}

impl HasArmor for Character {
    fn add_armor(&mut self, armor: Armor) {
        self.creature.add_armor(armor);
    }

    fn get_armor(&self) -> Vec<&Armor> {
        return self.creature.get_armor();
    }

    fn calc_encumbrance(&self) -> i32 {
        return self.creature.calc_encumbrance();
    }
}

impl HasWeapons for Character {
    fn add_weapon(&mut self, weapon: Weapon) {
        self.creature.add_weapon(weapon);
    }

    fn get_weapons(&self) -> Vec<&Weapon> {
        return self.creature.get_weapons();
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
    fn calc_defense(&self, defense: &Defense) -> i32 {
        let mut value = self.creature.calc_defense(defense) + self.class.defense_bonus(defense);
        match defense {
            // TODO: check for light armor
            Defense::Armor => {
                value = value
                    + self.get_base_attribute(&Attribute::Dexterity) / 2
                    + self.get_base_attribute(&Attribute::Constitution) / 2;
            }
            _ => {}
        };
        return value;
    }
}

impl HasResources for Character {
    fn calc_resource(&self, resource: &Resource) -> i32 {
        return self.creature.calc_resource(resource) + self.class.resource_bonus(resource);
    }
}

impl HasSkills for Character {
    fn set_skill_trained(&mut self, skill: Skill, trained: bool) {
        return self.creature.set_skill_trained(skill, trained);
    }

    fn is_skill_trained(&self, skill: &Skill) -> bool {
        return self.creature.is_skill_trained(skill);
    }

    fn calc_skill_modifier(&self, skill: &Skill) -> i32 {
        return self.creature.calc_skill_modifier(skill);
    }
}

// No need for explicit funtions here - it's handled by the above functions
impl HasCreatureMechanics for Character {}

struct StandardMagicBonuses {
    damage_resistance: i32,
    hit_points: i32,
    power: i32,
}

fn calc_standard_magic_bonuses(level: i32) -> StandardMagicBonuses {
    // Wealth is one item of current level, two items of one level lower, and two items of two
    // levels lower.
    // For most characters, power is most important, followed by damage resistance, and finally
    // hit points.
    // The level breakpoints for standard power and DR items are 4/10/16.
    // This ignores legacy items, but assumes that items are acquired as soon as possible. On
    // average, this should make the levels reasonably accurate.
    let mut power = 0;
    let mut dr = 0;
    let mut hp = 0;

    if level >= 16 {
        power += 8;
    } else if level >= 10 {
        power += 4;
    } else if level >= 4 {
        power += 2;
    }

    if level >= 17 {
        dr += 16;
    } else if level >= 11 {
        dr += 8;
    } else if level >= 5 {
        dr += 4;
    }

    if level >= 18 {
        hp += 16;
    } else if level >= 12 {
        hp += 8;
    } else if level >= 6 {
        hp += 4;
    }

    return StandardMagicBonuses {
        damage_resistance: dr,
        hit_points: hp,
        power,
    };
}
