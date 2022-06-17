use crate::core_mechanics::abilities::{
    AbilityExtraContext, AbilityMovement, AreaSize, AreaTargets, Targeting,
};
use crate::core_mechanics::attacks::attack_effect::{
    AttackEffectDuration, AttackTriggeredEffect, DebuffEffect,
};
use crate::core_mechanics::{DamageType, Debuff, Defense, SpecialDefenseType, SpeedCategory};
use crate::equipment::Weapon;
use std::cmp::max;
use titlecase::titlecase;

use super::Attack;

#[derive(Clone)]
pub enum Maneuver {
    CertainStrike(i32),
    CrushingStrike(i32),
    ElementalStrike(i32),
    GenericScalingStrike(i32),
    GraspingStrike(i32),
    GreaterHamstring(i32),
    GreaterHeadshot(i32),
    GreaterGraspingStrike(i32),
    Hamstring(i32),
    Headshot(i32),
    MightyStrike(i32),
    MonstrousStrike(i32),
    PenetratingStrike(i32),
    PowerFlurry(i32),
    PouncingStrike(i32),
    RecklessStrike(i32),
    StripTheFlesh(i32),
    TenderizingSmash(i32),
    Whirlwind(i32, i32),
}

fn standard_damage_scaling(rank: i32) -> i32 {
    if rank >= 11 {
        return 24;
    } else if rank >= 9 {
        return 16;
    } else if rank >= 7 {
        return 8;
    } else if rank >= 5 {
        return 4;
    } else if rank >= 3 {
        return 2;
    } else {
        return 0;
    }
}

impl Maneuver {
    pub fn attack(&self, weapon: Weapon) -> Attack {
        let mut attack = match self {
            Self::CertainStrike(rank) => weapon
                .attack()
                .except(|a| a.accuracy += 2 + (rank - 1) / 2)
                .except_hit_damage(|d| d.power_multiplier = 0.5),
            Self::CrushingStrike(rank) => weapon
                .attack()
                .except(|a| a.accuracy -= 1)
                .except(|a| a.defense = Defense::Fortitude)
                .except_hit_damage(|d| d.damage_modifier += standard_damage_scaling(*rank)),
            // TODO: figure out how to use the higher of two powers
            Self::ElementalStrike(rank) => weapon
                .attack()
                .except_hit_damage(|d| {
                    d.damage_types
                        .append(&mut vec![DamageType::Bludgeoning, DamageType::Fire])
                })
                .except_hit_damage(|d| d.damage_modifier += standard_damage_scaling(*rank)),
            Self::GenericScalingStrike(rank) => weapon
                .attack()
                .except_hit_damage(|d| d.damage_modifier += standard_damage_scaling(*rank)),
            Self::GraspingStrike(rank) => weapon
                .attack()
                .except(|a| a.accuracy += (rank - 1) / 2)
                .except_hit_damage(|d| {
                    d.extra_defense_effect =
                        Some((Defense::Fortitude, AttackTriggeredEffect::Grappled));
                    d.power_multiplier = 0.0;
                }),
            Self::GreaterGraspingStrike(rank) => {
                assert_minimum_rank(5, rank, self.name());
                weapon
                    .attack()
                    .except(|a| a.accuracy += (rank - 5) / 2)
                    .except_hit_damage(|d| {
                        d.extra_defense_effect =
                            Some((Defense::Fortitude, AttackTriggeredEffect::Grappled));
                        d.power_multiplier = 0.5;
                    })
            }
            Self::GreaterHamstring(rank) => {
                assert_minimum_rank(6, rank, self.name());
                weapon
                    .attack()
                    .except(|a| a.accuracy += (rank - 3) / 2)
                    .except_hit_damage(|d| {
                        d.power_multiplier = 0.5;
                        d.take_damage_effect = Some(AttackTriggeredEffect::Debuff(DebuffEffect {
                            debuffs: vec![Debuff::Slowed],
                            duration: AttackEffectDuration::Condition,
                            immune_after_effect_ends: false,
                        }));
                    })
            }
            Self::GreaterHeadshot(rank) => {
                assert_minimum_rank(4, rank, self.name());
                weapon
                    .attack()
                    .except(|a| a.accuracy += (rank - 4) / 2)
                    .except_hit_damage(|d| {
                        d.power_multiplier = 0.5;
                        d.take_damage_effect = Some(AttackTriggeredEffect::Debuff(DebuffEffect {
                            debuffs: vec![Debuff::Dazed],
                            duration: AttackEffectDuration::Brief,
                            immune_after_effect_ends: false,
                        }));
                    })
            }
            Self::Hamstring(rank) => {
                assert_minimum_rank(2, rank, self.name());
                weapon
                    .attack()
                    .except(|a| a.accuracy += (rank - 1) / 2)
                    .except_hit_damage(|d| {
                        d.power_multiplier = 0.5;
                        d.lose_hp_effect = Some(AttackTriggeredEffect::Debuff(DebuffEffect {
                            debuffs: vec![Debuff::Slowed],
                            duration: AttackEffectDuration::Condition,
                            immune_after_effect_ends: false,
                        }));
                    })
            }
            Self::Headshot(rank) => weapon
                .attack()
                .except(|a| a.accuracy += (rank - 1) / 2)
                .except_hit_damage(|d| {
                    d.power_multiplier = 0.0;
                    d.take_damage_effect = Some(AttackTriggeredEffect::Debuff(DebuffEffect {
                        debuffs: vec![Debuff::Dazed],
                        duration: AttackEffectDuration::Brief,
                        immune_after_effect_ends: false,
                    }));
                }),
            Self::MightyStrike(rank) => weapon
                .attack()
                .except(|a| a.accuracy -= 2)
                .except_hit_damage(|d| d.damage_modifier += standard_damage_scaling(rank + 4)),
            Self::MonstrousStrike(rank) => weapon
                .attack()
                .except(|a| a.accuracy += max(0, (rank - 3) / 2)),
            Self::PenetratingStrike(rank) => weapon
                .attack()
                .except(|a| a.accuracy += (rank - 1) / 2)
                .except(|a| a.defense = Defense::Reflex)
                .except_hit_damage(|d| d.power_multiplier = 0.5),
            Self::PouncingStrike(rank) => weapon
                .attack()
                .except(|a| {
                    a.accuracy += (rank - 1) / 2;
                    a.extra_context = Some(AbilityExtraContext {
                        cooldown: None,
                        movement: Some(AbilityMovement {
                            move_before_attack: true,
                            requires_straight_line: true,
                            speed: SpeedCategory::Normal,
                        }),
                        suffix: None,
                    });
                })
                .except_hit_damage(|d| d.power_multiplier = 0.5),
            Self::RecklessStrike(rank) => weapon
                .attack()
                .except(|a| {
                    a.extra_context = Some(AbilityExtraContext {
                        cooldown: None,
                        movement: None,
                        suffix: Some(
                            "
                                After making the attack, the $name briefly takes a -2 penalty to all defenses.
                            "
                            .to_string(),
                        ),
                    });
                })
                .except_hit_damage(|d| d.damage_modifier += standard_damage_scaling(rank + 2)),
            Self::StripTheFlesh(rank) => {
                assert_minimum_rank(3, rank, self.name());
                weapon
                    .attack()
                    .except(|a| a.accuracy += (rank - 3) / 2)
                    .except_hit_damage(|d| {
                        d.power_multiplier = 0.0;
                        d.lose_hp_effect = Some(AttackTriggeredEffect::Debuff(DebuffEffect {
                            debuffs: vec![Debuff::Vulnerable(Box::new(
                                SpecialDefenseType::AllDamage,
                            ))],
                            duration: AttackEffectDuration::Condition,
                            immune_after_effect_ends: false,
                        }));
                    })
            }
            Self::TenderizingSmash(rank) => {
                assert_minimum_rank(5, rank, self.name());
                weapon
                    .attack()
                    .except(|a| a.accuracy += (rank - 5) / 2)
                    .except_hit_damage(|d| {
                        d.power_multiplier = 0.0;
                        d.take_damage_effect = Some(AttackTriggeredEffect::Debuff(DebuffEffect {
                            debuffs: vec![Debuff::Stunned],
                            duration: AttackEffectDuration::Brief,
                            immune_after_effect_ends: false,
                        }));
                    })
            }
            Self::PowerFlurry(rank) => weapon
                .attack()
                .except(|a| a.accuracy -= 3)
                .except(|a| a.targeting = Targeting::Strikes(2))
                .except_hit_damage(|d| {
                    if *rank >= 6 {
                        d.damage_modifier += 4
                    } else if *rank >= 4 {
                        d.damage_modifier += 2
                    }
                })
                .except_hit_damage(|d| d.power_multiplier = 0.5),
            Self::Whirlwind(rank, reach) => weapon
                .attack()
                .except(|a| a.accuracy += (rank - 1) / 2)
                .except(|a| {
                    a.targeting =
                        Targeting::Radius(None, AreaSize::Custom(*reach), AreaTargets::Enemies)
                })
                .except_hit_damage(|d| {
                    d.power_multiplier = 0.5;
                }),
        };
        attack.name = self.attack_name(&weapon);
        attack.replaces_weapon = if self.should_replace_weapon() {
            Some(weapon)
        } else {
            None
        };
        return attack;
    }

    pub fn attack_name(&self, weapon: &Weapon) -> String {
        let weapon_name = titlecase(weapon.name.as_str());
        match self {
            Self::CertainStrike(_) => format!("Certain {}", weapon_name),
            Self::CrushingStrike(_) => format!("Crushing {}", weapon_name),
            Self::ElementalStrike(_) => format!("Elemental {}", weapon_name),
            Self::GenericScalingStrike(_) => format!("Generic Scaling {}", weapon_name),
            Self::GraspingStrike(_) => format!("Grasping {}", weapon_name),
            Self::GreaterGraspingStrike(_) => format!("Greater Grasping {}", weapon_name),
            Self::MightyStrike(_) => format!("Mighty {}", weapon_name),
            Self::MonstrousStrike(_) => weapon_name,
            Self::PenetratingStrike(_) => format!("Penetrating {}", weapon_name),
            Self::PouncingStrike(_) => format!("Pouncing {}", weapon_name),
            Self::RecklessStrike(_) => format!("Reckless {}", weapon_name),
            Self::TenderizingSmash(_) => format!("Tenderizing {}", weapon_name),
            Self::Whirlwind(_, _) => format!("Whirlwind {}", weapon_name),
            _ => format!("{} -- {}", self.name(), weapon_name),
        }
    }

    pub fn name(&self) -> &str {
        match self {
            Self::CertainStrike(_) => "Certain Strike",
            Self::CrushingStrike(_) => "Crushing Strike",
            Self::ElementalStrike(_) => "Elemental Strike",
            Self::GenericScalingStrike(_) => "Generic Scaling Strike",
            Self::GraspingStrike(_) => "Grasping Strike",
            Self::GreaterGraspingStrike(_) => "Greater Grasping Strike",
            Self::GreaterHamstring(_) => "Greater Hamstring",
            Self::GreaterHeadshot(_) => "Greater Headshot",
            Self::Hamstring(_) => "Hamstring",
            Self::Headshot(_) => "Headshot",
            Self::MightyStrike(_) => "Mighty Strike",
            Self::MonstrousStrike(_) => "Monstrous Strike",
            Self::PenetratingStrike(_) => "Penetrating Strike",
            Self::PouncingStrike(_) => "Pouncing Strike",
            Self::PowerFlurry(_) => "Power Flurry",
            Self::RecklessStrike(_) => "Reckless Strike",
            Self::StripTheFlesh(_) => "Strip the Flesh",
            Self::TenderizingSmash(_) => "Tenderizing Smash",
            Self::Whirlwind(_, _) => "Whirlwind",
        }
    }

    fn should_replace_weapon(&self) -> bool {
        match self {
            Self::MonstrousStrike(_) => true,
            _ => false,
        }
    }
}

fn assert_minimum_rank(minimum_rank: i32, actual_rank: &i32, name: &str) {
    if actual_rank < &minimum_rank {
        panic!(
            "Maneuver {} requires minimum rank {} instead of {}",
            name, minimum_rank, actual_rank
        );
    }
}
