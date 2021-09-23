use crate::core_mechanics::{DamageType, Debuff, Defense};
use crate::creatures::attack_effects::{AttackEffectDuration, AttackTriggeredEffect, DebuffEffect};
use crate::creatures::attacks::Attack;
use crate::equipment::{StandardWeapon, Weapon};

#[derive(Clone)]
pub enum Maneuver {
    CertainStrike(i32),
    CrushingStrike(i32),
    ElementalStrike(i32),
    GenericScalingStrike(i32),
    GreaterHamstring(i32),
    Hamstring(i32),
    MonsterAccuracyScaling(i32),
    MonsterDamageScaling(i32),
    PenetratingStrike(i32),
    PowerStrike(i32),
}

impl Maneuver {
    pub fn attack(&self, weapon: Weapon) -> Attack {
        let mut attack = match self {
            Self::CertainStrike(rank) => weapon.attack()
                .except(|a| a.accuracy += 2 + (rank - 1) / 2)
                .except_hit_damage(|d| d.damage_dice = d.damage_dice.add(-2)),
            Self::CrushingStrike(rank) => weapon.attack()
                .except_hit_damage(|d| d.damage_dice = d.damage_dice.add((rank - 1) / 2))
                .except(|a| a.defense = Defense::Fortitude),
            // TODO: figure out how to use the higher of two powers
            Self::ElementalStrike(rank) => weapon.attack()
                .except_hit_damage(|d| {
                    d.damage_types
                        .append(&mut vec![DamageType::Bludgeoning, DamageType::Fire])
                })
                .except_hit_damage(|d| d.damage_dice = d.damage_dice.add((rank - 1) / 2)),
            Self::GenericScalingStrike(rank) => weapon.attack()
                .except_hit_damage(|d| d.damage_dice = d.damage_dice.add((rank - 1) / 2)),
            Self::GreaterHamstring(rank) => weapon.attack()
                .except(|a| a.accuracy += (rank - 3) / 2)
                .except_hit_damage(|d| {
                    d.damage_dice = d.damage_dice.add(-2);
                    d.power_multiplier = 0.5;
                    d.lose_hp_effect = Some(AttackTriggeredEffect::Debuff(DebuffEffect {
                        debuffs: vec![Debuff::Decelerated],
                        duration: AttackEffectDuration::Condition,
                    }));
                }),
            Self::Hamstring(rank) => weapon.attack()
                .except(|a| a.accuracy += (rank - 1) / 2)
                .except_hit_damage(|d| {
                    d.damage_dice = d.damage_dice.add(-1);
                    d.power_multiplier = 0.5;
                    d.lose_hp_effect = Some(AttackTriggeredEffect::Debuff(DebuffEffect {
                        debuffs: vec![Debuff::Slowed],
                        duration: AttackEffectDuration::Condition,
                    }));
                }),
            Self::MonsterAccuracyScaling(rank) => {
                weapon.attack().except(|a| a.accuracy += (rank - 3) / 2)
            }
            Self::MonsterDamageScaling(rank) => weapon.attack()
                .except_hit_damage(|d| d.damage_dice = d.damage_dice.add((rank - 1) / 2)),
            Self::PenetratingStrike(rank) => weapon.attack()
                .except(|a| a.accuracy += (rank - 1) / 2)
                .except(|a| a.defense = Defense::Reflex),
            Self::PowerStrike(rank) => weapon.attack()
                .except(|a| a.accuracy -= 2)
                .except_hit_damage(|d| d.damage_dice = d.damage_dice.add(2 + (rank - 1) / 2)),
        };
        attack.name = format!("{} {}", attack.name, self.name());
        attack.replaces_weapon = if self.should_replace_weapon() {
            Some(weapon)
        } else {
            None
        };
        return attack;
    }

    fn should_replace_weapon(&self) -> bool {
        match self {
            Self::MonsterAccuracyScaling(_) => true,
            Self::MonsterDamageScaling(_) => true,
            _ => false,
        }
    }

    pub fn name(&self) -> &str {
        match self {
            Self::CertainStrike(_) => "Certain Strike",
            Self::CrushingStrike(_) => "Crushing Strike",
            Self::ElementalStrike(_) => "Elemental Strike",
            Self::GenericScalingStrike(_) => "Generic Scaling Strike",
            Self::GreaterHamstring(_) => "Greater Hamstring",
            Self::Hamstring(_) => "Hamstring",
            Self::MonsterAccuracyScaling(_) => "",
            Self::MonsterDamageScaling(_) => "",
            Self::PenetratingStrike(_) => "Penetrating Strike",
            Self::PowerStrike(_) => "Power Strike",
        }
    }
}
