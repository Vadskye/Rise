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
                1 => 10,
                2 => 11,
                3 => 12,
                4 => 13,
                5 => 14,
                6 => 16,  // +2
                7 => 18,  // +2
                8 => 20,  // +2
                9 => 22,  // +2
                10 => 25, // +3
                11 => 28, // +3
                12 => 32, // +4
                13 => 36, // +4
                14 => 40, // +4
                15 => 44, // +4
                16 => 50, // +6
                17 => 56, // +6
                18 => 64, // +8
                19 => 72, // +8
                20 => 80, // +8
                21 => 88, // +8
                22 => 100, // +12
                _ => panic!("Invalid levelish {}", levelish),
            });
        } else {
            hp_from_level = 9 + levelish;
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
            return ((self.calc_hit_points() as f64) * 1.25).floor() as i32;
        } else {
            return self.calc_hit_points();
        }
    }
}
