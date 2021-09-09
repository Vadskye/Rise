use crate::core_mechanics::creatures::attack_effects::{
    self, AttackEffect, AttackEffectDuration, DamageEffect, DebuffEffect,
};
use crate::core_mechanics::creatures::attacks::{
    AreaSize, AreaTargets, Attack, AttackRange, AttackTargeting, UsageTime,
};
use crate::core_mechanics::{DamageDice, DamageType, Debuff, Defense};
use crate::equipment::Weapon;

pub enum StandardAttack {
    AbolethSlam,
    AbolethPsionicBlast,
    MindCrush(i32),
}

impl StandardAttack {
    pub fn attack(&self) -> Attack {
        match self {
            Self::AbolethSlam => {
                let mut aboleth_slam = Attack::from_weapon(Weapon::Slam);
                if let Some(e) = aboleth_slam.damage_effect_mut() {
                    e.lose_hp_effects = Some(vec![attack_effects::AttackEffect::Poison(
                        attack_effects::PoisonEffect {
                            stage1: vec![Debuff::Nauseated],
                            stage3_debuff: None,
                            stage3_vital: Some(attack_effects::VitalWoundEffect {
                                special_effect: Some("
                                    Instead of making a \\glossterm{vital roll} for the \\glossterm{vital wound},
                                      the target's skin is transformed into a clear, slimy membrane.
                                    Every 5 minutes, an afflicted creature must be moistened with cool, fresh water
                                      or it will gain two \\glossterm<fatigue points>.
                                    This effect lasts until the \\glossterm{vital wound} is removed.
                                ".to_string()),
                            }),
                        },
                    )]);
                }
                aboleth_slam.glance = Some(AttackEffect::HalfDamage);
                return aboleth_slam;
            }
            // Large enemies-only cone is a rank 4 effect
            Self::AbolethPsionicBlast => Attack {
                accuracy: 0,
                cooldown: None,
                crit: None,
                defense: Defense::Mental,
                glance: Some(AttackEffect::HalfDamage),
                hit: AttackEffect::Damage(DamageEffect {
                    damage_dice: DamageDice::aoe_damage(5),
                    damage_types: vec![DamageType::Energy],
                    damage_modifier: 0,
                    lose_hp_effects: None,
                    power_multiplier: 0.5,
                    take_damage_effects: None,
                }),
                is_magical: true,
                name: "Psionic Blast".to_string(),
                targeting: AttackTargeting::Cone(AreaSize::Large, AreaTargets::Enemies),
                usage_time: UsageTime::Standard,
                weapon: None,
            },
            Self::MindCrush(rank) => Attack {
                accuracy: 0,
                cooldown: None,
                crit: None,
                defense: Defense::Mental,
                glance: if *rank >= 3 {
                    Some(AttackEffect::HalfDamage)
                } else {
                    None
                },
                hit: AttackEffect::Damage(DamageEffect {
                    damage_dice: DamageDice::aoe_damage(*rank),
                    damage_modifier: 0,
                    damage_types: vec![DamageType::Energy],
                    lose_hp_effects: None,
                    power_multiplier: 0.5,
                    take_damage_effects: Some(vec![AttackEffect::Debuff(DebuffEffect {
                        // TODO: add immunity after daze for early levels
                        debuffs: vec![if *rank >= 3 {
                            Debuff::Dazed
                        } else {
                            Debuff::Stunned
                        }],
                        duration: AttackEffectDuration::Brief,
                    })]),
                }),
                is_magical: true,
                name: Attack::generate_modified_name("Mind Crush", *rank, 3, Some(7)),
                targeting: AttackTargeting::Creature(AttackRange::Medium),
                usage_time: UsageTime::Standard,
                weapon: None,
            },
        }
    }
}
