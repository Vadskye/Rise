use crate::core_mechanics::abilities::{
    AbilityExtraContext, AbilityMovement, AreaSize, AreaTargets, Targeting,
};
use crate::core_mechanics::attacks::attack_effect::{
    AttackEffectDuration, AttackTriggeredEffect, DebuffEffect,
};
use crate::core_mechanics::{
    Debuff, Defense, DicePool, Die, PowerScaling, SpecialDefenseType, SpeedCategory,
};
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
    CertainStrikePlus,
    ElementalStrike(i32),
    GenericAccuracy,
    GenericExtraDamage(i32),
    GenericDoubleDamage,
    GenericTripleDamage,
    GraspingStrike,
    GraspingStrikePlus,
    Hamstring,
    ConcussiveStrike,
    ConcussiveStrikePlus,
    PowerStrike,
    PowerStrikePlus,
    DoubleStrike,
    PouncingStrike,
    PouncingStrikePlus,
    RecklessStrike,
    SneakAttack(i32),
    StripTheFlesh,
    Tenderize,
    Whirlwind,
}

impl Maneuver {
    pub fn assert_meets_rank_requirement(&self, creature_name: &str, creature_rank: i32) {
        if creature_rank < self.rank() {
            panic!(
                "Maneuver {} requires minimum rank {} but creature {} is rank {}",
                self.name(),
                self.rank(),
                creature_name,
                creature_rank
            );
        }
    }

    pub fn is_magical(&self) -> bool {
        // TODO: return true once we add any magical maneuvers
        false
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
                .except(|a| a.accuracy += 2)
                .except_hit_damage(|d| d.base_dice = d.base_dice.weak()),
            Self::CertainStrikePlus => weapon
                .attack()
                .except(|a| a.accuracy += 6),
            // TODO: figure out how to use the higher of two powers
            Self::ElementalStrike(rank) => weapon
                .attack()
                .except_hit_damage(|d| match rank {
                    3 => d.base_dice = d.base_dice.add_die(Die::d4()),
                    4 => d.power_scalings.push(PowerScaling {
                        dice: Some(DicePool::d4()),
                        power_per_dice: 4,
                        power_per_plus1_modifier: 0,
                    }),
                    5 => d.power_scalings.push(PowerScaling {
                        dice: Some(DicePool::d6()),
                        power_per_dice: 4,
                        power_per_plus1_modifier: 0,
                    }),
                    6 => d.power_scalings.push(PowerScaling {
                        dice: Some(DicePool::d6()),
                        power_per_dice: 3,
                        power_per_plus1_modifier: 0,
                    }),
                    7 => d.power_scalings.push(PowerScaling {
                        dice: Some(DicePool::d10()),
                        power_per_dice: 3,
                        power_per_plus1_modifier: 0,
                    }),
                    _ => {},
                }),
            Self::GenericDoubleDamage => weapon
                .attack()
                .except_hit_damage(|d| d.base_dice = d.base_dice.multiply(2)),
            Self::GenericExtraDamage(rank) => weapon
                .attack()
                .except_hit_damage(|d| match rank {
                    2 => d.base_dice = d.base_dice.add_modifier(1),
                    3 => d.power_scalings.push(PowerScaling {
                        dice: None,
                        power_per_dice: 0,
                        power_per_plus1_modifier: 2,
                    }),
                    4 => d.power_scalings.push(PowerScaling {
                        dice: Some(DicePool::d4()),
                        power_per_dice: 3,
                        power_per_plus1_modifier: 0,
                    }),
                    5 => d.power_scalings.push(PowerScaling {
                        dice: Some(DicePool::d6()),
                        power_per_dice: 3,
                        power_per_plus1_modifier: 0,
                    }),
                    6 => d.power_scalings.push(PowerScaling {
                        dice: Some(DicePool::d8()),
                        power_per_dice: 3,
                        power_per_plus1_modifier: 0,
                    }),
                    7 => d.power_scalings.push(PowerScaling {
                        dice: Some(DicePool::d8()),
                        power_per_dice: 2,
                        power_per_plus1_modifier: 0,
                    }),
                    _ => {},
                }),
            Self::GenericTripleDamage => weapon
                .attack()
                .except_hit_damage(|d| d.base_dice = d.base_dice.multiply(3)),
            Self::GraspingStrike => weapon
                .attack()
                .except_hit_damage(|d| {
                    d.extra_defense_effect =
                        Some((Defense::Brawn, AttackTriggeredEffect::Grappled));
                }),
            Self::GraspingStrikePlus => {
                weapon
                    .attack()
                    .except_hit_damage(|d| {
                        d.extra_defense_effect =
                            Some((Defense::Brawn, AttackTriggeredEffect::Grappled));
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
            Self::ConcussiveStrike => weapon
                .attack()
                .except_hit_damage(|d| {
                    d.base_dice = d.base_dice.weak();
                    d.lose_hp_effect = Some(AttackTriggeredEffect::Debuff(DebuffEffect {
                        debuffs: vec![Debuff::Stunned],
                        duration: AttackEffectDuration::Condition,
                        immune_after_effect_ends: false,
                    }));
                }),
            Self::ConcussiveStrikePlus => weapon
                .attack()
                .except_hit_damage(|d| {
                    d.base_dice = d.base_dice.multiply(2);
                    d.lose_hp_effect = Some(AttackTriggeredEffect::Debuff(DebuffEffect {
                        debuffs: vec![Debuff::Confused],
                        duration: AttackEffectDuration::Condition,
                        immune_after_effect_ends: false,
                    }));
                }),
            Self::GenericAccuracy => weapon
                .attack(),
            Self::PowerStrike => weapon
                .attack()
                .except(|a| a.accuracy -= 4)
                .except_hit_damage(|d| d.base_dice = d.base_dice.multiply(2)),
            Self::PowerStrikePlus => weapon
                .attack()
                .except(|a| a.accuracy -= 3)
                .except_hit_damage(|d| d.base_dice = d.base_dice.multiply(3)),
            Self::PouncingStrike => weapon
                .attack()
                .except(|a| {
                    a.extra_context = Some(AbilityExtraContext {
                        cooldown: None,
                        movement: Some(AbilityMovement {
                            move_before_attack: true,
                            requires_straight_line: true,
                            speed: SpeedCategory::Half,
                        }),
                        suffix: None,
                    });
                }),
            Self::PouncingStrikePlus => weapon
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
            Self::SneakAttack(rank) => weapon.attack()
                .except_hit_damage(|d| match rank {
                   1 => d.base_dice = d.base_dice.add_die(Die::d4()),
                   2 => d.base_dice = d.base_dice.add_die(Die::d4()),
                   3 => d.base_dice = d.base_dice.add_die(Die::d8()),
                   4 => d.base_dice = d.base_dice.add_dice(DicePool::xdy(2, 8).dice),
                   5 => d.base_dice = d.base_dice.add_dice(DicePool::xdy(4, 8).dice),
                   6 => d.base_dice = d.base_dice.add_dice(DicePool::xdy(6, 8).dice),
                   7 => d.base_dice = d.base_dice.add_dice(DicePool::xdy(8, 10).dice),
                    _ => panic!("Unsupported rank for Sneak Attack"),
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

        // If this is untrue, it's usually caught by `assert_meets_rank_requirement`.
        if creature_rank > self.rank() {
            attack.accuracy += creature_rank - self.rank();
        }
        attack.name = self.attack_name(&weapon);
        attack.replaces_weapon = if self.should_replace_weapon() {
            Some(weapon)
        } else {
            None
        };
        attack
    }

    pub fn attack_name(&self, weapon: &Weapon) -> String {
        let weapon_name = titlecase(weapon.name.as_str());
        fn with_prefix(prefix: &str, n: String) -> String {
            format!("{} {}", prefix, n)
        }
        match self {
            Self::CertainStrike => with_prefix("Certain", weapon_name),
            Self::DoubleStrike => with_prefix("Double", weapon_name),
            Self::ElementalStrike(_) => with_prefix("Elemental", weapon_name),
            Self::GenericAccuracy => with_prefix("Generic Accuracy", weapon_name),
            Self::GenericExtraDamage(_) => with_prefix("Extra Damage", weapon_name),
            Self::GraspingStrike => with_prefix("Grasping", weapon_name),
            Self::GraspingStrikePlus => with_prefix("Grasping+", weapon_name),
            Self::PowerStrike => with_prefix("Powerful", weapon_name),
            Self::PouncingStrike => with_prefix("Pouncing", weapon_name),
            Self::PouncingStrikePlus => with_prefix("Pouncing", weapon_name),
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
            Self::GenericAccuracy => "Generic Accuracy",
            Self::GenericDoubleDamage => "Generic Double Damage",
            Self::GenericExtraDamage(_) => "Extra Damage Strike",
            Self::GenericTripleDamage => "Generic Triple Damage",
            Self::GraspingStrike => "Grasping Strike",
            Self::GraspingStrikePlus => "Grasping Strike+",
            Self::Hamstring => "Hamstring",
            Self::ConcussiveStrike => "Concussive Strike",
            Self::ConcussiveStrikePlus => "Concussive Strike+",
            Self::PowerStrike => "Power Strike",
            Self::PowerStrikePlus => "Power Strike+",
            Self::DoubleStrike => "Double Strike",
            Self::PouncingStrike => "Pouncing Strike",
            Self::PouncingStrikePlus => "Pouncing Strike+",
            Self::RecklessStrike => "Reckless Strike",
            Self::SneakAttack(_) => "Sneak Attack",
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
            Self::ConcussiveStrike => 3,
            Self::ConcussiveStrikePlus => 7,
            Self::ElementalStrike(r) => *r,
            Self::GenericAccuracy => 1,
            Self::GenericDoubleDamage => 5,
            Self::GenericTripleDamage => 7,
            Self::GenericExtraDamage(r) => *r,
            Self::GraspingStrike => 1,
            Self::GraspingStrikePlus => 5,
            Self::Hamstring => 3,
            Self::PowerStrike => 1,
            Self::PowerStrikePlus => 5,
            Self::DoubleStrike => 5,
            Self::PouncingStrike => 1,
            Self::PouncingStrikePlus => 3,
            Self::RecklessStrike => 1,
            Self::SneakAttack(r) => *r,
            Self::StripTheFlesh => 7,
            Self::Tenderize => 5,
            Self::Whirlwind => 1,
        }
    }

    fn should_replace_weapon(&self) -> bool {
        false
    }
}
