use crate::core_mechanics::abilities::{
    AbilityExtraContext, AbilityMovement, AreaSize, AreaTargets, Targeting,
};
use crate::core_mechanics::attacks::attack_effect::{
    AttackEffectDuration, AttackTriggeredEffect, DebuffEffect,
};
use crate::core_mechanics::{
    DamageType, Debuff, Defense, DicePool, Die, PowerScaling, SpecialDefenseType, SpeedCategory,
};
use crate::equipment::Weapon;
use std::cmp::{max,min};
use titlecase::titlecase;

use super::Attack;

#[derive(Clone, Debug)]
pub enum Maneuver {
    Armorcrusher,
    ArmorcrusherPlus,
    Armorpiercer,
    ArmorpiercerPlus,
    CertainStrike,
    CertainStrikePlus,
    ElementalStrike(i32),
    GenericScalingStrike(i32),
    GraspingStrike,
    GraspingStrikePlus,
    Hamstring,
    Headshot,
    HeadshotPlus,
    PowerStrike,
    PowerStrikePlus,
    DoubleStrike,
    PouncingStrike,
    RecklessStrike,
    StripTheFlesh,
    Tenderize,
    Whirlwind,
}

impl Maneuver {
    pub fn assert_meets_rank_requirement(&self, creature_rank: i32) {
        if creature_rank < self.rank() {
            panic!(
                "Maneuver {} requires minimum rank {} but creature is rank {}",
                self.name(),
                self.rank(),
                creature_rank
            );
        }
    }

    pub fn is_magical(&self) -> bool {
        // TODO: return true once we add any magical maneuvers
        return false;
    }

    pub fn attack(&self, weapon: Weapon, creature_rank: i32) -> Attack {
        let mut attack = match self {
            Self::Armorcrusher => weapon
                .attack()
                .except(|a| a.defense = Defense::Fortitude)
                .except_hit_damage(|d| d.base_dice = d.base_dice.weak()),
            Self::ArmorcrusherPlus => weapon
                .attack()
                .except(|a| a.defense = Defense::Fortitude),
            Self::Armorpiercer => weapon
                .attack()
                .except(|a| a.defense = Defense::Reflex)
                .except_hit_damage(|d| d.base_dice = d.base_dice.weak()),
            Self::ArmorpiercerPlus => weapon
                .attack()
                .except(|a| a.defense = Defense::Reflex),
            Self::CertainStrike => weapon
                .attack()
                .except(|a| a.accuracy += 3)
                .except_hit_damage(|d| d.base_dice = d.base_dice.weak()),
            Self::CertainStrikePlus => weapon
                .attack()
                .except(|a| a.accuracy += 5),
            // TODO: figure out how to use the higher of two powers
            Self::ElementalStrike(rank) => weapon
                .attack()
                .except_hit_damage(|d| {
                    d.damage_types
                        .append(&mut vec![DamageType::Bludgeoning, DamageType::Fire])
                })
                .except_hit_damage(|d| match rank {
                    3 => d.base_dice = d.base_dice.add_die(Die::d4()),
                    4 => d.power_scalings.push(PowerScaling {
                        dice: Some(DicePool::d4()),
                        power_per_dice: 4,
                        power_per_increment: 0,
                    }),
                    5 => d.power_scalings.push(PowerScaling {
                        dice: Some(DicePool::d6()),
                        power_per_dice: 4,
                        power_per_increment: 0,
                    }),
                    6 => d.power_scalings.push(PowerScaling {
                        dice: Some(DicePool::d6()),
                        power_per_dice: 3,
                        power_per_increment: 0,
                    }),
                    7 => d.power_scalings.push(PowerScaling {
                        dice: Some(DicePool::d10()),
                        power_per_dice: 3,
                        power_per_increment: 0,
                    }),
                    _ => {},
                }),
            Self::GenericScalingStrike(rank) => weapon
                .attack()
                // +1a at rank 2 and rank 3
                .except(|a| a.accuracy += max(0, min(2, rank - 1)))
                .except_hit_damage(|d| match rank {
                    4 => d.base_dice = d.base_dice.add_die(Die::d4()),
                    5 => d.power_scalings.push(PowerScaling {
                        dice: Some(DicePool::d4()),
                        power_per_dice: 4,
                        power_per_increment: 0,
                    }),
                    6 => d.power_scalings.push(PowerScaling {
                        dice: Some(DicePool::d6()),
                        power_per_dice: 4,
                        power_per_increment: 0,
                    }),
                    7 => d.power_scalings.push(PowerScaling {
                        dice: Some(DicePool::d6()),
                        power_per_dice: 3,
                        power_per_increment: 0,
                    }),
                    _ => {},
                }),
            Self::GraspingStrike => weapon
                .attack()
                .except_hit_damage(|d| {
                    d.extra_defense_effect =
                        Some((Defense::Fortitude, AttackTriggeredEffect::Grappled));
                }),
            Self::GraspingStrikePlus => {
                weapon
                    .attack()
                    .except_hit_damage(|d| {
                        d.extra_defense_effect =
                            Some((Defense::Fortitude, AttackTriggeredEffect::Grappled));
                        d.base_dice = d.base_dice.multiply(2)
                    })
            },
            Self::Hamstring => {
                weapon
                    .attack()
                    .except_hit_damage(|d| {
                        d.base_dice = d.base_dice.weak();
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
                    d.base_dice = d.base_dice.weak();
                    d.lose_hp_effect = Some(AttackTriggeredEffect::Debuff(DebuffEffect {
                        debuffs: vec![Debuff::Stunned],
                        duration: AttackEffectDuration::Condition,
                        immune_after_effect_ends: false,
                    }));
                }),
            Self::HeadshotPlus => weapon
                .attack()
                .except_hit_damage(|d| {
                    d.base_dice = d.base_dice.multiply(2);
                    d.lose_hp_effect = Some(AttackTriggeredEffect::Debuff(DebuffEffect {
                        debuffs: vec![Debuff::Confused],
                        duration: AttackEffectDuration::Condition,
                        immune_after_effect_ends: false,
                    }));
                }),
            Self::PowerStrike => weapon
                .attack()
                .except(|a| a.accuracy -= 3)
                .except_hit_damage(|d| d.base_dice = d.base_dice.multiply(2)),
            Self::PowerStrikePlus => weapon
                .attack()
                .except(|a| a.accuracy -= 2)
                .except_hit_damage(|d| d.base_dice = d.base_dice.multiply(3)),
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
                }),
            Self::RecklessStrike => weapon
                .attack()
                .except(|a| a.accuracy += 2)
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
                }),
            Self::StripTheFlesh => {
                weapon
                    .attack()
                    .except_hit_damage(|d| {
                        d.base_dice = d.base_dice.multiply(2);
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
                    // TODO: define "lose HP and beat extra defense" effect
                    .except_hit_damage(|d| {
                        d.extra_defense_effect = Some((Defense::Fortitude, AttackTriggeredEffect::Debuff(DebuffEffect {
                            debuffs: vec![Debuff::Vulnerable(Box::new(
                                SpecialDefenseType::AllDamage,
                            ))],
                            duration: AttackEffectDuration::Condition,
                            immune_after_effect_ends: false,
                        })));
                    })
            }
            Self::DoubleStrike => weapon
                .attack()
                .except(|a| a.accuracy -= 1)
                .except(|a| a.targeting = Targeting::Strikes(2)),
            // TODO: handle glancing blow on miss
            Self::Whirlwind => weapon
                .attack()
                .except(|a| {
                    a.targeting =
                        Targeting::Radius(None, AreaSize::Tiny, AreaTargets::Enemies);
                })
        };
        // TODO: should we warn if this is untrue? We're currently silently ignoring "early"
        // maneuver access since that's reasonable for elite monster actions.
        if creature_rank > self.rank() {
            attack.accuracy += creature_rank - self.rank();
        }
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
            return format!("{} {}", prefix, n);
        }
        match self {
            Self::CertainStrike => with_prefix("Certain", weapon_name),
            Self::DoubleStrike => with_prefix("Double", weapon_name),
            Self::ElementalStrike(_) => with_prefix("Elemental", weapon_name),
            Self::GenericScalingStrike(_) => with_prefix("Generic Scaling", weapon_name),
            Self::GraspingStrike => with_prefix("Grasping", weapon_name),
            Self::GraspingStrikePlus => with_prefix("Grasping+", weapon_name),
            Self::PowerStrike => with_prefix("Powerful", weapon_name),
            Self::PouncingStrike => with_prefix("Pouncing", weapon_name),
            Self::RecklessStrike => with_prefix("Reckless", weapon_name),
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
            Self::CertainStrikePlus => "Certain Strike+",
            Self::ElementalStrike(_) => "Elemental Strike",
            Self::GenericScalingStrike(_) => "Generic Scaling Strike",
            Self::GraspingStrike => "Grasping Strike",
            Self::GraspingStrikePlus => "Grasping StrikePlus",
            Self::Hamstring => "Hamstring",
            Self::Headshot => "Headshot",
            Self::HeadshotPlus => "Headshot+",
            Self::PowerStrike => "Power Strike",
            Self::PowerStrikePlus => "Power Strike+",
            Self::DoubleStrike => "Double Strike",
            Self::PouncingStrike => "Pouncing Strike",
            Self::RecklessStrike => "Reckless Strike",
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
            Self::CertainStrikePlus => 5,
            Self::ElementalStrike(r) => *r,
            Self::GenericScalingStrike(r) => *r,
            Self::GraspingStrike => 1,
            Self::GraspingStrikePlus => 5,
            Self::Hamstring => 3,
            Self::Headshot => 3,
            Self::HeadshotPlus => 7,
            Self::PowerStrike => 1,
            Self::PowerStrikePlus => 5,
            Self::DoubleStrike => 5,
            Self::PouncingStrike => 3,
            Self::RecklessStrike => 1,
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
