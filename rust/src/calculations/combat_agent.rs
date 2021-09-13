use crate::{core_mechanics::HasDamageAbsorption, creatures::Creature};

pub struct CombatAgent<'a> {
    pub creature: &'a Creature,
    pub damage_taken: i32,
}

impl<'a> CombatAgent<'a> {
    pub fn from_creature(creature: &'a Creature) -> Self {
        return CombatAgent {
            creature,
            damage_taken: 0,
        };
    }

    pub fn total_damage_absorption(&self) -> i32 {
        return self.creature.calc_hit_points() + self.creature.calc_damage_resistance();
    }

    pub fn remaining_damage_absorption(&self) -> i32 {
        return self.total_damage_absorption() - self.damage_taken;
    }

    pub fn is_alive(&self) -> bool {
        return self.remaining_damage_absorption() > 0;
    }

    pub fn take_damage(&mut self, damage: f64) {
        self.damage_taken += damage.ceil() as i32;
    }
}
