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
        let mut levelish = self.level + self.get_base_attribute(&Attribute::Constitution);
        let mut dr_from_level = 0;
        if levelish > 0 {
            let mut multiplier = 1;
            while levelish > 21 {
                levelish -= 6;
                multiplier += 1;
            }
            dr_from_level += multiplier * (match levelish {
                1 => 1,
                2 => 2,
                3 => 3,
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
                20 => 36,
                21 => 40,
                _ => panic!("Invalid levelish {}", levelish),
            });
        }

        let dr_from_armor: i32 = self.get_armor().iter().map(|a| a.damage_resistance()).sum();

        let dr = dr_from_level
            + dr_from_armor
            + self.calc_total_modifier(ModifierType::DamageResistance);

        return match self.category {
            CreatureCategory::Character => dr,
            CreatureCategory::Monster(cr) => (dr as f64 * cr.dr_multiplier()) as i32,
        };
    }

    fn calc_hit_points(&self) -> i32 {
        let mut levelish = self.level + self.get_base_attribute(&Attribute::Constitution);
        let hp_from_level;
        if levelish > 0 {
            let mut multiplier = 1;
            while levelish > 21 {
                levelish -= 6;
                multiplier += 1;
            }
            hp_from_level = multiplier * (match levelish {
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
                21 => 112,
                _ => panic!("Invalid levelish {}", levelish),
            });
        } else {
            hp_from_level = 10 + levelish;
        }

        let hp = hp_from_level
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
