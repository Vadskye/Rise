use crate::core_mechanics::{HasDamageAbsorption, HasVitalWounds};
use crate::creatures::Creature;
use std::cmp::{max, min};

pub trait HasDamageTracking {
    fn apply_vital_wounds_from_damage(&mut self);
    fn remaining_damage_resistance(&self) -> i32;
    fn remaining_hit_points(&self) -> i32;
    fn take_damage(&mut self, damage: i32);
}

impl HasDamageTracking for Creature
where
    Creature: HasDamageAbsorption + HasVitalWounds,
{
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
        self.calc_damage_resistance() - self.damage_resistance_lost
    }

    fn remaining_hit_points(&self) -> i32 {
        self.calc_effective_combat_hit_points() - self.hit_points_lost
    }

    fn take_damage(&mut self, damage: i32) {
        let damage_resisted = min(max(0, self.remaining_damage_resistance()), damage);
        self.damage_resistance_lost += damage_resisted;
        self.hit_points_lost += damage - damage_resisted;
    }
}
