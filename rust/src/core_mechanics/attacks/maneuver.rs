use crate::core_mechanics::abilities::{
    AbilityExtraContext, AbilityMovement, AreaSize, AreaTargets, Targeting,
};
use crate::core_mechanics::attacks::attack_effect::{
    AttackEffectDuration, AttackTriggeredEffect, DebuffEffect,
};
use crate::core_mechanics::{DamageType, Debuff, Defense, SpecialDefenseType, SpeedCategory};
use crate::equipment::Weapon;
use titlecase::titlecase;

use super::Attack;

#[derive(Clone, Debug)]
pub enum Maneuver {
    Armorcrusher,
    ArmorcrusherPlus,
    Armorpiercer,
    ArmorpiercerPlus,
    CertainStrike,
    ElementalStrike(i32),
    GenericScalingStrike(i32),
    GraspingStrike,
    GraspingStrikePlus,
    Hamstring,
    Headshot,
    HeadshotPlus,
    MightyStrike(i32),
    PowerFlurry,
    PouncingStrike,
    RecklessStrike(i32),
    StripTheFlesh,
    Tenderize,
    Whirlwind,
}

fn standard_damage_scaling(rank: i32) -> i32 {
    if rank >= 11 {
        return 32;
    } else if rank >= 9 {
        return 24;
    } else if rank >= 7 {
        return 16;
    } else if rank >= 5 {
        return 8;
    } else if rank >= 3 {
        return 4;
    } else {
        return 2;
    }
}

impl Maneuver {
    pub fn assert_meets_rank_requirement(&self, creature_rank: i32) {
        if creature_rank < self.rank() {
            panic!(
                "Maneuver {} requires minimum rank {} but creature is rank {}",
                self.name(), self.rank(), creature_rank
            );
        }
    }

    pub fn attack(&self, weapon: Weapon) -> Attack {
        let mut attack = match self {
            Self::Armorcrusher => weapon
                .attack()
                .except(|a| a.defense = Defense::Fortitude)
                .except_hit_damage(|d| d.power_multiplier = 0.5),
            Self::ArmorcrusherPlus => weapon
                .attack()
                .except(|a| a.defense = Defense::Fortitude),
            Self::Armorpiercer => weapon
                .attack()
                .except(|a| a.defense = Defense::Reflex)
                .except_hit_damage(|d| d.power_multiplier = 0.5),
            Self::ArmorpiercerPlus => weapon
                .attack()
                .except(|a| a.defense = Defense::Reflex),
            Self::CertainStrike => weapon
                .attack()
                .except(|a| a.accuracy += 2)
                .except_hit_damage(|d| d.power_multiplier = 0.5),
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
            Self::GraspingStrike => weapon
                .attack()
                .except_hit_damage(|d| {
                    d.extra_defense_effect =
                        Some((Defense::Fortitude, AttackTriggeredEffect::Grappled));
                    d.power_multiplier = 0.5;
                }),
            Self::GraspingStrikePlus => {
                weapon
                    .attack()
                    .except_hit_damage(|d| {
                        d.extra_defense_effect =
                            Some((Defense::Fortitude, AttackTriggeredEffect::Grappled));
                    })
            },
            Self::Hamstring => {
                weapon
                    .attack()
                    .except_hit_damage(|d| {
                        d.power_multiplier = 0.5;
                        d.lose_hp_effect = Some(AttackTriggeredEffect::Debuff(DebuffEffect {
                            debuffs: vec![Debuff::Slowed],
                            duration: AttackEffectDuration::Condition,
                            immune_after_effect_ends: false,
                        }));
                    })
            },
            Self::Headshot => weapon
                .attack()
                .except_hit_damage(|d| {
                    d.power_multiplier = 0.5;
                    d.lose_hp_effect = Some(AttackTriggeredEffect::Debuff(DebuffEffect {
                        debuffs: vec![Debuff::Stunned],
                        duration: AttackEffectDuration::Condition,
                        immune_after_effect_ends: false,
                    }));
                }),
            Self::HeadshotPlus => weapon
                .attack()
                .except_hit_damage(|d| {
                    d.power_multiplier = 0.5;
                    d.lose_hp_effect = Some(AttackTriggeredEffect::Debuff(DebuffEffect {
                        debuffs: vec![Debuff::Confused],
                        duration: AttackEffectDuration::Condition,
                        immune_after_effect_ends: false,
                    }));
                }),
            Self::MightyStrike(rank) => weapon
                .attack()
                .except(|a| a.accuracy -= 2)
                .except_hit_damage(|d| d.damage_modifier += standard_damage_scaling(rank + 2)),
            Self::PouncingStrike => weapon
                .attack()
                .except(|a| {
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
                .except(|a| a.accuracy += 1)
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
                .except_hit_damage(|d| d.damage_modifier += standard_damage_scaling(*rank)),
            Self::StripTheFlesh => {
                weapon
                    .attack()
                    .except_hit_damage(|d| {
                        d.power_multiplier = 0.5;
                        d.lose_hp_effect = Some(AttackTriggeredEffect::Debuff(DebuffEffect {
                            debuffs: vec![Debuff::Vulnerable(Box::new(
                                SpecialDefenseType::AllDamage,
                            ))],
                            duration: AttackEffectDuration::Condition,
                            immune_after_effect_ends: false,
                        }));
                    })
            }
            Self::Tenderize => {
                weapon
                    .attack()
                    .except_hit_damage(|d| {
                        d.extra_defense_effect = Some((Defense::Fortitude, AttackTriggeredEffect::Debuff(DebuffEffect {
                            debuffs: vec![Debuff::Dazed],
                            duration: AttackEffectDuration::Condition,
                            immune_after_effect_ends: false,
                        })));
                    })
            }
            Self::PowerFlurry => weapon
                .attack()
                .except(|a| a.accuracy -= 2)
                .except(|a| a.targeting = Targeting::Strikes(2))
                .except_hit_damage(|d| d.power_multiplier = 0.5),
            Self::Whirlwind => weapon
                .attack()
                .except(|a| {
                    a.targeting =
                        Targeting::Radius(None, AreaSize::Tiny, AreaTargets::Enemies)
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
        fn with_prefix(prefix: &str, n: String) -> String {
            return format!("{} {}", prefix, n)
        }
        match self {
            Self::CertainStrike => with_prefix("Certain", weapon_name),
            Self::ElementalStrike(_) => with_prefix("Elemental", weapon_name),
            Self::GenericScalingStrike(_) => with_prefix("Generic Scaling", weapon_name),
            Self::GraspingStrike => with_prefix("Grasping", weapon_name),
            Self::GraspingStrikePlus => with_prefix("Grasping+", weapon_name),
            Self::MightyStrike(_) => with_prefix("Mighty", weapon_name),
            Self::PouncingStrike => with_prefix("Pouncing", weapon_name),
            Self::RecklessStrike(_) => with_prefix("Reckless", weapon_name),
            _ => format!("{} -- {}", self.name(), weapon_name),
        }
    }

    pub fn name(&self) -> &str {
        match self {
            Self::Armorcrusher => "Armorcrusher",
            Self::ArmorcrusherPlus => "Armorcrusher+",
            Self::Armorpiercer => "Armorpiercer",
            Self::ArmorpiercerPlus => "Armorpiercer+",
            Self::CertainStrike => "Certain Strike",
            Self::ElementalStrike(_) => "Elemental Strike",
            Self::GenericScalingStrike(_) => "Generic Scaling Strike",
            Self::GraspingStrike => "Grasping Strike",
            Self::GraspingStrikePlus => "Grasping StrikePlus",
            Self::Hamstring => "Hamstring",
            Self::Headshot => "Headshot",
            Self::HeadshotPlus => "Headshot+",
            Self::MightyStrike(_) => "Mighty Strike",
            Self::PowerFlurry => "Power Flurry",
            Self::PouncingStrike => "Pouncing Strike",
            Self::RecklessStrike(_) => "Reckless Strike",
            Self::StripTheFlesh => "Strip the Flesh",
            Self::Tenderize => "Tenderize",
            Self::Whirlwind => "Whirlwind",
        }
    }

    pub fn rank(&self) -> i32 {
        match self {
            Self::Armorcrusher => 1,
            Self::ArmorcrusherPlus => 3,
            Self::Armorpiercer => 1,
            Self::ArmorpiercerPlus => 3,
            Self::CertainStrike => 1,
            Self::ElementalStrike(_) => 1,
            Self::GenericScalingStrike(_) => 1,
            Self::GraspingStrike => 1,
            Self::GraspingStrikePlus => 5,
            Self::Hamstring => 3,
            Self::Headshot => 3,
            Self::HeadshotPlus => 7,
            Self::MightyStrike(_) => 1,
            Self::PowerFlurry => 3,
            Self::PouncingStrike => 3,
            Self::RecklessStrike(_) => 1,
            Self::StripTheFlesh => 7,
            Self::Tenderize => 5,
            Self::Whirlwind => 1,
        }
    }

    fn should_replace_weapon(&self) -> bool {
        match self {
            _ => false,
        }
    }
}
