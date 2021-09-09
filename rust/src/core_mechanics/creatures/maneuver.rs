use defenses::Defense;

use crate::core_mechanics::creatures::attacks::Attack;
use crate::core_mechanics::{defenses, DamageType};
use crate::equipment::Weapon;

#[derive(Clone)]
pub enum Maneuver {
    CertainStrike(i32),
    CrushingStrike(i32),
    ElementalStrike(i32),
    PenetratingStrike(i32),
    PowerStrike(i32),
}

impl Maneuver {
    pub fn attack(&self, weapon: Weapon) -> Attack {
        let mut attack = match self {
            Self::CertainStrike(rank) => Attack::from_weapon(weapon)
                .except(|a| a.accuracy += 3 + (rank - 1) / 2)
                .except_hit_damage(|d| d.damage_dice = d.damage_dice.add(-2)),
            Self::CrushingStrike(rank) => Attack::from_weapon(weapon)
                .except_hit_damage(|d| d.damage_dice = d.damage_dice.add((rank - 1) / 2))
                .except(|a| a.defense = Defense::Fortitude),
            // TODO: figure out how to use the higher of two powers
            Self::ElementalStrike(rank) => Attack::from_weapon(weapon)
                .except_hit_damage(|d| {
                    d.damage_types
                        .append(&mut vec![DamageType::Bludgeoning, DamageType::Fire])
                })
                .except_hit_damage(|d| d.damage_dice = d.damage_dice.add((rank - 1) / 2)),
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

    pub fn name(&self) -> &str {
        match self {
            Self::CertainStrike(_) => "Certain Strike",
            Self::CrushingStrike(_) => "Crushing Strike",
            Self::ElementalStrike(_) => "Elemental Strike",
            Self::PenetratingStrike(_) => "Penetrating Strike",
            Self::PowerStrike(_) => "Power Strike",
        }
    }
}
