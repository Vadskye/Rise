use crate::creatures::attack_effects::{
    self, AttackEffect, AttackEffectDuration, DamageEffect, DebuffEffect,
};
use crate::creatures::attacks::{
    AreaSize, AreaTargets, Attack, AttackCooldown, AttackRange, AttackTargeting, UsageTime,
};
use crate::core_mechanics::{DamageDice, DamageType, Debuff, Defense};
use crate::equipment::Weapon;

pub enum StandardAttack {
    // Monster abilities
    AbolethSlam,
    AbolethPsionicBlast,
    GibberingMoutherGibber,
    FrostwebSpiderBite,

    // Character/shared abilities
    AbyssalBlast(i32),
    BreathWeaponCone(i32, DamageType, Defense),
    BreathWeaponLine(i32, DamageType, Defense),
    DarkGrasp(i32),
    DarkMiasma(i32),
    MindCrush(i32),
}

impl StandardAttack {
    pub fn attack(&self) -> Attack {
        match self {
            // Monster abilities
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
                is_strike: false,
                name: "Psionic Blast".to_string(),
                replaces_weapon: None,
                targeting: AttackTargeting::Cone(AreaSize::Large, AreaTargets::Enemies),
                usage_time: UsageTime::Standard,
            },
            Self::FrostwebSpiderBite => {
                let mut frostweb_spider_bite = Attack::from_weapon(Weapon::MonsterBite);
                if let Some(e) = frostweb_spider_bite.damage_effect_mut() {
                    e.lose_hp_effects = Some(vec![attack_effects::AttackEffect::Poison(
                        attack_effects::PoisonEffect {
                            stage1: vec![Debuff::Slowed],
                            stage3_debuff: Some(vec![Debuff::Decelerated]),
                            stage3_vital: None,
                        },
                    )]);
                }
                return frostweb_spider_bite;
            }
            Self::GibberingMoutherGibber => Attack {
                accuracy: 0,
                cooldown: None,
                crit: Some(AttackEffect::Debuff(DebuffEffect {
                    debuffs: vec![Debuff::Confused],
                    duration: AttackEffectDuration::Brief,
                })),
                defense: Defense::Mental,
                glance: None,
                hit: AttackEffect::Debuff(DebuffEffect {
                    debuffs: vec![Debuff::Dazed],
                    duration: AttackEffectDuration::Brief,
                }),
                is_magical: true,
                is_strike: false,
                name: "Gibber".to_string(),
                replaces_weapon: None,
                targeting: AttackTargeting::Radius(None, AreaSize::Medium, AreaTargets::Creatures),
                usage_time: UsageTime::Minor,
            },

            // Character/shared abilities
            Self::AbyssalBlast(rank) => Attack {
                accuracy: 0,
                cooldown: None,
                crit: None,
                defense: Defense::Armor,
                glance: if *rank >= 3 {
                    Some(AttackEffect::HalfDamage)
                } else {
                    None
                },
                hit: AttackEffect::Damage(DamageEffect {
                    // +1d extra at rank 3/5/7
                    damage_dice: DamageDice::single_target_damage(*rank).add((*rank - 1) / 2),
                    damage_modifier: 0,
                    damage_types: vec![DamageType::Fire],
                    lose_hp_effects: None,
                    power_multiplier: 1.0,
                    take_damage_effects: None,
                }),
                is_magical: true,
                is_strike: false,
                name: "Abyssal Blast".to_string(),
                replaces_weapon: None,
                targeting: AttackTargeting::Creature(AttackRange::Medium),
                usage_time: UsageTime::Standard,
            },
            Self::BreathWeaponCone(rank, damage_type, defense) => Attack {
                accuracy: 0,
                cooldown: Some(AttackCooldown::Brief(None)),
                crit: None,
                defense: *defense,
                glance: if *rank >= 3 {
                    Some(AttackEffect::HalfDamage)
                } else {
                    None
                },
                hit: AttackEffect::Damage(DamageEffect {
                    damage_dice: DamageDice::aoe_damage(*rank),
                    damage_modifier: 0,
                    damage_types: vec![*damage_type],
                    lose_hp_effects: None,
                    power_multiplier: 0.5,
                    take_damage_effects: None,
                }),
                is_magical: true,
                is_strike: false,
                name: "Breath Weapon".to_string(),
                replaces_weapon: None,
                targeting: AttackTargeting::Cone(
                    match rank {
                        1 => AreaSize::Small,
                        2 => AreaSize::Medium,
                        3 => AreaSize::Large,
                        4 => AreaSize::Large,
                        5 => AreaSize::Huge,
                        6 => AreaSize::Huge,
                        7 => AreaSize::Gargantuan,
                        _ => panic!("Invalid rank {}", rank),
                    },
                    AreaTargets::Everything,
                ),
                usage_time: UsageTime::Standard,
            },
            Self::BreathWeaponLine(rank, damage_type, defense) => Attack {
                accuracy: 0,
                cooldown: Some(AttackCooldown::Brief(None)),
                crit: None,
                defense: *defense,
                glance: if *rank >= 3 {
                    Some(AttackEffect::HalfDamage)
                } else {
                    None
                },
                hit: AttackEffect::Damage(DamageEffect {
                    damage_dice: DamageDice::aoe_damage(*rank),
                    damage_modifier: 0,
                    damage_types: vec![*damage_type],
                    lose_hp_effects: None,
                    power_multiplier: 0.5,
                    take_damage_effects: None,
                }),
                is_magical: true,
                is_strike: false,
                name: "Breath Weapon".to_string(),
                replaces_weapon: None,
                targeting: match rank {
                    1 => AttackTargeting::Line(5, AreaSize::Medium, AreaTargets::Everything),
                    2 => AttackTargeting::Line(5, AreaSize::Large, AreaTargets::Everything),
                    3 => AttackTargeting::Line(10, AreaSize::Large, AreaTargets::Everything),
                    4 => AttackTargeting::Line(10, AreaSize::Huge, AreaTargets::Everything),
                    5 => AttackTargeting::Line(15, AreaSize::Huge, AreaTargets::Everything),
                    6 => AttackTargeting::Line(15, AreaSize::Gargantuan, AreaTargets::Everything),
                    7 => AttackTargeting::Line(20, AreaSize::Gargantuan, AreaTargets::Everything),
                    _ => panic!("Invalid rank {}", rank),
                },
                usage_time: UsageTime::Standard,
            },
            // TODO: add descriptive text for +accuracy vs non-bright illumination
            Self::DarkGrasp(rank) => Attack {
                accuracy: 0,
                cooldown: None,
                crit: None,
                defense: Defense::Reflex,
                glance: if *rank >= 3 {
                    Some(AttackEffect::HalfDamage)
                } else {
                    None
                },
                hit: AttackEffect::Damage(DamageEffect {
                    damage_dice: DamageDice::aoe_damage(*rank).add(if *rank == 7 { 2 } else { 0 }),
                    damage_modifier: 0,
                    damage_types: vec![DamageType::Cold],
                    lose_hp_effects: None,
                    power_multiplier: 1.0,
                    take_damage_effects: None,
                }),
                is_magical: true,
                is_strike: false,
                name: Attack::generate_modified_name("Dark Grasp", *rank, 3, Some(7)),
                replaces_weapon: None,
                targeting: AttackTargeting::Anything(AttackRange::Reach),
                usage_time: UsageTime::Standard,
            },
            Self::DarkMiasma(rank) => Attack {
                accuracy: 0,
                cooldown: None,
                crit: None,
                defense: Defense::Reflex,
                glance: if *rank >= 4 {
                    Some(AttackEffect::HalfDamage)
                } else {
                    None
                },
                hit: AttackEffect::Damage(DamageEffect {
                    damage_dice: DamageDice::aoe_damage(*rank),
                    damage_modifier: 0,
                    damage_types: vec![DamageType::Cold],
                    lose_hp_effects: None,
                    power_multiplier: 0.5,
                    take_damage_effects: None,
                }),
                is_magical: true,
                is_strike: false,
                name: Attack::generate_modified_name("Dark Miasma", *rank, 4, None),
                replaces_weapon: None,
                targeting: if *rank >= 4 {
                    AttackTargeting::Radius(None, AreaSize::Large, AreaTargets::Creatures)
                } else {
                    AttackTargeting::Radius(None, AreaSize::Small, AreaTargets::Enemies)
                },
                usage_time: UsageTime::Standard,
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
                is_strike: false,
                name: Attack::generate_modified_name("Mind Crush", *rank, 3, Some(7)),
                replaces_weapon: None,
                targeting: AttackTargeting::Creature(AttackRange::Medium),
                usage_time: UsageTime::Standard,
            },
        }
    }
}
