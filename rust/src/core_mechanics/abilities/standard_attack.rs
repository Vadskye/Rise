use crate::core_mechanics::abilities::attack_effect::{
    AttackEffectDuration, AttackTriggeredEffect, DamageEffect, DamageOverTimeEffect, DebuffEffect,
    DebuffInsteadEffect, PoisonEffect, VitalWoundEffect,
};
use crate::core_mechanics::abilities::{
    AreaSize, AreaTargets, Attack, AttackEffect, Cooldown, Range, Targeting,
};
use crate::core_mechanics::{DamageDice, DamageType, Debuff, Defense};
use crate::equipment::StandardWeapon;

pub enum StandardAttack {
    // Monster abilities
    AbolethSlam,
    AbolethPsionicBlast,
    AnkhegDrag,
    GibberingMoutherGibber,
    FrostwebSpiderBite,
    YrthakThunderingHide,

    // Character/shared abilities
    AbyssalBlast(i32),
    BreathWeaponCone(i32, DamageType, Defense),
    BreathWeaponLine(i32, DamageType, Defense),
    Combustion(i32),
    DarkGrasp(i32),
    DarkMiasma(i32),
    DivineJudgment(i32),
    DrainLife(i32),
    Fireball(i32),
    Firebolt(i32),
    Ignition(i32),
    Inferno(i32),
    MindCrush(i32),
    Pyrohemia(i32),
    Pyrophobia(i32),
    RetributiveLifebond(i32),
    WordOfFaith(i32),
}

impl StandardAttack {
    pub fn attack(&self) -> Attack {
        match self {
            // Monster abilities
            Self::AbolethSlam => {
                let mut aboleth_slam = StandardWeapon::Slam.weapon().attack();
                aboleth_slam.name = "Sliming Tentacle".to_string();
                if let Some(e) = aboleth_slam.damage_effect_mut() {
                    e.lose_hp_effect = Some(AttackTriggeredEffect::Poison(
                        PoisonEffect {
                            stage1: vec![Debuff::Stunned],
                            stage3_debuff: None,
                            stage3_vital: Some(VitalWoundEffect {
                                special_effect: Some("
                                    Instead of making a \\glossterm{vital roll} for the \\glossterm{vital wound},
                                      the target's skin is transformed into a clear, slimy membrane.
                                    Every 5 minutes, an afflicted creature must be moistened with cool, fresh water
                                      or it will gain two \\glossterm<fatigue points>.
                                    This effect lasts until the \\glossterm{vital wound} is removed.
                                ".to_string()),
                            }),
                        },
                    ));
                }
                return aboleth_slam;
            }
            // Large enemies-only cone is a rank 4 effect
            Self::AbolethPsionicBlast => Attack {
                accuracy: 0,
                cooldown: None,
                crit: None,
                defense: Defense::Mental,
                hit: AttackEffect::Damage(DamageEffect {
                    damage_dice: DamageDice::aoe_damage(5),
                    damage_types: vec![DamageType::Energy],
                    damage_modifier: 0,
                    extra_defense_effect: None,
                    lose_hp_effect: None,
                    power_multiplier: 0.5,
                    take_damage_effect: None,
                    vampiric_healing: None,
                }),
                is_magical: true,
                is_strike: false,
                movement: None,
                name: "Psionic Blast".to_string(),
                replaces_weapon: None,
                targeting: Targeting::Cone(AreaSize::Large, AreaTargets::Enemies),
            },
            Self::AnkhegDrag => Attack {
                accuracy: 4,
                cooldown: None,
                crit: None,
                defense: Defense::Fortitude,
                hit: AttackEffect::Push(30),
                is_magical: true,
                is_strike: false,
                movement: None,
                name: "Drag Prey".to_string(),
                replaces_weapon: None,
                targeting: Targeting::Creature(Range::Reach),
            },
            Self::FrostwebSpiderBite => {
                let mut frostweb_spider_bite = StandardWeapon::MonsterBite.weapon().attack();
                if let Some(e) = frostweb_spider_bite.damage_effect_mut() {
                    e.lose_hp_effect = Some(AttackTriggeredEffect::Poison(PoisonEffect {
                        stage1: vec![Debuff::Slowed],
                        stage3_debuff: Some(vec![Debuff::Immobilized]),
                        stage3_vital: None,
                    }));
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
                hit: AttackEffect::Debuff(DebuffEffect {
                    debuffs: vec![Debuff::Dazed],
                    duration: AttackEffectDuration::Brief,
                }),
                is_magical: true,
                is_strike: false,
                movement: None,
                name: "Gibber".to_string(),
                replaces_weapon: None,
                targeting: Targeting::Radius(None, AreaSize::Medium, AreaTargets::Creatures),
            },
            Self::YrthakThunderingHide => Attack {
                accuracy: 0,
                cooldown: None,
                crit: None,
                defense: Defense::Fortitude,
                hit: AttackEffect::Damage(DamageEffect {
                    damage_dice: DamageDice::single_target_damage(3),
                    damage_modifier: 0,
                    damage_types: vec![DamageType::Sonic],
                    extra_defense_effect: None,
                    lose_hp_effect: None,
                    power_multiplier: 0.0,
                    take_damage_effect: None,
                    vampiric_healing: None,
                }),
                is_magical: false,
                is_strike: false,
                movement: None,
                name: "Thundering Hide".to_string(),
                replaces_weapon: None,
                targeting: Targeting::CausedDamage(AreaSize::Tiny),
            },

            // Character/shared abilities
            Self::AbyssalBlast(rank) => Attack {
                accuracy: 0,
                cooldown: None,
                crit: None,
                defense: Defense::Armor,
                hit: AttackEffect::Damage(DamageEffect {
                    // +1d extra at rank 3/5/7
                    damage_dice: DamageDice::single_target_damage(*rank).add((*rank - 1) / 2),
                    damage_modifier: 0,
                    damage_types: vec![DamageType::Fire],
                    extra_defense_effect: None,
                    lose_hp_effect: None,
                    power_multiplier: 1.0,
                    take_damage_effect: None,
                    vampiric_healing: None,
                }),
                is_magical: true,
                is_strike: false,
                movement: None,
                name: "Abyssal Blast".to_string(),
                replaces_weapon: None,
                targeting: Targeting::Creature(Range::Medium),
            },
            Self::BreathWeaponCone(rank, damage_type, defense) => Attack {
                accuracy: 0,
                cooldown: Some(Cooldown::Brief(None)),
                crit: None,
                defense: *defense,
                hit: AttackEffect::Damage(DamageEffect {
                    damage_dice: DamageDice::aoe_damage(*rank),
                    damage_modifier: 0,
                    damage_types: vec![*damage_type],
                    extra_defense_effect: None,
                    lose_hp_effect: None,
                    power_multiplier: 0.5,
                    take_damage_effect: None,
                    vampiric_healing: None,
                }),
                is_magical: false,
                is_strike: false,
                movement: None,
                name: "Breath Weapon".to_string(),
                replaces_weapon: None,
                targeting: Targeting::Cone(
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
            },
            Self::BreathWeaponLine(rank, damage_type, defense) => Attack {
                accuracy: 0,
                cooldown: Some(Cooldown::Brief(None)),
                crit: None,
                defense: *defense,
                hit: AttackEffect::Damage(DamageEffect {
                    damage_dice: DamageDice::aoe_damage(*rank),
                    damage_modifier: 0,
                    damage_types: vec![*damage_type],
                    extra_defense_effect: None,
                    lose_hp_effect: None,
                    power_multiplier: 0.5,
                    take_damage_effect: None,
                    vampiric_healing: None,
                }),
                is_magical: false,
                is_strike: false,
                movement: None,
                name: "Breath Weapon".to_string(),
                replaces_weapon: None,
                targeting: match rank {
                    1 => Targeting::Line(5, AreaSize::Medium, AreaTargets::Everything),
                    2 => Targeting::Line(5, AreaSize::Large, AreaTargets::Everything),
                    3 => Targeting::Line(10, AreaSize::Large, AreaTargets::Everything),
                    4 => Targeting::Line(10, AreaSize::Huge, AreaTargets::Everything),
                    5 => Targeting::Line(15, AreaSize::Huge, AreaTargets::Everything),
                    6 => Targeting::Line(15, AreaSize::Gargantuan, AreaTargets::Everything),
                    7 => Targeting::Line(20, AreaSize::Gargantuan, AreaTargets::Everything),
                    _ => panic!("Invalid rank {}", rank),
                },
            },
            Self::Combustion(rank) => Attack {
                accuracy: 0,
                cooldown: None,
                crit: None,
                defense: Defense::Fortitude,
                hit: AttackEffect::Damage(DamageEffect {
                    // +1d extra at ranks 2, 4 and 7
                    damage_dice: DamageDice::single_target_damage(*rank).add(if *rank >= 7 {
                        3
                    } else if *rank >= 5 {
                        2
                    } else {
                        1
                    }),
                    damage_modifier: 0,
                    damage_types: vec![DamageType::Fire],
                    extra_defense_effect: None,
                    lose_hp_effect: None,
                    power_multiplier: 1.0,
                    take_damage_effect: None,
                    vampiric_healing: None,
                }),
                is_magical: true,
                is_strike: false,
                movement: None,
                name: Attack::generate_modified_name("Combustion", *rank, 4, Some(7)),
                replaces_weapon: None,
                targeting: Targeting::Creature(if *rank == 7 {
                    Range::Medium
                } else {
                    Range::Short
                }),
            },
            // TODO: add descriptive text for +accuracy vs non-bright illumination
            Self::DarkGrasp(rank) => Attack {
                accuracy: 0,
                cooldown: None,
                crit: None,
                defense: Defense::Reflex,
                hit: AttackEffect::Damage(DamageEffect {
                    damage_dice: DamageDice::aoe_damage(*rank).add(if *rank == 7 { 2 } else { 0 }),
                    damage_modifier: 0,
                    damage_types: vec![DamageType::Cold],
                    extra_defense_effect: None,
                    lose_hp_effect: None,
                    power_multiplier: 1.0,
                    take_damage_effect: None,
                    vampiric_healing: None,
                }),
                is_magical: true,
                is_strike: false,
                movement: None,
                name: Attack::generate_modified_name("Dark Grasp", *rank, 3, Some(7)),
                replaces_weapon: None,
                targeting: Targeting::Anything(Range::Reach),
            },
            Self::DarkMiasma(rank) => Attack {
                accuracy: 0,
                cooldown: None,
                crit: None,
                defense: Defense::Reflex,
                hit: AttackEffect::Damage(DamageEffect {
                    damage_dice: DamageDice::aoe_damage(*rank),
                    damage_modifier: 0,
                    damage_types: vec![DamageType::Cold],
                    extra_defense_effect: None,
                    lose_hp_effect: None,
                    power_multiplier: 0.5,
                    take_damage_effect: None,
                    vampiric_healing: None,
                }),
                is_magical: true,
                is_strike: false,
                movement: None,
                name: Attack::generate_modified_name("Dark Miasma", *rank, 4, None),
                replaces_weapon: None,
                targeting: if *rank >= 4 {
                    Targeting::Radius(None, AreaSize::Large, AreaTargets::Creatures)
                } else {
                    Targeting::Radius(None, AreaSize::Small, AreaTargets::Enemies)
                },
            },
            Self::DivineJudgment(rank) => Attack {
                accuracy: 0,
                cooldown: None,
                crit: None,
                defense: Defense::Mental,
                hit: AttackEffect::Damage(DamageEffect {
                    // +1d extra at ranks 4 and 7
                    damage_dice: DamageDice::single_target_damage(*rank).add((*rank - 1) / 3),
                    damage_modifier: 0,
                    damage_types: vec![DamageType::Energy],
                    extra_defense_effect: None,
                    lose_hp_effect: None,
                    power_multiplier: 1.0,
                    take_damage_effect: None,
                    vampiric_healing: None,
                }),
                is_magical: true,
                is_strike: false,
                movement: None,
                name: Attack::generate_modified_name("Divine Judgment", *rank, 4, Some(7)),
                replaces_weapon: None,
                targeting: Targeting::Creature(if *rank == 7 {
                    Range::Distant
                } else if *rank >= 4 {
                    Range::Long
                } else {
                    Range::Medium
                }),
            },
            Self::DrainLife(rank) => Attack {
                accuracy: 0,
                cooldown: None,
                crit: None,
                defense: Defense::Fortitude,
                hit: AttackEffect::Damage(DamageEffect {
                    // +1d extra at ranks 4 and 7
                    damage_dice: DamageDice::single_target_damage(*rank).add((*rank - 1) / 3),
                    damage_modifier: 0,
                    damage_types: vec![DamageType::Energy],
                    extra_defense_effect: None,
                    lose_hp_effect: None,
                    power_multiplier: 1.0,
                    take_damage_effect: None,
                    vampiric_healing: None,
                }),
                is_magical: true,
                is_strike: false,
                movement: None,
                name: Attack::generate_modified_name("Drain Life", *rank, 4, Some(7)),
                replaces_weapon: None,
                targeting: Targeting::Creature(if *rank == 7 {
                    Range::Distant
                } else if *rank >= 4 {
                    Range::Long
                } else {
                    Range::Medium
                }),
            },
            Self::Fireball(rank) => Attack {
                accuracy: 0,
                cooldown: None,
                crit: None,
                defense: Defense::Reflex,
                hit: AttackEffect::Damage(DamageEffect {
                    damage_dice: DamageDice::aoe_damage(*rank).add(if *rank == 7 { 1 } else { 0 }),
                    damage_modifier: 0,
                    damage_types: vec![DamageType::Fire],
                    extra_defense_effect: None,
                    lose_hp_effect: None,
                    power_multiplier: if *rank == 7 { 1.0 } else { 0.5 },
                    take_damage_effect: None,
                    vampiric_healing: None,
                }),
                is_magical: true,
                is_strike: false,
                movement: None,
                name: Attack::generate_modified_name("Fireball", *rank, 3, Some(7)),
                replaces_weapon: None,
                targeting: Targeting::Radius(
                    Some(Range::Medium),
                    AreaSize::Small,
                    AreaTargets::Everything,
                ),
            },
            Self::Firebolt(rank) => Attack {
                accuracy: 0,
                cooldown: None,
                crit: None,
                defense: Defense::Armor,
                hit: AttackEffect::Damage(DamageEffect {
                    // +1d extra at ranks 4 and 7
                    damage_dice: DamageDice::single_target_damage(*rank).add((*rank - 1) / 3),
                    damage_modifier: 0,
                    damage_types: vec![DamageType::Fire],
                    extra_defense_effect: None,
                    lose_hp_effect: None,
                    power_multiplier: 1.0,
                    take_damage_effect: None,
                    vampiric_healing: None,
                }),
                is_magical: true,
                is_strike: false,
                movement: None,
                name: Attack::generate_modified_name("Firebolt", *rank, 4, Some(7)),
                replaces_weapon: None,
                targeting: Targeting::Creature(if *rank == 7 {
                    Range::Distant
                } else if *rank >= 4 {
                    Range::Long
                } else {
                    Range::Medium
                }),
            },
            Self::Ignition(rank) => Attack {
                accuracy: 0,
                cooldown: None,
                crit: None,
                defense: Defense::Fortitude,
                hit: AttackEffect::DamageOverTime(DamageOverTimeEffect {
                    can_remove_with_dex: *rank >= 5,
                    damage: DamageEffect {
                        damage_dice: DamageDice::aoe_damage(*rank).add(-1),
                        damage_modifier: 0,
                        damage_types: vec![DamageType::Fire],
                        extra_defense_effect: None,
                        lose_hp_effect: None,
                        power_multiplier: 0.5,
                        take_damage_effect: None,
                        vampiric_healing: None,
                    },
                    duration: AttackEffectDuration::Condition,
                    narrative_text: "catches on fire".to_string(),
                }),
                is_magical: true,
                is_strike: false,
                movement: None,
                name: Attack::generate_modified_name("Ignition", *rank, 5, None),
                replaces_weapon: None,
                targeting: Targeting::Creature(Range::Medium),
            },
            Self::Inferno(rank) => Attack {
                accuracy: 0,
                cooldown: None,
                crit: None,
                defense: Defense::Reflex,
                hit: AttackEffect::Damage(DamageEffect {
                    damage_dice: DamageDice::aoe_damage(*rank),
                    damage_modifier: 0,
                    damage_types: vec![DamageType::Fire],
                    extra_defense_effect: None,
                    lose_hp_effect: None,
                    power_multiplier: 0.5,
                    take_damage_effect: None,
                    vampiric_healing: None,
                }),
                is_magical: true,
                is_strike: false,
                movement: None,
                name: Attack::generate_modified_name("Inferno", *rank, 3, Some(5)),
                replaces_weapon: None,
                targeting: Targeting::Radius(
                    None,
                    if *rank >= 5 {
                        AreaSize::Huge
                    } else if *rank >= 3 {
                        AreaSize::Large
                    } else {
                        AreaSize::Small
                    },
                    AreaTargets::Everything,
                ),
            },
            Self::MindCrush(rank) => Attack {
                accuracy: 0,
                cooldown: None,
                crit: None,
                defense: Defense::Mental,
                hit: AttackEffect::Damage(DamageEffect {
                    damage_dice: DamageDice::aoe_damage(*rank),
                    damage_modifier: 0,
                    damage_types: vec![DamageType::Energy],
                    extra_defense_effect: None,
                    lose_hp_effect: None,
                    power_multiplier: 0.5,
                    take_damage_effect: Some(AttackTriggeredEffect::Debuff(DebuffEffect {
                        // TODO: add immunity after daze for early levels
                        debuffs: vec![if *rank >= 3 {
                            Debuff::Dazed
                        } else {
                            Debuff::Stunned
                        }],
                        duration: AttackEffectDuration::Brief,
                    })),
                    vampiric_healing: None,
                }),
                is_magical: true,
                is_strike: false,
                movement: None,
                name: Attack::generate_modified_name("Mind Crush", *rank, 3, Some(7)),
                replaces_weapon: None,
                targeting: Targeting::Creature(Range::Medium),
            },
            Self::Pyrohemia(rank) => Attack {
                accuracy: 0,
                cooldown: None,
                crit: None,
                defense: Defense::Fortitude,
                hit: AttackEffect::Damage(DamageEffect {
                    damage_dice: DamageDice::aoe_damage(*rank),
                    damage_modifier: 0,
                    damage_types: vec![DamageType::Fire],
                    extra_defense_effect: None,
                    lose_hp_effect: if *rank == 4 {
                        Some(AttackTriggeredEffect::Debuff(DebuffEffect {
                            debuffs: vec![Debuff::Stunned],
                            duration: AttackEffectDuration::Brief,
                        }))
                    } else {
                        None
                    },
                    power_multiplier: 0.5,
                    take_damage_effect: Some(AttackTriggeredEffect::Debuff(DebuffEffect {
                        debuffs: vec![if *rank >= 6 {
                            Debuff::Stunned
                        } else {
                            Debuff::Dazed
                        }],
                        duration: AttackEffectDuration::Brief,
                    })),
                    vampiric_healing: None,
                }),
                is_magical: true,
                is_strike: false,
                movement: None,
                name: Attack::generate_modified_name("Pyrohemia", *rank, 4, Some(6)),
                replaces_weapon: None,
                targeting: Targeting::Creature(Range::Short),
            },
            Self::Pyrophobia(rank) => Attack {
                accuracy: if *rank >= 5 { *rank - 5 } else { *rank - 1 },
                cooldown: None,
                crit: Some(AttackEffect::DebuffInstead(DebuffInsteadEffect {
                    debuffs: vec![if *rank >= 5 {
                        Debuff::Panicked("the $name and all other sources of fire".to_string())
                    } else {
                        Debuff::Frightened("the $name and all other sources of fire".to_string())
                    }],
                    instead_of: Debuff::Shaken(
                        "the $name and all other sources of fire".to_string(),
                    ),
                })),
                defense: Defense::Mental,
                hit: AttackEffect::Debuff(DebuffEffect {
                    debuffs: vec![if *rank >= 5 {
                        Debuff::Frightened("the $name and all other sources of fire".to_string())
                    } else {
                        Debuff::Shaken("the $name and all other sources of fire".to_string())
                    }],
                    duration: AttackEffectDuration::Condition,
                }),
                is_magical: true,
                is_strike: false,
                movement: None,
                name: if *rank >= 5 {
                    "Primal Pyrophobia".to_string()
                } else {
                    "Pyrophobia".to_string()
                },
                replaces_weapon: None,
                targeting: Targeting::Creature(Range::Medium),
            },
            Self::RetributiveLifebond(rank) => Attack {
                accuracy: 0,
                cooldown: None,
                crit: None,
                defense: Defense::Fortitude,
                hit: AttackEffect::Damage(DamageEffect {
                    // +1d extra at ranks 4 and 7
                    damage_dice: DamageDice::single_target_damage(*rank).add((*rank - 1) / 3),
                    damage_modifier: 0,
                    damage_types: vec![DamageType::Energy],
                    extra_defense_effect: None,
                    lose_hp_effect: None,
                    power_multiplier: 0.0,
                    take_damage_effect: None,
                    vampiric_healing: None,
                }),
                is_magical: true,
                is_strike: false,
                movement: None,
                name: Attack::generate_modified_name("Retributive Lifebond", *rank, 4, Some(7)),
                replaces_weapon: None,
                targeting: Targeting::CausedHpLoss(if *rank == 7 {
                    AreaSize::Large
                } else if *rank >= 4 {
                    AreaSize::Medium
                } else {
                    AreaSize::Small
                }),
            },
            Self::WordOfFaith(rank) => Attack {
                accuracy: 0,
                cooldown: None,
                crit: None,
                defense: Defense::Mental,
                hit: AttackEffect::Damage(DamageEffect {
                    damage_dice: DamageDice::aoe_damage(*rank),
                    damage_modifier: 0,
                    damage_types: vec![DamageType::Energy],
                    extra_defense_effect: None,
                    lose_hp_effect: None,
                    power_multiplier: 0.5,
                    take_damage_effect: None,
                    vampiric_healing: None,
                }),
                is_magical: true,
                is_strike: false,
                movement: None,
                name: Attack::generate_modified_name("Word of Faith", *rank, 4, Some(6)),
                replaces_weapon: None,
                targeting: Targeting::Radius(
                    None,
                    if *rank >= 6 {
                        AreaSize::Huge
                    } else if *rank >= 4 {
                        AreaSize::Large
                    } else {
                        AreaSize::Small
                    },
                    AreaTargets::Enemies,
                ),
            },
        }
    }
}
