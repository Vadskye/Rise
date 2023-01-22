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
        let mut levelish = calc_levelish(self, &Attribute::Willpower);
        let mut dr_from_level = 0;
        if levelish > 0 {
            if levelish > 21 {
                // +4 DR for each point beyond 21
                dr_from_level = (levelish - 21) * 4;
                levelish = 21;
            }
            dr_from_level += match levelish {
                1 => 2,
                2 => 3,
                3 => 4,
                4 => 5,
                5 => 6,
                6 => 7,
                7 => 8,
                8 => 10,
                9 => 12,
                10 => 14,
                11 => 16,
                12 => 18,
                13 => 20,
                14 => 23,
                15 => 26,
                16 => 29,
                17 => 32,
                18 => 35,
                19 => 38,
                20 => 42,
                21 => 46,
                _ => panic!("Invalid levelish {}", levelish),
            };
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
        let mut levelish = calc_levelish(self, &Attribute::Constitution);
        let mut hp_from_level = 0;
        if levelish > 0 {
            if levelish > 21 {
                // +10 HP for each point beyond 21
                hp_from_level = (levelish - 21) * 10;
                levelish = 21;
            }
            hp_from_level += match levelish {
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
                21 => 90, // +10
                _ => panic!("Invalid levelish {}", levelish),
            }
        } else {
            hp_from_level = 9 + levelish;
        }

        let hp = hp_from_level + self.calc_total_modifier(ModifierType::HitPoints);

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

fn calc_levelish(creature: &Creature, attribute: &Attribute) -> i32 {
    let attribute_multiplier = match creature.category {
        CreatureCategory::Character => 1.0,
        CreatureCategory::Monster(_) => 0.5,
    };
    return creature.level
        + (creature.get_base_attribute(attribute) as f64 * attribute_multiplier).floor() as i32;
}
