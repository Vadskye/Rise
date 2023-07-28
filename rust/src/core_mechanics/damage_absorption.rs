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
        let mut levelish = calc_levelish(self, 0, ModifierType::DamageResistanceFromLevel);
        let mut dr_from_level = 0;
        if levelish > 0 {
            if levelish > 21 {
                // +5 DR for each point beyond 21
                dr_from_level = (levelish - 21) * 5;
                levelish = 21;
            }
            dr_from_level += match levelish {
                1 => 0,
                2 => 1,
                3 => 2,
                4 => 3,
                5 => 4,
                6 => 5,
                7 => 6,
                8 => 7,
                9 => 8,
                10 => 9,
                11 => 10,
                12 => 12,
                13 => 14,
                14 => 16,
                15 => 18,
                16 => 20,
                17 => 22,
                18 => 25,
                19 => 28,
                20 => 31,
                21 => 35,
                _ => panic!("Invalid levelish {}", levelish),
            };
        }

        let dr_from_armor: i32 = self.get_armor().iter().map(|a| a.damage_resistance()).sum();

        let dr = dr_from_level
            + dr_from_armor
            + self.calc_total_modifier(ModifierType::DamageResistance);

        match self.category {
            CreatureCategory::Character => dr,
            CreatureCategory::Monster(cr) => (dr as f64 * cr.dr_multiplier()) as i32,
        }
    }

    fn calc_hit_points(&self) -> i32 {
        let mut levelish = calc_levelish(
            self,
            self.get_base_attribute(&Attribute::Constitution),
            ModifierType::HitPointsFromLevel,
        );
        let mut hp_from_level = 0;
        if levelish > 0 {
            if levelish > 21 {
                // +10 HP for each point beyond 21
                hp_from_level = (levelish - 21) * 10;
                levelish = 21;
            }
            hp_from_level += match levelish {
                1 => 6,
                2 => 7,
                3 => 8,
                4 => 9,
                5 => 10,
                6 => 12,  // +2
                7 => 14,  // +2
                8 => 16,  // +2
                9 => 18,  // +2
                10 => 20, // +3
                11 => 22, // +3
                12 => 25, // +4
                13 => 28, // +4
                14 => 32, // +4
                15 => 36, // +4
                16 => 40, // +6
                17 => 45, // +6
                18 => 50, // +8
                19 => 56, // +8
                20 => 63, // +8
                21 => 70, // +10
                _ => panic!("Invalid levelish {}", levelish),
            }
        } else {
            hp_from_level = 5 + (levelish / 2);
        }

        let hp = hp_from_level + self.calc_total_modifier(ModifierType::HitPoints);

        match self.category {
            CreatureCategory::Character => hp,
            CreatureCategory::Monster(cr) => (hp as f64 * cr.hp_multiplier()) as i32,
        }
    }

    fn calc_effective_combat_hit_points(&self) -> i32 {
        if self.can_recover() {
            ((self.calc_hit_points() as f64) * 1.25).floor() as i32
        } else {
            self.calc_hit_points()
        }
    }
}

fn calc_levelish(creature: &Creature, attribute_modifier: i32, mt: ModifierType) -> i32 {
    creature.level + attribute_modifier + creature.calc_total_modifier(mt)
}
