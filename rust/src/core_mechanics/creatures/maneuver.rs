use defenses::Defense;

use crate::core_mechanics::creatures::attacks::Attack;
use crate::core_mechanics::defenses;
use crate::equipment::Weapon;

pub enum Maneuver {
    CertainStrike(i32),
    CrushingStrike(i32),
    PenetratingStrike(i32),
    PowerStrike(i32),
}

impl Maneuver {
    pub fn attack(&self, weapon: Weapon) -> Attack {
        let mut attack = match self {
            Self::CertainStrike(rank) => Attack::from_weapon(weapon)
                .except(|a| a.accuracy += 2 + (rank - 1) / 2)
                .except_hit_damage(|d| d.damage_dice = d.damage_dice.add(-1)),
            Self::CrushingStrike(rank) => Attack::from_weapon(weapon)
                .except_hit_damage(|d| d.damage_dice = d.damage_dice.add((rank - 1) / 2))
                .except(|a| a.defense = Defense::Fortitude),
            Self::PenetratingStrike(rank) => Attack::from_weapon(weapon)
                .except(|a| a.accuracy += (rank - 1) / 2)
                .except(|a| a.defense = Defense::Reflex),
            Self::PowerStrike(rank) => Attack::from_weapon(weapon)
                .except(|a| a.accuracy -= 2)
                .except_hit_damage(|d| d.damage_dice = d.damage_dice.add(1 + (rank - 1) / 2)),
        };
        attack.replaces_weapon = None;
        return attack;
    }
}
