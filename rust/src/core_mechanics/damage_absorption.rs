use crate::core_mechanics::{Attribute, HasAttributes};
use crate::creatures::{Creature, CreatureCategory, HasModifiers, ModifierType};
use crate::equipment::HasArmor;

pub trait HasDamageAbsorption {
    fn calc_damage_resistance(&self) -> i32;
    fn calc_hit_points(&self) -> i32;
    fn calc_effective_combat_hit_points(&self) -> i32;
}

impl HasDamageAbsorption for Creature
where
    Creature: HasAttributes + HasModifiers + HasArmor,
{
    fn calc_damage_resistance(&self) -> i32 {
        let dr_from_level = match self.category {
            CreatureCategory::Character => 0,
            CreatureCategory::Monster(_) => {
                // TODO: should this more consistently double every 6 levels at low levels?
                match self.level {
                    1 => 3,
                    2 => 3,
                    3 => 4,
                    4 => 4,
                    5 => 5,
                    6 => 6,
                    7 => 7,
                    8 => 9,
                    9 => 10,
                    10 => 12,
                    11 => 13,
                    12 => 15,
                    13 => 16,
                    14 => 18,
                    15 => 20,
                    16 => 22,
                    17 => 25,
                    18 => 28,
                    19 => 32,
                    20 => 37,
                    21 => 42,
                    _ => panic!("Invalid level {}", self.level),
                }
            }
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

        let hp = hp_from_level
            + self.calc_total_attribute(&Attribute::Constitution)
            + self.calc_total_modifier(ModifierType::HitPoints);

        return match self.category {
            CreatureCategory::Character => hp,
            CreatureCategory::Monster(cr) => (hp as f64 * cr.hp_multiplier()) as i32,
        };
    }

    fn calc_effective_combat_hit_points(&self) -> i32 {
        if self.can_recover() {
            return ((self.calc_hit_points() as f64) * 1.5).floor() as i32;
        } else {
            return self.calc_hit_points();
        }
    }
}
